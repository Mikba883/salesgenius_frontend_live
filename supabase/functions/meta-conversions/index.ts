import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PIXEL_ID = '1497315434700112';
const META_API_VERSION = 'v18.0';

// SHA256 hash function for user data
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface EventData {
  event_name: string;
  event_id: string;
  event_time?: number;
  event_source_url?: string;
  user_data?: {
    email?: string;
    phone?: string;
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  custom_data?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_category?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const META_ACCESS_TOKEN = Deno.env.get('META_ACCESS_TOKEN');
    
    if (!META_ACCESS_TOKEN) {
      console.error('META_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: EventData = await req.json();
    console.log('Received event:', body.event_name, 'event_id:', body.event_id);

    // Prepare user data with hashing
    const hashedUserData: Record<string, string> = {};
    
    if (body.user_data?.email) {
      hashedUserData.em = await sha256(body.user_data.email);
    }
    if (body.user_data?.phone) {
      hashedUserData.ph = await sha256(body.user_data.phone);
    }
    if (body.user_data?.client_ip_address) {
      hashedUserData.client_ip_address = body.user_data.client_ip_address;
    }
    if (body.user_data?.client_user_agent) {
      hashedUserData.client_user_agent = body.user_data.client_user_agent;
    }
    if (body.user_data?.fbc) {
      hashedUserData.fbc = body.user_data.fbc;
    }
    if (body.user_data?.fbp) {
      hashedUserData.fbp = body.user_data.fbp;
    }

    // Build the event payload
    const eventPayload = {
      data: [
        {
          event_name: body.event_name,
          event_time: body.event_time || Math.floor(Date.now() / 1000),
          event_id: body.event_id,
          event_source_url: body.event_source_url || 'https://getsalesgenius.com',
          action_source: 'website',
          user_data: hashedUserData,
          custom_data: body.custom_data || {},
        }
      ],
      access_token: META_ACCESS_TOKEN,
    };

    console.log('Sending to Meta CAPI:', JSON.stringify({
      event_name: body.event_name,
      event_id: body.event_id,
      has_user_data: Object.keys(hashedUserData).length > 0,
      custom_data: body.custom_data,
    }));

    // Send to Meta Conversions API
    const metaResponse = await fetch(
      `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventPayload),
      }
    );

    const metaResult = await metaResponse.json();
    
    if (!metaResponse.ok) {
      console.error('Meta CAPI error:', metaResult);
      return new Response(
        JSON.stringify({ error: 'Meta API error', details: metaResult }),
        { status: metaResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Meta CAPI success:', metaResult);
    
    return new Response(
      JSON.stringify({ success: true, events_received: metaResult.events_received }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing event:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
