import type { CaseSolution } from "../db/schema.js";

export type VerifyResult =
  | { valid: true; message: string; score?: number; timeTaken?: number; alreadyCompleted: boolean }
  | { valid: false; message: string };

type VerifyInput = {
  gridSize: number;
  difficulty: number;
  solution: CaseSolution;
  placements: Record<string, string>;
  timeTaken: number | null;
  alreadyCompleted: boolean;
};

export type VerifyOutput = VerifyResult & {
  shouldRecord: boolean;
  clampedTimeTaken?: number;
};

const cellKey = (row: number, col: number) => `${row}-${col}`;

const checkLatinSquare = (
  placements: Record<string, string>,
  gridSize: number
): { valid: false; message: string } | null => {
  for (let row = 0; row < gridSize; row++) {
    const seen = new Set<string>();
    for (let col = 0; col < gridSize; col++) {
      const id = placements[cellKey(row, col)];
      if (!id) continue;
      if (seen.has(id)) {
        return { valid: false, message: `Linha ${row + 1} tem suspeitos duplicados!` };
      }
      seen.add(id);
    }
  }

  for (let col = 0; col < gridSize; col++) {
    const seen = new Set<string>();
    for (let row = 0; row < gridSize; row++) {
      const id = placements[cellKey(row, col)];
      if (!id) continue;
      if (seen.has(id)) {
        return { valid: false, message: `Coluna ${col + 1} tem suspeitos duplicados!` };
      }
      seen.add(id);
    }
  }

  return null;
};

const matchesSolution = (
  placements: Record<string, string>,
  solution: CaseSolution
): boolean => {
  for (const [suspectId, position] of Object.entries(solution)) {
    const placedHere = placements[cellKey(position.row, position.col)];
    if (placedHere !== suspectId) return false;
  }
  return true;
};

const computeScore = (difficulty: number, timeTaken: number): number => {
  const timeBonus = Math.max(0, 100 - Math.floor(Math.max(0, timeTaken - 60) / 2));
  return (100 + timeBonus) * difficulty;
};

export const verifyCaseSolution = (input: VerifyInput): VerifyOutput => {
  const { gridSize, difficulty, solution, placements, timeTaken, alreadyCompleted } = input;

  const latinViolation = checkLatinSquare(placements, gridSize);
  if (latinViolation) return { ...latinViolation, shouldRecord: false };

  if (!matchesSolution(placements, solution)) {
    return {
      valid: false,
      message: "Algo está errado. Continue investigando!",
      shouldRecord: false,
    };
  }

  if (alreadyCompleted || timeTaken === null) {
    return {
      valid: true,
      message: alreadyCompleted
        ? "Caso já resolvido anteriormente!"
        : "Parabéns! Você resolveu o caso!",
      alreadyCompleted,
      shouldRecord: false,
    };
  }

  const clampedTime = Math.min(3600, Math.max(1, timeTaken));
  const score = computeScore(difficulty, clampedTime);

  return {
    valid: true,
    message: "Parabéns! Você resolveu o caso!",
    score,
    timeTaken: clampedTime,
    alreadyCompleted: false,
    shouldRecord: true,
    clampedTimeTaken: clampedTime,
  };
};
