import { NextResponse } from 'next/server';
import stripe from '@/utils/stripe/server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { sendTelegramMessage } from '@/utils/telegram'; // 🔥 引入我们刚刚创建的 Telegram 全局推送工具
import Stripe from 'stripe'; // 🔥 引入 Stripe 类型用于智能提示

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (err: any) {
    console.error(`❌ Webhook Signature Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // 🔥 核心修改：使用 Service Role Key 创建超级管理员客户端
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, 
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any;
        const subscriptionId = session.subscription as string;
        const userId = session.client_reference_id;
        
        // 提取更丰富的订单信息用于推送
        const customerEmail = session.customer_details?.email || '未知邮箱';
        const planName = session.metadata?.plan_name || 'Pro Plan';
        const amount = (session.amount_total / 100).toFixed(2);
        const currency = session.currency?.toUpperCase() || 'EUR';

        if (!userId) {
            console.error("❌ No user_id found in session metadata");
            break;
        }

        // 获取订阅详情
        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
        
        // 写入数据库 (使用 admin 权限)
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .insert({
            user_id: userId,
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: session.customer as string,
            plan_name: planName,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          });
        
        if (error) {
            console.error('❌ Supabase Insert Error:', error);
            throw error;
        }

        // ==========================================
        // 🚀 发送 Telegram 订单成功捷报！
        // ==========================================
        const statusText = subscription.status === 'trialing' ? '🎁 开启免费试用 (Trial)' : '✅ 订阅已激活 (Active)';
        const msg = `🎉 <b>新订单成交啦！(New Order)</b>\n\n👤 <b>客户:</b> ${customerEmail}\n📦 <b>套餐:</b> ${planName}\n💰 <b>金额:</b> ${amount} ${currency}\n📈 <b>状态:</b> ${statusText}`;
        
        await sendTelegramMessage(msg);
        // ==========================================

        break;
      }

      // 🔥 单独抽离并强化的更新逻辑 (处理升级/降级/续费)
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // 1. 获取最新的套餐名称 (应对用户在 Customer Portal 升级/更改套餐)
        const priceId = subscription.items.data[0].price.id;
        const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
        const productName = (price.product as Stripe.Product).name;

        // 2. 更新数据库，包含最新的套餐名和日期
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({
            plan_name: productName, // 🔥 这里会把 Monthly 覆盖成 6 Months
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('❌ Supabase Update Error:', error);
        } else {
          // ==========================================
          // 🔄 发送 Telegram 升级/变更提醒！
          // ==========================================
          await sendTelegramMessage(`🔄 <b>客户更新了套餐 (Subscription Updated)</b>\n\n📦 <b>当前套餐:</b> ${productName}\n📈 <b>状态:</b> ${subscription.status}`);
        }
        break;
      }

      // 单独处理取消订阅
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any;
        
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) console.error('❌ Supabase Update Error:', error);

        // ==========================================
        // ⚠️ 客户流失/取消订阅提醒
        // ==========================================
        await sendTelegramMessage(`⚠️ <b>客户取消了订阅 (Subscription Canceled)</b>\n\n🆔 <b>Stripe ID:</b> ${subscription.customer}`);
        // ==========================================

        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ DB Sync Error: ${error.message}`);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}