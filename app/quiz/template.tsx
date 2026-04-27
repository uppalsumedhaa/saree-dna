"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Next 14 App Router templates remount on every route change, which means
// the motion.div below replays its initial → animate fade on every nav
// between /quiz/<n> screens (forward via the click handler, back via the
// header arrow, and on the very first /quiz/1 mount from the homepage).
//
// 350ms ease-out: long enough to feel intentional, short enough that it
// doesn't drag against the 280ms selection pulse that fires beforehand.
// Keyed on pathname for safety — ensures framer-motion treats each
// question route as a distinct mount even if React tries to reconcile.
//
// Q8 → results: the ResultLoader (fixed inset-0, z-50) is rendered inside
// QuestionView and runs its own ~4.8s choreography. The template fade
// completed long before then, and navigating to /results/<slug> exits this
// template entirely, so the two animations don't fight.
export default function QuizTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
