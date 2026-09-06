import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserApplications } from "@/lib/applications";
import {
  getPublishedOpportunitiesCount,
  getPublishedOpportunities,
  getVisaSponsorshipOpportunitiesCount,
  getOpportunitiesClosingWithinDaysCount,
} from "@/lib/opportunities";
import { getRecommendedOpportunities, countClosingWithinDays } from "@/lib/recommendations";
import { getCompanyEventMatches } from "@/lib/company-event-matches";
import { getCompanyOpportunityMatches } from "@/lib/company-opportunity-matches";
import {
  getUpcomingEvents,
  getUpcomingEventsCount,
  getUserSavedEvents,
} from "@/lib/events";
import { getPublishedInterviewResources } from "@/lib/interview-resources";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getUserDocuments } from "@/lib/documents";
import { getUserSavedSearches } from "@/lib/saved-searches";
import { getProfile } from "@/lib/profiles";
import { filterUpcomingDeadlines, ACTIVE_STAGES } from "@/lib/deadlines";
import MarketingHome from "@/app/components/MarketingHome";
import HomeFeed from "@/app/components/HomeFeed";

export const dynamic = "force-dynamic";

const UPCOMING_WINDOW_DAYS = 14;

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const [
      opportunitiesCount,
      eventsCount,
      testimonials,
      sponsorshipCount,
      closingThisWeekCount,
    ] = await Promise.all([
      getPublishedOpportunitiesCount(supabase),
      getUpcomingEventsCount(supabase),
      getPublishedTestimonials(supabase),
      getVisaSponsorshipOpportunitiesCount(supabase),
      getOpportunitiesClosingWithinDaysCount(supabase, 7),
    ]);
    return (
      <MarketingHome
        opportunitiesCount={opportunitiesCount}
        eventsCount={eventsCount}
        testimonials={testimonials}
        sponsorshipCount={sponsorshipCount}
        closingThisWeekCount={closingThisWeekCount}
      />
    );
  }

  const profile = await getProfile(supabase, user.id);
  if (!profile?.onboarding_completed_at) {
    redirect("/onboarding?next=%2F");
  }

  const [
    applications,
    opportunities,
    upcomingEvents,
    resources,
    documents,
    savedSearches,
    savedEvents,
  ] = await Promise.all([
    getUserApplications(supabase, user.id),
    getPublishedOpportunities(supabase),
    getUpcomingEvents(supabase, 100),
    getPublishedInterviewResources(supabase),
    getUserDocuments(supabase, user.id),
    getUserSavedSearches(supabase, user.id),
    getUserSavedEvents(supabase, user.id),
  ]);

  const upcomingDeadlines = filterUpcomingDeadlines(
    applications,
    UPCOMING_WINDOW_DAYS,
  );
  const activeApplicationsCount = applications.filter((a) =>
    ACTIVE_STAGES.has(a.stage),
  ).length;
  const name = profile.preferred_name ?? user.email?.split("@")[0] ?? "there";

  const recommended = getRecommendedOpportunities(opportunities, profile, 3);

  const closingThisWeekCount = countClosingWithinDays(opportunities, 7);

  const companyEventMatches = getCompanyEventMatches(applications, upcomingEvents);
  const companyOpportunityMatches = getCompanyOpportunityMatches(applications, opportunities);

  return (
    <HomeFeed
      name={name}
      upcomingDeadlines={upcomingDeadlines}
      recommended={recommended}
      closingThisWeekCount={closingThisWeekCount}
      upcomingEvents={upcomingEvents.slice(0, 3)}
      recentResources={resources.slice(0, 3)}
      activeApplicationsCount={activeApplicationsCount}
      documents={documents}
      savedSearches={savedSearches}
      savedEvents={savedEvents}
      companyEventMatches={companyEventMatches}
      companyOpportunityMatches={companyOpportunityMatches}
    />
  );
}
