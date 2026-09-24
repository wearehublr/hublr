import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";
import { buildWelcomeEmail } from "@/lib/welcome-email";

// Fires once per account, right when someone first confirms their email -
// the one moment we're guaranteed to be able to reach every sign-up, before
// most of them ever reach onboarding.
async function sendWelcomeEmailOnce(
  supabase: Awaited<ReturnType<typeof createClient>>,
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email || user.user_metadata?.welcome_email_sent) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";
  const { text, html } = buildWelcomeEmail(siteUrl);

  await sendEmail({ to: user.email, subject: "Welcome to Hublr!", text, html });

  await supabase.auth.updateUser({
    data: { ...user.user_metadata, welcome_email_sent: true },
  });
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/opportunities";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      await sendWelcomeEmailOnce(supabase);
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
