# Saree DNA — Master Doc

A quiz that returns your saree archetype. *Every woman has a saree archetype. What's yours?*

## Status

Pre-build. Scoping in progress. Q1–Q5 + Q7 locked. Q6 (road-trip music) in v2 redraft (parallel sub-agent currently drafting). Quiz total: 7 questions. (Original Q7 cut; the text-message question, originally drafted as Q8, now occupies the Q7 slot. There is no Q8.)

| Feature | Status | Doc |
|---|---|---|
| Quiz v1 (7-question archetype quiz) | Q1–Q5 + Q7 locked; Q6 in v2 redraft | [docs/features/quiz-v1.md](docs/features/quiz-v1.md) |
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

- **Q7 LOCKED (was Q8 — text message):** "Show me the last text she sent." Four options split on rhythm/voice: A "ok" replied in 30 seconds (Modernist), B 4-minute voice note at 1am to one person (Romantic), C "7 or 7:30? if 7:30 i'll grab the wine" (Occasionalist), D "BABEEEE WAIT WAIT NO STOP 😭😭" at 11am on a Tuesday (Maximalist). Renumbered from Q8 to Q7 because the previous Q7 (celebrity question) was cut from plan. **Final quiz is 7 questions: Q1, Q2, Q3, Q4, Q5, Q6, Q7. There is no Q8.**
- **Q5 LOCKED:** "It's Friday night. What's the plan?" Satisfies all three captured constraints — Romantic/Maximalist split on volume (A intimate-warm vs B loud-warm), Occasionalist gets a primary on C (the booked-three-weeks-ago reservation), gym signal landed on Mul on D (in bed by ten, Saturday's run starts early). Sunday→Saturday temporal fix applied to D so the run is the next morning.
- **Original Q7 cut from plan.** "Meal she'd cook for six friends" cut. Celebrity-question candidate also dropped. The text-message question (originally Q8) takes the Q7 slot.
- **Q6 (road-trip music) in v2 redraft.** Parallel sub-agent currently drafting.
- **New rule captured to CLAUDE.md:** banned-word "actual"/"actually" in Q stems (claimed by Q1). Cross-stem verbal-tic check is required on every draft.
- **Project pivoted** from `sareesbysumedha` (Claude-driven intake flow, Convex-backed) to `saree-dna` (deterministic 8-question quiz). New repo, fresh docs. See `PIVOT.md`.
- **Tech stack locked:** Next.js 14 + Tailwind + shadcn/ui on Vercel. No Convex, no Anthropic SDK. Deterministic scoring.
- **Quiz is the whole v1.** Standalone — not a front door to curation/commerce.
- **No email gate.** Visual identity built fresh, no carryover.
- **9 archetypes locked** (weave-anchored). Above the 5–7 research sweet spot, but weaves are the moat.
- **Quiz architecture:** originally scoped 8-question max; final landed at 7 questions. Weighted-bucket scoring (BuzzFeed model), one-question-per-screen, image-pickable, polarising voice. Pre-composed share card.
- **Q1 LOCKED:** "It's Sunday morning. Where are you, actually?"
- **Q2 LOCKED:** "Pick the bedside that's hers." (after polarising redraft of v1)
- **Q3 LOCKED (v4, behavior frame):** "You're at a friend's housewarming. What's in your hand?" Frame pivoted from misread/compliment (v1–v3 all rejected) to behavior — mutually exclusive object choices. See `learnings.md`.
- **Q4 LOCKED (trimmed):** "Pick the room that's hers." Four rooms — red-brick + mustard couch (Wanderer), limewashed + cane daybed (Modernist), terracotta + plum velvet (Maximalist), whitewashed brick + indigo daybed + loom (Folklorist).
- **Three new standing rules captured to central memory:** polarising-over-tasteful for archetype copy; no verbal-tic mirroring across sequenced drafts; show thinking before executing on non-trivial work.
- **Meta-learning:** misread frames fail because misreads are universal across archetypes; behavior frames work because behavior is mutually exclusive by construction. Logged in `learnings.md`.
