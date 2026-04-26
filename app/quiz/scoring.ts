// Scoring matrix v1.3 — ported verbatim from docs/features/quiz-v1.md.
// 32 options across Q1–Q8. Each option awards 3 pts to its primary archetype
// plus 1 pt each to 1–2 secondaries. Tiebreak hierarchy (v1.1, four-level):
//   1. More PRIMARIES TRIGGERED on the user's path wins.
//   2. Higher Q3 score wins.
//   3. Higher Q6 score wins.
//   4. Alphabetical by archetype name (deterministic final fallback).

export type Slug =
  | "heir"
  | "romantic"
  | "wanderer"
  | "maximalist"
  | "tussar"
  | "folklorist"
  | "mul"
  | "occasionalist"
  | "modernist";

export type OptionId = "A" | "B" | "C" | "D";

export type Pick = { questionId: number; optionId: OptionId };

type ScoreEntry = { primary: Slug; secondaries: Slug[] };

// Key format: '<questionId><optionId>' e.g. '1A', '8D'.
export const MATRIX: Record<string, ScoreEntry> = {
  "1A": { primary: "mul", secondaries: ["wanderer", "modernist"] },
  "1B": { primary: "heir", secondaries: ["folklorist", "tussar"] },
  "1C": { primary: "modernist", secondaries: ["wanderer", "occasionalist"] },
  "1D": { primary: "romantic", secondaries: ["mul", "tussar"] },
  "2A": { primary: "maximalist", secondaries: ["romantic", "occasionalist"] },
  "2B": { primary: "tussar", secondaries: ["modernist", "mul"] },
  "2C": { primary: "folklorist", secondaries: ["heir", "mul"] },
  "2D": { primary: "occasionalist", secondaries: ["modernist", "wanderer"] },
  "3A": { primary: "tussar", secondaries: ["modernist", "heir"] },
  "3B": { primary: "heir", secondaries: ["folklorist", "romantic"] },
  "3C": { primary: "wanderer", secondaries: ["tussar", "occasionalist"] },
  "3D": { primary: "mul", secondaries: ["wanderer", "romantic"] },
  "4A": { primary: "wanderer", secondaries: ["tussar", "mul"] },
  "4B": { primary: "modernist", secondaries: ["mul", "occasionalist"] },
  "4C": { primary: "maximalist", secondaries: ["romantic", "heir"] },
  "4D": { primary: "folklorist", secondaries: ["heir", "mul"] },
  "5A": { primary: "romantic", secondaries: ["mul", "heir"] },
  "5B": { primary: "maximalist", secondaries: ["wanderer", "occasionalist"] },
  "5C": { primary: "occasionalist", secondaries: ["modernist", "maximalist"] },
  "5D": { primary: "heir", secondaries: ["folklorist", "romantic"] },
  "6A": { primary: "folklorist", secondaries: ["maximalist", "wanderer"] },
  "6B": { primary: "heir", secondaries: ["romantic", "folklorist"] },
  "6C": { primary: "tussar", secondaries: ["modernist", "occasionalist"] },
  "6D": { primary: "maximalist", secondaries: ["wanderer", "folklorist"] },
  "7A": { primary: "modernist", secondaries: ["mul", "tussar"] },
  "7B": { primary: "romantic", secondaries: ["folklorist", "maximalist"] },
  "7C": { primary: "occasionalist", secondaries: ["heir", "wanderer"] },
  "7D": { primary: "maximalist", secondaries: ["romantic", "folklorist"] },
  "8A": { primary: "wanderer", secondaries: ["tussar", "folklorist"] },
  "8B": { primary: "mul", secondaries: ["wanderer", "modernist"] },
  "8C": { primary: "maximalist", secondaries: ["wanderer", "occasionalist"] },
  "8D": { primary: "occasionalist", secondaries: ["heir", "modernist"] },
};

// Alphabetical for tiebreak determinism (level 4 of the hierarchy).
export const ALL_SLUGS: Slug[] = [
  "folklorist",
  "heir",
  "maximalist",
  "modernist",
  "mul",
  "occasionalist",
  "romantic",
  "tussar",
  "wanderer",
];

const FALLBACK: Slug = "heir";

// Returns the points a single pick awards to a given slug.
// 3 if the slug is the option's primary, 1 if it's a secondary, 0 otherwise.
function pointsForSlug(pick: Pick, slug: Slug): number {
  const key = `${pick.questionId}${pick.optionId}`;
  const entry = MATRIX[key];
  if (!entry) return 0;
  if (entry.primary === slug) return 3;
  if (entry.secondaries.includes(slug)) return 1;
  return 0;
}

export function computeWinner(picks: Pick[]): Slug {
  // Defensive: empty / malformed input falls back to Heir so the app never
  // crashes mid-flow if localStorage is empty or corrupted.
  if (!Array.isArray(picks) || picks.length === 0) return FALLBACK;

  const totals: Record<Slug, number> = {
    folklorist: 0,
    heir: 0,
    maximalist: 0,
    modernist: 0,
    mul: 0,
    occasionalist: 0,
    romantic: 0,
    tussar: 0,
    wanderer: 0,
  };
  const primaryCounts: Record<Slug, number> = {
    folklorist: 0,
    heir: 0,
    maximalist: 0,
    modernist: 0,
    mul: 0,
    occasionalist: 0,
    romantic: 0,
    tussar: 0,
    wanderer: 0,
  };

  for (const pick of picks) {
    const key = `${pick.questionId}${pick.optionId}`;
    const entry = MATRIX[key];
    if (!entry) continue;
    totals[entry.primary] += 3;
    primaryCounts[entry.primary] += 1;
    for (const sec of entry.secondaries) {
      totals[sec] += 1;
    }
  }

  // Step 1: max total points.
  let maxScore = -Infinity;
  for (const slug of ALL_SLUGS) {
    if (totals[slug] > maxScore) maxScore = totals[slug];
  }
  let tied: Slug[] = ALL_SLUGS.filter((s) => totals[s] === maxScore);
  if (tied.length === 1) return tied[0];

  // Tiebreak 1: max primary count among the tied set.
  let maxPrimaries = -Infinity;
  for (const s of tied) {
    if (primaryCounts[s] > maxPrimaries) maxPrimaries = primaryCounts[s];
  }
  tied = tied.filter((s) => primaryCounts[s] === maxPrimaries);
  if (tied.length === 1) return tied[0];

  // Tiebreak 2: max points from the user's Q3 pick alone (primary OR secondary).
  const q3Pick = picks.find((p) => p.questionId === 3);
  if (q3Pick) {
    let maxQ3 = -Infinity;
    const q3Scores: Record<string, number> = {};
    for (const s of tied) {
      const pts = pointsForSlug(q3Pick, s);
      q3Scores[s] = pts;
      if (pts > maxQ3) maxQ3 = pts;
    }
    tied = tied.filter((s) => q3Scores[s] === maxQ3);
    if (tied.length === 1) return tied[0];
  }

  // Tiebreak 3: same pattern with Q6.
  const q6Pick = picks.find((p) => p.questionId === 6);
  if (q6Pick) {
    let maxQ6 = -Infinity;
    const q6Scores: Record<string, number> = {};
    for (const s of tied) {
      const pts = pointsForSlug(q6Pick, s);
      q6Scores[s] = pts;
      if (pts > maxQ6) maxQ6 = pts;
    }
    tied = tied.filter((s) => q6Scores[s] === maxQ6);
    if (tied.length === 1) return tied[0];
  }

  // Tiebreak 4: alphabetical (lowest slug name wins). ALL_SLUGS is already
  // sorted alphabetically, so the first member of `tied` after filtering
  // through ALL_SLUGS order is the winner.
  return tied[0] ?? FALLBACK;
}
