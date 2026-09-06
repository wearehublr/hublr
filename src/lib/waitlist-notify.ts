import type { SupabaseClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email";

export async function notifyWaitlistSignups(
  supabase: SupabaseClient,
): Promise<{ sent: number }> {
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

  return { sent };
}
