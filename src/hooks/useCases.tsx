import { useEffect, useState } from "react";
import { useAuth as useClerkAuth } from "@clerk/clerk-react";
import { useApi } from "@/hooks/useApi";
import { parseJson } from "@/lib/api";
import {
  getCaseById,
  getPublishedCases,
} from "@/lib/caseRepository";
import type { GameCase } from "@/types/game";

export const useCases = () => {
  const { isSignedIn } = useClerkAuth();
  const api = useApi();
  const [cases, setCases] = useState<GameCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    try {
      setLoading(true);
      setCases(await getPublishedCases(api));
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
    (async () => {
      try {
        setLoading(true);
        setGameCase(await getCaseById(api, caseId));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId, isSignedIn]);

  return { gameCase, loading, error };
};

// Get next case for player based on their progress.
// Backend exposes a /api/cases/next endpoint that handles the level → difficulty
// mapping, completed-case filtering, and replay fallback.
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
    (async () => {
      try {
        setLoading(true);
        const res = await api(`/api/cases/next?level=${currentLevel}`);
        const data = await parseJson<GameCase>(res);
        setGameCase({
          ...data,
          layoutConfig: data.layoutConfig,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load case");
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLevel, isSignedIn]);

  return { gameCase, loading, error };
};
