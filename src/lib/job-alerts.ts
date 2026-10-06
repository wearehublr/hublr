import type { SupabaseClient } from "@supabase/supabase-js";
import { sendUserEmailWithOutcome } from "@/lib/email";
import { getPreferredName } from "@/lib/profiles";

// Keeps room in Resend's 100/day free quota for signup and password-reset
// emails. Alerts over the cap are picked up on the next daily run.
const MAX_ALERTS_PER_RUN = 15;

export async function processJobAlerts(
  adminSupabase: SupabaseClient,
): Promise<number> {
  const { data: searches } = await adminSupabase
    .from("saved_searches")
    .select("*");

  if (!searches) return 0;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";
  let sent = 0;

  for (const search of searches) {
    if (sent >= MAX_ALERTS_PER_RUN) break;
    const since = search.last_notified_at ?? search.created_at;

    let query = adminSupabase
      .from("opportunities")
      .select("id, company, role_title")
      .eq("is_published", true)
      .gt("created_at", since);

    if (search.region) query = query.eq("region", search.region);
    if (search.category) query = query.eq("category", search.category);
    if (search.visa_sponsorship)
      query = query.eq("visa_sponsorship", search.visa_sponsorship);
    if (search.industry) query = query.eq("industry", search.industry);

    const { data: candidates } = await query;
    if (!candidates || candidates.length === 0) continue;

    const keyword = search.keyword?.toLowerCase();
    const matches = keyword
      ? candidates.filter((m) =>
          `${m.company} ${m.role_title}`.toLowerCase().includes(keyword),
        )
      : candidates;

    if (matches.length === 0) continue;

    const { data: userData } = await adminSupabase.auth.admin.getUserById(
      search.user_id,
    );
    const email = userData?.user?.email;
    if (!email) continue;

    const preferredName = await getPreferredName(adminSupabase, search.user_id);

    const outcome = await sendUserEmailWithOutcome(adminSupabase, search.user_id, {
      to: email,
      subject: `${matches.length} new match${matches.length === 1 ? "" : "es"} for your alert: ${search.label}`,
      text: [
        `Hi ${preferredName ?? "there"},`,
        ``,
        `New opportunities matching your saved alert "${search.label}":`,
        ``,
        ...matches.map((m) => `- ${m.company} - ${m.role_title}`),
        ``,
        `View them: ${siteUrl}/opportunities`,
      ].join("\n"),
    });

    if (outcome === "quota_exceeded") break;
    if (outcome === "sent") {
      await adminSupabase
        .from("saved_searches")
        .update({ last_notified_at: new Date().toISOString() })
        .eq("id", search.id);
      sent += 1;
    }
  }

  return sent;
}
