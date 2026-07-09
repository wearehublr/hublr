import { createClient } from "@/lib/supabase/server";
import { getUserApplications } from "@/lib/applications";
import {
  getPublishedOpportunitiesCount,
  getRecentPublishedOpportunities,
} from "@/lib/opportunities";
import { getUpcomingEvents, getUpcomingEventsCount } from "@/lib/events";
import { getPublishedInterviewResources } from "@/lib/interview-resources";
import { filterUpcomingDeadlines } from "@/lib/deadlines";
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
    const [opportunitiesCount, eventsCount] = await Promise.all([
      getPublishedOpportunitiesCount(supabase),
      getUpcomingEventsCount(supabase),
    ]);
    return (
      <MarketingHome
        opportunitiesCount={opportunitiesCount}
        eventsCount={eventsCount}
      />
    );
  }

  const [applications, recentOpportunities, upcomingEvents, resources] =
    await Promise.all([
      getUserApplications(supabase, user.id),
      getRecentPublishedOpportunities(supabase, 3),
      getUpcomingEvents(supabase, 3),
      getPublishedInterviewResources(supabase),
    ]);

  const upcomingDeadlines = filterUpcomingDeadlines(
    applications,
    UPCOMING_WINDOW_DAYS,
  );
  const name = user.email?.split("@")[0] ?? "there";

  return (
    <HomeFeed
      name={name}
      upcomingDeadlines={upcomingDeadlines}
      recentOpportunities={recentOpportunities}
      upcomingEvents={upcomingEvents}
      recentResources={resources.slice(0, 3)}
    />
  );
}
