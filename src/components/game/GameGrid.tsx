import { Cell, Suspect, PlacementState, PencilMarks, getCellKey, LayoutConfig, CellRenderInfo, DirectionalFlags } from "@/types/game";
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

// Check if two cells are in different rooms
const areDifferentRooms = (cell1: Cell | undefined, cell2: Cell | undefined): boolean => {
  if (!cell1 || !cell2) return true;
  return cell1.roomId !== cell2.roomId;
};

// Check if an asset matches a given type
const hasAsset = (cell: Cell | undefined, asset: string): boolean => cell?.asset === asset;

// Check if cell has a wall-oriented appliance
const isWallAppliance = (cell: Cell | undefined): boolean =>
  cell?.asset === 'sink' || cell?.asset === 'stove' || cell?.asset === 'fridge';

// Check if cell is a counter (connectable kitchen) asset
const isCounterAsset = (cell: Cell | undefined): boolean =>
  cell?.asset === 'stove' || cell?.asset === 'sink';

// Calculate rotation for chair based on nearest table/desk
const getChairRotation = (
  cell: Cell,
  getCell: (row: number, col: number) => Cell | undefined
): number => {
  if (cell.asset !== 'chair') return 0;
  const { row, col } = cell;
  const neighbors = [
    { cell: getCell(row - 1, col), rotation: 180 },   // top -> face up
    { cell: getCell(row + 1, col), rotation: 0 },      // bottom -> face down
    { cell: getCell(row, col - 1), rotation: 90 },     // left -> face left
    { cell: getCell(row, col + 1), rotation: 270 },    // right -> face right
  ];
  for (const { cell: neighbor, rotation } of neighbors) {
    if (hasAsset(neighbor, 'table') || hasAsset(neighbor, 'desk')) return rotation;
  }
  return 0;
};

// Calculate rotation for wall appliances based on walls
const getApplianceRotation = (
  cell: Cell,
  hasWallTop: boolean,
  hasWallBottom: boolean,
  hasWallLeft: boolean,
  hasWallRight: boolean
): number => {
  if (!isWallAppliance(cell)) return 0;
  if (hasWallTop) return 0;
  if (hasWallBottom) return 180;
  if (hasWallLeft) return 270;
  if (hasWallRight) return 90;
  return 0;
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

  const selectedRow = selectedCell ? parseInt(selectedCell.split('-')[0]) : null;
  const selectedCol = selectedCell ? parseInt(selectedCell.split('-')[1]) : null;

  const roomColors: Record<string, string> = {};
  rooms.forEach((room) => { roomColors[room.id] = room.color; });

  const getCell = (row: number, col: number): Cell | undefined => {
    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) return undefined;
    return cells[row]?.[col];
  };

  // Build CellRenderInfo for a cell
  const getCellRenderInfo = (cell: Cell): CellRenderInfo => {
    const { row, col } = cell;
    const top = getCell(row - 1, col);
    const bottom = getCell(row + 1, col);
    const left = getCell(row, col - 1);
    const right = getCell(row, col + 1);

    // Walls between different rooms or at grid edges
    const hasWallTop = row === 0 || areDifferentRooms(cell, top) || cell.walls.includes('top') || (top?.walls.includes('bottom') ?? false);
    const hasWallBottom = row === gridSize - 1 || areDifferentRooms(cell, bottom) || cell.walls.includes('bottom') || (bottom?.walls.includes('top') ?? false);
    const hasWallLeft = col === 0 || areDifferentRooms(cell, left) || cell.walls.includes('left') || (left?.walls.includes('right') ?? false);
    const hasWallRight = col === gridSize - 1 || areDifferentRooms(cell, right) || cell.walls.includes('right') || (right?.walls.includes('left') ?? false);

    const walls: DirectionalFlags = {
      // Exclude outer grid border (rendered by the grid container)
      top: hasWallTop && row !== 0,
      bottom: hasWallBottom && row !== gridSize - 1,
      left: hasWallLeft && col !== 0,
      right: hasWallRight && col !== gridSize - 1,
    };

    // Helper for window/door on wall boundaries
    const windowAt = (hasWall: boolean, neighbor: Cell | undefined): boolean =>
      hasWall && (hasAsset(cell, 'window') || hasAsset(neighbor, 'window'));
    const doorAt = (hasWall: boolean, neighbor: Cell | undefined): boolean =>
      hasWall && (hasAsset(cell, 'door') || hasAsset(neighbor, 'door'));

    const windows: DirectionalFlags = {
      top: windowAt(hasWallTop, top),
      bottom: windowAt(hasWallBottom, bottom),
      left: windowAt(hasWallLeft, left),
      right: windowAt(hasWallRight, right),
    };

    const doors: DirectionalFlags = {
      top: doorAt(hasWallTop, top),
      bottom: doorAt(hasWallBottom, bottom),
      left: doorAt(hasWallLeft, left),
      right: doorAt(hasWallRight, right),
    };

    // Asset connections: same asset type, no wall between
    const connected = (assetCheck: (c: Cell | undefined) => boolean, neighbor: Cell | undefined, wallBetween: boolean): boolean =>
      assetCheck(cell) && assetCheck(neighbor) && !wallBetween;

    const isTable = (c: Cell | undefined) => hasAsset(c, 'table');
    const isBed = (c: Cell | undefined) => hasAsset(c, 'bed');
    const isSofa = (c: Cell | undefined) => hasAsset(c, 'sofa');
    const isDesk = (c: Cell | undefined) => hasAsset(c, 'desk');
    const isStove = (c: Cell | undefined) => hasAsset(c, 'stove');
    const isSink = (c: Cell | undefined) => hasAsset(c, 'sink');

    const buildConnections = (check: (c: Cell | undefined) => boolean): DirectionalFlags => ({
      top: connected(check, top, hasWallTop),
      bottom: connected(check, bottom, hasWallBottom),
      left: connected(check, left, hasWallLeft),
      right: connected(check, right, hasWallRight),
    });

    // Stove/sink connect to each other (counter)
    const stoveConn: DirectionalFlags = {
      top: hasAsset(cell, 'stove') && isCounterAsset(top) && !hasWallTop,
      bottom: hasAsset(cell, 'stove') && isCounterAsset(bottom) && !hasWallBottom,
      left: hasAsset(cell, 'stove') && isCounterAsset(left) && !hasWallLeft,
      right: hasAsset(cell, 'stove') && isCounterAsset(right) && !hasWallRight,
    };
    const sinkConn: DirectionalFlags = {
      top: hasAsset(cell, 'sink') && isCounterAsset(top) && !hasWallTop,
      bottom: hasAsset(cell, 'sink') && isCounterAsset(bottom) && !hasWallBottom,
      left: hasAsset(cell, 'sink') && isCounterAsset(left) && !hasWallLeft,
      right: hasAsset(cell, 'sink') && isCounterAsset(right) && !hasWallRight,
    };

    return {
      walls,
      windows,
      doors,
      connections: {
        table: buildConnections(isTable),
        bed: buildConnections(isBed),
        sofa: buildConnections(isSofa),
        desk: buildConnections(isDesk),
        stove: stoveConn,
        sink: sinkConn,
      },
      chairRotation: getChairRotation(cell, getCell),
      applianceRotation: getApplianceRotation(
        cell,
        hasWallTop || row === 0,
        hasWallBottom || row === gridSize - 1,
        hasWallLeft || col === 0,
        hasWallRight || col === gridSize - 1
      ),
    };
  };

  // Calculate room labels
  const roomLabels = useMemo(() => {
    const labelMap: Record<string, { id: string; name: string; color: string; minRow: number; maxRow: number; minCol: number; maxCol: number }> = {};

    cells.flat().forEach((cell) => {
      if (!cell.roomId) return;
      const room = rooms.find(r => r.id === cell.roomId);
      if (!room) return;

      if (!labelMap[cell.roomId]) {
        labelMap[cell.roomId] = { ...room, minRow: cell.row, maxRow: cell.row, minCol: cell.col, maxCol: cell.col };
      } else {
        const entry = labelMap[cell.roomId];
        entry.minRow = Math.min(entry.minRow, cell.row);
        entry.maxRow = Math.max(entry.maxRow, cell.row);
        entry.minCol = Math.min(entry.minCol, cell.col);
        entry.maxCol = Math.max(entry.maxCol, cell.col);
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
        {/* Row labels */}
        <div className="flex flex-col justify-around pr-1">
          {Array.from({ length: gridSize }, (_, i) => (
            <div
              key={`row-${i}`}
              className="text-[8px] sm:text-[10px] text-foreground/70 font-bold flex items-center justify-end"
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
            const renderInfo = getCellRenderInfo(cell);

            const isInSelectedRow = selectedRow !== null && cell.row === selectedRow;
            const isInSelectedCol = selectedCol !== null && cell.col === selectedCol;

            // Check if row/col is blocked by another placement
            const isBlockedByPlacement = Object.entries(placements).some(([key, sId]) => {
              if (!sId) return false;
              const [r, c] = key.split('-').map(Number);
              return (r === cell.row || c === cell.col) && key !== cellKey;
            });

            // Check for latin square conflict
            let hasConflict = false;
            if (suspectId) {
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
                renderInfo={renderInfo}
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
                className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-center leading-tight px-2 py-0.5 rounded-sm bg-white/40"
                style={{ color: 'hsl(var(--foreground))' }}
              >
                {room.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Column labels */}
      <div className="flex justify-around pt-1" style={{ marginLeft: '16px' }}>
        {Array.from({ length: gridSize }, (_, i) => (
          <div
            key={`col-${i}`}
            className="text-[8px] sm:text-[10px] text-foreground/70 font-bold text-center"
            style={{ width: `${100 / gridSize}%` }}
          >
            C{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
