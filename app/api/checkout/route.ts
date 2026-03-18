import { NextResponse } from 'next/server';
import stripe from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userLocale = user.user_metadata?.locale || 'en';

    const PLAN_MAP: any = {
      monthly: { id: 'price_1TCHd0JzsK7SvKdfixEtuVRA', name: 'Monthly Plan' },
      semi: { id: 'price_1TCHfCJzsK7SvKdfgSyCttWe', name: 'Semi-Annual Plan' },
      yearly: { id: 'price_1TCHfrJzsK7SvKdfXGyGh0uk', name: 'Annual Pro' },
    };

    const selectedPlan = PLAN_MAP[plan];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      // 🔥 核心修改：删除了 payment_method_types: ['card']
      // 让 Stripe 自动接管，根据用户 IP 展示 Klarna, SEPA, PayPal, Apple Pay 等
      ui_mode: 'hosted', 
      line_items: [{ price: selectedPlan.id, quantity: 1 }],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7,
      },
      customer_email: user.email,
      client_reference_id: user.id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      metadata: {
        plan_name: selectedPlan.name,
        locale: userLocale, 
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}