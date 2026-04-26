# Learnings

Process failures and what they taught us. Newest at top.

## 2026-04-26 — Q8 needed a Maximalist primary (Anjali persona)

**What:** Stress test v2 against the Anjali persona (a clear Maximalist — loud table, room-finds-her, plan-is-people) found she won Maximalist by only +1 on the v1.2 matrix. With no Maximalist primary anywhere in Q8, she was forced onto Q8D (Occasionalist's printed itinerary), which is the opposite of her DNA — the matrix gave her a Heir secondary off Q8D when it should have given her a Max primary off a true Max-traveler option.

**Fix:** Swapped Q8C from Tussar primary ("twenty minutes in front of the Hammershoi at the Ordrupgaard") to Maximalist primary ("Bag dropped at the hotel, three texts out before she's unpacked. By sunset she's at the loudest table on a Mar Mikhael rooftop, two of the four strangers already in her phone."). Tussar drops from 4 to 3 primaries (in line with five other archetypes); Maximalist climbs from 5 to 6 primaries (acceptable — it's the most face-forward archetype and carries the smallest secondary footprint by design). Bumped matrix to v1.3. Ceilings widen from 16–19 to 16–21 (Maximalist now leads at 21).

**Lesson:** Traveler-archetype questions (or any question that splits on a single behavioral domain — here, "what does she do in a new city") can't omit the room-finds-me / city-finds-her energy. The Maximalist's signature behavior in transit isn't "what she goes to see" — it's "who she gathers" — and v1.2's Q8 had no option for that, so a clear Maximalist's Q8 vote landed on the wrong archetype's secondary instead. Future question audits should ask, for each archetype, "what would she actually do here?" before locking — not just "is this archetype represented in the option set?" Representation isn't enough; the option must be the archetype's TRUE primary behavior in that scenario.

## 2026-04-26 — Q5 had a household-led-woman gap (Lakshmi persona)

**What:** After locking all 7 questions and matrix v1.1, a stress test against the Lakshmi persona (a woman whose Friday night is feeding family at home with no fanfare — rooted ritual + warmth-of-care) surfaced that no Q5 option carried a rooted-domestic-Heir primary. The matrix had four Mul primaries that were over-indexing on solo-quiet patterns (walks, books, alarms) and was structurally blind to the household-led woman.

**Fix:** Rewrote Q5D from "in bed by ten, alarm set, Saturday's run starts early" (Mul) to "pulao on the stove, sister's four-year-old in the chair next to hers, dinner that doesn't need announcing" (Heir). To preserve Mul's primary count, added Q8 ("First afternoon in a new city. Where is she?") with primaries Wanderer/Mul/Tussar/Occasionalist — so Mul keeps three primaries via Q8B and Wanderer gains a needed third primary via Q8A. Bumped matrix to v1.2; ceilings tightened to 16–19 (from 14–18 in v1.1).

**Lesson:** Stress-test with diverse personas BEFORE locking the matrix — the matrix is only as good as the personas it was tested against. The v1.1 stress-test set was six personas but skewed toward solo / observer / curator types; a single household-led woman would have caught the Q5 gap before lock. Build the persona set deliberately for coverage on the dimensions the archetypes are supposed to discriminate (here: solo vs. household-led, planned vs. improvised, intimate vs. public).

## 2026-04-26 — Banned word "actual"/"actually" in Q stems

**What:** "Actual"/"actually" is claimed by Q1 ("It's Sunday morning. Where are you, actually?"). User enforced the ban mid-Q5 draft when a sub-agent reused it. Cross-stem verbal-tic check is required on every draft — not just within a single sub-agent's output, but across the locked stems already in the doc.

## 2026-04-26 — Misread frame fails because misreads are universal

**What:** Three drafts of Q3 using a "what people get wrong about you" / compliment frame failed cringe-test because the misreads ("too much," "cold," "intimidating," "low-effort") overlap across archetypes. Every woman has been called these things. The frame collapsed because self-perception isn't mutually exclusive.

**Lesson:** For tiebreaking close archetypes, prefer BEHAVIOR frames over SELF-PERCEPTION frames. Behavior is mutually exclusive by construction (you can't bring a book AND nothing); self-perception isn't (every archetype could be misread the same way).

**Applied:** Q3 v4 pivoted to behavior — "what's in your hand at a housewarming" — locked first try with mutually exclusive object choices (book / dabba of ladoos / olive oil / nothing).

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
