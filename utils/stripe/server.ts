// 如果没有 key，就用一个空字符串占位，防止 build 阶段报错
// 注意：这只是为了让 build 通过，运行时如果没有 key 还是会报错，这是符合预期的
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2023-10-16', // 你的版本号
  typescript: true,
});