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

    // ✨ 关键修复：让代码去读取 Coolify 里的环境变量，而不是死板的字符串
    const PLAN_MAP: any = {
      monthly: { 
        id: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY, 
        name: 'Monthly Plan' 
      },
      semi: { 
        id: process.env.NEXT_PUBLIC_STRIPE_PRICE_SEMI, 
        name: 'Semi-Annual Plan' 
      },
      yearly: { 
        id: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY, 
        name: 'Annual Pro' 
      },
    };

    const selectedPlan = PLAN_MAP[plan];
    
    // 安全检查：防止变量没读到导致崩溃
    if (!selectedPlan || !selectedPlan.id) {
      console.error('❌ Missing Price ID for plan:', plan);
      return NextResponse.json({ error: 'Invalid plan or missing Price ID' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: 'hosted', 
      line_items: [{ price: selectedPlan.id, quantity: 1 }],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7, // 确保你在 Stripe 后台的价格没有禁用 Trial
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