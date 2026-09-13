// Supabase has an acknowledged infra bug (PGRST303 "JWT issued at future")
// where PostgREST's cached clock briefly lags behind real time on the first
// request over a fresh connection, rejecting a freshly-minted, valid JWT.
// The rejection happens before any database write executes, so retrying
// once is safe for every HTTP method - see
// https://github.com/orgs/supabase/discussions/48123
const JWT_ISSUED_AT_FUTURE_CODE = "PGRST303";
const RETRY_DELAY_MS = 1200;

// Separately, Supabase's REST gateway occasionally returns a transient
// 502/503/504 under load (seen hitting both /opportunities and the
// launch-check cron's waitlist query, confirmed to succeed on a plain
// reload). A GET never mutates data, so retrying one is always safe;
// non-GET requests are left alone since we can't tell whether the write
// landed before the gateway timed out.
const RETRYABLE_GATEWAY_STATUSES = new Set([502, 503, 504]);

function isGetRequest(input: RequestInfo | URL, init?: RequestInit): boolean {
  if (init?.method) return init.method.toUpperCase() === "GET";
  return !(input instanceof Request) || input.method.toUpperCase() === "GET";
}

export function createResilientFetch(): typeof fetch {
  return async (input, init) => {
    const response = await fetch(input, init);

    if (RETRYABLE_GATEWAY_STATUSES.has(response.status) && isGetRequest(input, init)) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return fetch(input, init);
    }

    if (response.status !== 401) return response;

    let body: string;
    try {
      body = await response.clone().text();
    } catch {
      return response;
    }
    if (!body.includes(JWT_ISSUED_AT_FUTURE_CODE)) return response;

    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
    return fetch(input, init);
  };
}
