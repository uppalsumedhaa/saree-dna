"use client";

import { useRouter } from "next/navigation";

// Mirrors the same localStorage key used by the quiz to persist picks.
// Clearing it here ensures a "Take again" run starts from an empty slate
// rather than carrying over the prior session's answers.
const PICKS_KEY = "saree-dna-picks";

export default function TakeAgainButton() {
  const router = useRouter();

  const handleClick = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(PICKS_KEY);
      } catch {
        // Private mode / quota — silent. The user can still re-run; worst
        // case is the prior picks are revisited but each Q overwrites them.
      }
    }
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex min-h-[44px] items-center gap-2 px-2 py-3 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-700 transition-colors duration-200 hover:text-stone-900"
    >
      <span className="border-b border-stone-400 pb-1 group-hover:border-stone-900">
        Take again
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden
      >
        <path d="M7 17L17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </button>
  );
}
