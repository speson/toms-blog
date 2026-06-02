"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Only headings with an id are linkable; skip id-less headings (e.g.
    // page-level sections without a slug) so the TOC never renders a dead "#".
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ).filter((element) => element.id);

    const items: TocItem[] = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1)),
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <h4 className="mb-4 text-sm font-semibold text-white">목차</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: "smooth",
                });
                setActiveId(heading.id);
              }}
              className={`block py-1 transition-colors hover:text-purple-400 ${
                activeId === heading.id
                  ? "font-medium text-purple-400"
                  : "text-zinc-400"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
