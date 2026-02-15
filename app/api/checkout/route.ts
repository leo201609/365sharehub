import { NextResponse } from 'next/server';
import stripe from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';

// 🔥 核心配置：强制动态路由，且确保只定义一次
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { plan } = await req.json();
    const supabase = await createClient();
    
    // 1. 获取当前用户
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. 定义套餐价格 ID (对应你 Stripe 后台的 Price ID)
    const PLAN_MAP: any = {
      monthly: { id: 'price_1QovS2Iu85S6D6nL...', name: 'Monthly Plan' },
      semi: { id: 'price_1QovTZIu85S6D6nL...', name: 'Semi-Annual Plan' },
      yearly: { id: 'price_1QovUbIu85S6D6nL...', name: 'Annual Pro' },
    };

    const selectedPlan = PLAN_MAP[plan];
    if (!selectedPlan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // 3. 创建 Stripe Checkout 会话
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: selectedPlan.id, quantity: 1 }],
      mode: 'subscription',
      // 允许 7 天免费试用
      subscription_data: {
        trial_period_days: 7,
      },
      customer_email: user.email,
      client_reference_id: user.id,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      metadata: {
        plan_name: selectedPlan.name,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}