import { Cell, Suspect, PlacementState, PencilMarks, getCellKey, LayoutConfig } from "@/types/game";
import { GameCell } from "./GameCell";
import { useMemo } from "react";

interface GameGridProps {
  cells: Cell[][];
  suspects: Suspect[];
  placements: PlacementState;
  pencilMarks: PencilMarks;
  selectedCell: string | null;
  selectedSuspect: string | null;
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

// Helper to check if cell has door asset
const hasDoorAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'door';
};

// Helper to check if cell has table asset
const hasTableAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'table';
};

// Helper to check if cell has bed asset
const hasBedAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'bed';
};

// Helper to check if cell has sofa asset
const hasSofaAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'sofa';
};

// Helper to check if cell has desk asset
const hasDeskAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'desk';
};

// Helper to check if cell has chair asset
const hasChairAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'chair';
};

// Helper to check if cell has wall-oriented appliance (sink, stove, fridge)
const isWallAppliance = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'sink' || cell?.asset === 'stove' || cell?.asset === 'fridge';
};

// Helper to check if cell has stove asset
const hasStoveAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'stove';
};

// Helper to check if cell has sink asset
const hasSinkAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'sink';
};

// Check if two cells are connectable counter assets (stove or sink)
const isCounterAsset = (cell: Cell | undefined): boolean => {
  return cell?.asset === 'stove' || cell?.asset === 'sink';
};

// Calculate rotation for chair based on nearest table/desk
const getChairRotation = (
  cell: Cell,
  getCell: (row: number, col: number) => Cell | undefined
): number => {
  if (cell.asset !== 'chair') return 0;
  
  const { row, col } = cell;
  const topCell = getCell(row - 1, col);
  const bottomCell = getCell(row + 1, col);
  const leftCell = getCell(row, col - 1);
  const rightCell = getCell(row, col + 1);
  
  // Check adjacent cells for table or desk
  const hasTableOrDeskTop = hasTableAsset(topCell) || hasDeskAsset(topCell);
  const hasTableOrDeskBottom = hasTableAsset(bottomCell) || hasDeskAsset(bottomCell);
  const hasTableOrDeskLeft = hasTableAsset(leftCell) || hasDeskAsset(leftCell);
  const hasTableOrDeskRight = hasTableAsset(rightCell) || hasDeskAsset(rightCell);
  
  // Return rotation to face the table (0 = facing down, 90 = facing left, 180 = facing up, 270 = facing right)
  if (hasTableOrDeskTop) return 180;    // Face up towards table
  if (hasTableOrDeskBottom) return 0;   // Face down (default)
  if (hasTableOrDeskLeft) return 90;    // Face left
  if (hasTableOrDeskRight) return 270;  // Face right (or -90)
  
  return 0; // Default facing down
};

// Calculate rotation for wall appliances (sink, stove, fridge) based on walls
const getApplianceRotation = (
  cell: Cell,
  hasWallTop: boolean,
  hasWallBottom: boolean,
  hasWallLeft: boolean,
  hasWallRight: boolean
): number => {
  if (!isWallAppliance(cell)) return 0;
  
  // Appliance should face AWAY from the wall (front faces room)
  // Priority: back against wall
  if (hasWallTop) return 0;      // Wall at top, face down (default)
  if (hasWallBottom) return 180; // Wall at bottom, face up
  if (hasWallLeft) return 270;   // Wall at left, face right
  if (hasWallRight) return 90;   // Wall at right, face left
  
  return 0; // Default facing down
};

export const GameGrid = ({
  cells,
  suspects,
  placements,
  pencilMarks,
  selectedCell,
  selectedSuspect,
  isPencilMode,
  rooms = [],
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameGridProps) => {
  const gridSize = cells.length;
  
  // Parse selected cell to get row/col for highlighting
  const selectedRow = selectedCell ? parseInt(selectedCell.split('-')[0]) : null;
  const selectedCol = selectedCell ? parseInt(selectedCell.split('-')[1]) : null;
  
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
    const hasWallTop =
      row === 0 ||
      areDifferentRooms(cell, topCell) ||
      cell.walls.includes('top') ||
      (topCell?.walls.includes('bottom') ?? false);
    const hasWallBottom =
      row === gridSize - 1 ||
      areDifferentRooms(cell, bottomCell) ||
      cell.walls.includes('bottom') ||
      (bottomCell?.walls.includes('top') ?? false);
    const hasWallLeft =
      col === 0 ||
      areDifferentRooms(cell, leftCell) ||
      cell.walls.includes('left') ||
      (leftCell?.walls.includes('right') ?? false);
    const hasWallRight =
      col === gridSize - 1 ||
      areDifferentRooms(cell, rightCell) ||
      cell.walls.includes('right') ||
      (rightCell?.walls.includes('left') ?? false);

    // Windows on walls - check if this cell or neighbor has window asset at the wall boundary
    const hasWindowTop = hasWallTop && (hasWindowAsset(cell) || hasWindowAsset(topCell));
    const hasWindowBottom = hasWallBottom && (hasWindowAsset(cell) || hasWindowAsset(bottomCell));
    const hasWindowLeft = hasWallLeft && (hasWindowAsset(cell) || hasWindowAsset(leftCell));
    const hasWindowRight = hasWallRight && (hasWindowAsset(cell) || hasWindowAsset(rightCell));

    // Doors on walls - check if this cell or neighbor has door asset at the wall boundary
    const hasDoorTop = hasWallTop && (hasDoorAsset(cell) || hasDoorAsset(topCell));
    const hasDoorBottom = hasWallBottom && (hasDoorAsset(cell) || hasDoorAsset(bottomCell));
    const hasDoorLeft = hasWallLeft && (hasDoorAsset(cell) || hasDoorAsset(leftCell));
    const hasDoorRight = hasWallRight && (hasDoorAsset(cell) || hasDoorAsset(rightCell));

    // Table connections - check if adjacent cells also have tables
    const hasTableTop = hasTableAsset(cell) && hasTableAsset(topCell) && !hasWallTop;
    const hasTableBottom = hasTableAsset(cell) && hasTableAsset(bottomCell) && !hasWallBottom;
    const hasTableLeft = hasTableAsset(cell) && hasTableAsset(leftCell) && !hasWallLeft;
    const hasTableRight = hasTableAsset(cell) && hasTableAsset(rightCell) && !hasWallRight;

    // Bed connections - check if adjacent cells also have beds
    const hasBedTop = hasBedAsset(cell) && hasBedAsset(topCell) && !hasWallTop;
    const hasBedBottom = hasBedAsset(cell) && hasBedAsset(bottomCell) && !hasWallBottom;
    const hasBedLeft = hasBedAsset(cell) && hasBedAsset(leftCell) && !hasWallLeft;
    const hasBedRight = hasBedAsset(cell) && hasBedAsset(rightCell) && !hasWallRight;

    // Sofa connections - check if adjacent cells also have sofas
    const hasSofaTop = hasSofaAsset(cell) && hasSofaAsset(topCell) && !hasWallTop;
    const hasSofaBottom = hasSofaAsset(cell) && hasSofaAsset(bottomCell) && !hasWallBottom;
    const hasSofaLeft = hasSofaAsset(cell) && hasSofaAsset(leftCell) && !hasWallLeft;
    const hasSofaRight = hasSofaAsset(cell) && hasSofaAsset(rightCell) && !hasWallRight;

    // Desk connections - check if adjacent cells also have desks
    const hasDeskTop = hasDeskAsset(cell) && hasDeskAsset(topCell) && !hasWallTop;
    const hasDeskBottom = hasDeskAsset(cell) && hasDeskAsset(bottomCell) && !hasWallBottom;
    const hasDeskLeft = hasDeskAsset(cell) && hasDeskAsset(leftCell) && !hasWallLeft;
    const hasDeskRight = hasDeskAsset(cell) && hasDeskAsset(rightCell) && !hasWallRight;

    // Stove connections - stove can connect to other stoves or sinks
    const hasStoveTop = hasStoveAsset(cell) && isCounterAsset(topCell) && !hasWallTop;
    const hasStoveBottom = hasStoveAsset(cell) && isCounterAsset(bottomCell) && !hasWallBottom;
    const hasStoveLeft = hasStoveAsset(cell) && isCounterAsset(leftCell) && !hasWallLeft;
    const hasStoveRight = hasStoveAsset(cell) && isCounterAsset(rightCell) && !hasWallRight;

    // Sink connections - sink can connect to other sinks or stoves
    const hasSinkTop = hasSinkAsset(cell) && isCounterAsset(topCell) && !hasWallTop;
    const hasSinkBottom = hasSinkAsset(cell) && isCounterAsset(bottomCell) && !hasWallBottom;
    const hasSinkLeft = hasSinkAsset(cell) && isCounterAsset(leftCell) && !hasWallLeft;
    const hasSinkRight = hasSinkAsset(cell) && isCounterAsset(rightCell) && !hasWallRight;

    // Chair rotation based on adjacent tables/desks
    const chairRotation = getChairRotation(cell, getCell);
    
    // Appliance rotation based on walls
    const applianceRotation = getApplianceRotation(
      cell,
      hasWallTop || row === 0,
      hasWallBottom || row === gridSize - 1,
      hasWallLeft || col === 0,
      hasWallRight || col === gridSize - 1
    );

    return {
      hasWallTop,
      hasWallBottom,
      hasWallLeft,
      hasWallRight,
      hasWindowTop,
      hasWindowBottom,
      hasWindowLeft,
      hasWindowRight,
      hasDoorTop,
      hasDoorBottom,
      hasDoorLeft,
      hasDoorRight,
      hasTableTop,
      hasTableBottom,
      hasTableLeft,
      hasTableRight,
      hasBedTop,
      hasBedBottom,
      hasBedLeft,
      hasBedRight,
      hasSofaTop,
      hasSofaBottom,
      hasSofaLeft,
      hasSofaRight,
      hasDeskTop,
      hasDeskBottom,
      hasDeskLeft,
      hasDeskRight,
      hasStoveTop,
      hasStoveBottom,
      hasStoveLeft,
      hasStoveRight,
      hasSinkTop,
      hasSinkBottom,
      hasSinkLeft,
      hasSinkRight,
      chairRotation,
      applianceRotation,
    };
  };

  // Calculate room labels with positions (center of each room)
  const roomLabels = useMemo(() => {
    const labelMap: Record<string, { id: string; name: string; color: string; minRow: number; maxRow: number; minCol: number; maxCol: number }> = {};

    // Find bounds of each room
    cells.flat().forEach((cell) => {
      if (cell.roomId) {
        if (!labelMap[cell.roomId]) {
          const room = rooms.find(r => r.id === cell.roomId);
          if (room) {
            labelMap[cell.roomId] = {
              id: room.id,
              name: room.name,
              color: room.color,
              minRow: cell.row,
              maxRow: cell.row,
              minCol: cell.col,
              maxCol: cell.col,
            };
          }
        } else {
          labelMap[cell.roomId].minRow = Math.min(labelMap[cell.roomId].minRow, cell.row);
          labelMap[cell.roomId].maxRow = Math.max(labelMap[cell.roomId].maxRow, cell.row);
          labelMap[cell.roomId].minCol = Math.min(labelMap[cell.roomId].minCol, cell.col);
          labelMap[cell.roomId].maxCol = Math.max(labelMap[cell.roomId].maxCol, cell.col);
        }
      }
    });

    return Object.values(labelMap).map(room => ({
      ...room,
      centerRow: (room.minRow + room.maxRow) / 2,
      centerCol: (room.minCol + room.maxCol) / 2,
    }));
  }, [cells, rooms]);
  
  const cellSizePercent = 100 / gridSize;

  return (
    <div className="relative w-full">
      <div className="flex">
        {/* Row labels (left side) */}
        <div 
          className="flex flex-col justify-around pr-1"
          style={{ height: 'auto' }}
        >
          {Array.from({ length: gridSize }, (_, i) => (
            <div 
              key={`row-${i}`} 
              className="text-[8px] sm:text-[10px] text-muted-foreground/60 font-medium flex items-center justify-end"
              style={{ height: `${100 / gridSize}%` }}
            >
              L{i + 1}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div 
          className="relative flex-1 bg-card border-[3px] border-foreground/70 rounded-sm overflow-hidden shadow-lg"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            aspectRatio: '1',
          }}
        >
        {cells.flat().map((cell) => {
          const cellKey = getCellKey(cell.row, cell.col);
          const suspectId = placements[cellKey];
          const suspect = suspectId ? suspects.find(s => s.id === suspectId) || null : null;
          const cellPencilMarks = pencilMarks[cellKey] || [];
          const roomColor = cell.roomId ? roomColors[cell.roomId] : undefined;
          const wallInfo = getCellWallInfo(cell);
          
          const isInSelectedRow = selectedRow !== null && cell.row === selectedRow;
          const isInSelectedCol = selectedCol !== null && cell.col === selectedCol;
          
          // Calculate if this cell is blocked by another placement in same row/col
          const blockingPlacements = Object.entries(placements).filter(([key, sId]) => {
            if (!sId) return false;
            const [r, c] = key.split('-').map(Number);
            // Same row or same column, but not this cell
            return (r === cell.row || c === cell.col) && key !== cellKey;
          });
          const isBlockedByPlacement = blockingPlacements.length > 0;
          
          // Check if this cell has a conflict (suspect placed where another suspect blocks)
          let hasConflict = false;
          if (suspectId) {
            // Check if any other cell in same row/col has a placement
            for (const [key, sId] of Object.entries(placements)) {
              if (!sId || key === cellKey) continue;
              const [r, c] = key.split('-').map(Number);
              if (r === cell.row || c === cell.col) {
                hasConflict = true;
                break;
              }
            }
          }
          
          return (
            <GameCell
              key={cellKey}
              cell={cell}
              suspect={suspect}
              pencilMarks={cellPencilMarks}
              suspects={suspects}
              isSelected={selectedCell === cellKey}
              isHighlighted={isInSelectedRow || isInSelectedCol}
              isPencilMode={isPencilMode}
              roomColor={roomColor}
              isPositioningSuspect={selectedSuspect !== null}
              isBlockedByPlacement={isBlockedByPlacement}
              hasConflict={hasConflict}
              hasWallTop={wallInfo.hasWallTop && cell.row !== 0}
              hasWallBottom={wallInfo.hasWallBottom && cell.row !== gridSize - 1}
              hasWallLeft={wallInfo.hasWallLeft && cell.col !== 0}
              hasWallRight={wallInfo.hasWallRight && cell.col !== gridSize - 1}
              hasWindowTop={wallInfo.hasWindowTop}
              hasWindowBottom={wallInfo.hasWindowBottom}
              hasWindowLeft={wallInfo.hasWindowLeft}
              hasWindowRight={wallInfo.hasWindowRight}
              hasDoorTop={wallInfo.hasDoorTop}
              hasDoorBottom={wallInfo.hasDoorBottom}
              hasDoorLeft={wallInfo.hasDoorLeft}
              hasDoorRight={wallInfo.hasDoorRight}
              hasTableTop={wallInfo.hasTableTop}
              hasTableBottom={wallInfo.hasTableBottom}
              hasTableLeft={wallInfo.hasTableLeft}
              hasTableRight={wallInfo.hasTableRight}
              hasBedTop={wallInfo.hasBedTop}
              hasBedBottom={wallInfo.hasBedBottom}
              hasBedLeft={wallInfo.hasBedLeft}
              hasBedRight={wallInfo.hasBedRight}
              hasSofaTop={wallInfo.hasSofaTop}
              hasSofaBottom={wallInfo.hasSofaBottom}
              hasSofaLeft={wallInfo.hasSofaLeft}
              hasSofaRight={wallInfo.hasSofaRight}
              hasDeskTop={wallInfo.hasDeskTop}
              hasDeskBottom={wallInfo.hasDeskBottom}
              hasDeskLeft={wallInfo.hasDeskLeft}
              hasDeskRight={wallInfo.hasDeskRight}
              hasStoveTop={wallInfo.hasStoveTop}
              hasStoveBottom={wallInfo.hasStoveBottom}
              hasStoveLeft={wallInfo.hasStoveLeft}
              hasStoveRight={wallInfo.hasStoveRight}
              hasSinkTop={wallInfo.hasSinkTop}
              hasSinkBottom={wallInfo.hasSinkBottom}
              hasSinkLeft={wallInfo.hasSinkLeft}
              hasSinkRight={wallInfo.hasSinkRight}
              chairRotation={wallInfo.chairRotation}
              applianceRotation={wallInfo.applianceRotation}
              onCellClick={onCellClick}
              onCellDrop={onCellDrop}
              onDragOver={onDragOver}
            />
          );
        })}

          {/* Room Labels Overlay */}
          {roomLabels.map((room) => (
            <div
              key={room.id}
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                left: `${room.centerCol * cellSizePercent}%`,
                top: `${room.centerRow * cellSizePercent}%`,
                width: `${cellSizePercent}%`,
                height: `${cellSizePercent}%`,
              }}
            >
              <span 
                className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider opacity-60 text-center leading-tight px-1"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {room.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Column labels (bottom) */}
      <div 
        className="flex justify-around pt-1"
        style={{ marginLeft: '16px' }}
      >
        {Array.from({ length: gridSize }, (_, i) => (
          <div 
            key={`col-${i}`} 
            className="text-[8px] sm:text-[10px] text-muted-foreground/60 font-medium text-center"
            style={{ width: `${100 / gridSize}%` }}
          >
            C{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
