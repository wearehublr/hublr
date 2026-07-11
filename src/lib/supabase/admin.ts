import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Service-role client for backend-only jobs (e.g. the deadline reminder
// cron) that need to read/update rows across all users, bypassing RLS.
// Never import this from client or user-request code paths.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
