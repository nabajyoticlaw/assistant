// supabase/functions/admin-gatekeeper/index.ts

import { createClient } from 'npm:@supabase/supabase-js@2'

// 1. Define the CORS headers so the browser allows the request
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle the OPTIONS request (This is what the browser sends to check CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Parse the incoming request
    let body;
    const text = await req.text();
    if (!text) throw new Error("Empty request body");
    body = JSON.parse(text);

    const { password, action, payload } = body;

    // 3. Get the secret password
    const SECRET_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

    // 4. SECURITY CHECK
    if (!SECRET_PASSWORD || password !== SECRET_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Invalid Admin Password" }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // 5. Initialize Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 6. ROUTING
    if (action === 'verify_login') {
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    } 
    
    else if (action === 'toggle_status') {
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({ status: payload.newStatus })
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    else if (action === 'toggle_tier') {
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({ tier: payload.newTier })
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    else if (action === 'delete_sub') {
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .delete()
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

    else if (action === 'save_all_pricing') {
      const { error } = await supabaseAdmin
        .from('pricing_config')
        .upsert(payload.updates, { onConflict: 'tier, duration' });
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    } 
    
    else {
      return new Response(JSON.stringify({ error: "Unknown action" }), { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      });
    }

  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }), 
      { 
        status: 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
