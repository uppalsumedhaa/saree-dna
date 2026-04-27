"use client";

import { useEffect, useState } from "react";
import LaunchLoader from "./LaunchLoader";

// One-off page used by scripts/capture-loader.ts to record the marketing
// launch video. Renders the LaunchLoader with the Bandhani Maximalist as the
// hardcoded winner. Pre-decodes all card images and signals readiness via
// window.__loaderReady so the capture script can align its t=0.

const CARD_SLUGS = [
  "heir",
  "romantic",
  "wanderer",
  "maximalist",
  "tussar",
  "folklorist",
  "mul",
  "occasionalist",
  "modernist",
];

export default function TestLoaderPage() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      CARD_SLUGS.map(
        (slug) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = `/cards/${slug}.jpg`;
          }),
      ),
    ).then(() => {
      if (cancelled) return;
      setReady(true);
      // Mark ready for the capture script.
      (window as unknown as { __loaderReady?: boolean }).__loaderReady = true;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!ready) {
    return <div className="fixed inset-0 bg-stone-50" />;
  }

  return <LaunchLoader winnerSlug="maximalist" />;
}
