import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
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
