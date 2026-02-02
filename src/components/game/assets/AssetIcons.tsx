import { AssetType } from "@/types/game";

interface AssetIconProps {
  className?: string;
}

// Direction type for rotatable assets (exported for use in other components)
export type AssetDirection = 'down' | 'up' | 'left' | 'right';

export interface DirectionalAssetProps {
  className?: string;
  direction?: AssetDirection;
}

// Connectable asset props
interface ConnectableAssetProps {
  className?: string;
  connectedTop?: boolean;
  connectedBottom?: boolean;
  connectedLeft?: boolean;
  connectedRight?: boolean;
}

// 60-degree perspective bed with connection support
// Convention: headboard = top (vertical) or left (horizontal), footboard = bottom or right
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const isVerticalBed = connectedTop || connectedBottom;
  const isHorizontalBed = connectedLeft || connectedRight;
  
  const isHeadVertical = !connectedTop && connectedBottom;
  const isFootVertical = connectedTop && !connectedBottom;
  const isHeadHorizontal = !connectedLeft && connectedRight;
  const isFootHorizontal = connectedLeft && !connectedRight;
  
  const isHead = isHeadVertical || isHeadHorizontal;
  const isFoot = isFootVertical || isFootHorizontal;
  const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
  
  const topY = connectedTop ? 0 : 6;
  const bottomY = connectedBottom ? 48 : 38;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;

  const mattressInsetLeft = connectedLeft ? 0 : 2;
  const mattressInsetRight = connectedRight ? 0 : 2;
  const mattressInsetTop = connectedTop ? 0 : 2;
  const mattressInsetBottom = connectedBottom ? 0 : 2;
  const mattressX = leftX + mattressInsetLeft;
  const mattressY = topY + mattressInsetTop;
  const mattressW = (rightX - leftX) - mattressInsetLeft - mattressInsetRight;
  const mattressH = (bottomY - topY) - mattressInsetTop - mattressInsetBottom;
  
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs - darker */}
      {(isSingle || (isVerticalBed && isHead) || (isHorizontalBed && isHead)) && !connectedTop && !connectedLeft && (
        <rect x="6" y="4" width="3" height="8" fill="#4A3D30" />
      )}
      {(isSingle || (isVerticalBed && isHead) || (isHorizontalBed && isFoot)) && !connectedTop && !connectedRight && (
        <rect x="39" y="4" width="3" height="8" fill="#4A3D30" />
      )}
      
      {/* Front legs - lighter */}
      {(isSingle || (isVerticalBed && isFoot) || (isHorizontalBed && isHead)) && !connectedBottom && !connectedLeft && (
        <rect x="6" y="38" width="3" height="8" fill="#5A4A3A" />
      )}
      {(isSingle || (isVerticalBed && isFoot) || (isHorizontalBed && isFoot)) && !connectedBottom && !connectedRight && (
        <rect x="39" y="38" width="3" height="8" fill="#5A4A3A" />
      )}
      
      {/* Bed frame - top surface */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={bottomY - topY} fill="#8B7355" />
      
      {/* Mattress */}
      <rect x={mattressX} y={mattressY} width={mattressW} height={mattressH} fill="#F5EDE3" />
      
      {/* Pillows - only on head cell or single bed */}
      {(isHead || isSingle) && (
        <>
          {isHorizontalBed ? (
            <>
              <rect x={leftX + 4} y={topY + 4} width="6" height="12" rx="1" fill="#E8DDD0" stroke="#D4C4B0" strokeWidth="1" />
              <rect x={leftX + 4} y={bottomY - 16} width="6" height="12" rx="1" fill="#E8DDD0" stroke="#D4C4B0" strokeWidth="1" />
            </>
          ) : (
            <>
              <rect x={leftX + 4} y={topY + 4} width="14" height="6" rx="1" fill="#E8DDD0" stroke="#D4C4B0" strokeWidth="1" />
              <rect x={rightX - 18} y={topY + 4} width="14" height="6" rx="1" fill="#E8DDD0" stroke="#D4C4B0" strokeWidth="1" />
            </>
          )}
        </>
      )}
      
      {/* Blanket */}
      {isHorizontalBed ? (
        <rect 
          x={isHead ? leftX + 14 : mattressX} 
          y={mattressY} 
          width={isHead ? mattressW - 12 : mattressW} 
          height={mattressH} 
          fill="#C4A574" 
          stroke="#A08050"
          strokeWidth="1"
        />
      ) : (
        <rect 
          x={mattressX} 
          y={isHead || isSingle ? topY + 12 : mattressY} 
          width={mattressW} 
          height={isHead || isSingle ? mattressH - 10 : mattressH} 
          fill="#C4A574" 
          stroke="#A08050"
          strokeWidth="1"
        />
      )}
      
      {/* Frame front edge */}
      {(isFoot || isSingle) && !connectedBottom && !connectedRight && (
        <>
          {isHorizontalBed ? (
            <rect x={rightX - 3} y={topY} width="3" height={bottomY - topY} fill="#6B5A48" />
          ) : (
            <rect x={leftX} y={bottomY} width={rightX - leftX} height="3" fill="#6B5A48" />
          )}
        </>
      )}
      
      {/* Frame border */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={bottomY - topY} fill="none" stroke="#6B5A48" strokeWidth="1" />
    </svg>
  );
};

// 60-degree perspective sofa with connection support
export const SofaIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const topY = connectedTop ? 6 : 8;
  const bottomY = connectedBottom ? 38 : 36;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;
  
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs - darker */}
      {!connectedTop && !connectedLeft && (
        <rect x="6" y="6" width="3" height="8" fill="#4A3D30" />
      )}
      {!connectedTop && !connectedRight && (
        <rect x="39" y="6" width="3" height="8" fill="#4A3D30" />
      )}
      {/* Front legs - lighter */}
      {!connectedBottom && !connectedLeft && (
        <rect x="6" y="36" width="3" height="8" fill="#5A4A3A" />
      )}
      {!connectedBottom && !connectedRight && (
        <rect x="39" y="36" width="3" height="8" fill="#5A4A3A" />
      )}
      
      {/* Backrest */}
      {!connectedTop && (
        <>
          <rect x={leftX} y={topY} width={rightX - leftX} height="8" fill="#8B7AA8" stroke="#6B5A8C" strokeWidth="1" />
          <rect x={leftX} y={topY + 8} width={rightX - leftX} height="4" fill="#7B68A0" />
        </>
      )}
      
      {/* Seat cushion */}
      <rect 
        x={leftX} 
        y={connectedTop ? topY : topY + 12} 
        width={rightX - leftX} 
        height={connectedTop ? bottomY - topY - 2 : bottomY - topY - 14} 
        fill="#9B8AB8" 
        stroke="#7B68A0" 
        strokeWidth="1"
      />
      
      {/* Front face */}
      {!connectedBottom && (
        <rect x={leftX} y={bottomY - 2} width={rightX - leftX} height="3" fill="#6B5A8C" />
      )}
      
      {/* Armrests */}
      {!connectedLeft && (
        <>
          <rect x={leftX} y={connectedTop ? topY : topY + 8} width="6" height={connectedTop ? bottomY - topY - 2 : bottomY - topY - 10} fill="#8B7AA8" stroke="#6B5A8C" strokeWidth="1" />
          {!connectedBottom && <rect x={leftX} y={bottomY - 2} width="6" height="3" fill="#5A4A7A" />}
        </>
      )}
      {!connectedRight && (
        <>
          <rect x={rightX - 6} y={connectedTop ? topY : topY + 8} width="6" height={connectedTop ? bottomY - topY - 2 : bottomY - topY - 10} fill="#8B7AA8" stroke="#6B5A8C" strokeWidth="1" />
          {!connectedBottom && <rect x={rightX - 6} y={bottomY - 2} width="6" height="3" fill="#5A4A7A" />}
        </>
      )}
    </svg>
  );
};

export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back legs - darker */}
    <rect x="10" y="6" width="3" height="8" fill="#4A3D30" />
    <rect x="35" y="6" width="3" height="8" fill="#4A3D30" />
    {/* Front legs - lighter */}
    <rect x="10" y="36" width="3" height="8" fill="#5A4A3A" />
    <rect x="35" y="36" width="3" height="8" fill="#5A4A3A" />
    
    {/* Backrest */}
    <rect x="10" y="8" width="28" height="8" fill="#7B9A8D" stroke="#5A7D6A" strokeWidth="1" />
    <rect x="10" y="16" width="28" height="4" fill="#6B8E7B" />
    
    {/* Seat cushion */}
    <rect x="10" y="20" width="28" height="14" fill="#8BAA9B" stroke="#6B8E7B" strokeWidth="1" />
    {/* Front face */}
    <rect x="10" y="34" width="28" height="3" fill="#5A7D6A" />
    
    {/* Armrests */}
    <rect x="6" y="16" width="6" height="18" fill="#7B9A8D" stroke="#5A7D6A" strokeWidth="1" />
    <rect x="36" y="16" width="6" height="18" fill="#7B9A8D" stroke="#5A7D6A" strokeWidth="1" />
    {/* Armrests front */}
    <rect x="6" y="34" width="6" height="3" fill="#4A6D5A" />
    <rect x="36" y="34" width="6" height="3" fill="#4A6D5A" />
  </svg>
);

// 60-degree perspective rug
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rug base */}
    <rect x="4" y="8" width="40" height="28" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
    {/* Front edge */}
    <rect x="4" y="36" width="40" height="2" fill="#8B7355" />
    {/* Inner pattern */}
    <rect x="8" y="12" width="32" height="20" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
    {/* Center medallion */}
    <ellipse cx="24" cy="22" rx="8" ry="6" fill="#E8DDD0" stroke="#C4A574" strokeWidth="1" />
    <ellipse cx="24" cy="22" rx="5" ry="4" fill="#C4A574" />
    {/* Corner decorations */}
    <rect x="10" y="14" width="4" height="4" fill="#A08050" />
    <rect x="34" y="14" width="4" height="4" fill="#A08050" />
    <rect x="10" y="26" width="4" height="4" fill="#A08050" />
    <rect x="34" y="26" width="4" height="4" fill="#A08050" />
  </svg>
);

export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="2" fill="#E8E4E0" stroke="#8B7355" strokeWidth="2" />
    <rect x="10" y="10" width="13" height="13" fill="#A8D4E6" />
    <rect x="25" y="10" width="13" height="13" fill="#A8D4E6" />
    <rect x="10" y="25" width="13" height="13" fill="#A8D4E6" />
    <rect x="25" y="25" width="13" height="13" fill="#A8D4E6" />
    <line x1="24" y1="10" x2="24" y2="38" stroke="#8B7355" strokeWidth="2" />
    <line x1="10" y1="24" x2="38" y2="24" stroke="#8B7355" strokeWidth="2" />
  </svg>
);

// 60-degree perspective plant with pot
export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pot body */}
    <rect x="14" y="28" width="20" height="14" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
    {/* Pot rim */}
    <rect x="12" y="26" width="24" height="4" fill="#D4B584" stroke="#8B7355" strokeWidth="1" />
    {/* Pot front face */}
    <rect x="14" y="42" width="20" height="2" fill="#8B7355" />
    {/* Soil */}
    <ellipse cx="24" cy="28" rx="8" ry="2" fill="#5A4030" stroke="#4A3020" strokeWidth="1" />
    {/* Foliage layers */}
    <ellipse cx="24" cy="14" rx="6" ry="8" fill="#5A8A6A" stroke="#4A7A5A" strokeWidth="1" />
    <ellipse cx="18" cy="18" rx="5" ry="6" fill="#6A9A7A" stroke="#5A8A6A" strokeWidth="1" />
    <ellipse cx="30" cy="18" rx="5" ry="6" fill="#6A9A7A" stroke="#5A8A6A" strokeWidth="1" />
    <ellipse cx="24" cy="20" rx="7" ry="5" fill="#7AAA8A" stroke="#6A9A7A" strokeWidth="1" />
    <ellipse cx="21" cy="16" rx="3" ry="4" fill="#8ABA9A" />
    <ellipse cx="27" cy="16" rx="3" ry="4" fill="#8ABA9A" />
  </svg>
);

// Near-aerial table view with visible legs - supports connection to adjacent tables
interface TableIconProps {
  className?: string;
  connectedTop?: boolean;
  connectedBottom?: boolean;
  connectedLeft?: boolean;
  connectedRight?: boolean;
}

export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: TableIconProps) => {
  // 60-degree perspective - more top surface visible
  const topY = connectedTop ? 6 : 8;
  const bottomY = connectedBottom ? 36 : 34;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;
  const legHeight = 10;
  
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs (only show if not connected top) */}
      {!connectedTop && !connectedLeft && (
        <rect x="6" y="6" width="3" height={legHeight} fill="#4A3D30" />
      )}
      {!connectedTop && !connectedRight && (
        <rect x="39" y="6" width="3" height={legHeight} fill="#4A3D30" />
      )}
      
      {/* Front legs (only show if not connected bottom) */}
      {!connectedBottom && !connectedLeft && (
        <rect x="6" y="36" width="3" height={legHeight} fill="#5A4A3A" />
      )}
      {!connectedBottom && !connectedRight && (
        <rect x="39" y="36" width="3" height={legHeight} fill="#5A4A3A" />
      )}
      
      {/* Table surface - top face */}
      <rect 
        x={leftX} 
        y={topY} 
        width={rightX - leftX} 
        height={bottomY - topY} 
        fill="#C4A574"
      />
      
      {/* Table surface edge - front face (depth) */}
      {!connectedBottom && (
        <rect 
          x={leftX} 
          y={bottomY} 
          width={rightX - leftX} 
          height="3"
          fill="#8B7355"
        />
      )}
      
      {/* Surface border */}
      <rect 
        x={leftX} 
        y={topY} 
        width={rightX - leftX} 
        height={bottomY - topY} 
        fill="none"
        stroke="#6B5A48"
        strokeWidth="1"
      />
    </svg>
  );
};

// 60-degree perspective TV on stand
export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stand legs */}
    <rect x="14" y="38" width="3" height="6" fill="#2A2A2A" />
    <rect x="31" y="38" width="3" height="6" fill="#2A2A2A" />
    {/* Stand base */}
    <rect x="10" y="36" width="28" height="4" fill="#404040" stroke="#303030" strokeWidth="1" />
    <rect x="10" y="40" width="28" height="2" fill="#303030" />
    {/* TV frame */}
    <rect x="4" y="6" width="40" height="28" fill="#2A2A2A" stroke="#1A1A1A" strokeWidth="1" />
    {/* Screen */}
    <rect x="6" y="8" width="36" height="24" fill="#3A5A6A" stroke="#2A4A5A" strokeWidth="1" />
    <rect x="6" y="8" width="36" height="8" fill="#4A6A7A" opacity="0.4" />
    {/* Front edge */}
    <rect x="4" y="34" width="40" height="2" fill="#1A1A1A" />
    {/* Highlight */}
    <rect x="8" y="10" width="8" height="4" fill="#5A8A9A" opacity="0.3" />
  </svg>
);

// 60-degree perspective bookshelf
export const BookshelfIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back legs */}
    <rect x="8" y="4" width="3" height="6" fill="#4A3D30" />
    <rect x="37" y="4" width="3" height="6" fill="#4A3D30" />
    {/* Front legs */}
    <rect x="8" y="40" width="3" height="6" fill="#5A4A3A" />
    <rect x="37" y="40" width="3" height="6" fill="#5A4A3A" />
    
    {/* Frame */}
    <rect x="6" y="6" width="36" height="34" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
    <rect x="6" y="40" width="36" height="3" fill="#8B7355" />
    
    {/* Shelves */}
    <rect x="8" y="8" width="32" height="8" fill="#A08050" stroke="#8B7355" strokeWidth="1" />
    <rect x="8" y="18" width="32" height="8" fill="#A08050" stroke="#8B7355" strokeWidth="1" />
    <rect x="8" y="28" width="32" height="8" fill="#A08050" stroke="#8B7355" strokeWidth="1" />
    
    {/* Books - top shelf */}
    <rect x="10" y="9" width="4" height="6" fill="#B06060" stroke="#905050" strokeWidth="1" />
    <rect x="15" y="8" width="3" height="7" fill="#6080B0" stroke="#506090" strokeWidth="1" />
    <rect x="19" y="9" width="5" height="6" fill="#60B080" stroke="#509070" strokeWidth="1" />
    <rect x="25" y="8" width="4" height="7" fill="#B09060" stroke="#907050" strokeWidth="1" />
    <rect x="30" y="9" width="3" height="6" fill="#9070B0" stroke="#705090" strokeWidth="1" />
    
    {/* Books - middle shelf */}
    <rect x="10" y="19" width="5" height="6" fill="#7060B0" stroke="#505090" strokeWidth="1" />
    <rect x="16" y="18" width="4" height="7" fill="#B06080" stroke="#905060" strokeWidth="1" />
    <rect x="21" y="19" width="6" height="6" fill="#60B0B0" stroke="#509090" strokeWidth="1" />
    <rect x="28" y="18" width="4" height="7" fill="#B08060" stroke="#906050" strokeWidth="1" />
    
    {/* Books - bottom shelf */}
    <rect x="10" y="29" width="4" height="6" fill="#6080B0" stroke="#506090" strokeWidth="1" />
    <rect x="15" y="28" width="5" height="7" fill="#80B060" stroke="#609050" strokeWidth="1" />
    <rect x="21" y="29" width="3" height="6" fill="#B06060" stroke="#905050" strokeWidth="1" />
    <rect x="25" y="28" width="6" height="7" fill="#60B0A0" stroke="#509080" strokeWidth="1" />
  </svg>
);

// 60-degree perspective rock formation
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="24" cy="40" rx="16" ry="4" fill="#505050" opacity="0.3" />
    {/* Main body */}
    <path d="M10 32 L18 18 L28 14 L38 20 L40 34 L34 40 L14 40 Z" fill="#808080" stroke="#606060" strokeWidth="1" />
    {/* Top surface */}
    <path d="M12 30 L18 18 L28 14 L36 20 L34 32 L20 34 Z" fill="#A0A0A0" stroke="#808080" strokeWidth="1" />
    {/* Front faces */}
    <path d="M12 30 L20 34 L14 40 L10 36 Z" fill="#707070" />
    <path d="M20 34 L34 32 L34 40 L14 40 Z" fill="#686868" />
    {/* Highlight */}
    <path d="M20 20 L26 16 L30 20 L24 24 Z" fill="#B0B0B0" opacity="0.5" />
    {/* Crack */}
    <line x1="22" y1="24" x2="26" y2="34" stroke="#505050" strokeWidth="1" />
  </svg>
);

// 60-degree perspective debris/rubble
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="24" cy="40" rx="18" ry="4" fill="#4A3A2A" opacity="0.3" />
    
    {/* Large plank */}
    <g transform="rotate(-15 6 26)">
      <rect x="6" y="26" width="16" height="4" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
      <rect x="6" y="30" width="16" height="2" fill="#8B7355" />
    </g>
    
    {/* Medium plank */}
    <g transform="rotate(8 20 28)">
      <rect x="20" y="28" width="14" height="4" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
      <rect x="20" y="32" width="14" height="2" fill="#A08050" />
    </g>
    
    {/* Small plank */}
    <g transform="rotate(-5 28 32)">
      <rect x="28" y="32" width="10" height="3" fill="#E4C594" stroke="#B09060" strokeWidth="1" />
      <rect x="28" y="35" width="10" height="1.5" fill="#B09060" />
    </g>
    
    {/* Broken piece */}
    <polygon points="12,34 18,32 20,38 14,40" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
    <polygon points="14,40 20,38 18,42" fill="#8B7355" />
    
    {/* Small fragments */}
    <rect x="32" y="36" width="4" height="3" fill="#D4B584" stroke="#A08050" strokeWidth="1" transform="rotate(20 32 36)" />
    <rect x="8" y="38" width="3" height="2" fill="#C4A574" stroke="#8B7355" strokeWidth="1" transform="rotate(-10 8 38)" />
  </svg>
);

export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// === KITCHEN ASSETS ===

// 60-degree perspective fridge with directional variants
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  // Fridge facing down (default) - front view
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <rect x="10" y="42" width="28" height="4" fill="#505050" opacity="0.2" />
        {/* Main body */}
        <rect x="10" y="4" width="28" height="38" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
        {/* Top surface */}
        <rect x="10" y="4" width="28" height="4" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="1" />
        {/* Freezer door */}
        <rect x="12" y="6" width="24" height="10" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
        {/* Handle - freezer */}
        <rect x="32" y="9" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        {/* Fridge door */}
        <rect x="12" y="18" width="24" height="22" fill="#E0E0E0" stroke="#B0B0B0" strokeWidth="1" />
        {/* Handle - fridge */}
        <rect x="32" y="24" width="2" height="8" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        {/* Front edge */}
        <rect x="10" y="40" width="28" height="2" fill="#B0B0B0" />
      </svg>
    );
  }
  
  // Fridge facing up - back view (simpler, no handles visible)
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main body - back */}
        <rect x="10" y="6" width="28" height="38" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
        {/* Top surface */}
        <rect x="10" y="4" width="28" height="4" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
        {/* Back panel details */}
        <rect x="14" y="10" width="20" height="30" fill="#C8C8C8" stroke="#A0A0A0" strokeWidth="1" />
        {/* Vent lines */}
        <line x1="16" y1="14" x2="32" y2="14" stroke="#A0A0A0" strokeWidth="1" />
        <line x1="16" y1="18" x2="32" y2="18" stroke="#A0A0A0" strokeWidth="1" />
        <line x1="16" y1="22" x2="32" y2="22" stroke="#A0A0A0" strokeWidth="1" />
        {/* Front edge */}
        <rect x="10" y="42" width="28" height="2" fill="#A0A0A0" />
      </svg>
    );
  }
  
  // Fridge facing left - side view
  if (direction === 'left') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Side body */}
        <rect x="10" y="4" width="28" height="38" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="1" />
        {/* Top surface */}
        <rect x="10" y="4" width="28" height="4" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1" />
        {/* Front edge visible on left */}
        <rect x="8" y="4" width="4" height="40" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
        {/* Handle on front edge */}
        <rect x="9" y="10" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        <rect x="9" y="26" width="2" height="8" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        {/* Bottom edge */}
        <rect x="10" y="42" width="28" height="2" fill="#A0A0A0" />
      </svg>
    );
  }
  
  // Fridge facing right - side view mirrored
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Side body */}
      <rect x="10" y="4" width="28" height="38" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="1" />
      {/* Top surface */}
      <rect x="10" y="4" width="28" height="4" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1" />
      {/* Front edge visible on right */}
      <rect x="36" y="4" width="4" height="40" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
      {/* Handle on front edge */}
      <rect x="37" y="10" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
      <rect x="37" y="26" width="2" height="8" fill="#909090" stroke="#707070" strokeWidth="0.5" />
      {/* Bottom edge */}
      <rect x="10" y="42" width="28" height="2" fill="#A0A0A0" />
    </svg>
  );
};

// 60-degree perspective stove with directional variants
export const StoveIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  // Stove facing down (default) - front view with burners and oven
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Legs */}
        <rect x="10" y="40" width="3" height="6" fill="#2A2A2A" />
        <rect x="35" y="40" width="3" height="6" fill="#2A2A2A" />
        {/* Main body */}
        <rect x="8" y="8" width="32" height="32" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
        {/* Top surface with burners */}
        <rect x="8" y="8" width="32" height="8" fill="#5A5A5A" stroke="#4A4A4A" strokeWidth="1" />
        {/* Burners */}
        <circle cx="18" cy="12" r="5" fill="#3A3A3A" stroke="#5A5A5A" strokeWidth="1" />
        <circle cx="30" cy="12" r="5" fill="#3A3A3A" stroke="#5A5A5A" strokeWidth="1" />
        <circle cx="18" cy="12" r="3" fill="none" stroke="#4A4A4A" strokeWidth="1" />
        <circle cx="30" cy="12" r="3" fill="none" stroke="#4A4A4A" strokeWidth="1" />
        {/* Oven door */}
        <rect x="10" y="18" width="28" height="18" fill="#404040" stroke="#505050" strokeWidth="1" />
        <rect x="16" y="20" width="16" height="2" fill="#707070" stroke="#505050" strokeWidth="0.5" />
        <rect x="14" y="24" width="20" height="8" fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="1" />
        {/* Control panel */}
        <rect x="10" y="36" width="28" height="4" fill="#505050" />
        <circle cx="16" cy="38" r="2" fill="#707070" stroke="#505050" strokeWidth="0.5" />
        <circle cx="24" cy="38" r="2" fill="#707070" stroke="#505050" strokeWidth="0.5" />
        <circle cx="32" cy="38" r="2" fill="#707070" stroke="#505050" strokeWidth="0.5" />
      </svg>
    );
  }
  
  // Stove facing up - back view (only burners visible from behind)
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Legs */}
        <rect x="10" y="40" width="3" height="6" fill="#2A2A2A" />
        <rect x="35" y="40" width="3" height="6" fill="#2A2A2A" />
        {/* Main body - back */}
        <rect x="8" y="8" width="32" height="32" fill="#404040" stroke="#3A3A3A" strokeWidth="1" />
        {/* Back panel */}
        <rect x="8" y="4" width="32" height="6" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
        {/* Burners visible from top */}
        <circle cx="18" cy="28" r="5" fill="#3A3A3A" stroke="#4A4A4A" strokeWidth="1" />
        <circle cx="30" cy="28" r="5" fill="#3A3A3A" stroke="#4A4A4A" strokeWidth="1" />
        <circle cx="18" cy="28" r="3" fill="none" stroke="#4A4A4A" strokeWidth="1" />
        <circle cx="30" cy="28" r="3" fill="none" stroke="#4A4A4A" strokeWidth="1" />
        {/* Top edge */}
        <rect x="8" y="38" width="32" height="2" fill="#303030" />
      </svg>
    );
  }
  
  // Stove facing left - side view
  if (direction === 'left') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Legs */}
        <rect x="10" y="40" width="3" height="6" fill="#2A2A2A" />
        <rect x="35" y="40" width="3" height="6" fill="#2A2A2A" />
        {/* Side body */}
        <rect x="10" y="8" width="28" height="32" fill="#454545" stroke="#3A3A3A" strokeWidth="1" />
        {/* Top surface */}
        <rect x="10" y="8" width="28" height="6" fill="#5A5A5A" stroke="#4A4A4A" strokeWidth="1" />
        {/* Front edge with oven visible */}
        <rect x="8" y="8" width="4" height="34" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
        {/* Oven window hint */}
        <rect x="9" y="20" width="2" height="10" fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="0.5" />
        {/* Knob */}
        <circle cx="10" cy="36" r="2" fill="#707070" stroke="#505050" strokeWidth="0.5" />
      </svg>
    );
  }
  
  // Stove facing right - side view mirrored
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Legs */}
      <rect x="10" y="40" width="3" height="6" fill="#2A2A2A" />
      <rect x="35" y="40" width="3" height="6" fill="#2A2A2A" />
      {/* Side body */}
      <rect x="10" y="8" width="28" height="32" fill="#454545" stroke="#3A3A3A" strokeWidth="1" />
      {/* Top surface */}
      <rect x="10" y="8" width="28" height="6" fill="#5A5A5A" stroke="#4A4A4A" strokeWidth="1" />
      {/* Front edge with oven visible */}
      <rect x="36" y="8" width="4" height="34" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
      {/* Oven window hint */}
      <rect x="37" y="20" width="2" height="10" fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="0.5" />
      {/* Knob */}
      <circle cx="38" cy="36" r="2" fill="#707070" stroke="#505050" strokeWidth="0.5" />
    </svg>
  );
};

// 60-degree perspective chair with directional variants
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  // Chair facing down (default) - seeing backrest from behind
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back legs - darker */}
        <rect x="12" y="6" width="3" height="10" fill="#4A3D30" />
        <rect x="33" y="6" width="3" height="10" fill="#4A3D30" />
        {/* Front legs - lighter */}
        <rect x="12" y="32" width="3" height="14" fill="#5A4A3A" />
        <rect x="33" y="32" width="3" height="14" fill="#5A4A3A" />
        {/* Backrest */}
        <rect x="10" y="8" width="28" height="8" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
        <rect x="10" y="16" width="28" height="2" fill="#8B7355" />
        {/* Seat */}
        <rect x="10" y="18" width="28" height="14" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        {/* Seat front edge */}
        <rect x="10" y="32" width="28" height="2" fill="#8B7355" />
      </svg>
    );
  }
  
  // Chair facing up - seeing seat from front, backrest at back
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Backrest visible behind (at bottom of view) */}
        <rect x="10" y="34" width="28" height="8" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
        <rect x="10" y="32" width="28" height="3" fill="#8B7355" />
        {/* Front legs - at top */}
        <rect x="12" y="4" width="3" height="14" fill="#5A4A3A" />
        <rect x="33" y="4" width="3" height="14" fill="#5A4A3A" />
        {/* Seat */}
        <rect x="10" y="18" width="28" height="14" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        {/* Seat front edge */}
        <rect x="10" y="16" width="28" height="2" fill="#A08050" />
        {/* Back legs */}
        <rect x="12" y="38" width="3" height="8" fill="#4A3D30" />
        <rect x="33" y="38" width="3" height="8" fill="#4A3D30" />
      </svg>
    );
  }
  
  // Chair facing left - side view
  if (direction === 'left') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back legs (right side in view) */}
        <rect x="32" y="6" width="3" height="10" fill="#4A3D30" />
        <rect x="32" y="32" width="3" height="14" fill="#4A3D30" />
        {/* Front legs (left side in view) */}
        <rect x="12" y="18" width="3" height="28" fill="#5A4A3A" />
        {/* Backrest - vertical on right */}
        <rect x="30" y="6" width="6" height="28" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
        <rect x="28" y="6" width="3" height="28" fill="#8B7355" />
        {/* Seat - extends forward */}
        <rect x="12" y="18" width="20" height="14" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        {/* Seat front edge */}
        <rect x="12" y="32" width="20" height="2" fill="#8B7355" />
      </svg>
    );
  }
  
  // Chair facing right - side view mirrored
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs (left side in view) */}
      <rect x="13" y="6" width="3" height="10" fill="#4A3D30" />
      <rect x="13" y="32" width="3" height="14" fill="#4A3D30" />
      {/* Front legs (right side in view) */}
      <rect x="33" y="18" width="3" height="28" fill="#5A4A3A" />
      {/* Backrest - vertical on left */}
      <rect x="12" y="6" width="6" height="28" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
      <rect x="17" y="6" width="3" height="28" fill="#8B7355" />
      {/* Seat - extends forward */}
      <rect x="16" y="18" width="20" height="14" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
      {/* Seat front edge */}
      <rect x="16" y="32" width="20" height="2" fill="#8B7355" />
    </svg>
  );
};

// 60-degree perspective sink with directional variants
export const SinkIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  // Sink facing down (default) - front view with cabinet and faucet
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cabinet */}
        <rect x="6" y="20" width="36" height="24" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
        <rect x="6" y="44" width="36" height="2" fill="#8B7355" />
        {/* Cabinet doors */}
        <rect x="8" y="24" width="14" height="18" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        <rect x="26" y="24" width="14" height="18" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        {/* Door handles */}
        <rect x="19" y="31" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        <rect x="27" y="31" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        {/* Counter top */}
        <rect x="4" y="16" width="40" height="6" fill="#E8E0D8" stroke="#C0B0A0" strokeWidth="1" />
        {/* Sink basin */}
        <ellipse cx="24" cy="18" rx="10" ry="4" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
        <ellipse cx="24" cy="18" rx="8" ry="3" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" />
        {/* Faucet */}
        <rect x="22" y="8" width="4" height="8" fill="#A8A8A8" stroke="#888888" strokeWidth="1" />
        <rect x="20" y="6" width="8" height="3" rx="1" fill="#B8B8B8" stroke="#909090" strokeWidth="1" />
        <path d="M24 9 L24 12 L28 14" stroke="#808080" strokeWidth="2" fill="none" />
      </svg>
    );
  }
  
  // Sink facing up - back view
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cabinet back */}
        <rect x="6" y="20" width="36" height="24" fill="#B09060" stroke="#8B7355" strokeWidth="1" />
        {/* Counter top */}
        <rect x="4" y="16" width="40" height="6" fill="#D8D0C8" stroke="#B0A090" strokeWidth="1" />
        {/* Sink basin - visible from above */}
        <ellipse cx="24" cy="26" rx="10" ry="4" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
        <ellipse cx="24" cy="26" rx="8" ry="3" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" />
        {/* Pipes visible at back */}
        <rect x="22" y="34" width="4" height="10" fill="#808080" stroke="#606060" strokeWidth="1" />
        {/* Cabinet bottom edge */}
        <rect x="6" y="42" width="36" height="2" fill="#8B7355" />
      </svg>
    );
  }
  
  // Sink facing left - side view
  if (direction === 'left') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cabinet side */}
        <rect x="10" y="20" width="28" height="24" fill="#C0956A" stroke="#8B7355" strokeWidth="1" />
        {/* Front edge with door */}
        <rect x="8" y="20" width="6" height="24" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        {/* Door handle */}
        <rect x="9" y="31" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
        {/* Counter top */}
        <rect x="6" y="16" width="36" height="6" fill="#E8E0D8" stroke="#C0B0A0" strokeWidth="1" />
        {/* Sink basin - side view */}
        <ellipse cx="24" cy="18" rx="8" ry="3" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
        {/* Faucet - side view */}
        <rect x="12" y="8" width="4" height="10" fill="#A8A8A8" stroke="#888888" strokeWidth="1" />
        <rect x="14" y="10" width="6" height="2" fill="#B8B8B8" stroke="#909090" strokeWidth="1" />
        {/* Cabinet bottom */}
        <rect x="10" y="42" width="28" height="2" fill="#8B7355" />
      </svg>
    );
  }
  
  // Sink facing right - side view mirrored
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cabinet side */}
      <rect x="10" y="20" width="28" height="24" fill="#C0956A" stroke="#8B7355" strokeWidth="1" />
      {/* Front edge with door */}
      <rect x="34" y="20" width="6" height="24" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
      {/* Door handle */}
      <rect x="37" y="31" width="2" height="4" fill="#909090" stroke="#707070" strokeWidth="0.5" />
      {/* Counter top */}
      <rect x="6" y="16" width="36" height="6" fill="#E8E0D8" stroke="#C0B0A0" strokeWidth="1" />
      {/* Sink basin - side view */}
      <ellipse cx="24" cy="18" rx="8" ry="3" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="1" />
      {/* Faucet - side view */}
      <rect x="32" y="8" width="4" height="10" fill="#A8A8A8" stroke="#888888" strokeWidth="1" />
      <rect x="28" y="10" width="6" height="2" fill="#B8B8B8" stroke="#909090" strokeWidth="1" />
      {/* Cabinet bottom */}
      <rect x="10" y="42" width="28" height="2" fill="#8B7355" />
    </svg>
  );
};

// === BATHROOM ASSETS ===

// Side-view toilet (easier to distinguish)
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="26" cy="44" rx="14" ry="2" fill="#505050" opacity="0.2" />
    {/* Tank - back left */}
    <rect x="4" y="10" width="10" height="22" rx="2" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="1" />
    {/* Tank lid */}
    <rect x="3" y="6" width="12" height="5" rx="1" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1" />
    {/* Flush lever */}
    <rect x="12" y="14" width="4" height="2" rx="1" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="0.5" />
    {/* Bowl base - side view curved */}
    <path d="M12 32 L12 24 Q12 18 18 18 L32 18 Q40 18 40 26 L40 32 Q40 42 30 42 L20 42 Q12 42 12 32 Z" fill="#F5F5F5" stroke="#D0D0D0" strokeWidth="1" />
    {/* Seat - side view */}
    <path d="M14 20 L36 20 Q42 20 42 26 L42 28 Q42 32 36 32 L14 32 Q10 32 10 26 L10 24 Q10 20 14 20 Z" fill="#FAFAFA" stroke="#C0C0C0" strokeWidth="1" />
    {/* Seat opening hint */}
    <ellipse cx="28" cy="26" rx="8" ry="4" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1" />
    {/* Bowl front depth */}
    <path d="M14 32 L36 32 Q40 32 40 36 L40 38 Q40 42 34 42 L18 42 Q14 42 14 38 L14 32 Z" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1" />
  </svg>
);

// Side-view shower (easier to distinguish)
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base/tray - side view */}
    <rect x="6" y="40" width="36" height="6" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1" />
    <rect x="6" y="40" width="36" height="2" fill="#F0F0F0" />
    {/* Back wall - side perspective */}
    <path d="M6 8 L6 40 L14 40 L14 8 Z" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="1" />
    {/* Tiles on back wall */}
    <line x1="6" y1="18" x2="14" y2="18" stroke="#C0C0C0" strokeWidth="1" />
    <line x1="6" y1="28" x2="14" y2="28" stroke="#C0C0C0" strokeWidth="1" />
    {/* Shower pipe on wall */}
    <rect x="8" y="8" width="3" height="20" fill="#A0A0A0" stroke="#808080" strokeWidth="1" />
    {/* Shower head - angled outward */}
    <ellipse cx="18" cy="12" rx="6" ry="3" fill="#A8A8A8" stroke="#888888" strokeWidth="1" />
    <ellipse cx="18" cy="13" rx="5" ry="2" fill="#989898" stroke="#787878" strokeWidth="1" />
    {/* Arm connecting head to pipe */}
    <rect x="11" y="10" width="8" height="3" fill="#909090" stroke="#808080" strokeWidth="1" />
    {/* Water drops - cascading */}
    <circle cx="14" cy="20" r="1.5" fill="#88C8E8" opacity="0.7" />
    <circle cx="18" cy="24" r="1.5" fill="#88C8E8" opacity="0.6" />
    <circle cx="22" cy="22" r="1" fill="#88C8E8" opacity="0.7" />
    <circle cx="16" cy="30" r="1" fill="#88C8E8" opacity="0.5" />
    <circle cx="20" cy="32" r="1.5" fill="#88C8E8" opacity="0.5" />
    <circle cx="14" cy="36" r="1" fill="#88C8E8" opacity="0.4" />
    {/* Glass door/panel - side view */}
    <rect x="36" y="8" width="6" height="32" fill="#A8C8E0" opacity="0.4" stroke="#90B0C8" strokeWidth="1" />
    {/* Glass door frame */}
    <rect x="36" y="8" width="2" height="32" fill="#90B0C8" opacity="0.6" />
    {/* Door handle */}
    <rect x="38" y="22" width="2" height="6" rx="1" fill="#B0B0B0" stroke="#909090" strokeWidth="0.5" />
  </svg>
);

// === OFFICE ASSETS ===

// 60-degree perspective desk (connectable like table)
export const DeskIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const topY = connectedTop ? 6 : 8;
  const bottomY = connectedBottom ? 36 : 34;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;
  const legHeight = 10;
  
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs - darker */}
      {!connectedTop && !connectedLeft && (
        <rect x="6" y="6" width="3" height={legHeight} fill="#4A3D30" />
      )}
      {!connectedTop && !connectedRight && (
        <rect x="39" y="6" width="3" height={legHeight} fill="#4A3D30" />
      )}
      
      {/* Front legs - lighter */}
      {!connectedBottom && !connectedLeft && (
        <rect x="6" y="36" width="3" height={legHeight} fill="#5A4A3A" />
      )}
      {!connectedBottom && !connectedRight && (
        <rect x="39" y="36" width="3" height={legHeight} fill="#5A4A3A" />
      )}
      
      {/* Desktop surface */}
      <rect 
        x={leftX} 
        y={topY} 
        width={rightX - leftX} 
        height={bottomY - topY} 
        fill="#C4A574"
      />
      
      {/* Keyboard tray hint */}
      <rect 
        x={leftX + 4} 
        y={bottomY - 8} 
        width={rightX - leftX - 8} 
        height="4"
        fill="#A08050"
        opacity="0.5"
      />
      
      {/* Desktop edge - front */}
      {!connectedBottom && (
        <rect 
          x={leftX} 
          y={bottomY} 
          width={rightX - leftX} 
          height="3"
          fill="#8B7355"
        />
      )}
      
      {/* Surface border */}
      <rect 
        x={leftX} 
        y={topY} 
        width={rightX - leftX} 
        height={bottomY - topY} 
        fill="none"
        stroke="#6B5A48"
        strokeWidth="1"
      />
    </svg>
  );
};

// Computer (monitor + keyboard + mouse) - designed to overlay on desk/table
export const ComputerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor stand base */}
    <rect x="18" y="32" width="12" height="3" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
    {/* Monitor stand neck */}
    <rect x="21" y="26" width="6" height="7" fill="#3A3A3A" stroke="#2A2A2A" strokeWidth="1" />
    {/* Monitor frame */}
    <rect x="6" y="4" width="36" height="24" rx="1" fill="#2A2A2A" stroke="#1A1A1A" strokeWidth="1" />
    {/* Screen */}
    <rect x="8" y="6" width="32" height="18" fill="#3A5A6A" stroke="#2A4A5A" strokeWidth="1" />
    {/* Screen reflection */}
    <rect x="8" y="6" width="32" height="6" fill="#4A6A7A" opacity="0.4" />
    {/* Screen content hint */}
    <rect x="10" y="14" width="12" height="2" fill="#5A7A8A" opacity="0.6" />
    <rect x="10" y="18" width="8" height="2" fill="#5A7A8A" opacity="0.4" />
    {/* Monitor bezel bottom */}
    <rect x="6" y="24" width="36" height="2" fill="#1A1A1A" />
    {/* Keyboard */}
    <rect x="8" y="38" width="24" height="8" rx="1" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
    {/* Keyboard keys row 1 */}
    <rect x="10" y="40" width="20" height="2" fill="#5A5A5A" />
    {/* Keyboard keys row 2 */}
    <rect x="10" y="43" width="20" height="2" fill="#5A5A5A" />
    {/* Mouse */}
    <ellipse cx="38" cy="42" rx="5" ry="4" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
    {/* Mouse button divider */}
    <line x1="38" y1="38" x2="38" y2="42" stroke="#3A3A3A" strokeWidth="1" />
    {/* Mouse scroll wheel */}
    <rect x="37" y="39" width="2" height="2" rx="0.5" fill="#5A5A5A" />
  </svg>
);

// Map asset types to their icon components
export const AssetIconMap: Record<AssetType, React.FC<AssetIconProps>> = {
  empty: EmptyIcon,
  bed: BedIcon,
  sofa: SofaIcon,
  armchair: ArmchairIcon,
  rug: RugIcon,
  window: WindowIcon,
  door: EmptyIcon, // Door is a wall marking, not a cell icon
  plant: PlantIcon,
  table: TableIcon,
  tv: TvIcon,
  bookshelf: BookshelfIcon,
  rock: RockIcon,
  debris: DebrisIcon,
  // Kitchen
  fridge: FridgeIcon,
  stove: StoveIcon,
  chair: ChairIcon,
  // Bathroom
  toilet: ToiletIcon,
  sink: SinkIcon,
  shower: ShowerIcon,
  // Office
  desk: DeskIcon,
  computer: ComputerIcon,
};
