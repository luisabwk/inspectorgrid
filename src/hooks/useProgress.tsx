import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface ProgressResult {
  score: number;
  timeTaken: number;
  newLevel: number;
  levelUp: boolean;
}

// Calculate score based on difficulty, time, and base points
const calculateScore = (difficulty: number, timeTakenSeconds: number): number => {
  const baseScore = 100;
  const difficultyMultiplier = difficulty;
  
  // Time bonus: max 100 extra points, decreases over time
  // Full bonus if solved in under 60 seconds, decreases after that
  const maxTimeBonus = 100;
  const timeThreshold = 60; // seconds for full bonus
  const timePenaltyRate = 0.5; // points lost per second after threshold
  
  const timeBonus = Math.max(0, maxTimeBonus - Math.max(0, timeTakenSeconds - timeThreshold) * timePenaltyRate);
  
  return Math.round((baseScore + timeBonus) * difficultyMultiplier);
};

export const useProgress = () => {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProgress = async (
    caseId: string,
    difficulty: number,
    timeTakenSeconds: number
  ): Promise<ProgressResult | null> => {
    if (!user) {
      setError("User not authenticated");
      return null;
    }

    try {
      setSaving(true);
      setError(null);

      const score = calculateScore(difficulty, timeTakenSeconds);

      // Save progress record
      const { error: progressError } = await supabase.from("progress").insert({
        user_id: user.id,
        case_id: caseId,
        score,
        time_taken: timeTakenSeconds,
      });

      if (progressError) throw progressError;

      // Get current profile
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("current_level, total_score")
        .eq("user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      const currentLevel = profile?.current_level || 1;
      const currentTotalScore = profile?.total_score || 0;

      // Calculate new level (increases every 3 completed cases)
      const { count, error: countError } = await supabase
        .from("progress")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id);

      if (countError) throw countError;

      const completedCases = count || 0;
      const newLevel = Math.floor(completedCases / 3) + 1;
      const levelUp = newLevel > currentLevel;

      // Update profile
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          current_level: newLevel,
          total_score: currentTotalScore + score,
        })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      return {
        score,
        timeTaken: timeTakenSeconds,
        newLevel,
        levelUp,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save progress");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const getPlayerStats = async () => {
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
  };

  return { saveProgress, getPlayerStats, saving, error };
};
