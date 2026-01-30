export function calculateReadingTime(content: string): number {
  // Remove markdown syntax for accurate count
  const plainText = content
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`[^`]*`/g, "") // Remove inline code
    .replace(/#+\s/g, "") // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links, keep text
    .replace(/[*_~]/g, ""); // Remove emphasis markers

  // Korean: ~500 characters per minute
  // English: ~200 words per minute (assume ~5 chars per word = 1000 chars/min)
  // Use conservative 500 chars/min for mixed content
  const charsPerMinute = 500;
  const readingTimeMinutes = Math.ceil(plainText.length / charsPerMinute);

  // Minimum 1 minute
  return Math.max(1, readingTimeMinutes);
}
