import Image from "next/image";
import Link from "next/link";
import { archetypes } from "../archetypes";

// Bottom-of-page grid that surfaces every archetype on every results page.
// Server component — pure render of Links, no client interactivity needed.
// `currentSlug` is muted to signal "this is you" without taking the visitor
// out of the explore flow (we still allow them to click their own card).
export default function ExploreAllArchetypes({
  currentSlug,
}: {
  currentSlug: string;
}) {
  return (
    <section className="mx-auto mt-16 w-full max-w-5xl px-1 sm:mt-20">
      <h2 className="text-center font-sans text-xs uppercase tracking-[0.24em] text-stone-500 sm:text-sm">
        Explore all saree archetypes
      </h2>

      <ul
        className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8 md:gap-10"
        aria-label="All saree archetypes"
      >
        {archetypes.map((a) => {
          const isCurrent = a.slug === currentSlug;
          return (
            <li key={a.slug} className="flex flex-col items-center">
              <Link
                href={`/results/${a.slug}`}
                aria-label={`View ${a.name}${isCurrent ? " (your result)" : ""}`}
                className={`group block w-full transition-transform duration-200 hover:-translate-y-0.5 ${
                  isCurrent ? "opacity-60" : ""
                }`}
              >
                {a.cardImage ? (
                  <Image
                    src={a.cardImage}
                    alt={`${a.name} card illustration`}
                    width={964}
                    height={1600}
                    sizes="(min-width: 768px) 18rem, (min-width: 640px) 14rem, 40vw"
                    className="h-auto w-full border border-stone-200 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_18px_-12px_rgba(0,0,0,0.18)] transition-opacity duration-200 group-hover:opacity-90"
                  />
                ) : (
                  <div
                    className="flex aspect-[964/1600] w-full items-center justify-center border border-stone-200 bg-stone-100 px-3 text-center"
                    aria-hidden
                  >
                    <span className="font-serif text-sm italic text-stone-500">
                      {a.name}
                    </span>
                  </div>
                )}

                <p className="mt-3 text-center font-serif text-sm italic text-stone-700 sm:text-base">
                  {a.name}
                </p>
              </Link>

              {isCurrent && (
                <p className="mt-1 font-sans text-[0.6rem] uppercase tracking-[0.24em] text-stone-400">
                  You
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mb-20" aria-hidden />
    </section>
  );
}
