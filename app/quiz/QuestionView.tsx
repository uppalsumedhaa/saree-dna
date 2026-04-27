"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Question } from "./questions";
import { TOTAL_QUESTIONS } from "./questions";
import ResultLoader from "./ResultLoader";
import { computeWinner, type OptionId, type Pick, type Slug } from "./scoring";

type Props = {
  question: Question;
};

// Briefly highlights the chosen card before routing forward. Keeps the
// auto-advance feeling intentional, not jumpy. Bumped slightly so the
// selection pulse (border + scale) actually registers before nav.
const HIGHLIGHT_MS = 280;

// localStorage key for the in-progress picks array. Cleared by the
// "Take again" CTA on the results page so a re-run starts clean.
const PICKS_KEY = "saree-dna-picks";

function formatNum(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function readPicks(): Pick[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(PICKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Light shape-check so a malformed entry doesn't poison computeWinner.
    return parsed.filter(
      (p): p is Pick =>
        p &&
        typeof p.questionId === "number" &&
        (p.optionId === "A" ||
          p.optionId === "B" ||
          p.optionId === "C" ||
          p.optionId === "D"),
    );
  } catch {
    return [];
  }
}

function writePicks(picks: Pick[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PICKS_KEY, JSON.stringify(picks));
  } catch {
    // Quota / private mode — silent fall-through. Worst case the user lands
    // on the Heir fallback at Q8; the visual flow still works.
  }
}

export default function QuestionView({ question }: Props) {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  // When set, the pre-result loader is shown (Q8 only). On its onComplete
  // we navigate to /results/<slug>. Kept separate from `selected` so the
  // chosen-option highlight still pulses underneath until navigation runs.
  const [loaderWinner, setLoaderWinner] = useState<Slug | null>(null);
  const picksRef = useRef<Pick[]>([]);

  // Hydrate the picks ref from localStorage on mount so going back to an
  // earlier question and re-answering replaces the prior pick (instead of
  // appending a duplicate for the same questionId).
  useEffect(() => {
    picksRef.current = readPicks();
  }, []);

  const handleChoose = (optionId: string) => {
    if (selected) return;

    // Haptic — Android Chrome/Firefox respect this; iOS Safari has it
    // permanently disabled and silently no-ops. The API returns false
    // when the platform refuses; either way it doesn't throw, so a
    // try/catch isn't needed. 15ms = a single quick tap, not a buzz.
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(15);
      } catch {
        // Some old WebViews can throw on locked-down policies.
      }
    }

    setSelected(optionId);

    const newPick: Pick = {
      questionId: question.id,
      optionId: optionId as OptionId,
    };
    const without = picksRef.current.filter(
      (p) => p.questionId !== question.id,
    );
    const updated = [...without, newPick];
    picksRef.current = updated;
    writePicks(updated);

    const next = question.id + 1;
    if (next > TOTAL_QUESTIONS) {
      // Q8 → results: kick off the tarot-shuffle loader. Prefetch the
      // results page first so the navigation at the end of the animation
      // is instant (no second loading state). The loader handles its own
      // ~2.5s timing and calls router.push via onComplete.
      const winner = computeWinner(updated);
      router.prefetch(`/results/${winner}`);
      setLoaderWinner(winner);
      return;
    }

    const dest = `/quiz/${next}`;
    window.setTimeout(() => router.push(dest), HIGHLIGHT_MS);
  };

  return (
    <main className="relative min-h-[100svh] w-full overflow-hidden bg-stone-50 text-stone-900">
      {/* Pre-result loader. Only rendered after the Q8 pick. The loader
          sits on top of the question screen at z-50, plays for ~2.5s, then
          calls router.push via onComplete. The results page is prefetched
          in handleChoose so the navigation at the end is instant. */}
      {loaderWinner && (
        <ResultLoader
          winnerSlug={loaderWinner}
          onComplete={() => router.push(`/results/${loaderWinner}`)}
        />
      )}

      {/* Lineart background — hybrid treatment.
          Mobile: full-bleed at low opacity (Option A) — safer when there's no
          room to side-anchor cleanly.
          md+: side-anchored on the right, fading to nothing across center
          (Option B) — more editorial, leaves the question column clean. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 md:hidden"
      >
        <Image
          src="/lineart.webp"
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-contain object-center opacity-[0.12]"
        />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[55%] md:block"
        style={{
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Image
          src="/lineart.webp"
          alt=""
          fill
          priority={false}
          sizes="55vw"
          className="object-contain object-right opacity-[0.18]"
        />
      </div>

      {/* Top bar — minimal. Back arrow left, progress right.
          Q1 returns to homepage; Q2-Q8 step back one question. State is in
          localStorage and the prior pick gets overwritten on re-select, so
          there's no need to pre-restore the selection visually. */}
      <header className="relative z-10 flex items-center justify-between px-3 pt-4 sm:px-10 sm:pt-8">
        <Link
          href={question.id === 1 ? "/" : `/quiz/${question.id - 1}`}
          aria-label={question.id === 1 ? "Back to home" : "Previous question"}
          className="group -ml-1 inline-flex h-11 w-11 items-center justify-center text-stone-500 transition-colors duration-200 hover:text-stone-900 sm:-ml-2"
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
      <section className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-16 pt-14 sm:px-10 sm:pt-20 md:pt-28">
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
                // Press feedback layered in three parts:
                //   - hover (desktop only via media query): subtle lift +
                //     border darken, current behavior preserved.
                //   - active: physical press — scale to 0.97, inset ring
                //     for the dark-pressed-into-paper feel.
                //   - selected: full invert + a one-shot pulse animation
                //     defined in globals.css (.option-selected-pulse).
                // We disable the active scale on the selected card so the
                // pulse doesn't fight the press.
                className={[
                  "group relative flex min-h-[88px] w-full items-center rounded-sm border p-6 text-left backdrop-blur-[1px] transition-all duration-200 ease-out md:p-8",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50",
                  isSelected
                    ? "option-selected-pulse border-stone-900 bg-stone-900 text-white"
                    : [
                        "border-stone-200 bg-stone-50/80 text-stone-900",
                        // Hover only on devices with a real pointer.
                        "[@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-stone-900 [@media(hover:hover)]:hover:bg-stone-50",
                        // Active = pressed in. Slight scale-down + darker
                        // border + inset shadow.
                        "active:scale-[0.97] active:border-stone-900 active:shadow-[inset_0_1px_3px_rgba(28,25,23,0.12)] active:transition-transform active:duration-75",
                      ].join(" "),
                ].join(" ")}
              >
                <span className="font-sans text-base font-normal leading-snug tracking-[-0.005em] md:text-lg">
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
