import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ opportunityId: string }> },
) {
  const { opportunityId } = await params;
  const supabase = await createClient();

  const { data: opportunity } = await supabase
    .from("opportunities")
    .select("apply_url")
    .eq("id", opportunityId)
    .maybeSingle();

  if (!opportunity) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from("link_clicks").insert({
    opportunity_id: opportunityId,
    user_id: user?.id ?? null,
  });

  return NextResponse.redirect(opportunity.apply_url);
}
