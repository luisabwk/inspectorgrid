import { useCallback } from "react";
import { useAuth } from "./useAuth";
import { supabase } from "@/integrations/supabase/client";

/**
 * Hook for retrieving player statistics.
 * 
 * NOTE: Progress recording is handled server-side via the verify_case_solution RPC.
 * This hook only provides read access to player stats.
 */
export const useProgress = () => {
  const { user } = useAuth();

  const getPlayerStats = useCallback(async () => {
    if (!user) return null;

    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("current_level, total_score")
        .eq("user_id", user.id)
        .maybeSingle();

      const { count } = await supabase
        .from("progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      return {
        level: profile?.current_level || 1,
        totalScore: profile?.total_score || 0,
        completedCases: count || 0,
      };
    } catch {
      return null;
    }
  }, [user?.id]);

  return { getPlayerStats };
};
