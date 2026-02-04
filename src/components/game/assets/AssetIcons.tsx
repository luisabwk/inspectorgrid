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

// Clean color palette
const COLORS = {
  wood: {
    light: '#D4B896',
    medium: '#A68B5B',
    dark: '#7A6442',
    highlight: '#E8D4B8',
  },
  fabric: {
    blue: '#7BA3C9',
    blueDark: '#5A82A8',
    blueLight: '#9BC3E9',
    red: '#C98B8B',
    redDark: '#A86B6B',
    purple: '#A89BC9',
    purpleDark: '#887BA8',
    green: '#8BC9A0',
    greenDark: '#6BA880',
  },
  metal: {
    light: '#D8D8D8',
    medium: '#A8A8A8',
    dark: '#787878',
    highlight: '#F0F0F0',
  },
  plant: {
    leaf: '#7CB88C',
    leafDark: '#5C9870',
    leafLight: '#9CD8AC',
    pot: '#B87850',
    potDark: '#986840',
    soil: '#584838',
  },
  water: {
    light: '#A8D8F0',
    medium: '#78B8D8',
    dark: '#58A0C0',
  },
  white: '#FAFAFA',
  cream: '#F8F4F0',
  shadow: '#505050',
};

// Bed icon with connection support
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const isHead = (!connectedTop && connectedBottom) || (!connectedLeft && connectedRight);
  const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
  
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {/* Frame */}
      <rect x="2" y="14" width="20" height="6" rx="1" fill={COLORS.wood.medium} />
      <rect x="2" y="14" width="20" height="2" rx="0.5" fill={COLORS.wood.highlight} />
      
      {/* Mattress */}
      <rect x="3" y="8" width="18" height="7" rx="1" fill={COLORS.cream} />
      
      {/* Blanket */}
      <rect x="3" y="11" width="18" height="4" rx="0.5" fill={COLORS.fabric.blue} />
      <rect x="3" y="11" width="18" height="1" fill={COLORS.fabric.blueLight} />
      
      {/* Pillows */}
      {(isHead || isSingle) && (
        <>
          <ellipse cx="7" cy="9" rx="3" ry="2" fill={COLORS.white} />
          <ellipse cx="17" cy="9" rx="3" ry="2" fill={COLORS.white} />
        </>
      )}
      
      {/* Headboard */}
      {(isHead || isSingle) && (
        <rect x="2" y="4" width="20" height="5" rx="1" fill={COLORS.wood.dark} />
      )}
      
      {/* Legs */}
      {!connectedLeft && <rect x="2" y="19" width="2" height="3" rx="0.5" fill={COLORS.wood.dark} />}
      {!connectedRight && <rect x="20" y="19" width="2" height="3" rx="0.5" fill={COLORS.wood.dark} />}
    </svg>
  );
};

// Sofa icon
export const SofaIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {/* Back */}
      {!connectedTop && (
        <rect x="2" y="5" width="20" height="8" rx="2" fill={COLORS.fabric.purple} />
      )}
      
      {/* Seat */}
      <rect x="2" y="11" width="20" height="5" rx="1" fill={COLORS.fabric.purple} />
      <rect x="3" y="11" width="18" height="2" rx="0.5" fill={COLORS.fabric.purpleDark} opacity="0.3" />
      
      {/* Arms */}
      {!connectedLeft && (
        <rect x="0" y="7" width="4" height="10" rx="1.5" fill={COLORS.fabric.purpleDark} />
      )}
      {!connectedRight && (
        <rect x="20" y="7" width="4" height="10" rx="1.5" fill={COLORS.fabric.purpleDark} />
      )}
      
      {/* Base */}
      <rect x="2" y="16" width="20" height="2" rx="0.5" fill={COLORS.fabric.purpleDark} />
      
      {/* Legs */}
      {!connectedLeft && <rect x="3" y="18" width="2" height="2" rx="0.5" fill={COLORS.wood.dark} />}
      {!connectedRight && <rect x="19" y="18" width="2" height="2" rx="0.5" fill={COLORS.wood.dark} />}
    </svg>
  );
};

// Armchair icon
export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Back */}
    <rect x="5" y="4" width="14" height="10" rx="2" fill={COLORS.fabric.green} />
    
    {/* Seat */}
    <rect x="5" y="12" width="14" height="4" rx="1" fill={COLORS.fabric.green} />
    
    {/* Arms */}
    <rect x="2" y="6" width="4" height="11" rx="1.5" fill={COLORS.fabric.greenDark} />
    <rect x="18" y="6" width="4" height="11" rx="1.5" fill={COLORS.fabric.greenDark} />
    
    {/* Base */}
    <rect x="5" y="16" width="14" height="2" rx="0.5" fill={COLORS.fabric.greenDark} />
    
    {/* Legs */}
    <rect x="6" y="18" width="2" height="2" rx="0.5" fill={COLORS.wood.dark} />
    <rect x="16" y="18" width="2" height="2" rx="0.5" fill={COLORS.wood.dark} />
  </svg>
);

// Rug icon
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Base */}
    <rect x="2" y="6" width="20" height="14" rx="1" fill={COLORS.fabric.red} />
    
    {/* Border pattern */}
    <rect x="3" y="7" width="18" height="12" rx="0.5" fill={COLORS.fabric.redDark} opacity="0.3" />
    
    {/* Center pattern */}
    <rect x="5" y="9" width="14" height="8" rx="0.5" fill={COLORS.fabric.red} />
    
    {/* Diamond */}
    <path d="M12 10 L15 13 L12 16 L9 13 Z" fill="#F0D070" />
    
    {/* Corner accents */}
    <circle cx="6" cy="10" r="1" fill="#F0D070" />
    <circle cx="18" cy="10" r="1" fill="#F0D070" />
    <circle cx="6" cy="16" r="1" fill="#F0D070" />
    <circle cx="18" cy="16" r="1" fill="#F0D070" />
  </svg>
);

// Window icon
export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Frame */}
    <rect x="3" y="3" width="18" height="18" rx="1" fill={COLORS.wood.medium} />
    
    {/* Glass panes */}
    <rect x="4" y="4" width="7" height="7" rx="0.5" fill={COLORS.water.light} />
    <rect x="13" y="4" width="7" height="7" rx="0.5" fill={COLORS.water.light} />
    <rect x="4" y="13" width="7" height="7" rx="0.5" fill={COLORS.water.medium} />
    <rect x="13" y="13" width="7" height="7" rx="0.5" fill={COLORS.water.medium} />
    
    {/* Cross bar */}
    <rect x="11" y="3" width="2" height="18" fill={COLORS.wood.dark} />
    <rect x="3" y="11" width="18" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Plant icon
export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Pot */}
    <path d="M7 14 L17 14 L16 22 L8 22 Z" fill={COLORS.plant.pot} />
    <rect x="6" y="13" width="12" height="2" rx="0.5" fill={COLORS.plant.potDark} />
    
    {/* Soil */}
    <ellipse cx="12" cy="14" rx="4" ry="1" fill={COLORS.plant.soil} />
    
    {/* Leaves */}
    <ellipse cx="12" cy="8" rx="3" ry="5" fill={COLORS.plant.leaf} />
    <ellipse cx="8" cy="9" rx="2" ry="4" fill={COLORS.plant.leaf} transform="rotate(-20 8 9)" />
    <ellipse cx="16" cy="9" rx="2" ry="4" fill={COLORS.plant.leaf} transform="rotate(20 16 9)" />
    <ellipse cx="10" cy="5" rx="1.5" ry="3" fill={COLORS.plant.leafLight} transform="rotate(-10 10 5)" />
    <ellipse cx="14" cy="5" rx="1.5" ry="3" fill={COLORS.plant.leafLight} transform="rotate(10 14 5)" />
  </svg>
);

// Table icon
export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: ConnectableAssetProps) => {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      {/* Table top */}
      <rect x="1" y="6" width="22" height="4" rx="0.5" fill={COLORS.wood.light} />
      <rect x="1" y="6" width="22" height="1.5" rx="0.5" fill={COLORS.wood.highlight} />
      <rect x="1" y="9" width="22" height="1" fill={COLORS.wood.medium} />
      
      {/* Legs */}
      {!connectedLeft && (
        <rect x="2" y="10" width="2" height="10" rx="0.5" fill={COLORS.wood.medium} />
      )}
      {!connectedRight && (
        <rect x="20" y="10" width="2" height="10" rx="0.5" fill={COLORS.wood.medium} />
      )}
    </svg>
  );
};

// TV icon
export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Stand */}
    <rect x="8" y="18" width="8" height="2" rx="0.5" fill={COLORS.metal.dark} />
    <rect x="10" y="16" width="4" height="2" fill={COLORS.metal.medium} />
    
    {/* Frame */}
    <rect x="2" y="4" width="20" height="13" rx="1" fill={COLORS.metal.dark} />
    
    {/* Screen */}
    <rect x="3" y="5" width="18" height="10" rx="0.5" fill="#2A4A5A" />
    <rect x="3" y="5" width="18" height="3" rx="0.5" fill="#3A5A6A" opacity="0.5" />
    
    {/* Screen shine */}
    <rect x="4" y="6" width="4" height="3" rx="0.5" fill="#4A6A7A" opacity="0.3" />
    
    {/* Power LED */}
    <circle cx="20" cy="16" r="0.8" fill="#5A5" />
  </svg>
);

// Bookshelf icon
export const BookshelfIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Frame */}
    <rect x="2" y="2" width="20" height="20" rx="1" fill={COLORS.wood.medium} />
    
    {/* Shelves */}
    <rect x="3" y="7" width="18" height="1" fill={COLORS.wood.dark} />
    <rect x="3" y="14" width="18" height="1" fill={COLORS.wood.dark} />
    
    {/* Books row 1 */}
    <rect x="4" y="3" width="2" height="4" rx="0.3" fill="#C07070" />
    <rect x="7" y="3" width="2" height="4" rx="0.3" fill="#7090C0" />
    <rect x="10" y="3" width="3" height="4" rx="0.3" fill="#70C090" />
    <rect x="14" y="3" width="2" height="4" rx="0.3" fill="#C0A070" />
    <rect x="17" y="3" width="2" height="4" rx="0.3" fill="#A070C0" />
    
    {/* Books row 2 */}
    <rect x="4" y="8" width="3" height="6" rx="0.3" fill="#9070C0" />
    <rect x="8" y="8" width="2" height="6" rx="0.3" fill="#C07090" />
    <rect x="11" y="8" width="3" height="6" rx="0.3" fill="#70C0C0" />
    <rect x="15" y="8" width="3" height="6" rx="0.3" fill="#C09070" />
    
    {/* Books row 3 */}
    <rect x="4" y="15" width="2" height="5" rx="0.3" fill="#7090C0" />
    <rect x="7" y="15" width="3" height="5" rx="0.3" fill="#90C070" />
    <rect x="11" y="15" width="2" height="5" rx="0.3" fill="#C07070" />
    <rect x="14" y="15" width="4" height="5" rx="0.3" fill="#70C0A0" />
  </svg>
);

// Empty icon
export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// Fridge icon
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Body */}
    <rect x="4" y="2" width="16" height="20" rx="1" fill={COLORS.metal.light} />
    
    {/* Freezer door */}
    <rect x="5" y="3" width="14" height="5" rx="0.5" fill={COLORS.white} />
    
    {/* Handle */}
    <rect x="16" y="4" width="1" height="3" rx="0.5" fill={COLORS.metal.dark} />
    
    {/* Door gap */}
    <rect x="5" y="8" width="14" height="0.5" fill={COLORS.metal.dark} />
    
    {/* Fridge door */}
    <rect x="5" y="9" width="14" height="12" rx="0.5" fill={COLORS.white} />
    
    {/* Handle */}
    <rect x="16" y="12" width="1" height="5" rx="0.5" fill={COLORS.metal.dark} />
  </svg>
);

// Stove icon
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Counter body */}
    <rect x="1" y="6" width="22" height="16" rx="1" fill={COLORS.metal.medium} />
    
    {/* Stovetop surface */}
    <rect x="2" y="7" width="20" height="5" rx="0.5" fill={COLORS.metal.light} />
    
    {/* Burners */}
    <circle cx="7" cy="9.5" r="2.5" fill={COLORS.metal.dark} />
    <circle cx="7" cy="9.5" r="1.5" fill={COLORS.metal.medium} />
    <circle cx="17" cy="9.5" r="2.5" fill={COLORS.metal.dark} />
    <circle cx="17" cy="9.5" r="1.5" fill={COLORS.metal.medium} />
    
    {/* Oven door */}
    <rect x="3" y="13" width="18" height="8" rx="0.5" fill={COLORS.metal.dark} />
    <rect x="4" y="14" width="16" height="6" rx="0.5" fill="#1A1A1A" />
    
    {/* Oven handle */}
    <rect x="6" y="13" width="12" height="1" rx="0.5" fill={COLORS.metal.highlight} />
  </svg>
);

// Chair icon
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Backrest */}
    <rect x="5" y="3" width="14" height="8" rx="1" fill={COLORS.wood.medium} />
    <rect x="6" y="4" width="5" height="6" rx="0.5" fill={COLORS.wood.light} />
    <rect x="13" y="4" width="5" height="6" rx="0.5" fill={COLORS.wood.light} />
    
    {/* Seat */}
    <rect x="4" y="11" width="16" height="3" rx="0.5" fill={COLORS.wood.medium} />
    <rect x="4" y="11" width="16" height="1" fill={COLORS.wood.highlight} />
    
    {/* Legs */}
    <rect x="5" y="14" width="2" height="7" rx="0.5" fill={COLORS.wood.dark} />
    <rect x="17" y="14" width="2" height="7" rx="0.5" fill={COLORS.wood.dark} />
  </svg>
);

// Toilet icon
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Tank */}
    <rect x="6" y="3" width="12" height="6" rx="1" fill={COLORS.white} />
    
    {/* Tank lid */}
    <rect x="5" y="2" width="14" height="2" rx="0.5" fill={COLORS.cream} />
    
    {/* Bowl */}
    <ellipse cx="12" cy="15" rx="6" ry="5" fill={COLORS.white} />
    <ellipse cx="12" cy="14" rx="4" ry="3" fill={COLORS.water.light} />
    
    {/* Seat */}
    <ellipse cx="12" cy="10" rx="7" ry="2" fill={COLORS.cream} />
  </svg>
);

// Bathtub icon
export const BathtubIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Tub body */}
    <rect x="2" y="10" width="20" height="10" rx="2" fill={COLORS.white} />
    
    {/* Water */}
    <rect x="4" y="12" width="16" height="6" rx="1" fill={COLORS.water.light} />
    
    {/* Faucet */}
    <rect x="18" y="6" width="2" height="5" rx="0.5" fill={COLORS.metal.medium} />
    <rect x="16" y="6" width="6" height="2" rx="0.5" fill={COLORS.metal.light} />
    
    {/* Feet */}
    <ellipse cx="5" cy="20" rx="2" ry="1.5" fill={COLORS.metal.medium} />
    <ellipse cx="19" cy="20" rx="2" ry="1.5" fill={COLORS.metal.medium} />
  </svg>
);

// Sink icon
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Counter */}
    <rect x="2" y="6" width="20" height="16" rx="1" fill={COLORS.cream} />
    
    {/* Basin */}
    <rect x="4" y="10" width="16" height="8" rx="2" fill={COLORS.water.light} />
    <rect x="6" y="12" width="12" height="4" rx="1" fill={COLORS.water.medium} />
    
    {/* Faucet */}
    <rect x="10" y="6" width="4" height="5" rx="0.5" fill={COLORS.metal.medium} />
    <rect x="8" y="6" width="8" height="2" rx="0.5" fill={COLORS.metal.light} />
    
    {/* Drain */}
    <circle cx="12" cy="14" r="1" fill={COLORS.metal.dark} />
  </svg>
);

// Desk icon
export const DeskIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Desktop */}
    <rect x="1" y="6" width="22" height="3" rx="0.5" fill={COLORS.wood.medium} />
    <rect x="1" y="6" width="22" height="1" fill={COLORS.wood.highlight} />
    
    {/* Drawer section */}
    <rect x="14" y="9" width="8" height="8" rx="0.5" fill={COLORS.wood.dark} />
    <rect x="15" y="10" width="6" height="3" rx="0.3" fill={COLORS.wood.medium} />
    <rect x="17" y="11" width="2" height="1" rx="0.3" fill={COLORS.metal.medium} />
    <rect x="15" y="14" width="6" height="3" rx="0.3" fill={COLORS.wood.medium} />
    <rect x="17" y="15" width="2" height="1" rx="0.3" fill={COLORS.metal.medium} />
    
    {/* Leg */}
    {!connectedLeft && <rect x="2" y="9" width="2" height="10" rx="0.5" fill={COLORS.wood.dark} />}
  </svg>
);

// Laptop icon  
export const LaptopIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Screen */}
    <rect x="4" y="4" width="16" height="10" rx="1" fill={COLORS.metal.dark} />
    <rect x="5" y="5" width="14" height="8" rx="0.5" fill="#2A3A4A" />
    <rect x="6" y="6" width="5" height="3" rx="0.3" fill="#3A4A5A" opacity="0.5" />
    
    {/* Keyboard base */}
    <rect x="2" y="14" width="20" height="6" rx="1" fill={COLORS.metal.medium} />
    <rect x="4" y="16" width="16" height="3" rx="0.5" fill={COLORS.metal.dark} />
    
    {/* Trackpad */}
    <rect x="9" y="17" width="6" height="1.5" rx="0.3" fill={COLORS.metal.light} />
  </svg>
);

// Lamp icon
export const LampIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Shade */}
    <path d="M6 4 L18 4 L16 12 L8 12 Z" fill="#F8F0E0" />
    <path d="M7 5 L17 5 L16 10 L8 10 Z" fill="#FFF8F0" />
    
    {/* Stem */}
    <rect x="11" y="12" width="2" height="6" fill={COLORS.metal.medium} />
    
    {/* Base */}
    <ellipse cx="12" cy="19" rx="4" ry="1.5" fill={COLORS.metal.dark} />
    <ellipse cx="12" cy="18" rx="3" ry="1" fill={COLORS.metal.medium} />
  </svg>
);

// Mirror icon
export const MirrorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Frame */}
    <rect x="5" y="3" width="14" height="18" rx="1" fill={COLORS.wood.medium} />
    
    {/* Glass */}
    <rect x="6" y="4" width="12" height="16" rx="0.5" fill="#D8E8F8" />
    <rect x="7" y="5" width="4" height="6" rx="0.3" fill="#E8F0F8" opacity="0.6" />
  </svg>
);

// Wardrobe icon
export const WardrobeIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Body */}
    <rect x="2" y="2" width="20" height="20" rx="1" fill={COLORS.wood.medium} />
    
    {/* Doors */}
    <rect x="3" y="3" width="8" height="18" rx="0.5" fill={COLORS.wood.light} />
    <rect x="13" y="3" width="8" height="18" rx="0.5" fill={COLORS.wood.light} />
    
    {/* Handles */}
    <rect x="9" y="10" width="1" height="4" rx="0.5" fill={COLORS.metal.medium} />
    <rect x="14" y="10" width="1" height="4" rx="0.5" fill={COLORS.metal.medium} />
    
    {/* Door line */}
    <rect x="11" y="3" width="2" height="18" fill={COLORS.wood.dark} />
  </svg>
);

// Nightstand icon
export const NightstandIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    {/* Body */}
    <rect x="4" y="8" width="16" height="12" rx="1" fill={COLORS.wood.medium} />
    
    {/* Drawer */}
    <rect x="5" y="12" width="14" height="4" rx="0.5" fill={COLORS.wood.light} />
    <rect x="10" y="13.5" width="4" height="1" rx="0.5" fill={COLORS.metal.medium} />
    
    {/* Top */}
    <rect x="3" y="6" width="18" height="3" rx="0.5" fill={COLORS.wood.dark} />
    
    {/* Legs */}
    <rect x="5" y="20" width="2" height="2" rx="0.5" fill={COLORS.wood.dark} />
    <rect x="17" y="20" width="2" height="2" rx="0.5" fill={COLORS.wood.dark} />
  </svg>
);

// Rock icon
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <ellipse cx="12" cy="16" rx="8" ry="4" fill={COLORS.metal.dark} opacity="0.3" />
    <path d="M6 12 Q4 14 6 16 L18 16 Q20 14 18 12 L16 8 Q14 6 12 6 Q10 6 8 8 Z" fill={COLORS.metal.medium} />
    <path d="M8 10 Q7 12 8 14 L10 14 Q9 12 10 10 Z" fill={COLORS.metal.highlight} opacity="0.5" />
  </svg>
);

// Debris icon
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect x="4" y="14" width="8" height="2" rx="0.5" fill={COLORS.wood.light} transform="rotate(-10 8 15)" />
    <rect x="10" y="12" width="6" height="2" rx="0.5" fill={COLORS.wood.medium} transform="rotate(15 13 13)" />
    <rect x="6" y="16" width="5" height="2" rx="0.5" fill={COLORS.wood.light} transform="rotate(5 8.5 17)" />
    <rect x="14" y="15" width="4" height="2" rx="0.5" fill={COLORS.wood.medium} transform="rotate(-8 16 16)" />
  </svg>
);

// Door icon (placeholder)
export const DoorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 24 24" className={className}>
    <rect x="6" y="2" width="12" height="20" rx="1" fill={COLORS.wood.medium} />
    <rect x="7" y="3" width="10" height="18" rx="0.5" fill={COLORS.wood.light} />
    <circle cx="15" cy="12" r="1" fill={COLORS.metal.medium} />
  </svg>
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
