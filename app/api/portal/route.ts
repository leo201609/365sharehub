import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

// 🔥 删除了 apiVersion 那一行，防止与你的新版 npm 包冲突
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true, 
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    
    // 1. 获取当前用户
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("Auth Error:", authError);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. 查找该用户的 customer_id
    const { data: subs, error: subError } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .limit(1);

    if (subError) {
      console.error("DB Query Error:", subError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    const customerId = subs?.[0]?.stripe_customer_id;

    if (!customerId) {
      return NextResponse.json({ error: "No billing history found in database" }, { status: 404 });
    }

    // 3. 动态获取正确的网站主域名
    const getBaseUrl = () => {
      let url =
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_BASE_URL ??
        "https://365sharehub.com"; 
      
      url = url.replace(/\/+$/, ""); 
      url = url.includes("http") ? url : `https://${url}`; 
      return url;
    };

    // 4. 生成 Stripe 门户链接
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${getBaseUrl()}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
    
  } catch (err: any) {
    console.error("Stripe Portal Error 🔴:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}