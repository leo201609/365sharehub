import { NextResponse } from 'next/server';
import stripe from '@/utils/stripe/server';
import { createClient } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { sendTelegramMessage } from '@/utils/telegram';

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

  // 🔥 使用 Service Role Key 创建超级管理员客户端，绕过所有 RLS 限制
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
        
        // 1. 提取元数据和基本信息
        const customerEmail = session.customer_details?.email || '未知邮箱';
        const planName = session.metadata?.plan_name || 'Pro Plan';
        const utmSource = session.metadata?.utm_source || 'direct'; // 🔥 获取流量来源
        const amount = (session.amount_total / 100).toFixed(2);
        const currency = session.currency?.toUpperCase() || 'EUR';

        if (!userId) {
            console.error("❌ No user_id found in session metadata");
            break;
        }

        // 2. 获取订阅详细状态
        const subscription = await stripe.subscriptions.retrieve(subscriptionId) as any;
        
        // 3. 写入数据库 (包含 UTM 来源)
        const { error } = await supabaseAdmin
          .from('subscriptions')
          .insert({
            user_id: userId,
            stripe_subscription_id: subscriptionId,
            stripe_customer_id: session.customer as string,
            plan_name: planName,
            status: subscription.status,
            utm_source: utmSource, // 🔥 记录该订单是哪个群带来的
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          });
        
        if (error) {
            console.error('❌ Supabase Insert Error:', error);
            throw error;
        }

        // 4. 优化 Telegram 通知逻辑
        const isTrial = subscription.status === 'trialing';
        const statusIcon = isTrial ? '🎁' : '✅';
        const statusText = isTrial ? '开启免费试用 (Trial)' : '订阅已激活 (Active)';
        
        // 如果金额为 0，说明是试用启动，显示未来需支付的价格
        const amountDisplay = amount === "0.00" 
          ? `免费试用 (后续: ${planName.includes('Monthly') ? '€2.50' : '€12.90'})` 
          : `${amount} ${currency}`;

        const msg = `🎉 <b>新订单成交啦！(New Order)</b>\n\n` +
                    `👤 <b>客户:</b> ${customerEmail}\n` +
                    `📦 <b>套餐:</b> ${planName}\n` +
                    `💰 <b>金额:</b> ${amountDisplay}\n` +
                    `📈 <b>状态:</b> ${statusIcon} ${statusText}\n` +
                    `🎯 <b>来源:</b> <code>${utmSource}</code>`; // 🔥 在 TG 里直接看来源
        
        await sendTelegramMessage(msg);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as any;
        
        // 获取最新的套餐名称
        const priceId = subscription.items.data[0].price.id;
        const price = await stripe.prices.retrieve(priceId, { expand: ['product'] }) as any;
        const productName = price.product.name;

        const { error } = await supabaseAdmin
          .from('subscriptions')
          .update({
            plan_name: productName,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id);

        if (error) {
          console.error('❌ Supabase Update Error:', error);
        } else {
          // 只有当状态从 trialing 变成 active 时（即试用转正成功扣款），发个喜报
          if (subscription.status === 'active') {
             await sendTelegramMessage(`💰 <b>试用转正成功！(Payment Success)</b>\n\n👤 <b>客户 ID:</b> <code>${subscription.customer}</code>\n📦 <b>套餐:</b> ${productName}\n🚀 资金已入账！`);
          } else {
             await sendTelegramMessage(`🔄 <b>订阅状态更新</b>\n\n📦 <b>当前套餐:</b> ${productName}\n📈 <b>最新状态:</b> ${subscription.status}`);
          }
        }
        break;
      }

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

        await sendTelegramMessage(`⚠️ <b>客户取消了订阅 (Subscription Canceled)</b>\n\n🆔 <b>Stripe ID:</b> <code>${subscription.customer}</code>\n💔 别难过，去看看怎么优化产品留存吧。`);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error(`❌ Webhook Error: ${error.message}`);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}