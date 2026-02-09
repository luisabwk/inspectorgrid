import { Cell, Suspect, isCellOccupiable, CellRenderInfo } from "@/types/game";
import { cn } from "@/lib/utils";
import { AssetDirection, AssetIconMap } from "./assets/AssetIcons";
import { PortraitMap } from "./assets/SuspectPortraits";
import { assetDictionary } from "@/data/assetDictionary";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { TileSprite, TilesetKey } from "./assets/TileSprite";

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

  type TileCoord = { x: number; y: number };
  type TileSpan = { x: number; y: number };

  const getFurnitureTile = (): { tile: TileCoord; span?: TileSpan; rotation?: number; inset?: "inset-0" | "inset-1"; tileset?: TilesetKey } | null => {
    // Doors/windows remain as overlays for now
    if (isWallMarking) return null;
    if (displayAsset === "empty") return null;

    // All sprites use 2×2 tile regions for recognizable full items.
    // Items without a good tileset match return null → SVG fallback.
    const s2x2: TileSpan = { x: 2, y: 2 };

    switch (displayAsset) {
      // === Living room ===
      case "sofa":
        return null; // SVG fallback (no clear sofa in tileset)
      case "armchair":
        return null; // SVG fallback
      case "tv":
        // (4,6) 2×2 = TV stand/cabinet in inside tileset
        return { tile: { x: 4, y: 6 }, span: s2x2, inset: "inset-0" };
      case "bookshelf":
        // (2,12) 2×2 = bookshelf with colorful books
        return { tile: { x: 2, y: 12 }, span: s2x2, inset: "inset-0" };
      case "plant":
        return null; // SVG fallback (no plant in inside tileset)
      case "rug":
        // (12,14) 2×2 = pink rug/mat
        return { tile: { x: 12, y: 14 }, span: s2x2, inset: "inset-0" };

      // === Bedroom ===
      case "bed": {
        // Blue bed at (6,2) spans 3×2. Show 2×2 portions:
        const c = connections.bed;
        // Head (left end): headboard + pillow area
        if (c.right && !c.left) return { tile: { x: 6, y: 2 }, span: s2x2, inset: "inset-0" };
        // Foot (right end): middle + foot area
        if (c.left && !c.right) return { tile: { x: 7, y: 2 }, span: s2x2, inset: "inset-0" };
        // Single bed: show headboard
        return { tile: { x: 6, y: 2 }, span: s2x2, inset: "inset-0" };
      }

      // === Kitchen ===
      case "fridge":
        return null; // SVG fallback (no fridge in tileset)
      case "stove":
        // (0,2) 2×2 = cooktop/oven area
        return { tile: { x: 0, y: 2 }, span: s2x2, inset: "inset-0" };
      case "sink":
        // (2,10) 2×2 = bathroom sink/vanity with basin
        return { tile: { x: 2, y: 10 }, span: s2x2, inset: "inset-0" };
      case "chair":
        return null; // SVG fallback
      case "table": {
        // Orange counter at (0,0) spans 4×2. Show 2×2 portions:
        const c = connections.table;
        if (c.right && !c.left) return { tile: { x: 0, y: 0 }, span: s2x2, inset: "inset-0" };
        if (c.left && !c.right) return { tile: { x: 2, y: 0 }, span: s2x2, inset: "inset-0" };
        return { tile: { x: 0, y: 0 }, span: s2x2, inset: "inset-0" };
      }

      // === Bathroom ===
      case "toilet":
        return null; // SVG fallback (only 1×1 in tileset, too small)
      case "shower":
        // (4,4) 2×2 = purple curtain, works as shower curtain
        return { tile: { x: 4, y: 4 }, span: s2x2, inset: "inset-0" };

      // === Office ===
      case "desk": {
        // (0,12) 2×2 = writing desk with drawer
        return { tile: { x: 0, y: 12 }, span: s2x2, inset: "inset-0" };
      }
      case "computer":
        // (4,2) 2×2 = monitors/screens on desk
        return { tile: { x: 4, y: 2 }, span: s2x2, inset: "inset-0" };

      // Fallback (keeps non-mapped assets working via SVG)
      default:
        return null;
    }
  };

  const FallbackAssetIcon = !isWallMarking ? AssetIconMap[cell.asset] : AssetIconMap["empty"];
  const furnitureSprite = getFurnitureTile();

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

          {/* Furniture layer (tileset). Doors/windows remain as overlays above. */}
          {cell.asset !== "empty" && !isWallMarking && (
            <div
              className={cn(
                "absolute flex items-center justify-center",
                furnitureSprite?.inset ?? "inset-1",
                isOccupiable ? "opacity-80" : "opacity-90",
              )}
              style={{
                transform: furnitureSprite?.rotation ? `rotate(${furnitureSprite.rotation}deg)` : undefined,
                transformOrigin: "center",
              }}
            >
              {furnitureSprite ? (
                <TileSprite
                  tileX={furnitureSprite.tile.x}
                  tileY={furnitureSprite.tile.y}
                  spanX={furnitureSprite.span?.x}
                  spanY={furnitureSprite.span?.y}
                  tileset={furnitureSprite.tileset}
                  className="w-full h-full"
                />
              ) : (
                // Fallback to existing SVG icons for non-mapped assets
                <FallbackAssetIcon className="w-full h-full" />
              )}
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
