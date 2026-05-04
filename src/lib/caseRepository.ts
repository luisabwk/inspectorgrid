import type {
  GameCase,
  LayoutConfig,
  Suspect,
  Clue,
  PlacementState,
} from "@/types/game";
import { type FetchAuthed, parseJson } from "@/lib/api";

interface ApiCase {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  gridSize: number;
  layoutConfig: LayoutConfig;
  suspects: Suspect[];
  clues: Clue[];
}

const transform = (row: ApiCase): GameCase => ({
  id: row.id,
  title: row.title,
  description: row.description,
  difficulty: row.difficulty,
  gridSize: row.gridSize,
  layoutConfig: row.layoutConfig,
  suspects: row.suspects,
  clues: row.clues,
});

export async function getPublishedCases(api: FetchAuthed): Promise<GameCase[]> {
  const res = await api("/api/cases");
  const data = await parseJson<ApiCase[]>(res);
  return data.map(transform);
}

export async function getCaseById(api: FetchAuthed, id: string): Promise<GameCase> {
  const res = await api(`/api/cases/${encodeURIComponent(id)}`);
  return transform(await parseJson<ApiCase>(res));
}

interface SaveBody {
  title: string;
  description: string;
  difficulty: number;
  gridSize: number;
  layoutConfig: LayoutConfig;
  suspects: Suspect[];
  clues: Clue[];
  solution: Record<string, { row: number; col: number }>;
}

// Backend stores `solution` as { suspectId: { row, col } }; the generator/solver
// produce `PlacementState` as { "row-col": suspectId }. Translate before posting.
const placementToBackendSolution = (
  placement: PlacementState,
): Record<string, { row: number; col: number }> => {
  const out: Record<string, { row: number; col: number }> = {};
  for (const [key, suspectId] of Object.entries(placement)) {
    if (!suspectId) continue;
    const [rowStr, colStr] = key.split("-");
    out[suspectId] = { row: Number(rowStr), col: Number(colStr) };
  }
  return out;
};

export async function saveGeneratedCase(
  api: FetchAuthed,
  gameCase: GameCase,
  solution: PlacementState,
  sceneName: string,
): Promise<string> {
  const body: SaveBody = {
    title: sceneName ? `${gameCase.title} — ${sceneName}` : gameCase.title,
    description: gameCase.description,
    difficulty: gameCase.difficulty,
    gridSize: gameCase.gridSize,
    layoutConfig: gameCase.layoutConfig,
    suspects: gameCase.suspects,
    clues: gameCase.clues,
    solution: placementToBackendSolution(solution),
  };
  const res = await api("/api/cases", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const inserted = await parseJson<{ id: string }>(res);
  return inserted.id;
}
