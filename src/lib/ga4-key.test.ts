import { describe, it, expect } from "vitest";
import { generateKeyPairSync } from "node:crypto";
import { resolvePrivateKey, privateKeyParses } from "./ga4-key";

const pem = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
}).privateKey;

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64");
const trimmed = pem.trim();

describe("resolvePrivateKey", () => {
  it("passes a clean PEM through", () => {
    const out = resolvePrivateKey(pem);
    expect(privateKeyParses(out)).toBe(true);
  });

  it("decodes base64 of the PEM", () => {
    expect(privateKeyParses(resolvePrivateKey(b64(pem)))).toBe(true);
  });

  it("handles base64 of a PEM whose newlines are literal backslash-n", () => {
    const escaped = trimmed.replace(/\n/g, "\\n");
    expect(privateKeyParses(resolvePrivateKey(b64(escaped)))).toBe(true);
  });

  it("handles a raw PEM with literal backslash-n", () => {
    expect(privateKeyParses(resolvePrivateKey(trimmed.replace(/\n/g, "\\n")))).toBe(true);
  });

  it("handles CRLF line endings and wrapping quotes", () => {
    const crlf = `"${trimmed.replace(/\n/g, "\r\n")}"`;
    expect(privateKeyParses(resolvePrivateKey(crlf))).toBe(true);
    expect(privateKeyParses(resolvePrivateKey(b64(crlf)))).toBe(true);
  });

  it("handles spaces instead of newlines", () => {
    const flat = trimmed.replace(/\n/g, " ");
    expect(privateKeyParses(resolvePrivateKey(flat))).toBe(true);
  });

  it("handles base64 with line breaks or padding whitespace", () => {
    const wrapped = (b64(pem).match(/.{1,60}/g) ?? []).join("\n");
    expect(privateKeyParses(resolvePrivateKey(`  ${wrapped}\n`))).toBe(true);
  });

  it("extracts private_key from a whole service-account JSON, raw or base64", () => {
    const json = JSON.stringify({ client_email: "a@b.iam", private_key: pem });
    expect(privateKeyParses(resolvePrivateKey(json))).toBe(true);
    expect(privateKeyParses(resolvePrivateKey(b64(json)))).toBe(true);
  });

  it("reports a corrupt key as not parsing", () => {
    const broken = trimmed.slice(0, 120) + "\n-----END PRIVATE KEY-----";
    expect(privateKeyParses(resolvePrivateKey(b64(broken)))).toBe(false);
  });
});
