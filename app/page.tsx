import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-[100svh] w-screen overflow-hidden bg-black">
      {/* TODO: PLACEHOLDER IMAGE — pending license/replacement.
          Source: ANKA Instagram. Must replace before public launch. */}
      <Image
        src="/hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_30%] sm:object-[50%_40%] md:object-center"
      />

      {/* Subtle gradient — only the bottom 40% gets dimmed, so the image up top reads clean. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bottom-left text block. Editorial, asymmetric. Safe-zone padding scales up on larger screens. */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-10 sm:pb-14 md:px-16 md:pb-20">
        <div className="max-w-xl">
          <h1 className="font-serif text-[2.25rem] leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
            Every woman has a <em className="italic">saree</em> type
          </h1>

          <p className="mt-3 font-sans text-sm font-normal text-white/75 sm:mt-4 sm:text-base">
            Come find yours
          </p>

          <Link
            href="/quiz"
            className="mt-7 inline-block border border-white/70 px-7 py-3 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:mt-9 sm:text-xs"
          >
            Begin
          </Link>
        </div>
      </div>
    </main>
  );
}
