import * as fs from "fs";
import * as path from "path";

const postsDir = path.join(process.cwd(), "content/posts");

// Old category → new subcategory mapping (for non-original sources)
const SUB_MAP: Record<string, string> = {
  news: "news",
  "ai-news": "news",
  ai: "news",
  tech: "news",
  tool: "news",
  releases: "releases",
  updates: "releases",
  analysis: "column",
  opinion: "column",
  guide: "column",
};

let updated = 0;
let skipped = 0;

for (const file of fs.readdirSync(postsDir)) {
  if (!file.endsWith(".mdx")) continue;

  const filePath = path.join(postsDir, file);
  let content = fs.readFileSync(filePath, "utf-8");

  // Extract source and category from frontmatter
  const sourceMatch = content.match(/^source:\s*"([^"]+)"/m);
  const categoryMatch = content.match(/^category:\s*"([^"]+)"/m);

  if (!categoryMatch) {
    console.log(`⏭ ${file} — no category field`);
    skipped++;
    continue;
  }

  const source = sourceMatch?.[1] || "original";
  const oldCategory = categoryMatch[1];

  let newCategory: string;
  let subcategory: string | null = null;

  if (source === "original") {
    newCategory = "by-tom";
    // No subcategory for by-tom
  } else {
    newCategory = "ai-news";
    subcategory = SUB_MAP[oldCategory] || "news";
  }

  // Replace category line
  content = content.replace(
    /^category:\s*"[^"]+"/m,
    `category: "${newCategory}"`
  );

  // Add subcategory after category line (if needed)
  if (subcategory && !content.includes("subcategory:")) {
    content = content.replace(
      /^(category:\s*"[^"]+")/m,
      `$1\nsubcategory: "${subcategory}"`
    );
  }

  fs.writeFileSync(filePath, content);
  const subStr = subcategory ? ` > ${subcategory}` : "";
  console.log(`✅ ${file}: ${oldCategory} → ${newCategory}${subStr}`);
  updated++;
}

console.log(`\n🎉 Done! Updated: ${updated}, Skipped: ${skipped}`);
