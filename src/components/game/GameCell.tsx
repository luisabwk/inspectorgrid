import { Cell, Suspect, isCellOccupiable, CellRenderInfo } from "@/types/game";
import { cn } from "@/lib/utils";
import {
  AssetDirection,
  AssetIconMap,
  BedIcon,
  SofaIcon,
  TableIcon,
  DeskIcon,
  StoveIcon,
  SinkIcon,
  ChairIcon,
  FridgeIcon,
} from "./assets/AssetIcons";
import { PortraitMap } from "./assets/SuspectPortraits";
import { assetDictionary } from "@/data/assetDictionary";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { useEffect, useState } from "react";
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

  // Never show the environment dictionary while positioning a suspect
  useEffect(() => {
    if (isPositioningSuspect && showInfo) setShowInfo(false);
  }, [isPositioningSuspect, showInfo]);

  // Classify the asset type for rendering
  const isWindowCell = cell.asset === 'window';
  const isDoorCell = cell.asset === 'door';
  const isWallMarking = isWindowCell || isDoorCell;
  const isOccupiable = isCellOccupiable(cell);

  // A lone sofa (no connections) renders as armchair
  const isSofaCell = cell.asset === 'sofa';
  const conn = connections.sofa;
  const isLonelySofa = isSofaCell && !conn.top && !conn.bottom && !conn.left && !conn.right;

  // Get asset info for dictionary popover
  const displayAsset = isLonelySofa ? 'armchair' : cell.asset;
  const assetInfo = assetDictionary[displayAsset];

  // Render the correct SVG icon with connection/rotation props
  const renderAssetIcon = () => {
    if (isWallMarking || displayAsset === "empty") return null;

    const iconClass = "w-full h-full";
    const dir = (rotation: number): AssetDirection => rotationToDirection(rotation);

    switch (displayAsset) {
      case 'bed':
        return <BedIcon className={iconClass}
          connectedTop={connections.bed.top} connectedBottom={connections.bed.bottom}
          connectedLeft={connections.bed.left} connectedRight={connections.bed.right} />;
      case 'sofa':
        return <SofaIcon className={iconClass}
          connectedTop={connections.sofa.top} connectedBottom={connections.sofa.bottom}
          connectedLeft={connections.sofa.left} connectedRight={connections.sofa.right} />;
      case 'table':
        return <TableIcon className={iconClass}
          connectedTop={connections.table.top} connectedBottom={connections.table.bottom}
          connectedLeft={connections.table.left} connectedRight={connections.table.right} />;
      case 'desk':
        return <DeskIcon className={iconClass}
          connectedTop={connections.desk.top} connectedBottom={connections.desk.bottom}
          connectedLeft={connections.desk.left} connectedRight={connections.desk.right} />;
      case 'stove':
        return <StoveIcon className={iconClass} direction={dir(renderInfo.applianceRotation)}
          connectedTop={connections.stove.top} connectedBottom={connections.stove.bottom}
          connectedLeft={connections.stove.left} connectedRight={connections.stove.right} />;
      case 'sink':
        return <SinkIcon className={iconClass} direction={dir(renderInfo.applianceRotation)}
          connectedTop={connections.sink.top} connectedBottom={connections.sink.bottom}
          connectedLeft={connections.sink.left} connectedRight={connections.sink.right} />;
      case 'chair':
        return <ChairIcon className={iconClass} direction={dir(renderInfo.chairRotation)} />;
      case 'fridge':
        return <FridgeIcon className={iconClass} direction={dir(renderInfo.applianceRotation)} />;
      default: {
        const Icon = AssetIconMap[displayAsset];
        return Icon ? <Icon className={iconClass} /> : null;
      }
    }
  };

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
      <PopoverAnchor asChild>
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

          {/* Furniture layer (SVG icons with connection/rotation awareness) */}
          {cell.asset !== "empty" && !isWallMarking && (
            <div
              className={cn(
                "absolute flex items-center justify-center inset-1",
                isOccupiable ? "opacity-80" : "opacity-90",
              )}
            >
              {renderAssetIcon()}
            </div>
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
      </PopoverAnchor>

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

  return (
    <>
      {/* Wall line */}
      <div
        className={`absolute ${positionClass} z-20 pointer-events-none`}
        style={isHorizontal ? { height: wallWidth, backgroundColor: wallColor } : { width: wallWidth, backgroundColor: wallColor }}
      />

      {/* Window */}
      {hasWindow && (
        <div
          className={cn(
            "absolute z-[21] pointer-events-none",
            isHorizontal ? "left-[15%] w-[70%] h-[22%]" : "top-[15%] h-[70%] w-[22%]",
            side === "top" && "top-0",
            side === "bottom" && "bottom-0",
            side === "left" && "left-0",
            side === "right" && "right-0",
          )}
        >
          <div className={cn("w-full h-full bg-amber-800 flex items-center justify-center", !isHorizontal && "flex-col")} style={{ padding: "1px" }}>
            <div className={cn("w-full h-full flex gap-[1px]", !isHorizontal && "flex-col")}>
              <div className="flex-1 bg-sky-300" />
              <div className="flex-1 bg-sky-200" />
            </div>
          </div>
        </div>
      )}

      {/* Door */}
      {hasDoor && (
        <div
          className={cn(
            "absolute z-[21] pointer-events-none",
            isHorizontal ? "left-[20%] w-[60%] h-[26%]" : "top-[20%] h-[60%] w-[26%]",
            side === "top" && "top-0",
            side === "bottom" && "bottom-0",
            side === "left" && "left-0",
            side === "right" && "right-0",
          )}
        >
          <div
            className={cn(
              "w-full h-full bg-amber-900 flex",
              isHorizontal ? "border-x border-amber-950 items-center justify-end" : "border-y border-amber-950 flex-col items-end justify-center",
            )}
            style={isHorizontal ? { paddingRight: "2px" } : { paddingBottom: "2px" }}
          >
            <div className={cn(isHorizontal ? "w-[3px] h-[35%]" : "h-[3px] w-[35%]", "bg-yellow-500 rounded-sm")} />
          </div>
        </div>
      )}
    </>
  );
};
