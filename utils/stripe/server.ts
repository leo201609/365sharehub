import Stripe from 'stripe'; // 🔥 必须包含这一行，否则报错！

// 如果没有 key，就用一个空字符串占位，防止 build 阶段报错
// 注意：这只是为了让 build 通过，运行时如果没有 key 还是会报错，这是符合预期的
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // @ts-ignore (如果是最新版 Stripe 可能不需要这个忽略，但为了兼容性建议加上)
  apiVersion: '2023-10-16', 
  typescript: true,
});

export default stripe;