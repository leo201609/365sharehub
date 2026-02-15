export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

export async function POST(req: Request) {
  try {
    // 1. 获取前端传来的 plan 参数 (monthly, semi, yearly)
    const { plan } = await req.json(); 
    
    console.log("💰 收到支付请求，计划类型:", plan);

    // 2. 根据计划类型选择对应的 Price ID
    let priceId;
    switch (plan) {
      case "monthly":
        priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
        break;
      case "semi":
        priceId = process.env.STRIPE_PRICE_ID_SEMI;
        break;
      case "yearly":
        priceId = process.env.STRIPE_PRICE_ID_YEARLY;
        break;
      default:
        // 如果没传或传错，默认用年付，或者报错
        priceId = process.env.STRIPE_PRICE_ID_YEARLY;
    }

    if (!priceId) {
      return NextResponse.json({ error: "Price ID not configured" }, { status: 500 });
    }

    // 3. 验证用户登录
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 4. 创建 Stripe 支付会话
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      // 支付成功后跳回 Dashboard，并带上 success=true 和 plan 参数
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId: user.id,
        planType: plan, // 🔥 关键：把计划类型记在小本本上，方便 Webhook 读取
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}