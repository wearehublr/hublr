import type { SupabaseClient, User } from "@supabase/supabase-js";
import * as Sentry from "@sentry/nextjs";

// A transient Supabase error (a network blip, or a gateway error that
// outlasts resilient-fetch's retries) must not crash whatever calls this -
// proxy.ts's middleware runs it on nearly every request, and it's also
// called directly by every page and server action that needs to know who's
// signed in, so an uncaught throw here has an outsized blast radius. Falling
// back to "logged out" is a far smaller cost than a hard crash.
export async function getUser(supabase: SupabaseClient): Promise<User | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    Sentry.captureException(error, { tags: { source: "get-user" } });
    return null;
  }
}
