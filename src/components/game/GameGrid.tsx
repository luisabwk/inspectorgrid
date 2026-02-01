import { Cell, Suspect, PlacementState, PencilMarks, getCellKey, LayoutConfig } from "@/types/game";
import { GameCell } from "./GameCell";

interface GameGridProps {
  cells: Cell[][];
  suspects: Suspect[];
  placements: PlacementState;
  pencilMarks: PencilMarks;
  selectedCell: string | null;
  isPencilMode: boolean;
  rooms?: LayoutConfig['rooms'];
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
  rooms = [],
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameGridProps) => {
  const gridSize = cells.length;
  
  // Create room color lookup
  const roomColors: Record<string, string> = {};
  rooms.forEach((room) => {
    roomColors[room.id] = room.color;
  });
  
  return (
    <div 
      className="bg-card border-2 border-border rounded-xl p-3 shadow-lg"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        gap: '3px',
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
        const roomColor = cell.roomId ? roomColors[cell.roomId] : undefined;
        
        return (
          <GameCell
            key={cellKey}
            cell={cell}
            suspect={suspect}
            pencilMarks={cellPencilMarks}
            suspects={suspects}
            isSelected={selectedCell === cellKey}
            isPencilMode={isPencilMode}
            roomColor={roomColor}
            onCellClick={onCellClick}
            onCellDrop={onCellDrop}
            onDragOver={onDragOver}
          />
        );
      })}
    </div>
  );
};
