import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/categories", label: "카테고리" },
  { href: "/tags", label: "태그" },
  { href: "/entities", label: "Entities" },
  { href: "/search", label: "검색" },
  { href: "/about", label: "소개" },
  { href: "/privacy", label: "개인정보 처리방침" },
  { href: "/contact", label: "연락처" },
  { href: "/feed.xml", label: "RSS" },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <nav className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Tom&apos;s Blog. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
