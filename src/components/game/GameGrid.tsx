import { Cell, Suspect, PlacementState, PencilMarks, getCellKey } from "@/types/game";
import { GameCell } from "./GameCell";

interface GameGridProps {
  cells: Cell[][];
  suspects: Suspect[];
  placements: PlacementState;
  pencilMarks: PencilMarks;
  selectedCell: string | null;
  isPencilMode: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellDrop: (row: number, col: number) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export const GameGrid = ({
  cells,
  suspects,
  placements,
  pencilMarks,
  selectedCell,
  isPencilMode,
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameGridProps) => {
  const gridSize = cells.length;
  
  // Create reverse lookup: suspectId -> cellKey
  const suspectPositions: Record<string, string> = {};
  Object.entries(placements).forEach(([cellKey, suspectId]) => {
    if (suspectId) {
      suspectPositions[suspectId] = cellKey;
    }
  });
  
  return (
    <div 
      className="bg-card border border-border rounded-lg p-2 shadow-xl"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '2px',
        aspectRatio: '1',
        maxWidth: '500px',
        width: '100%',
      }}
    >
      {cells.flat().map((cell) => {
        const cellKey = getCellKey(cell.row, cell.col);
        const suspectId = placements[cellKey];
        const suspect = suspectId ? suspects.find(s => s.id === suspectId) || null : null;
        const cellPencilMarks = pencilMarks[cellKey] || [];
        
        return (
          <GameCell
            key={cellKey}
            cell={cell}
            suspect={suspect}
            pencilMarks={cellPencilMarks}
            suspects={suspects}
            isSelected={selectedCell === cellKey}
            isPencilMode={isPencilMode}
            onCellClick={onCellClick}
            onCellDrop={onCellDrop}
            onDragOver={onDragOver}
          />
        );
      })}
    </div>
  );
};
