import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GameCase } from "@/types/game";
import { useAuth } from "@/hooks/useAuth";
import { getCaseById, getPublishedCases } from "@/lib/caseRepository";

export const useCases = () => {
  const [cases, setCases] = useState<GameCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setCases(await getPublishedCases());
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
    if (!caseId) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        setGameCase(await getCaseById(caseId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    })();
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
    (async () => {
      try {
        setLoading(true);

        const targetDifficulty = Math.ceil(currentLevel / 3);
        const allCases = await getPublishedCases();

        let completedIds = new Set<string>();
        if (user?.id) {
          const { data: rows, error: progressError } = await supabase
            .from("progress")
            .select("case_id")
            .eq("user_id", user.id);
          if (progressError) throw progressError;
          completedIds = new Set((rows ?? []).map((r) => r.case_id).filter(Boolean) as string[]);
        }

        const atDifficulty = allCases.filter((c) => c.difficulty === targetDifficulty);
        const next =
          atDifficulty.find((c) => !completedIds.has(c.id)) ??
          atDifficulty[0] ??
          allCases.filter((c) => c.difficulty <= targetDifficulty).find((c) => !completedIds.has(c.id)) ??
          allCases.find((c) => c.difficulty <= targetDifficulty) ??
          null;

        if (next) setGameCase(next);
        else setError("No cases available");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    })();
  }, [currentLevel, user?.id]);

  return { gameCase, loading, error };
};
