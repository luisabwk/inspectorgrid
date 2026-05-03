import {
  GameCase,
  Cell,
  AssetType,
  Suspect,
  Clue,
  LayoutConfig,
  PlacementState,
  isCellOccupiable,
} from "@/types/game";
import { solvePuzzle } from "./puzzleSolver";

export interface GeneratorOptions {
  gridSize: 5 | 6 | 7 | 8 | 9;
  difficulty: 1 | 2 | 3;
  sceneName: string;
  theme?: string;
  suspectCount?: number;
}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 2000;
const MAX_RETRIES = 3;

type RoomType = "bedroom" | "kitchen" | "bathroom" | "living" | "corridor";

interface RoomRect {
  id: string;
  type: RoomType;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

const ROOM_INFO: Record<RoomType, { name: string; color: string }> = {
  bedroom: { name: "Quarto", color: "hsl(280 35% 88%)" },
  kitchen: { name: "Cozinha", color: "hsl(45 50% 85%)" },
  bathroom: { name: "Banheiro", color: "hsl(195 50% 70%)" },
  living: { name: "Sala", color: "hsl(30 50% 82%)" },
  corridor: { name: "Corredor", color: "hsl(30 20% 90%)" },
};

const FURNITURE_BY_ROOM: Record<RoomType, AssetType[]> = {
  bedroom: ["bed"],
  kitchen: ["fridge", "stove", "sink"],
  bathroom: ["toilet", "shower"],
  living: ["sofa", "tv", "rug"],
  corridor: [],
};

const SYSTEM_PROMPT = `You are a master puzzle designer for a deduction game called Inspector Grid.
Your job is to generate a valid murder mystery puzzle given a floor plan.

Rules:
1. Each suspect occupies exactly one occupiable cell (bed, sofa, armchair, rug, window, door, chair, toilet, shower, empty).
2. No two suspects share the same row or column (Sudoku constraint — applies across the entire grid, not per room).
3. Exactly one suspect is marked as the victim (isVictim: true).
4. The victim must be in the same room as exactly one other suspect — the killer.
5. Every clue must be necessary: removing any single clue must make the solution ambiguous.
6. Every clue must be satisfiable: they must all be simultaneously true.
7. Difficulty 1: 1 suspect per room max, clues are direct (room-based). Difficulty 3: multiple suspects in same room, clues are indirect (adjacency, negation, relative position).

You will receive:
- The grid layout as a JSON structure
- The room definitions
- The number of suspects to place
- The difficulty level
- The scene name

You must output ONLY valid JSON matching the schema below. No explanation, no markdown.

Schema:
{
  "suspects": [
    {
      "id": "string",
      "name": "string",
      "portraitId": "portrait1" | "portrait2" | "portrait3" | "portrait4" | "portrait5" | "portrait6" | "portrait7" | "portrait8",
      "color": "hsl(X Y% Z%)",
      "isVictim": boolean
    }
  ],
  "solution": {
    "row-col": "suspectId"
  },
  "clues": [
    {
      "id": "clue-1",
      "text": "string in pt-BR",
      "type": "room" | "position" | "adjacency" | "negation",
      "constraint": { "kind": "...", ... }
    }
  ]
}

Available constraint kinds (use exactly these shapes):
- { "kind": "in_room", "suspectId": "...", "roomId": "..." }
- { "kind": "not_in_room", "suspectId": "...", "roomId": "..." }
- { "kind": "on_asset", "suspectId": "...", "assetType": "..." }
- { "kind": "not_on_asset", "suspectId": "...", "assetType": "..." }
- { "kind": "adjacent_to_suspect", "suspectId": "...", "targetSuspectId": "..." }
- { "kind": "not_adjacent_to_suspect", "suspectId": "...", "targetSuspectId": "..." }
- { "kind": "adjacent_to_asset", "suspectId": "...", "assetType": "..." }
- { "kind": "same_room_as", "suspectId": "...", "targetSuspectId": "..." }
- { "kind": "in_corner", "suspectId": "..." }
- { "kind": "in_last_row_of_room", "suspectId": "...", "roomId": "..." }
`;

export async function generateCase(options: GeneratorOptions): Promise<GameCase> {
  const apiKey = (import.meta as ImportMeta).env?.VITE_ANTHROPIC_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error("VITE_ANTHROPIC_API_KEY is not configured. Add it to .env.");
  }

  const layoutConfig = buildLayout(options.gridSize);
  const suspectCount = options.suspectCount ?? options.gridSize - 1;
  const userMessage = buildUserMessage(layoutConfig, suspectCount, options);

  const errors: string[] = [];

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const aiResponse = await callAnthropic(apiKey, userMessage, errors);
      const candidate: GameCase = {
        id: crypto.randomUUID(),
        title: options.sceneName,
        description: buildDescription(options, aiResponse.suspects),
        difficulty: options.difficulty,
        gridSize: options.gridSize,
        layoutConfig,
        suspects: aiResponse.suspects,
        clues: aiResponse.clues,
      };

      const verdict = solvePuzzle(candidate);
      if (verdict.solutionCount !== 1) {
        errors.push(
          verdict.solutionCount === 0
            ? `Attempt ${attempt}: no valid solution`
            : `Attempt ${attempt}: ${verdict.solutionCount}+ solutions (ambiguous)`,
        );
        continue;
      }
      if (!solutionsMatch(aiResponse.solution, verdict.solution!)) {
        errors.push(`Attempt ${attempt}: AI's solution doesn't match the unique solver result`);
        continue;
      }
      return candidate;
    } catch (e) {
      errors.push(`Attempt ${attempt}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  throw new Error(`Failed to generate valid puzzle after ${MAX_RETRIES} attempts. ${errors.join("; ")}`);
}

interface AiResponse {
  suspects: Suspect[];
  solution: PlacementState;
  clues: Clue[];
}

async function callAnthropic(apiKey: string, userMessage: string, priorErrors: string[]): Promise<AiResponse> {
  const userContent =
    priorErrors.length > 0
      ? `${userMessage}\n\nPrevious attempts failed validation:\n- ${priorErrors.join("\n- ")}\n\nPlease regenerate ensuring rules 1-6 are satisfied and the puzzle has exactly one solution.`
      : userMessage;

  const response = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Anthropic API ${response.status}: ${body.slice(0, 300)}`);
  }

  const data = (await response.json()) as { content?: Array<{ type: string; text?: string }> };
  const text = data.content?.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("Empty response from Anthropic");

  return parseAiJson(text);
}

function parseAiJson(raw: string): AiResponse {
  const trimmed = raw.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
  const jsonText = fenced ? fenced[1] : trimmed;
  const parsed = JSON.parse(jsonText) as Partial<AiResponse>;

  if (!Array.isArray(parsed.suspects) || !Array.isArray(parsed.clues) || typeof parsed.solution !== "object" || parsed.solution === null) {
    throw new Error("AI response missing required fields (suspects/solution/clues)");
  }
  if (parsed.suspects.filter((s) => s.isVictim).length !== 1) {
    throw new Error("AI response must mark exactly one suspect as the victim");
  }
  for (const clue of parsed.clues) {
    if (!clue.constraint || typeof clue.constraint.kind !== "string") {
      throw new Error(`Clue ${clue.id} has no valid constraint`);
    }
  }
  return parsed as AiResponse;
}

function solutionsMatch(a: PlacementState, b: PlacementState): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) if (a[k] !== b[k]) return false;
  return true;
}

function buildDescription(options: GeneratorOptions, suspects: Suspect[]): string {
  const victim = suspects.find((s) => s.isVictim);
  const base = options.theme ? `${options.sceneName} — ${options.theme}` : options.sceneName;
  return victim ? `${base}. Descubra quem matou ${victim.name}.` : base;
}

function buildUserMessage(layout: LayoutConfig, suspectCount: number, options: GeneratorOptions): string {
  const cellsAscii = layoutToAscii(layout);
  const occupiableCount = layout.cells.flat().filter(isCellOccupiable).length;

  return [
    `Scene: ${options.sceneName}`,
    options.theme ? `Theme: ${options.theme}` : "",
    `Grid size: ${options.gridSize}x${options.gridSize}`,
    `Difficulty: ${options.difficulty} (1=easy, 3=hard)`,
    `Number of suspects to place: ${suspectCount}`,
    `Occupiable cells available: ${occupiableCount}`,
    "",
    "Rooms:",
    ...layout.rooms.map((r) => `- ${r.id} (${r.name})`),
    "",
    "Layout (each cell shows roomId:asset; '.' = empty):",
    cellsAscii,
    "",
    "Cells data (JSON):",
    JSON.stringify(layout.cells.flat().map((c) => ({ row: c.row, col: c.col, asset: c.asset, roomId: c.roomId }))),
    "",
    "Generate suspects, clues, and the ground-truth solution as JSON only.",
  ]
    .filter(Boolean)
    .join("\n");
}

function layoutToAscii(layout: LayoutConfig): string {
  return layout.cells
    .map((row) =>
      row
        .map((c) => `${(c.roomId ?? "?").slice(0, 4).padEnd(4)}:${c.asset.slice(0, 4).padEnd(4)}`)
        .join(" | "),
    )
    .join("\n");
}

function buildLayout(gridSize: 5 | 6 | 7 | 8 | 9): LayoutConfig {
  const rects = templateForSize(gridSize);

  const cells: Cell[][] = [];
  for (let r = 0; r < gridSize; r++) {
    const row: Cell[] = [];
    for (let c = 0; c < gridSize; c++) {
      const rect = rects.find(
        (rm) => r >= rm.rowStart && r <= rm.rowEnd && c >= rm.colStart && c <= rm.colEnd,
      );
      row.push({ row: r, col: c, asset: "empty", walls: [], roomId: rect?.id });
    }
    cells.push(row);
  }

  for (const rect of rects) {
    placeFurnitureInRoom(cells, rect);
  }
  placeDoorsAndWindows(cells, rects, gridSize);

  return {
    cells,
    rooms: rects.map((r) => ({
      id: r.id,
      name: ROOM_INFO[r.type].name,
      color: ROOM_INFO[r.type].color,
    })),
  };
}

function templateForSize(size: 5 | 6 | 7 | 8 | 9): RoomRect[] {
  // Even sizes: 4 quadrants. Odd sizes: 4 quadrants + middle-row corridor.
  const isOdd = size % 2 === 1;
  const corridorRow = isOdd ? Math.floor(size / 2) : -1;
  const topEnd = isOdd ? corridorRow - 1 : size / 2 - 1;
  const bottomStart = isOdd ? corridorRow + 1 : size / 2;
  const colMid = Math.floor(size / 2);
  const leftEnd = colMid - 1;
  const rightStart = colMid;

  const rooms: RoomRect[] = [
    { id: "room-bedroom", type: "bedroom", rowStart: 0, rowEnd: topEnd, colStart: 0, colEnd: leftEnd },
    { id: "room-bathroom", type: "bathroom", rowStart: 0, rowEnd: topEnd, colStart: rightStart, colEnd: size - 1 },
    { id: "room-kitchen", type: "kitchen", rowStart: bottomStart, rowEnd: size - 1, colStart: 0, colEnd: leftEnd },
    { id: "room-living", type: "living", rowStart: bottomStart, rowEnd: size - 1, colStart: rightStart, colEnd: size - 1 },
  ];
  if (isOdd) {
    rooms.push({
      id: "room-corridor",
      type: "corridor",
      rowStart: corridorRow,
      rowEnd: corridorRow,
      colStart: 0,
      colEnd: size - 1,
    });
  }
  return rooms;
}

function placeFurnitureInRoom(cells: Cell[][], rect: RoomRect): void {
  const required = FURNITURE_BY_ROOM[rect.type];
  if (required.length === 0) return;

  const candidates: Cell[] = [];
  for (let r = rect.rowStart; r <= rect.rowEnd; r++) {
    for (let c = rect.colStart; c <= rect.colEnd; c++) {
      candidates.push(cells[r][c]);
    }
  }
  shuffle(candidates);

  for (const asset of required) {
    const target = candidates.shift();
    if (!target) break;
    target.asset = asset;
  }
}

function placeDoorsAndWindows(cells: Cell[][], rects: RoomRect[], size: number): void {
  const corridor = rects.find((r) => r.type === "corridor");

  if (corridor) {
    // Place a door on the corridor cell directly bordering each non-corridor room.
    for (const rect of rects) {
      if (rect.type === "corridor") continue;
      const targetRow = rect.rowStart === 0 ? corridor.rowStart : corridor.rowStart;
      const candidates: Cell[] = [];
      for (let c = rect.colStart; c <= rect.colEnd; c++) {
        const cell = cells[targetRow]?.[c];
        if (cell && cell.roomId === corridor.id && cell.asset === "empty") candidates.push(cell);
      }
      const door = candidates[Math.floor(Math.random() * candidates.length)];
      if (door) door.asset = "door";
    }
  } else {
    // No corridor: place a door cell on the boundary between top/bottom rooms in each column half.
    const midRow = size / 2;
    const topRow = midRow - 1;
    for (const colStart of [0, Math.floor(size / 2)]) {
      const colEnd = colStart === 0 ? Math.floor(size / 2) - 1 : size - 1;
      const candidates: Cell[] = [];
      for (let c = colStart; c <= colEnd; c++) {
        const cell = cells[topRow][c];
        if (cell.asset === "empty") candidates.push(cell);
      }
      const door = candidates[Math.floor(Math.random() * candidates.length)];
      if (door) door.asset = "door";
    }
  }

  // Windows on outer edges of non-corridor rooms.
  for (const rect of rects) {
    if (rect.type === "corridor") continue;
    const outerCells: Cell[] = [];
    for (let r = rect.rowStart; r <= rect.rowEnd; r++) {
      for (let c = rect.colStart; c <= rect.colEnd; c++) {
        const isOuter = r === 0 || r === size - 1 || c === 0 || c === size - 1;
        if (isOuter && cells[r][c].asset === "empty") outerCells.push(cells[r][c]);
      }
    }
    if (outerCells.length === 0) continue;
    const window = outerCells[Math.floor(Math.random() * outerCells.length)];
    window.asset = "window";
  }
}

function shuffle<T>(arr: T[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Exported for testing.
export const __test = { buildLayout, parseAiJson, buildUserMessage };
