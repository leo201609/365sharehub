import { NextResponse } from 'next/server';
import stripe from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // 1. 解析请求体，增加 utmSource 接收
    const { plan, utmSource } = await req.json(); 
    const supabase = await createClient();
    
    // 2. 获取当前登录用户
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userLocale = user.user_metadata?.locale || 'en';

    // 3. 映射计划与 Stripe Price ID (从环境变量读取)
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
    
    // 安全检查
    if (!selectedPlan || !selectedPlan.id) {
      console.error('❌ Missing Price ID for plan:', plan);
      return NextResponse.json({ error: 'Invalid plan or missing Price ID' }, { status: 400 });
    }

    // 4. 创建 Stripe Checkout 会话
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'hosted', 
      line_items: [{ price: selectedPlan.id, quantity: 1 }],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: 7, // 统一开启 7 天免费试用
      },
      customer_email: user.email,
      client_reference_id: user.id, // 重要：对应数据库的 user_id
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      
      // 🔥 核心更新：Metadata 是前后端传递“小秘密”的关键
      metadata: {
        plan_name: selectedPlan.name,
        locale: userLocale,
        utm_source: utmSource || 'direct', // 记录引流标签，如果没有则标记为 direct
      },
    });

    // 5. 返回 Stripe 支付页面地址
    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('❌ Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}