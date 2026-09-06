import { headers } from "next/headers";

// Fails open (returns true) when TURNSTILE_SECRET_KEY isn't set, so local
// dev and any environment without Turnstile configured keeps working -
// mirrors how sendEmail() degrades gracefully when RESEND_API_KEY is
// missing. Once the key is set in Vercel, verification is enforced.
export async function verifyTurnstileToken(token: string | null): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error("[turnstile] TURNSTILE_SECRET_KEY is not set; skipping verification.");
    return true;
  }
  if (!token) return false;

  const h = await headers();
  const remoteIp = h.get("x-forwarded-for")?.split(",")[0]?.trim();

  const body = new URLSearchParams({ secret: secretKey, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("[turnstile] Verification request failed:", err);
    return false;
  }
}
