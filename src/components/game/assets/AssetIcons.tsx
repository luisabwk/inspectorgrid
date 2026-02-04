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

// Pixel art color palette - Stardew Valley inspired
const COLORS = {
  wood: {
    light: '#C4A574',
    medium: '#8B6914',
    dark: '#5C4A1F',
    highlight: '#E8D4A8',
  },
  fabric: {
    blue: '#4A6FA5',
    blueDark: '#2E4A6F',
    blueLight: '#6B8FC5',
    red: '#A55A5A',
    redDark: '#6F3A3A',
    purple: '#7B5BA5',
    purpleDark: '#4F3A6F',
    green: '#5AA56A',
    greenDark: '#3A6F4A',
  },
  metal: {
    light: '#B0B0B0',
    medium: '#808080',
    dark: '#505050',
    highlight: '#D0D0D0',
  },
  plant: {
    leaf: '#4A8B5A',
    leafDark: '#2E5A3A',
    leafLight: '#6AB57A',
    pot: '#8B5A2B',
    potDark: '#5A3A1B',
    soil: '#3A2A1A',
  },
  water: {
    light: '#7AC4E8',
    medium: '#5AA4C8',
    dark: '#3A84A8',
  },
  white: '#F5F5F0',
  cream: '#F0E8D8',
  shadow: '#2A2A2A',
};

// Pixel art bed
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
  const isHorizontal = connectedLeft || connectedRight;
  
  return (
    <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      {/* Frame base */}
      <rect x="1" y="10" width="14" height="5" fill={COLORS.wood.medium} />
      <rect x="1" y="10" width="14" height="1" fill={COLORS.wood.highlight} />
      <rect x="1" y="14" width="14" height="1" fill={COLORS.wood.dark} />
      
      {/* Mattress */}
      <rect x="2" y="4" width="12" height="7" fill={COLORS.cream} />
      <rect x="2" y="4" width="12" height="1" fill={COLORS.white} />
      
      {/* Blanket */}
      <rect x="2" y="7" width="12" height="4" fill={COLORS.fabric.blue} />
      <rect x="2" y="7" width="12" height="1" fill={COLORS.fabric.blueLight} />
      <rect x="2" y="10" width="12" height="1" fill={COLORS.fabric.blueDark} />
      
      {/* Pillow */}
      {(isHead || isSingle) && (
        <>
          <rect x="3" y="4" width="4" height="3" fill={COLORS.white} />
          <rect x="9" y="4" width="4" height="3" fill={COLORS.white} />
          <rect x="3" y="4" width="4" height="1" fill="#FFFFFF" />
          <rect x="9" y="4" width="4" height="1" fill="#FFFFFF" />
        </>
      )}
      
      {/* Headboard */}
      {(isHead || isSingle) && !isHorizontal && (
        <rect x="1" y="2" width="14" height="3" fill={COLORS.wood.medium} />
      )}
      {(isHead || isSingle) && !isHorizontal && (
        <rect x="1" y="2" width="14" height="1" fill={COLORS.wood.highlight} />
      )}
      
      {/* Legs */}
      {!connectedLeft && <rect x="1" y="14" width="2" height="2" fill={COLORS.wood.dark} />}
      {!connectedRight && <rect x="13" y="14" width="2" height="2" fill={COLORS.wood.dark} />}
    </svg>
  );
};

// Pixel art sofa
export const SofaIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  return (
    <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      {/* Backrest */}
      {!connectedTop && (
        <>
          <rect x="1" y="3" width="14" height="5" fill={COLORS.fabric.purple} />
          <rect x="1" y="3" width="14" height="1" fill={COLORS.fabric.purpleDark} />
        </>
      )}
      
      {/* Seat cushion */}
      <rect x="1" y="8" width="14" height="4" fill={COLORS.fabric.purple} />
      <rect x="2" y="8" width="12" height="1" fill="#9B7BC5" />
      
      {/* Armrests */}
      {!connectedLeft && (
        <rect x="0" y="5" width="2" height="7" fill={COLORS.fabric.purpleDark} />
      )}
      {!connectedRight && (
        <rect x="14" y="5" width="2" height="7" fill={COLORS.fabric.purpleDark} />
      )}
      
      {/* Front panel */}
      <rect x="1" y="12" width="14" height="2" fill={COLORS.fabric.purpleDark} />
      
      {/* Legs */}
      {!connectedLeft && <rect x="1" y="14" width="2" height="2" fill={COLORS.wood.dark} />}
      {!connectedRight && <rect x="13" y="14" width="2" height="2" fill={COLORS.wood.dark} />}
    </svg>
  );
};

// Pixel art armchair
export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Backrest */}
    <rect x="3" y="2" width="10" height="6" fill={COLORS.fabric.green} />
    <rect x="3" y="2" width="10" height="1" fill={COLORS.fabric.greenDark} />
    
    {/* Seat */}
    <rect x="3" y="8" width="10" height="4" fill={COLORS.fabric.green} />
    <rect x="4" y="8" width="8" height="1" fill="#7AC58A" />
    
    {/* Armrests */}
    <rect x="1" y="4" width="3" height="8" fill={COLORS.fabric.greenDark} />
    <rect x="12" y="4" width="3" height="8" fill={COLORS.fabric.greenDark} />
    
    {/* Front */}
    <rect x="3" y="12" width="10" height="2" fill={COLORS.fabric.greenDark} />
    
    {/* Legs */}
    <rect x="2" y="14" width="2" height="2" fill={COLORS.wood.dark} />
    <rect x="12" y="14" width="2" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Pixel art rug
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Base */}
    <rect x="1" y="4" width="14" height="10" fill={COLORS.fabric.red} />
    
    {/* Border pattern */}
    <rect x="2" y="5" width="12" height="8" fill="#C57A7A" />
    
    {/* Center pattern */}
    <rect x="4" y="7" width="8" height="4" fill={COLORS.fabric.red} />
    
    {/* Diamond center */}
    <rect x="7" y="8" width="2" height="2" fill="#F0D070" />
    
    {/* Corner accents */}
    <rect x="3" y="6" width="2" height="2" fill="#F0D070" />
    <rect x="11" y="6" width="2" height="2" fill="#F0D070" />
    <rect x="3" y="10" width="2" height="2" fill="#F0D070" />
    <rect x="11" y="10" width="2" height="2" fill="#F0D070" />
  </svg>
);

// Pixel art window (empty - rendered as wall marking)
export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Frame */}
    <rect x="2" y="2" width="12" height="12" fill={COLORS.wood.medium} />
    
    {/* Glass panes */}
    <rect x="3" y="3" width="4" height="4" fill={COLORS.water.light} />
    <rect x="9" y="3" width="4" height="4" fill={COLORS.water.light} />
    <rect x="3" y="9" width="4" height="4" fill={COLORS.water.medium} />
    <rect x="9" y="9" width="4" height="4" fill={COLORS.water.medium} />
    
    {/* Cross bar */}
    <rect x="7" y="2" width="2" height="12" fill={COLORS.wood.dark} />
    <rect x="2" y="7" width="12" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Pixel art plant
export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Pot */}
    <rect x="4" y="10" width="8" height="5" fill={COLORS.plant.pot} />
    <rect x="3" y="9" width="10" height="2" fill={COLORS.plant.pot} />
    <rect x="4" y="14" width="8" height="1" fill={COLORS.plant.potDark} />
    
    {/* Soil */}
    <rect x="5" y="9" width="6" height="1" fill={COLORS.plant.soil} />
    
    {/* Leaves */}
    <rect x="6" y="4" width="4" height="5" fill={COLORS.plant.leaf} />
    <rect x="4" y="5" width="3" height="4" fill={COLORS.plant.leaf} />
    <rect x="9" y="5" width="3" height="4" fill={COLORS.plant.leaf} />
    <rect x="5" y="2" width="2" height="3" fill={COLORS.plant.leafLight} />
    <rect x="9" y="2" width="2" height="3" fill={COLORS.plant.leafLight} />
    <rect x="7" y="1" width="2" height="4" fill={COLORS.plant.leafLight} />
  </svg>
);

// Pixel art table
export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: ConnectableAssetProps) => {
  return (
    <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
      {/* Table top */}
      <rect x="0" y="4" width="16" height="4" fill={COLORS.wood.light} />
      <rect x="0" y="4" width="16" height="1" fill={COLORS.wood.highlight} />
      <rect x="0" y="7" width="16" height="1" fill={COLORS.wood.medium} />
      
      {/* Legs */}
      {!connectedLeft && (
        <rect x="1" y="8" width="2" height="8" fill={COLORS.wood.medium} />
      )}
      {!connectedRight && (
        <rect x="13" y="8" width="2" height="8" fill={COLORS.wood.medium} />
      )}
      
      {/* Leg shadows */}
      {!connectedLeft && <rect x="1" y="8" width="2" height="1" fill={COLORS.wood.dark} />}
      {!connectedRight && <rect x="13" y="8" width="2" height="1" fill={COLORS.wood.dark} />}
    </svg>
  );
};

// Pixel art TV
export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Stand */}
    <rect x="5" y="13" width="6" height="2" fill={COLORS.metal.dark} />
    <rect x="7" y="11" width="2" height="2" fill={COLORS.metal.medium} />
    
    {/* Frame */}
    <rect x="1" y="2" width="14" height="10" fill={COLORS.metal.dark} />
    
    {/* Screen */}
    <rect x="2" y="3" width="12" height="7" fill="#2A4A5A" />
    <rect x="2" y="3" width="12" height="2" fill="#3A5A6A" />
    
    {/* Screen shine */}
    <rect x="3" y="4" width="3" height="2" fill="#4A6A7A" />
    
    {/* Power LED */}
    <rect x="13" y="11" width="1" height="1" fill="#5A5" />
  </svg>
);

// Pixel art bookshelf
export const BookshelfIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Frame */}
    <rect x="1" y="1" width="14" height="14" fill={COLORS.wood.medium} />
    <rect x="1" y="1" width="14" height="1" fill={COLORS.wood.highlight} />
    
    {/* Shelves */}
    <rect x="2" y="5" width="12" height="1" fill={COLORS.wood.dark} />
    <rect x="2" y="10" width="12" height="1" fill={COLORS.wood.dark} />
    
    {/* Books row 1 */}
    <rect x="3" y="2" width="2" height="3" fill="#A05050" />
    <rect x="5" y="2" width="2" height="3" fill="#5080A0" />
    <rect x="7" y="2" width="3" height="3" fill="#50A070" />
    <rect x="10" y="2" width="2" height="3" fill="#A08050" />
    
    {/* Books row 2 */}
    <rect x="3" y="6" width="3" height="4" fill="#7050A0" />
    <rect x="6" y="6" width="2" height="4" fill="#A05080" />
    <rect x="8" y="6" width="3" height="4" fill="#50A0A0" />
    <rect x="11" y="6" width="2" height="4" fill="#A07050" />
    
    {/* Books row 3 */}
    <rect x="3" y="11" width="2" height="3" fill="#5080A0" />
    <rect x="5" y="11" width="3" height="3" fill="#80A050" />
    <rect x="8" y="11" width="2" height="3" fill="#A05050" />
    <rect x="10" y="11" width="3" height="3" fill="#50A090" />
  </svg>
);

// Pixel art rock
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Shadow */}
    <rect x="3" y="13" width="10" height="2" fill="#404040" />
    
    {/* Main rock body */}
    <rect x="4" y="6" width="8" height="7" fill={COLORS.metal.medium} />
    <rect x="3" y="8" width="10" height="5" fill={COLORS.metal.medium} />
    <rect x="5" y="5" width="6" height="2" fill={COLORS.metal.light} />
    
    {/* Highlights */}
    <rect x="5" y="6" width="3" height="2" fill={COLORS.metal.highlight} />
    
    {/* Dark areas */}
    <rect x="8" y="10" width="4" height="3" fill={COLORS.metal.dark} />
    
    {/* Crack */}
    <rect x="7" y="8" width="1" height="4" fill={COLORS.metal.dark} />
  </svg>
);

// Pixel art debris
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Scattered wood pieces */}
    <rect x="2" y="10" width="6" height="2" fill={COLORS.wood.light} transform="rotate(-10 5 11)" />
    <rect x="7" y="8" width="5" height="2" fill={COLORS.wood.medium} transform="rotate(15 9.5 9)" />
    <rect x="4" y="12" width="4" height="2" fill={COLORS.wood.light} transform="rotate(5 6 13)" />
    <rect x="10" y="11" width="3" height="2" fill={COLORS.wood.medium} transform="rotate(-8 11.5 12)" />
    
    {/* Small fragments */}
    <rect x="3" y="9" width="2" height="1" fill={COLORS.wood.dark} />
    <rect x="11" y="9" width="2" height="1" fill={COLORS.wood.dark} />
    <rect x="8" y="13" width="2" height="1" fill={COLORS.wood.dark} />
  </svg>
);

export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// Pixel art fridge
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Body */}
    <rect x="3" y="1" width="10" height="14" fill={COLORS.metal.light} />
    <rect x="3" y="1" width="10" height="1" fill={COLORS.metal.highlight} />
    <rect x="12" y="1" width="1" height="14" fill={COLORS.metal.medium} />
    
    {/* Freezer door */}
    <rect x="4" y="2" width="8" height="4" fill={COLORS.white} />
    <rect x="4" y="2" width="8" height="1" fill="#FFFFFF" />
    
    {/* Handle */}
    <rect x="10" y="3" width="1" height="2" fill={COLORS.metal.dark} />
    
    {/* Door gap */}
    <rect x="4" y="6" width="8" height="1" fill={COLORS.metal.dark} />
    
    {/* Fridge door */}
    <rect x="4" y="7" width="8" height="7" fill={COLORS.white} />
    
    {/* Handle */}
    <rect x="10" y="9" width="1" height="3" fill={COLORS.metal.dark} />
    
    {/* Base */}
    <rect x="3" y="14" width="10" height="1" fill={COLORS.metal.dark} />
  </svg>
);

// Pixel art stove
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Counter body */}
    <rect x="0" y="4" width="16" height="12" fill={COLORS.metal.dark} />
    <rect x="0" y="4" width="16" height="1" fill={COLORS.metal.medium} />
    
    {/* Stovetop surface */}
    <rect x="1" y="5" width="14" height="4" fill={COLORS.metal.medium} />
    
    {/* Burners */}
    <rect x="2" y="6" width="4" height="2" fill="#2A2A2A" />
    <rect x="3" y="6" width="2" height="1" fill="#3A3A3A" />
    <rect x="10" y="6" width="4" height="2" fill="#2A2A2A" />
    <rect x="11" y="6" width="2" height="1" fill="#3A3A3A" />
    
    {/* Oven door */}
    <rect x="2" y="10" width="12" height="5" fill={COLORS.metal.medium} />
    <rect x="3" y="11" width="10" height="3" fill="#1A1A1A" />
    
    {/* Oven handle */}
    <rect x="5" y="10" width="6" height="1" fill={COLORS.metal.light} />
    
    {/* Knobs */}
    <rect x="3" y="15" width="2" height="1" fill={COLORS.metal.light} />
    <rect x="7" y="15" width="2" height="1" fill={COLORS.metal.light} />
    <rect x="11" y="15" width="2" height="1" fill={COLORS.metal.light} />
  </svg>
);

// Pixel art chair
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Backrest */}
    <rect x="3" y="2" width="10" height="6" fill={COLORS.wood.medium} />
    <rect x="3" y="2" width="10" height="1" fill={COLORS.wood.highlight} />
    <rect x="4" y="3" width="3" height="4" fill={COLORS.wood.light} />
    <rect x="9" y="3" width="3" height="4" fill={COLORS.wood.light} />
    
    {/* Seat */}
    <rect x="2" y="8" width="12" height="3" fill={COLORS.wood.medium} />
    <rect x="2" y="8" width="12" height="1" fill={COLORS.wood.highlight} />
    
    {/* Legs */}
    <rect x="3" y="11" width="2" height="5" fill={COLORS.wood.dark} />
    <rect x="11" y="11" width="2" height="5" fill={COLORS.wood.dark} />
  </svg>
);

// Pixel art toilet
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Tank */}
    <rect x="4" y="2" width="8" height="5" fill={COLORS.white} />
    <rect x="4" y="2" width="8" height="1" fill="#FFFFFF" />
    
    {/* Tank lid */}
    <rect x="3" y="1" width="10" height="2" fill={COLORS.cream} />
    
    {/* Bowl */}
    <rect x="3" y="7" width="10" height="6" fill={COLORS.white} />
    <rect x="4" y="8" width="8" height="4" fill={COLORS.water.light} />
    
    {/* Seat */}
    <rect x="2" y="6" width="12" height="2" fill={COLORS.cream} />
    
    {/* Base */}
    <rect x="4" y="13" width="8" height="2" fill={COLORS.white} />
    <rect x="4" y="14" width="8" height="1" fill="#E0E0E0" />
  </svg>
);

// Pixel art sink
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Counter */}
    <rect x="0" y="4" width="16" height="3" fill={COLORS.metal.light} />
    <rect x="0" y="4" width="16" height="1" fill={COLORS.metal.highlight} />
    
    {/* Basin */}
    <rect x="3" y="5" width="10" height="4" fill={COLORS.metal.medium} />
    <rect x="4" y="6" width="8" height="2" fill={COLORS.water.light} />
    
    {/* Faucet */}
    <rect x="7" y="2" width="2" height="3" fill={COLORS.metal.dark} />
    <rect x="6" y="2" width="4" height="1" fill={COLORS.metal.medium} />
    
    {/* Cabinet */}
    <rect x="1" y="9" width="14" height="6" fill={COLORS.wood.medium} />
    <rect x="2" y="10" width="5" height="4" fill={COLORS.wood.light} />
    <rect x="9" y="10" width="5" height="4" fill={COLORS.wood.light} />
    
    {/* Cabinet handles */}
    <rect x="4" y="11" width="1" height="2" fill={COLORS.metal.dark} />
    <rect x="11" y="11" width="1" height="2" fill={COLORS.metal.dark} />
    
    {/* Base */}
    <rect x="1" y="15" width="14" height="1" fill={COLORS.wood.dark} />
  </svg>
);

// Pixel art shower
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Base */}
    <rect x="2" y="12" width="12" height="3" fill={COLORS.white} />
    <rect x="2" y="14" width="12" height="1" fill="#E0E0E0" />
    
    {/* Glass walls */}
    <rect x="2" y="2" width="1" height="10" fill={COLORS.water.light} />
    <rect x="13" y="2" width="1" height="10" fill={COLORS.water.light} />
    <rect x="2" y="2" width="12" height="1" fill={COLORS.water.light} />
    
    {/* Shower head */}
    <rect x="10" y="3" width="3" height="2" fill={COLORS.metal.medium} />
    <rect x="12" y="2" width="1" height="2" fill={COLORS.metal.dark} />
    
    {/* Water drops */}
    <rect x="10" y="6" width="1" height="1" fill={COLORS.water.medium} />
    <rect x="11" y="7" width="1" height="1" fill={COLORS.water.medium} />
    <rect x="10" y="9" width="1" height="1" fill={COLORS.water.medium} />
  </svg>
);

// Pixel art desk
export const DeskIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Desktop surface */}
    <rect x="0" y="4" width="16" height="3" fill={COLORS.wood.light} />
    <rect x="0" y="4" width="16" height="1" fill={COLORS.wood.highlight} />
    <rect x="0" y="6" width="16" height="1" fill={COLORS.wood.medium} />
    
    {/* Drawer section */}
    <rect x="9" y="7" width="6" height="6" fill={COLORS.wood.medium} />
    <rect x="10" y="8" width="4" height="2" fill={COLORS.wood.light} />
    <rect x="10" y="11" width="4" height="2" fill={COLORS.wood.light} />
    
    {/* Drawer handles */}
    <rect x="11" y="8" width="2" height="1" fill={COLORS.metal.dark} />
    <rect x="11" y="11" width="2" height="1" fill={COLORS.metal.dark} />
    
    {/* Legs */}
    {!connectedLeft && <rect x="1" y="7" width="2" height="9" fill={COLORS.wood.dark} />}
    <rect x="9" y="13" width="6" height="3" fill={COLORS.wood.dark} />
  </svg>
);

// Pixel art computer (laptop)
export const ComputerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Screen */}
    <rect x="2" y="2" width="12" height="8" fill={COLORS.metal.dark} />
    <rect x="3" y="3" width="10" height="6" fill="#2A4A5A" />
    <rect x="3" y="3" width="10" height="2" fill="#3A5A6A" />
    
    {/* Screen shine */}
    <rect x="4" y="4" width="3" height="1" fill="#4A6A7A" />
    
    {/* Keyboard base */}
    <rect x="1" y="10" width="14" height="4" fill={COLORS.metal.medium} />
    <rect x="1" y="10" width="14" height="1" fill={COLORS.metal.light} />
    
    {/* Keyboard */}
    <rect x="2" y="11" width="12" height="2" fill={COLORS.metal.dark} />
    
    {/* Trackpad */}
    <rect x="6" y="13" width="4" height="1" fill={COLORS.metal.light} />
  </svg>
);

// Asset icon map
export const AssetIconMap: Record<AssetType, React.FC<AssetIconProps | DirectionalAssetProps | ConnectableAssetProps>> = {
  empty: EmptyIcon,
  bed: BedIcon,
  sofa: SofaIcon,
  armchair: ArmchairIcon,
  rug: RugIcon,
  window: WindowIcon,
  door: EmptyIcon,
  plant: PlantIcon,
  table: TableIcon,
  tv: TvIcon,
  bookshelf: BookshelfIcon,
  rock: RockIcon,
  debris: DebrisIcon,
  fridge: FridgeIcon,
  stove: StoveIcon,
  chair: ChairIcon,
  toilet: ToiletIcon,
  sink: SinkIcon,
  shower: ShowerIcon,
  desk: DeskIcon,
  computer: ComputerIcon,
};
