import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/opportunities";
const AUTH_ONLY_PREFIXES = ["/dashboard", "/documents", "/profile"];
const LOGGED_OUT_ONLY_PATHS = ["/login", "/signup"];

const WAITLIST_PATH = "/waitlist";
// Everything else redirects here for non-admins while WAITLIST_MODE is on -
// an allowlist rather than a denylist, so a new route is hidden by default
// instead of accidentally leaking product content.
const WAITLIST_ALLOWED_EXACT = new Set([
  WAITLIST_PATH,
  LOGIN_PATH,
  "/auth/callback",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.json",
  "/icon",
  "/apple-icon",
]);
const WAITLIST_ALLOWED_PREFIXES = ["/admin", "/api"];

function isWaitlistAllowed(pathname: string): boolean {
  return (
    WAITLIST_ALLOWED_EXACT.has(pathname) ||
    WAITLIST_ALLOWED_PREFIXES.some((p) => pathname.startsWith(p))
  );
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isAdmin = !!user && user.email === process.env.ADMIN_EMAIL;

  if (
    process.env.WAITLIST_MODE === "true" &&
    !isAdmin &&
    !isWaitlistAllowed(pathname)
  ) {
    return redirectTo(request, WAITLIST_PATH);
  }

  if (pathname.startsWith("/admin")) {
    if (!user) return redirectTo(request, LOGIN_PATH);
    if (!isAdmin) return redirectTo(request, DASHBOARD_PATH);
  }

  if (AUTH_ONLY_PREFIXES.some((p) => pathname.startsWith(p)) && !user) {
    return redirectTo(request, LOGIN_PATH);
  }

  if (LOGGED_OUT_ONLY_PATHS.includes(pathname) && user) {
    return redirectTo(request, DASHBOARD_PATH);
  }

  return response;
}
