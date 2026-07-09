"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Some Supabase-generated links (e.g. a magic link sent manually from the
// dashboard) use the older implicit flow, which puts the session tokens in
// the URL fragment (`#access_token=...`) instead of a `?code=` query param.
// Fragments are never sent to the server, so nothing server-side can process
// them. Instantiating the browser client here triggers its built-in
// detectSessionInUrl behavior, which reads the fragment, establishes the
// session (writing it to cookies so the server sees it too), and strips the
// fragment from the URL.
export default function SupabaseAuthListener() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  return null;
}
