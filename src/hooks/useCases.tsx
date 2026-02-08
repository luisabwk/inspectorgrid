import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GameCase, Cell, Suspect, Clue, LayoutConfig } from "@/types/game";
import { useAuth } from "@/hooks/useAuth";

interface DbCase {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  grid_size: number;
  layout_config: {
    cells: Cell[][];
    rooms: { id: string; name: string; color: string }[];
  };
  suspects: Suspect[];
  clues: Clue[];
}

// Transform database case to GameCase format
const transformCase = (dbCase: DbCase): GameCase => {
  return {
    id: dbCase.id,
    title: dbCase.title,
    description: dbCase.description,
    difficulty: dbCase.difficulty,
    gridSize: dbCase.grid_size,
    layoutConfig: dbCase.layout_config as LayoutConfig,
    suspects: dbCase.suspects,
    clues: dbCase.clues,
  };
};

export const useCases = () => {
  const [cases, setCases] = useState<GameCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const { data, error: queryError } = await supabase
        .from("cases_public")
        .select("*")
        .order("difficulty", { ascending: true });

      if (queryError) throw queryError;

      const transformedCases = (data || []).map((c) => transformCase(c as unknown as DbCase));
      setCases(transformedCases);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  return { cases, loading, error, refetch: fetchCases };
};

export const useCase = (caseId: string | null) => {
  const [gameCase, setGameCase] = useState<GameCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (!caseId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data, error: queryError } = await supabase
          .from("cases_public")
          .select("*")
          .eq("id", caseId)
          .maybeSingle();

        if (queryError) throw queryError;

        if (data) {
          setGameCase(transformCase(data as unknown as DbCase));
        } else {
          setError("Case not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  return { gameCase, loading, error };
};

// Get next case for player based on their progress
export const useNextCase = (currentLevel: number = 1) => {
  const [gameCase, setGameCase] = useState<GameCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchNextCase = async () => {
      try {
        setLoading(true);
        
        // Get difficulty based on level (increases every 3 levels)
        const difficulty = Math.ceil(currentLevel / 3);

        // Fetch completed case ids so we can pick the next unplayed case
        let completedCaseIds: string[] = [];
        if (user?.id) {
          const { data: progressRows, error: progressError } = await supabase
            .from("progress")
            .select("case_id")
            .eq("user_id", user.id);

          if (progressError) throw progressError;
          completedCaseIds = (progressRows || [])
            .map((r) => r.case_id)
            .filter((id): id is string => Boolean(id));
        }
        const completedSet = new Set(completedCaseIds);
        
        // Fetch a case at the appropriate difficulty
        const { data: casesAtDifficulty, error: queryError } = await supabase
          .from("cases_public")
          .select("*")
          .eq("difficulty", difficulty)
          .order("created_at", { ascending: true })
          .limit(50);

        if (queryError) throw queryError;

        const data =
          (casesAtDifficulty || []).find((c) => c.id && !completedSet.has(c.id)) ??
          // If the player already completed everything at this difficulty,
          // fall back to the first available case so the game still loads.
          (casesAtDifficulty || []).find((c) => c.id) ??
          null;

        // If no case at this difficulty, try lower difficulties
        if (!data) {
          const { data: fallbackCases, error: fallbackError } = await supabase
            .from("cases_public")
            .select("*")
            .lte("difficulty", difficulty)
            .order("difficulty", { ascending: false })
            .order("created_at", { ascending: true })
            .limit(50);

          if (fallbackError) throw fallbackError;
          
          const fallbackData =
            (fallbackCases || []).find((c) => c.id && !completedSet.has(c.id)) ??
            // Same fallback: allow replay when nothing new exists
            (fallbackCases || []).find((c) => c.id) ??
            null;

          if (fallbackData) {
            setGameCase(transformCase(fallbackData as unknown as DbCase));
          } else {
            setError("No cases available");
          }
        } else {
          setGameCase(transformCase(data as unknown as DbCase));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    };

    fetchNextCase();
  }, [currentLevel, user?.id]);

  return { gameCase, loading, error };
};
