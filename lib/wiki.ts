import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts } from "./posts";

const WIKI_DIR = path.join(process.cwd(), "content/wiki");
const ENTITIES_DIR = path.join(WIKI_DIR, "entities");

export interface WikiEntity {
  id: string;
  name: string;
  type: "entity";
  aliases: string[];
  firstCovered: string;
  lastCovered: string;
  postCount: number;
  relatedEntities: string[];
  tags: string[];
  content: string;
}

export function getAllEntities(): WikiEntity[] {
  if (!fs.existsSync(ENTITIES_DIR)) return [];

  const files = fs.readdirSync(ENTITIES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((file) => {
      const id = file.replace(".md", "");
      const raw = fs.readFileSync(path.join(ENTITIES_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      return {
        id,
        name: data.name || id,
        type: "entity" as const,
        aliases: data.aliases || [],
        firstCovered: data.first_covered || "",
        lastCovered: data.last_covered || "",
        postCount: data.post_count || 0,
        relatedEntities: data.related_entities || [],
        tags: data.tags || [],
        content,
      };
    })
    .sort((a, b) => b.postCount - a.postCount);
}

export function getEntityById(id: string): WikiEntity | undefined {
  return getAllEntities().find((e) => e.id === id);
}

export function getPostsForEntity(entity: WikiEntity) {
  const posts = getAllPosts();
  const searchTerms = [entity.name, ...entity.aliases].map((t) =>
    t.toLowerCase()
  );

  return posts.filter((post) => {
    const postTags = post.tags.map((t: string) => t.toLowerCase());
    return searchTerms.some((term) => postTags.includes(term));
  });
}

export function getEntityHref(id: string): string {
  return `/entities/${id}`;
}
