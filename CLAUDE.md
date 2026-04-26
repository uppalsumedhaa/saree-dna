# Claude instructions — saree-dna

## What this project is

A mobile-first personality quiz that returns a saree archetype. See `MASTER.md` for status and `PIVOT.md` for pivot history.

Quiz scope, structure, scoring, and per-question rules: see `docs/features/quiz-v1.md`.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Hosted on Vercel
- **No backend in v1** (no Convex, no DB)
- **No AI inference in v1** (no Anthropic SDK)

## Voice (mandatory for any copy work)

From Sumedha's own archetype document:

- Observational, slightly dry, occasionally funny.
- **Never aspirational.** Generic warmth is the enemy.
- Specific over general. India-rooted detail (weave names, regional drape, occasion contexts) is the moat.
- The voice should sound like a friend who knows her, not a brand.

## Three standing rules (cross-feature)

1. **Polarising over tasteful.** Each option in any persona/copy work must clearly belong to ONE kind of person; others should cringe at it. Apply the cringe test: "who would actively NOT pick this?" If no one cringes, the option's not doing work.

2. **No verbal-tic mirroring.** When drafting items in a sequence (questions, headlines, taglines), vary the rhythm. One signature flourish per draft set max. Cross-item verbal-tic check is required on every new draft against all locked items. Feature-specific banned-word lists live in the relevant scoping doc.

3. **Show thinking before executing.** For non-trivial draft, edit, or build work, walk Sumedha through the approach + trade-offs in main thread first. Get sign-off, THEN spawn the sub-agent.

## Workflow

- **Sub-agents for all work.** Main thread is for talk and decisions. Sub-agents handle drafts, edits, audits, file writes — even one-file lookups.
- Sumedha treats Claude as engineering manager. Plain English, no jargon.
- Per-feature cadence rules live in the relevant scoping doc.
