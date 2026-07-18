import { createClient } from "@/lib/supabase/server";
import { getUserApplications } from "@/lib/applications";
import {
  getPublishedOpportunitiesCount,
  getRecentPublishedOpportunities,
} from "@/lib/opportunities";
import { getUpcomingEvents, getUpcomingEventsCount } from "@/lib/events";
import { getPublishedInterviewResources } from "@/lib/interview-resources";
import { getPublishedTestimonials } from "@/lib/testimonials";
import { getPublishedNewsletterArticles } from "@/lib/newsletter-articles";
import { getUserDocuments } from "@/lib/documents";
import { getUserSavedSearches } from "@/lib/saved-searches";
import { getPreferredName } from "@/lib/profiles";
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
    const [opportunitiesCount, eventsCount, testimonials, articles] =
      await Promise.all([
        getPublishedOpportunitiesCount(supabase),
        getUpcomingEventsCount(supabase),
        getPublishedTestimonials(supabase),
        getPublishedNewsletterArticles(supabase),
      ]);
    return (
      <MarketingHome
        opportunitiesCount={opportunitiesCount}
        eventsCount={eventsCount}
        testimonials={testimonials}
        articles={articles}
      />
    );
  }

  const [
    applications,
    recentOpportunities,
    upcomingEvents,
    resources,
    documents,
    savedSearches,
    newsletterArticles,
    preferredName,
  ] = await Promise.all([
    getUserApplications(supabase, user.id),
    getRecentPublishedOpportunities(supabase, 3),
    getUpcomingEvents(supabase, 3),
    getPublishedInterviewResources(supabase),
    getUserDocuments(supabase, user.id),
    getUserSavedSearches(supabase, user.id),
    getPublishedNewsletterArticles(supabase),
    getPreferredName(supabase, user.id),
  ]);

  const upcomingDeadlines = filterUpcomingDeadlines(
    applications,
    UPCOMING_WINDOW_DAYS,
  );
  const activeApplicationsCount = applications.filter((a) =>
    ACTIVE_STAGES.has(a.stage),
  ).length;
  const name = preferredName ?? user.email?.split("@")[0] ?? "there";

  return (
    <HomeFeed
      name={name}
      upcomingDeadlines={upcomingDeadlines}
      recentOpportunities={recentOpportunities}
      upcomingEvents={upcomingEvents}
      recentResources={resources.slice(0, 3)}
      activeApplicationsCount={activeApplicationsCount}
      documents={documents}
      savedSearches={savedSearches}
      newsletterArticles={newsletterArticles.slice(0, 3)}
    />
  );
}
