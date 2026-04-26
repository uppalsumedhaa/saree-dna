import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative h-[100svh] w-screen overflow-hidden bg-black">
      <Image
        src="/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_30%] sm:object-[50%_40%] md:object-center"
      />

      {/* All-over dim with a soft radial lift in the center, so the centered text reads
          without flattening the image. Keeps the women's faces visible up top. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Dead-center text block. Flex-centered both axes; safe-zone padding for narrow viewports. */}
      <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-10 md:px-16">
        <div className="flex max-w-none flex-col items-center text-center">
          <h1 className="font-serif text-[2.5rem] font-medium leading-[1.1] tracking-tight text-white sm:whitespace-nowrap sm:text-[clamp(1.5rem,6vw,5.5rem)] sm:leading-[1.05]">
            Every woman has a <em className="italic font-medium">saree</em> type
          </h1>

          <p className="mt-7 font-serif text-lg font-light italic text-white/80 sm:mt-6 sm:text-xl md:text-2xl">
            Discover your saree DNA
          </p>

          <Link
            href="/quiz"
            className="mt-10 inline-block border border-white/70 px-7 py-3 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-white transition-colors duration-200 hover:bg-white hover:text-black sm:mt-12 sm:text-xs"
          >
            Begin
          </Link>
        </div>
      </div>
    </main>
  );
}
