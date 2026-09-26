import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/get-user";

export async function requireAdmin() {
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Unauthorized");
  }
  return supabase;
}
