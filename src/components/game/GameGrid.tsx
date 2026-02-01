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
}

// Helper to check if two cells are in different rooms
const areDifferentRooms = (cell1: Cell | undefined, cell2: Cell | undefined): boolean => {
  if (!cell1 || !cell2) return true; // Edge of grid = wall
  return cell1.roomId !== cell2.roomId;
};

// Helper to check if cell has window asset
const hasWindowAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'window';
};

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

  // Get cell at position (with bounds checking)
  const getCell = (row: number, col: number): Cell | undefined => {
    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return undefined;
    return cells[row]?.[col];
  };

  // Calculate wall and window info for each cell
  const getCellWallInfo = (cell: Cell) => {
    const { row, col } = cell;
    const topCell = getCell(row - 1, col);
    const bottomCell = getCell(row + 1, col);
    const leftCell = getCell(row, col - 1);
    const rightCell = getCell(row, col + 1);

    // Walls appear between different rooms OR at grid edges
    const hasWallTop = row === 0 || areDifferentRooms(cell, topCell) || cell.walls.includes('top');
    const hasWallBottom = row === gridSize - 1 || areDifferentRooms(cell, bottomCell) || cell.walls.includes('bottom');
    const hasWallLeft = col === 0 || areDifferentRooms(cell, leftCell) || cell.walls.includes('left');
    const hasWallRight = col === gridSize - 1 || areDifferentRooms(cell, rightCell) || cell.walls.includes('right');

    // Windows on walls - check if this cell or neighbor has window asset at the wall boundary
    const hasWindowTop = hasWallTop && (hasWindowAsset(cell) || hasWindowAsset(topCell));
    const hasWindowBottom = hasWallBottom && (hasWindowAsset(cell) || hasWindowAsset(bottomCell));
    const hasWindowLeft = hasWallLeft && (hasWindowAsset(cell) || hasWindowAsset(leftCell));
    const hasWindowRight = hasWallRight && (hasWindowAsset(cell) || hasWindowAsset(rightCell));

    return {
      hasWallTop,
      hasWallBottom,
      hasWallLeft,
      hasWallRight,
      hasWindowTop,
      hasWindowBottom,
      hasWindowLeft,
      hasWindowRight,
    };
  };

  // Calculate room labels
  const roomLabels = useMemo(() => {
    const labels: RoomLabel[] = [];
    const seenRooms = new Set<string>();

    rooms.forEach((room) => {
      if (!seenRooms.has(room.id) && room.id !== 'main') {
        seenRooms.add(room.id);
        labels.push({
          id: room.id,
          name: room.name,
          color: room.color,
        });
      }
    });

    return labels;
  }, [rooms]);
  
  return (
    <div className="relative">
      {/* Main Grid */}
      <div 
        className="bg-card border-[3px] border-foreground/70 rounded-sm overflow-hidden shadow-lg"
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
          const wallInfo = getCellWallInfo(cell);
          
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
              hasWallTop={wallInfo.hasWallTop && cell.row !== 0}
              hasWallBottom={wallInfo.hasWallBottom && cell.row !== gridSize - 1}
              hasWallLeft={wallInfo.hasWallLeft && cell.col !== 0}
              hasWallRight={wallInfo.hasWallRight && cell.col !== gridSize - 1}
              hasWindowTop={wallInfo.hasWindowTop}
              hasWindowBottom={wallInfo.hasWindowBottom}
              hasWindowLeft={wallInfo.hasWindowLeft}
              hasWindowRight={wallInfo.hasWindowRight}
              onCellClick={onCellClick}
              onCellDrop={onCellDrop}
              onDragOver={onDragOver}
            />
          );
        })}
      </div>

      {/* Room Labels */}
      <div className="flex flex-wrap gap-2 mt-3 justify-center">
        {roomLabels.map((room) => (
          <div
            key={room.id}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium shadow-sm"
            style={{
              backgroundColor: room.color,
              color: 'hsl(var(--foreground))',
            }}
          >
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: 'hsl(var(--foreground) / 0.3)' }}
            />
            {room.name}
          </div>
        ))}
      </div>
    </div>
  );
};
