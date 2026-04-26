"use client";

import { useCallback, useEffect, useState } from "react";

// Share controls for the results page. Lives below the "Take again" CTA.
// Three actions: WhatsApp deep link, Web Share API (native sheet, hidden on
// browsers that don't support it), and Copy link with a 2s "Copied" state.
//
// Kept as a client component so the rest of the page can stay server-rendered
// and `generateMetadata` continues to drive the OG unfurl cleanly.

const PROD_ORIGIN = "https://saree-dna.vercel.app";

type Props = {
  archetypeName: string;
  archetypeSlug: string;
  cardImage: string | null;
};

// Inline SVG icons — kept small (16px) and stroked at 1.5 to sit comfortably
// next to the DM Sans labels. Filled WA glyph because that's the recognisable
// silhouette; outlined share + link to match the rest of the page's iconography.
function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.83 9.83 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M12 3v12" />
      <path d="M8 7l4-4 4 4" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
    </svg>
  );
}

// Same visual register as TakeAgainCTA: thin underline border, DM Sans uppercase
// micro-tracking, stone palette. Underline + icon row reads as a sibling control,
// not a separate UI vocabulary.
function buttonClass() {
  return "group inline-flex items-center gap-2 font-sans text-[0.7rem] uppercase tracking-[0.32em] text-stone-700 transition-colors duration-200 hover:text-stone-900";
}

function underlineClass() {
  return "border-b border-stone-400 pb-1 group-hover:border-stone-900";
}

export default function ShareBlock({ archetypeName, archetypeSlug, cardImage }: Props) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // navigator.share is undefined on most desktop browsers — hide the button
  // there rather than render a control that does nothing. Effect runs client-side
  // so SSR matches the no-button initial state.
  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  const blurb = `I'm the ${archetypeName}. Take the quiz to find yours! ${PROD_ORIGIN}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(blurb)}`;

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator === "undefined" || typeof navigator.share !== "function") return;

    const title = `Saree DNA — ${archetypeName}`;
    const text = `I'm the ${archetypeName}. Take the quiz to find yours!`;
    const url = typeof window !== "undefined" ? window.location.href : `${PROD_ORIGIN}/results/${archetypeSlug}`;

    // Try to attach the card image as a file so iOS/Android share sheets can
    // route to Instagram Stories / Photos / etc. Falls back to URL-only share
    // if the image fetch fails or the browser can't share files.
    if (cardImage && typeof navigator.canShare === "function") {
      try {
        const res = await fetch(cardImage);
        if (res.ok) {
          const blob = await res.blob();
          const filename = cardImage.split("/").pop() || `${archetypeSlug}.jpg`;
          const file = new File([blob], filename, { type: blob.type || "image/jpeg" });
          if (navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({ title, text, url, files: [file] });
              return;
            } catch (err) {
              // User cancelled or share failed — fall through to URL-only attempt.
              if ((err as DOMException)?.name === "AbortError") return;
            }
          }
        }
      } catch {
        // Network / CORS failure — fall through to URL-only share.
      }
    }

    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return;
      // Anything else — silently swallow; the user can still use Copy link.
    }
  }, [archetypeName, archetypeSlug, cardImage]);

  const handleCopy = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Older browsers fallback — uses a hidden textarea + execCommand.
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Permissions failure — leave button label unchanged.
    }
  }, []);

  return (
    <div className="mt-12 flex flex-col items-center sm:mt-14">
      <div className="font-sans text-[0.6rem] uppercase tracking-[0.24em] text-stone-400">
        Share your saree DNA
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:mt-6 sm:gap-x-9">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share to WhatsApp"
          className={buttonClass()}
        >
          <WhatsAppIcon />
          <span className={underlineClass()}>WhatsApp</span>
        </a>

        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share via your device"
            className={buttonClass()}
          >
            <ShareIcon />
            <span className={underlineClass()}>Share</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy link to clipboard"
          aria-live="polite"
          className={buttonClass()}
        >
          <LinkIcon />
          <span className={underlineClass()}>{copied ? "Copied" : "Copy link"}</span>
        </button>
      </div>
    </div>
  );
}
