import { Cell, Suspect, isCellOccupiable, getCellKey, AssetType } from "@/types/game";
import { cn } from "@/lib/utils";
import { AssetIconMap } from "./assets/AssetIcons";
import { PortraitMap } from "./assets/SuspectPortraits";

interface GameCellProps {
  cell: Cell;
  suspect: Suspect | null;
  pencilMarks: string[];
  suspects: Suspect[];
  isSelected: boolean;
  isPencilMode: boolean;
  roomColor?: string;
  onCellClick: (row: number, col: number) => void;
  onCellDrop: (row: number, col: number) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export const GameCell = ({
  cell,
  suspect,
  pencilMarks,
  suspects,
  isSelected,
  isPencilMode,
  roomColor,
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameCellProps) => {
  const isOccupiable = isCellOccupiable(cell);
  const AssetIcon = AssetIconMap[cell.asset];
  
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
  
  // Get portrait component for placed suspect
  const SuspectPortrait = suspect ? PortraitMap[suspect.portraitId] : null;
  
  return (
    <div
      className={cn(
        "relative aspect-square flex items-center justify-center transition-all duration-150",
        "border border-border/50 rounded-sm",
        isOccupiable ? "cursor-pointer hover:brightness-95" : "cursor-not-allowed",
        isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-background",
        // Wall styles
        cell.walls.includes('top') && "border-t-2 border-t-foreground/70",
        cell.walls.includes('right') && "border-r-2 border-r-foreground/70",
        cell.walls.includes('bottom') && "border-b-2 border-b-foreground/70",
        cell.walls.includes('left') && "border-l-2 border-l-foreground/70",
      )}
      style={{
        backgroundColor: roomColor || 'hsl(var(--muted))',
      }}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      {/* Asset layer */}
      {cell.asset !== 'empty' && (
        <div className={cn(
          "absolute inset-1 flex items-center justify-center",
          !isOccupiable && "opacity-80"
        )}>
          <AssetIcon className="w-full h-full" />
        </div>
      )}
      
      {/* Suspect layer (overlay) */}
      {suspect && SuspectPortrait && (
        <div 
          className="absolute inset-0.5 flex items-center justify-center z-10 rounded-sm overflow-hidden"
          style={{ 
            backgroundColor: `${suspect.color.replace(')', ' / 0.15)').replace('hsl(', 'hsla(')}`,
          }}
        >
          <div 
            className="w-4/5 h-4/5 drop-shadow-md"
            title={suspect.name}
            style={{ color: suspect.color }}
          >
            <SuspectPortrait className="w-full h-full" />
          </div>
        </div>
      )}
      
      {/* Pencil marks */}
      {!suspect && pencilSuspects.length > 0 && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 p-0.5 z-10">
          {pencilSuspects.slice(0, 6).map((s) => {
            const MiniPortrait = PortraitMap[s.portraitId];
            return (
              <div 
                key={s.id}
                className="flex items-center justify-center opacity-50"
                title={s.name}
                style={{ color: s.color }}
              >
                {MiniPortrait && <MiniPortrait className="w-full h-full" />}
              </div>
            );
          })}
        </div>
      )}
      
      {/* Blocked indicator */}
      {!isOccupiable && (
        <div className="absolute inset-0 bg-foreground/5 pointer-events-none" />
      )}
    </div>
  );
};
