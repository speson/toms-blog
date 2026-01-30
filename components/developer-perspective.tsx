export function DeveloperPerspective({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-8 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-blue-500/5 p-6 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">💡</span>
        <h3 className="m-0 text-lg font-semibold text-purple-400">
          개발자 관점
        </h3>
      </div>
      <div className="prose prose-invert prose-zinc max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}
