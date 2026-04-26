# Pivot — sareesbysumedha → saree-dna

Locked 2026-04-26. This file is a record, not a working doc — do not edit.

## What we walked away from

`sareesbysumedha` (at `/Users/sumedhauppal/sareesbysumedha`, branch `feat/budget-target-band-and-diversity`, 7 commits unpushed, working tree clean). The product was a guided saree-discovery intake flow powered by Claude (Anthropic SDK with web_search/web_fetch tools) and backed by Convex. MVP infrastructure was in place — Next.js 14 App Router, Tailwind, shadcn, Vercel Blob, Zustand. Blocking item was an unwritten Convex schema.

The old repo is preserved as-is. Nothing was deleted; the branch sits with its 7 unpushed commits and we walked away.

## What we're building instead

`saree-dna` (at `/Users/sumedhauppal/Desktop/saree-dna`). A deterministic 8-question personality quiz returning one of nine saree archetypes. BuzzFeed-style weighted-bucket scoring. Mobile-first, image-pickable, polarising, observational voice. No backend, no AI inference, no email gate.

Brand line: *Your saree DNA. Every woman has a saree archetype. What's yours?*

## Why we pivoted

Sumedha's call. The intake flow was a tool; the quiz is a brand. A quiz is a piece of personal-identity content women want to broadcast — shareability built in. The intake flow was useful but inert.

## What carried over

- Brand: still under "Sarees by Sumedha" umbrella
- Stack knowledge: Next.js 14 + Tailwind + shadcn (we know it, we keep it)
- Hosting: Vercel
- Nothing else.

## What didn't carry over

- Convex (no backend in v1)
- Anthropic SDK (no AI inference; deterministic scoring)
- Vercel Blob (no image uploads in v1)
- Zustand (revisit later if state demands)
- Any code from the old repo
