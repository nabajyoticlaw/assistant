// supabase/functions/admin-gatekeeper/index.ts

// 1. Use the stable npm import
import { createClient } from 'npm:@supabase/supabase-js@2'

Deno.serve(async (req) => {
  try {
    const { password, action, payload } = await req.json();

    // 2. Fetch the secret
    const SECRET_PASSWORD = Deno.env.get("ADMIN_PASSWORD");
    
    // DEBUG: This will show up in your Supabase Logs
    console.log(`Attempting action: ${action}`);
    console.log(`Password provided: ${password}`);
    console.log(`Secret from Env: ${SECRET_PASSWORD}`);

    // 3. SECURITY CHECK
    // We check if SECRET_PASSWORD exists and if it matches
    if (!SECRET_PASSWORD || password !== SECRET_PASSWORD) {
      console.log("❌ AUTHENTICATION FAILED");
      return new Response(
        JSON.stringify({ error: "Invalid Admin Password" }), 
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ AUTHENTICATION SUCCESSFUL");

    // 4. Initialize the Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 5. ROUTING
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
    console.log(`❌ ERROR: ${err.message}`);
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
