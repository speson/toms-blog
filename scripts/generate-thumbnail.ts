import { generateThumbnail } from "../lib/thumbnail";

function showHelp(): void {
  console.log(`
📸 Thumbnail Generator CLI

Usage:
  pnpm generate-thumbnail --title "Title" --slug "slug" [options]

Required Arguments:
  --title <string>        Blog post title
  --slug <string>         URL slug for the post

Optional Arguments:
  --description <string>  Post description (optional)
  --tags <string>         Comma-separated tags (optional)
  --help                  Show this help message

Examples:
  pnpm generate-thumbnail --title "AI 기술의 미래" --slug "ai-future"
  pnpm generate-thumbnail --title "AI 기술의 미래" --slug "ai-future" --description "AI 기술 트렌드" --tags "ai,tech"
  pnpm generate-thumbnail --help
`);
}

function getArgValue(args: string[], key: string): string | undefined {
  // Support both --key=value and --key value formats
  const eqFormat = args.find((arg) => arg.startsWith(`${key}=`))?.split("=")[1];
  if (eqFormat) return eqFormat;
  const idx = args.indexOf(key);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes("--help") || args.length === 0) {
    showHelp();
    process.exit(args.includes("--help") ? 0 : 1);
  }

  // Parse arguments
  const titleArg = getArgValue(args, "--title");
  const slugArg = getArgValue(args, "--slug");
  const descriptionArg = getArgValue(args, "--description");
  const tagsArg = getArgValue(args, "--tags");

  // Validate required arguments
  if (!titleArg || !slugArg) {
    console.error("❌ Error: --title and --slug are required arguments");
    console.error("\nRun with --help for usage instructions\n");
    process.exit(1);
  }

  // Parse tags if provided
  const tags = tagsArg
    ? tagsArg.split(",").map((tag) => tag.trim())
    : undefined;

  // Use title as description if not provided
  const description = descriptionArg || titleArg;

  try {
    console.log("\n🎨 Generating thumbnail...\n");
    console.log(`   Title: ${titleArg}`);
    console.log(`   Slug: ${slugArg}`);
    console.log(`   Description: ${description}`);
    if (tags) {
      console.log(`   Tags: ${tags.join(", ")}`);
    }
    console.log("");

    const result = await generateThumbnail({
      title: titleArg,
      slug: slugArg,
      description,
      tags,
    });

    if (result) {
      console.log(`✅ Thumbnail generated successfully!`);
      console.log(`   Saved: ${result}\n`);
      process.exit(0);
    } else {
      console.error("❌ Failed to generate thumbnail (check GEMINI_API_KEY)\n");
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Error generating thumbnail:", error);
    console.error("");
    process.exit(1);
  }
}

main();
