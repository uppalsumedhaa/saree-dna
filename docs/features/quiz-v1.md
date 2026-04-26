# Quiz v1 — Scoping doc

**Status:** ALL 7 QUESTIONS LOCKED (Q1–Q7). Final quiz is 7 questions: Q1, Q2, Q3, Q4, Q5, Q6, Q7. There is no Q8. The previous Q7 (originally meal-for-six, then celebrity-question candidate) was cut; the text-message question, originally drafted as Q8, now occupies the Q7 slot.

## Product summary

A standalone 7-question personality quiz. The taker answers, gets one of nine saree archetypes (weave-anchored), sees a result page she'd want to screenshot, shares it.

Hero copy: **Your saree DNA. Every woman has a saree archetype. What's yours?**

## Audience

Indian women (and the diaspora) who own at least one saree, have an emotional relationship to the form, and would screenshot a personality result.

## In scope (v1)

- 7-question quiz, image-pickable, mobile-first
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
- Progress bar: thin top, step counter ("3 of 7").
- 5–7 archetypes is the optimal band; we're at 9 (weave-anchoring is the moat).
- Weighted-bucket scoring (BuzzFeed model).
- Result page IS the product — name + tagline + hero visual + 120–200 word "you are" + "you are not" contrast + anchor reference + share CTA.
- Pre-composed share card server-generated (1080×1920).
- One Q per screen, tap-to-answer auto-advance, theatrical reveal ("Reading your weave…").

## Architecture

- 7-Q total, image-pickable, one Q per screen, tap-to-answer auto-advance.
- Weighted-bucket scoring: 3 = primary, 2 = shadow, 1 = tertiary, 0 = irrelevant.
- Tiebreaker: surface primary + shadow archetype rather than forcing a winner.
- Reveal: 2–3s loading state ("Reading your weave…") before result.

## Voice rules (mandatory)

- Observational, slightly dry, occasionally funny.
- **Never aspirational.** Generic warmth is the enemy.
- Specific over general. India-rooted detail (weave names, regional drape, occasion contexts) is the moat.
- Friend-not-brand register.
- **Polarising over tasteful** — every option must pass the cringe test ("who would actively NOT pick this?"). Failed three times this session — Q2 v1, Q3 v1, Q3 v2.
- **No verbal-tic mirroring** across questions.

## Drafting constraints — quiz-specific

- **Final quiz is 7 questions** (Q1–Q7). There is no Q8.
- **Banned words for Q stems:**
  - "actual" / "actually" — claimed by Q1 ("It's Sunday morning. Where are you, actually?"). No other Q stem may echo it.
  - Watch for "honestly" and other verbal-tic adjacents — same family of dry-observational tic. One per draft set max.
- **Stem-construction watch:** the "You're + preposition + [setting]" frame appears in **Q3** ("You're at a friend's housewarming…") and **Q6** ("You're on a road trip…"). A third instance would tip from rhythm into formula — flag and reword on any new stem that lands on the same opener.
- **Cadence:** one question at a time. Do not batch-draft Q1–Q7 then reconcile. Lock each before moving on.
- Cross-stem verbal-tic check is required on every new Q draft against all locked stems.

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

## Q6 — LOCKED (v2 — road-trip music)

**Question:** *You're on a road trip. You're handling the music. What's playing?*

| | Option | Primary |
|---|---|---|
| A | Nooran Sisters live at Jashn-e-Rekhta. You've heard it forty times. You'll ruin the high note singing along anyway. | Folklorist |
| B | Begum Akhtar — the Hyderabad ghazal. Your grandmother used to hum it in the kitchen. You've had it on a loop since Tuesday. | Heir |
| C | *My Favorite Murder*. You're caught up on every season, you have opinions on Karen's editing choices, and you're listening at 1.5x. | Tussar |
| D | Diljit, "G.O.A.T." Windows down. Everyone in the car singing the chorus. You picked it. | Maximalist |

**What each option does:**
- **A — Folklorist.** Live recording (not studio), Sufi/folk register, devotional repetition (forty times), embodied participation (singing along badly). Heritage music as living practice, not performance.
- **B — Heir.** Inherited classical (Begum Akhtar ghazal), specific provenance (Hyderabad), grandmother lineage in the kitchen, current-week obsession (loop since Tuesday). Old-world taste held as personal not performed.
- **C — Tussar.** Podcast over music, deep completionist knowledge ("every season"), critical opinions on craft (Karen's editing), efficiency (1.5x). Brain at work even on the drive.
- **D — Maximalist.** Punjabi pop, windows down, group sing-along, owns the aux. Volume + chorus + everyone-in. She picked it and the car obeyed.

**Cringe test:**
- A: Modernist (forty repeats of one live track is a lot), Occasionalist (Jashn-e-Rekhta is not on her playlist), Maximalist (too sincere, not loud enough).
- B: Maximalist (where is the chorus), Modernist (kitchen sentiment isn't an aesthetic argument), Wanderer (too rooted in one grandmother's room).
- C: Romantic (a podcast on a road trip is a betrayal of the drive), Folklorist (no human voice, no rhythm), Heir (true crime is not what we do).
- D: Tussar (Punjabi pop at volume is not the listening she meant), Heir (decorum), Romantic (kills the moment).

**Scoring matrix:** TODO — wording is locked. Derive next session from primary mappings above plus secondary/tertiary spread.

---

## Q7 — LOCKED (was Q8 — text message)

**Question:** *Show me the last text she sent.*

| | Option | Primary |
|---|---|---|
| A | "ok" — replied in 30 seconds. | Modernist |
| B | A 4-minute voice note. 1am. To one person. | Romantic |
| C | "7 or 7:30? if 7:30 i'll grab the wine." | Occasionalist |
| D | "BABEEEE WAIT WAIT NO STOP 😭😭" — at 11am on a Tuesday. | Maximalist |

**Renumbering note:** Originally drafted as Q8 (text). Now occupies the Q7 slot because the previous Q7 (originally meal-for-six, then a celebrity-question candidate) was cut from plan. **Final quiz is 7 questions: Q1, Q2, Q3, Q4, Q5, Q6, Q7. There is no Q8.**

**What each option does:**
- **A — Modernist.** Two letters, sub-minute reply. Function over warmth, no padding, no emoji. Reads as efficiency, not coldness — she just doesn't perform texting.
- **B — Romantic.** Voice note over text. 4 minutes (long, but precisely-bounded — not a 22-minute monologue). 1am (tender hour, not chaos hour). To one person (intimate, not broadcast).
- **C — Occasionalist.** Logistics with timing precision (7 vs 7:30) and a contingent action (the wine). Plans the evening on the way to the evening. Lowercase — relaxed but executing.
- **D — Maximalist.** All-caps, no punctuation, escalating emoji, sent at a non-event hour (11am Tuesday — middle of the workday) which makes it land as pure expressive overflow rather than crisis. Volume as default state.

**Cringe test:**
- A: Romantic (chilling), Maximalist (corpse text), Folklorist (where is the warmth).
- B: Modernist (a four-minute audio file is a war crime), Occasionalist (just type the question), Heir (1am voice notes are not a thing we do).
- C: Maximalist (no exclamation marks), Romantic (too transactional), Mul (the half-hour does not matter).
- D: Modernist (please stop), Heir (decorum), Tussar (this is who I share an office with).

**Scoring matrix:** TODO — wording is locked. Derive next session from primary mappings above plus secondary/tertiary spread.

---

## Scoring matrix v1

**Model:** Each option awards **3 pts to its primary archetype** plus **1 pt each to 1–2 secondaries**. Secondaries are chosen to (a) feed under-served archetypes (Mul, Wanderer, Heir) and (b) deliberately *avoid* stacking spiritual-adjacent archetypes onto Folklorist primaries (the POC's worst auto-stack).

### Per-option breakdown

**Q1 — Sunday morning**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Walking before city up | Mul | Wanderer — early movement, in-transit posture | Modernist — discipline, early-rise |
| B — Filter coffee, someone talking | Heir | Folklorist — oral/rooted scene | Tussar — listening, attention to a speaker |
| C — Bag by door, boarding pass | Modernist | Wanderer — in transit | Occasionalist — packed, planned |
| D — Bed past nine, slim book | Romantic | Mul — no clock, easeful | Tussar — book in hand |

**Q2 — Bedside**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Lipstick, mismatched earrings | Maximalist | Romantic — sensory mess of a real night | Occasionalist — single earring from Tuesday |
| B — Three books, margins full | Tussar | Modernist — focused work | Mul — books as use, not décor |
| C — Silver rings, agarbatti, clay cup | Folklorist | Heir — silver as inheritance | Mul — clay cup, soft-worn, plain |
| D — Apple Watch, hand cream | Occasionalist | Modernist — function-first surface | Wanderer — earring-from-Tuesday in-and-out life |

**Q3 — Housewarming, in your hand**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Arundhati Roy book | Tussar | Modernist — intentional, brought-on-purpose | Heir — gift given with care |
| B — Steel dabba of besan ladoos | Heir | Folklorist — handed-down craft | Romantic — warm, tender gesture |
| C — Cold-pressed olive oil from Margao | Wanderer | Tussar — provenance/origin | Occasionalist — host-gift logic |
| D — Nothing, came from a long walk | Mul | Wanderer — the long walk itself | Romantic — drifted, lost time to light |

**Q4 — Her room**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Brick + mustard couch + lamps | Wanderer | Tussar — books on the floor | Mul — lived-in, not staged |
| B — Limewashed + cane daybed | Modernist | Mul — calm, unfussy materials | Occasionalist — clean lines, ordered |
| C — Terracotta + plum velvet + paintings | Maximalist | Romantic — velvet, warm light, wine glass | Heir — salon-hung paintings = inheritance wall |
| D — Whitewashed + indigo + loom + diya | Folklorist | Heir — indigo, brass, lineage | Mul — low daybed, whitewashed simplicity |

**Q5 — Friday night**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Pasta for two, same record | Romantic | Mul — phone face-down, no performance | Heir — ritual, repetition, home |
| B — Bandra rooftop, eight chairs | Maximalist | Wanderer — scene, neighbourhood-fluent | Occasionalist — six-top reservation |
| C — Reservation 3 weeks ahead | Occasionalist | Modernist — control of timing | Maximalist — group chat on her timeline |
| D — Bed by ten, run at dawn | Mul | Modernist — discipline | Tussar — four pages of the book |

**Q6 — Road-trip music**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Nooran Sisters live | Folklorist | Maximalist — singing along, volume, participation | Wanderer — Jashn-e-Rekhta live-circuit |
| B — Begum Akhtar ghazal | Heir | Romantic — on loop since Tuesday, tender | Folklorist — oral inheritance |
| C — *My Favorite Murder* podcast | Tussar | Modernist — 1.5x efficiency | Occasionalist — completionist scheduling |
| D — Diljit, windows down | Maximalist | Wanderer — road-trip energy, windows open | Folklorist — Punjabi roots, sing-along participation |

**Q7 — Last text**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — "ok" in 30 seconds | Modernist | Mul — no performance | Tussar — no padding, signal-only |
| B — 4-minute voice note, 1am | Romantic | Folklorist — voice over text, oral register | Maximalist — 4 minutes is a lot |
| C — "7 or 7:30? i'll grab the wine" | Occasionalist | Heir — bringing wine = host gesture | Wanderer — lowercase, on the move |
| D — "BABEEEE WAIT WAIT NO STOP" | Maximalist | Romantic — intimate one-on-one register | Folklorist — chorus-of-emotion, all-caps oral |

### Totals

**Primaries per archetype**
| Archetype | Primaries | Options |
|---|---|---|
| Mul | 3 | Q1A, Q3D, Q5D |
| Heir | 3 | Q1B, Q3B, Q6B |
| Wanderer | 2 | Q3C, Q4A |
| Maximalist | 5 | Q2A, Q4C, Q5B, Q6D, Q7D |
| Tussar | 3 | Q2B, Q3A, Q6C |
| Folklorist | 3 | Q2C, Q4D, Q6A |
| Occasionalist | 3 | Q2D, Q5C, Q7C |
| Modernist | 3 | Q1C, Q4B, Q7A |
| Romantic | 3 | Q1D, Q5A, Q7B |

**Secondaries per archetype**
| Archetype | Secondaries |
|---|---|
| Mul | 8 (Q1D, Q2B, Q2C, Q4A, Q4B, Q4D, Q5A, Q7A) |
| Heir | 6 (Q2C, Q3A, Q4C, Q4D, Q5A, Q7C) |
| Wanderer | 8 (Q1A, Q1C, Q2D, Q3D, Q5B, Q6A, Q6D, Q7C) |
| Maximalist | 3 (Q5C, Q6A, Q7B) |
| Tussar | 7 (Q1B, Q1D, Q2B, Q3C, Q4A, Q5D, Q7A) |
| Folklorist | 6 (Q1B, Q3B, Q6B, Q6D, Q7B, Q7D) |
| Occasionalist | 7 (Q1C, Q2A, Q2D, Q3C, Q4B, Q5B, Q6C) |
| Modernist | 7 (Q1A, Q2B, Q2D, Q3A, Q5C, Q5D, Q6C) |
| Romantic | 6 (Q2A, Q3B, Q3D, Q4C, Q6B, Q7D) |

**Max possible total (every primary AND every secondary fires — sanity check)**
| Archetype | 3×Primaries | + Secondaries | = Max |
|---|---|---|---|
| Mul | 9 | 8 | **17** |
| Heir | 9 | 6 | **15** |
| Wanderer | 6 | 8 | **14** |
| Maximalist | 15 | 3 | **18** |
| Tussar | 9 | 7 | **16** |
| Folklorist | 9 | 6 | **15** |
| Occasionalist | 9 | 7 | **16** |
| Modernist | 9 | 7 | **16** |
| Romantic | 9 | 6 | **15** |

**Sanity check:** 28 options × (3 primary + ~1.93 avg secondary) = 84 + 54 = 138 pts in the system. Spread is 14–18 — narrow band, no archetype can run away. The under-served (Mul, Wanderer, Heir) are now structurally competitive; Folklorist sits at 15 (mid-pack), not inflated; Maximalist tops the band only because it has 5 primaries (a locked-question structural fact), and it carries the **fewest** secondaries (3) to compensate.

### Tiebreak rule (v1.1 — four-level hierarchy)

**If two or more archetypes tie on total points, resolve in this order:**

1. **More PRIMARIES TRIGGERED** (more 3-pt hits) on the user's path wins.
2. **Higher Q3 score** wins.
3. **Higher Q6 score** wins.
4. **Alphabetical by archetype name** (deterministic final fallback).

**Why primary-count first:** A primary hit means the user picked the option *for* that archetype — strong signal of conviction. Secondary points are spillover from adjacent content. Two archetypes can tie because one had three primaries and zero secondaries while the other had one primary and six secondaries; the first is structurally a stronger result. Awarding to primary-count rewards conviction over adjacency.

**Why Q3 second:** The POC named Q3 the strongest single-question discriminator because Q3's options are mutually exclusive *by construction* (you can't bring a book AND nothing). Q3 is a great primary-splitter, so it earns the second slot. It can be brittle on its own (if both tied archetypes score 0 on Q3 it does nothing), which is why it sits behind primary-count and ahead of a further backstop.

**Why Q6 third (NEW):** A 6-persona stress test produced a 4-way tie at 5 points where the matrix collapsed even after the Q3 backstop. Across all 6 stress-test personas, **Q6 (road-trip music) split cleanly** — sonic identity is a strong, stable signal because Q6's four primaries each land on a *different* archetype (Folklorist, Heir, Tussar, Maximalist) and its secondaries spread across Wanderer, Romantic, Modernist, Occasionalist and Folklorist again. In other words, almost every archetype gets some signal from Q6, so the chance of two tied archetypes both scoring 0 on Q6 is much lower than for any other single question. Better backstop than alphabetical-only.

**Why alphabetical fourth (NEW):** If a tie survives all three signal-based rules, the path genuinely doesn't discriminate between those archetypes. Alphabetical-by-archetype-name is **deterministic** (same inputs always give the same answer, which matters for a quiz that should be re-runnable to the same result) and **explainable** ("we ran out of signal — here is the published tiebreak"). Avoids the worse alternatives: random (non-deterministic, kills shareability), or popularity-weighted (rewards already-overrepresented archetypes).

**Why not "highest secondary count" as the third level:** Considered and rejected. Secondaries are by design adjacency spillover, not conviction. Using secondary-count as a tiebreak amplifies the same noise we deprioritised at level 1, and it would systematically favour archetypes with the largest secondary footprint (Mul 8, Wanderer 8, Modernist 7, Occasionalist 7, Tussar 7) over the leaner ones (Maximalist 3, Romantic 6, Folklorist 6, Heir 6). Q6 is a cleaner signal than secondary-count and doesn't carry that structural bias.

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
- ~~Q3/Q5/Q6/Q7 scoring matrices TODO~~ RESOLVED — see "Scoring matrix v1" section above (3-pt primary + 1-pt secondaries × 1–2, plus tiebreak rule).
- Re-run POC personas (especially Tara — yoga teacher, expected Mul) against v1 matrix to confirm Mul stops tying with Folklorist/Romantic.
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
- Original Q7 cut from plan (was: meal-for-six); celebrity-question candidate also dropped
- Q7 locked (was Q8 — last text she sent); final quiz is 7 questions, no Q8
- Q6 locked (v2 — road-trip music, sonic identity)
- One question at a time, slow cadence
