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

// Pixel art color palette - consistent 60 degree isometric view
const COLORS = {
  wood: {
    top: '#D4B896',
    front: '#A07850',
    side: '#785838',
    dark: '#503820',
  },
  fabric: {
    purple: { top: '#C8B8E0', front: '#9888B8', side: '#706898' },
    blue: { top: '#B8D0E8', front: '#78A0C8', side: '#5880A8' },
    green: { top: '#B8E0C0', front: '#78B088', side: '#589868' },
    red: { top: '#E8C0C0', front: '#C89090', side: '#A87070' },
  },
  metal: {
    top: '#F0F0F0',
    front: '#C0C0C0',
    side: '#909090',
    dark: '#606060',
  },
  plant: {
    leaf: '#78B888',
    leafDark: '#589068',
    pot: '#C87848',
    potDark: '#A05830',
    soil: '#503828',
  },
  water: {
    top: '#B0E0F8',
    front: '#80C0E0',
  },
  white: '#FAFAFA',
  cream: '#F0E8E0',
  pillow: '#FAF4F4',
};

// Standard dimensions: viewBox 0 0 16 16, content area 1-15
// All furniture uses consistent visual weight and proportions

// ==================== CONNECTABLE ASSETS ====================

// Bed - occupies full cell, extends to edges for seamless connection
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const isHead = (!connectedTop && connectedBottom) || (!connectedLeft && connectedRight);
  const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
  
  // Calculate dynamic bounds for seamless connections
  const left = connectedLeft ? 0 : 1;
  const right = connectedRight ? 16 : 15;
  const top = connectedTop ? 0 : 1;
  const bottom = connectedBottom ? 16 : 15;
  const width = right - left;
  const height = bottom - top;
  
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Headboard - only on head or single */}
      {(isHead || isSingle) && (
        <>
          <rect x={left} y={top} width={width} height="3" fill={COLORS.wood.front} />
          <rect x={left} y={top} width={width} height="1" fill={COLORS.wood.top} />
        </>
      )}
      
      {/* Mattress + Blanket - extends to edges for connection */}
      <rect x={left} y={connectedTop ? 0 : 4} width={width} height={bottom - (connectedTop ? 0 : 4)} fill={COLORS.fabric.blue.front} />
      <rect x={left} y={connectedTop ? 0 : 4} width={width} height="1" fill={COLORS.fabric.blue.top} />
      
      {/* Pillows - only on head or single */}
      {(isHead || isSingle) && (
        <>
          <rect x={left + 1} y={top + 3} width="5" height="3" fill={COLORS.pillow} />
          <rect x={right - 6} y={top + 3} width="5" height="3" fill={COLORS.pillow} />
        </>
      )}
      
      {/* Frame edges - only on non-connected sides */}
      {!connectedBottom && (
        <>
          <rect x={left} y="13" width={width} height="2" fill={COLORS.wood.front} />
          <rect x={left} y="13" width={width} height="1" fill={COLORS.wood.top} />
        </>
      )}
    </svg>
  );
};

// Sofa - wide seating, extends to edges for seamless connection
export const SofaIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  // Calculate dynamic bounds for seamless connections
  const left = connectedLeft ? 0 : 1;
  const right = connectedRight ? 16 : 15;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Back cushion */}
      {!connectedTop && (
        <>
          <rect x={left} y="1" width={width} height="4" fill={COLORS.fabric.purple.front} />
          <rect x={left} y="1" width={width} height="1" fill={COLORS.fabric.purple.top} />
        </>
      )}
      
      {/* Seat - extends to edges */}
      <rect x={left} y={connectedTop ? 0 : 5} width={width} height={connectedTop ? 11 : 6} fill={COLORS.fabric.purple.front} />
      <rect x={left} y={connectedTop ? 0 : 5} width={width} height="1" fill={COLORS.fabric.purple.top} />
      
      {/* Left arm */}
      {!connectedLeft && (
        <>
          <rect x="1" y="1" width="3" height="10" fill={COLORS.fabric.purple.side} />
          <rect x="1" y="1" width="3" height="1" fill={COLORS.fabric.purple.top} />
        </>
      )}
      
      {/* Right arm */}
      {!connectedRight && (
        <>
          <rect x="12" y="1" width="3" height="10" fill={COLORS.fabric.purple.side} />
          <rect x="12" y="1" width="3" height="1" fill={COLORS.fabric.purple.top} />
        </>
      )}
      
      {/* Base - extends to edges */}
      <rect x={left} y="11" width={width} height={connectedBottom ? 5 : 4} fill={COLORS.wood.front} />
      <rect x={left} y="11" width={width} height="1" fill={COLORS.wood.top} />
    </svg>
  );
};

// Table - horizontal surface with legs, extends to edges for seamless connection
export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: ConnectableAssetProps) => {
  // Calculate dynamic bounds for seamless connections
  const left = connectedLeft ? 0 : 1;
  const right = connectedRight ? 16 : 15;
  const top = connectedTop ? 0 : 2;
  const bottom = connectedBottom ? 16 : 15;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Tabletop - extends to edges */}
      <rect x={left} y={top} width={width} height="4" fill={COLORS.wood.front} />
      <rect x={left} y={top} width={width} height="1" fill={COLORS.wood.top} />
      
      {/* Apron - extends to edges */}
      <rect x={left} y={top + 3} width={width} height="2" fill={COLORS.wood.side} />
      
      {/* Legs - only on non-connected sides */}
      {!connectedLeft && (
        <rect x="2" y="7" width="2" height={bottom - 7} fill={COLORS.wood.dark} />
      )}
      {!connectedRight && (
        <rect x="12" y="7" width="2" height={bottom - 7} fill={COLORS.wood.dark} />
      )}
    </svg>
  );
};

// Desk - table with drawer cabinet, extends to edges for seamless connection
export const DeskIcon = ({
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  // Calculate dynamic bounds for seamless connections
  const left = connectedLeft ? 0 : 1;
  const right = connectedRight ? 16 : 15;
  const top = connectedTop ? 0 : 2;
  const bottom = connectedBottom ? 16 : 15;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 16 16" className={className}>
      {/* Desktop - extends to edges */}
      <rect x={left} y={top} width={width} height="3" fill={COLORS.wood.front} />
      <rect x={left} y={top} width={width} height="1" fill={COLORS.wood.top} />
      
      {/* Drawer cabinet */}
      <rect x={right - 6} y={top + 3} width="6" height={bottom - top - 3} fill={COLORS.wood.front} />
      <rect x={right - 5} y={top + 4} width="4" height="4" fill={COLORS.wood.top} />
      <rect x={right - 4} y={top + 5} width="2" height="1" fill={COLORS.metal.dark} />
      <rect x={right - 5} y={top + 9} width="4" height="3" fill={COLORS.wood.top} />
      <rect x={right - 4} y={top + 10} width="2" height="1" fill={COLORS.metal.dark} />
      
      {/* Left leg - only on non-connected side */}
      {!connectedLeft && (
        <rect x="2" y={top + 3} width="2" height={bottom - top - 3} fill={COLORS.wood.dark} />
      )}
    </svg>
  );
};

// Stove - kitchen counter with burners
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
    <rect x="1" y="2" width="14" height="13" fill={COLORS.metal.front} />
    <rect x="1" y="2" width="14" height="1" fill={COLORS.metal.top} />
    
    {/* Stovetop */}
    <rect x="2" y="3" width="12" height="5" fill={COLORS.metal.top} />
    
    {/* Burners */}
    <circle cx="5" cy="5" r="2" fill={COLORS.metal.dark} />
    <circle cx="5" cy="5" r="1" fill={COLORS.metal.side} />
    <circle cx="11" cy="5" r="2" fill={COLORS.metal.dark} />
    <circle cx="11" cy="5" r="1" fill={COLORS.metal.side} />
    
    {/* Oven door */}
    <rect x="2" y="9" width="12" height="5" fill={COLORS.metal.side} />
    <rect x="3" y="10" width="10" height="3" fill="#282828" />
    <rect x="5" y="9" width="6" height="1" fill={COLORS.metal.top} />
  </svg>
);

// Sink - counter with basin
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Counter */}
    <rect x="1" y="2" width="14" height="13" fill={COLORS.cream} />
    <rect x="1" y="2" width="14" height="1" fill={COLORS.white} />
    
    {/* Basin */}
    <rect x="3" y="4" width="10" height="5" fill={COLORS.water.top} />
    <rect x="4" y="5" width="8" height="3" fill={COLORS.water.front} />
    
    {/* Faucet */}
    <rect x="7" y="2" width="2" height="3" fill={COLORS.metal.front} />
    <rect x="6" y="2" width="4" height="1" fill={COLORS.metal.top} />
    
    {/* Drain */}
    <circle cx="8" cy="6" r="1" fill={COLORS.metal.dark} />
    
    {/* Cabinet */}
    <rect x="2" y="10" width="5" height="4" fill={COLORS.cream} />
    <rect x="9" y="10" width="5" height="4" fill={COLORS.cream} />
    <rect x="4" y="12" width="1" height="1" fill={COLORS.metal.dark} />
    <rect x="11" y="12" width="1" height="1" fill={COLORS.metal.dark} />
  </svg>
);

// ==================== SINGLE ASSETS ====================

// Armchair - single seat with arms
export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Back */}
    <rect x="2" y="1" width="12" height="5" fill={COLORS.fabric.green.front} />
    <rect x="2" y="1" width="12" height="1" fill={COLORS.fabric.green.top} />
    
    {/* Seat */}
    <rect x="2" y="6" width="12" height="5" fill={COLORS.fabric.green.front} />
    <rect x="2" y="6" width="12" height="1" fill={COLORS.fabric.green.top} />
    
    {/* Arms */}
    <rect x="1" y="2" width="3" height="10" fill={COLORS.fabric.green.side} />
    <rect x="1" y="2" width="3" height="1" fill={COLORS.fabric.green.top} />
    <rect x="12" y="2" width="3" height="10" fill={COLORS.fabric.green.side} />
    <rect x="12" y="2" width="3" height="1" fill={COLORS.fabric.green.top} />
    
    {/* Base */}
    <rect x="2" y="11" width="12" height="4" fill={COLORS.wood.front} />
  </svg>
);

// Chair - simple wooden chair
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
    <rect x="3" y="9" width="2" height="6" fill={COLORS.wood.dark} />
    <rect x="11" y="9" width="2" height="6" fill={COLORS.wood.dark} />
  </svg>
);

// Fridge - tall appliance
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Body */}
    <rect x="2" y="1" width="12" height="14" fill={COLORS.metal.front} />
    <rect x="2" y="1" width="12" height="1" fill={COLORS.metal.top} />
    
    {/* Freezer */}
    <rect x="3" y="2" width="10" height="4" fill={COLORS.white} />
    <rect x="11" y="3" width="1" height="2" fill={COLORS.metal.dark} />
    
    {/* Gap */}
    <rect x="3" y="6" width="10" height="1" fill={COLORS.metal.dark} />
    
    {/* Fridge */}
    <rect x="3" y="7" width="10" height="7" fill={COLORS.white} />
    <rect x="11" y="9" width="1" height="3" fill={COLORS.metal.dark} />
  </svg>
);

// TV - wide screen on stand
export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Frame */}
    <rect x="1" y="2" width="14" height="9" fill={COLORS.metal.dark} />
    <rect x="1" y="2" width="14" height="1" fill={COLORS.metal.side} />
    
    {/* Screen */}
    <rect x="2" y="3" width="12" height="7" fill="#2A3A4A" />
    <rect x="2" y="3" width="12" height="2" fill="#3A4A5A" opacity="0.4" />
    
    {/* Stand */}
    <rect x="6" y="11" width="4" height="2" fill={COLORS.metal.dark} />
    <rect x="4" y="13" width="8" height="2" fill={COLORS.metal.front} />
    <rect x="4" y="13" width="8" height="1" fill={COLORS.metal.top} />
  </svg>
);

// Bookshelf - tall with shelves
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
    <rect x="10" y="2" width="3" height="3" fill="#B8A868" />
    
    {/* Books row 2 */}
    <rect x="3" y="6" width="3" height="4" fill="#8868B8" />
    <rect x="6" y="6" width="2" height="4" fill="#B86888" />
    <rect x="8" y="6" width="4" height="4" fill="#68B8B8" />
    
    {/* Books row 3 */}
    <rect x="3" y="11" width="3" height="3" fill="#6888B8" />
    <rect x="6" y="11" width="3" height="3" fill="#88B868" />
    <rect x="9" y="11" width="4" height="3" fill="#68B888" />
  </svg>
);

// Plant - pot with foliage
export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Leaves */}
    <ellipse cx="8" cy="5" rx="3" ry="5" fill={COLORS.plant.leaf} />
    <ellipse cx="5" cy="6" rx="2" ry="4" fill={COLORS.plant.leaf} transform="rotate(-15 5 6)" />
    <ellipse cx="11" cy="6" rx="2" ry="4" fill={COLORS.plant.leaf} transform="rotate(15 11 6)" />
    <ellipse cx="7" cy="4" rx="1" ry="2" fill={COLORS.plant.leafDark} />
    <ellipse cx="9" cy="3" rx="1" ry="2" fill={COLORS.plant.leafDark} />
    
    {/* Pot rim */}
    <rect x="4" y="9" width="8" height="2" fill={COLORS.plant.potDark} />
    
    {/* Pot body */}
    <path d="M4 11 L12 11 L11 15 L5 15 Z" fill={COLORS.plant.pot} />
  </svg>
);

// Toilet - bathroom fixture
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Tank */}
    <rect x="4" y="1" width="8" height="4" fill={COLORS.white} />
    <rect x="4" y="1" width="8" height="1" fill={COLORS.cream} />
    
    {/* Seat */}
    <ellipse cx="8" cy="7" rx="5" ry="2" fill={COLORS.cream} />
    
    {/* Bowl */}
    <ellipse cx="8" cy="11" rx="5" ry="4" fill={COLORS.white} />
    <ellipse cx="8" cy="10" rx="3" ry="2" fill={COLORS.water.top} />
  </svg>
);

// Bathtub - large bathroom fixture
export const BathtubIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Faucet */}
    <rect x="12" y="2" width="2" height="4" fill={COLORS.metal.front} />
    <rect x="11" y="2" width="4" height="1" fill={COLORS.metal.top} />
    
    {/* Tub body */}
    <rect x="1" y="5" width="14" height="9" rx="1" fill={COLORS.white} />
    <rect x="1" y="5" width="14" height="1" fill={COLORS.cream} />
    
    {/* Water */}
    <rect x="2" y="7" width="12" height="5" fill={COLORS.water.top} />
    
    {/* Feet */}
    <ellipse cx="3" cy="14" rx="2" ry="1" fill={COLORS.metal.front} />
    <ellipse cx="13" cy="14" rx="2" ry="1" fill={COLORS.metal.front} />
  </svg>
);

// Shower - enclosed shower
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Enclosure */}
    <rect x="1" y="1" width="14" height="14" fill={COLORS.water.top} opacity="0.25" />
    <rect x="1" y="1" width="14" height="14" fill="none" stroke={COLORS.metal.front} strokeWidth="1" />
    
    {/* Shower arm */}
    <rect x="11" y="1" width="2" height="5" fill={COLORS.metal.front} />
    
    {/* Shower head */}
    <ellipse cx="9" cy="4" rx="4" ry="2" fill={COLORS.metal.top} />
    
    {/* Droplets */}
    <rect x="6" y="7" width="1" height="2" fill={COLORS.water.front} />
    <rect x="8" y="8" width="1" height="2" fill={COLORS.water.front} />
    <rect x="10" y="7" width="1" height="2" fill={COLORS.water.front} />
    <rect x="12" y="8" width="1" height="2" fill={COLORS.water.front} />
    
    {/* Drain */}
    <ellipse cx="8" cy="13" rx="2" ry="1" fill={COLORS.metal.dark} />
  </svg>
);

// Rug - flat floor covering
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Base */}
    <rect x="1" y="3" width="14" height="10" fill={COLORS.fabric.red.front} />
    <rect x="1" y="3" width="14" height="1" fill={COLORS.fabric.red.top} />
    
    {/* Border */}
    <rect x="2" y="4" width="12" height="8" fill={COLORS.fabric.red.side} opacity="0.4" />
    
    {/* Center */}
    <rect x="4" y="6" width="8" height="4" fill={COLORS.fabric.red.front} />
    
    {/* Pattern */}
    <path d="M8 6 L10 8 L8 10 L6 8 Z" fill="#E8C868" />
  </svg>
);

// Window - wall fixture
export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Frame */}
    <rect x="2" y="1" width="12" height="14" fill={COLORS.wood.front} />
    <rect x="2" y="1" width="12" height="1" fill={COLORS.wood.top} />
    
    {/* Glass panes */}
    <rect x="3" y="2" width="4" height="5" fill={COLORS.water.top} />
    <rect x="9" y="2" width="4" height="5" fill={COLORS.water.top} />
    <rect x="3" y="9" width="4" height="5" fill={COLORS.water.front} />
    <rect x="9" y="9" width="4" height="5" fill={COLORS.water.front} />
    
    {/* Crossbars */}
    <rect x="7" y="1" width="2" height="14" fill={COLORS.wood.dark} />
    <rect x="2" y="7" width="12" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Laptop - small device on desk
export const LaptopIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Screen */}
    <rect x="2" y="2" width="12" height="8" fill={COLORS.metal.dark} />
    <rect x="3" y="3" width="10" height="6" fill="#2A3A4A" />
    <rect x="4" y="4" width="4" height="2" fill="#3A4A5A" opacity="0.5" />
    
    {/* Base */}
    <rect x="1" y="10" width="14" height="4" fill={COLORS.metal.front} />
    <rect x="1" y="10" width="14" height="1" fill={COLORS.metal.top} />
    
    {/* Keyboard */}
    <rect x="3" y="11" width="10" height="2" fill={COLORS.metal.dark} />
    
    {/* Trackpad */}
    <rect x="6" y="12" width="4" height="1" fill={COLORS.metal.top} />
  </svg>
);

// Lamp - table lamp
export const LampIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Shade */}
    <path d="M4 2 L12 2 L10 8 L6 8 Z" fill="#F8F0E0" />
    <path d="M5 3 L11 3 L10 7 L6 7 Z" fill="#FFFFF8" />
    
    {/* Stem */}
    <rect x="7" y="8" width="2" height="5" fill={COLORS.metal.front} />
    
    {/* Base */}
    <ellipse cx="8" cy="14" rx="4" ry="1.5" fill={COLORS.metal.dark} />
    <ellipse cx="8" cy="13" rx="3" ry="1" fill={COLORS.metal.front} />
  </svg>
);

// Mirror - wall fixture
export const MirrorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Frame */}
    <rect x="3" y="1" width="10" height="14" fill={COLORS.wood.front} />
    <rect x="3" y="1" width="10" height="1" fill={COLORS.wood.top} />
    
    {/* Glass */}
    <rect x="4" y="2" width="8" height="12" fill="#D8E8F0" />
    <rect x="5" y="3" width="3" height="4" fill="#E8F0F8" opacity="0.6" />
  </svg>
);

// Wardrobe - tall storage
export const WardrobeIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Body */}
    <rect x="1" y="1" width="14" height="14" fill={COLORS.wood.front} />
    <rect x="1" y="1" width="14" height="1" fill={COLORS.wood.top} />
    
    {/* Doors */}
    <rect x="2" y="2" width="5" height="12" fill={COLORS.wood.top} />
    <rect x="9" y="2" width="5" height="12" fill={COLORS.wood.top} />
    
    {/* Gap */}
    <rect x="7" y="2" width="2" height="12" fill={COLORS.wood.dark} />
    
    {/* Handles */}
    <rect x="6" y="7" width="1" height="2" fill={COLORS.metal.dark} />
    <rect x="9" y="7" width="1" height="2" fill={COLORS.metal.dark} />
  </svg>
);

// Nightstand - small bedside table
export const NightstandIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Top */}
    <rect x="2" y="2" width="12" height="3" fill={COLORS.wood.front} />
    <rect x="2" y="2" width="12" height="1" fill={COLORS.wood.top} />
    
    {/* Body */}
    <rect x="3" y="5" width="10" height="8" fill={COLORS.wood.front} />
    
    {/* Drawer */}
    <rect x="4" y="7" width="8" height="4" fill={COLORS.wood.top} />
    <rect x="7" y="8" width="2" height="1" fill={COLORS.metal.dark} />
    
    {/* Legs */}
    <rect x="3" y="13" width="2" height="2" fill={COLORS.wood.dark} />
    <rect x="11" y="13" width="2" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Rock - decorative obstacle
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    {/* Shadow */}
    <ellipse cx="8" cy="13" rx="6" ry="2" fill={COLORS.metal.dark} opacity="0.3" />
    
    {/* Rock body */}
    <path d="M4 10 Q2 12 4 14 L12 14 Q14 12 12 10 L10 5 Q9 3 8 3 Q7 3 6 5 Z" fill={COLORS.metal.front} />
    
    {/* Highlight */}
    <path d="M5 7 Q4 9 5 11 L7 11 Q6 9 7 7 Z" fill={COLORS.metal.top} opacity="0.5" />
  </svg>
);

// Debris - scattered objects
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    <rect x="2" y="10" width="6" height="2" fill={COLORS.wood.top} transform="rotate(-10 5 11)" />
    <rect x="7" y="8" width="5" height="2" fill={COLORS.wood.front} transform="rotate(15 10 9)" />
    <rect x="4" y="12" width="4" height="2" fill={COLORS.wood.top} transform="rotate(5 6 13)" />
    <rect x="10" y="11" width="3" height="2" fill={COLORS.wood.front} transform="rotate(-8 12 12)" />
  </svg>
);

// Door - wall opening
export const DoorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className}>
    <rect x="3" y="1" width="10" height="14" fill={COLORS.wood.front} />
    <rect x="3" y="1" width="10" height="1" fill={COLORS.wood.top} />
    <rect x="4" y="2" width="8" height="12" fill={COLORS.wood.top} />
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
