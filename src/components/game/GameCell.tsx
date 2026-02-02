import { Cell, Suspect, isCellOccupiable, getCellKey, AssetType } from "@/types/game";
import { cn } from "@/lib/utils";
import { AssetIconMap, TableIcon, BedIcon, SofaIcon } from "./assets/AssetIcons";
import { PortraitMap } from "./assets/SuspectPortraits";

interface GameCellProps {
  cell: Cell;
  suspect: Suspect | null;
  pencilMarks: string[];
  suspects: Suspect[];
  isSelected: boolean;
  isHighlighted: boolean;
  isPencilMode: boolean;
  roomColor?: string;
  // Walls info from neighboring cells for proper rendering
  hasWallTop: boolean;
  hasWallRight: boolean;
  hasWallBottom: boolean;
  hasWallLeft: boolean;
  // Window positions
  hasWindowTop: boolean;
  hasWindowRight: boolean;
  hasWindowBottom: boolean;
  hasWindowLeft: boolean;
  // Adjacent table connections
  hasTableTop: boolean;
  hasTableBottom: boolean;
  hasTableLeft: boolean;
  hasTableRight: boolean;
  // Adjacent bed connections
  hasBedTop: boolean;
  hasBedBottom: boolean;
  hasBedLeft: boolean;
  hasBedRight: boolean;
  // Adjacent sofa connections
  hasSofaTop: boolean;
  hasSofaBottom: boolean;
  hasSofaLeft: boolean;
  hasSofaRight: boolean;
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
  isHighlighted,
  isPencilMode,
  roomColor,
  hasWallTop,
  hasWallRight,
  hasWallBottom,
  hasWallLeft,
  hasWindowTop,
  hasWindowRight,
  hasWindowBottom,
  hasWindowLeft,
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
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameCellProps) => {
  // Window cells are occupiable but don't show an icon - they're wall markings
  const isWindowCell = cell.asset === 'window';
  const isTableCell = cell.asset === 'table';
  const isBedCell = cell.asset === 'bed';
  const isSofaCell = cell.asset === 'sofa';
  const isLonelySofa =
    isSofaCell &&
    !hasSofaTop &&
    !hasSofaBottom &&
    !hasSofaLeft &&
    !hasSofaRight;
  const isConnectableAsset = isTableCell || isBedCell || isSofaCell;
  const isOccupiable = isCellOccupiable(cell);
  const AssetIcon = !isWindowCell && !isConnectableAsset ? AssetIconMap[cell.asset] : AssetIconMap['empty'];
  const ArmchairAssetIcon = AssetIconMap['armchair'];
  
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

  const WALL_WIDTH = '3px';
  const WALL_COLOR = 'hsl(var(--foreground) / 0.7)';

  return (
    <div
      className={cn(
        "relative aspect-square flex items-center justify-center transition-all duration-150",
        "border-r border-b border-foreground/10",
        isOccupiable ? "cursor-pointer hover:brightness-95" : "cursor-not-allowed",
        isSelected && "ring-2 ring-primary ring-inset",
        isHighlighted && !isSelected && "brightness-[0.92]",
      )}
      style={{
        backgroundColor: roomColor || 'hsl(var(--muted))',
      }}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={onDragOver}
    >
      {/* Wall overlays - rendered as absolutely positioned elements */}
      {hasWallTop && (
        <div 
          className="absolute top-0 left-0 right-0 z-20" 
          style={{ height: WALL_WIDTH, backgroundColor: WALL_COLOR }}
        >
          {/* Window marking in wall */}
          {hasWindowTop && (
            <div className="absolute inset-x-1/4 inset-y-0 flex gap-0.5 justify-center">
              <div className="w-1 h-full bg-blue-300" />
              <div className="w-1 h-full bg-blue-200" />
              <div className="w-1 h-full bg-blue-300" />
            </div>
          )}
        </div>
      )}
      {hasWallBottom && (
        <div 
          className="absolute bottom-0 left-0 right-0 z-20" 
          style={{ height: WALL_WIDTH, backgroundColor: WALL_COLOR }}
        >
          {hasWindowBottom && (
            <div className="absolute inset-x-1/4 inset-y-0 flex gap-0.5 justify-center">
              <div className="w-1 h-full bg-blue-300" />
              <div className="w-1 h-full bg-blue-200" />
              <div className="w-1 h-full bg-blue-300" />
            </div>
          )}
        </div>
      )}
      {hasWallLeft && (
        <div 
          className="absolute top-0 left-0 bottom-0 z-20" 
          style={{ width: WALL_WIDTH, backgroundColor: WALL_COLOR }}
        >
          {hasWindowLeft && (
            <div className="absolute inset-y-1/4 inset-x-0 flex flex-col gap-0.5 justify-center">
              <div className="h-1 w-full bg-blue-300" />
              <div className="h-1 w-full bg-blue-200" />
              <div className="h-1 w-full bg-blue-300" />
            </div>
          )}
        </div>
      )}
      {hasWallRight && (
        <div 
          className="absolute top-0 right-0 bottom-0 z-20" 
          style={{ width: WALL_WIDTH, backgroundColor: WALL_COLOR }}
        >
          {hasWindowRight && (
            <div className="absolute inset-y-1/4 inset-x-0 flex flex-col gap-0.5 justify-center">
              <div className="h-1 w-full bg-blue-300" />
              <div className="h-1 w-full bg-blue-200" />
              <div className="h-1 w-full bg-blue-300" />
            </div>
          )}
        </div>
      )}

      {/* Asset layer - non-connectable assets */}
      {cell.asset !== 'empty' && !isWindowCell && !isConnectableAsset && (
        <div className={cn(
          "absolute inset-1 flex items-center justify-center",
          isOccupiable ? "opacity-70" : "opacity-80"
        )}>
          <AssetIcon className="w-full h-full" />
        </div>
      )}
      
      {/* Table asset with connection support */}
      {isTableCell && (
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <TableIcon 
            className="w-full h-full" 
            connectedTop={hasTableTop}
            connectedBottom={hasTableBottom}
            connectedLeft={hasTableLeft}
            connectedRight={hasTableRight}
          />
        </div>
      )}
      
      {/* Bed asset with connection support */}
      {isBedCell && (
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          <BedIcon 
            className="w-full h-full" 
            connectedTop={hasBedTop}
            connectedBottom={hasBedBottom}
            connectedLeft={hasBedLeft}
            connectedRight={hasBedRight}
          />
        </div>
      )}
      
      {/* Sofa asset with connection support */}
      {isSofaCell && (
        <div className="absolute inset-0 flex items-center justify-center opacity-70">
          {isLonelySofa ? (
            <ArmchairAssetIcon className="w-full h-full" />
          ) : (
            <SofaIcon 
              className="w-full h-full" 
              connectedTop={hasSofaTop}
              connectedBottom={hasSofaBottom}
              connectedLeft={hasSofaLeft}
              connectedRight={hasSofaRight}
            />
          )}
        </div>
      )}
      
      {/* Suspect layer (overlay) */}
      {suspect && SuspectPortrait && (
        <div 
          className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden"
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
