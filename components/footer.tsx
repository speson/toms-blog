import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <div className="mb-4 flex justify-center gap-6">
          <Link
            href="/privacy"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            개인정보 처리방침
          </Link>
          <Link
            href="/contact"
            className="text-sm text-zinc-400 transition-colors hover:text-zinc-200"
          >
            연락처
          </Link>
        </div>
        <p className="text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Tom&apos;s Blog. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
