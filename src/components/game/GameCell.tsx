import { Cell, Suspect, isCellOccupiable, CellRenderInfo } from "@/types/game";
import { AssetDirection } from "./assets/AssetIcons";
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
} from "./assets/AssetIcons";
import { PortraitMap } from "./assets/SuspectPortraits";
import { assetDictionary } from "@/data/assetDictionary";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Check, X } from "lucide-react";

// Convert rotation degrees to direction
const rotationToDirection = (rotation: number): AssetDirection => {
  const normalized = ((rotation % 360) + 360) % 360;
  if (normalized === 0) return 'down';
  if (normalized === 90) return 'left';
  if (normalized === 180) return 'up';
  if (normalized === 270) return 'right';
  return 'down';
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
  isPositioningSuspect: boolean;
  isBlockedByPlacement: boolean;
  hasConflict: boolean;
  renderInfo: CellRenderInfo;
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
  isPositioningSuspect,
  isBlockedByPlacement,
  hasConflict,
  renderInfo,
  onCellClick,
  onCellDrop,
  onDragOver,
}: GameCellProps) => {
  const [showInfo, setShowInfo] = useState(false);

  const { walls, windows, doors, connections } = renderInfo;

  // Classify the asset type for rendering
  const isWindowCell = cell.asset === 'window';
  const isDoorCell = cell.asset === 'door';
  const isWallMarking = isWindowCell || isDoorCell;
  const isOccupiable = isCellOccupiable(cell);

  // Connectable assets: rendered with connection-aware components
  const isTableCell = cell.asset === 'table';
  const isBedCell = cell.asset === 'bed';
  const isSofaCell = cell.asset === 'sofa';
  const isDeskCell = cell.asset === 'desk';
  const isStoveCell = cell.asset === 'stove';
  const isSinkCell = cell.asset === 'sink';
  const isConnectableCounter = isStoveCell || isSinkCell;
  const isConnectableAsset = isTableCell || isBedCell || isSofaCell || isDeskCell || isConnectableCounter;

  // Rotatable assets: chair and fridge
  const isChairCell = cell.asset === 'chair';
  const isFridgeCell = cell.asset === 'fridge';
  const isRotatableAsset = isChairCell || isFridgeCell;

  // Computer overlays on desk
  const isComputerCell = cell.asset === 'computer';

  // A lone sofa (no connections) renders as armchair
  const conn = connections.sofa;
  const isLonelySofa = isSofaCell && !conn.top && !conn.bottom && !conn.left && !conn.right;

  // Get asset info for dictionary popover
  const displayAsset = isLonelySofa ? 'armchair' : cell.asset;
  const assetInfo = assetDictionary[displayAsset];

  // Icon for non-connectable, non-rotatable, non-wall assets
  const AssetIcon = !isWallMarking && !isConnectableAsset && !isRotatableAsset && !isComputerCell
    ? AssetIconMap[cell.asset]
    : AssetIconMap['empty'];
  const ComputerIcon = AssetIconMap['computer'];
  const ArmchairAssetIcon = AssetIconMap['armchair'];

  const handleClick = () => {
    if (showInfo) setShowInfo(false);
    if (isOccupiable) onCellClick(cell.row, cell.col);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (suspect || isPositioningSuspect) return;
    e.preventDefault();
    e.stopPropagation();
    setShowInfo(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (isOccupiable) onCellDrop(cell.row, cell.col);
  };

  // Pencil mark suspects
  const pencilSuspects = pencilMarks
    .map(id => suspects.find(s => s.id === id))
    .filter(Boolean) as Suspect[];

  const SuspectPortrait = suspect ? PortraitMap[suspect.portraitId] : null;

  const WALL_WIDTH = '3px';
  const WALL_COLOR = 'hsl(var(--foreground) / 0.7)';

  return (
    <Popover open={showInfo} onOpenChange={setShowInfo}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "relative aspect-square flex items-center justify-center transition-all duration-100",
            "border-r border-b border-foreground/20",
            isOccupiable ? "cursor-pointer hover:brightness-95" : "cursor-not-allowed",
            isSelected && "ring-2 ring-primary ring-inset",
            isHighlighted && !isSelected && "brightness-[0.92]",
          )}
          style={{
            backgroundColor: roomColor || 'hsl(var(--muted))',
            imageRendering: 'pixelated',
          }}
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          onDrop={handleDrop}
          onDragOver={onDragOver}
        >
          {/* Wall overlays */}
          <WallOverlay side="top" visible={walls.top} window={windows.top} door={doors.top} wallWidth={WALL_WIDTH} wallColor={WALL_COLOR} />
          <WallOverlay side="bottom" visible={walls.bottom} window={windows.bottom} door={doors.bottom} wallWidth={WALL_WIDTH} wallColor={WALL_COLOR} />
          <WallOverlay side="left" visible={walls.left} window={windows.left} door={doors.left} wallWidth={WALL_WIDTH} wallColor={WALL_COLOR} />
          <WallOverlay side="right" visible={walls.right} window={windows.right} door={doors.right} wallWidth={WALL_WIDTH} wallColor={WALL_COLOR} />

          {/* Asset layer - non-connectable, non-rotatable */}
          {cell.asset !== 'empty' && !isWallMarking && !isConnectableAsset && !isRotatableAsset && (
            <div className={cn("absolute inset-1 flex items-center justify-center", isOccupiable ? "opacity-70" : "opacity-80")}>
              <AssetIcon className="w-full h-full" />
            </div>
          )}

          {/* Chair (rotatable) */}
          {isChairCell && (
            <div className="absolute inset-1 flex items-center justify-center opacity-70">
              <ChairIcon className="w-full h-full" direction={rotationToDirection(renderInfo.chairRotation)} />
            </div>
          )}

          {/* Fridge (rotatable) */}
          {isFridgeCell && (
            <div className="absolute inset-1 flex items-center justify-center opacity-80">
              <FridgeIcon className="w-full h-full" direction={rotationToDirection(renderInfo.applianceRotation)} />
            </div>
          )}

          {/* Stove (connectable counter) */}
          {isStoveCell && (
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <StoveIcon
                className="w-full h-full"
                direction={rotationToDirection(renderInfo.applianceRotation)}
                connectedTop={connections.stove.top}
                connectedBottom={connections.stove.bottom}
                connectedLeft={connections.stove.left}
                connectedRight={connections.stove.right}
              />
            </div>
          )}

          {/* Sink (connectable counter) */}
          {isSinkCell && (
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <SinkIcon
                className="w-full h-full"
                direction={rotationToDirection(renderInfo.applianceRotation)}
                connectedTop={connections.sink.top}
                connectedBottom={connections.sink.bottom}
                connectedLeft={connections.sink.left}
                connectedRight={connections.sink.right}
              />
            </div>
          )}

          {/* Table (connectable) */}
          {isTableCell && (
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <TableIcon
                className="w-full h-full"
                connectedTop={connections.table.top}
                connectedBottom={connections.table.bottom}
                connectedLeft={connections.table.left}
                connectedRight={connections.table.right}
              />
            </div>
          )}

          {/* Bed (connectable) */}
          {isBedCell && (
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <BedIcon
                className="w-full h-full"
                connectedTop={connections.bed.top}
                connectedBottom={connections.bed.bottom}
                connectedLeft={connections.bed.left}
                connectedRight={connections.bed.right}
              />
            </div>
          )}

          {/* Sofa (connectable, or armchair if alone) */}
          {isSofaCell && (
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              {isLonelySofa ? (
                <ArmchairAssetIcon className="w-full h-full" />
              ) : (
                <SofaIcon
                  className="w-full h-full"
                  connectedTop={connections.sofa.top}
                  connectedBottom={connections.sofa.bottom}
                  connectedLeft={connections.sofa.left}
                  connectedRight={connections.sofa.right}
                />
              )}
            </div>
          )}

          {/* Desk (connectable) */}
          {isDeskCell && (
            <div className="absolute inset-0 flex items-center justify-center opacity-80">
              <DeskIcon
                className="w-full h-full"
                connectedTop={connections.desk.top}
                connectedBottom={connections.desk.bottom}
                connectedLeft={connections.desk.left}
                connectedRight={connections.desk.right}
              />
            </div>
          )}

          {/* Computer overlays on desk */}
          {isComputerCell && (
            <>
              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                <DeskIcon
                  className="w-full h-full"
                  connectedTop={connections.desk.top}
                  connectedBottom={connections.desk.bottom}
                  connectedLeft={connections.desk.left}
                  connectedRight={connections.desk.right}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-[5]" style={{ padding: '20%' }}>
                <ComputerIcon className="w-full h-full opacity-95" />
              </div>
            </>
          )}

          {/* Suspect portrait */}
          {suspect && SuspectPortrait && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10 overflow-hidden"
              style={{
                backgroundColor: `${suspect.color.replace(')', ' / 0.15)').replace('hsl(', 'hsla(')}`,
              }}
            >
              <div className="w-4/5 h-4/5 drop-shadow-md" title={suspect.name} style={{ color: suspect.color }}>
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
                  <div key={s.id} className="flex items-center justify-center opacity-50" title={s.name} style={{ color: s.color }}>
                    {MiniPortrait && <MiniPortrait className="w-full h-full" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Non-occupiable overlay */}
          {!isOccupiable && (
            <div className="absolute inset-0 bg-foreground/5 pointer-events-none" />
          )}

          {/* Latin square block indicator */}
          {isBlockedByPlacement && !suspect && isOccupiable && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[8]">
              <X className="w-3/5 h-3/5 text-red-500 opacity-30" strokeWidth={3} />
            </div>
          )}

          {/* Conflict indicator */}
          {hasConflict && suspect && (
            <div className="absolute inset-0 ring-2 ring-red-500 ring-inset pointer-events-none z-[15] animate-pulse" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent side="top" className="pixel-card w-64 p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-pixel text-base font-bold">{assetInfo.name}</h4>
            {assetInfo.canOccupy ? (
              <span className="flex items-center gap-1 text-xs font-pixel text-green-700 bg-green-100 px-2 py-0.5">
                <Check className="w-3 h-3" />
                Ocupavel
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-pixel text-red-700 bg-red-100 px-2 py-0.5">
                <X className="w-3 h-3" />
                Bloqueado
              </span>
            )}
          </div>
          <p className="text-xs font-pixel text-muted-foreground">{assetInfo.description}</p>
          <p className="text-xs font-pixel text-foreground/80 italic">{assetInfo.occupyReason}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Wall overlay sub-component to reduce repetition
interface WallOverlayProps {
  side: 'top' | 'bottom' | 'left' | 'right';
  visible: boolean;
  window: boolean;
  door: boolean;
  wallWidth: string;
  wallColor: string;
}

const WallOverlay = ({ side, visible, window: hasWindow, door: hasDoor, wallWidth, wallColor }: WallOverlayProps) => {
  if (!visible) return null;

  const isHorizontal = side === 'top' || side === 'bottom';
  const positionClass = {
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
    left: 'top-0 left-0 bottom-0',
    right: 'top-0 right-0 bottom-0',
  }[side];

  const sizeStyle = isHorizontal
    ? { height: wallWidth, backgroundColor: wallColor }
    : { width: wallWidth, backgroundColor: wallColor };

  return (
    <div className={`absolute ${positionClass} z-20`} style={sizeStyle}>
      {hasWindow && (
        <div className={`absolute ${isHorizontal ? 'inset-x-[15%] inset-y-0' : 'inset-y-[15%] inset-x-0'} flex items-center justify-center`}>
          <div
            className={`w-full h-full bg-amber-800 flex ${isHorizontal ? '' : 'flex-col'} items-center justify-center`}
            style={{ padding: '0.5px' }}
          >
            <div className={`w-full h-full flex ${isHorizontal ? '' : 'flex-col'} gap-[1px]`}>
              <div className="flex-1 bg-sky-300" />
              <div className="flex-1 bg-sky-200" />
            </div>
          </div>
        </div>
      )}
      {hasDoor && (
        <div className={`absolute ${isHorizontal ? 'inset-x-[20%] inset-y-0' : 'inset-y-[20%] inset-x-0'}`}>
          <div
            className={`w-full h-full bg-amber-900 ${isHorizontal ? 'border-x border-amber-950 flex items-center justify-end' : 'border-y border-amber-950 flex flex-col items-end justify-center'}`}
            style={isHorizontal ? { paddingRight: '1px' } : { paddingBottom: '1px' }}
          >
            <div
              className={`${isHorizontal ? 'w-[2px] h-[35%]' : 'h-[2px] w-[35%]'} bg-yellow-500 rounded-sm`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
