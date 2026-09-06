"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { sendEmail } from "@/lib/email";

export async function deleteWaitlistSignup(id: string) {
  const supabase = await requireAdmin();
  const { error } = await supabase.from("waitlist_signups").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/waitlist");
}

export async function notifyWaitlist(): Promise<{ sent: number }> {
  const supabase = await requireAdmin();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";

  const { data: pending, error } = await supabase
    .from("waitlist_signups")
    .select("id, email, name")
    .is("notified_at", null);

  if (error) throw new Error(error.message);
  if (!pending || pending.length === 0) return { sent: 0 };

  let sent = 0;
  for (const signup of pending) {
    await sendEmail({
      to: signup.email,
      subject: "Hublr is live! 🎉",
      text: [
        `Hi ${signup.name || "there"},`,
        ``,
        `Hublr just went live! Head over to ${siteUrl} to start browsing live internships, off-cycle, and grad roles across the UK, EU, and US, complete with visa sponsorship info, application tracking, deadline reminders, and interview prep.`,
        ``,
        `${siteUrl}/signup`,
        ``,
        `See you there!`,
      ].join("\n"),
    });

    await supabase
      .from("waitlist_signups")
      .update({ notified_at: new Date().toISOString() })
      .eq("id", signup.id);

    sent += 1;
  }

  revalidatePath("/admin/waitlist");
  return { sent };
}
