import { headers } from "next/headers";

export async function getOrigin() {
  const h = await headers();
  const origin = h.get("origin");
  if (origin) return origin;

  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "https";
  return `${proto}://${host}`;
}
