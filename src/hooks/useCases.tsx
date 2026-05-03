import { useEffect, useState } from "react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { useApi } from "@/hooks/useApi";
import { parseJson } from "@/lib/api";
import type { Cell, Clue, GameCase, LayoutConfig, Suspect } from "@/types/game";

interface ApiCase {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  gridSize: number;
  layoutConfig: LayoutConfig | { cells: Cell[][]; rooms: { id: string; name: string; color: string }[] };
  suspects: Suspect[];
  clues: Clue[];
}

const transformCase = (apiCase: ApiCase): GameCase => ({
  id: apiCase.id,
  title: apiCase.title,
  description: apiCase.description,
  difficulty: apiCase.difficulty,
  gridSize: apiCase.gridSize,
  layoutConfig: apiCase.layoutConfig as LayoutConfig,
  suspects: apiCase.suspects,
  clues: apiCase.clues,
});

export const useCases = () => {
  const { isSignedIn } = useClerkAuth();
  const api = useApi();
  const [cases, setCases] = useState<GameCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const res = await api("/api/cases");
      const data = await parseJson<ApiCase[]>(res);
      setCases(data.map(transformCase));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isSignedIn) {
      setCases([]);
      setLoading(false);
      return;
    }
    fetchCases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return { cases, loading, error, refetch: fetchCases };
};

export const useCase = (caseId: string | null) => {
  const { isSignedIn } = useClerkAuth();
  const api = useApi();
  const [gameCase, setGameCase] = useState<GameCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!caseId || !isSignedIn) {
      setLoading(false);
      return;
    }

    const fetchCase = async () => {
      try {
        setLoading(true);
        const res = await api(`/api/cases/${caseId}`);
        const data = await parseJson<ApiCase>(res);
        setGameCase(transformCase(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    };

    fetchCase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, isSignedIn]);

  return { gameCase, loading, error };
};

export const useNextCase = (currentLevel: number = 1) => {
  const { isSignedIn } = useClerkAuth();
  const api = useApi();
  const [gameCase, setGameCase] = useState<GameCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      setLoading(false);
      return;
    }

    const fetchNextCase = async () => {
      try {
        setLoading(true);
        const res = await api(`/api/cases/next?level=${currentLevel}`);
        if (res.status === 404) {
          setError("No cases available");
          return;
        }
        const data = await parseJson<ApiCase>(res);
        setGameCase(transformCase(data));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    };

    fetchNextCase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, isSignedIn]);

  return { gameCase, loading, error };
};
