"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const archiveLinks = [
  { href: "/archive/v2-v3", label: "Home" },
  { href: "/archive/v2-v3/architecture", label: "Architecture" },
  { href: "/archive/v2-v3/how-it-works", label: "How It Works" },
  { href: "/archive/v2-v3/research", label: "Research" },
  { href: "/archive/v2-v3/guide", label: "Guide" },
  { href: "/archive/v2-v3/under-the-hood", label: "Under the Hood" },
];

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      <div className="border-b border-amber-500/30 bg-amber-950/40 px-4 py-3 text-center text-sm text-amber-300">
        <span className="mr-2 font-semibold">Archive — Night Shift v2/v3</span>
        <span className="text-amber-400/70">
          This content describes an older version.{" "}
          <Link href="/" className="underline hover:text-white">
            View current version (v5) →
          </Link>
        </span>
      </div>

      <div className="border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2">
          {archiveLinks.map(({ href, label }) => {
            const isActive =
              href === "/archive/v2-v3"
                ? pathname === "/archive/v2-v3"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-700 text-white"
                    : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      {children}
    </div>
  );
}
