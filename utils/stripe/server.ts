import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
  // @ts-ignore
  apiVersion: '2023-10-16',
  typescript: true,
});

export default stripe;