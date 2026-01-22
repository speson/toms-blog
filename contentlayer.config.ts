import { defineDocumentType, makeSource } from "contentlayer2/source-files";

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
      options: ["geeknews", "github", "original"],
      default: "original",
    },
    sourceUrl: {
      type: "string",
    },
    draft: {
      type: "boolean",
      default: false,
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
});
