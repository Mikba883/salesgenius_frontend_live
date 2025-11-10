import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { create } from "https://deno.land/x/djwt@v3.0.1/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Verifica autenticazione
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    );

    // 2. Ottieni l'utente corrente
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('[Generate JWT] Auth error:', authError);
      throw new Error('Unauthorized');
    }

    console.log('[Generate JWT] ✅ User authenticated:', user.id);

    // 3. Recupera is_premium dalla tabella user_profiles
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('is_premium')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('[Generate JWT] Error fetching profile:', profileError);
    }

    const isPremium = profile?.is_premium ?? false;
    console.log('[Generate JWT] 📋 User premium status:', isPremium);

    // 4. Genera il JWT con claim custom
    const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'your-secret-key-change-in-production';
    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const now = Math.floor(Date.now() / 1000);
    const expiresIn30Days = now + (30 * 24 * 60 * 60); // 30 giorni

    const payload = {
      sub: user.id,
      email: user.email,
      iat: now,
      exp: expiresIn30Days,
      app_metadata: {
        is_premium: isPremium,
      },
    };

    const jwt = await create(
      { alg: 'HS256', typ: 'JWT' },
      payload,
      key
    );

    console.log('[Generate JWT] ✅ JWT generato con successo', {
      userId: user.id,
      isPremium,
      expiresAt: new Date(expiresIn30Days * 1000).toISOString(),
    });

    return new Response(
      JSON.stringify({ 
        token: jwt,
        user_id: user.id,
        email: user.email,
        is_premium: isPremium,
        expires_at: expiresIn30Days,
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('[Generate JWT] ❌ Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
