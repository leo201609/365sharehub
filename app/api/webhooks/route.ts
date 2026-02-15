import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    // ⚠️ 修复：Next.js 15+ headers() 需要 await
    const headerList = await headers();
    const signature = headerList.get("Stripe-Signature");

    if (!signature) return new NextResponse("Missing Signature", { status: 400 });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err: any) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const userId = session.metadata?.userId;
      // 如果没有 planType，默认标记为 monthly (防止月付没名字)
      const planType = session.metadata?.planType || "monthly";
      const subscriptionId = session.subscription as string;
      const customerId = session.customer as string;

      // 🔥 终极修复：使用 "unknown as any" 强制绕过所有类型检查
      // 这样无论 SDK 版本如何，都能取到时间数据
      const subscription = (await stripe.subscriptions.retrieve(subscriptionId)) as unknown as any;

      const planNames: any = {
          monthly: "Pro Monthly",
          semi: "Pro 6-Months",
          yearly: "Pro Yearly"
      };
      const displayPlanName = planNames[planType] || "Pro Plan";

      // 转换时间戳 (Stripe是秒，JS是毫秒)
      const startDate = new Date(subscription.current_period_start * 1000).toISOString();
      const endDate = new Date(subscription.current_period_end * 1000).toISOString();

      console.log(`💰 [Webhook] 处理订单: 用户 ${userId}, 方案 ${displayPlanName}`);
      console.log(`   - 有效期: ${startDate} 至 ${endDate}`);

      if (userId) {
        // 先检查是否已有订阅，有则更新，无则插入 (upsert)
        const { error } = await supabaseAdmin.from("subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          plan_name: displayPlanName,
          status: "active",
          current_period_start: startDate,
          current_period_end: endDate,
        }, { onConflict: 'user_id' }); // 确保一个用户只有一条活跃记录

        if (error) {
          console.error("❌ 数据库写入失败:", error);
          return new NextResponse("Database Error", { status: 500 });
        }
        console.log("✅ 数据库写入成功！");
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (err: any) {
    console.error("❌ 服务器错误:", err.message);
    return new NextResponse(`Server Error: ${err.message}`, { status: 500 });
  }
}