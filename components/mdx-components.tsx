import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image from "next/image";
import { CodeBlock } from "./code-block";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id }) => (
      <h1
        id={id}
        className="mt-8 mb-4 scroll-mt-20 text-3xl font-bold text-white"
      >
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2
        id={id}
        className="mt-6 mb-3 scroll-mt-20 text-2xl font-semibold text-white"
      >
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3
        id={id}
        className="mt-4 mb-2 scroll-mt-20 text-xl font-semibold text-white"
      >
        {children}
      </h3>
    ),
    h4: ({ children, id }) => (
      <h4
        id={id}
        className="mt-3 mb-2 scroll-mt-20 text-lg font-semibold text-white"
      >
        {children}
      </h4>
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
      <blockquote className="mb-4 border-l-2 border-purple-500 pl-4 text-zinc-400 italic">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-sm text-purple-300">
        {children}
      </code>
    ),
    pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
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
    table: ({ children }) => (
      <div className="mb-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="border-b border-zinc-700 bg-zinc-800/50">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-800">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="transition-colors hover:bg-zinc-800/30">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-white">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-zinc-300">{children}</td>
    ),
    ...components,
  };
}
