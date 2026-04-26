import Link from "next/link";

export default function ResultsPlaceholderPage() {
  return (
    <main className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-stone-50 px-6 text-center text-stone-900">
      <p className="font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-500">
        Reading your weave
      </p>
      <h1 className="mt-6 max-w-xl font-serif text-3xl font-medium leading-tight md:text-4xl">
        Results coming soon.
      </h1>
      <p className="mt-3 max-w-md font-serif text-lg italic text-stone-500">
        The result pages are next on the bench.
      </p>
      <Link
        href="/"
        className="mt-10 inline-block border border-stone-900/70 px-7 py-3 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-900 transition-colors duration-200 hover:bg-stone-900 hover:text-white"
      >
        Home
      </Link>
    </main>
  );
}
