// All nine archetypes, copy verbatim from saree-dna-cards.md.
// Source of truth for the results pages. cardImage is null until the
// illustrated card asset for that archetype lands in /public/cards.

export type Archetype = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  weave: string;
  drape: string;
  palette: string;
  wornWellBy: string;
  cardImage: string | null;
};

// Order matches the locked numbering in saree-dna-cards.md (1..9).
// The order here is what drives the "01 / 09" indicator on each results page.
export const archetypes: Archetype[] = [
  {
    slug: "heir",
    name: "Kanjeevaram Heir",
    tagline: "She's a keeper.",
    description:
      "She has a jeweller, a tailor, and a cook she's been with longer than most marriages. She'll wear a saree her mother wore, and her mother's mother, and tell you about both. She trained in Bharatanatyam from the age of six and still goes back to her guru's house when she's in Chennai. She knows the Margazhi calendar by heart and won't miss the morning concerts at the Music Academy. She can tell real zari by the weight of it, and whose loom it came off, and when. She'll spot a power-loom Kanjeevaram across a room. Navaratri at her house is nine nights of kolu, three changes of saree, and a list of who's coming when.",
    weave:
      "Kanjeevaram silk with real zari. Pattu pet, wide kanchi-pet borders, traditional motifs. Bought from the same weaver family. Worn for the recital, the temple, the December concert, the niece's arangetram. A Mysore crepe in the cupboard for Saraswati puja, the gold subdued and the drape easier to sit through a long morning in. A Paithani for the Marathi side of the family, peacock pallu, brought out for the wedding she's known about for a year. One Patola, double-ikat from Patan, gifted at her own wedding and worn maybe four times since.",
    drape: "Nivi, sharp pleats, pallu pinned. Always with a temple jewellery set or polki.",
    palette: "Deep red. Ochre. Forest green. Old cream.",
    wornWellBy:
      "The woman whose home you visit and stay too long at. The one who feeds you before she asks how you are. The one running Navaratri at her house, nine nights, kolu in the corner.",
    cardImage: "/cards/heir.jpg",
  },
  {
    slug: "romantic",
    name: "Organza Romantic",
    tagline: "She takes her time.",
    description:
      "She'll be twenty minutes late because she stopped to look at the light. She'll write you a thank-you card after a dinner you didn't think mattered. She has one perfume, the same one for years, and a bottle of it on every continent she's been to. She'll read a paragraph three times if it's good. When she pays attention to you, you've never been more seen.",
    weave:
      "Hand-embroidered organza, often with floral or tikki work. Sometimes silk-organza, occasionally chanderi-organza.",
    drape: "Nivi, open pallu, fluid. No pin if she can help it.",
    palette: "Powder pink. Pearl. Ivory. Late-afternoon gold.",
    wornWellBy: "The friend who writes you letters. The one who notices what you didn't say.",
    cardImage: null,
  },
  {
    slug: "wanderer",
    name: "Chanderi Wanderer",
    tagline: "She lives out of a suitcase.",
    description:
      "She collects coasters, boarding passes, and the names of small hotels. Her duffel is always half-packed. She has a friend who'll meet her for dinner in five cities, two of them in Europe. She'll text you from an airport you didn't know she was at. When she stays, she stays only as long as the trip allows.",
    weave:
      "Chanderi or Maheshwari. Lightweight, low crush, packs into a tote. Often pure cotton, occasionally cotton-silk.",
    drape: "Coorgi or seedha pallu, depending on the city. Loose enough to walk in.",
    palette: "Sand. Stone. Ink-blue. Saffron.",
    wornWellBy: "The friend in transit. The one whose voice notes start with the city she's in.",
    cardImage: null,
  },
  {
    slug: "maximalist",
    name: "Bandhani Maximalist",
    tagline: "Always a little too much. Always exactly right.",
    description:
      "She'll show up to a coffee in a saree. She'll send four voice notes when one was the question. She'll find the person standing alone at a party and stay with them ten minutes longer than anyone else would. She'll text you the next day. She'll text you the day after that. She runs warmer than the rest of the room, on purpose.",
    weave:
      "Bandhani or leheriya. Tied and dyed, mostly from Bhuj or Jamnagar. A phulkari shawl thrown over a plain saree when the evening turns, all marigold and parrot-green threadwork, ten times louder than the saree under it.",
    drape: "Gujarati, front pallu. Enters before she does.",
    palette: "Hot pink. Marigold. Cobalt. Pomegranate.",
    wornWellBy: "The friend who saw you across the room. The one who made the night.",
    cardImage: null,
  },
  {
    slug: "tussar",
    name: "Tussar Intellectual",
    tagline: "She did the reading.",
    description:
      "She knows the weaver's village. She knows the year the co-op was founded and the woman who runs it. She'll quote a paper she read in 2019 and remember it correctly. She doesn't perform her opinions; she's just done the work to have them. She'd rather be at a small dinner than a launch, and she's not coming to the launch.",
    weave:
      "Tussar silk, ikat, or vegetable-dyed cotton. Bought direct, often Bhagalpur, Pochampally, or Chanderi. Sometimes a fine Jamdani from Phulia or Shantipur, the motifs floated in by hand, bought on a trip she meant to take for years.",
    drape: "Bengali, pallu pinned at the shoulder. Practical. Built for sitting and reading.",
    palette: "Walnut. Old gold. Off-black. Unbleached.",
    wornWellBy:
      "The friend you call before you write something. The one whose footnotes are better than your essay.",
    cardImage: null,
  },
  {
    slug: "folklorist",
    name: "Ajrakh Folklorist",
    tagline: "She listens.",
    description:
      "She'll come back from a trip with a song stuck in her head and a phone number for a weaver in Bhuj. She'll learn the chorus before she learns your name. She has a kohl pencil older than the relationship. She'll buy four bangles and three of them will be from the same person she bought from last year. She doesn't trust packaging. She trusts hands. She'd rather sit on a floor than at a table, and she usually does.",
    weave: "Ajrakh, mashru, or kala cotton. Block-printed or hand-stamped, mostly Kutch. Sometimes Sindh.",
    drape: "Gujarati, with a short jacket or waistcoat layered on top. Silver before gold, always.",
    palette: "Indigo. Madder red. Iron black. Unbleached cream.",
    wornWellBy: "The friend who knows the lyrics. The one who travels with intent.",
    cardImage: null,
  },
  {
    slug: "mul",
    name: "Mul Unrehearsed",
    tagline: "The pleats fall where they fall.",
    description:
      "She drapes it before the kettle boils and forgets she's wearing one by 10 a.m. Her rotation is five sarees, two of them her mother's, all of them soft from washing. The pleats are wherever they ended up, which is fine. She'll wear it to the market, to a friend's house, to her own birthday. She's never owned an iron she actually uses.",
    weave: "Mul mul cotton, soft handloom. Often Bengali in origin, sometimes Andhra.",
    drape: "Bengali, low pallu. No shoulder pin. Loose by intent.",
    palette: "Off-white. Indigo. Old brick. Soft black.",
    wornWellBy:
      "The friend who shows up. Careless with her clothes, careful with your heart. On a long walk. On any day, really.",
    cardImage: null,
  },
  {
    slug: "occasionalist",
    name: "Banarasi Occasionalist",
    tagline: "Three sarees, eight occasions, one airtight system.",
    description:
      "She's at the tailor the day before Diwali, every year, with the same panic, and somehow it always works out. She owns fewer blouses than sarees, and she rotates them with intent: the gold one goes with two, the black one stretches across three. None of them were impulse buys. Each one came from somewhere, a wedding, a trip, a grandmother. The rest of the year, she's in trousers.",
    weave:
      "Banarasi silk, with real or near-real zari. Often a wedding gift, sometimes a single big purchase, occasionally inherited.",
    drape: "Nivi, professionally pinned. She's not draping it solo and isn't pretending she is.",
    palette: "Coral. Old gold. Pistachio. Cream.",
    wornWellBy:
      "Most of your group chat. On Diwali. On the day before her sister's wedding. At her own engagement. On her farewell.",
    cardImage: "/cards/occasionalist.jpg",
  },
  {
    slug: "modernist",
    name: "Linen Modernist",
    tagline: "She runs the meeting.",
    description:
      "She wears a linen saree to a 9 a.m. and the clients adjust to her. She'll redirect a conversation in two sentences. She'll send the calendar invite before the call ends. She doesn't believe in a saree for occasions. She believes in a saree for Tuesdays. She's quietly rewriting what serious looks like, and nobody's asking her to slow down.",
    weave:
      "Linen or fine khadi. Often a contemporary piece, sometimes a co-op weave from Phulia or Bhagalpur. A Kerala kasavu in the rotation for Onam and the odd embassy lunch, white with the thin gold border, nothing else asked of it.",
    drape: "Nivi, half-pleat, structured. Holds its line through a stand-up.",
    palette: "Slate. Bone. Rust. Ink.",
    wornWellBy: "The woman the room turns to. The one whose name is on the deck.",
    cardImage: null,
  },
];

export const TOTAL_ARCHETYPES = archetypes.length;

export function getArchetype(slug: string): Archetype | undefined {
  return archetypes.find((a) => a.slug === slug);
}

// 1-indexed position in the canonical list. Drives the "01 / 09" header.
export function getArchetypeIndex(slug: string): number {
  const i = archetypes.findIndex((a) => a.slug === slug);
  return i === -1 ? 0 : i + 1;
}
