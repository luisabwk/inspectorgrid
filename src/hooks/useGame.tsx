import { useState, useCallback, useEffect } from "react";
import { GameCase, GameState, PlacementState, PencilMarks, getCellKey, isCellOccupiable } from "@/types/game";

export const useGame = (gameCase: GameCase | null) => {
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
      // Normal mode - place suspect
      if (selectedSuspect) {
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

  // Check solution
  const checkSolution = useCallback(() => {
    if (!gameCase) return { valid: false, message: 'Caso não carregado' };
    
    // Validate Latin Square rules (one suspect per row/column)
    const gridSize = gameCase.gridSize;
    
    // Check rows
    for (let row = 0; row < gridSize; row++) {
      const rowSuspects = new Set<string>();
      for (let col = 0; col < gridSize; col++) {
        const cellKey = getCellKey(row, col);
        const suspectId = placements[cellKey];
        if (suspectId) {
          if (rowSuspects.has(suspectId)) {
            return { valid: false, message: `Linha ${row + 1} tem suspeitos duplicados!` };
          }
          rowSuspects.add(suspectId);
        }
      }
    }
    
    // Check columns
    for (let col = 0; col < gridSize; col++) {
      const colSuspects = new Set<string>();
      for (let row = 0; row < gridSize; row++) {
        const cellKey = getCellKey(row, col);
        const suspectId = placements[cellKey];
        if (suspectId) {
          if (colSuspects.has(suspectId)) {
            return { valid: false, message: `Coluna ${col + 1} tem suspeitos duplicados!` };
          }
          colSuspects.add(suspectId);
        }
      }
    }
    
    // Check against solution
    let allCorrect = true;
    for (const [suspectId, position] of Object.entries(gameCase.solution)) {
      const cellKey = getCellKey(position.row, position.col);
      if (placements[cellKey] !== suspectId) {
        allCorrect = false;
        break;
      }
    }
    
    if (allCorrect) {
      return { valid: true, message: 'Parabéns! Você resolveu o caso!' };
    } else {
      return { valid: false, message: 'Algo está errado. Continue investigando!' };
    }
  }, [placements, gameCase]);

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
