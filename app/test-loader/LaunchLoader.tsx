"use client";

import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { archetypes } from "../results/archetypes";
import type { Slug } from "../quiz/scoring";

// Launch-video variant of ResultLoader. Same Phase 1 (countdown) and Phase 2
// (cards fly in) — but Phase 3 is replaced with a fullscreen takeover where
// the winner card scales to fill ~95% of the viewport and HOLDS, while the
// other cards fade out. Used only for the marketing capture, then deleted.

type Props = {
  winnerSlug: Slug;
};

const PHASE1_MS = 2000; // countdown 0 → 100
const PHASE2_MS = 1800; // cards fly in
const PHASE3_MS = 700;  // winner scales to fullscreen

type CardChoreography = {
  fromX: number;
  fromY: number;
  fromR: number;
  toX: number;
  toY: number;
  toR: number;
  z: number;
};

const CHOREOGRAPHY: CardChoreography[] = [
  { fromX: -700, fromY: -500, fromR: -45, toX: -180, toY: -40, toR: -18, z: 1 },
  { fromX: 700, fromY: -500, fromR: 40, toX: 180, toY: -50, toR: 16, z: 2 },
  { fromX: 0, fromY: -700, fromR: -8, toX: 20, toY: -90, toR: -6, z: 3 },
  { fromX: -800, fromY: 200, fromR: -25, toX: -130, toY: 70, toR: -22, z: 4 },
  { fromX: 800, fromY: 250, fromR: 28, toX: 150, toY: 80, toR: 20, z: 5 },
  { fromX: -600, fromY: 700, fromR: -18, toX: -70, toY: 120, toR: -10, z: 6 },
  { fromX: 600, fromY: 700, fromR: 18, toX: 90, toY: 110, toR: 12, z: 7 },
  { fromX: -900, fromY: 100, fromR: -55, toX: -85, toY: 30, toR: -14, z: 14 },
  { fromX: 900, fromY: -100, fromR: 50, toX: 95, toY: 10, toR: 11, z: 15 },
];

export default function LaunchLoader({ winnerSlug }: Props) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  const counter = useMotionValue(0);
  const [counterText, setCounterText] = useState("0");

  const ordered = useMemo(() => {
    const winner = archetypes.find((a) => a.slug === winnerSlug);
    const others = archetypes.filter((a) => a.slug !== winnerSlug);
    if (!winner) return archetypes.map((a, i) => ({ a, slot: CHOREOGRAPHY[i] }));
    return [
      ...others.map((a, i) => ({ a, slot: CHOREOGRAPHY[i] })),
      { a: winner, slot: CHOREOGRAPHY[8] },
    ];
  }, [winnerSlug]);

  const winnerArchetype = useMemo(
    () => archetypes.find((a) => a.slug === winnerSlug),
    [winnerSlug],
  );

  useEffect(() => {
    const unsubscribe = counter.on("change", (v) => {
      setCounterText(String(Math.round(v)));
    });
    const controls = animate(counter, 100, {
      duration: PHASE1_MS / 1000,
      ease: [0.22, 0.61, 0.36, 1],
    });

    const t2 = window.setTimeout(() => setPhase(2), PHASE1_MS);
    const t3 = window.setTimeout(() => setPhase(3), PHASE1_MS + PHASE2_MS);

    return () => {
      controls.stop();
      unsubscribe();
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [counter]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-stone-50"
    >
      {/* Phase 1 — countdown */}
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

      {/* Phase 2 — card pile (non-winner cards fade out in phase 3) */}
      <div
        className="relative h-0 w-0"
        style={{ perspective: "1200px" }}
      >
        {phase >= 2 &&
          ordered.map(({ a, slot }, i) => {
            const isWinner = a.slug === winnerSlug;
            if (isWinner) return null; // winner is rendered separately for the fullscreen scale
            const flightDelay = i * 0.1;
            return (
              <motion.div
                key={a.slug}
                className="absolute left-0 top-0"
                style={{
                  zIndex: slot.z,
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
                        x: slot.toX * 1.15,
                        y: slot.toY * 1.15,
                        rotate: slot.toR,
                        opacity: 0,
                        scale: 0.9,
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
                        duration: 0.6,
                        ease: [0.22, 0.61, 0.36, 1],
                      }
                    : {
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

      {/* Winner card — rendered as a separate full-viewport layer that scales
          from the small "leader" slot position to fill ~95% of the screen. */}
      {phase >= 2 && winnerArchetype && (
        <motion.div
          className="absolute inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.9 }}
        >
          <motion.div
            className="relative"
            initial={{
              // Approximate leader-slot position + small card size (190x280 px)
              width: 190,
              height: 280,
              x: 95,
              y: 10,
              rotate: 11,
            }}
            animate={
              phase === 3
                ? {
                    // Fullscreen takeover. ~95vh tall, 16:9 ratio approx; let
                    // object-contain handle the fit so the card's own ratio is preserved.
                    width: "95vw",
                    height: "95vh",
                    x: 0,
                    y: 0,
                    rotate: 0,
                  }
                : {
                    width: 190,
                    height: 280,
                    x: 95,
                    y: 10,
                    rotate: 11,
                  }
            }
            transition={
              phase === 3
                ? { duration: PHASE3_MS / 1000, ease: [0.22, 0.61, 0.36, 1] }
                : {
                    type: "spring",
                    stiffness: 110,
                    damping: 16,
                    mass: 0.9,
                    delay: 0.8,
                  }
            }
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={winnerArchetype.cardImage ?? "/cards/maximalist.jpg"}
              alt=""
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}

      {/* Caption — appears once the card is fullscreen. Movie-poster register. */}
      <motion.p
        className="absolute bottom-[6%] left-0 right-0 z-[70] text-center font-serif text-sm uppercase tracking-[0.4em] text-stone-700 sm:text-base"
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: phase === 3 ? 1 : 0,
          y: phase === 3 ? 0 : 8,
        }}
        transition={{ duration: 0.5, delay: phase === 3 ? 0.55 : 0, ease: "easeOut" }}
      >
        The Bandhani Maximalist
      </motion.p>
    </div>
  );
}

function CardImage({ cardImage, priority }: { cardImage: string; priority?: boolean }) {
  return (
    <div
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
