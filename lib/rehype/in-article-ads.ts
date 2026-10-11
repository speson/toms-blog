import { IN_ARTICLE_H2_INTERVAL, MAX_IN_ARTICLE_ADS } from "../ads";

/* Minimal hast typings so we don't add a dependency on @types/hast. */
interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  name?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  attributes?: unknown[];
}

const FAQ_PATTERN = /(자주\s*묻는|FAQ|Q\s*&\s*A)/i;

function textOf(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(textOf).join("");
}

function isBlank(node: HastNode) {
  return node.type === "text" && !(node.value ?? "").trim();
}

/** Code blocks (rehype-pretty-code wraps them in <figure>/<div>), tables, embeds. */
function isUnsafeNeighbor(node: HastNode | undefined) {
  if (!node) return false;
  if (node.type === "element") {
    const tag = node.tagName;
    if (tag === "pre" || tag === "table" || tag === "figure") return true;
    const props = node.properties ?? {};
    if ("dataRehypePrettyCodeFigure" in props) return true;
    // GFM tables may be wrapped by a container element
    if (
      tag === "div" &&
      (node.children ?? []).some(
        (c) => c.tagName === "table" || c.tagName === "pre"
      )
    )
      return true;
  }
  // MDX JSX components (e.g. custom <CodeBlock>, tables) — be conservative.
  if (node.type === "mdxJsxFlowElement") return true;
  return false;
}

function adNode(index: number): HastNode {
  return {
    type: "mdxJsxFlowElement",
    name: "InArticleAd",
    attributes: [
      { type: "mdxJsxAttribute", name: "position", value: String(index) },
    ],
    children: [],
  };
}

/**
 * Inserts <InArticleAd /> before selected top-level H2s at build time:
 *  - before H2 #1 (right after the intro), then before H2 #3, #5, ...
 *  - at most MAX_IN_ARTICLE_ADS
 *  - never before/inside the FAQ section (everything from the FAQ H2 on)
 *  - never directly after a code block / table / JSX block (slot is skipped)
 * Post MDX files are not modified.
 */
export function rehypeInArticleAds() {
  return (tree: HastNode) => {
    const children = tree.children ?? [];
    const sig = children
      .map((node, i) => ({ node, i }))
      .filter(({ node }) => !isBlank(node) && node.type !== "mdxjsEsm");
    const h2s = sig.filter(
      ({ node }) => node.type === "element" && node.tagName === "h2"
    );
    const faqIdx = h2s.findIndex(({ node }) => FAQ_PATTERN.test(textOf(node)));
    const limit = faqIdx === -1 ? h2s.length : faqIdx;

    const targets: number[] = [];
    for (
      let n = 0;
      n < limit && targets.length < MAX_IN_ARTICLE_ADS;
      n += IN_ARTICLE_H2_INTERVAL
    ) {
      const h2 = h2s[n];
      const pos = sig.indexOf(h2);
      const prev = sig[pos - 1];
      if (n === 0 && !prev) continue; // no intro before first H2
      if (isUnsafeNeighbor(prev?.node)) continue;
      targets.push(h2.i);
    }
    // splice back-to-front so indices stay valid
    targets
      .sort((a, b) => b - a)
      .forEach((childIdx, k) => {
        children.splice(childIdx, 0, adNode(targets.length - 1 - k));
      });
  };
}
