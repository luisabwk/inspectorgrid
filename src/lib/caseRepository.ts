import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import type {
  GameCase,
  LayoutConfig,
  Suspect,
  Clue,
  PlacementState,
} from "@/types/game";

const toJson = <T,>(value: T): Json => value as unknown as Json;

interface PublicRow {
  id: string;
  title: string;
  description: string | null;
  difficulty: number;
  grid_size: number;
  layout_config: unknown;
  suspects: unknown;
  clues: unknown;
}

const toGameCase = (row: PublicRow): GameCase => ({
  id: row.id,
  title: row.title,
  description: row.description ?? "",
  difficulty: row.difficulty,
  gridSize: row.grid_size,
  layoutConfig: row.layout_config as LayoutConfig,
  suspects: row.suspects as Suspect[],
  clues: row.clues as Clue[],
});

export async function getPublishedCases(): Promise<GameCase[]> {
  const { data, error } = await supabase
    .from("game_cases_public")
    .select("id, title, description, difficulty, grid_size, layout_config, suspects, clues")
    .order("difficulty", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => toGameCase(row as unknown as PublicRow));
}

export async function getCaseById(id: string): Promise<GameCase> {
  const { data, error } = await supabase
    .from("game_cases_public")
    .select("id, title, description, difficulty, grid_size, layout_config, suspects, clues")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error(`Case ${id} not found`);
  return toGameCase(data as unknown as PublicRow);
}

export async function saveGeneratedCase(
  gameCase: GameCase,
  solution: PlacementState,
  sceneName: string,
): Promise<string> {
  const { data, error } = await supabase
    .from("game_cases")
    .insert({
      title: gameCase.title,
      description: gameCase.description,
      difficulty: gameCase.difficulty,
      grid_size: gameCase.gridSize,
      layout_config: toJson(gameCase.layoutConfig),
      suspects: toJson(gameCase.suspects),
      clues: toJson(gameCase.clues),
      solution: toJson(solution),
      scene_name: sceneName,
      is_published: true,
    })
    .select("id")
    .single();

  if (error) throw error;
  if (!data) throw new Error("Insert returned no row");
  return data.id;
}
