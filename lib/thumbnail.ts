import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";
import * as path from "path";

export interface ThumbnailOptions {
  title: string;
  description: string;
  slug: string;
  tags?: string[];
}

export async function generateThumbnail(
  options: ThumbnailOptions
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.warn(
      "[thumbnail] GEMINI_API_KEY not set. Skipping thumbnail generation."
    );
    return null;
  }

  try {
    const client = new GoogleGenerativeAI(apiKey);
    const model = client.getGenerativeModel({
      model: "gemini-2.5-flash-image",
    });

    const prompt = buildPrompt(options);

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const response = result.response;
    if (!response.candidates || response.candidates.length === 0) {
      console.warn("[thumbnail] No image generated for slug:", options.slug);
      return null;
    }

    const candidate = response.candidates[0];
    if (!candidate.content || !candidate.content.parts) {
      console.warn(
        "[thumbnail] Invalid response structure for slug:",
        options.slug
      );
      return null;
    }

    const imagePart = candidate.content.parts.find((part: any) =>
      part.inlineData?.mimeType?.startsWith("image/")
    );

    if (!imagePart || !imagePart.inlineData) {
      console.warn(
        "[thumbnail] No image data in response for slug:",
        options.slug
      );
      return null;
    }

    const imageData = imagePart.inlineData.data;
    const buffer = Buffer.from(imageData, "base64");

    const thumbnailDir = path.join(process.cwd(), "public", "thumbnails");
    if (!fs.existsSync(thumbnailDir)) {
      fs.mkdirSync(thumbnailDir, { recursive: true });
    }

    const filePath = path.join(thumbnailDir, `${options.slug}.png`);
    fs.writeFileSync(filePath, buffer);

    return `/thumbnails/${options.slug}.png`;
  } catch (error) {
    console.error(
      "[thumbnail] Error generating thumbnail for slug:",
      options.slug,
      error
    );
    return null;
  }
}

function buildPrompt(options: ThumbnailOptions): string {
  const tagsText = options.tags?.length
    ? `Tags: ${options.tags.join(", ")}`
    : "";

  return `Create a professional blog thumbnail image for a tech blog post with these specifications:

Title: ${options.title}
Description: ${options.description}
${tagsText}

Requirements:
- Aspect ratio: 16:9 (1200x630 pixels)
- Dark theme with modern design (dark background, light text)
- Include the title prominently
- Use a tech/AI aesthetic with subtle gradients
- Professional, clean layout
- Readable text with good contrast
- Include subtle visual elements related to AI/tech

Generate a visually appealing thumbnail that would work well on a tech blog.`;
}
