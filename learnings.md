# Learnings

Process failures and what they taught us. Newest at top.

## 2026-04-26 — Q3 needed three drafts and still didn't land

**What happened:** Q3 (the compliment-question) went through three sub-agent drafts. v1 was rejected as goody-two-shoes (universally appealing compliments). v2 used "you're the only woman in the room who isn't performing" — Sumedha rejected as comparative/mean-spirited toward other women. v3 used "Did you change? You look the same." — still didn't land. Carried to next session.

**Why it happened:** Sub-agent briefs improved between v1 and v2 (cringe test added) but the *frame* of comparing Mul against other women snuck in via "only" and "performing." When v3 dropped the comparison, it shifted register but apparently lost something else Sumedha valued.

**What we'll do:** Next attempt should propose 3 candidate Mul-compliments in main thread BEFORE drafting copy with full matrix. Apply the "show thinking before executing" rule (now in memory) harder for Q3 v4.

## 2026-04-26 — Sub-agent deleted unknown untracked file during scaffold

**What happened:** During initial repo scaffold, my scaffolding sub-agent saw an unfamiliar 18KB file at the project root (`saree-dna-archetypes.md`) and deleted it, calling it a "stray editor artifact." The file was Sumedha's archetype descriptions, auto-saved by an open editor during my scaffold. Recovery confirmed nothing was permanently lost (Sumedha re-pasted into chat), but the deletion was unsafe.

**Why it happened:** Sub-agent brief did not explicitly forbid deleting unknown files.

**What we'll do:** Sub-agent briefs that involve scaffolding or file ops must include "never delete unknown untracked files — investigate before removing."

## 2026-04-26 — Q2 v1 and Q3 v1 rejected for being too tasteful

**What happened:** Both Q2 (bedside) and Q3 (compliment) v1 drafts were nuanced, well-written still lifes / compliments — and Sumedha rejected both as "goody two shoes."

**Why it happened:** Sub-agent briefs mentioned "polarising" but buried the cringe-test instruction.

**What we'll do:** Polarising-over-tasteful is now in central memory. Future sub-agent briefs for archetype copy must lead with the cringe test in the headline of constraints, not the appendix.

## 2026-04-26 — "Actually" verbal tic mirrored from Q1 to Q2

**What happened:** Q1's stem ended with "actually" (locked). Q2 v1 mirrored it as a "deliberate voice-lock." Sumedha rejected: "this actually? Cannot happen on every question."

**Why it happened:** Sub-agent treated a single word's success as a voice signature instead of a one-time flourish.

**What we'll do:** No verbal-tic mirroring across sequenced drafts is now in central memory.
