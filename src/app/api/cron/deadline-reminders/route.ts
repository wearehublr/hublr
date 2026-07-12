import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendUserEmail } from "@/lib/email";
import { getPreferredName } from "@/lib/profiles";

export const dynamic = "force-dynamic";

type Milestone = {
  daysOut: number;
  column: "reminder_7d_sent" | "reminder_3d_sent" | "reminder_0d_sent";
  label: string;
};

const MILESTONES: Milestone[] = [
  { daysOut: 7, column: "reminder_7d_sent", label: "in 7 days" },
  { daysOut: 3, column: "reminder_3d_sent", label: "in 3 days" },
  { daysOut: 0, column: "reminder_0d_sent", label: "today" },
];

function isoDateDaysFromNow(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  let sent = 0;

  for (const milestone of MILESTONES) {
    const targetDate = isoDateDaysFromNow(milestone.daysOut);

    const { data: applications, error } = await supabase
      .from("applications")
      .select("id, user_id, company, role_title, apply_url, deadline")
      .eq("deadline", targetDate)
      .eq(milestone.column, false)
      .not("stage", "in", "(rejected,withdrawn)");

    if (error || !applications) continue;

    for (const application of applications) {
      const { data: userData } = await supabase.auth.admin.getUserById(
        application.user_id,
      );
      const email = userData?.user?.email;
      if (!email) continue;

      const preferredName = await getPreferredName(supabase, application.user_id);

      const wasSent = await sendUserEmail(supabase, application.user_id, {
        to: email,
        subject: `Deadline ${milestone.label}: ${application.company} - ${application.role_title}`,
        text: [
          `Hi ${preferredName ?? "there"},`,
          ``,
          `Your tracked application is due ${milestone.label}:`,
          ``,
          `${application.company} - ${application.role_title}`,
          `Deadline: ${application.deadline}`,
          ``,
          application.apply_url ? `Apply here: ${application.apply_url}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
      });

      await supabase
        .from("applications")
        .update({ [milestone.column]: true, reminder_sent_at: new Date().toISOString() })
        .eq("id", application.id);

      if (wasSent) sent += 1;
    }
  }

  return NextResponse.json({ sent });
}
