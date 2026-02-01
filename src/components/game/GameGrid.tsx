import { Cell, Suspect, PlacementState, PencilMarks, getCellKey, LayoutConfig } from "@/types/game";
import { GameCell } from "./GameCell";
import { useMemo } from "react";

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

interface RoomLabel {
  id: string;
  name: string;
  color: string;
  startRow: number;
  startCol: number;
  endRow: number;
  endCol: number;
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

  // Calculate room label positions
  const roomLabels = useMemo(() => {
    const labels: RoomLabel[] = [];
    const roomBounds: Record<string, { minRow: number; maxRow: number; minCol: number; maxCol: number }> = {};

    // Find bounds for each room
    cells.flat().forEach((cell) => {
      if (cell.roomId) {
        if (!roomBounds[cell.roomId]) {
          roomBounds[cell.roomId] = { minRow: cell.row, maxRow: cell.row, minCol: cell.col, maxCol: cell.col };
        } else {
          roomBounds[cell.roomId].minRow = Math.min(roomBounds[cell.roomId].minRow, cell.row);
          roomBounds[cell.roomId].maxRow = Math.max(roomBounds[cell.roomId].maxRow, cell.row);
          roomBounds[cell.roomId].minCol = Math.min(roomBounds[cell.roomId].minCol, cell.col);
          roomBounds[cell.roomId].maxCol = Math.max(roomBounds[cell.roomId].maxCol, cell.col);
        }
      }
    });

    // Create labels for each room
    rooms.forEach((room) => {
      if (roomBounds[room.id]) {
        const bounds = roomBounds[room.id];
        labels.push({
          id: room.id,
          name: room.name,
          color: room.color,
          startRow: bounds.minRow,
          startCol: bounds.minCol,
          endRow: bounds.maxRow,
          endCol: bounds.maxCol,
        });
      }
    });

    return labels;
  }, [cells, rooms]);
  
  return (
    <div className="relative">
      {/* Main Grid */}
      <div 
        className="bg-card border-2 border-foreground/20 rounded-lg overflow-hidden shadow-lg"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gap: '0px',
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

      {/* Room Labels */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {roomLabels.filter(room => room.id !== 'main').map((room) => (
          <div
            key={room.id}
            className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium"
            style={{
              backgroundColor: room.color,
              color: 'hsl(var(--foreground))',
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'hsl(var(--foreground) / 0.4)' }}
            />
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
};
