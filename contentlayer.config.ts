import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
    source: {
      type: "enum",
      options: [
        "geeknews",
        "github",
        "openai",
        "google",
        "anthropic",
        "original",
      ],
      default: "original",
    },
    category: {
      type: "enum",
      options: ["news", "releases", "analysis", "guide"],
      default: "news",
    },
    sourceUrl: {
      type: "string",
    },
    thumbnail: {
      type: "string",
      description: "커스텀 썸네일 이미지 경로 (예: /thumbnails/my-post.png)",
    },
    draft: {
      type: "boolean",
      default: false,
    },
    perspective: {
      type: "string",
    },
    handsOn: {
      type: "boolean",
      default: false,
    },
    stackContext: {
      type: "list",
      of: { type: "string" },
      default: [],
    },
    tldrVerdict: {
      type: "string",
    },
    relevanceFrontend: {
      type: "enum",
      options: ["high", "medium", "low"],
    },
    relevanceBackend: {
      type: "enum",
      options: ["high", "medium", "low"],
    },
    relevanceDevops: {
      type: "enum",
      options: ["high", "medium", "low"],
    },
    relevanceTooling: {
      type: "enum",
      options: ["high", "medium", "low"],
    },
    relevanceDatabase: {
      type: "enum",
      options: ["high", "medium", "low"],
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
    },
    url: {
      type: "string",
      resolve: (post) =>
        `/posts/${post._raw.flattenedPath.replace("posts/", "")}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark",
          keepBackground: true,
        },
      ],
    ],
  },
});
