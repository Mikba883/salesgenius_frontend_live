import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw userError;
    if (!userData.user) throw new Error("User not authenticated");

    const userId = userData.user.id;

    // Get first day of current month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Fetch all events for the user this month
    const { data: events, error: eventsError } = await supabaseClient
      .from('sales_events')
      .select('meeting_id, category, suggestion, timestamp, created_at')
      .eq('user_id', userId)
      .gte('created_at', firstDayOfMonth.toISOString())
      .order('created_at', { ascending: false });

    if (eventsError) throw eventsError;

    if (!events || events.length === 0) {
      return new Response(JSON.stringify({
        totalMinutes: 0,
        totalSuggestions: 0,
        categoryBreakdown: [],
        calls: []
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // Calculate total suggestions
    const totalSuggestions = events.length;

    // Calculate category breakdown
    const categoryCount: Record<string, number> = {};
    events.forEach(event => {
      if (event.category) {
        categoryCount[event.category] = (categoryCount[event.category] || 0) + 1;
      }
    });

    const categoryBreakdown = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      percentage: Math.round((count / totalSuggestions) * 100)
    })).sort((a, b) => b.count - a.count);

    // Group events by meeting_id and calculate duration + suggestions
    const meetingMap: Record<string, any[]> = {};
    events.forEach(event => {
      if (event.meeting_id) {
        if (!meetingMap[event.meeting_id]) {
          meetingMap[event.meeting_id] = [];
        }
        meetingMap[event.meeting_id].push(event);
      }
    });

    let totalMinutes = 0;
    const calls = Object.entries(meetingMap).map(([meetingId, meetingEvents]) => {
      // Sort events by timestamp
      const sorted = meetingEvents.sort((a, b) => 
        new Date(a.timestamp || a.created_at).getTime() - new Date(b.timestamp || b.created_at).getTime()
      );

      const firstEvent = sorted[0];
      const lastEvent = sorted[sorted.length - 1];

      const startTime = new Date(firstEvent.timestamp || firstEvent.created_at);
      const endTime = new Date(lastEvent.timestamp || lastEvent.created_at);
      const durationMs = endTime.getTime() - startTime.getTime();
      const durationMinutes = Math.round(durationMs / (1000 * 60));

      totalMinutes += durationMinutes;

      return {
        meetingId,
        date: firstEvent.created_at,
        duration: durationMinutes,
        suggestionsCount: meetingEvents.length,
        suggestions: meetingEvents.map(e => ({
          category: e.category,
          text: e.suggestion,
          timestamp: e.timestamp || e.created_at
        }))
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return new Response(JSON.stringify({
      totalMinutes,
      totalSuggestions,
      categoryBreakdown,
      calls
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[DASHBOARD-STATS] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
