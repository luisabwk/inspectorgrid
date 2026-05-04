import { useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useApi } from "@/hooks/useApi";
import { parseJson } from "@/lib/api";

interface PlayerStats {
  level: number;
  totalScore: number;
  completedCases: number;
}

export const useProgress = () => {
  const { isSignedIn } = useAuth();
  const api = useApi();

  const getPlayerStats = useCallback(async (): Promise<PlayerStats | null> => {
    if (!isSignedIn) return null;
    try {
      const res = await api("/api/progress/stats");
      return await parseJson<PlayerStats>(res);
    } catch {
      return null;
    }
  }, [api, isSignedIn]);

  return { getPlayerStats };
};
