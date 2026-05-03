import { describe, it, expect } from "vitest";
import { solvePuzzle } from "@/lib/puzzleSolver";
import type {
  AssetType,
  Cell,
  ClueConstraint,
  GameCase,
  Suspect,
} from "@/types/game";

const makeCell = (row: number, col: number, asset: AssetType, roomId: string): Cell => ({
  row,
  col,
  asset,
  walls: [],
  roomId,
});

// Build a 4x4 grid split into two rooms (top half "A", bottom half "B").
// All cells are 'empty' (occupiable). No walls between rooms — we don't need them
// for the constraints under test.
const buildGrid = (): Cell[][] => {
  const grid: Cell[][] = [];
  for (let r = 0; r < 4; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < 4; c++) {
      row.push(makeCell(r, c, "empty", r < 2 ? "A" : "B"));
    }
    grid.push(row);
  }
  return grid;
};

// Note: tests intentionally omit `isVictim` so the victim-killer adjacency rule is
// vacuously satisfied. That rule is mutually exclusive with the global Sudoku rule
// (orthogonal neighbors always share a row or column) — see TODO in the work order.
const baseSuspects: Suspect[] = [
  { id: "s1", name: "Alice", portraitId: "portrait1", color: "hsl(0 0% 0%)" },
  { id: "s2", name: "Bob", portraitId: "portrait2", color: "hsl(0 0% 0%)" },
  { id: "s3", name: "Cara", portraitId: "portrait3", color: "hsl(0 0% 0%)" },
];

const buildCase = (clueConstraints: ClueConstraint[]): GameCase => ({
  id: "test",
  title: "test",
  description: "test",
  difficulty: 1,
  gridSize: 4,
  layoutConfig: {
    cells: buildGrid(),
    rooms: [
      { id: "A", name: "A", color: "" },
      { id: "B", name: "B", color: "" },
    ],
  },
  suspects: baseSuspects,
  clues: clueConstraints.map((constraint, i) => ({
    id: `clue-${i}`,
    text: "",
    type: "room",
    constraint,
  })),
});

describe("solvePuzzle", () => {
  it("returns 0 solutions when constraints are unsatisfiable", () => {
    // s1 and s2 forced into room A on the same row — sudoku conflict in a 1-row sliver
    // Put s1 in_room A AND on cell (0,0); put s2 in_room A AND on cell (0,1). Different cols
    // but the victim adjacency rule + sudoku will still allow this. Use stronger conflict:
    // require s1 and s2 both in_room A AND adjacent_to_suspect each other AND in_corner — only
    // 4 corners exist; combined with sudoku and adjacency this becomes infeasible for 3 suspects.
    const result = solvePuzzle(
      buildCase([
        { kind: "in_room", suspectId: "s1", roomId: "A" },
        { kind: "in_room", suspectId: "s2", roomId: "A" },
        { kind: "in_room", suspectId: "s3", roomId: "A" },
        // 3 suspects, all forced into the top 2 rows but sudoku requires distinct rows AND cols
        // — feasible. Now add: all in column 0. Sudoku cols collide.
        { kind: "on_asset", suspectId: "s1", assetType: "empty" },
        // not enough; try this instead: forbid every cell for s3
        { kind: "not_in_room", suspectId: "s3", roomId: "A" },
        { kind: "not_in_room", suspectId: "s3", roomId: "B" },
      ]),
    );
    expect(result.solutionCount).toBe(0);
    expect(result.solution).toBeUndefined();
  });

  it("finds a unique solution when constraints pin everyone down", () => {
    // Pin 3 suspects to unique cells whose rows AND cols are all distinct so the
    // sudoku constraint is satisfied.
    const grid: Cell[][] = [];
    for (let r = 0; r < 4; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < 4; c++) {
        row.push(makeCell(r, c, "empty", r < 2 ? "A" : "B"));
      }
      grid.push(row);
    }
    grid[0][0].asset = "bed";   // (row 0, col 0)
    grid[3][1].asset = "chair"; // (row 3, col 1)
    grid[2][2].asset = "sofa";  // (row 2, col 2) — distinct from both

    const gameCase: GameCase = {
      id: "uniq",
      title: "",
      description: "",
      difficulty: 1,
      gridSize: 4,
      layoutConfig: {
        cells: grid,
        rooms: [
          { id: "A", name: "A", color: "" },
          { id: "B", name: "B", color: "" },
        ],
      },
      suspects: baseSuspects,
      clues: [
        {
          id: "c1",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s1", assetType: "bed" },
        },
        {
          id: "c2",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s2", assetType: "chair" },
        },
        {
          id: "c3",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s3", assetType: "sofa" },
        },
      ],
    };

    const result = solvePuzzle(gameCase);
    expect(result.solutionCount).toBe(1);
    expect(result.solution).toEqual({
      "0-0": "s1",
      "3-1": "s2",
      "2-2": "s3",
    });
  });

  it("returns >=2 when the puzzle is ambiguous", () => {
    // No clues at all: many solutions exist on a 4x4 grid with 3 suspects.
    const result = solvePuzzle(buildCase([]));
    expect(result.solutionCount).toBeGreaterThanOrEqual(2);
    expect(result.solution).toBeUndefined();
  });

  it("enforces sudoku row/column uniqueness", () => {
    // Force s1 and s2 onto the same row via on_asset; should be unsolvable.
    const grid: Cell[][] = [];
    for (let r = 0; r < 4; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < 4; c++) {
        row.push(makeCell(r, c, "empty", "A"));
      }
      grid.push(row);
    }
    // Two cells on the same row both flagged 'bed' → both s1 and s2 must take a bed cell,
    // but they're on the same row → sudoku violation, no solution.
    grid[0][0].asset = "bed";
    grid[0][1].asset = "bed";

    const gameCase: GameCase = {
      id: "sudoku",
      title: "",
      description: "",
      difficulty: 1,
      gridSize: 4,
      layoutConfig: {
        cells: grid,
        rooms: [{ id: "A", name: "A", color: "" }],
      },
      suspects: baseSuspects,
      clues: [
        {
          id: "c1",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s1", assetType: "bed" },
        },
        {
          id: "c2",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s2", assetType: "bed" },
        },
      ],
    };

    const result = solvePuzzle(gameCase);
    expect(result.solutionCount).toBe(0);
  });

  it("enforces victim-killer adjacency (rejects when victim has zero neighbors)", () => {
    // Pin s1 at (0,0), s2 at (3,1), s3 (victim) at (1,2). Sudoku-valid (all rows/cols
    // distinct). None of s1/s2 sits at a cell orthogonally adjacent to s3 → victim has
    // 0 neighbors → must reject.
    const grid: Cell[][] = [];
    for (let r = 0; r < 4; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < 4; c++) {
        row.push(makeCell(r, c, "empty", "A"));
      }
      grid.push(row);
    }
    grid[0][0].asset = "bed";
    grid[3][1].asset = "sofa";
    grid[1][2].asset = "rug";

    const gameCase: GameCase = {
      id: "victim",
      title: "",
      description: "",
      difficulty: 1,
      gridSize: 4,
      layoutConfig: {
        cells: grid,
        rooms: [{ id: "A", name: "A", color: "" }],
      },
      suspects: [
        baseSuspects[0],
        baseSuspects[1],
        { ...baseSuspects[2], isVictim: true },
      ],
      clues: [
        {
          id: "c1",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s1", assetType: "bed" },
        },
        {
          id: "c2",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s2", assetType: "sofa" },
        },
        {
          id: "c3",
          text: "",
          type: "position",
          constraint: { kind: "on_asset", suspectId: "s3", assetType: "rug" },
        },
      ],
    };

    const result = solvePuzzle(gameCase);
    expect(result.solutionCount).toBe(0);
  });
});
