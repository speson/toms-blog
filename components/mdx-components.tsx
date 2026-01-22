import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mb-4 mt-8 text-3xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-3 mt-6 text-2xl font-semibold text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-2 mt-4 text-xl font-semibold text-white">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="mb-4 leading-relaxed text-zinc-300">{children}</p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || "#"}
        className="text-purple-400 underline decoration-purple-400/30 underline-offset-2 transition-colors hover:text-purple-300"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="mb-4 ml-6 list-disc space-y-2 text-zinc-300">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-4 ml-6 list-decimal space-y-2 text-zinc-300">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="mb-4 border-l-2 border-purple-500 pl-4 italic text-zinc-400">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-purple-300">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mb-4 overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        {children}
      </pre>
    ),
    img: ({ src, alt }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={400}
        className="mb-4 rounded-lg"
      />
    ),
    hr: () => <hr className="my-8 border-zinc-800" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    ...components,
  };
}
