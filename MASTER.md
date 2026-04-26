# Saree DNA — Master Doc

A quiz that returns your saree archetype. *Every woman has a saree archetype. What's yours?*

## Status

Pre-build. Scoping in progress. Q1–Q4 locked. Q5–Q8 pending. Q3 frame pivoted from misread to behavior. Q5 has hard constraints captured (split Romantic vs Maximalist on volume, give Occasionalist a primary, land the gym signal).

| Feature | Status | Doc |
|---|---|---|
| Quiz v1 (8-question archetype quiz) | Q1–Q4 locked, Q5–Q8 pending | [docs/features/quiz-v1.md](docs/features/quiz-v1.md) |
| Result page | Not started | TBD |
| Share-card generator | Not started | TBD |
| Visual identity | Not started — fresh from scratch | TBD |

## Archetypes (9, locked)

See `docs/saree-dna-archetypes.md` for full hand-written profiles by Sumedha.

1. The Kanjeevaram Heir
2. The Organza Romantic
3. The Chanderi Wanderer
4. The Bandhani Maximalist
5. The Tussar Intellectual
6. The Ajrakh Folklorist
7. The Mul Unrehearsed
8. The Banarasi Occasionalist
9. The Linen Modernist

## Decision log (reverse chronological)

### 2026-04-26

- **Project pivoted** from `sareesbysumedha` (Claude-driven intake flow, Convex-backed) to `saree-dna` (deterministic 8-question quiz). New repo, fresh docs. See `PIVOT.md`.
- **Tech stack locked:** Next.js 14 + Tailwind + shadcn/ui on Vercel. No Convex, no Anthropic SDK. Deterministic scoring.
- **Quiz is the whole v1.** Standalone — not a front door to curation/commerce.
- **No email gate.** Visual identity built fresh, no carryover.
- **9 archetypes locked** (weave-anchored). Above the 5–7 research sweet spot, but weaves are the moat.
- **Quiz architecture:** 8-question max, weighted-bucket scoring (BuzzFeed model), one-question-per-screen, image-pickable, polarising voice. Pre-composed share card.
- **Q1 LOCKED:** "It's Sunday morning. Where are you, actually?"
- **Q2 LOCKED:** "Pick the bedside that's hers." (after polarising redraft of v1)
- **Q3 LOCKED (v4, behavior frame):** "You're at a friend's housewarming. What's in your hand?" Frame pivoted from misread/compliment (v1–v3 all rejected) to behavior — mutually exclusive object choices. See `learnings.md`.
- **Q4 LOCKED (trimmed):** "Pick the room that's hers." Four rooms — red-brick + mustard couch (Wanderer), limewashed + cane daybed (Modernist), terracotta + plum velvet (Maximalist), whitewashed brick + indigo daybed + loom (Folklorist).
- **Three new standing rules captured to central memory:** polarising-over-tasteful for archetype copy; no verbal-tic mirroring across sequenced drafts; show thinking before executing on non-trivial work.
- **Meta-learning:** misread frames fail because misreads are universal across archetypes; behavior frames work because behavior is mutually exclusive by construction. Logged in `learnings.md`.
