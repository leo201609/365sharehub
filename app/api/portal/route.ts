import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // 加上推荐的版本号更稳定
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

    // 2. 查找该用户的 customer_id（🔥 改用 limit(1) 防止多条记录导致 .single() 崩溃）
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
      // 如果真的没查到，返回明确的 404
      return NextResponse.json({ error: "No billing history found in database" }, { status: 404 });
    }

    // 3. 动态获取正确的网站主域名（🔥 完美避开环境变量名字写错的坑）
    const getBaseUrl = () => {
      let url =
        process.env.NEXT_PUBLIC_SITE_URL ??
        process.env.NEXT_PUBLIC_BASE_URL ??
        "https://365sharehub.com"; // 终极保底域名
      
      url = url.replace(/\/+$/, ""); // 去掉末尾多余的斜杠
      url = url.includes("http") ? url : `https://${url}`; // 确保有 http(s)
      return url;
    };

    // 4. 生成 Stripe 门户链接
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${getBaseUrl()}/dashboard`,
    });

    return NextResponse.json({ url: session.url });
    
  } catch (err: any) {
    // 🔥 在服务端打印真实错误，方便查 Bug
    console.error("Stripe Portal Error 🔴:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}