import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createResilientFetch } from "./resilient-fetch";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), { status });
}

describe("createResilientFetch", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("passes through a successful response unchanged", async () => {
    const mockFetch = vi.fn().mockResolvedValue(jsonResponse(200, { ok: true }));
    vi.stubGlobal("fetch", mockFetch);

    const resilientFetch = createResilientFetch();
    const response = await resilientFetch("https://example.com");

    expect(response.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("does not retry a 401 that isn't the JWT-issued-at-future error", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(jsonResponse(401, { code: "invalid_credentials" }));
    vi.stubGlobal("fetch", mockFetch);

    const resilientFetch = createResilientFetch();
    const response = await resilientFetch("https://example.com");

    expect(response.status).toBe(401);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("retries once after a PGRST303 401 and returns the retry's response", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse(401, { code: "PGRST303", message: "JWT issued at future" }))
      .mockResolvedValueOnce(jsonResponse(200, { ok: true }));
    vi.stubGlobal("fetch", mockFetch);

    const resilientFetch = createResilientFetch();
    const responsePromise = resilientFetch("https://example.com");
    await vi.advanceTimersByTimeAsync(1200);
    const response = await responsePromise;

    expect(response.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it("only retries once, even if the retry also fails with PGRST303", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(jsonResponse(401, { code: "PGRST303", message: "JWT issued at future" }));
    vi.stubGlobal("fetch", mockFetch);

    const resilientFetch = createResilientFetch();
    const responsePromise = resilientFetch("https://example.com");
    await vi.advanceTimersByTimeAsync(1200);
    const response = await responsePromise;

    expect(response.status).toBe(401);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
