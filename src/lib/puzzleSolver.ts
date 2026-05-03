import {
  GameCase,
  Cell,
  AssetType,
  ClueConstraint,
  PlacementState,
  isCellOccupiable,
  areAdjacent,
  getCellKey,
} from "@/types/game";

export interface SolveResult {
  solutionCount: number;
  solution?: PlacementState;
}

const BINARY_KINDS = new Set<ClueConstraint["kind"]>([
  "adjacent_to_suspect",
  "not_adjacent_to_suspect",
  "same_room_as",
]);

const isBinary = (
  c: ClueConstraint,
): c is Extract<ClueConstraint, { targetSuspectId: string }> =>
  BINARY_KINDS.has(c.kind);

export function solvePuzzle(gameCase: GameCase): SolveResult {
  const grid = gameCase.layoutConfig.cells;
  const suspects = gameCase.suspects;
  const size = gameCase.gridSize;

  const occupiable: Cell[] = [];
  for (const row of grid) {
    for (const cell of row) {
      if (isCellOccupiable(cell)) occupiable.push(cell);
    }
  }

  const constraints = gameCase.clues.map((c) => c.constraint);
  const unaryBySuspect = new Map<string, ClueConstraint[]>();
  const binaryConstraints: Extract<ClueConstraint, { targetSuspectId: string }>[] = [];

  for (const con of constraints) {
    if (isBinary(con)) {
      binaryConstraints.push(con);
    } else {
      const list = unaryBySuspect.get(con.suspectId) ?? [];
      list.push(con);
      unaryBySuspect.set(con.suspectId, list);
    }
  }

  const domains = suspects.map((s) =>
    occupiable.filter((cell) =>
      satisfiesUnary(cell, unaryBySuspect.get(s.id) ?? [], grid, size),
    ),
  );

  // Place suspects with smallest domains first to prune aggressively.
  const order = suspects.map((_, i) => i).sort((a, b) => domains[a].length - domains[b].length);

  const placement = new Map<string, Cell>();
  const usedCells = new Set<string>();
  const usedRows = new Set<number>();
  const usedCols = new Set<number>();

  let solutionCount = 0;
  let solution: PlacementState | undefined;

  const checkBinaryAtPlacement = (suspectId: string, cell: Cell): boolean => {
    for (const con of binaryConstraints) {
      const partnerId =
        con.suspectId === suspectId
          ? con.targetSuspectId
          : con.targetSuspectId === suspectId
            ? con.suspectId
            : null;
      if (!partnerId) continue;
      const partnerCell = placement.get(partnerId);
      if (!partnerCell) continue;

      const adjacent = areAdjacent(cell, partnerCell, grid);
      if (con.kind === "adjacent_to_suspect" && !adjacent) return false;
      if (con.kind === "not_adjacent_to_suspect" && adjacent) return false;
      if (con.kind === "same_room_as" && cell.roomId !== partnerCell.roomId) return false;
    }
    return true;
  };

  const verifyVictimKiller = (): boolean => {
    const victim = suspects.find((s) => s.isVictim);
    if (!victim) return true; // no victim flagged → constraint is vacuously satisfied
    const victimCell = placement.get(victim.id);
    if (!victimCell) return false;

    let sameRoom = 0;
    for (const s of suspects) {
      if (s.id === victim.id) continue;
      const c = placement.get(s.id);
      if (c && c.roomId === victimCell.roomId) sameRoom++;
      if (sameRoom > 1) return false;
    }
    return sameRoom === 1;
  };

  const snapshotPlacement = (): PlacementState => {
    const state: PlacementState = {};
    for (const [suspectId, cell] of placement) {
      state[getCellKey(cell.row, cell.col)] = suspectId;
    }
    return state;
  };

  const backtrack = (orderIdx: number): void => {
    if (solutionCount >= 2) return;

    if (orderIdx === order.length) {
      if (!verifyVictimKiller()) return;
      solutionCount++;
      if (solutionCount === 1) {
        solution = snapshotPlacement();
      } else {
        solution = undefined;
      }
      return;
    }

    const suspectIdx = order[orderIdx];
    const suspect = suspects[suspectIdx];
    const domain = domains[suspectIdx];

    for (const cell of domain) {
      if (solutionCount >= 2) return;
      const key = getCellKey(cell.row, cell.col);
      if (usedCells.has(key) || usedRows.has(cell.row) || usedCols.has(cell.col)) continue;

      placement.set(suspect.id, cell);
      if (checkBinaryAtPlacement(suspect.id, cell)) {
        usedCells.add(key);
        usedRows.add(cell.row);
        usedCols.add(cell.col);

        backtrack(orderIdx + 1);

        usedCells.delete(key);
        usedRows.delete(cell.row);
        usedCols.delete(cell.col);
      }
      placement.delete(suspect.id);
    }
  };

  backtrack(0);

  return {
    solutionCount,
    solution: solutionCount === 1 ? solution : undefined,
  };
}

function satisfiesUnary(
  cell: Cell,
  constraints: ClueConstraint[],
  grid: Cell[][],
  size: number,
): boolean {
  for (const con of constraints) {
    switch (con.kind) {
      case "in_room":
        if (cell.roomId !== con.roomId) return false;
        break;
      case "not_in_room":
        if (cell.roomId === con.roomId) return false;
        break;
      case "on_asset":
        if (cell.asset !== con.assetType) return false;
        break;
      case "not_on_asset":
        if (cell.asset === con.assetType) return false;
        break;
      case "adjacent_to_asset":
        if (!hasAssetNeighbor(cell, con.assetType, grid)) return false;
        break;
      case "in_corner":
        if (!isCorner(cell, size)) return false;
        break;
      case "in_last_row_of_room": {
        if (cell.roomId !== con.roomId) return false;
        const lastRow = lastRowOfRoom(con.roomId, grid);
        if (cell.row !== lastRow) return false;
        break;
      }
    }
  }
  return true;
}

function hasAssetNeighbor(cell: Cell, assetType: AssetType, grid: Cell[][]): boolean {
  const dirs: [number, number][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  for (const [dr, dc] of dirs) {
    const nr = cell.row + dr;
    const nc = cell.col + dc;
    if (nr < 0 || nr >= grid.length || nc < 0 || nc >= grid[nr].length) continue;
    const neighbor = grid[nr][nc];
    if (!areAdjacent(cell, neighbor, grid)) continue;
    if (neighbor.asset === assetType) return true;
  }
  return false;
}

function isCorner(cell: Cell, size: number): boolean {
  const last = size - 1;
  return (
    (cell.row === 0 && cell.col === 0) ||
    (cell.row === 0 && cell.col === last) ||
    (cell.row === last && cell.col === 0) ||
    (cell.row === last && cell.col === last)
  );
}

function lastRowOfRoom(roomId: string, grid: Cell[][]): number {
  let max = -1;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.roomId === roomId && cell.row > max) max = cell.row;
    }
  }
  return max;
}
