"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { archetypes } from "../results/archetypes";
import type { Slug } from "./scoring";

type Props = {
  winnerSlug: Slug;
  onComplete: () => void;
};

// Two-phase reveal modeled on Milla Nova "Chapter the Bride".
//   Phase 1 (0.0s – 1.6s): countdown. Faded serif percentage 0 → 100, italic % glyph.
//   Phase 2 (1.6s – 3.0s): cards fly in from edges, staggered, layered like
//                          posters thrown onto a table.
//   Phase 3 (3.0s – 3.8s): winner scales forward, others dim. Hold, then exit.
const PHASE1_MS = 1600;
const PHASE2_MS = 1400;
const PHASE3_MS = 800;
const TOTAL_MS = PHASE1_MS + PHASE2_MS + PHASE3_MS;

type CardChoreography = {
  // Off-screen origin. Mix of edges + corners so it reads "thrown in".
  fromX: number; // px
  fromY: number; // px
  fromR: number; // deg, larger so the spin is visible mid-flight
  // Resting position in the pile, relative to the stage center.
  toX: number;
  toY: number;
  toR: number;
  // Z-stack within the pile.
  z: number;
};

// 9 hand-tuned slots. Two prominent foreground cards (matching frame 07/08
// composition where two cards lead and the rest trail behind/around). Origins
// alternate corners and edges.
const CHOREOGRAPHY: CardChoreography[] = [
  // 0 — back-left, peeks behind
  { fromX: -700, fromY: -500, fromR: -45, toX: -180, toY: -40, toR: -18, z: 1 },
  // 1 — back-right, peeks behind
  { fromX: 700, fromY: -500, fromR: 40, toX: 180, toY: -50, toR: 16, z: 2 },
  // 2 — top center, slight tilt
  { fromX: 0, fromY: -700, fromR: -8, toX: 20, toY: -90, toR: -6, z: 3 },
  // 3 — far left, low
  { fromX: -800, fromY: 200, fromR: -25, toX: -130, toY: 70, toR: -22, z: 4 },
  // 4 — far right, low
  { fromX: 800, fromY: 250, fromR: 28, toX: 150, toY: 80, toR: 20, z: 5 },
  // 5 — bottom-left
  { fromX: -600, fromY: 700, fromR: -18, toX: -70, toY: 120, toR: -10, z: 6 },
  // 6 — bottom-right
  { fromX: 600, fromY: 700, fromR: 18, toX: 90, toY: 110, toR: 12, z: 7 },
  // 7 — left foreground (one of the two prominent leaders)
  { fromX: -900, fromY: 100, fromR: -55, toX: -85, toY: 30, toR: -14, z: 14 },
  // 8 — right foreground (other prominent leader)
  { fromX: 900, fromY: -100, fromR: 50, toX: 95, toY: 10, toR: 11, z: 15 },
];

export default function ResultLoader({ winnerSlug, onComplete }: Props) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  // Counter is a motion value so we don't re-render React on every frame.
  const counter = useMotionValue(0);
  const [counterText, setCounterText] = useState("0");

  // Order cards so the WINNER lands last — it should be on top of the pile
  // before phase 3, ready to scale forward. Choreography slots are fixed,
  // so we map archetypes to slots with the winner taking slot 8 (the
  // right-foreground "leader" with highest z-index).
  const ordered = useMemo(() => {
    const winner = archetypes.find((a) => a.slug === winnerSlug);
    const others = archetypes.filter((a) => a.slug !== winnerSlug);
    if (!winner) return archetypes.map((a, i) => ({ a, slot: CHOREOGRAPHY[i] }));
    return [
      ...others.map((a, i) => ({ a, slot: CHOREOGRAPHY[i] })),
      { a: winner, slot: CHOREOGRAPHY[8] },
    ];
  }, [winnerSlug]);

  const winnerName = useMemo(
    () => archetypes.find((a) => a.slug === winnerSlug)?.name ?? "",
    [winnerSlug],
  );

  // Drive the counter 0 → 100 over PHASE1_MS, then advance phases on a
  // single timer chain so a stuck animation can't strand the user.
  useEffect(() => {
    if (reduce) {
      // Reduced motion: skip straight through with a brief hold.
      const id = window.setTimeout(onComplete, 700);
      return () => window.clearTimeout(id);
    }

    const unsubscribe = counter.on("change", (v) => {
      setCounterText(String(Math.round(v)));
    });
    const controls = animate(counter, 100, {
      duration: PHASE1_MS / 1000,
      ease: [0.22, 0.61, 0.36, 1], // slow-build, classical
    });

    const t2 = window.setTimeout(() => setPhase(2), PHASE1_MS);
    const t3 = window.setTimeout(() => setPhase(3), PHASE1_MS + PHASE2_MS);
    const tEnd = window.setTimeout(onComplete, TOTAL_MS);

    return () => {
      controls.stop();
      unsubscribe();
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(tEnd);
    };
  }, [counter, onComplete, reduce]);

  if (reduce) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-label="Reading your saree DNA"
        className="fixed inset-0 z-50 flex items-center justify-center bg-stone-50"
      >
        <p className="font-serif text-2xl italic text-stone-500">
          You are the {winnerName}…
        </p>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Reading your saree DNA"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-50"
    >
      {/* Phase 1 — countdown. Cormorant serif, very faded, italic % glyph
          like the reference. Fades out as phase 2 begins. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: phase === 1 ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="flex items-baseline gap-1 font-serif text-stone-300 sm:gap-2">
          <span className="text-[7rem] leading-none tracking-tight sm:text-[10rem]">
            {counterText}
          </span>
          <span className="font-serif text-[5rem] italic leading-none sm:text-[7rem]">
            %
          </span>
        </div>
      </motion.div>

      {/* Phase 2/3 — card pile. Stage is a centered point; cards translate
          relative to it. Slight perspective so rotations feel physical. */}
      <div
        className="relative h-0 w-0"
        style={{ perspective: "1200px" }}
      >
        {phase >= 2 &&
          ordered.map(({ a, slot }, i) => {
            const isWinner = a.slug === winnerSlug;
            const flightDelay = i * 0.07; // 70ms stagger
            return (
              <motion.div
                key={a.slug}
                className="absolute left-0 top-0"
                style={{
                  zIndex: isWinner && phase === 3 ? 50 : slot.z,
                  transformOrigin: "center center",
                }}
                initial={{
                  x: slot.fromX,
                  y: slot.fromY,
                  rotate: slot.fromR,
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={
                  phase === 3
                    ? {
                        // Winner rises center, others dim and drift slightly back.
                        x: isWinner ? 0 : slot.toX * 1.08,
                        y: isWinner ? 0 : slot.toY * 1.08,
                        rotate: isWinner ? 0 : slot.toR,
                        opacity: isWinner ? 1 : 0.45,
                        scale: isWinner ? 1.08 : 0.94,
                      }
                    : {
                        x: slot.toX,
                        y: slot.toY,
                        rotate: slot.toR,
                        opacity: 1,
                        scale: 1,
                      }
                }
                transition={
                  phase === 3
                    ? {
                        duration: 0.55,
                        ease: [0.22, 0.61, 0.36, 1],
                      }
                    : {
                        // Spring with a small overshoot so each card lands
                        // and settles, like a thrown poster.
                        type: "spring",
                        stiffness: 110,
                        damping: 16,
                        mass: 0.9,
                        delay: flightDelay,
                      }
                }
              >
                <CardImage cardImage={a.cardImage ?? "/cards/heir.jpg"} priority />
              </motion.div>
            );
          })}
      </div>

      {/* Phase 3 caption. Sits below the pile, fades in once the winner is
          forward. Same italic serif register as the rest of the app. */}
      <motion.p
        className="absolute bottom-[14%] left-0 right-0 text-center font-serif text-base italic text-stone-600 sm:text-lg"
        initial={{ opacity: 0, y: 6 }}
        animate={{
          opacity: phase === 3 ? 1 : 0,
          y: phase === 3 ? 0 : 6,
        }}
        transition={{ duration: 0.4, delay: phase === 3 ? 0.2 : 0, ease: "easeOut" }}
      >
        You are the {winnerName}…
      </motion.p>
    </div>
  );
}

function CardImage({ cardImage, priority }: { cardImage: string; priority?: boolean }) {
  return (
    <div
      // Card sized to fit nicely in the pile. ~150x220 mobile, ~190x280 desktop.
      // Subtle paper-edge shadow + faint ring; no harsh drop shadow.
      className="relative -translate-x-1/2 -translate-y-1/2 h-[220px] w-[150px] overflow-hidden rounded-sm bg-stone-100 shadow-[0_22px_50px_-22px_rgba(28,25,23,0.55)] ring-1 ring-stone-900/5 sm:h-[280px] sm:w-[190px]"
    >
      <Image
        src={cardImage}
        alt=""
        fill
        sizes="(min-width: 640px) 190px, 150px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
