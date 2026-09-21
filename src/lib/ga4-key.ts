import { createPrivateKey } from "node:crypto";

// Accepts the service-account private key in any of the shapes it tends to
// arrive in through env-var UIs: base64 of the PEM, the PEM itself, either
// with literal "\n" sequences, CRLFs, spaces instead of newlines or wrapping
// quotes, or the whole service-account JSON. Always returns a clean PEM.
export function resolvePrivateKey(raw: string): string {
  let text = stripQuotes(raw.trim());

  if (!text.includes("-----BEGIN")) {
    text = Buffer.from(text.replace(/\s+/g, ""), "base64").toString("utf8").trim();
  }

  if (text.startsWith("{")) {
    try {
      const parsed = JSON.parse(text) as { private_key?: unknown };
      if (typeof parsed.private_key === "string") text = parsed.private_key;
    } catch {
      // fall through with the text as-is
    }
  }

  text = stripQuotes(text.trim())
    .replace(/\\r/g, "")
    .replace(/\\n/g, "\n")
    .replace(/\r/g, "");

  const match = text.match(/-----BEGIN ([A-Z ]+)-----([\s\S]*?)-----END \1-----/);
  if (!match) return text;

  const body = match[2].replace(/\s+/g, "");
  const lines = body.match(/.{1,64}/g)?.join("\n") ?? body;
  return `-----BEGIN ${match[1]}-----\n${lines}\n-----END ${match[1]}-----\n`;
}

export function privateKeyParses(pem: string): boolean {
  try {
    createPrivateKey(pem);
    return true;
  } catch {
    return false;
  }
}

function stripQuotes(value: string): string {
  return value.replace(/^["']+|["']+$/g, "");
}
