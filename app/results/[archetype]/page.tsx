import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  archetypes,
  getArchetype,
  getArchetypeIndex,
  TOTAL_ARCHETYPES,
} from "../archetypes";

export function generateStaticParams() {
  return archetypes.map((a) => ({ archetype: a.slug }));
}

type Params = { archetype: string };

function formatNum(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

// Shared top bar — back arrow left, "NN / 09" right. Mirrors the quiz header
// so the user feels they're still inside the same surface, not a different page.
function TopBar({ index }: { index: number }) {
  return (
    <header className="relative z-10 flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-8">
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
        {formatNum(index)} / {formatNum(TOTAL_ARCHETYPES)}
      </div>
    </header>
  );
}

// Section label — DM Sans uppercase tracking. Spec keeps these small and grey
// so the body copy (serif) carries the page.
function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-stone-400">
      {children}
    </div>
  );
}

// Inline label variant for one-line fields (Drape, Palette). Renders as
// LABEL · content on a single row so the bottom of the page doesn't stack
// label-above-content blocks for content that's only a sentence long.
function InlineRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="font-serif text-base leading-7 text-stone-800">
      <span className="mr-3 align-middle font-sans text-[0.6rem] uppercase tracking-[0.24em] text-stone-400">
        {label}
      </span>
      {children}
    </p>
  );
}

function TakeAgainCTA() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-700 transition-colors duration-200 hover:text-stone-900"
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
    </Link>
  );
}

// Splits the headline into two display parts. We keep "You are the" in regular
// weight and italicise the archetype name on the second line — feels considered,
// not precious. If the name is short, the second line still has weight.
function Headline({ name }: { name: string }) {
  return (
    <h1 className="text-center font-serif font-medium leading-[1.05] tracking-tight text-stone-900">
      <span className="block text-3xl sm:text-5xl md:text-6xl">You are the</span>
      <span className="mt-2 block text-4xl italic sm:mt-3 sm:text-6xl md:mt-4 md:text-7xl">
        {name}.
      </span>
    </h1>
  );
}

// The full results layout — used when an archetype has a card image.
// Two-column on md+, single column on mobile with the card pulled up top.
function FullResults({
  archetype,
  index,
}: {
  archetype: ReturnType<typeof getArchetype> & {};
  index: number;
}) {
  const cardImage = archetype.cardImage as string;
  return (
    <main className="relative min-h-[100svh] w-full bg-stone-50 text-stone-900">
      <TopBar index={index} />

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-10 sm:pt-14 md:pt-16">
        <Headline name={archetype.name} />

        <p className="mt-2 text-center font-serif text-lg italic text-stone-600 sm:mt-3 sm:text-xl md:text-2xl">
          {archetype.tagline}
        </p>

        {/* Mobile: card stacks above the body. Desktop: two-column with image left.
            Image col is fixed-ish width on desktop (max-w-sm) so detail stays legible
            without dominating; text col gets the larger share. */}
        <div className="mt-8 grid grid-cols-1 gap-10 sm:mt-10 md:mt-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-5 md:pt-1">
            <div className="mx-auto w-full max-w-[60vw] sm:max-w-xs md:mx-0 md:max-w-sm">
              <Image
                src={cardImage}
                alt={`${archetype.name} card illustration`}
                width={964}
                height={1600}
                priority
                sizes="(min-width: 768px) 24rem, 60vw"
                className="h-auto w-full border border-stone-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="space-y-6 sm:space-y-7">
              <p className="font-serif text-base leading-7 text-stone-800 sm:text-lg sm:leading-[1.6]">
                {archetype.description}
              </p>

              <div className="space-y-5 sm:space-y-6">
                <div className="space-y-1.5">
                  <Label>Weave</Label>
                  <p className="font-serif text-base leading-7 text-stone-800">
                    {archetype.weave}
                  </p>
                </div>

                {/* Drape and Palette are each a single short line — render
                    inline (LABEL · content) so they don't claim block-sized
                    real estate at the bottom of the page. */}
                <InlineRow label="Drape">{archetype.drape}</InlineRow>

                <InlineRow label="Palette">{archetype.palette}</InlineRow>

                <div className="space-y-1.5">
                  <Label>Worn well by</Label>
                  <p className="font-serif text-base leading-7 text-stone-800">
                    {archetype.wornWellBy}
                  </p>
                </div>
              </div>

              <div className="pt-1">
                <TakeAgainCTA />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Placeholder for archetypes whose card illustration hasn't landed yet.
// Same visual register as the full page so navigating between routes
// doesn't feel jarring. Kept deliberately spare.
function PlaceholderResults({
  archetype,
  index,
}: {
  archetype: ReturnType<typeof getArchetype> & {};
  index: number;
}) {
  return (
    <main className="relative min-h-[100svh] w-full bg-stone-50 text-stone-900">
      <TopBar index={index} />

      <section className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-2xl flex-col items-center justify-center px-5 pb-24 pt-10 text-center sm:px-10">
        <p className="font-serif text-base italic text-stone-500 sm:text-lg">
          Card coming soon.
        </p>

        <div className="mt-10 sm:mt-12">
          <Headline name={archetype.name} />
        </div>

        <p className="mt-6 font-serif text-lg italic text-stone-600 sm:mt-8 sm:text-xl md:text-2xl">
          {archetype.tagline}
        </p>

        <div className="mt-14 sm:mt-16">
          <TakeAgainCTA />
        </div>
      </section>
    </main>
  );
}

export default function ResultsPage({ params }: { params: Params }) {
  const archetype = getArchetype(params.archetype);
  if (!archetype) notFound();

  const index = getArchetypeIndex(archetype.slug);

  if (archetype.cardImage) {
    return <FullResults archetype={archetype} index={index} />;
  }
  return <PlaceholderResults archetype={archetype} index={index} />;
}
