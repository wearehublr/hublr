"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { notifyWaitlistSignups } from "@/lib/waitlist-notify";

export async function deleteWaitlistSignup(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("waitlist_signups").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/waitlist");
}

export async function notifyWaitlist(): Promise<{ sent: number }> {
  const supabase = await requireAdmin();
  const result = await notifyWaitlistSignups(supabase);
  revalidatePath("/admin/waitlist");
  return result;
}
