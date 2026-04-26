# Quiz v1 — Scoping doc

**Status:** ALL 8 QUESTIONS LOCKED (Q1–Q8). Final quiz is 8 questions: Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8. Scoring matrix v1.3. The previous Q7 (originally meal-for-six, then celebrity-question candidate) was cut; the text-message question (originally drafted as Q8) sits at Q7; a new Q8 ("first afternoon in a new city") was added in the v1.2 pass alongside a Q5D rewrite (Mul → Heir) to close a household-led-woman gap surfaced by the Lakshmi stress-test persona. **Q8C swapped Tussar → Maximalist in v1.3** to close a Maximalist-traveler gap surfaced by the Anjali stress-test persona (a clear Maximalist who, with no Max primary in Q8, was forced onto Q8D and won by only +1).

## Product summary

A standalone 8-question personality quiz. The taker answers, gets one of nine saree archetypes (weave-anchored), sees a result page she'd want to screenshot, shares it.

Hero copy: **Your saree DNA. Every woman has a saree archetype. What's yours?**

## Audience

Indian women (and the diaspora) who own at least one saree, have an emotional relationship to the form, and would screenshot a personality result.

## In scope (v1)

- 8-question quiz, image-pickable, mobile-first
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

- 8-Q total, image-pickable, one Q per screen, tap-to-answer auto-advance.
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

- **Final quiz is 8 questions** (Q1–Q8).
- **Banned words for Q stems:**
  - Watch for "honestly" and other verbal-tic adjacents — same family of dry-observational tic. One per draft set max.
  - em-dash (—) banned project-wide as of 2026-04-26 per Sumedha. Use commas, periods, or rephrase.
- **Stem-construction watch:** the "You're + preposition + [setting]" frame appears in **Q3** ("You're at a friend's housewarming…") and **Q6** ("You're on a road trip…"). A third instance would tip from rhythm into formula — flag and reword on any new stem that lands on the same opener.
- **Cadence:** one question at a time. Do not batch-draft Q1–Q8 then reconcile. Lock each before moving on.
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

**Question:** *Sunday morning. Where would we find you?*

| | Option | Visual cue |
|---|---|---|
| A | Out walking before the city is up | Empty residential lane at dawn, soft grey light, woman alone, **athletic-leaning** (sneakers, water bottle, hair pulled back). |
| B | At the table with your coffee | Brass tumbler on wood, folded newspaper, second cup across, suggestion of a relative mid-sentence. |
| C | Already moving. Bag by the door | Packed carry-on, espresso half-drunk, laptop open to a boarding pass. Functional light. |
| D | In bed past nine, light through the curtain | Unmade linen bed, half-finished tea on the floor, slim book open face-down. No clock. |

**Scoring matrix:**

| Option | Heir | Rom | Wand | Max | Tuss | Folk | Mul | Occ | Mod |
|---|---|---|---|---|---|---|---|---|---|
| A | 1 | 0 | 1 | 0 | 2 | 1 | **3** | 0 | 1 |
| B | **3** | 0 | 0 | 1 | 1 | **2** | 1 | **2** | 0 |
| C | 0 | 0 | **3** | 0 | 0 | 0 | 0 | 1 | **3** |
| D | 0 | **3** | 0 | **2** | 1 | 1 | 0 | 0 | 0 |

**Locked decisions:**
- "actually" dropped from the stem (em-dash/verbal-tic cleanup pass, 2026-04-26).
- B rewritten from "At the table, filter coffee, someone talking" → "At the table with your coffee" (same pass).
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

## Q5 — LOCKED (Q5D rewritten in v1.2 pass — Mul → Heir)

**Question:** *It's Friday night. What's the plan?*

| | Option | Primary |
|---|---|---|
| A | Cooking pasta for two at home. Same person, same record, third Friday in a row. Phone face-down. | Romantic |
| B | A six-top at the Bandra rooftop that turned into eight chairs by 10pm. Loud table. Most of the laughing is yours. | Maximalist |
| C | The reservation you made three weeks ago, in the dress you knew you'd wear when you booked it. Group chat moving on your timeline. | Occasionalist |
| D | Pulao on the stove, steel plates already out, her sister's four-year-old in the chair next to hers. Dinner started when she sat down. Nobody had to announce it. | Heir |

**Constraints satisfied:**
- **Romantic vs. Maximalist split on volume:** A is intimate-warm (two, home, same record); B is loud-warm (eight chairs, loud table, laughing). Hard split.
- **Occasionalist primary:** C — planned three weeks ahead, dress chosen at booking, owns the group chat tempo.
- **Heir primary on D (v1.2 rewrite):** D is rooted ritual + warmth-of-care — pulao on the stove, steel plates out, the sister's child in the next chair, dinner that doesn't need announcing. Closes the household-led-woman gap surfaced by the Lakshmi stress-test persona. The Mul primary that previously lived on D ("in bed by ten, alarm set, Saturday's run starts early") moves to Q8B in the v1.2 pass — Mul keeps three primaries, Heir gains a fourth.

**Scoring matrix:** see § Scoring matrix v1.2 — Q5D primary 3 to Heir, secondaries 1 each to Folklorist (rooted ritual) and Romantic (warmth-of-care).

---

## Q6 — LOCKED (v2 — road-trip music)

**Question:** *You're on a road trip. You're handling the music. What's playing?*

| | Option | Primary |
|---|---|---|
| A | Nooran Sisters live at Jashn-e-Rekhta. You've heard it forty times. You'll ruin the high note singing along anyway. | Folklorist |
| B | Begum Akhtar, the Hyderabad ghazal. Your grandmother used to hum it in the kitchen. You've had it on a loop since Tuesday. | Heir |
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

**Question:** *Show me the last text you sent.*

| | Option | Primary |
|---|---|---|
| A | "ok", replied in 30 seconds. | Modernist |
| B | A 4-minute voice note. 1am. To one person. | Romantic |
| C | "7 or 7:30? if 7:30 i'll grab the wine." | Occasionalist |
| D | "BABEEEE WAIT WAIT NO STOP 😭😭" at 11am on a Tuesday. | Maximalist |

**Renumbering note:** This question was originally drafted as Q8 (text-message). It moved to the Q7 slot when the previous Q7 (originally meal-for-six, then a celebrity-question candidate) was cut from plan. The Q8 slot was later refilled in the v1.2 pass with a *new* Q8 ("first afternoon in a new city") — see § Q8 below. **Final quiz is 8 questions: Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8.**

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

## Q8 — LOCKED (new — first afternoon in a new city, added in v1.2 pass)

**Question:** *First afternoon in a new city. Where are you?*

| | Option | Primary |
|---|---|---|
| A | The natural-dye scarf-maker in a back lane in George Town. A friend in Chennai sent the pin last year. | Wanderer |
| B | Out the door, no maps. You'll figure out which way is the river. | Mul |
| C | Bag dropped at the hotel, three texts out before you're unpacked. By sunset you're at the loudest table on a Mar Mikhael rooftop, two of the four strangers already in your phone. | Maximalist |
| D | Itinerary printed. Lunch at Chote Nawab booked. Spa list from the concierge folded into the back. | Occasionalist |

**Why Q8 was added (v1.2 pass):**
The Lakshmi stress-test persona surfaced two structural problems with v1.1:
1. **Household-led-woman gap.** Q5 had no rooted-domestic-Heir primary — the matrix couldn't catch a woman whose Friday-night plan is feeding family at home with no fanfare. Fix: Q5D rewritten Mul → Heir.
2. **Mul primary preservation.** Removing Mul from Q5D would have dropped Mul to two primaries (under the under-served floor of three set in v1.1). Fix: add Q8 with a Mul primary on B.

Q8's secondary job is to give Wanderer a third primary (it had only two in v1.1) and sharpen the curiosity-vs-planning split for the second half of the quiz.

**v1.3 swap (Q8C: Tussar → Maximalist):** The Anjali stress-test persona (a clear Maximalist) won Maximalist by only +1 on the v1.2 matrix because Q8 had no Max primary — she was forced onto Q8D (Occasionalist's printed itinerary), which is the opposite of her DNA. Replacing Q8C closes the gap. Tussar already carried four primaries (Q2B, Q3A, Q6C, Q8C), so dropping Q8C lands Tussar at three primaries (in line with Mul/Wanderer/Folklorist/Modernist/Romantic). Maximalist climbs to six primaries, which is acceptable given it's the most face-forward archetype in the set and its secondary footprint stays the smallest (3) by design.

**What each option does:**
- **A — Wanderer.** Specific craft destination (natural-dye scarf-maker), specific neighbourhood (George Town, Penang), warm-network sourcing (a friend in Chennai sent the pin last year). The trip's planned around a single, narrow, almost obscure thing — and the pin has been waiting a year for this trip.
- **B — Mul.** No maps, no plan, walking out the door. "She'll figure out which way is the river" lands the unrehearsed-curiosity register — orientation by walking, decision economy, no anxiety about not knowing yet.
- **C — Maximalist (v1.3).** Bag at the hotel, texts out before she's unpacked. The room finds her: by sunset she's at the loudest table on a Mar Mikhael rooftop (Beirut — gallerist/designer scene, not tourist Lisbon), with two of the four strangers already saved to her phone. Plan IS people, not place. The hotel is the base of operations, not the destination — Wanderer secondary holds for the new-city register; Occasionalist secondary holds for the hotel-as-system bit.
- **D — Occasionalist.** Printed itinerary, lunch booked (Chote Nawab, Mumbai), spa list from the concierge folded into the back of the printout. Planning-for-someone (the system makes the trip pleasurable, not anxious), executed without being uptight about it.

**Cringe test:**
- A: Modernist (too much hunting for a scarf), Occasionalist (no plan for the rest of the day), Heir (a back lane is not where we go).
- B: Occasionalist (no plan is not a plan), Tussar (you came all this way to wander), Heir (we know where we're going before we leave the hotel).
- C: Wanderer (Mar Mikhael rooftop is not where you go to find a city), Tussar (loudest table on a rooftop is the opposite of a holiday), Mul (three texts before unpacking is a project; the city is right there), Heir (we don't sit with strangers we met an hour ago), Occasionalist (no booking, no plan — one cancellation and she's stranded).
- D: Wanderer (a printed itinerary is a cage), Mul (the day was supposed to surprise her), Folklorist (the concierge is not the source).

**Stem check:** "First afternoon in a new city. Where are you?" — uses the second-person frame ("you") that's already established by Q1, Q3, Q5, Q6, Q7. (Pivoted from the original "Where is she?" third-person framing in a consistency pass; Q2 and Q4's "pick the X that's hers" frame is intentionally retained because the picker-stance there is structurally different.) No "actually," no "you're at/on" preposition-frame collision with Q3/Q6.

**Scoring matrix:** see § Scoring matrix v1.3.

---

## Scoring matrix v1.3

**Model:** Each option awards **3 pts to its primary archetype** plus **1 pt each to 1–2 secondaries**. Secondaries are chosen to (a) feed under-served archetypes (Mul, Wanderer, Heir) and (b) deliberately *avoid* stacking spiritual-adjacent archetypes onto Folklorist primaries (the POC's worst auto-stack).

### Per-option breakdown

**Q1 — Sunday morning**
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Walking before city up | Mul | Wanderer — early movement, in-transit posture | Modernist — discipline, early-rise |
| B — At the table with your coffee | Heir | Folklorist — oral/rooted scene | Tussar — listening, attention to a speaker |
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

**Q5 — Friday night** *(Q5D rewritten in v1.2 pass — Mul → Heir)*
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Pasta for two, same record | Romantic | Mul — phone face-down, no performance | Heir — ritual, repetition, home |
| B — Bandra rooftop, eight chairs | Maximalist | Wanderer — scene, neighbourhood-fluent | Occasionalist — six-top reservation |
| C — Reservation 3 weeks ahead | Occasionalist | Modernist — control of timing | Maximalist — group chat on her timeline |
| D — Pulao on the stove, niece in the next chair | Heir | Folklorist — rooted ritual, oral-domestic | Romantic — warmth-of-care, tenderness |

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

**Q8 — First afternoon in a new city** *(new in v1.2 pass; Q8C swapped Tussar → Maximalist in v1.3)*
| Opt | Primary (3) | Sec A (1) | Sec B (1) |
|---|---|---|---|
| A — Natural-dye scarf-maker, George Town | Wanderer | Tussar — research-trail, named-source | Folklorist — craft destination |
| B — Out the door, no maps | Mul | Wanderer — curiosity-by-walking | Modernist — decision economy |
| C — Bag at hotel, three texts, Mar Mikhael rooftop *(v1.3)* | Maximalist | Wanderer — still a new-city scene | Occasionalist — hotel as base of operations |
| D — Itinerary printed, lunch booked | Occasionalist | Heir — planning-for-someone, hosted register | Modernist — system, control of timing |

### Totals (v1.3)

**Primaries per archetype (v1.3 — 32 options across Q1–Q8)**
| Archetype | Primaries | Options |
|---|---|---|
| Mul | 3 | Q1A, Q3D, Q8B |
| Heir | 4 | Q1B, Q3B, Q5D, Q6B |
| Wanderer | 3 | Q3C, Q4A, Q8A |
| Maximalist | **6** | Q2A, Q4C, Q5B, Q6D, Q7D, **Q8C** |
| Tussar | **3** | Q2B, Q3A, Q6C |
| Folklorist | 3 | Q2C, Q4D, Q6A |
| Occasionalist | 4 | Q2D, Q5C, Q7C, Q8D |
| Modernist | 3 | Q1C, Q4B, Q7A |
| Romantic | 3 | Q1D, Q5A, Q7B |

**Secondaries per archetype (v1.3)**
| Archetype | Count | Options |
|---|---|---|
| Mul | 8 | Q1D, Q2B, Q2C, Q4A, Q4B, Q4D, Q5A, Q7A |
| Heir | 7 | Q2C, Q3A, Q4C, Q4D, Q5A, Q7C, Q8D |
| Wanderer | 10 | Q1A, Q1C, Q2D, Q3D, Q5B, Q6A, Q6D, Q7C, Q8B, Q8C |
| Maximalist | 3 | Q5C, Q6A, Q7B |
| Tussar | 7 | Q1B, Q1D, Q2B, Q3C, Q4A, Q7A, Q8A |
| Folklorist | 8 | Q1B, Q3B, Q5D, Q6B, Q6D, Q7B, Q7D, Q8A |
| Occasionalist | **8** | Q1C, Q2A, Q2D, Q3C, Q4B, Q5B, Q6C, **Q8C** |
| Modernist | **8** | Q1A, Q2B, Q2D, Q3A, Q5C, Q6C, Q8B, Q8D |
| Romantic | 7 | Q2A, Q3B, Q3D, Q4C, Q5D, Q6B, Q7D |

**Max possible total (every primary AND every secondary fires — sanity check, v1.3)**
| Archetype | 3×Primaries | + Secondaries | = Max ceiling |
|---|---|---|---|
| Maximalist | **18** | 3 | **21** |
| Occasionalist | 12 | 8 | **20** |
| Heir | 12 | 7 | **19** |
| Wanderer | 9 | 10 | **19** |
| Mul | 9 | 8 | **17** |
| Folklorist | 9 | 8 | **17** |
| Modernist | 9 | 8 | **17** |
| Tussar | 9 | 7 | **16** |
| Romantic | 9 | 7 | **16** |

**Sanity check (v1.3):** 32 options × (3 primary + ~2.06 avg secondary) = 96 + 66 = **162 pts** in the system (the v1.2 doc's "158" rounded the secondary-average down; 66 secondaries is the actual count both before and after the swap, so this is an arithmetic correction — no points entered or left the system in the swap). Spread is **16–21** — wider than v1.2 (16–19) because Maximalist now leads the ceiling table at 21. Maximalist's ceiling jump is intentional: it's the most face-forward archetype in the set and is structurally the smallest secondary-gainer (3 secondaries by design), so a higher primary count is the right knob to turn for it. Tussar drops from a 19-ceiling tie to 16 (joint with Romantic), still well-served by three primaries and seven secondaries. The under-served floor (Mul, Folklorist, Modernist) sits at 17 — flat to v1.2.

**v1.3 vs v1.2 deltas (one-question swap, Q8C only):**
- Maximalist: 18 → **21** (+3) — gained Q8C primary (was nothing in Q8 before).
- Tussar: 19 → **16** (−3) — lost Q8C primary.
- Occasionalist: 19 → **20** (+1) — gained Q8C secondary.
- Modernist: 18 → **17** (−1) — lost Q8C secondary.
- All others: unchanged.

**Why this swap is structurally healthy:**
- The Anjali stress-test path (a Maximalist who chose Q1D + Q2A + Q3 secondary + Q4C + Q5B + Q6D + Q7D) was winning Maximalist by only +1 because Q8 forced her onto Q8D (Occasionalist). With Q8C now Max-primary, the Maximalist path through Q8 is direct (+3 instead of +1 for Q8D's secondary on Heir), restoring conviction-margin to the result.
- Tussar at three primaries is in line with five other archetypes (Mul, Wanderer, Folklorist, Modernist, Romantic) — no archetype is starved.
- Maximalist's 21 ceiling is the highest, but only triggerable on a path that picks the Max primary in all six questions (Q2A, Q4C, Q5B, Q6D, Q7D, Q8C) — a Maximalist conviction-path. Mixed-archetype paths can't accidentally tip Max.

**Pending stress test v3:** Re-run the existing six personas + Anjali against v1.3 to confirm no new collisions.

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
- ~~Q3/Q5/Q6/Q7 scoring matrices TODO~~ RESOLVED — see "Scoring matrix v1.2" section above (3-pt primary + 1-pt secondaries × 1–2, plus tiebreak rule).
- ~~Household-led-woman gap (Lakshmi persona)~~ RESOLVED in v1.2 pass — Q5D rewritten Mul → Heir; Q8 added with Mul primary preserved on B.
- ~~Maximalist-traveler gap (Anjali persona) — Q8 had no Max primary; Anjali was forced onto Q8D and won by only +1~~ RESOLVED in v1.3 pass — Q8C swapped Tussar → Maximalist.
- Re-run POC personas (Tara/Lakshmi/Anjali and the v1.1 stress-test six) against the v1.3 matrix — **stress test v3 pending**.
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
- Q5 locked (Friday night plan; Sunday→Saturday temporal fix on D — and in the v1.2 pass, D rewritten Mul → Heir to close the household-led-woman gap surfaced by the Lakshmi stress-test persona)
- Original Q7 cut from plan (was: meal-for-six); celebrity-question candidate also dropped
- Q7 locked (was the original Q8 draft — last text she sent)
- Q6 locked (v2 — road-trip music, sonic identity)
- Q8 locked (NEW — first afternoon in a new city; added in v1.2 pass to preserve Mul primary count after Q5D rewrite and to give Wanderer a third primary)
- Scoring matrix bumped to v1.2 (32 options across Q1–Q8; ceilings 16–19; tiebreak hierarchy unchanged from v1.1)
- Q8C swapped Tussar → Maximalist; matrix bumped to v1.3 (ceilings 16–21; tiebreak hierarchy unchanged). Closes Maximalist-traveler gap surfaced by the Anjali stress-test persona.
- One question at a time, slow cadence
