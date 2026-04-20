"use client";

import { useState } from "react";

interface FlashcardProps {
  question: string;
  answer: string;
  hint?: string;
}

export function Flashcard({ question, answer, hint }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      className="group relative w-full text-left"
    >
      <div
        className={`min-h-[120px] rounded-xl border p-5 transition-all duration-300 ${
          flipped
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-zinc-700 bg-zinc-900/60 hover:border-zinc-600"
        }`}
      >
        {!flipped ? (
          <>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
                Tap to reveal
              </span>
              <svg
                className="h-4 w-4 text-zinc-600 transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-zinc-200">{question}</p>
            {hint && (
              <p className="mt-2 text-xs italic text-zinc-600">
                Hint: {hint}
              </p>
            )}
          </>
        ) : (
          <>
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-500/60">
              Answer
            </div>
            <p className="text-sm leading-relaxed text-zinc-300">{answer}</p>
          </>
        )}
      </div>
    </button>
  );
}

interface KeyTakeawayProps {
  title: string;
  children: React.ReactNode;
  icon?: "lightbulb" | "warning" | "check" | "brain";
}

const icons = {
  lightbulb: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  check: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  brain: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
};

export function KeyTakeaway({
  title,
  children,
  icon = "lightbulb",
}: KeyTakeawayProps) {
  return (
    <div className="my-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 sm:p-5">
      <div className="mb-2 flex items-center gap-2 text-emerald-400">
        {icons[icon]}
        <span className="text-xs font-bold uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div className="text-sm leading-relaxed text-zinc-300">{children}</div>
    </div>
  );
}

interface FlashcardDeckProps {
  title: string;
  cards: FlashcardProps[];
}

export function FlashcardDeck({ title, cards }: FlashcardDeckProps) {
  return (
    <div className="my-8 rounded-xl border border-zinc-700 bg-zinc-900/30 p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <svg
          className="h-5 w-5 text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342"
          />
        </svg>
        <span className="text-sm font-bold text-amber-400">{title}</span>
        <span className="ml-auto text-[10px] text-zinc-600">
          {cards.length} cards &middot; tap to flip
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card, i) => (
          <Flashcard key={i} {...card} />
        ))}
      </div>
    </div>
  );
}
