export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <p className="text-center text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} Tom&apos;s Blog. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
