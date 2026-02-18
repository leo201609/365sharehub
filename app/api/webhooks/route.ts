import { NextResponse } from 'next/server';
import stripe from '@/utils/stripe/server';
import { createClient } from '@supabase/supabase-js'; // 🔥 改用核心库直接创建
import { headers } from 'next/headers';

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
  // 这样可以绕过 RLS (Row Level Security) 限制，确保能写入数据库
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
            plan_name: session.metadata?.plan_name || 'Pro Plan',
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
          });
        
        if (error) {
            console.error('❌ Supabase Insert Error:', error);
            throw error;
        }
        break;
      }

      case 'customer.subscription.updated':
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