import { redirect } from 'next/navigation';

export default function UpgradePage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  // 获取 URL 里的 email 参数，方便以后做个性化统计
  const email = searchParams.email;
  console.log(`User ${email} is trying to upgrade!`);

  // 直接跳转到首页或 Dashboard 的定价区域
  // 假设你的定价区域在首页，且有 id="pricing"
  redirect('/#pricing'); 
  
  // 或者跳转到 Dashboard 让用户自己点
  // redirect('/dashboard');
}