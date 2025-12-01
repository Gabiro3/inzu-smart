import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.warn("Supabase admin client is missing URL or service role key. Check your environment variables.")
}

export function createSupabaseAdminClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase URL or service role key is not defined.")
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false },
  })
}

