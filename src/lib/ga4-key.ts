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
  const normalized = `-----BEGIN ${match[1]}-----\n${lines}\n-----END ${match[1]}-----\n`;

  // Some service-account key exports use the legacy PKCS#1 ("RSA PRIVATE
  // KEY") encoding. Node's newer OpenSSL 3 "DECODER routines" can reject
  // that encoding specifically in the JWT-signing code path
  // google-auth-library uses, even though createPrivateKey() parses it
  // fine on its own - re-exporting through Node's own crypto forces a
  // clean, modern PKCS#8 PEM that both code paths handle consistently.
  try {
    return createPrivateKey(normalized)
      .export({ type: "pkcs8", format: "pem" })
      .toString();
  } catch {
    return normalized; // let privateKeyParses()/describeKeyShape() surface the real problem
  }
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
