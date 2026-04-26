"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Question } from "./questions";
import { TOTAL_QUESTIONS } from "./questions";

type Props = {
  question: Question;
};

// Briefly highlights the chosen card before routing forward. Keeps the
// auto-advance feeling intentional, not jumpy.
const HIGHLIGHT_MS = 280;

function formatNum(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export default function QuestionView({ question }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleChoose = (optionId: string) => {
    if (selected) return;
    setSelected(optionId);
    const next = question.id + 1;
    // Last question still routes to the next placeholder for now; results
    // page is out of scope for this template task.
    const dest = next > TOTAL_QUESTIONS ? `/quiz/${TOTAL_QUESTIONS}` : `/quiz/${next}`;
    window.setTimeout(() => router.push(dest), HIGHLIGHT_MS);
  };

  return (
    <main className="min-h-[100svh] w-full bg-stone-50 text-stone-900">
      {/* Top bar — minimal. Back arrow left, progress right. */}
      <header className="flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-8">
        <Link
          href="/"
          aria-label="Back to home"
          className="group inline-flex items-center text-stone-500 transition-colors duration-200 hover:text-stone-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </Link>

        <div className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-500">
          {formatNum(question.id)} / {formatNum(TOTAL_QUESTIONS)}
        </div>
      </header>

      {/* Center — vertical stack. Stem up top, big breathing space, then 2x2. */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-14 sm:px-10 sm:pt-20 md:pt-28">
        <h1 className="mx-auto max-w-3xl text-center font-serif text-3xl font-medium leading-[1.15] tracking-tight text-stone-900 md:text-5xl md:leading-[1.1]">
          {question.stem}
        </h1>

        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {question.options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleChoose(opt.id)}
                aria-label={opt.text}
                className={[
                  "group flex min-h-[88px] w-full items-center rounded-sm border p-6 text-left transition-all duration-200 md:p-8",
                  isSelected
                    ? "border-stone-900 bg-stone-900 text-white"
                    : "border-stone-200 bg-stone-50 text-stone-900 hover:-translate-y-0.5 hover:border-stone-900",
                ].join(" ")}
              >
                <span className="font-serif text-base leading-snug md:text-lg">
                  {opt.text}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </main>
  );
}
