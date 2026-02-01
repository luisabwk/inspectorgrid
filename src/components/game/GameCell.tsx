import { Cell, Suspect, isCellOccupiable, getCellKey, AssetType } from "@/types/game";
import { cn } from "@/lib/utils";

interface GameCellProps {
  cell: Cell;
  suspect: Suspect | null;
  pencilMarks: string[];
  suspects: Suspect[];
  isSelected: boolean;
  isPencilMode: boolean;
  onCellClick: (row: number, col: number) => void;
  onCellDrop: (row: number, col: number) => void;
  onDragOver: (e: React.DragEvent) => void;
}

// Asset emoji mapping
const ASSET_ICONS: Record<AssetType, string> = {
  empty: '',
  bed: '🛏️',
  sofa: '🛋️',
  armchair: '💺',
  rug: '🟫',
  window: '🪟',
  plant: '🪴',
  table: '🪑',
  tv: '📺',
  bookshelf: '📚',
  rock: '🪨',
  debris: '🧱',
};

export const GameCell = ({
  cell,
  suspect,
  pencilMarks,
  suspects,
  isSelected,
  isPencilMode,
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameCellProps) => {
  const isOccupiable = isCellOccupiable(cell);
  const hasWalls = cell.walls.length > 0;
  
  const handleClick = () => {
    if (isOccupiable) {
      onCellClick(cell.row, cell.col);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isOccupiable) {
      onCellDrop(cell.row, cell.col);
    }
  };
  
  // Get pencil mark suspects
  const pencilSuspects = pencilMarks
    .map(id => suspects.find(s => s.id === id))
    .filter(Boolean) as Suspect[];
  
  return (
    <div
      className={cn(
        "relative aspect-square flex items-center justify-center transition-all duration-150",
        "border border-border/30",
        isOccupiable ? "cursor-pointer hover:bg-accent/30" : "cursor-not-allowed bg-muted/50",
        isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-background",
        // Wall styles
        cell.walls.includes('top') && "border-t-2 border-t-foreground",
        cell.walls.includes('right') && "border-r-2 border-r-foreground",
        cell.walls.includes('bottom') && "border-b-2 border-b-foreground",
        cell.walls.includes('left') && "border-l-2 border-l-foreground",
      )}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      {/* Asset layer */}
      {cell.asset !== 'empty' && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center text-2xl",
          !isOccupiable && "opacity-60"
        )}>
          {ASSET_ICONS[cell.asset]}
        </div>
      )}
      
      {/* Suspect layer (overlay) */}
      {suspect && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          style={{ 
            backgroundColor: `${suspect.color}20`,
          }}
        >
          <div 
            className="text-3xl drop-shadow-lg"
            title={suspect.name}
          >
            {suspect.avatar}
          </div>
        </div>
      )}
      
      {/* Pencil marks */}
      {!suspect && pencilSuspects.length > 0 && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 p-0.5 z-10">
          {pencilSuspects.slice(0, 6).map((s) => (
            <div 
              key={s.id}
              className="flex items-center justify-center text-xs opacity-60"
              title={s.name}
            >
              {s.avatar}
            </div>
          ))}
        </div>
      )}
      
      {/* Blocked indicator */}
      {!isOccupiable && (
        <div className="absolute inset-0 bg-destructive/10 pointer-events-none" />
      )}
    </div>
  );
};
