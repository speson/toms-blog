"use client";

import { useState, useRef } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
}

export function CodeBlock({ children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (preRef.current) {
      const code = preRef.current.textContent || "";
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group relative mb-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 rounded-md bg-zinc-700/50 px-2 py-1 text-xs text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-zinc-700 hover:text-zinc-200"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy
          </span>
        )}
      </button>
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg border border-zinc-800 bg-zinc-900 p-4"
      >
        {children}
      </pre>
    </div>
  );
}
