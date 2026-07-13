import Link from "next/link";

const NAV_LINKS = [
  { href: "/posts", label: "전체 글" },
  { href: "/categories", label: "카테고리" },
  { href: "/tags", label: "태그" },
  { href: "/entities", label: "Entities" },
  { href: "/search", label: "검색" },
  { href: "/about", label: "소개" },
  { href: "/contact", label: "문의" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-white">
          Tom&apos;s Blog
        </Link>
        <div className="flex items-center gap-4 overflow-x-auto sm:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="shrink-0 text-sm text-zinc-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
