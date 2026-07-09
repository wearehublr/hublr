import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const LOGIN_PATH = "/login";
const DASHBOARD_PATH = "/dashboard";
const AUTH_ONLY_PREFIXES = ["/dashboard", "/documents"];
const LOGGED_OUT_ONLY_PATHS = ["/login", "/signup"];

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
