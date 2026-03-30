import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Googlebot",
        allow: ["/", "/api/og"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: ["/", "/api/og"],
        disallow: ["/api/"],
      },
      {
        userAgent: "Yeti",
        allow: "/",
      },
      {
        userAgent: "Daumoa",
        allow: "/",
      },
    ],
    sitemap: "https://toms-blog.co.kr/sitemap.xml",
    host: "https://toms-blog.co.kr",
  };
}
