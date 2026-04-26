# Quiz v1 — Scoping doc

**Status:** Q1–Q5 LOCKED. Q7 cut from plan (was: meal-for-six). New Q7 candidate: celebrity question (in workshop). Q6 (music) and Q8 (text) mapped, drafters not yet spawned.

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

## Q3 — LOCKED (v4, behavior frame)

**Question:** *You're at a friend's housewarming. What's in your hand?*

| | Option | Primary |
|---|---|---|
| A | A copy of Arundhati Roy's *The Ministry of Utmost Happiness*. It's been in your tote two weeks waiting for her. | Tussar |
| B | A steel dabba of besan ladoos, still slightly warm. Your mother's recipe, which is now yours. | Heir |
| C | A bottle of cold-pressed olive oil from that place outside Margao. You were there last week. | Wanderer |
| D | Nothing. You came from a long walk and the river path took longer than you thought. | Mul |

**Q3's primary job:** split Tussar vs. Mul (tied 5-5 after Q1+Q2). The behavior frame ("what's in your hand") makes the split mutually exclusive by construction — you can't bring a book AND nothing.

**Scoring matrix:** TODO — wording is locked, but the v3 matrix doesn't map to v4's new options. Derive next session from primary mappings above plus secondary/tertiary spread.

**Frame pivot:** v1–v3 used a "what people get wrong about you" / compliment frame (self-perception). All three failed cringe-test because misreads ("too much," "cold," "intimidating," "low-effort") overlap across archetypes — every woman has been called these things. v4 pivots to behavior. See `learnings.md` for the meta-learning.

**Prior drafts (REJECTED — kept for context):**
- v1 (compliment): "Your essay changed how I think about that." / "You didn't even notice you were the best-dressed person there." / "You wear your mother's taste like it's yours now." / "Your light. The whole room shifted." — *"very mediocre options."*
- v2 (compliment): swapped in "You're the only woman in the room who isn't performing." — rejected as comparative/mean-spirited toward other women.
- v3 (compliment): swapped in "Did you change? You look the same." — *"I still don't like Q3."* Frame still wrong.

---

## Q4 — LOCKED (rooms, trimmed)

**Question:** *Pick the room that's hers.*

| | Option | Primary |
|---|---|---|
| A | Red-brick wall, low mustard linen couch, three mismatched lamps in honey light. Filter coffee going cold on stacked books. | Wanderer |
| B | Limewashed wall, cane-and-teak daybed under one cool arc lamp. Linen throw pushed aside, open notebook face-down. | Modernist |
| C | Terracotta wall, plum velvet sofa, paintings salon-hung to the ceiling, coloured-glass lamps low and warm. Wine glass on the floor. | Maximalist |
| D | Whitewashed brick, low indigo daybed, clay diya lit beside a paper lamp. Half-woven loom in the corner, agarbatti and sandalwood. | Folklorist |

**Visual cues (illustrator brief):**
- **A — Wanderer.** Exposed red-brick, slightly uneven mortar. Low mustard linen couch, broken-in. Kilim half-rolled. Three mismatched lamps lit (floor lamp, desk lamp on book stack, paper lantern). Warm honey light ~2700K. Books in three languages stacked horizontally on the floor. Filter coffee. Domestic, transitional, alive.
- **B — Modernist.** Single limewashed white wall. Cane-and-teak daybed (Pierre Jeanneret-coded, but warmer wood). One arc floor lamp casting a clean cool-white pool (daylight temp). Linen throw pushed aside, notebook face-down. No clutter. **Cool light is the only cool note**; materials (cane, teak, oat linen) are warm. Apple Store discipline meets craftsperson's hand.
- **C — Maximalist.** Terracotta wall (lifted from her profile). Deep plum velvet sofa, slightly sagging, three clashing-print throw cushions. Paintings hung salon-style to the ceiling. Two coloured-glass table lamps (amber, rose). Record player. Wine glass on the floor. Very warm light ~2400K. Lamps make it feel like 9pm at noon. Mid-conversation.
- **D — Folklorist.** Whitewashed brick, slightly chalky. Low indigo cotton daybed (charpai-coded). Single clay diya lit on brass tray beside a handmade paper lamp, warm yellow. Pit loom in corner with half-woven indigo thread. Agarbatti smoke catching lamplight. Honey-coloured. Smells like sandalwood.

**Scoring matrix:**

| Option | Heir | Rom | Wand | Max | Tuss | Folk | Mul | Occ | Mod |
|---|---|---|---|---|---|---|---|---|---|
| A — Brick + mustard couch + lamps | 0 | 1 | **3** | 0 | 2 | 1 | 2 | 0 | 0 |
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

## Q5 — LOCKED

**Question:** *It's Friday night. What's the plan?*

| | Option | Primary |
|---|---|---|
| A | Cooking pasta for two at home. Same person, same record, third Friday in a row. Phone face-down. | Romantic |
| B | A six-top at the Bandra rooftop that turned into eight chairs by 10pm. Loud table. Most of the laughing is yours. | Maximalist |
| C | The reservation you made three weeks ago, in the dress you knew you'd wear when you booked it. Group chat moving on your timeline. | Occasionalist |
| D | In bed by ten with water, alarm set, four pages of the book before you're out. Saturday's run starts early. | Mul |

**Constraints satisfied:**
- **Romantic vs. Maximalist split on volume:** A is intimate-warm (two, home, same record); B is loud-warm (eight chairs, loud table, laughing). Hard split.
- **Occasionalist primary:** C — planned three weeks ahead, dress chosen at booking, owns the group chat tempo.
- **Gym signal landed on Mul:** D carries the early-rise/discipline cue (in bed by ten, alarm set, Saturday's run starts early). Note: temporal fix from Sunday→Saturday so the run is the *next* morning, consistent with Friday-night frame.

**Scoring matrix:** TODO — wording is locked. Derive next session from primary mappings above plus secondary/tertiary spread.

---

## Q6–Q8 — pending

**Q6 (music) — mapped, drafter not yet spawned.** What plays in her car (sonic identity).

**Q7 — cut from plan.** Original "meal she'd cook for six friends" cut. **New Q7 candidate: celebrity question (in workshop).**

**Q8 (text) — mapped, drafter not yet spawned.** The last text she sent (rhythm, voice).

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

- ~~Romantic vs. Maximalist tie at end of Q4 — Q5 must split on volume~~ RESOLVED in Q5.
- ~~Occasionalist needs another primary — Q5 candidate~~ RESOLVED in Q5.
- ~~Gym/early-rise/discipline signal deferred from Q1 — Q5 candidate~~ RESOLVED in Q5 (landed on Mul, not Modernist).
- Q5 scoring matrix still TODO.
- Q7 (celebrity question) needs draft.
- Q6 (music) and Q8 (text) drafters not yet spawned.
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
- Q3 locked (v4, behavior frame)
- Q4 locked (rooms, trimmed)
- Q5 locked (Friday night plan; Sunday→Saturday temporal fix on D)
- Q7 cut from plan (was: meal-for-six); celebrity question now in workshop as new Q7
- One question at a time, slow cadence
