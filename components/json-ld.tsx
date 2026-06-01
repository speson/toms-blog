interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tom's Blog",
    description: "AI 뉴스와 개발 트렌드를 다루는 기술 블로그",
    url: "https://toms-blog.co.kr",
    inLanguage: "ko-KR",
    publisher: {
      "@type": "Person",
      name: "Tom",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://toms-blog.co.kr/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}

interface ArticleJsonLdProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  datePublished: string;
  dateModified?: string;
  tags: string[];
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  tags,
}: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    image: imageUrl,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: "Tom",
      url: "https://toms-blog.co.kr/about",
      sameAs: ["https://github.com/speson"],
    },
    publisher: {
      "@type": "Organization",
      name: "Tom's Blog",
      logo: {
        "@type": "ImageObject",
        url: "https://toms-blog.co.kr/images/toms-blog-main-og.png",
      },
    },
    keywords: tags.join(", "),
    articleSection: tags[0] || "AI",
    inLanguage: "ko-KR",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

interface CollectionPageJsonLdProps {
  name: string;
  description: string;
  url: string;
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: CollectionPageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
      })),
    },
  };

  return <JsonLd data={data} />;
}

interface ProfilePageJsonLdProps {
  url: string;
  name: string;
  description: string;
}

export function ProfilePageJsonLd({
  url,
  name,
  description,
}: ProfilePageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    name,
    description,
    mainEntity: {
      "@type": "Person",
      name: "Tom",
      description,
      url,
      sameAs: ["https://github.com/speson"],
      knowsAbout: [
        "AI coding tools",
        "Claude Code",
        "OpenCode",
        "AI model comparison",
        "Developer tooling",
      ],
    },
  };

  return <JsonLd data={data} />;
}
