// Asset types that can appear in cells
export type AssetType = 
  | 'empty'
  | 'bed'
  | 'sofa'
  | 'armchair'
  | 'rug'
  | 'window'
  | 'door'
  | 'plant'
  | 'table'
  | 'tv'
  | 'bookshelf'
  | 'rock'
  | 'debris'
  // Kitchen
  | 'fridge'
  | 'stove'
  | 'chair'
  // Bathroom
  | 'toilet'
  | 'sink'
  | 'shower'
  // Office
  | 'desk'
  | 'computer';

// Assets that allow suspects
export const OCCUPIABLE_ASSETS: AssetType[] = ['empty', 'bed', 'sofa', 'armchair', 'rug', 'window', 'door', 'chair', 'toilet', 'shower'];

// Assets that block suspects
export const BLOCKED_ASSETS: AssetType[] = ['plant', 'table', 'tv', 'bookshelf', 'rock', 'debris', 'fridge', 'stove', 'sink', 'desk', 'computer'];

// Wall directions
export type WallDirection = 'top' | 'right' | 'bottom' | 'left';

// Cell in the grid
export interface Cell {
  row: number;
  col: number;
  asset: AssetType;
  walls: WallDirection[];
  roomId?: string;
}

// Suspect character
export interface Suspect {
  id: string;
  name: string;
  portraitId: string; // portrait key (portrait1, portrait2, etc.)
  color: string; // accent color for the suspect (HSL)
  isVictim?: boolean; // true if this suspect is the victim
}

// Grid layout configuration
export interface LayoutConfig {
  cells: Cell[][];
  rooms: {
    id: string;
    name: string;
    color: string;
  }[];
}

// Machine-readable constraint encoded by each Clue. The solver consumes this.
export type ClueConstraint =
  | { kind: 'in_room'; suspectId: string; roomId: string }
  | { kind: 'not_in_room'; suspectId: string; roomId: string }
  | { kind: 'on_asset'; suspectId: string; assetType: AssetType }
  | { kind: 'not_on_asset'; suspectId: string; assetType: AssetType }
  | { kind: 'adjacent_to_suspect'; suspectId: string; targetSuspectId: string }
  | { kind: 'not_adjacent_to_suspect'; suspectId: string; targetSuspectId: string }
  | { kind: 'adjacent_to_asset'; suspectId: string; assetType: AssetType }
  | { kind: 'same_room_as'; suspectId: string; targetSuspectId: string }
  | { kind: 'in_corner'; suspectId: string }
  | { kind: 'in_last_row_of_room'; suspectId: string; roomId: string };

// Clue for the puzzle
export interface Clue {
  id: string;
  text: string;
  type: 'position' | 'adjacency' | 'room' | 'negation';
  constraint: ClueConstraint;
}

// Game case/puzzle
export interface GameCase {
  id: string;
  title: string;
  description: string;
  difficulty: number;
  gridSize: number;
  layoutConfig: LayoutConfig;
  suspects: Suspect[];
  clues: Clue[];
}

// Player's current placement state
export interface PlacementState {
  [cellKey: string]: string | null; // "row-col" -> suspectId
}

// Pencil marks for cells
export interface PencilMarks {
  [cellKey: string]: string[]; // "row-col" -> suspectIds
}

// Game state
export interface GameState {
  caseId: string;
  placements: PlacementState;
  pencilMarks: PencilMarks;
  selectedSuspect: string | null;
  isPencilMode: boolean;
  isComplete: boolean;
  startTime: number;
}

// Directional info for each side of a cell (top, right, bottom, left)
export interface DirectionalFlags {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
}

// Rendering info computed by GameGrid and passed to GameCell
export interface CellRenderInfo {
  walls: DirectionalFlags;
  windows: DirectionalFlags;
  doors: DirectionalFlags;
  // Asset connections (adjacent same-type asset, no wall between)
  connections: {
    table: DirectionalFlags;
    bed: DirectionalFlags;
    sofa: DirectionalFlags;
    desk: DirectionalFlags;
    stove: DirectionalFlags;
    sink: DirectionalFlags;
  };
  chairRotation: number;
  applianceRotation: number;
}

// Helper to get cell key
export const getCellKey = (row: number, col: number): string => `${row}-${col}`;

// Helper to check if cell is occupiable
export const isCellOccupiable = (cell: Cell): boolean => {
  return OCCUPIABLE_ASSETS.includes(cell.asset);
};

// Helper to check adjacency considering walls
export const areAdjacent = (
  cell1: Cell,
  cell2: Cell,
  grid: Cell[][]
): boolean => {
  const rowDiff = Math.abs(cell1.row - cell2.row);
  const colDiff = Math.abs(cell1.col - cell2.col);
  
  // Must be exactly 1 step away (not diagonal)
  if (!((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1))) {
    return false;
  }
  
  // Check for walls blocking
  if (cell1.row < cell2.row) {
    // cell2 is below cell1
    if (cell1.walls.includes('bottom') || cell2.walls.includes('top')) return false;
  } else if (cell1.row > cell2.row) {
    // cell2 is above cell1
    if (cell1.walls.includes('top') || cell2.walls.includes('bottom')) return false;
  } else if (cell1.col < cell2.col) {
    // cell2 is to the right of cell1
    if (cell1.walls.includes('right') || cell2.walls.includes('left')) return false;
  } else if (cell1.col > cell2.col) {
    // cell2 is to the left of cell1
    if (cell1.walls.includes('left') || cell2.walls.includes('right')) return false;
  }
  
  return true;
};
