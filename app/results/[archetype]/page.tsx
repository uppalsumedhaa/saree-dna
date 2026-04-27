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
import TakeAgainButton from "./TakeAgainButton";

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
    <header className="relative z-10 flex items-center justify-between px-3 pt-4 sm:px-10 sm:pt-8">
      <Link
        href="/"
        aria-label="Back to home"
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

// The full results layout. Mobile: headline-led vertical stack (headline
// above the card so the verdict lands first on small screens). Desktop:
// two-column side-by-side — card anchored left, full text column right —
// with a 5/7 grid favoring the text so description/spec get breathing room.
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
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16 lg:gap-20">
          {/* MOBILE-ONLY: Headline + tagline above the card so the verdict
              ("You are the X") lands first on small screens before scroll.
              Hidden on md+ where this content lives in the right column. */}
          <div className="md:hidden">
            <Headline name={archetype.name} />
            <p className="mt-3 text-center font-serif text-lg italic text-stone-600 sm:mt-4 sm:text-xl">
              {archetype.tagline}
            </p>
          </div>

          {/* Card column. On mobile it sits between headline and description;
              on desktop it occupies the left 5/12 columns and is vertically
              centered in its track via self-start + sticky-ish placement so
              it feels anchored against the scrolling text on the right.
              max-w-sm/md keeps detail legible without overwhelming the text. */}
          <div className="md:col-span-5 md:self-start">
            <div className="mx-auto w-full max-w-[75vw] sm:max-w-sm md:sticky md:top-10 md:max-w-md">
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
          </div>

          {/* Text column. On desktop holds the full reading flow:
              headline → tagline → description → spec box → CTA → share.
              On mobile only the body content (description onwards) lives
              here — headline/tagline render above the card via the md:hidden
              block. */}
          <div className="md:col-span-7">
            {/* DESKTOP-ONLY headline/tagline. Left-aligned on desktop so the
                two columns read as a magazine spread, not a centered hero. */}
            <div className="hidden md:block">
              <h1 className="font-serif font-medium leading-[1.05] tracking-tight text-stone-900">
                <span className="block text-4xl md:text-5xl">You are the</span>
                <span className="mt-3 block text-5xl italic md:text-6xl">
                  {archetype.name}.
                </span>
              </h1>
              <p className="mt-4 font-serif text-xl italic text-stone-600">
                {archetype.tagline}
              </p>
            </div>

            {/* Body — description sits first (the description IS the portrait,
                weave is the spec). Bumped to text-lg/xl so it commands its
                own breathing room and reads like editorial body copy, not
                caption text. */}
            <div className="mt-10 space-y-7 sm:space-y-8 md:mt-10">
              <div className="space-y-1.5">
                <Label>Description</Label>
                <p className="font-serif text-lg leading-8 text-stone-800 sm:text-xl sm:leading-8 md:text-xl md:leading-9">
                  {archetype.description}
                </p>
              </div>

              {/* Specimen card — Weave / Drape / Palette / Worn well by
                  grouped as the saree's physical specification, distinct
                  from Description (personality) above. Sharp corners + thin
                  border read like a museum specimen card, not a UI panel.
                  Body bumped to text-lg to sit closer in weight to the
                  description above; section labels stay small + tracked. */}
              <div className="space-y-5 border border-stone-200 bg-white p-6 sm:space-y-6 sm:p-8 md:p-10">
                <div className="space-y-1.5">
                  <Label>Weave</Label>
                  <p className="font-serif text-lg leading-8 text-stone-800">
                    {archetype.weave}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label>Drape</Label>
                  <p className="font-serif text-lg leading-8 text-stone-800">
                    {archetype.drape}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label>Palette</Label>
                  <p className="font-serif text-lg leading-8 text-stone-800">
                    {archetype.palette}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label>Worn well by</Label>
                  <p className="font-serif text-lg leading-8 text-stone-800">
                    {archetype.wornWellBy}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-14 flex justify-center sm:mt-16 md:justify-start">
              <TakeAgainButton />
            </div>

            <ShareBlock
              archetypeName={archetype.name}
              archetypeSlug={archetype.slug}
              cardImage={archetype.cardImage}
            />
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
          <TakeAgainButton />
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
