import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PaymentRequest {
  orderId: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  shippingAddress: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const paymentData: PaymentRequest = await req.json();
    
    console.log('Processing Gokwik payment:', paymentData);

    // Get the authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        total_amount: paymentData.amount,
        status: 'pending',
        payment_gateway: 'gokwik',
        payment_status: 'pending',
        shipping_address: paymentData.shippingAddress,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      throw orderError;
    }

    // Create order items
    const orderItems = paymentData.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      throw itemsError;
    }

    // Gokwik Payment Gateway Integration
    const GOKWIK_API_URL = 'https://api.gokwik.co/v1';
    const GOKWIK_API_KEY = Deno.env.get('GOKWIK_API_KEY')!;
    const GOKWIK_MERCHANT_ID = Deno.env.get('GOKWIK_MERCHANT_ID')!;

    if (!GOKWIK_API_KEY || !GOKWIK_MERCHANT_ID) {
      throw new Error('Gokwik API credentials not configured');
    }

    // Prepare Gokwik payment request
    const gokwikPayload = {
      merchant_id: GOKWIK_MERCHANT_ID,
      order_id: order.id,
      amount: paymentData.amount,
      currency: paymentData.currency || 'INR',
      customer: {
        name: paymentData.customerName,
        email: paymentData.customerEmail,
        phone: paymentData.customerPhone,
      },
      items: paymentData.items.map(item => ({
        id: item.productId,
        name: `Product ${item.productId}`,
        quantity: item.quantity,
        price: item.price,
      })),
      shipping_address: paymentData.shippingAddress,
      redirect_url: `${Deno.env.get('SITE_URL') || 'http://localhost:3000'}/payment/success`,
      webhook_url: `${Deno.env.get('SUPABASE_URL')}/functions/v1/gokwik-webhook`,
    };

    // Create payment with Gokwik
    const gokwikResponse = await fetch(`${GOKWIK_API_URL}/payments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GOKWIK_API_KEY}`,
      },
      body: JSON.stringify(gokwikPayload),
    });

    if (!gokwikResponse.ok) {
      const errorData = await gokwikResponse.text();
      console.error('Gokwik API error:', errorData);
      throw new Error('Failed to create payment with Gokwik');
    }

    const gokwikData = await gokwikResponse.json();

    // Update order with Gokwik payment details
    await supabase
      .from('orders')
      .update({
        payment_id: gokwikData.payment_id,
        payment_gateway_data: gokwikData,
      })
      .eq('id', order.id);

    const response = {
      success: true,
      paymentUrl: gokwikData.payment_url,
      orderId: order.id,
      paymentId: gokwikData.payment_id,
      message: 'Payment initiated successfully',
    };

    console.log('Payment initiated:', response);

    return new Response(
      JSON.stringify(response),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error processing payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
