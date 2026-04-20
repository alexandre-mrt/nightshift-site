export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <p>NightShift Documentation</p>
        </div>
        <p className="text-zinc-600">
          Built in a single night shift with{" "}
          <span className="text-zinc-400">Next.js</span>,{" "}
          <span className="text-zinc-400">Tailwind CSS</span>, and{" "}
          <span className="text-zinc-400">Claude Code</span>
        </p>
      </div>
    </footer>
  );
}
