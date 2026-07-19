import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { getPublishedOpportunities } from "@/lib/opportunities";
import { buildOpportunitySlug } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/opportunities`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/interview-prep`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/international`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${siteUrl}/international/guide`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/newsletter`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/work-with-us`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/book`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const supabase = await createClient();
  const opportunities = await getPublishedOpportunities(supabase);

  const opportunityRoutes: MetadataRoute.Sitemap = opportunities.map((o) => ({
    url: `${siteUrl}/opportunity/${buildOpportunitySlug(o)}`,
    lastModified: o.updated_at,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...opportunityRoutes];
}
