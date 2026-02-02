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
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const topY = connectedTop ? 4 : 6;
  const bottomY = connectedBottom ? 40 : 38;
  const leftX = connectedLeft ? 0 : 4;
  const rightX = connectedRight ? 48 : 44;

  // Remove inner padding on connected edges so the bed reads as ONE piece across cells
  const mattressInsetLeft = connectedLeft ? 0 : 2;
  const mattressInsetRight = connectedRight ? 0 : 2;
  const mattressX = leftX + mattressInsetLeft;
  const mattressW = (rightX - leftX) - (mattressInsetLeft + mattressInsetRight);
  
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Back legs */}
      {!connectedTop && !connectedLeft && (
        <rect x="6" y="4" width="3" height="8" fill="#5A4030" />
      )}
      {!connectedTop && !connectedRight && (
        <rect x="39" y="4" width="3" height="8" fill="#5A4030" />
      )}
      {/* Front legs */}
      {!connectedBottom && !connectedLeft && (
        <rect x="6" y="38" width="3" height="8" fill="#6B5040" />
      )}
      {!connectedBottom && !connectedRight && (
        <rect x="39" y="38" width="3" height="8" fill="#6B5040" />
      )}
      
      {/* Bed frame - top surface */}
      <rect x={leftX} y={topY} width={rightX - leftX} height={bottomY - topY} fill="#8B7355" />
      
      {/* Mattress - top surface */}
      <rect x={mattressX} y={topY + 2} width={mattressW} height={bottomY - topY - 4} fill="#F5EDE3" />
      
      {/* Pillows at head: only draw on the OUTER ends so a 2-cell bed doesn't look like 2 beds */}
      {!connectedTop && (
        <>
          {!connectedLeft && (
            <rect x={leftX + 4} y={topY + 4} width="14" height="6" rx="1" fill="#E8D4BE" />
          )}
          {!connectedRight && (
            <rect x={rightX - 18} y={topY + 4} width="14" height="6" rx="1" fill="#E8D4BE" />
          )}
        </>
      )}
      
      {/* Blanket/duvet - top surface */}
      <rect x={mattressX} y={connectedTop ? topY + 2 : topY + 12} width={mattressW} height={connectedTop ? bottomY - topY - 4 : bottomY - topY - 14} fill="#D4A574" />
      
      {/* Bed frame - front face */}
      {!connectedBottom && (
        <rect x={leftX} y={bottomY} width={rightX - leftX} height="3" fill="#6B5A48" />
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
};
