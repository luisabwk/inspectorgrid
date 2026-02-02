import { Cell, Suspect, isCellOccupiable, getCellKey, AssetType } from "@/types/game";
import { cn } from "@/lib/utils";
import { 
  AssetIconMap, 
  TableIcon, 
  BedIcon, 
  SofaIcon, 
  DeskIcon, 
  ChairIcon, 
  FridgeIcon, 
  StoveIcon, 
  SinkIcon,
  AssetDirection 
} from "./assets/AssetIcons";
import { PortraitMap } from "./assets/SuspectPortraits";
import { assetDictionary } from "@/data/assetDictionary";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Check, X } from "lucide-react";

// Helper to convert rotation degrees to direction
const rotationToDirection = (rotation: number): AssetDirection => {
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  if (normalizedRotation === 0) return 'down';
  if (normalizedRotation === 90) return 'left';
  if (normalizedRotation === 180) return 'up';
  if (normalizedRotation === 270) return 'right';
  return 'down'; // default
};

interface GameCellProps {
  cell: Cell;
  suspect: Suspect | null;
  pencilMarks: string[];
  suspects: Suspect[];
  isSelected: boolean;
  isHighlighted: boolean;
  isPencilMode: boolean;
  roomColor?: string;
  // Latin square blocking - cell is blocked by another suspect in same row/col
  isBlockedByPlacement: boolean;
  // Conflict - this cell has a suspect in a blocked position
  hasConflict: boolean;
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
  // Door positions
  hasDoorTop: boolean;
  hasDoorRight: boolean;
  hasDoorBottom: boolean;
  hasDoorLeft: boolean;
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
  // Adjacent desk connections
  hasDeskTop: boolean;
  hasDeskBottom: boolean;
  hasDeskLeft: boolean;
  hasDeskRight: boolean;
  // Adjacent stove connections
  hasStoveTop: boolean;
  hasStoveBottom: boolean;
  hasStoveLeft: boolean;
  hasStoveRight: boolean;
  // Adjacent sink connections
  hasSinkTop: boolean;
  hasSinkBottom: boolean;
  hasSinkLeft: boolean;
  hasSinkRight: boolean;
  // Rotation for dynamic assets
  chairRotation: number;
  applianceRotation: number;
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
  isBlockedByPlacement,
  hasConflict,
  hasWallTop,
  hasWallRight,
  hasWallBottom,
  hasWallLeft,
  hasWindowTop,
  hasWindowRight,
  hasWindowBottom,
  hasWindowLeft,
  hasDoorTop,
  hasDoorRight,
  hasDoorBottom,
  hasDoorLeft,
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
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameCellProps) => {
  const [showInfo, setShowInfo] = useState(false);
  
  // Window and door cells are occupiable but don't show an icon - they're wall markings
  const isWindowCell = cell.asset === 'window';
  const isDoorCell = cell.asset === 'door';
  const isTableCell = cell.asset === 'table';
  const isBedCell = cell.asset === 'bed';
  const isSofaCell = cell.asset === 'sofa';
  const isDeskCell = cell.asset === 'desk';
  const isChairCell = cell.asset === 'chair';
  const isComputerCell = cell.asset === 'computer';
  const isFridgeCell = cell.asset === 'fridge';
  const isStoveCell = cell.asset === 'stove';
  const isSinkCell = cell.asset === 'sink';
  const isApplianceCell = isSinkCell || isStoveCell || isFridgeCell;
  const isLonelySofa =
    isSofaCell &&
    !hasSofaTop &&
    !hasSofaBottom &&
    !hasSofaLeft &&
    !hasSofaRight;
  // Stove and sink are now connectable like table/bed
  const isConnectableCounter = isStoveCell || isSinkCell;
  const isConnectableAsset = isTableCell || isBedCell || isSofaCell || isDeskCell || isConnectableCounter;
  const isRotatableAsset = isChairCell || isFridgeCell; // Only fridge is purely rotatable now
  const isWallMarking = isWindowCell || isDoorCell;
  const isOccupiable = isCellOccupiable(cell);
  // Computer is handled separately - it overlays on desk/table
  const AssetIcon = !isWallMarking && !isConnectableAsset && !isRotatableAsset && !isComputerCell ? AssetIconMap[cell.asset] : AssetIconMap['empty'];
  const ComputerIcon = AssetIconMap['computer'];
  const ArmchairAssetIcon = AssetIconMap['armchair'];
  
  // Get asset info from dictionary - handle lonely sofa as armchair
  const displayAsset = isLonelySofa ? 'armchair' : cell.asset;
  const assetInfo = assetDictionary[displayAsset];
  
  const handleClick = () => {
    if (isOccupiable) {
      onCellClick(cell.row, cell.col);
    }
  };
  
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInfo(true);
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
    <Popover open={showInfo} onOpenChange={setShowInfo}>
      <PopoverTrigger asChild>
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
          onDoubleClick={handleDoubleClick}
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
          {/* Door marking in wall */}
          {hasDoorTop && (
            <div className="absolute inset-x-1/4 inset-y-0 flex justify-center items-center">
              <div className="w-[40%] h-full bg-amber-700" />
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
          {/* Door marking in wall */}
          {hasDoorBottom && (
            <div className="absolute inset-x-1/4 inset-y-0 flex justify-center items-center">
              <div className="w-[40%] h-full bg-amber-700" />
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
          {/* Door marking in wall */}
          {hasDoorLeft && (
            <div className="absolute inset-y-1/4 inset-x-0 flex flex-col justify-center items-center">
              <div className="h-[40%] w-full bg-amber-700" />
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
          {/* Door marking in wall */}
          {hasDoorRight && (
            <div className="absolute inset-y-1/4 inset-x-0 flex flex-col justify-center items-center">
              <div className="h-[40%] w-full bg-amber-700" />
            </div>
          )}
        </div>
      )}

      {/* Asset layer - non-connectable, non-rotatable assets */}
      {cell.asset !== 'empty' && !isWallMarking && !isConnectableAsset && !isRotatableAsset && (
        <div className={cn(
          "absolute inset-1 flex items-center justify-center",
          isOccupiable ? "opacity-70" : "opacity-80"
        )}>
          <AssetIcon className="w-full h-full" />
        </div>
      )}
      
      {/* Directional assets - Chair */}
      {isChairCell && (
        <div className="absolute inset-1 flex items-center justify-center opacity-70">
          <ChairIcon className="w-full h-full" direction={rotationToDirection(chairRotation)} />
        </div>
      )}
      
      {/* Directional assets - Fridge only (stove/sink are connectable now) */}
      {isFridgeCell && (
        <div className="absolute inset-1 flex items-center justify-center opacity-80">
          <FridgeIcon className="w-full h-full" direction={rotationToDirection(applianceRotation)} />
        </div>
      )}
      
      {/* Stove with connection support */}
      {isStoveCell && (
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <StoveIcon 
            className="w-full h-full" 
            direction={rotationToDirection(applianceRotation)}
            connectedTop={hasStoveTop}
            connectedBottom={hasStoveBottom}
            connectedLeft={hasStoveLeft}
            connectedRight={hasStoveRight}
          />
        </div>
      )}
      
      {/* Sink with connection support */}
      {isSinkCell && (
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <SinkIcon 
            className="w-full h-full" 
            direction={rotationToDirection(applianceRotation)}
            connectedTop={hasSinkTop}
            connectedBottom={hasSinkBottom}
            connectedLeft={hasSinkLeft}
            connectedRight={hasSinkRight}
          />
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
      
      {/* Desk asset with connection support */}
      {isDeskCell && (
        <div className="absolute inset-0 flex items-center justify-center opacity-80">
          <DeskIcon 
            className="w-full h-full" 
            connectedTop={hasDeskTop}
            connectedBottom={hasDeskBottom}
            connectedLeft={hasDeskLeft}
            connectedRight={hasDeskRight}
          />
        </div>
      )}
      
      {/* Computer overlay - always renders on top of desk/table in the same cell */}
      {isComputerCell && (
        <>
          {/* Base surface - use table if adjacent to tables, otherwise desk */}
          {(hasTableTop || hasTableBottom || hasTableLeft || hasTableRight) ? (
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <TableIcon 
                className="w-full h-full" 
                connectedTop={hasTableTop}
                connectedBottom={hasTableBottom}
                connectedLeft={hasTableLeft}
                connectedRight={hasTableRight}
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <DeskIcon 
                className="w-full h-full" 
                connectedTop={hasDeskTop}
                connectedBottom={hasDeskBottom}
                connectedLeft={hasDeskLeft}
                connectedRight={hasDeskRight}
              />
            </div>
          )}
          {/* Computer on top */}
          <div className="absolute inset-2 flex items-center justify-center opacity-90 z-[5]">
            <ComputerIcon className="w-full h-full" />
          </div>
        </>
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
      
      {/* Blocked indicator - asset not occupiable */}
      {!isOccupiable && (
        <div className="absolute inset-0 bg-foreground/5 pointer-events-none" />
      )}
      
      {/* Latin square block indicator - X for blocked row/col */}
      {isBlockedByPlacement && !suspect && isOccupiable && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[8]">
          <X className="w-3/5 h-3/5 text-red-500 opacity-30" strokeWidth={3} />
        </div>
      )}
      
      {/* Conflict indicator - suspect placed in blocked position */}
      {hasConflict && suspect && (
        <div className="absolute inset-0 ring-2 ring-red-500 ring-inset pointer-events-none z-[15] animate-pulse" />
      )}
        </div>
      </PopoverTrigger>
      
      <PopoverContent side="top" className="w-64 p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm">{assetInfo.name}</h4>
            {assetInfo.canOccupy ? (
              <span className="flex items-center gap-1 text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                <Check className="w-3 h-3" />
                Ocupável
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                <X className="w-3 h-3" />
                Bloqueado
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{assetInfo.description}</p>
          <p className="text-xs text-foreground/80 italic">{assetInfo.occupyReason}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};
