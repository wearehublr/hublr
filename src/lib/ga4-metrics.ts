import { BetaAnalyticsDataClient } from "@google-analytics/data";
import * as Sentry from "@sentry/nextjs";

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

// Env vars holding a PEM key are notoriously easy to paste wrong: extra
// surrounding quotes, Windows CRLF line endings, or literal "\n" escape
// sequences instead of real newlines all produce a PEM string OpenSSL's
// DECODER rejects outright. Normalize all of these rather than assume one
// exact paste format.
function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, "\n").replace(/\r\n/g, "\n").trim() + "\n";
}

function getClient(): BetaAnalyticsDataClient | null {
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GA4_PRIVATE_KEY;
  if (!clientEmail || !rawPrivateKey) return null;

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: normalizePrivateKey(rawPrivateKey),
    },
  });
}

// Returns null if GA4 isn't configured (missing env vars) or the API call
// fails for any reason - this is a supplementary panel on the admin
// dashboard, not core functionality, so it should degrade silently rather
// than break the page.
export async function getGA4Metrics(): Promise<GA4Metrics | null> {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const client = getClient();
  if (!propertyId || !client) {
    Sentry.captureMessage("GA4 metrics skipped: missing GA4_PROPERTY_ID/GA4_CLIENT_EMAIL/GA4_PRIVATE_KEY", {
      level: "warning",
      tags: { source: "ga4-metrics" },
    });
    return null;
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

    return { overview, topPages, trafficSources };
  } catch (error) {
    Sentry.captureException(error, { tags: { source: "ga4-metrics" } });
    return null;
  }
}

export function formatDuration(totalSeconds: number): string {
  const seconds = Math.round(totalSeconds);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}m ${remainingSeconds.toString().padStart(2, "0")}s`;
}
