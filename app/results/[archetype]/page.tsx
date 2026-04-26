import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  archetypes,
  getArchetype,
  getArchetypeIndex,
  TOTAL_ARCHETYPES,
} from "../archetypes";
import ShareBlock from "./ShareBlock";

// Production origin — OG/Twitter images REQUIRE absolute URLs to unfurl in
// WhatsApp / iMessage / Slack / Twitter. We hardcode rather than read from
// env so the metadata is correct in every environment (including local dev),
// since the unfurl bots fetch the deployed URL anyway.
const PROD_ORIGIN = "https://saree-dna.vercel.app";

export function generateStaticParams() {
  return archetypes.map((a) => ({ archetype: a.slug }));
}

type Params = { archetype: string };

// Per-archetype Open Graph + Twitter card. Falls back to /hero.jpg for
// archetypes whose card illustration hasn't landed yet, so the unfurl
// preview is never broken.
export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const a = getArchetype(params.archetype);
  if (!a) return {};

  const title = `Saree DNA — ${a.name}`;
  const description = `${a.tagline} Take the quiz to find yours.`;
  const image = a.cardImage
    ? `${PROD_ORIGIN}${a.cardImage}`
    : `${PROD_ORIGIN}/hero.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 1600 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

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
      <span className="block text-3xl sm:text-4xl md:text-5xl">You are the</span>
      <span className="mt-2 block text-4xl italic sm:mt-3 sm:text-5xl md:mt-3 md:text-6xl">
        {name}.
      </span>
    </h1>
  );
}

// The full results layout — vertical hero. Card centered up top as the
// moment, then headline + tagline, then a single narrow column of body
// copy below. Same on mobile and desktop; only sizes scale.
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

      <section className="mx-auto w-full px-5 pb-24 pt-10 sm:px-10 sm:pt-14 md:pt-16">
        {/* Card — centered, large, portrait. Sized so it's the moment without
            dominating the fold. 75vw on mobile keeps it visible without forcing
            a scroll to read the headline; max-w-md on desktop keeps detail
            legible at arm's length. */}
        <div className="mx-auto w-full max-w-[75vw] sm:max-w-sm md:max-w-md">
          <Image
            src={cardImage}
            alt={`${archetype.name} card illustration`}
            width={964}
            height={1600}
            priority
            sizes="(min-width: 768px) 28rem, 75vw"
            className="h-auto w-full border border-stone-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)]"
          />
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14">
          <Headline name={archetype.name} />
        </div>

        <p className="mt-3 text-center font-serif text-lg italic text-stone-600 sm:mt-4 sm:text-xl">
          {archetype.tagline}
        </p>

        {/* Body — single narrow column for comfortable reading line length.
            DESCRIPTION sits first (option b): the description IS the portrait,
            weave is the spec. Label stays per the no-invention rule. */}
        <div className="mx-auto mt-14 w-full max-w-2xl space-y-7 sm:mt-16 sm:space-y-8">
          <div className="space-y-1.5">
            <Label>Description</Label>
            <p className="font-serif text-base leading-7 text-stone-800">
              {archetype.description}
            </p>
          </div>

          {/* Specimen card — Weave / Drape / Palette / Worn well by grouped
              as the saree's physical specification, distinct from Description
              (personality) above. Sharp corners + thin border read like a
              museum specimen card, not a UI panel. */}
          <div className="space-y-5 border border-stone-200 bg-white p-6 sm:space-y-6 sm:p-8 md:p-10">
            <div className="space-y-1.5">
              <Label>Weave</Label>
              <p className="font-serif text-base leading-7 text-stone-800">
                {archetype.weave}
              </p>
            </div>

            {/* Drape and Palette stay inline — each is a single short line and
                the inline (LABEL · content) form reads tighter than a block. */}
            <InlineRow label="Drape">{archetype.drape}</InlineRow>

            <InlineRow label="Palette">{archetype.palette}</InlineRow>

            {/* Worn well by — kept inline to match Drape/Palette rhythm. The
                ~120-char content wraps to 2 lines on max-w-2xl, but the inline
                LABEL · content form keeps the four spec items reading as one
                coherent rhythm rather than introducing a heavier label-block
                at the bottom of the card. */}
            <InlineRow label="Worn well by">{archetype.wornWellBy}</InlineRow>
          </div>
        </div>

        <div className="mt-14 flex justify-center sm:mt-16">
          <TakeAgainCTA />
        </div>

        <ShareBlock
          archetypeName={archetype.name}
          archetypeSlug={archetype.slug}
          cardImage={archetype.cardImage}
        />
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

        <ShareBlock
          archetypeName={archetype.name}
          archetypeSlug={archetype.slug}
          cardImage={archetype.cardImage}
        />
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
