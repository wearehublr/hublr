import { BetaAnalyticsDataClient } from "@google-analytics/data";
import * as Sentry from "@sentry/nextjs";
import { resolvePrivateKey, privateKeyParses } from "@/lib/ga4-key";

export type GA4Overview = {
  activeUsers: number;
  sessions: number;
  pageViews: number;
  avgSessionDurationSeconds: number;
};

export type GA4TopPage = {
  path: string;
  views: number;
  avgSessionDurationSeconds: number;
};

export type GA4TrafficSource = {
  channel: string;
  sessions: number;
  activeUsers: number;
};

export type GA4Metrics = {
  overview: GA4Overview;
  topPages: GA4TopPage[];
  trafficSources: GA4TrafficSource[];
};

// Env-var UIs mangle multi-line keys in many ways (quotes, CRLFs, literal
// "\n", spaces for newlines), so the key is normalised to a clean PEM
// whatever shape it was pasted in.
function rawKeyFromEnv(): string {
  return process.env.GA4_PRIVATE_KEY_B64 ?? process.env.GA4_PRIVATE_KEY ?? "";
}

function getClient(): BetaAnalyticsDataClient | null {
  const clientEmail = process.env.GA4_CLIENT_EMAIL?.trim();
  const rawKey = rawKeyFromEnv();
  if (!clientEmail || !rawKey) return null;

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: resolvePrivateKey(rawKey),
    },
  });
}

// Shape-only diagnostics for when the key still fails to parse - lengths and
// booleans, never the key content itself, so this is safe to attach to an
// error report.
function describeKeyShape(): Record<string, unknown> {
  const rawKey = rawKeyFromEnv();
  const pem = resolvePrivateKey(rawKey);
  return {
    envVarUsed: process.env.GA4_PRIVATE_KEY_B64 ? "GA4_PRIVATE_KEY_B64" : process.env.GA4_PRIVATE_KEY ? "GA4_PRIVATE_KEY" : "none",
    rawLength: rawKey.length,
    pemLength: pem.length,
    pemLineCount: pem.split("\n").length,
    startsWithPemHeader: pem.startsWith("-----BEGIN PRIVATE KEY-----"),
    endsWithPemFooter: pem.trim().endsWith("-----END PRIVATE KEY-----"),
    keyParses: privateKeyParses(pem),
    clientEmailSet: Boolean(process.env.GA4_CLIENT_EMAIL),
    propertyIdSet: Boolean(process.env.GA4_PROPERTY_ID),
  };
}

export type GA4Result = { metrics: GA4Metrics | null; problem: string | null };

export async function getGA4Metrics(): Promise<GA4Metrics | null> {
  return (await getGA4Result()).metrics;
}

// metrics is null if GA4 isn't configured or the API call fails - this is a
// supplementary panel on the admin dashboard, so it degrades instead of
// breaking the page. "problem" says why, so the admin page can show the reason
// (admin-only, never includes key material).
export async function getGA4Result(): Promise<GA4Result> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const client = getClient();
  if (!propertyId || !client) {
    const missing = [
      !propertyId && "GA4_PROPERTY_ID",
      !process.env.GA4_CLIENT_EMAIL?.trim() && "GA4_CLIENT_EMAIL",
      !rawKeyFromEnv() && "GA4_PRIVATE_KEY_B64",
    ].filter(Boolean).join(", ");
    Sentry.captureMessage(`GA4 metrics skipped: missing ${missing}`, {
      level: "warning",
      tags: { source: "ga4-metrics" },
    });
    return { metrics: null, problem: `Missing environment variable(s): ${missing}` };
  }

  const property = `properties/${propertyId}`;
  const dateRanges = [{ startDate: "28daysAgo", endDate: "today" }];

  try {
    const [[overviewResp], [pagesResp], [sourcesResp]] = await Promise.all([
      client.runReport({
        property,
        dateRanges,
        metrics: [
          { name: "activeUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "averageSessionDuration" },
        ],
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "averageSessionDuration" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 10,
      }),
      client.runReport({
        property,
        dateRanges,
        dimensions: [{ name: "sessionDefaultChannelGroup" }],
        metrics: [{ name: "sessions" }, { name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      }),
    ]);

    const overviewRow = overviewResp.rows?.[0];
    const overview: GA4Overview = {
      activeUsers: Number(overviewRow?.metricValues?.[0]?.value ?? 0),
      sessions: Number(overviewRow?.metricValues?.[1]?.value ?? 0),
      pageViews: Number(overviewRow?.metricValues?.[2]?.value ?? 0),
      avgSessionDurationSeconds: Number(overviewRow?.metricValues?.[3]?.value ?? 0),
    };

    const topPages: GA4TopPage[] = (pagesResp.rows ?? []).map((row) => ({
      path: row.dimensionValues?.[0]?.value ?? "",
      views: Number(row.metricValues?.[0]?.value ?? 0),
      avgSessionDurationSeconds: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    const trafficSources: GA4TrafficSource[] = (sourcesResp.rows ?? []).map((row) => ({
      channel: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
      activeUsers: Number(row.metricValues?.[1]?.value ?? 0),
    }));

    return { metrics: { overview, topPages, trafficSources }, problem: null };
  } catch (error) {
    const shape = describeKeyShape();
    Sentry.captureException(error, {
      tags: { source: "ga4-metrics" },
      extra: shape,
    });
    const message = error instanceof Error ? error.message : String(error);
    return {
      metrics: null,
      problem: `${message.slice(0, 300)} | key check: ${JSON.stringify(shape)}`,
    };
  }
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}
