import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { notifyWaitlistSignups } from "@/lib/waitlist-notify";

export const dynamic = "force-dynamic";

// Runs every few minutes so the "we're live" email goes out shortly after
// LAUNCH_AT passes, without needing anyone awake to trigger it. Cheap to
// run indefinitely afterward: once every waitlist row has notified_at set,
// notifyWaitlistSignups() just finds nothing to do.
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const launchAt = process.env.LAUNCH_AT;
  if (!launchAt) {
    return NextResponse.json({ skipped: "LAUNCH_AT not set" });
  }

  const launchTime = new Date(launchAt).getTime();
  if (Number.isNaN(launchTime) || Date.now() < launchTime) {
    return NextResponse.json({ skipped: "launch time not yet reached" });
  }

  const supabase = createAdminClient();
  const { sent } = await notifyWaitlistSignups(supabase);

  return NextResponse.json({ sent });
}
