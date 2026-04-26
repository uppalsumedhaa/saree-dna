// All 8 quiz questions. Archetype tags from questions.md are intentionally
// stripped here — they're for scoring, not display. Stem + option text only.

export type OptionId = "A" | "B" | "C" | "D";

export type QuizOption = {
  id: OptionId;
  text: string;
};

export type Question = {
  id: number;
  stem: string;
  options: QuizOption[];
};

export const TOTAL_QUESTIONS = 8;

export const questions: Question[] = [
  {
    id: 1,
    stem: "It's Sunday morning. Where are you, actually?",
    options: [
      { id: "A", text: "Out walking before the city is up." },
      { id: "B", text: "At the table, filter coffee, someone talking." },
      { id: "C", text: "Already moving — bag by the door." },
      { id: "D", text: "In bed past nine, light through the curtain." },
    ],
  },
  {
    id: 2,
    stem: "Pick the bedside that's hers.",
    options: [
      {
        id: "A",
        text: "Uncapped lipstick, mismatched earrings, last night's water glass.",
      },
      { id: "B", text: "Three books open at once, cold tea, margins full." },
      {
        id: "C",
        text: "Stacked silver rings, clay cup, agarbatti gone to ash.",
      },
      {
        id: "D",
        text: "Apple Watch on charge, hand cream, one earring from Tuesday.",
      },
    ],
  },
  {
    id: 3,
    stem: "You're at a friend's housewarming. What's in your hand?",
    options: [
      {
        id: "A",
        text: "A copy of Arundhati Roy's The Ministry of Utmost Happiness. It's been in your tote two weeks waiting for her.",
      },
      {
        id: "B",
        text: "A steel dabba of besan ladoos, still slightly warm. Your mother's recipe, which is now yours.",
      },
      {
        id: "C",
        text: "A bottle of cold-pressed olive oil from that place outside Margao. You were there last week.",
      },
      {
        id: "D",
        text: "Nothing. You came from a long walk and the river path took longer than you thought.",
      },
    ],
  },
  {
    id: 4,
    stem: "Pick the room that's hers.",
    options: [
      {
        id: "A",
        text: "Red-brick wall, low mustard linen couch, three mismatched lamps in honey light. Filter coffee going cold on stacked books.",
      },
      {
        id: "B",
        text: "Limewashed wall, cane-and-teak daybed under one cool arc lamp. Linen throw pushed aside, open notebook face-down.",
      },
      {
        id: "C",
        text: "Terracotta wall, plum velvet sofa, paintings salon-hung to the ceiling, coloured-glass lamps low and warm. Wine glass on the floor.",
      },
      {
        id: "D",
        text: "Whitewashed brick, low indigo daybed, clay diya lit beside a paper lamp. Half-woven loom in the corner, agarbatti and sandalwood.",
      },
    ],
  },
  {
    id: 5,
    stem: "It's Friday night. What's the plan?",
    options: [
      {
        id: "A",
        text: "Cooking pasta for two at home. Same person, same record, third Friday in a row. Phone face-down.",
      },
      {
        id: "B",
        text: "A six-top at the Bandra rooftop that turned into eight chairs by 10pm. Loud table. Most of the laughing is yours.",
      },
      {
        id: "C",
        text: "The reservation you made three weeks ago, in the dress you knew you'd wear when you booked it. Group chat moving on your timeline.",
      },
      {
        id: "D",
        text: "Pulao on the stove, steel plates already out, her sister's four-year-old in the chair next to hers. Dinner started when she sat down — nobody had to announce it.",
      },
    ],
  },
  {
    id: 6,
    stem: "You're on a road trip. You're handling the music. What's playing?",
    options: [
      {
        id: "A",
        text: "Nooran Sisters live at Jashn-e-Rekhta. You've heard it forty times. You'll ruin the high note singing along anyway.",
      },
      {
        id: "B",
        text: "Begum Akhtar — the Hyderabad ghazal. Your grandmother used to hum it in the kitchen. You've had it on a loop since Tuesday.",
      },
      {
        id: "C",
        text: "My Favorite Murder. You're caught up on every season, you have opinions on Karen's editing choices, and you're listening at 1.5x.",
      },
      {
        id: "D",
        text: "Diljit, \"G.O.A.T.\" Windows down. Everyone in the car singing the chorus. You picked it.",
      },
    ],
  },
  {
    id: 7,
    stem: "Show me the last text she sent.",
    options: [
      { id: "A", text: "\"ok\" — replied in 30 seconds." },
      { id: "B", text: "A 4-minute voice note. 1am. To one person." },
      { id: "C", text: "\"7 or 7:30? if 7:30 i'll grab the wine.\"" },
      { id: "D", text: "\"BABEEEE WAIT WAIT NO STOP\" — at 11am on a Tuesday." },
    ],
  },
  {
    id: 8,
    stem: "First afternoon in a new city. Where is she?",
    options: [
      {
        id: "A",
        text: "The natural-dye scarf-maker in a back lane in George Town. A friend in Chennai sent the pin last year.",
      },
      {
        id: "B",
        text: "Out the door, no maps. She'll figure out which way is the river.",
      },
      {
        id: "C",
        text: "Bag dropped at the hotel, three texts out before she's unpacked. By sunset she's at the loudest table on a Mar Mikhael rooftop, two of the four strangers already in her phone.",
      },
      {
        id: "D",
        text: "Itinerary printed. Lunch at Chote Nawab booked. Spa list from the concierge folded into the back.",
      },
    ],
  },
];

export function getQuestion(id: number): Question | undefined {
  return questions.find((q) => q.id === id);
}
