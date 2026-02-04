import { AssetType } from "@/types/game";

interface AssetIconProps {
  className?: string;
}

// Direction type for rotatable assets
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

// Connectable + Directional asset props
interface ConnectableDirectionalAssetProps extends ConnectableAssetProps {
  direction?: AssetDirection;
}

// Pixel art color palette - 60 degree view
const COLORS = {
  wood: {
    top: '#C4A882',
    front: '#8B6B4A',
    side: '#6B5038',
    dark: '#4A3828',
  },
  fabric: {
    purple: { top: '#B8A8D8', front: '#8878A8', side: '#6858888' },
    blue: { top: '#A8C8E8', front: '#6898C8', side: '#4878A8' },
    green: { top: '#A8D8B8', front: '#68A878', side: '#488858' },
    red: { top: '#E8B8B8', front: '#C88888', side: '#A86868' },
  },
  metal: {
    top: '#E8E8E8',
    front: '#B8B8B8',
    side: '#888888',
    dark: '#585858',
  },
  plant: {
    leaf: '#78B888',
    leafDark: '#589868',
    pot: '#C87848',
    potDark: '#A85828',
    soil: '#584030',
  },
  water: {
    top: '#A8D8F0',
    front: '#78B8D8',
  },
  white: '#F8F8F8',
  cream: '#F0E8E0',
  pillow: '#F8F0F0',
};

// ==================== CONNECTABLE ASSETS ====================

// Bed - 60 degree isometric view with connections
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const isHead = (!connectedTop && connectedBottom) || (!connectedLeft && connectedRight);
  const isFoot = (connectedTop && !connectedBottom) || (connectedLeft && !connectedRight);
  const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
  
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Headboard - only on head or single */}
      {(isHead || isSingle) && (
        <>
          <rect x="1" y="1" width="14" height="3" fill={COLORS.wood.front} />
          <rect x="1" y="1" width="14" height="1" fill={COLORS.wood.top} />
          <rect x="1" y="1" width="1" height="3" fill={COLORS.wood.dark} />
          <rect x="14" y="1" width="1" height="3" fill={COLORS.wood.side} />
        </>
      )}
      
      {/* Frame base */}
      <rect x="1" y="11" width="14" height="4" fill={COLORS.wood.front} />
      <rect x="1" y="11" width="14" height="1" fill={COLORS.wood.top} />
      
      {/* Mattress */}
      <rect x="2" y="4" width="12" height="8" fill={COLORS.cream} />
      <rect x="2" y="4" width="12" height="2" fill={COLORS.white} />
      
      {/* Blanket */}
      <rect x="2" y="7" width="12" height="5" fill={COLORS.fabric.blue.front} />
      <rect x="2" y="7" width="12" height="1" fill={COLORS.fabric.blue.top} />
      
      {/* Pillows - only on head or single */}
      {(isHead || isSingle) && (
        <>
          <rect x="3" y="4" width="4" height="3" rx="1" fill={COLORS.pillow} />
          <rect x="9" y="4" width="4" height="3" rx="1" fill={COLORS.pillow} />
        </>
      )}
      
      {/* Legs - hide on connected sides */}
      {!connectedLeft && !connectedBottom && (
        <rect x="1" y="14" width="2" height="2" fill={COLORS.wood.dark} />
      )}
      {!connectedRight && !connectedBottom && (
        <rect x="13" y="14" width="2" height="2" fill={COLORS.wood.dark} />
      )}
    </svg>
  );
};

// Sofa - 60 degree view with connections
export const SofaIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Back cushion - hide if connected on top */}
      {!connectedTop && (
        <>
          <rect x="2" y="2" width="12" height="5" fill={COLORS.fabric.purple.front} />
          <rect x="2" y="2" width="12" height="1" fill={COLORS.fabric.purple.top} />
        </>
      )}
      
      {/* Seat cushion */}
      <rect x="2" y="7" width="12" height="4" fill={COLORS.fabric.purple.front} />
      <rect x="2" y="7" width="12" height="1" fill={COLORS.fabric.purple.top} />
      
      {/* Left arm - hide if connected */}
      {!connectedLeft && (
        <>
          <rect x="0" y="3" width="3" height="9" fill={COLORS.fabric.purple.front} />
          <rect x="0" y="3" width="3" height="1" fill={COLORS.fabric.purple.top} />
        </>
      )}
      
      {/* Right arm - hide if connected */}
      {!connectedRight && (
        <>
          <rect x="13" y="3" width="3" height="9" fill={COLORS.fabric.purple.front} />
          <rect x="13" y="3" width="3" height="1" fill={COLORS.fabric.purple.top} />
        </>
      )}
      
      {/* Base */}
      <rect x="2" y="11" width="12" height="2" fill={COLORS.wood.front} />
      
      {/* Legs - hide on connected sides */}
      {!connectedLeft && (
        <rect x="2" y="13" width="2" height="2" fill={COLORS.wood.dark} />
      )}
      {!connectedRight && (
        <rect x="12" y="13" width="2" height="2" fill={COLORS.wood.dark} />
      )}
    </svg>
  );
};

// Table - 60 degree view with connections
export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: ConnectableAssetProps) => {
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Table top surface */}
      <rect x="0" y="2" width="16" height="4" fill={COLORS.wood.front} />
      <rect x="0" y="2" width="16" height="1" fill={COLORS.wood.top} />
      
      {/* Front apron */}
      <rect x="0" y="5" width="16" height="2" fill={COLORS.wood.side} />
      
      {/* Legs - hide based on connections */}
      {!connectedLeft && (
        <>
          <rect x="1" y="7" width="2" height="8" fill={COLORS.wood.front} />
          <rect x="1" y="7" width="1" height="8" fill={COLORS.wood.dark} />
        </>
      )}
      {!connectedRight && (
        <>
          <rect x="13" y="7" width="2" height="8" fill={COLORS.wood.front} />
          <rect x="14" y="7" width="1" height="8" fill={COLORS.wood.side} />
        </>
      )}
    </svg>
  );
};

// Desk - 60 degree view with connections and drawers
export const DeskIcon = ({
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Desktop surface */}
    <rect x="0" y="2" width="16" height="3" fill={COLORS.wood.front} />
    <rect x="0" y="2" width="16" height="1" fill={COLORS.wood.top} />
    
    {/* Drawer cabinet on right */}
    <rect x="9" y="5" width="6" height="9" fill={COLORS.wood.front} />
    <rect x="10" y="6" width="4" height="3" fill={COLORS.wood.top} />
    <rect x="11" y="7" width="2" height="1" fill={COLORS.metal.dark} />
    <rect x="10" y="10" width="4" height="3" fill={COLORS.wood.top} />
    <rect x="11" y="11" width="2" height="1" fill={COLORS.metal.dark} />
    
    {/* Left leg - hide if connected */}
    {!connectedLeft && (
      <>
        <rect x="1" y="5" width="2" height="10" fill={COLORS.wood.front} />
        <rect x="1" y="5" width="1" height="10" fill={COLORS.wood.dark} />
      </>
    )}
  </svg>
);

// Stove - 60 degree view with connections
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Counter body */}
    <rect x="0" y="4" width="16" height="11" fill={COLORS.metal.front} />
    <rect x="0" y="4" width="16" height="1" fill={COLORS.metal.top} />
    
    {/* Stovetop surface */}
    <rect x="1" y="5" width="14" height="4" fill={COLORS.metal.top} />
    
    {/* Burners */}
    <circle cx="5" cy="7" r="2" fill={COLORS.metal.dark} />
    <circle cx="5" cy="7" r="1" fill={COLORS.metal.side} />
    <circle cx="11" cy="7" r="2" fill={COLORS.metal.dark} />
    <circle cx="11" cy="7" r="1" fill={COLORS.metal.side} />
    
    {/* Oven door */}
    <rect x="2" y="10" width="12" height="5" fill={COLORS.metal.side} />
    <rect x="3" y="11" width="10" height="3" fill="#282828" />
    <rect x="4" y="10" width="8" height="1" fill={COLORS.metal.top} />
  </svg>
);

// Sink - 60 degree view with connections
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Counter body */}
    <rect x="0" y="4" width="16" height="11" fill={COLORS.cream} />
    <rect x="0" y="4" width="16" height="1" fill={COLORS.white} />
    
    {/* Sink basin */}
    <rect x="3" y="6" width="10" height="5" fill={COLORS.water.top} />
    <rect x="4" y="7" width="8" height="3" fill={COLORS.water.front} />
    
    {/* Faucet */}
    <rect x="7" y="3" width="2" height="4" fill={COLORS.metal.front} />
    <rect x="6" y="3" width="4" height="1" fill={COLORS.metal.top} />
    
    {/* Drain */}
    <circle cx="8" cy="8" r="1" fill={COLORS.metal.dark} />
    
    {/* Cabinet doors */}
    <rect x="2" y="11" width="5" height="4" fill={COLORS.cream} />
    <rect x="9" y="11" width="5" height="4" fill={COLORS.cream} />
    <rect x="4" y="13" width="1" height="1" fill={COLORS.metal.dark} />
    <rect x="11" y="13" width="1" height="1" fill={COLORS.metal.dark} />
  </svg>
);

// ==================== SINGLE ASSETS ====================

// Armchair - 60 degree view
export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Back cushion */}
    <rect x="3" y="2" width="10" height="5" fill={COLORS.fabric.green.front} />
    <rect x="3" y="2" width="10" height="1" fill={COLORS.fabric.green.top} />
    
    {/* Seat cushion */}
    <rect x="3" y="7" width="10" height="4" fill={COLORS.fabric.green.front} />
    <rect x="3" y="7" width="10" height="1" fill={COLORS.fabric.green.top} />
    
    {/* Arms */}
    <rect x="0" y="3" width="4" height="9" fill={COLORS.fabric.green.front} />
    <rect x="0" y="3" width="4" height="1" fill={COLORS.fabric.green.top} />
    <rect x="12" y="3" width="4" height="9" fill={COLORS.fabric.green.front} />
    <rect x="12" y="3" width="4" height="1" fill={COLORS.fabric.green.top} />
    
    {/* Legs */}
    <rect x="2" y="12" width="2" height="3" fill={COLORS.wood.dark} />
    <rect x="12" y="12" width="2" height="3" fill={COLORS.wood.dark} />
  </svg>
);

// Chair - 60 degree view with direction
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Backrest */}
    <rect x="3" y="1" width="10" height="5" fill={COLORS.wood.front} />
    <rect x="3" y="1" width="10" height="1" fill={COLORS.wood.top} />
    <rect x="4" y="2" width="3" height="3" fill={COLORS.wood.top} />
    <rect x="9" y="2" width="3" height="3" fill={COLORS.wood.top} />
    
    {/* Seat */}
    <rect x="2" y="6" width="12" height="3" fill={COLORS.wood.front} />
    <rect x="2" y="6" width="12" height="1" fill={COLORS.wood.top} />
    
    {/* Legs */}
    <rect x="3" y="9" width="2" height="6" fill={COLORS.wood.front} />
    <rect x="3" y="9" width="1" height="6" fill={COLORS.wood.dark} />
    <rect x="11" y="9" width="2" height="6" fill={COLORS.wood.front} />
    <rect x="12" y="9" width="1" height="6" fill={COLORS.wood.side} />
  </svg>
);

// Fridge - 60 degree view
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Body */}
    <rect x="2" y="1" width="12" height="14" fill={COLORS.metal.front} />
    <rect x="2" y="1" width="12" height="1" fill={COLORS.metal.top} />
    <rect x="2" y="1" width="1" height="14" fill={COLORS.metal.side} />
    
    {/* Freezer door */}
    <rect x="3" y="2" width="10" height="3" fill={COLORS.white} />
    <rect x="11" y="3" width="1" height="2" fill={COLORS.metal.dark} />
    
    {/* Door gap */}
    <rect x="3" y="5" width="10" height="1" fill={COLORS.metal.dark} />
    
    {/* Fridge door */}
    <rect x="3" y="6" width="10" height="8" fill={COLORS.white} />
    <rect x="11" y="8" width="1" height="4" fill={COLORS.metal.dark} />
  </svg>
);

// TV - 60 degree view
export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Stand */}
    <rect x="6" y="12" width="4" height="2" fill={COLORS.metal.dark} />
    <rect x="5" y="14" width="6" height="1" fill={COLORS.metal.front} />
    
    {/* Frame */}
    <rect x="1" y="2" width="14" height="10" fill={COLORS.metal.dark} />
    <rect x="1" y="2" width="14" height="1" fill={COLORS.metal.side} />
    
    {/* Screen */}
    <rect x="2" y="3" width="12" height="8" fill="#2A3A4A" />
    <rect x="2" y="3" width="12" height="2" fill="#3A4A5A" opacity="0.5" />
    
    {/* Power LED */}
    <rect x="13" y="10" width="1" height="1" fill="#4A8" />
  </svg>
);

// Bookshelf - 60 degree view
export const BookshelfIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Frame */}
    <rect x="1" y="1" width="14" height="14" fill={COLORS.wood.front} />
    <rect x="1" y="1" width="14" height="1" fill={COLORS.wood.top} />
    
    {/* Shelves */}
    <rect x="2" y="5" width="12" height="1" fill={COLORS.wood.dark} />
    <rect x="2" y="10" width="12" height="1" fill={COLORS.wood.dark} />
    
    {/* Books row 1 */}
    <rect x="3" y="2" width="2" height="3" fill="#B86868" />
    <rect x="5" y="2" width="2" height="3" fill="#6888B8" />
    <rect x="7" y="2" width="3" height="3" fill="#68B888" />
    <rect x="10" y="2" width="2" height="3" fill="#B8A868" />
    
    {/* Books row 2 */}
    <rect x="3" y="6" width="3" height="4" fill="#8868B8" />
    <rect x="6" y="6" width="2" height="4" fill="#B86888" />
    <rect x="8" y="6" width="3" height="4" fill="#68B8B8" />
    
    {/* Books row 3 */}
    <rect x="3" y="11" width="2" height="3" fill="#6888B8" />
    <rect x="5" y="11" width="3" height="3" fill="#88B868" />
    <rect x="8" y="11" width="4" height="3" fill="#68B888" />
  </svg>
);

// Plant - 60 degree view
export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Pot */}
    <path d="M4 10 L12 10 L11 15 L5 15 Z" fill={COLORS.plant.pot} />
    <rect x="3" y="9" width="10" height="2" fill={COLORS.plant.potDark} />
    
    {/* Soil */}
    <ellipse cx="8" cy="10" rx="3" ry="1" fill={COLORS.plant.soil} />
    
    {/* Leaves */}
    <ellipse cx="8" cy="5" rx="2" ry="4" fill={COLORS.plant.leaf} />
    <ellipse cx="5" cy="6" rx="2" ry="3" fill={COLORS.plant.leaf} transform="rotate(-20 5 6)" />
    <ellipse cx="11" cy="6" rx="2" ry="3" fill={COLORS.plant.leaf} transform="rotate(20 11 6)" />
    <ellipse cx="7" cy="3" rx="1" ry="2" fill={COLORS.plant.leafDark} />
    <ellipse cx="9" cy="3" rx="1" ry="2" fill={COLORS.plant.leafDark} />
  </svg>
);

// Toilet - 60 degree view
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Tank */}
    <rect x="4" y="2" width="8" height="4" fill={COLORS.white} />
    <rect x="4" y="2" width="8" height="1" fill={COLORS.cream} />
    
    {/* Bowl */}
    <ellipse cx="8" cy="11" rx="5" ry="4" fill={COLORS.white} />
    <ellipse cx="8" cy="10" rx="3" ry="2" fill={COLORS.water.top} />
    
    {/* Seat */}
    <ellipse cx="8" cy="7" rx="5" ry="2" fill={COLORS.cream} />
  </svg>
);

// Bathtub - 60 degree view
export const BathtubIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Tub body */}
    <rect x="1" y="6" width="14" height="8" rx="1" fill={COLORS.white} />
    <rect x="1" y="6" width="14" height="1" fill={COLORS.cream} />
    
    {/* Water */}
    <rect x="2" y="8" width="12" height="4" fill={COLORS.water.top} />
    
    {/* Faucet */}
    <rect x="12" y="3" width="2" height="4" fill={COLORS.metal.front} />
    <rect x="11" y="3" width="4" height="1" fill={COLORS.metal.top} />
    
    {/* Feet */}
    <ellipse cx="3" cy="14" rx="2" ry="1" fill={COLORS.metal.front} />
    <ellipse cx="13" cy="14" rx="2" ry="1" fill={COLORS.metal.front} />
  </svg>
);

// Shower - 60 degree view
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Glass enclosure */}
    <rect x="1" y="2" width="14" height="13" fill={COLORS.water.top} opacity="0.3" />
    <rect x="1" y="2" width="14" height="13" fill="none" stroke={COLORS.metal.front} strokeWidth="1" />
    
    {/* Shower head arm */}
    <rect x="11" y="2" width="2" height="5" fill={COLORS.metal.front} />
    
    {/* Shower head */}
    <ellipse cx="9" cy="4" rx="4" ry="2" fill={COLORS.metal.top} />
    
    {/* Water droplets */}
    <rect x="7" y="7" width="1" height="2" fill={COLORS.water.front} />
    <rect x="9" y="8" width="1" height="2" fill={COLORS.water.front} />
    <rect x="11" y="7" width="1" height="2" fill={COLORS.water.front} />
    
    {/* Floor drain */}
    <ellipse cx="8" cy="14" rx="2" ry="1" fill={COLORS.metal.dark} />
  </svg>
);

// Rug - 60 degree view
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Base */}
    <rect x="1" y="4" width="14" height="10" fill={COLORS.fabric.red.front} />
    <rect x="1" y="4" width="14" height="1" fill={COLORS.fabric.red.top} />
    
    {/* Border pattern */}
    <rect x="2" y="5" width="12" height="8" fill={COLORS.fabric.red.side} opacity="0.3" />
    
    {/* Center pattern */}
    <rect x="4" y="7" width="8" height="4" fill={COLORS.fabric.red.front} />
    
    {/* Diamond */}
    <path d="M8 7 L10 9 L8 11 L6 9 Z" fill="#E8C868" />
  </svg>
);

// Window - 60 degree view
export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Frame */}
    <rect x="2" y="2" width="12" height="12" fill={COLORS.wood.front} />
    
    {/* Glass panes */}
    <rect x="3" y="3" width="4" height="4" fill={COLORS.water.top} />
    <rect x="9" y="3" width="4" height="4" fill={COLORS.water.top} />
    <rect x="3" y="9" width="4" height="4" fill={COLORS.water.front} />
    <rect x="9" y="9" width="4" height="4" fill={COLORS.water.front} />
    
    {/* Cross bar */}
    <rect x="7" y="2" width="2" height="12" fill={COLORS.wood.dark} />
    <rect x="2" y="7" width="12" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Laptop - 60 degree view
export const LaptopIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Screen */}
    <rect x="2" y="2" width="12" height="7" fill={COLORS.metal.dark} />
    <rect x="3" y="3" width="10" height="5" fill="#2A3A4A" />
    <rect x="4" y="4" width="4" height="2" fill="#3A4A5A" opacity="0.5" />
    
    {/* Keyboard base */}
    <rect x="1" y="9" width="14" height="5" fill={COLORS.metal.front} />
    <rect x="1" y="9" width="14" height="1" fill={COLORS.metal.top} />
    <rect x="3" y="11" width="10" height="2" fill={COLORS.metal.dark} />
    
    {/* Trackpad */}
    <rect x="6" y="12" width="4" height="1" fill={COLORS.metal.top} />
  </svg>
);

// Lamp - 60 degree view
export const LampIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Shade */}
    <path d="M4 2 L12 2 L10 8 L6 8 Z" fill="#F8F0E0" />
    <path d="M5 3 L11 3 L10 7 L6 7 Z" fill="#FFFFF0" />
    
    {/* Stem */}
    <rect x="7" y="8" width="2" height="4" fill={COLORS.metal.front} />
    
    {/* Base */}
    <ellipse cx="8" cy="13" rx="3" ry="1" fill={COLORS.metal.dark} />
    <ellipse cx="8" cy="12" rx="2" ry="1" fill={COLORS.metal.front} />
  </svg>
);

// Mirror - 60 degree view
export const MirrorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Frame */}
    <rect x="3" y="1" width="10" height="14" fill={COLORS.wood.front} />
    <rect x="3" y="1" width="10" height="1" fill={COLORS.wood.top} />
    
    {/* Glass */}
    <rect x="4" y="2" width="8" height="12" fill="#D0E0F0" />
    <rect x="5" y="3" width="3" height="4" fill="#E0F0F8" opacity="0.6" />
  </svg>
);

// Wardrobe - 60 degree view
export const WardrobeIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Body */}
    <rect x="1" y="1" width="14" height="14" fill={COLORS.wood.front} />
    <rect x="1" y="1" width="14" height="1" fill={COLORS.wood.top} />
    
    {/* Doors */}
    <rect x="2" y="2" width="5" height="12" fill={COLORS.wood.top} />
    <rect x="9" y="2" width="5" height="12" fill={COLORS.wood.top} />
    
    {/* Handles */}
    <rect x="6" y="7" width="1" height="2" fill={COLORS.metal.dark} />
    <rect x="9" y="7" width="1" height="2" fill={COLORS.metal.dark} />
    
    {/* Door gap */}
    <rect x="7" y="2" width="2" height="12" fill={COLORS.wood.dark} />
  </svg>
);

// Nightstand - 60 degree view
export const NightstandIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Body */}
    <rect x="2" y="4" width="12" height="10" fill={COLORS.wood.front} />
    <rect x="2" y="4" width="12" height="1" fill={COLORS.wood.top} />
    
    {/* Top surface */}
    <rect x="1" y="2" width="14" height="3" fill={COLORS.wood.dark} />
    <rect x="1" y="2" width="14" height="1" fill={COLORS.wood.top} />
    
    {/* Drawer */}
    <rect x="3" y="8" width="10" height="3" fill={COLORS.wood.top} />
    <rect x="7" y="9" width="2" height="1" fill={COLORS.metal.dark} />
    
    {/* Legs */}
    <rect x="3" y="14" width="2" height="2" fill={COLORS.wood.dark} />
    <rect x="11" y="14" width="2" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Rock - 60 degree view
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    <ellipse cx="8" cy="12" rx="6" ry="2" fill={COLORS.metal.dark} opacity="0.3" />
    <path d="M4 9 Q2 11 4 13 L12 13 Q14 11 12 9 L10 5 Q9 3 8 3 Q7 3 6 5 Z" fill={COLORS.metal.front} />
    <path d="M5 7 Q4 9 5 11 L7 11 Q6 9 7 7 Z" fill={COLORS.metal.top} opacity="0.5" />
  </svg>
);

// Debris - 60 degree view
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    <rect x="2" y="10" width="6" height="2" fill={COLORS.wood.top} transform="rotate(-10 5 11)" />
    <rect x="7" y="8" width="5" height="2" fill={COLORS.wood.front} transform="rotate(15 10 9)" />
    <rect x="4" y="12" width="4" height="2" fill={COLORS.wood.top} transform="rotate(5 6 13)" />
    <rect x="10" y="11" width="3" height="2" fill={COLORS.wood.front} transform="rotate(-8 12 12)" />
  </svg>
);

// Door - 60 degree view (placeholder)
export const DoorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    <rect x="4" y="1" width="8" height="14" fill={COLORS.wood.front} />
    <rect x="4" y="1" width="8" height="1" fill={COLORS.wood.top} />
    <rect x="5" y="2" width="6" height="12" fill={COLORS.wood.top} />
    <circle cx="10" cy="8" r="1" fill={COLORS.metal.front} />
  </svg>
);

// Empty - no visual
export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// Asset map
export const AssetIconMap: Record<string, React.FC<any>> = {
  bed: BedIcon,
  sofa: SofaIcon,
  armchair: ArmchairIcon,
  rug: RugIcon,
  window: WindowIcon,
  plant: PlantIcon,
  table: TableIcon,
  tv: TvIcon,
  bookshelf: BookshelfIcon,
  fridge: FridgeIcon,
  stove: StoveIcon,
  chair: ChairIcon,
  toilet: ToiletIcon,
  bathtub: BathtubIcon,
  shower: ShowerIcon,
  sink: SinkIcon,
  desk: DeskIcon,
  laptop: LaptopIcon,
  computer: LaptopIcon,
  lamp: LampIcon,
  mirror: MirrorIcon,
  wardrobe: WardrobeIcon,
  nightstand: NightstandIcon,
  rock: RockIcon,
  debris: DebrisIcon,
  door: DoorIcon,
  empty: EmptyIcon,
};

export const getAssetIcon = (assetType: string) => {
  return AssetIconMap[assetType] || null;
};
