import { createBrowserClient } from '@supabase/ssr' // 👈 之前漏了这一行

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return createBrowserClient(
    supabaseUrl || "https://placeholder-project.supabase.co",
    supabaseKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy.payload"
  );
}