import { createClient } from "@/lib/supabase/server";
import { getUserApplications } from "@/lib/applications";
import { getRecentPublishedOpportunities } from "@/lib/opportunities";
import { getUpcomingEvents } from "@/lib/events";
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
    return <MarketingHome />;
  }

  const [applications, recentOpportunities, upcomingEvents] = await Promise.all([
    getUserApplications(supabase, user.id),
    getRecentPublishedOpportunities(supabase, 3),
    getUpcomingEvents(supabase, 3),
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
    />
  );
}
