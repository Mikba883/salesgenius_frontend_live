import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[STRIPE-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" });
    
    // Get the signature from headers
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      throw new Error("No stripe-signature header found");
    }

    // Get the raw body
    const body = await req.text();
    logStep("Request body received", { bodyLength: body.length });

    // Verify the webhook signature
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
      logStep("Webhook signature verified", { eventType: event.type });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      logStep("Webhook signature verification failed", { error: errorMessage });
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client with service role key
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // L'email può essere in customer_email O in customer_details.email
        const customerEmail = session.customer_email || session.customer_details?.email;
        
        logStep("Processing checkout.session.completed", { 
          sessionId: session.id,
          customerEmail: customerEmail 
        });

        if (!customerEmail) {
          logStep("No customer email in session or customer_details");
          return new Response(JSON.stringify({ error: "No customer email" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Find user by email
        const { data: profile, error: profileError } = await supabaseClient
          .from("user_profiles")
          .select("id, user_id, email, is_premium")
          .eq("email", customerEmail)
          .maybeSingle();

        if (profileError) {
          logStep("Error querying user profile", { error: profileError.message });
          return new Response(JSON.stringify({ error: "Database error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // If profile doesn't exist, create it
        if (!profile) {
          logStep("Profile not found, looking up user in auth.users");
          
          const { data: authData, error: authError } = await supabaseClient.auth.admin.listUsers();
          
          if (authError) {
            logStep("Error listing auth users", { error: authError.message });
            return new Response(JSON.stringify({ error: "Could not find user" }), {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          
          const authUser = authData.users.find(u => u.email === customerEmail);
          
          if (!authUser) {
            logStep("No auth user found with this email");
            return new Response(JSON.stringify({ error: "User not found in auth" }), {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          
          const { error: insertError } = await supabaseClient
            .from("user_profiles")
            .insert({
              user_id: authUser.id,
              email: customerEmail,
              is_premium: true,
            });
            
          if (insertError) {
            logStep("Error creating profile", { error: insertError.message });
            return new Response(JSON.stringify({ error: "Failed to create profile" }), {
              status: 500,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
          }
          
          logStep("Created new profile with is_premium = true", { userId: authUser.id });
          break;
        }

        logStep("User profile found", { userId: profile.user_id, currentPremium: profile.is_premium });

        // Update is_premium to true
        const { error: updateError } = await supabaseClient
          .from("user_profiles")
          .update({ is_premium: true })
          .eq("user_id", profile.user_id);

        if (updateError) {
          logStep("Error updating is_premium", { error: updateError.message });
          return new Response(JSON.stringify({ error: "Failed to update premium status" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        logStep("Successfully updated is_premium to true", { userId: profile.user_id });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing customer.subscription.deleted", { 
          subscriptionId: subscription.id,
          customerId: subscription.customer 
        });

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if (!customer || customer.deleted) {
          logStep("Customer not found or deleted");
          return new Response(JSON.stringify({ error: "Customer not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const customerEmail = (customer as Stripe.Customer).email;
        if (!customerEmail) {
          logStep("No email for customer");
          return new Response(JSON.stringify({ error: "No customer email" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Find user by email
        const { data: profile, error: profileError } = await supabaseClient
          .from("user_profiles")
          .select("id, user_id, email, is_premium")
          .eq("email", customerEmail)
          .maybeSingle();

        if (profileError) {
          logStep("Error querying user profile", { error: profileError.message });
          return new Response(JSON.stringify({ error: "Database error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        if (!profile) {
          logStep("Profile not found for subscription.deleted event", { email: customerEmail });
          return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        logStep("User profile found", { userId: profile.user_id, currentPremium: profile.is_premium });

        // Update is_premium to false
        const { error: updateError } = await supabaseClient
          .from("user_profiles")
          .update({ is_premium: false })
          .eq("user_id", profile.user_id);

        if (updateError) {
          logStep("Error updating is_premium", { error: updateError.message });
          return new Response(JSON.stringify({ error: "Failed to update premium status" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        logStep("Successfully updated is_premium to false", { userId: profile.user_id });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        logStep("Processing customer.subscription.updated", { 
          subscriptionId: subscription.id,
          status: subscription.status 
        });

        // Get customer email from Stripe
        const customer = await stripe.customers.retrieve(subscription.customer as string);
        if (!customer || customer.deleted) {
          logStep("Customer not found or deleted");
          return new Response(JSON.stringify({ error: "Customer not found" }), {
            status: 404,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const customerEmail = (customer as Stripe.Customer).email;
        if (!customerEmail) {
          logStep("No email for customer");
          return new Response(JSON.stringify({ error: "No customer email" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Find user by email
        const { data: profile, error: profileError } = await supabaseClient
          .from("user_profiles")
          .select("id, user_id, email, is_premium")
          .eq("email", customerEmail)
          .maybeSingle();

        if (profileError) {
          logStep("Error querying user profile", { error: profileError.message });
          return new Response(JSON.stringify({ error: "Database error" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        if (!profile) {
          logStep("Profile not found for subscription.updated event", { email: customerEmail });
          return new Response(JSON.stringify({ received: true }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        // Set is_premium based on subscription status
        const isPremium = subscription.status === "active" || subscription.status === "trialing";
        logStep("Updating premium status based on subscription", { 
          userId: profile.user_id, 
          subscriptionStatus: subscription.status,
          newPremium: isPremium 
        });

        const { error: updateError } = await supabaseClient
          .from("user_profiles")
          .update({ is_premium: isPremium })
          .eq("user_id", profile.user_id);

        if (updateError) {
          logStep("Error updating is_premium", { error: updateError.message });
          return new Response(JSON.stringify({ error: "Failed to update premium status" }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        logStep("Successfully updated is_premium", { userId: profile.user_id, isPremium });
        break;
      }

      default:
        logStep("Unhandled event type", { eventType: event.type });
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in stripe-webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
