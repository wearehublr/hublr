import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { closeDeadOpportunityLinks } from "@/lib/check-dead-links";

export const dynamic = "force-dynamic";
// Real outbound HTTP checks (up to 50 opportunities, batches of 5, 8s
// timeout each) can take longer than the platform default; 60s is the
// Hobby-plan ceiling for a Vercel serverless function. Worst case here is
// 10 sequential batches of 5 timing out fully (10 x 8s = 80s), but that
// requires every single request to hang for the full 8s - in practice
// most resolve in well under a second, so this stays comfortably inside
// the 60s ceiling. Re-check this math before raising batchSize further.
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const { checked, closed } = await closeDeadOpportunityLinks(supabase);

  return NextResponse.json({ checked, closed });
}
