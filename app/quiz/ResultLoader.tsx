"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { archetypes } from "../results/archetypes";
import type { Slug } from "./scoring";

type Props = {
  winnerSlug: Slug;
  onComplete: () => void;
};

// Total animation budget: 2.5s. Punchy — anticipatory, not cinematic.
//   Phase 1 (0.0s  – 1.5s): shuffle. Cards translate/rotate/restack.
//   Phase 2 (1.5s  – 2.2s): settle. Losers fan back; winner glides forward.
//   Phase 3 (2.2s  – 2.5s): hero. Winner held briefly; copy switches.
const SHUFFLE_END = 1.5;
const SETTLE_END = 2.2;
const TOTAL = 2.5;

// Deterministic pseudo-random so the shuffle pattern is stable per render
// (no hydration / re-render jitter). Seeded by the slug index in archetypes.
function seededOffsets(seed: number) {
  // Tiny LCG. Returns a function we call repeatedly.
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

type CardLayout = {
  slug: string;
  cardImage: string;
  // Shuffle phase keyframes — small chaotic dance.
  shuffleX: number[];
  shuffleY: number[];
  shuffleR: number[];
  // Resting fan position (settle phase) for non-winners.
  fanX: number;
  fanY: number;
  fanR: number;
  // Initial z-order during shuffle so cards swap layers.
  baseZ: number;
};

function useCardLayouts(winnerSlug: Slug): CardLayout[] {
  return useMemo(() => {
    return archetypes.map((a, i) => {
      const rng = seededOffsets(i + 1);
      // Shuffle keyframes: 4 stops within +/- 80px / +/- 18deg.
      const shuffleX = [0, (rng() - 0.5) * 160, (rng() - 0.5) * 160, (rng() - 0.5) * 160];
      const shuffleY = [0, (rng() - 0.5) * 80, (rng() - 0.5) * 80, (rng() - 0.5) * 80];
      const shuffleR = [
        (rng() - 0.5) * 24,
        (rng() - 0.5) * 36,
        (rng() - 0.5) * 36,
        (rng() - 0.5) * 36,
      ];
      // Fan position for losers: spread across an arc behind the winner.
      // 8 losers span -56deg .. +56deg. We compute the loser-only index later.
      return {
        slug: a.slug,
        cardImage: a.cardImage ?? "/cards/heir.jpg",
        shuffleX,
        shuffleY,
        shuffleR,
        fanX: 0, // overridden below
        fanY: 0, // overridden below
        fanR: 0, // overridden below
        baseZ: i,
      };
    }).map((c, _, all) => {
      // Re-pass: assign fan slot based on loser order.
      const losers = all.filter((x) => x.slug !== winnerSlug);
      const loserIdx = losers.findIndex((x) => x.slug === c.slug);
      if (c.slug === winnerSlug) {
        return { ...c, fanX: 0, fanY: 0, fanR: 0 };
      }
      const total = losers.length; // 8
      // Centered offset around 0; arc from -1 to +1.
      const t = total === 1 ? 0 : (loserIdx / (total - 1)) * 2 - 1;
      return {
        ...c,
        fanX: t * 220, // px
        fanY: Math.abs(t) * 14, // dip outer cards slightly
        fanR: t * 14, // degrees
      };
    });
  }, [winnerSlug]);
}

export default function ResultLoader({ winnerSlug, onComplete }: Props) {
  const layouts = useCardLayouts(winnerSlug);
  const reduce = useReducedMotion();

  // Drive navigation off a single timer so the animation can't strand the
  // user if a particular variant misfires its `onAnimationComplete`.
  useEffect(() => {
    const ms = reduce ? 600 : TOTAL * 1000;
    const id = window.setTimeout(onComplete, ms);
    return () => window.clearTimeout(id);
  }, [onComplete, reduce]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Reading your saree DNA"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-50"
    >
      {/* Card stage. The cards are absolutely positioned and animate
          relative to this center. Sized to give 200px-wide cards on
          desktop, ~150px on mobile, with breathing room around the fan. */}
      <div className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[400px]">
        {layouts.map((card, i) => {
          const isWinner = card.slug === winnerSlug;
          // Stagger shuffle starts so cards aren't all moving in lockstep.
          const startDelay = (i % 9) * 0.04;

          if (reduce) {
            // Reduced-motion: skip the dance, fade the winner up briefly.
            return isWinner ? (
              <motion.div
                key={card.slug}
                className="absolute left-1/2 top-1/2"
                initial={{ x: "-50%", y: "-50%", opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <CardImage cardImage={card.cardImage} priority />
              </motion.div>
            ) : null;
          }

          return (
            <motion.div
              key={card.slug}
              className="absolute left-1/2 top-1/2"
              style={{ zIndex: isWinner ? 50 : 10 + card.baseZ }}
              initial={{
                x: "-50%",
                y: "-50%",
                rotate: 0,
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                // Phase 1 keyframes (shuffle), then phase 2 settle, then phase 3 hero.
                x: [
                  "-50%",
                  `calc(-50% + ${card.shuffleX[1]}px)`,
                  `calc(-50% + ${card.shuffleX[2]}px)`,
                  `calc(-50% + ${card.shuffleX[3]}px)`,
                  // Settle: losers go to fan, winner to center.
                  `calc(-50% + ${isWinner ? 0 : card.fanX}px)`,
                  `calc(-50% + ${isWinner ? 0 : card.fanX}px)`,
                ],
                y: [
                  "-50%",
                  `calc(-50% + ${card.shuffleY[1]}px)`,
                  `calc(-50% + ${card.shuffleY[2]}px)`,
                  `calc(-50% + ${card.shuffleY[3]}px)`,
                  `calc(-50% + ${isWinner ? 0 : card.fanY}px)`,
                  `calc(-50% + ${isWinner ? 0 : card.fanY}px)`,
                ],
                rotate: [
                  0,
                  card.shuffleR[1],
                  card.shuffleR[2],
                  card.shuffleR[3],
                  isWinner ? 0 : card.fanR,
                  isWinner ? 0 : card.fanR,
                ],
                opacity: [
                  0,
                  1,
                  0.85,
                  1,
                  isWinner ? 1 : 0.55,
                  isWinner ? 1 : 0.45,
                ],
                scale: [
                  0.96,
                  1,
                  0.98,
                  1,
                  isWinner ? 1.06 : 0.9,
                  isWinner ? 1.08 : 0.88,
                ],
              }}
              transition={{
                duration: TOTAL,
                delay: startDelay,
                // Keyframe spacing: shuffle eats up to 1.5/2.5 = 0.6, settle to 2.2/2.5 = 0.88, hero through 1.0.
                times: [0, 0.2, 0.42, 0.6, 0.88, 1],
                ease: ["easeOut", "easeInOut", "easeInOut", "easeOut", "easeOut"],
              }}
            >
              <CardImage cardImage={card.cardImage} priority={isWinner} />
            </motion.div>
          );
        })}
      </div>

      {/* Subtle copy. Two stanzas: shuffle line, then reveal line.
          The reveal line gets the archetype name to set up the next page. */}
      <div className="mt-10 h-6 text-center sm:mt-14">
        <motion.p
          key="shuffle-copy"
          className="font-serif text-base italic text-stone-500 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: TOTAL,
            times: [0, 0.12, 0.7, 0.82],
          }}
        >
          Reading your saree DNA…
        </motion.p>
        <motion.p
          className="-mt-6 font-serif text-base italic text-stone-700 sm:text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 1] }}
          transition={{
            duration: TOTAL,
            times: [0, 0.84, 0.96],
          }}
        >
          You are the {archetypeName(winnerSlug)}…
        </motion.p>
      </div>
    </div>
  );
}

function archetypeName(slug: string): string {
  return archetypes.find((a) => a.slug === slug)?.name ?? "";
}

function CardImage({ cardImage, priority }: { cardImage: string; priority?: boolean }) {
  return (
    <div
      className="relative h-[210px] w-[140px] overflow-hidden rounded-sm shadow-[0_18px_40px_-18px_rgba(28,25,23,0.45)] ring-1 ring-stone-900/5 sm:h-[260px] sm:w-[180px]"
      style={{ backgroundColor: "#f5f5f4" }}
    >
      <Image
        src={cardImage}
        alt=""
        fill
        sizes="(min-width: 640px) 180px, 140px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
