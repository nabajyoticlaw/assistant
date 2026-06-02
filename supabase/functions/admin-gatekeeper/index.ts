// supabase/functions/admin-gatekeeper/index.ts

import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  // 1. Create a variable to hold our data
  let body;

  // 2. SAFELY attempt to parse the JSON
  try {
    // We check if there is actually a body before trying to parse it
    const text = await req.text();
    if (!text) {
      throw new Error("Empty request body");
    }
    body = JSON.parse(text);
  } catch (err) {
    console.log(`❌ JSON Parse Error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: "Invalid or empty request body" }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Now we can safely extract the data from 'body'
  const { password, action, payload } = body;

  try {
    // 3. Get the secret password
    const SECRET_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

    // 4. SECURITY CHECK
    if (!SECRET_PASSWORD || password !== SECRET_PASSWORD) {
      console.log(`❌ Auth Failed. Provided: ${password}, Expected: ${SECRET_PASSWORD}`);
      return new Response(
        JSON.stringify({ error: "Invalid Admin Password" }), 
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 5. Initialize Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 6. ROUTING
    if (action === 'verify_login') {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } 
    
    else if (action === 'toggle_status') {
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({ status: payload.newStatus })
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    else if (action === 'toggle_tier') {
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .update({ tier: payload.newTier })
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    else if (action === 'delete_sub') {
      const { error } = await supabaseAdmin
        .from('subscriptions')
        .delete()
        .eq('id', payload.id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    else if (action === 'save_all_pricing') {
      const { error } = await supabaseAdmin
        .from('pricing_config')
        .upsert(payload.updates, { onConflict: 'tier, duration' });
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } 
    
    else {
      return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400 });
    }

  } catch (err) {
    console.log(`❌ Execution Error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
