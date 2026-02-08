import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GameCase, Cell, Suspect, Clue, LayoutConfig } from "@/types/game";

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

  useEffect(() => {
    const fetchNextCase = async () => {
      try {
        setLoading(true);
        
        // Get difficulty based on level (increases every 3 levels)
        const difficulty = Math.ceil(currentLevel / 3);
        
        // Fetch a case at the appropriate difficulty
        const { data, error: queryError } = await supabase
          .from("cases_public")
          .select("*")
          .eq("difficulty", difficulty)
          .limit(1)
          .maybeSingle();

        if (queryError) throw queryError;

        // If no case at this difficulty, try lower difficulties
        if (!data) {
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("cases_public")
            .select("*")
            .lte("difficulty", difficulty)
            .order("difficulty", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (fallbackError) throw fallbackError;
          
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
  }, [currentLevel]);

  return { gameCase, loading, error };
};
