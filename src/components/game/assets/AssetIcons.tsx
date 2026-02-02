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

// Connectable + Directional asset props (for stove and sink)
interface ConnectableDirectionalAssetProps extends ConnectableAssetProps {
  direction?: AssetDirection;
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

// 60-degree elevated perspective fridge with directional variants
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  // Fridge facing down (default) - front view with doors and handles
  if (direction === 'down') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow base */}
        <ellipse cx="24" cy="45" rx="14" ry="2" fill="#505050" opacity="0.2" />
        {/* Main body */}
        <rect x="10" y="6" width="28" height="38" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
        {/* Top surface - 60deg perspective */}
        <path d="M10 6 L14 2 L38 2 L38 6 Z" fill="#F5F5F5" stroke="#D0D0D0" strokeWidth="1" />
        <rect x="10" y="6" width="28" height="3" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="0.5" />
        {/* Freezer door */}
        <rect x="12" y="10" width="24" height="10" fill="#DEDEDE" stroke="#B8B8B8" strokeWidth="1" />
        {/* Freezer handle */}
        <rect x="32" y="13" width="2" height="4" rx="0.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
        {/* Door gap line */}
        <line x1="12" y1="21" x2="36" y2="21" stroke="#A0A0A0" strokeWidth="1" />
        {/* Fridge door */}
        <rect x="12" y="22" width="24" height="20" fill="#E4E4E4" stroke="#B8B8B8" strokeWidth="1" />
        {/* Fridge handle */}
        <rect x="32" y="28" width="2" height="8" rx="0.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
        {/* Front base edge */}
        <rect x="10" y="42" width="28" height="2" fill="#C0C0C0" />
        {/* Side edge - right */}
        <path d="M38 6 L38 44 L40 42 L40 4 Z" fill="#D8D8D8" stroke="#B0B0B0" strokeWidth="0.5" />
      </svg>
    );
  }
  
  // Fridge facing up - back view with vents and coils
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="24" cy="45" rx="14" ry="2" fill="#505050" opacity="0.2" />
        {/* Main body - back panel */}
        <rect x="10" y="6" width="28" height="38" fill="#C8C8C8" stroke="#A0A0A0" strokeWidth="1" />
        {/* Top surface */}
        <path d="M10 6 L14 2 L38 2 L38 6 Z" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1" />
        {/* Back panel recessed area */}
        <rect x="14" y="10" width="20" height="30" fill="#B8B8B8" stroke="#909090" strokeWidth="1" />
        {/* Condenser coils - visible at back */}
        <path d="M16 14 Q18 16 20 14 Q22 12 24 14 Q26 16 28 14 Q30 12 32 14" stroke="#606060" strokeWidth="1.5" fill="none" />
        <path d="M16 20 Q18 22 20 20 Q22 18 24 20 Q26 22 28 20 Q30 18 32 20" stroke="#606060" strokeWidth="1.5" fill="none" />
        <path d="M16 26 Q18 28 20 26 Q22 24 24 26 Q26 28 28 26 Q30 24 32 26" stroke="#606060" strokeWidth="1.5" fill="none" />
        {/* Vent slots */}
        <rect x="18" y="32" width="12" height="1" fill="#707070" />
        <rect x="18" y="35" width="12" height="1" fill="#707070" />
        {/* Front base edge */}
        <rect x="10" y="42" width="28" height="2" fill="#909090" />
      </svg>
    );
  }
  
  // Fridge facing left - 60deg elevated profile view
  if (direction === 'left') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="24" cy="45" rx="14" ry="2" fill="#505050" opacity="0.2" />
        {/* Back side panel */}
        <rect x="16" y="6" width="24" height="38" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="1" />
        {/* Top surface - angled */}
        <path d="M16 6 L20 2 L44 2 L40 6 Z" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
        {/* Front panel (visible on left) */}
        <rect x="8" y="6" width="10" height="38" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
        {/* Freezer section - front */}
        <rect x="9" y="10" width="8" height="10" fill="#DEDEDE" stroke="#B8B8B8" strokeWidth="0.5" />
        {/* Freezer handle */}
        <rect x="10" y="13" width="1.5" height="4" rx="0.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
        {/* Fridge section - front */}
        <rect x="9" y="22" width="8" height="20" fill="#E4E4E4" stroke="#B8B8B8" strokeWidth="0.5" />
        {/* Fridge handle */}
        <rect x="10" y="28" width="1.5" height="8" rx="0.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
        {/* Front base edge */}
        <rect x="8" y="42" width="10" height="2" fill="#C0C0C0" />
        {/* Side base edge */}
        <rect x="16" y="42" width="24" height="2" fill="#A8A8A8" />
      </svg>
    );
  }
  
  // Fridge facing right - 60deg elevated profile view mirrored
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="24" cy="45" rx="14" ry="2" fill="#505050" opacity="0.2" />
      {/* Back side panel */}
      <rect x="8" y="6" width="24" height="38" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="1" />
      {/* Top surface - angled */}
      <path d="M8 6 L4 2 L28 2 L32 6 Z" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
      {/* Front panel (visible on right) */}
      <rect x="30" y="6" width="10" height="38" fill="#E8E8E8" stroke="#C0C0C0" strokeWidth="1" />
      {/* Freezer section - front */}
      <rect x="31" y="10" width="8" height="10" fill="#DEDEDE" stroke="#B8B8B8" strokeWidth="0.5" />
      {/* Freezer handle */}
      <rect x="36.5" y="13" width="1.5" height="4" rx="0.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
      {/* Fridge section - front */}
      <rect x="31" y="22" width="8" height="20" fill="#E4E4E4" stroke="#B8B8B8" strokeWidth="0.5" />
      {/* Fridge handle */}
      <rect x="36.5" y="28" width="1.5" height="8" rx="0.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
      {/* Front base edge */}
      <rect x="30" y="42" width="10" height="2" fill="#C0C0C0" />
      {/* Side base edge */}
      <rect x="8" y="42" width="24" height="2" fill="#A8A8A8" />
    </svg>
  );
};

// 60-degree elevated perspective stove with directional + connectable support
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  // Calculate bounds based on connections (similar to TableIcon)
  const topY = connectedTop ? 6 : 8;
  const bottomY = connectedBottom ? 40 : 38;
  const leftX = connectedLeft ? 0 : 6;
  const rightX = connectedRight ? 48 : 42;
  
  // Stove facing down (default) - front view with burners and oven visible
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main body - counter surface */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={bottomY - topY} fill="#505050" stroke="#3A3A3A" strokeWidth="1" />
      
      {/* Counter top surface */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={(bottomY - topY) * 0.35} fill="#4A4A4A" />
      
      {/* Burners */}
      <ellipse cx={leftX + (rightX - leftX) * 0.3} cy={topY + (bottomY - topY) * 0.2} rx="6" ry="4" fill="#3A3A3A" stroke="#555555" strokeWidth="1" />
      <ellipse cx={leftX + (rightX - leftX) * 0.7} cy={topY + (bottomY - topY) * 0.2} rx="6" ry="4" fill="#3A3A3A" stroke="#555555" strokeWidth="1" />
      <ellipse cx={leftX + (rightX - leftX) * 0.3} cy={topY + (bottomY - topY) * 0.2} rx="3.5" ry="2.5" fill="none" stroke="#454545" strokeWidth="0.8" />
      <ellipse cx={leftX + (rightX - leftX) * 0.7} cy={topY + (bottomY - topY) * 0.2} rx="3.5" ry="2.5" fill="none" stroke="#454545" strokeWidth="0.8" />
      
      {/* Oven door area */}
      <rect x={leftX + 2} y={topY + (bottomY - topY) * 0.4} width={rightX - leftX - 4} height={(bottomY - topY) * 0.45} fill="#404040" stroke="#505050" strokeWidth="1" />
      
      {/* Oven window */}
      <rect x={leftX + 6} y={topY + (bottomY - topY) * 0.45} width={rightX - leftX - 12} height={(bottomY - topY) * 0.25} fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="1" />
      
      {/* Oven handle */}
      <rect x={leftX + 8} y={topY + (bottomY - topY) * 0.38} width={rightX - leftX - 16} height="2" rx="0.5" fill="#707070" stroke="#505050" strokeWidth="0.5" />
      
      {/* Control knobs at bottom */}
      <rect x={leftX} y={bottomY - 6} width={rightX - leftX} height="6" fill="#555555" />
      <circle cx={leftX + (rightX - leftX) * 0.2} cy={bottomY - 3} r="2" fill="#606060" stroke="#505050" strokeWidth="0.5" />
      <circle cx={leftX + (rightX - leftX) * 0.4} cy={bottomY - 3} r="2" fill="#606060" stroke="#505050" strokeWidth="0.5" />
      <circle cx={leftX + (rightX - leftX) * 0.6} cy={bottomY - 3} r="2" fill="#606060" stroke="#505050" strokeWidth="0.5" />
      <circle cx={leftX + (rightX - leftX) * 0.8} cy={bottomY - 3} r="2" fill="#606060" stroke="#505050" strokeWidth="0.5" />
      
      {/* Front edge (depth) */}
      {!connectedBottom && (
        <rect x={leftX} y={bottomY} width={rightX - leftX} height="3" fill="#3A3A3A" />
      )}
      
      {/* Border */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={bottomY - topY} fill="none" stroke="#3A3A3A" strokeWidth="1" />
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
  
  // Chair facing up - back view (seeing the backrest from behind)
  if (direction === 'up') {
    return (
      <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Back legs - visible at bottom, going down */}
        <rect x="12" y="36" width="3" height="10" fill="#4A3D30" />
        <rect x="33" y="36" width="3" height="10" fill="#4A3D30" />
        
        {/* Backrest - main visible element, tall wooden back */}
        <rect x="10" y="4" width="28" height="20" fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
        {/* Backrest wood grain detail */}
        <rect x="14" y="8" width="6" height="12" fill="#D4B584" stroke="#A08050" strokeWidth="0.5" opacity="0.6" />
        <rect x="28" y="8" width="6" height="12" fill="#D4B584" stroke="#A08050" strokeWidth="0.5" opacity="0.6" />
        {/* Backrest top curve detail */}
        <rect x="10" y="4" width="28" height="4" fill="#B89A64" stroke="#8B7355" strokeWidth="1" />
        
        {/* Backrest depth - side thickness */}
        <rect x="10" y="22" width="28" height="4" fill="#A08050" />
        
        {/* Seat - partially visible behind backrest */}
        <rect x="10" y="26" width="28" height="10" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
        {/* Seat edge */}
        <rect x="10" y="34" width="28" height="2" fill="#8B7355" />
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

// 60-degree elevated perspective sink with directional + connectable support
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  // Calculate bounds based on connections (similar to TableIcon)
  const topY = connectedTop ? 4 : 6;
  const bottomY = connectedBottom ? 44 : 42;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;
  
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cabinet body */}
      <rect x={leftX} y={topY + 12} width={rightX - leftX} height={bottomY - topY - 12} fill="#C4A574" stroke="#8B7355" strokeWidth="1" />
      
      {/* Cabinet doors */}
      <rect x={leftX + 2} y={topY + 16} width={(rightX - leftX) / 2 - 3} height={bottomY - topY - 20} fill="#D4B584" stroke="#A08050" strokeWidth="1" />
      <rect x={leftX + (rightX - leftX) / 2 + 1} y={topY + 16} width={(rightX - leftX) / 2 - 3} height={bottomY - topY - 20} fill="#D4B584" stroke="#A08050" strokeWidth="1" />
      
      {/* Door handles */}
      <rect x={leftX + (rightX - leftX) / 2 - 3} y={topY + 22} width="2" height="4" rx="0.5" fill="#909090" stroke="#707070" strokeWidth="0.5" />
      <rect x={leftX + (rightX - leftX) / 2 + 1} y={topY + 22} width="2" height="4" rx="0.5" fill="#909090" stroke="#707070" strokeWidth="0.5" />
      
      {/* Counter top surface */}
      <rect x={leftX} y={topY + 4} width={rightX - leftX} height="10" fill="#E8E0D8" stroke="#C0B0A0" strokeWidth="1" />
      
      {/* Sink basin - recessed */}
      <ellipse cx={(leftX + rightX) / 2} cy={topY + 9} rx="10" ry="4" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="1" />
      <ellipse cx={(leftX + rightX) / 2} cy={topY + 10} rx="7" ry="3" fill="#A8A8A8" stroke="#909090" strokeWidth="1" />
      
      {/* Drain */}
      <circle cx={(leftX + rightX) / 2} cy={topY + 10} r="1.5" fill="#606060" />
      
      {/* Faucet base */}
      <rect x={(leftX + rightX) / 2 - 2} y={topY} width="4" height="5" fill="#B0B0B0" stroke="#909090" strokeWidth="1" />
      
      {/* Faucet spout - curved */}
      <path d={`M${(leftX + rightX) / 2} ${topY} C${(leftX + rightX) / 2} ${topY - 4} ${(leftX + rightX) / 2 + 6} ${topY - 4} ${(leftX + rightX) / 2 + 6} ${topY}`} stroke="#A0A0A0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      
      {/* Faucet handles */}
      <circle cx={(leftX + rightX) / 2 - 4} cy={topY + 2} r="1.5" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="0.5" />
      <circle cx={(leftX + rightX) / 2 + 4} cy={topY + 2} r="1.5" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="0.5" />
      
      {/* Front edge (depth) */}
      {!connectedBottom && (
        <rect x={leftX} y={bottomY} width={rightX - leftX} height="2" fill="#8B7355" />
      )}
      
      {/* Border */}
      <rect x={leftX} y={topY + 4} width={rightX - leftX} height={bottomY - topY - 4} fill="none" stroke="#8B7355" strokeWidth="1" />
    </svg>
  );
};

// === BATHROOM ASSETS ===

// 60-degree elevated perspective toilet
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="24" cy="45" rx="14" ry="2" fill="#505050" opacity="0.2" />
    
    {/* Tank - back, elevated view */}
    <rect x="14" y="4" width="20" height="14" rx="2" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="1" />
    {/* Tank top - 60deg perspective */}
    <path d="M14 4 L16 2 L36 2 L34 4 Z" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.5" />
    {/* Tank lid raised edge */}
    <rect x="15" y="4" width="18" height="3" fill="#FAFAFA" stroke="#E8E8E8" strokeWidth="0.5" />
    {/* Flush button */}
    <ellipse cx="24" cy="6" rx="3" ry="1" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="0.5" />
    
    {/* Bowl - top view with seat */}
    <ellipse cx="24" cy="30" rx="14" ry="10" fill="#F5F5F5" stroke="#D0D0D0" strokeWidth="1" />
    {/* Seat - slightly raised */}
    <ellipse cx="24" cy="29" rx="12" ry="8" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="1" />
    {/* Seat opening */}
    <ellipse cx="24" cy="30" rx="8" ry="5" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1" />
    {/* Inner bowl depth */}
    <ellipse cx="24" cy="31" rx="6" ry="3.5" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="0.5" />
    
    {/* Connection between tank and bowl */}
    <rect x="20" y="16" width="8" height="6" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="0.5" />
    
    {/* Front rim edge - depth */}
    <path d="M10 32 Q10 42 24 42 Q38 42 38 32" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1" />
    
    {/* Seat hinge hints */}
    <circle cx="16" cy="22" r="1" fill="#B0B0B0" />
    <circle cx="32" cy="22" r="1" fill="#B0B0B0" />
  </svg>
);

// 60-degree elevated perspective shower
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="24" cy="46" rx="16" ry="2" fill="#505050" opacity="0.2" />
    
    {/* Shower tray/base - 60deg elevated view */}
    <rect x="6" y="38" width="36" height="8" fill="#E8E8E8" stroke="#D0D0D0" strokeWidth="1" />
    {/* Tray top surface */}
    <path d="M6 38 L10 34 L46 34 L42 38 Z" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="0.5" />
    {/* Drain */}
    <ellipse cx="24" cy="42" rx="3" ry="1.5" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
    <circle cx="24" cy="42" r="1" fill="#606060" />
    
    {/* Back wall panel - glass/tile */}
    <rect x="6" y="6" width="36" height="30" fill="#E0F0F8" opacity="0.5" stroke="#C0D8E8" strokeWidth="1" />
    {/* Tile pattern */}
    <line x1="6" y1="14" x2="42" y2="14" stroke="#B0C8D8" strokeWidth="0.5" />
    <line x1="6" y1="22" x2="42" y2="22" stroke="#B0C8D8" strokeWidth="0.5" />
    <line x1="6" y1="30" x2="42" y2="30" stroke="#B0C8D8" strokeWidth="0.5" />
    <line x1="18" y1="6" x2="18" y2="36" stroke="#B0C8D8" strokeWidth="0.5" />
    <line x1="30" y1="6" x2="30" y2="36" stroke="#B0C8D8" strokeWidth="0.5" />
    
    {/* Shower pole/pipe - vertical */}
    <rect x="34" y="8" width="3" height="24" fill="#B0B0B0" stroke="#909090" strokeWidth="1" />
    
    {/* Shower head - rain style from above */}
    <ellipse cx="28" cy="10" rx="8" ry="4" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" />
    <ellipse cx="28" cy="11" rx="6" ry="3" fill="#B0B0B0" stroke="#909090" strokeWidth="0.5" />
    {/* Shower head holes */}
    <circle cx="25" cy="11" r="0.5" fill="#808080" />
    <circle cx="28" cy="11" r="0.5" fill="#808080" />
    <circle cx="31" cy="11" r="0.5" fill="#808080" />
    <circle cx="26.5" cy="13" r="0.5" fill="#808080" />
    <circle cx="29.5" cy="13" r="0.5" fill="#808080" />
    
    {/* Water drops */}
    <circle cx="26" cy="18" r="1" fill="#88C8E8" opacity="0.7" />
    <circle cx="30" cy="20" r="1" fill="#88C8E8" opacity="0.6" />
    <circle cx="24" cy="24" r="1.5" fill="#88C8E8" opacity="0.5" />
    <circle cx="28" cy="26" r="1" fill="#88C8E8" opacity="0.6" />
    <circle cx="32" cy="28" r="1" fill="#88C8E8" opacity="0.4" />
    <circle cx="26" cy="30" r="1.5" fill="#88C8E8" opacity="0.4" />
    
    {/* Mixer/controls */}
    <rect x="35" y="20" width="4" height="6" rx="1" fill="#A0A0A0" stroke="#808080" strokeWidth="0.5" />
    <circle cx="37" cy="23" r="1.5" fill="#C0C0C0" stroke="#909090" strokeWidth="0.5" />
    
    {/* Glass door edge hint */}
    <rect x="4" y="6" width="3" height="32" fill="#A8D0E8" opacity="0.4" stroke="#90B8D0" strokeWidth="0.5" />
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

// Laptop - designed to overlay on desk/table
export const ComputerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Laptop base/keyboard section */}
    <rect x="8" y="28" width="32" height="16" rx="1" fill="#4A4A4A" stroke="#3A3A3A" strokeWidth="1" />
    {/* Keyboard area */}
    <rect x="10" y="30" width="28" height="10" fill="#3A3A3A" />
    {/* Keyboard keys row 1 */}
    <rect x="12" y="32" width="24" height="2" fill="#5A5A5A" rx="0.5" />
    {/* Keyboard keys row 2 */}
    <rect x="12" y="35" width="24" height="2" fill="#5A5A5A" rx="0.5" />
    {/* Trackpad */}
    <rect x="18" y="40" width="12" height="3" rx="0.5" fill="#505050" stroke="#404040" strokeWidth="0.5" />
    
    {/* Screen - tilted back (perspective) */}
    <path d="M10 28 L8 6 L40 6 L38 28 Z" fill="#2A2A2A" stroke="#1A1A1A" strokeWidth="1" />
    {/* Screen display */}
    <path d="M11 26 L9.5 8 L38.5 8 L37 26 Z" fill="#3A5A6A" stroke="#2A4A5A" strokeWidth="1" />
    {/* Screen reflection/gradient */}
    <path d="M11 26 L9.5 8 L38.5 8 L37 26 Z" fill="url(#screenGradient)" opacity="0.3" />
    {/* Screen content hints */}
    <rect x="14" y="12" width="14" height="2" fill="#5A7A8A" opacity="0.6" />
    <rect x="14" y="16" width="10" height="2" fill="#5A7A8A" opacity="0.4" />
    <rect x="14" y="20" width="8" height="2" fill="#5A7A8A" opacity="0.3" />
    
    {/* Hinge line */}
    <rect x="10" y="27" width="28" height="2" fill="#3A3A3A" />
    
    {/* Camera dot */}
    <circle cx="24" cy="8" r="1" fill="#2A2A2A" stroke="#3A3A3A" strokeWidth="0.5" />
    
    {/* Gradient definition */}
    <defs>
      <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8AC" />
        <stop offset="100%" stopColor="#468" />
      </linearGradient>
    </defs>
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
