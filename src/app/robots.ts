import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearehublr.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/dashboard",
          "/documents",
          "/login",
          "/signup",
          "/profile",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
