import * as fs from "fs";
import * as path from "path";

/** Telegram Bot API 호출 상한 (ms) */
const FETCH_TIMEOUT_MS = 20_000;

function loadEnvFile() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2]
        .trim()
        .replace(/^["']|["']$/g, "");
    }
  }
}

loadEnvFile();

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/** Telegram HTML에서 이스케이프가 필요한 문자 처리 */
function escapeHTML(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export interface TelegramNewsItem {
  index: number;
  title: string;
  link: string;
  source: string;
  date: string;
}

/** 뉴스 목록을 Telegram HTML 메시지로 포맷 */
export function formatTelegramMessage(
  items: TelegramNewsItem[],
  stats: { total: number; duplicates: number; date: string }
): string {
  const header = `📰 <b>AI 뉴스 (${stats.date})</b> — ${stats.total}개 수집, ${stats.duplicates}개 중복 제거\n`;

  const body = items
    .map(
      (item) =>
        `${item.index}. <a href="${item.link}">${escapeHTML(item.title)}</a>\n   🏷 ${item.source} · ${item.date}`
    )
    .join("\n\n");

  const footer = `\n\n💡 발행하려면:\n<code>cd ~/Workspace/tom-project && claude</code>\n→ "1, 3번 발행해줘"`;

  return `${header}\n${body}${footer}`;
}

/** Telegram Bot API로 메시지 직접 전송 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error(
      "❌ TELEGRAM_BOT_TOKEN 또는 TELEGRAM_CHAT_ID가 설정되지 않았습니다."
    );
    console.error("   .env.local 파일을 확인하세요.");
    return false;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Telegram 전송 실패 (${response.status}):`, error);
      return false;
    }

    console.log("✅ Telegram 전송 완료");
    return true;
  } catch (error) {
    console.error("❌ Telegram 전송 중 오류:", error);
    return false;
  }
}
