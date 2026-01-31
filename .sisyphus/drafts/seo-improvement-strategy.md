# Draft: SEO Improvement Strategy for Tom's Blog

## Requirements (confirmed from user request)

- **Goal**: Maximize SEO to increase search engine visibility and traffic
- **Domain**: toms-blog.co.kr (Korean)
- **Framework**: Next.js 16.1.4 (App Router)
- **Content**: MDX + Contentlayer
- **Target Audience**: AI/Development news readers (Korean)
- **Language**: Korean (ko)

## Current Implementation Analysis

### Already Implemented (WELL)

1. **Basic Metadata** (app/layout.tsx:16-54)
   - metadataBase: "https://toms-blog.co.kr"
   - title template: "%s | Tom's Blog"
   - OpenGraph: title, description, url, siteName, locale (ko_KR), type (website), images
   - Twitter Cards: summary_large_image
   - robots: index=true, follow=true
   - alternates: RSS feed link
   - lang="ko" on html element

2. **Post-level Metadata** (app/posts/[slug]/page.tsx:21-58)
   - generateMetadata for dynamic metadata
   - OpenGraph with article type, publishedTime, tags
   - Twitter Cards per post
   - Dynamic OG image generation

3. **Structured Data** (components/json-ld.tsx)
   - WebSite schema
   - Article schema (headline, description, url, image, datePublished, author, publisher, keywords)
   - BreadcrumbList schema

4. **SEO Infrastructure**
   - sitemap.xml (dynamic via app/sitemap.ts)
   - robots.txt (app/robots.ts)
   - RSS Feed (/feed.xml, language="ko")
   - Dynamic OG images (/api/og)

5. **Rendering**
   - SSG via generateStaticParams
   - next/image for optimized images

### Missing / Needs Improvement

1. **Metadata Extensions**
   - NO canonical URL explicit in post metadata
   - NO keywords meta tag (post-level available but not in metadata)
   - NO viewport explicitly set (Next.js provides default)
   - NO author meta tag
   - NO verification tags (Google, Naver, Bing)

2. **Structured Data**
   - Using "Article" instead of "BlogPosting" (BlogPosting is more specific for blogs)
   - No Person schema independently defined
   - No reading time in schema

3. **Performance/Config** (next.config.ts)
   - MINIMAL config - only contentlayer wrapper
   - No image optimization config
   - No experimental features enabled
   - No headers/caching config

4. **Korean Search Engines**
   - NO Naver Search Advisor meta tag
   - NO Daum verification
   - robots.txt doesn't specify Naver/Daum crawlers

5. **Content SEO**
   - External links in mdx-components.tsx don't have rel="noopener noreferrer nofollow" for external
   - No "related posts" feature
   - No reading time displayed
   - Image alt texts depend on MDX content (no validation)

6. **Technical**
   - NO 404/not-found.tsx page exists
   - NO error.tsx page
   - NO analytics integration
   - NO preconnect/DNS-prefetch hints

## Research Findings

### From Codebase Analysis

- 24 MDX posts in content/posts/
- 3 categories: ai-news, updates, opensource
- Posts have: title, description, date, category, tags, source, sourceUrl
- Posts use DeveloperPerspective custom component

### Gaps Identified

1. Post canonical URLs not explicitly set (relies on metadataBase)
2. No schema.org Person/Organization independently
3. no sitemap for categories/tags pages (only posts)
4. External links in MDX don't have nofollow (SEO leak potential)

## Open Questions

- Should we add Google Analytics 4 or Vercel Analytics?
- Naver Search Advisor - do you have a Naver account for verification?
- Should we add reading time to posts?
- Do you want to add related posts feature?

## Scope Boundaries

### IN SCOPE (from user request)

- All metadata improvements
- Structured data enhancements
- Korean search engine optimization (Naver, Daum)
- Performance optimizations
- Technical SEO fixes
- next.config.ts optimization
- Error pages (404, 500)

### POTENTIALLY OUT OF SCOPE (clarify)

- Analytics integration (needs account setup)
- Content changes to existing MDX files
- Social share buttons (UI feature)
- Internal linking strategy (requires content analysis)

## Priority Assessment (Impact vs Effort)

### Quick Wins (High Impact, Low Effort)

1. Add viewport metadata
2. Add canonical URLs to posts
3. Add Naver verification meta tag
4. Change Article to BlogPosting schema
5. Add preconnect hints for fonts

### Medium Effort, High Impact

1. Create 404/error pages with SEO metadata
2. Add reading time to posts
3. Optimize next.config.ts
4. Add Person/Organization schema
5. Fix external link rel attributes

### Higher Effort

1. Related posts feature
2. Category/tag pages with proper SEO
3. Analytics integration
4. Full Core Web Vitals optimization
