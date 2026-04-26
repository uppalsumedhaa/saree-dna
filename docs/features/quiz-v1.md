# Quiz v1 — Scoping doc

**Status:** Q1 + Q2 locked. Q3 NOT LOCKED — three drafts attempted, still not landing. Q4 has a fresh warmth-redraft pending review. Q5–Q8 not yet drafted.

## Product summary

A standalone 7–8 question personality quiz. The taker answers, gets one of nine saree archetypes (weave-anchored), sees a result page she'd want to screenshot, shares it.

Hero copy: **Your saree DNA. Every woman has a saree archetype. What's yours?**

## Audience

Indian women (and the diaspora) who own at least one saree, have an emotional relationship to the form, and would screenshot a personality result.

## In scope (v1)

- 7–8 question quiz, image-pickable, mobile-first
- 9 archetype result pages
- Pre-composed share card (1080×1920) per archetype
- "Retake" CTA on every result page

## Out of scope (v1)

- Email capture, login, accounts
- Commerce, curation, any product hook beyond result page
- AI inference (deterministic only)
- Backend (no Convex, no DB)

## Research findings (BuzzFeed-style quiz design)

Synthesised from BuzzFeed quiz-team interviews, Nieman Lab, Typeform research, Interact, 16Personalities, Stitch Fix, etc.

- Quizzes outshare articles ~3:1 — identity content people post as self-brand.
- "No haters" rule. Every result must be desirable. ~75% of shared results contain positive trigger words.
- Barnum effect: vague-but-flattering descriptions that feel personal. Astrology-grade specificity is enough.
- **Write results first, then reverse-engineer questions** — done; archetypes locked.
- Indirect questions outperform direct.
- 4 answer options is the sweet spot (2x2 mobile grid).
- 7–8 questions is the upper edge of the sweet spot. Each Q past 6 costs completion.
- Image-pickable + auto-advance lifts completion ~120%.
- Progress bar: thin top, step counter ("3 of 8").
- 5–7 archetypes is the optimal band; we're at 9 (weave-anchoring is the moat).
- Weighted-bucket scoring (BuzzFeed model).
- Result page IS the product — name + tagline + hero visual + 120–200 word "you are" + "you are not" contrast + anchor reference + share CTA.
- Pre-composed share card server-generated (1080×1920).
- One Q per screen, tap-to-answer auto-advance, theatrical reveal ("Reading your weave…").

## Architecture

- 8-Q max, image-pickable, one Q per screen, tap-to-answer auto-advance.
- Weighted-bucket scoring: 3 = primary, 2 = shadow, 1 = tertiary, 0 = irrelevant.
- Tiebreaker: surface primary + shadow archetype rather than forcing a winner.
- Reveal: 2–3s loading state ("Reading your weave…") before result.

## Voice rules (mandatory)

- Observational, slightly dry, occasionally funny.
- **Never aspirational.** Generic warmth is the enemy.
- Specific over general. India-rooted detail (weave names, regional drape, occasion contexts) is the moat.
- Friend-not-brand register.
- **Polarising over tasteful** — every option must pass the cringe test ("who would actively NOT pick this?").
- **No verbal-tic mirroring** across questions.

## The 9 archetypes

Locked. See `docs/saree-dna-archetypes.md`.

1. The Kanjeevaram Heir — lineage, decorum, restraint
2. The Organza Romantic — beauty, sincerity, slowness
3. The Chanderi Wanderer — freedom, lightness, curiosity
4. The Bandhani Maximalist — expression, joy, presence
5. The Tussar Intellectual — provenance, craft, scholarship
6. The Ajrakh Folklorist — heritage, craft preservation, story
7. The Mul Unrehearsed — ease, presence, integrity
8. The Banarasi Occasionalist — practicality, planning, polish
9. The Linen Modernist — clarity, discipline, function

---

## Q1 — LOCKED

**Question:** *It's Sunday morning. Where are you, actually?*

| | Option | Visual cue |
|---|---|---|
| A | Out walking before the city is up | Empty residential lane at dawn, soft grey light, woman alone, **athletic-leaning** (sneakers, water bottle, hair pulled back). |
| B | At the table, filter coffee, someone talking | Brass tumbler on wood, folded newspaper, second cup across, suggestion of a relative mid-sentence. |
| C | Already moving — bag by the door | Packed carry-on, espresso half-drunk, laptop open to a boarding pass. Functional light. |
| D | In bed past nine, light through the curtain | Unmade linen bed, half-finished tea on the floor, slim book open face-down. No clock. |

**Scoring matrix:**

| Option | Heir | Rom | Wand | Max | Tuss | Folk | Mul | Occ | Mod |
|---|---|---|---|---|---|---|---|---|---|
| A | 1 | 0 | 1 | 0 | 2 | 1 | **3** | 0 | 1 |
| B | **3** | 0 | 0 | 1 | 1 | **2** | 1 | **2** | 0 |
| C | 0 | 0 | **3** | 0 | 0 | 0 | 0 | 1 | **3** |
| D | 0 | **3** | 0 | **2** | 1 | 1 | 0 | 0 | 0 |

**Locked decisions:**
- "actually" in the stem kept (lands the dry observational voice).
- "in bed past nine" in D kept (bold, on-tone).
- A's visual nudged athletic to absorb early-rise/run/gym posture. Fitness signal proper lands in Q5 or Q7.

---

## Q2 — LOCKED

**Question:** *Pick the bedside that's hers.*

| | Option | Visual cue (illustrator brief) |
|---|---|---|
| A | Uncapped lipstick. Mismatched earrings. Last night's water glass. | Dark walnut, warm low lamp, lipstick smear on wood, earring on a folded receipt, water glass with lipstick rim, bobby pin abandoned. Slightly sticky. *Maximalist primary.* |
| B | Three books open at once. Cold tea. A printout, margins full. | Pale north-facing morning light, hardback face-down, paperback with pencil in gutter, slim third on top, stapled printout with green-ink underline, cup of tea with film on top. *Tussar primary.* |
| C | Stacked silver rings. A clay cup. Agarbatti gone to ash. | Low wooden stool, indigo block-print runner, three oxidised silver rings stacked, terracotta cup, agarbatti holder with grey ash. Honey afternoon light. *Folklorist primary.* |
| D | Apple Watch on charge. Hand cream. One earring from Tuesday. | Glass-topped table, sharp overhead light, Apple Watch on puck, hand cream (drugstore-not-luxury), single gold stud, folded receipt, phone face-down. Functional. *Occasionalist primary.* |

**Scoring matrix:**

| Option | Heir | Rom | Wand | Max | Tuss | Folk | Mul | Occ | Mod |
|---|---|---|---|---|---|---|---|---|---|
| A | 0 | 1 | 0 | **3** | 0 | 0 | 0 | 1 | 0 |
| B | 1 | 2 | 1 | 0 | **3** | 2 | 1 | 0 | 1 |
| C | 2 | 1 | 1 | 1 | 1 | **3** | 2 | 0 | 0 |
| D | 0 | 0 | 2 | 0 | 0 | 0 | 0 | **3** | 2 |

**Cringe test:**
- A: Heir refuses (decorum), Tussar (intellectually empty), Mul (performative chaos).
- B: Maximalist (no colour), Occasionalist (hasn't finished one book), Modernist (cluttered).
- C: Modernist (decorative, ethnic-coded), Occasionalist (no agarbatti on a Tuesday), Maximalist (too quiet).
- D: Folklorist (mass-produced, soulless), Heir (drugstore cream), Tussar (the bedside of someone who doesn't read).

**Q2 v1 (REJECTED — kept for context):** Library book + glasses, single jhumka + phone charger, three silver rings + agarbatti, film camera + pressed flower. Sumedha: *"very romantic and goody two shoes... they all look like a single kind of person would give them a shot."*

---

## Q3 — NOT LOCKED (three drafts rejected)

**Question stem (provisionally accepted):** *The compliment you'd replay later. Which one?*

### Q3 v1 (REJECTED)

- A — "Your essay changed how I think about that."
- B — "You didn't even notice you were the best-dressed person there."
- C — "You wear your mother's taste like it's yours now."
- D — "Your light. The whole room shifted."

Sumedha: *"very mediocre options. Again something that anybody would like."*

### Q3 v2 (REJECTED — Option B specifically)

- A — "Your footnotes were tighter than the book."
- B — "You're the only woman in the room who isn't performing." ← Sumedha rejected the framing (too comparative / slightly mean-spirited toward other women).
- C — "You wear your grandmother's taste like you earned it."
- D — "You walked in and everyone else looked under-dressed."

### Q3 v3 (CURRENT — STILL NOT LANDING per Sumedha)

- A — "Your footnotes were tighter than the book."
- B — "Did you change? You look the same."
- C — "You wear your grandmother's taste like you earned it."
- D — "You walked in and everyone else looked under-dressed."

Sumedha at end of session: *"I still don't like Q3."* Specific reason not given. Carry to next session — propose 3 candidate frames in main thread before drafting matrix.

**Q3 v3 scoring matrix (the latest, for reference):**

| Option | Heir | Rom | Wand | Max | Tuss | Folk | Mul | Occ | Mod |
|---|---|---|---|---|---|---|---|---|---|
| A — Footnotes | 0 | 0 | 1 | 0 | **3** | 1 | 1 | 0 | 1 |
| B — Did you change? You look the same. | 0 | 0 | 2 | 0 | 1 | 1 | **3** | 0 | 2 |
| C — Grandmother's taste | **3** | 1 | 0 | 0 | 0 | **3** | 0 | 1 | 0 |
| D — Under-dressed | 1 | 2 | 0 | **3** | 0 | 0 | 0 | 2 | 0 |

**Q3's primary job:** split Tussar vs. Mul (they tied 5-5 after Q1+Q2). The matrix above does that — but Q3 hasn't satisfied Sumedha's voice taste yet. Next session: workshop the four compliments in main thread BEFORE writing copy + matrix.

---

## Q4 — FRESH WARMTH REDRAFT (pending review)

User direction: warmer, brick walls, coloured couches, lamps, warm-vs-cool light as splitter.

**Question stem (proposed):** *Pick the room that's hers.*

| | Option | Primary |
|---|---|---|
| A | Brick wall, mustard couch, three lamps on, Kochi carpet, books in piles. | Wanderer |
| B | Limewashed wall, cane daybed, one cool-white floor lamp, a brass bowl. | Modernist |
| C | Terracotta wall, plum velvet sofa, paintings to the ceiling, two table lamps glowing. | Maximalist |
| D | Whitewashed brick, indigo daybed, lit clay diya, loom in the corner, agarbatti. | Folklorist |

**Visual cues:**
- **A — Wanderer.** Exposed red-brick, slightly uneven mortar. Low mustard linen couch, broken-in. Kilim half-rolled. Three mismatched lamps lit (floor lamp, desk lamp on book stack, paper lantern). Warm honey light ~2700K. Books in three languages stacked horizontally on the floor. Filter coffee. Domestic, transitional, alive.
- **B — Modernist.** Single limewashed white wall. Cane-and-teak daybed (Pierre Jeanneret-coded, but warmer wood). One arc floor lamp casting a clean cool-white pool (daylight temp). One terracotta hand-thrown bowl. No clutter. **Cool light is the only cool note**; materials (cane, teak, oat linen) are warm. Apple Store discipline meets craftsperson's hand.
- **C — Maximalist.** Terracotta wall (lifted from her profile). Deep plum velvet sofa, slightly sagging, three clashing-print throw cushions. Paintings hung salon-style to the ceiling. Two coloured-glass table lamps (amber, rose). Record player. Wine glass. Very warm light ~2400K. Lamps make it feel like 9pm at noon. Mid-conversation.
- **D — Folklorist.** Whitewashed brick, slightly chalky. Low indigo cotton daybed (charpai-coded). Single clay diya lit on brass tray. Floor lamp with handmade paper shade, warm yellow. Pit loom in corner with half-woven indigo thread. Agarbatti smoke catching lamplight. Honey-coloured. Smells like sandalwood.

**Scoring matrix:**

| Option | Heir | Rom | Wand | Max | Tuss | Folk | Mul | Occ | Mod |
|---|---|---|---|---|---|---|---|---|---|
| A — Brick + mustard couch + Kochi | 0 | 1 | **3** | 0 | 2 | 1 | 2 | 0 | 0 |
| B — Limewashed + cane daybed + cool lamp | 1 | 0 | 0 | 0 | 1 | 0 | 1 | 2 | **3** |
| C — Terracotta + plum velvet + paintings | 1 | 2 | 0 | **3** | 0 | 1 | 0 | 1 | 0 |
| D — Whitewashed brick + indigo daybed + loom | 2 | 1 | 1 | 1 | 1 | **3** | 1 | 0 | 0 |

**Cringe test:**
- A: Heir (books on the floor reads hostel), Modernist (three lamps = chaos), Occasionalist (you live in it, not photograph it).
- B: Maximalist (one bowl is grief), Folklorist (cool light is hostile to fabric), Romantic (kills skin tone at 4pm).
- C: Modernist (paintings to ceiling = moodboard), Mul (room asking to be looked at), Tussar (asks which is the actual painting and leaves).
- D: Occasionalist (loom isn't furniture), Modernist (agarbatti in curtains for a decade), Heir (charpai daybed = village-cosplay).

**Wanderer vs. Modernist split (Q4's primary job): RESOLVED.** Wanderer's path C-D-A-A: Wanderer 9, Modernist 6 (margin +3). Modernist's path C-D-B-B: Modernist 10, runners-up at 6 (margin +4). Q4 B gives Wanderer 0, Q4 A gives Modernist 0 — hard split holds.

**Q4 v1 (REJECTED — kept for context):** White walls + polished concrete + rope sculpture (Modernist), kettle + Kochi carpet + 3-language books (Wanderer), terracotta + paintings to ceiling + music permanently on (Maximalist), loom + indigo + brass + agarbatti (Folklorist). Sumedha: *"we need to work this better make it warmer like bricked walls or coloured couch or lamps or white light vs warm light."*

---

## Q5–Q8 — pending

**Q5 hard constraints:**
- Must split Romantic vs. Maximalist on volume (Romantic = intimate-warm, Maximalist = loud-warm). They tie on Romantic's natural path through Q4.
- Should give Occasionalist one more clear primary.
- Should land the gym/early-rise/discipline signal we deferred from Q1 (probably as Modernist's free-time signature: long runs).

**Q6/Q7/Q8 candidate themes:**
- A meal she'd cook for six friends (taste, hosting style)
- What plays in her car (sonic identity)
- An afternoon with no plans (default state — can carry the fitness signal)
- The last text she sent (rhythm, voice)

Q8 may be cut to 7 if the work is done by then.

---

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Vercel hosting
- No backend, no AI inference, no email/auth in v1

## Build phases (post-scoping)

1. P0 — Repo scaffold (done) + visual identity decisions
2. P1 — Quiz UI shell (one-Q-per-screen, progress bar, auto-advance, theatrical reveal)
3. P2 — Question/option data model + scoring matrix as data, not code
4. P3 — Result page anatomy per archetype
5. P4 — Share-card generator (1080×1920, server-generated)
6. P5 — Polish

## Open questions / known issues

- Q3 STILL not landing (three drafts rejected) — workshop in main thread before next draft
- Q4 redraft pending Sumedha's review
- Romantic vs. Maximalist tie at end of Q4 — Q5 must split
- No archetype-card visual language yet (visual identity work pending)
- Where do illustrations come from? (decision deferred)

## Decisions Sumedha locked this session

- 9 archetypes (named, profiled in `docs/saree-dna-archetypes.md`)
- No email gate
- Quiz is whole v1 (no curation funnel)
- Visual identity built fresh
- Convex out, Anthropic SDK out
- Tech: Next.js 14 + Tailwind + shadcn
- Q1 locked
- Q2 locked
- One question at a time, slow cadence
