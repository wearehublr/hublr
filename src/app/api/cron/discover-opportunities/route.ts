import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { discoverNewOpportunities } from "@/lib/discover-new-opportunities";

export const dynamic = "force-dynamic";
// Polls every recognized-ATS board already represented in the table (could
// be a couple dozen), each with its own request(s); needs more headroom
// than the single-job checks in auto-close-links.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { found, inserted } = await discoverNewOpportunities(supabase);

  return NextResponse.json({ found, inserted });
}
