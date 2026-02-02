import { AssetType } from "@/types/game";

interface AssetIconProps {
  className?: string;
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
  // Determine bed role based on connections
  // Headboard: no connection above/left but has connection below/right
  // Footboard: has connection above/left but no connection below/right
  // Single: no connections (shows both)
  
  const isVerticalBed = connectedTop || connectedBottom;
  const isHorizontalBed = connectedLeft || connectedRight;
  
  // For vertical beds: top cell is head, bottom cell is foot
  const isHeadVertical = !connectedTop && connectedBottom;
  const isFootVertical = connectedTop && !connectedBottom;
  
  // For horizontal beds: left cell is head, right cell is foot
  const isHeadHorizontal = !connectedLeft && connectedRight;
  const isFootHorizontal = connectedLeft && !connectedRight;
  
  const isHead = isHeadVertical || isHeadHorizontal;
  const isFoot = isFootVertical || isFootHorizontal;
  const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
  
  // Extend edges to connect with adjacent cells
  const topY = connectedTop ? 0 : 6;
  const bottomY = connectedBottom ? 48 : 38;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;

  // Mattress insets
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
      {/* 
        Leg positioning logic:
        - For VERTICAL beds: head is TOP, foot is BOTTOM → back legs at top, front legs at bottom
        - For HORIZONTAL beds: head is LEFT, foot is RIGHT → left legs on head cell, right legs on foot cell
        - For SINGLE beds: all 4 legs visible
      */}
      
      {/* Top-left leg */}
      {(isSingle || (isVerticalBed && isHead) || (isHorizontalBed && isHead)) && !connectedTop && !connectedLeft && (
        <rect x="6" y="4" width="3" height="8" fill="#5A4030" />
      )}
      
      {/* Top-right leg */}
      {(isSingle || (isVerticalBed && isHead) || (isHorizontalBed && isFoot)) && !connectedTop && !connectedRight && (
        <rect x="39" y="4" width="3" height="8" fill="#5A4030" />
      )}
      
      {/* Bottom-left leg */}
      {(isSingle || (isVerticalBed && isFoot) || (isHorizontalBed && isHead)) && !connectedBottom && !connectedLeft && (
        <rect x="6" y="38" width="3" height="8" fill="#6B5040" />
      )}
      
      {/* Bottom-right leg */}
      {(isSingle || (isVerticalBed && isFoot) || (isHorizontalBed && isFoot)) && !connectedBottom && !connectedRight && (
        <rect x="39" y="38" width="3" height="8" fill="#6B5040" />
      )}
      
      {/* Bed frame - top surface */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={bottomY - topY} fill="#8B7355" />
      
      {/* Mattress - top surface */}
      <rect x={mattressX} y={mattressY} width={mattressW} height={mattressH} fill="#F5EDE3" />
      
      {/* Pillows - only on head cell or single bed */}
      {(isHead || isSingle) && (
        <>
          {isHorizontalBed ? (
            // Horizontal bed: pillows on the left side (vertical arrangement)
            <>
              <rect x={leftX + 4} y={topY + 4} width="6" height="12" rx="1" fill="#E8D4BE" />
              <rect x={leftX + 4} y={bottomY - 16} width="6" height="12" rx="1" fill="#E8D4BE" />
            </>
          ) : (
            // Vertical or single bed: pillows at top (horizontal arrangement)
            <>
              <rect x={leftX + 4} y={topY + 4} width="14" height="6" rx="1" fill="#E8D4BE" />
              <rect x={rightX - 18} y={topY + 4} width="14" height="6" rx="1" fill="#E8D4BE" />
            </>
          )}
        </>
      )}
      
      {/* Blanket/duvet */}
      {isHorizontalBed ? (
        // Horizontal bed: blanket covers from after pillows to the right
        <rect 
          x={isHead ? leftX + 14 : mattressX} 
          y={mattressY} 
          width={isHead ? mattressW - 12 : mattressW} 
          height={mattressH} 
          fill="#D4A574" 
        />
      ) : (
        // Vertical or single bed: blanket from after pillows down
        <rect 
          x={mattressX} 
          y={isHead || isSingle ? topY + 12 : mattressY} 
          width={mattressW} 
          height={isHead || isSingle ? mattressH - 10 : mattressH} 
          fill="#D4A574" 
        />
      )}
      
      {/* Bed frame - front/foot face - only on foot cell or single */}
      {(isFoot || isSingle) && !connectedBottom && !connectedRight && (
        <>
          {isHorizontalBed ? (
            // Horizontal bed: footboard on the right side
            <rect x={rightX - 3} y={topY} width="3" height={bottomY - topY} fill="#6B5A48" />
          ) : (
            // Vertical or single bed: footboard at the bottom
            <rect x={leftX} y={bottomY} width={rightX - leftX} height="3" fill="#6B5A48" />
          )}
        </>
      )}
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
      {/* Back legs */}
      {!connectedTop && !connectedLeft && (
        <rect x="6" y="6" width="3" height="8" fill="#3A2D4A" />
      )}
      {!connectedTop && !connectedRight && (
        <rect x="39" y="6" width="3" height="8" fill="#3A2D4A" />
      )}
      {/* Front legs */}
      {!connectedBottom && !connectedLeft && (
        <rect x="6" y="36" width="3" height="8" fill="#4A3D5C" />
      )}
      {!connectedBottom && !connectedRight && (
        <rect x="39" y="36" width="3" height="8" fill="#4A3D5C" />
      )}
      
      {/* Backrest - top face (only if not connected top) */}
      {!connectedTop && (
        <>
          <rect x={leftX} y={topY} width={rightX - leftX} height="8" fill="#9580B8" />
          <rect x={leftX} y={topY + 8} width={rightX - leftX} height="4" fill="#7B68A0" />
        </>
      )}
      
      {/* Seat cushion - top face */}
      <rect x={leftX} y={connectedTop ? topY : topY + 12} width={rightX - leftX} height={connectedTop ? bottomY - topY - 2 : bottomY - topY - 14} fill="#A894C8" />
      
      {/* Seat cushion - front face */}
      {!connectedBottom && (
        <rect x={leftX} y={bottomY - 2} width={rightX - leftX} height="3" fill="#7B68A0" />
      )}
      
      {/* Armrests (only on non-connected sides) */}
      {!connectedLeft && (
        <>
          <rect x={leftX} y={connectedTop ? topY : topY + 8} width="6" height={connectedTop ? bottomY - topY - 2 : bottomY - topY - 10} fill="#8B7AA8" />
          {!connectedBottom && <rect x={leftX} y={bottomY - 2} width="6" height="3" fill="#6B5A8C" />}
        </>
      )}
      {!connectedRight && (
        <>
          <rect x={rightX - 6} y={connectedTop ? topY : topY + 8} width="6" height={connectedTop ? bottomY - topY - 2 : bottomY - topY - 10} fill="#8B7AA8" />
          {!connectedBottom && <rect x={rightX - 6} y={bottomY - 2} width="6" height="3" fill="#6B5A8C" />}
        </>
      )}
    </svg>
  );
};

export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back legs */}
    <rect x="10" y="6" width="3" height="8" fill="#2D4237" />
    <rect x="35" y="6" width="3" height="8" fill="#2D4237" />
    {/* Front legs */}
    <rect x="10" y="36" width="3" height="8" fill="#3D5247" />
    <rect x="35" y="36" width="3" height="8" fill="#3D5247" />
    
    {/* Backrest - top face */}
    <rect x="10" y="8" width="28" height="8" fill="#7FA68D" />
    {/* Backrest - front face */}
    <rect x="10" y="16" width="28" height="4" fill="#6B8E7B" />
    
    {/* Seat cushion - top face */}
    <rect x="10" y="20" width="28" height="14" fill="#8FB89F" />
    {/* Seat cushion - front face */}
    <rect x="10" y="34" width="28" height="3" fill="#6B8E7B" />
    
    {/* Armrests - top face */}
    <rect x="6" y="16" width="6" height="18" fill="#7FA68D" />
    <rect x="36" y="16" width="6" height="18" fill="#7FA68D" />
    {/* Armrests - front face */}
    <rect x="6" y="34" width="6" height="3" fill="#5A7D6A" />
    <rect x="36" y="34" width="6" height="3" fill="#5A7D6A" />
  </svg>
);

// 60-degree perspective rug - flat on floor with subtle depth
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rug base - top surface */}
    <rect x="4" y="8" width="40" height="28" fill="#C4A77D" />
    {/* Rug front edge - slight depth */}
    <rect x="4" y="36" width="40" height="2" fill="#A68B5B" />
    {/* Inner pattern border */}
    <rect x="8" y="12" width="32" height="20" fill="#D4B88D" stroke="#A68B5B" strokeWidth="1" />
    {/* Center medallion */}
    <ellipse cx="24" cy="22" rx="8" ry="6" fill="#E8D4BE" />
    <ellipse cx="24" cy="22" rx="5" ry="4" fill="#C4A77D" />
    {/* Corner decorations */}
    <rect x="10" y="14" width="4" height="4" fill="#A68B5B" />
    <rect x="34" y="14" width="4" height="4" fill="#A68B5B" />
    <rect x="10" y="26" width="4" height="4" fill="#A68B5B" />
    <rect x="34" y="26" width="4" height="4" fill="#A68B5B" />
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
    {/* Pot - back */}
    <rect x="14" y="28" width="20" height="4" fill="#8B5A2B" />
    {/* Pot - top surface */}
    <rect x="16" y="26" width="16" height="6" fill="#D4A574" />
    {/* Pot - front face */}
    <rect x="14" y="32" width="20" height="10" fill="#A0704D" />
    {/* Pot rim */}
    <rect x="14" y="30" width="20" height="3" fill="#C4956A" />
    {/* Soil visible */}
    <ellipse cx="24" cy="28" rx="7" ry="2" fill="#5A3A20" />
    {/* Foliage - layered leaves from back to front */}
    <ellipse cx="24" cy="14" rx="6" ry="8" fill="#4A7C59" />
    <ellipse cx="18" cy="18" rx="5" ry="6" fill="#5D9B6E" />
    <ellipse cx="30" cy="18" rx="5" ry="6" fill="#5D9B6E" />
    <ellipse cx="24" cy="20" rx="7" ry="5" fill="#6BAF7C" />
    <ellipse cx="21" cy="16" rx="3" ry="4" fill="#7CC98D" />
    <ellipse cx="27" cy="16" rx="3" ry="4" fill="#7CC98D" />
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
    <rect x="14" y="38" width="3" height="6" fill="#1C1C1C" />
    <rect x="31" y="38" width="3" height="6" fill="#1C1C1C" />
    {/* Stand base - top surface */}
    <rect x="10" y="36" width="28" height="4" fill="#3C3C3C" />
    {/* Stand base - front face */}
    <rect x="10" y="40" width="28" height="2" fill="#2C2C2C" />
    {/* TV frame - back */}
    <rect x="4" y="6" width="40" height="28" fill="#1C1C1C" />
    {/* TV screen - top surface with reflection */}
    <rect x="6" y="8" width="36" height="24" fill="#2A4A5A" />
    <rect x="6" y="8" width="36" height="8" fill="#3A6A7A" opacity="0.5" />
    {/* TV frame - front face */}
    <rect x="4" y="34" width="40" height="2" fill="#2C2C2C" />
    {/* Screen highlight */}
    <rect x="8" y="10" width="8" height="4" fill="#4A8A9A" opacity="0.3" />
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
    
    {/* Frame - top surface */}
    <rect x="6" y="6" width="36" height="34" fill="#8B7355" />
    {/* Frame - front face */}
    <rect x="6" y="40" width="36" height="3" fill="#6B5A48" />
    
    {/* Shelves - 3 levels */}
    <rect x="8" y="8" width="32" height="8" fill="#6B5A48" />
    <rect x="8" y="18" width="32" height="8" fill="#6B5A48" />
    <rect x="8" y="28" width="32" height="8" fill="#6B5A48" />
    
    {/* Books on top shelf */}
    <rect x="10" y="9" width="4" height="6" fill="#C75B5B" />
    <rect x="15" y="8" width="3" height="7" fill="#5B8BC7" />
    <rect x="19" y="9" width="5" height="6" fill="#5BC77C" />
    <rect x="25" y="8" width="4" height="7" fill="#C7A85B" />
    <rect x="30" y="9" width="3" height="6" fill="#9B7BC7" />
    
    {/* Books on middle shelf */}
    <rect x="10" y="19" width="5" height="6" fill="#7B5BC7" />
    <rect x="16" y="18" width="4" height="7" fill="#C75B8B" />
    <rect x="21" y="19" width="6" height="6" fill="#5BC7C7" />
    <rect x="28" y="18" width="4" height="7" fill="#C7875B" />
    
    {/* Books on bottom shelf */}
    <rect x="10" y="29" width="4" height="6" fill="#5B8BC7" />
    <rect x="15" y="28" width="5" height="7" fill="#8BC75B" />
    <rect x="21" y="29" width="3" height="6" fill="#C75B5B" />
    <rect x="25" y="28" width="6" height="7" fill="#5BC7A8" />
  </svg>
);

// 60-degree perspective rock formation
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow/base */}
    <ellipse cx="24" cy="40" rx="16" ry="4" fill="#505050" opacity="0.3" />
    {/* Main rock body - back */}
    <path d="M10 32 L18 18 L28 14 L38 20 L40 34 L34 40 L14 40 Z" fill="#707070" />
    {/* Main rock body - top surface */}
    <path d="M12 30 L18 18 L28 14 L36 20 L34 32 L20 34 Z" fill="#909090" />
    {/* Rock face - front */}
    <path d="M12 30 L20 34 L14 40 L10 36 Z" fill="#606060" />
    <path d="M20 34 L34 32 L34 40 L14 40 Z" fill="#585858" />
    {/* Highlight */}
    <path d="M20 20 L26 16 L30 20 L24 24 Z" fill="#A0A0A0" opacity="0.5" />
    {/* Crack details */}
    <line x1="22" y1="24" x2="26" y2="34" stroke="#505050" strokeWidth="1" />
  </svg>
);

// 60-degree perspective debris/rubble
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow */}
    <ellipse cx="24" cy="40" rx="18" ry="4" fill="#3A2A1A" opacity="0.3" />
    
    {/* Large plank - back */}
    <rect x="6" y="26" width="16" height="4" fill="#8B6914" transform="rotate(-15 6 26)" />
    <rect x="6" y="30" width="16" height="2" fill="#6B5010" transform="rotate(-15 6 26)" />
    
    {/* Medium plank - middle */}
    <rect x="20" y="28" width="14" height="4" fill="#A0784B" transform="rotate(8 20 28)" />
    <rect x="20" y="32" width="14" height="2" fill="#7A5A38" transform="rotate(8 20 28)" />
    
    {/* Small plank - front */}
    <rect x="28" y="32" width="10" height="3" fill="#CD9B5F" transform="rotate(-5 28 32)" />
    <rect x="28" y="35" width="10" height="1.5" fill="#A07A48" transform="rotate(-5 28 32)" />
    
    {/* Broken piece */}
    <polygon points="12,34 18,32 20,38 14,40" fill="#9B7333" />
    <polygon points="14,40 20,38 18,42" fill="#7A5A28" />
    
    {/* Small fragments */}
    <rect x="32" y="36" width="4" height="3" fill="#B8864B" transform="rotate(20 32 36)" />
    <rect x="8" y="38" width="3" height="2" fill="#8B6914" transform="rotate(-10 8 38)" />
  </svg>
);

export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// === KITCHEN ASSETS ===

// 60-degree perspective fridge
export const FridgeIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow/base */}
    <rect x="10" y="42" width="28" height="4" fill="#505050" opacity="0.2" />
    {/* Main body - back */}
    <rect x="10" y="4" width="28" height="38" fill="#E8E8E8" />
    {/* Top surface */}
    <rect x="10" y="4" width="28" height="4" fill="#F5F5F5" />
    {/* Freezer door */}
    <rect x="12" y="6" width="24" height="10" fill="#D0D0D0" stroke="#B0B0B0" strokeWidth="1" />
    {/* Handle - freezer */}
    <rect x="32" y="9" width="2" height="4" fill="#808080" />
    {/* Fridge door */}
    <rect x="12" y="18" width="24" height="22" fill="#E0E0E0" stroke="#B0B0B0" strokeWidth="1" />
    {/* Handle - fridge */}
    <rect x="32" y="24" width="2" height="8" fill="#808080" />
    {/* Front face - depth */}
    <rect x="10" y="40" width="28" height="2" fill="#C0C0C0" />
  </svg>
);

// 60-degree perspective stove
export const StoveIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Legs */}
    <rect x="10" y="40" width="3" height="6" fill="#303030" />
    <rect x="35" y="40" width="3" height="6" fill="#303030" />
    {/* Main body */}
    <rect x="8" y="8" width="32" height="32" fill="#404040" />
    {/* Top surface */}
    <rect x="8" y="8" width="32" height="8" fill="#505050" />
    {/* Burners - top view */}
    <circle cx="18" cy="12" r="5" fill="#303030" stroke="#606060" strokeWidth="1" />
    <circle cx="30" cy="12" r="5" fill="#303030" stroke="#606060" strokeWidth="1" />
    {/* Burner grates */}
    <circle cx="18" cy="12" r="3" fill="none" stroke="#505050" strokeWidth="1" />
    <circle cx="30" cy="12" r="3" fill="none" stroke="#505050" strokeWidth="1" />
    {/* Oven door */}
    <rect x="10" y="18" width="28" height="18" fill="#353535" stroke="#505050" strokeWidth="1" />
    {/* Oven handle */}
    <rect x="16" y="20" width="16" height="2" fill="#606060" />
    {/* Oven window */}
    <rect x="14" y="24" width="20" height="8" fill="#1A1A1A" />
    {/* Control panel */}
    <rect x="10" y="36" width="28" height="4" fill="#454545" />
    {/* Knobs */}
    <circle cx="16" cy="38" r="2" fill="#606060" />
    <circle cx="24" cy="38" r="2" fill="#606060" />
    <circle cx="32" cy="38" r="2" fill="#606060" />
  </svg>
);

// 60-degree perspective chair
export const ChairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Back legs */}
    <rect x="12" y="6" width="3" height="10" fill="#6B5040" />
    <rect x="33" y="6" width="3" height="10" fill="#6B5040" />
    {/* Front legs */}
    <rect x="12" y="32" width="3" height="14" fill="#7A5D4C" />
    <rect x="33" y="32" width="3" height="14" fill="#7A5D4C" />
    {/* Backrest */}
    <rect x="10" y="8" width="28" height="8" fill="#A08060" />
    <rect x="10" y="16" width="28" height="2" fill="#8B7050" />
    {/* Seat */}
    <rect x="10" y="18" width="28" height="14" fill="#B89070" />
    {/* Seat front edge */}
    <rect x="10" y="32" width="28" height="2" fill="#8B7050" />
  </svg>
);

// === BATHROOM ASSETS ===

// 60-degree perspective toilet
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base/shadow */}
    <ellipse cx="24" cy="42" rx="12" ry="3" fill="#505050" opacity="0.2" />
    {/* Tank - back */}
    <rect x="14" y="6" width="20" height="12" rx="2" fill="#F0F0F0" />
    <rect x="14" y="18" width="20" height="2" fill="#E0E0E0" />
    {/* Tank lid */}
    <rect x="12" y="4" width="24" height="4" rx="1" fill="#FAFAFA" />
    {/* Flush button */}
    <rect x="22" y="6" width="4" height="2" rx="1" fill="#C0C0C0" />
    {/* Bowl - top view (oval) */}
    <ellipse cx="24" cy="30" rx="12" ry="10" fill="#F5F5F5" />
    <ellipse cx="24" cy="30" rx="9" ry="7" fill="#E8E8E8" />
    {/* Seat */}
    <ellipse cx="24" cy="30" rx="11" ry="9" fill="none" stroke="#D0D0D0" strokeWidth="2" />
    {/* Bowl front depth */}
    <path d="M12 30 Q12 42 24 42 Q36 42 36 30" fill="#E0E0E0" />
  </svg>
);

// 60-degree perspective sink
export const SinkIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cabinet */}
    <rect x="6" y="20" width="36" height="24" fill="#C4A574" />
    <rect x="6" y="44" width="36" height="2" fill="#A08050" />
    {/* Cabinet doors */}
    <rect x="8" y="24" width="14" height="18" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
    <rect x="26" y="24" width="14" height="18" fill="#D4B584" stroke="#A08050" strokeWidth="1" />
    {/* Door handles */}
    <rect x="19" y="31" width="2" height="4" fill="#808080" />
    <rect x="27" y="31" width="2" height="4" fill="#808080" />
    {/* Counter top */}
    <rect x="4" y="16" width="40" height="6" fill="#E8E0D8" />
    {/* Sink basin - top view */}
    <ellipse cx="24" cy="18" rx="10" ry="4" fill="#D0D0D0" />
    <ellipse cx="24" cy="18" rx="8" ry="3" fill="#B0B0B0" />
    {/* Faucet */}
    <rect x="22" y="8" width="4" height="8" fill="#A0A0A0" />
    <rect x="20" y="6" width="8" height="3" rx="1" fill="#B0B0B0" />
    {/* Faucet spout */}
    <path d="M24 9 L24 12 L28 14" stroke="#909090" strokeWidth="2" fill="none" />
  </svg>
);

// 60-degree perspective shower
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Base/tray */}
    <rect x="4" y="38" width="40" height="8" fill="#E8E8E8" />
    <rect x="4" y="38" width="40" height="2" fill="#F5F5F5" />
    {/* Back wall */}
    <rect x="4" y="4" width="40" height="34" fill="#F0F0F0" />
    {/* Tiles pattern */}
    <line x1="4" y1="14" x2="44" y2="14" stroke="#D0D0D0" strokeWidth="1" />
    <line x1="4" y1="24" x2="44" y2="24" stroke="#D0D0D0" strokeWidth="1" />
    <line x1="4" y1="34" x2="44" y2="34" stroke="#D0D0D0" strokeWidth="1" />
    <line x1="14" y1="4" x2="14" y2="38" stroke="#D0D0D0" strokeWidth="1" />
    <line x1="24" y1="4" x2="24" y2="38" stroke="#D0D0D0" strokeWidth="1" />
    <line x1="34" y1="4" x2="34" y2="38" stroke="#D0D0D0" strokeWidth="1" />
    {/* Shower head */}
    <rect x="20" y="6" width="8" height="3" rx="1" fill="#A0A0A0" />
    <ellipse cx="24" cy="11" rx="5" ry="2" fill="#909090" />
    {/* Shower arm */}
    <rect x="23" y="4" width="2" height="4" fill="#808080" />
    {/* Water drops */}
    <circle cx="20" cy="16" r="1" fill="#87CEEB" opacity="0.6" />
    <circle cx="24" cy="18" r="1" fill="#87CEEB" opacity="0.6" />
    <circle cx="28" cy="16" r="1" fill="#87CEEB" opacity="0.6" />
    <circle cx="22" cy="22" r="1" fill="#87CEEB" opacity="0.5" />
    <circle cx="26" cy="24" r="1" fill="#87CEEB" opacity="0.5" />
    {/* Glass door - translucent */}
    <rect x="40" y="4" width="4" height="34" fill="#B8D4E8" opacity="0.4" />
    <rect x="40" y="4" width="1" height="34" fill="#A0C0D0" />
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
      {/* Back legs */}
      {!connectedTop && !connectedLeft && (
        <rect x="6" y="6" width="3" height={legHeight} fill="#4A4A4A" />
      )}
      {!connectedTop && !connectedRight && (
        <rect x="39" y="6" width="3" height={legHeight} fill="#4A4A4A" />
      )}
      
      {/* Front legs */}
      {!connectedBottom && !connectedLeft && (
        <rect x="6" y="36" width="3" height={legHeight} fill="#5A5A5A" />
      )}
      {!connectedBottom && !connectedRight && (
        <rect x="39" y="36" width="3" height={legHeight} fill="#5A5A5A" />
      )}
      
      {/* Desktop surface */}
      <rect 
        x={leftX} 
        y={topY} 
        width={rightX - leftX} 
        height={bottomY - topY} 
        fill="#8B7355"
      />
      
      {/* Keyboard tray hint */}
      <rect 
        x={leftX + 4} 
        y={bottomY - 8} 
        width={rightX - leftX - 8} 
        height="4"
        fill="#6B5A48"
        opacity="0.5"
      />
      
      {/* Desktop edge - front */}
      {!connectedBottom && (
        <rect 
          x={leftX} 
          y={bottomY} 
          width={rightX - leftX} 
          height="3"
          fill="#6B5A48"
        />
      )}
      
      {/* Surface border */}
      <rect 
        x={leftX} 
        y={topY} 
        width={rightX - leftX} 
        height={bottomY - topY} 
        fill="none"
        stroke="#5A4A3A"
        strokeWidth="1"
      />
    </svg>
  );
};

// 60-degree perspective computer
export const ComputerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Desk surface hint */}
    <rect x="4" y="32" width="40" height="14" fill="#8B7355" />
    <rect x="4" y="46" width="40" height="2" fill="#6B5A48" />
    {/* Monitor stand */}
    <rect x="20" y="28" width="8" height="6" fill="#303030" />
    <rect x="16" y="32" width="16" height="2" fill="#404040" />
    {/* Monitor */}
    <rect x="6" y="6" width="36" height="24" rx="1" fill="#2A2A2A" />
    {/* Screen */}
    <rect x="8" y="8" width="32" height="18" fill="#3A5A7A" />
    {/* Screen reflection */}
    <rect x="8" y="8" width="32" height="6" fill="#4A7A9A" opacity="0.4" />
    {/* Monitor bezel bottom */}
    <rect x="6" y="26" width="36" height="2" fill="#353535" />
    {/* Keyboard */}
    <rect x="10" y="36" width="22" height="6" rx="1" fill="#404040" />
    <rect x="12" y="38" width="18" height="2" fill="#505050" />
    {/* Mouse */}
    <ellipse cx="38" cy="39" rx="4" ry="3" fill="#404040" />
    <rect x="37" y="37" width="2" height="2" fill="#505050" />
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
