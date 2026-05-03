import { useState, useCallback, useEffect } from "react";
import { GameCase, GameState, PlacementState, PencilMarks, getCellKey, isCellOccupiable } from "@/types/game";
import { useApi } from "@/hooks/useApi";

export const useGame = (gameCase: GameCase | null) => {
  const api = useApi();
  const [placements, setPlacements] = useState<PlacementState>({});
  const [pencilMarks, setPencilMarks] = useState<PencilMarks>({});
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [isPencilMode, setIsPencilMode] = useState(false);
  const [draggedSuspect, setDraggedSuspect] = useState<string | null>(null);

  // Reset state when gameCase changes
  useEffect(() => {
    setPlacements({});
    setPencilMarks({});
    setSelectedSuspect(null);
    setSelectedCell(null);
    setIsPencilMode(false);
  }, [gameCase?.id]);

  // Count placed suspects
  const placedCount = Object.values(placements).filter(Boolean).length;
  const totalSuspects = gameCase?.suspects.length || 0;
  const canCheck = placedCount === totalSuspects && totalSuspects > 0;

  // Handle suspect selection
  const handleSuspectSelect = useCallback((suspectId: string) => {
    setSelectedSuspect(prev => prev === suspectId ? null : suspectId);
    setSelectedCell(null);
  }, []);

  // Handle cell click
  const handleCellClick = useCallback((row: number, col: number) => {
    if (!gameCase) return;
    
    const cell = gameCase.layoutConfig.cells[row][col];
    if (!isCellOccupiable(cell)) return;

    const cellKey = getCellKey(row, col);
    
    if (isPencilMode) {
      // Pencil mode - toggle marks
      if (selectedSuspect) {
        setPencilMarks(prev => {
          const current = prev[cellKey] || [];
          const hasIt = current.includes(selectedSuspect);
          return {
            ...prev,
            [cellKey]: hasIt 
              ? current.filter(id => id !== selectedSuspect)
              : [...current, selectedSuspect]
          };
        });
      }
    } else {
      // Normal mode - place or reposition suspect
      const cellSuspectId = placements[cellKey];
      
      if (selectedSuspect) {
        // A suspect is selected - place them here
        // Check if suspect is already placed elsewhere
        const existingCell = Object.entries(placements).find(
          ([_, id]) => id === selectedSuspect
        )?.[0];
        
        if (existingCell) {
          // Remove from existing position
          setPlacements(prev => ({
            ...prev,
            [existingCell]: null,
          }));
        }
        
        // Place in new position
        setPlacements(prev => ({
          ...prev,
          [cellKey]: selectedSuspect,
        }));
        
        // Clear pencil marks for this cell
        setPencilMarks(prev => ({
          ...prev,
          [cellKey]: [],
        }));
        
        setSelectedSuspect(null);
        setSelectedCell(null);
      } else if (cellSuspectId) {
        // No suspect selected, but cell has a suspect - select them for repositioning
        setSelectedSuspect(cellSuspectId);
        setSelectedCell(null);
      } else {
        // Select/deselect cell
        setSelectedCell(prev => prev === cellKey ? null : cellKey);
      }
    }
  }, [gameCase, isPencilMode, selectedSuspect, placements]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.DragEvent, suspectId: string) => {
    setDraggedSuspect(suspectId);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle cell drop
  const handleCellDrop = useCallback((row: number, col: number) => {
    if (!draggedSuspect || !gameCase) return;
    
    const cell = gameCase.layoutConfig.cells[row][col];
    if (!isCellOccupiable(cell)) {
      setDraggedSuspect(null);
      return;
    }

    const cellKey = getCellKey(row, col);
    
    // Check if suspect is already placed elsewhere
    const existingCell = Object.entries(placements).find(
      ([_, id]) => id === draggedSuspect
    )?.[0];
    
    if (existingCell) {
      // Remove from existing position
      setPlacements(prev => ({
        ...prev,
        [existingCell]: null,
      }));
    }
    
    // Place in new position
    setPlacements(prev => ({
      ...prev,
      [cellKey]: draggedSuspect,
    }));
    
    // Clear pencil marks for this cell
    setPencilMarks(prev => ({
      ...prev,
      [cellKey]: [],
    }));
    
    setDraggedSuspect(null);
  }, [draggedSuspect, gameCase, placements]);

  // Clear selected cell
  const handleClearCell = useCallback(() => {
    if (selectedCell) {
      setPlacements(prev => ({
        ...prev,
        [selectedCell]: null,
      }));
      setPencilMarks(prev => ({
        ...prev,
        [selectedCell]: [],
      }));
    }
  }, [selectedCell]);

  // Reset game
  const handleResetGame = useCallback(() => {
    setPlacements({});
    setPencilMarks({});
    setSelectedSuspect(null);
    setSelectedCell(null);
    setIsPencilMode(false);
  }, []);

  // Check solution using server-side validation
  const checkSolution = useCallback(async (timeTakenSeconds?: number): Promise<{ 
    valid: boolean; 
    message: string;
    score?: number;
    alreadyCompleted?: boolean;
  }> => {
    if (!gameCase) return { valid: false, message: 'Caso não carregado' };
    
    try {
      const cleanPlacements: Record<string, string> = {};
      for (const [cellKey, suspectId] of Object.entries(placements)) {
        if (suspectId) {
          cleanPlacements[cellKey] = suspectId;
        }
      }

      const res = await api(`/api/verify/${gameCase.id}`, {
        method: 'POST',
        body: JSON.stringify({
          placements: cleanPlacements,
          timeTaken: timeTakenSeconds ?? null,
        }),
      });

      const result = (await res.json()) as {
        valid?: boolean;
        message?: string;
        score?: number;
        alreadyCompleted?: boolean;
      };

      if (!res.ok) {
        return { valid: false, message: result?.message ?? 'Erro ao verificar solução. Tente novamente.' };
      }

      return {
        valid: result.valid ?? false,
        message: result.message ?? 'Erro desconhecido',
        score: result.score,
        alreadyCompleted: result.alreadyCompleted,
      };
    } catch (err) {
      console.error('Solution check failed:', err);
      return { valid: false, message: 'Erro ao verificar solução. Tente novamente.' };
    }
  }, [placements, gameCase, api]);

  return {
    placements,
    pencilMarks,
    selectedSuspect,
    selectedCell,
    isPencilMode,
    placedCount,
    totalSuspects,
    canCheck,
    handleSuspectSelect,
    handleCellClick,
    handleDragStart,
    handleDragOver,
    handleCellDrop,
    handleClearCell,
    handleResetGame,
    checkSolution,
    setIsPencilMode: () => setIsPencilMode(prev => !prev),
  };
};
