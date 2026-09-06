import type { SupabaseClient } from "@supabase/supabase-js";
import type { Profile } from "@/types/profile";
import { getPublishedOpportunities } from "@/lib/opportunities";
import { scoreOpportunity, isClosingWithinDays } from "@/lib/recommendations";
import { getSponsorshipDisplay } from "@/lib/visa-sponsorship";
import { sendUserEmail } from "@/lib/email";
import { buildOpportunitySlug } from "@/lib/slug";

const MAX_LISTED = 5;
const FALLBACK_LOOKBACK_DAYS = 7;

function hasPreferences(profile: Profile): boolean {
  return (
    profile.interested_industries.length > 0 ||
    profile.preferred_categories.length > 0 ||
    profile.preferred_regions.length > 0
  );
}

export async function processMatchDigest(
  adminSupabase: SupabaseClient,
): Promise<number> {
  const { data: profiles } = await adminSupabase
    .from("profiles")
    .select("*")
    .not("onboarding_completed_at", "is", null);

  if (!profiles || profiles.length === 0) return 0;

  const opportunities = await getPublishedOpportunities(adminSupabase);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";
  const now = new Date();
  let sent = 0;

  for (const profile of profiles as Profile[]) {
    if (!hasPreferences(profile)) continue;

    const since = profile.last_match_digest_sent_at
      ? new Date(profile.last_match_digest_sent_at)
      : new Date(now.getTime() - FALLBACK_LOOKBACK_DAYS * 24 * 60 * 60 * 1000);

    const matched = opportunities
      .filter((o) => o.status !== "closed" && new Date(o.created_at) > since)
      .map((opportunity) => ({
        opportunity,
        reasons: scoreOpportunity(opportunity, profile),
      }))
      .filter((m) => m.reasons.length > 0);

    if (matched.length === 0) continue;

    const closingThisWeek = matched.filter((m) =>
      isClosingWithinDays(m.opportunity, 7),
    ).length;
    const sponsorshipMatches = matched.filter(
      (m) => getSponsorshipDisplay(m.opportunity) === "yes",
    ).length;

    const { data: userData } = await adminSupabase.auth.admin.getUserById(
      profile.id,
    );
    const email = userData?.user?.email;
    if (!email) continue;

    const top = matched.slice(0, MAX_LISTED);
    const preferredName = profile.preferred_name ?? "there";

    const summaryLines = [
      closingThisWeek > 0
        ? `🔥 ${closingThisWeek} close${closingThisWeek === 1 ? "s" : ""} this week`
        : null,
      profile.requires_sponsorship === true && sponsorshipMatches > 0
        ? `🌍 ${sponsorshipMatches} offer visa sponsorship`
        : null,
    ].filter((line): line is string => line !== null);

    const wasSent = await sendUserEmail(adminSupabase, profile.id, {
      to: email,
      subject: `${matched.length} new opportunit${matched.length === 1 ? "y matches" : "ies match"} your profile`,
      text: [
        `Hi ${preferredName},`,
        ``,
        `${matched.length} new opportunit${matched.length === 1 ? "y" : "ies"} on Hublr match your profile:`,
        ``,
        ...summaryLines,
        ``,
        ...top.map(
          ({ opportunity: o }) =>
            `- ${o.company} - ${o.role_title}: ${siteUrl}/opportunity/${buildOpportunitySlug(o)}`,
        ),
        matched.length > top.length
          ? `\n...and ${matched.length - top.length} more.`
          : null,
        ``,
        `See all your matches: ${siteUrl}/`,
      ]
        .filter((line): line is string => line !== null)
        .join("\n"),
    });

    if (wasSent) {
      await adminSupabase
        .from("profiles")
        .update({ last_match_digest_sent_at: now.toISOString() })
        .eq("id", profile.id);
      sent += 1;
    }
  }

  return sent;
}
