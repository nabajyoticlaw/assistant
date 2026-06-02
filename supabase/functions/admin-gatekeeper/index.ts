// Use the npm: prefix instead of a URL. This is much more stable for deployment.
import { createClient } from 'npm:@supabase/supabase-js@2'

// Use Deno.serve directly (no extra imports needed)
Deno.serve(async (req) => {
  try {
    // 1. Parse the incoming request
    const { password, action, payload } = await req.json();

    // 2. Get the secret password from Environment Variables
    const SECRET_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

    // 3. SECURITY CHECK: Verify the password
    if (password !== SECRET_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "Invalid Admin Password" }), 
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Initialize the Admin Client (using the Service Role Key)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // 5. ROUTING: Handle the different actions
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
    return new Response(
      JSON.stringify({ error: err.message }), 
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});
