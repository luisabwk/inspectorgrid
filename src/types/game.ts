// Asset types that can appear in cells
export type AssetType = 
  | 'empty'
  | 'bed'
  | 'sofa'
  | 'armchair'
  | 'rug'
  | 'window'
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
export const OCCUPIABLE_ASSETS: AssetType[] = ['empty', 'bed', 'sofa', 'armchair', 'rug', 'window', 'chair'];

// Assets that block suspects
export const BLOCKED_ASSETS: AssetType[] = ['plant', 'table', 'tv', 'bookshelf', 'rock', 'debris', 'fridge', 'stove', 'toilet', 'sink', 'shower', 'desk', 'computer'];

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

// Clue for the puzzle
export interface Clue {
  id: string;
  text: string;
  type: 'position' | 'adjacency' | 'room' | 'negation';
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
  solution: Record<string, { row: number; col: number }>; // suspectId -> position
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
