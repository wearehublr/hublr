// Supabase has an acknowledged infra bug (PGRST303 "JWT issued at future")
// where PostgREST's cached clock briefly lags behind real time on the first
// request over a fresh connection, rejecting a freshly-minted, valid JWT.
// The rejection happens before any database write executes, so retrying
// once is safe for every HTTP method - see
// https://github.com/orgs/supabase/discussions/48123
const JWT_ISSUED_AT_FUTURE_CODE = "PGRST303";
const RETRY_DELAY_MS = 1200;

// Separately, Supabase's REST gateway occasionally returns a transient
// 502/503/504 under load (seen hitting /opportunities, the opportunity
// detail page, and the launch-check cron's waitlist query - sometimes as a
// clean 504, sometimes as an HTML error page from the gateway itself). A
// GET never mutates data, so retrying is always safe; non-GET requests are
// left alone since we can't tell whether the write landed before the
// gateway timed out. A single retry only helps with a brief blip, so this
// backs off across up to 2 retries (3 attempts total) to also ride out a
// few seconds of genuine gateway congestion.
const RETRYABLE_GATEWAY_STATUSES = new Set([502, 503, 504]);
const GATEWAY_RETRY_DELAYS_MS = [1200, 2500];

function isGetRequest(input: RequestInfo | URL, init?: RequestInit): boolean {
  if (init?.method) return init.method.toUpperCase() === "GET";
  return !(input instanceof Request) || input.method.toUpperCase() === "GET";
}

export function createResilientFetch(): typeof fetch {
  return async (input, init) => {
    let response = await fetch(input, init);

    if (isGetRequest(input, init)) {
      for (const delayMs of GATEWAY_RETRY_DELAYS_MS) {
        if (!RETRYABLE_GATEWAY_STATUSES.has(response.status)) break;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        response = await fetch(input, init);
      }
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
