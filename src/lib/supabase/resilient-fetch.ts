// Supabase has an acknowledged infra bug (PGRST303 "JWT issued at future")
// where PostgREST's cached clock briefly lags behind real time on the first
// request over a fresh connection, rejecting a freshly-minted, valid JWT.
// The rejection happens before any database write executes, so retrying
// once is safe for every HTTP method - see
// https://github.com/orgs/supabase/discussions/48123
const JWT_ISSUED_AT_FUTURE_CODE = "PGRST303";
const RETRY_DELAY_MS = 1200;

export function createResilientFetch(): typeof fetch {
  return async (input, init) => {
    const response = await fetch(input, init);
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
