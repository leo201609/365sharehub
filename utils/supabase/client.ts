import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // 获取环境变量
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // 如果在 Build 阶段缺失，提供符合格式要求的假 Key 以防止报错
  // 真实的 Key 会在运行时从 Coolify 环境变量中读取
  return createBrowserClient(
    supabaseUrl || "https://placeholder-project.supabase.co",
    supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy-key"
  );
}