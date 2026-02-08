import type { ComponentType } from "react";
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

// High-definition pixel art color palette - 32x32 grid for more detail
const COLORS = {
  // Wood tones - warm brown palette
  wood: {
    highlight: '#E8D4B8',
    top: '#D4B896',
    front: '#A07850',
    side: '#785838',
    dark: '#503820',
    grain: '#8B6040',
  },
  // Fabric - distinct palettes for each furniture type
  bed: {
    blanket: '#6B9BD1',
    blanketDark: '#4A7AB0',
    blanketLight: '#8BB8E8',
    sheet: '#F5F5F5',
    pillow: '#FFFFFF',
    pillowShade: '#E8E8E8',
  },
  sofa: {
    main: '#9B6B9B',
    light: '#B888B8',
    dark: '#7A4A7A',
    cushion: '#A878A8',
  },
  armchair: {
    main: '#6B8B6B',
    light: '#88A888',
    dark: '#4A6A4A',
  },
  rug: {
    main: '#C86868',
    light: '#E89090',
    dark: '#A85050',
    pattern: '#E8C868',
  },
  // Metal tones
  metal: {
    white: '#FFFFFF',
    light: '#F0F0F0',
    top: '#E0E0E0',
    front: '#C0C0C0',
    side: '#909090',
    dark: '#606060',
    handle: '#404040',
  },
  // Appliances
  appliance: {
    white: '#FAFAFA',
    cream: '#F0E8E0',
    steel: '#D0D0D0',
    steelDark: '#A0A0A0',
  },
  // Nature
  plant: {
    leaf: '#78B888',
    leafLight: '#98D0A8',
    leafDark: '#589068',
    pot: '#C87848',
    potDark: '#A05830',
    soil: '#503828',
  },
  // Water
  water: {
    light: '#D0F0FF',
    top: '#B0E0F8',
    front: '#80C0E0',
    dark: '#60A0C0',
  },
  // Screen
  screen: {
    frame: '#2A2A2A',
    display: '#1A2A3A',
    glow: '#3A4A5A',
  },
};

// ==================== CONNECTABLE ASSETS ====================

// Bed - distinctive with visible blanket folds, pillows with stitching
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const isHead = (!connectedTop && connectedBottom) || (!connectedLeft && connectedRight);
  const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
  
  const left = connectedLeft ? 0 : 2;
  const right = connectedRight ? 32 : 30;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Bed frame base */}
      <rect x={left} y="24" width={width} height="6" fill={COLORS.wood.front} />
      <rect x={left} y="24" width={width} height="2" fill={COLORS.wood.top} />
      
      {/* Headboard - ornate design only on head */}
      {(isHead || isSingle) && (
        <>
          <rect x={left} y="2" width={width} height="8" fill={COLORS.wood.front} />
          <rect x={left} y="2" width={width} height="2" fill={COLORS.wood.highlight} />
          {/* Headboard panels */}
          <rect x={left + 3} y="4" width={width/3 - 2} height="4" fill={COLORS.wood.top} />
          <rect x={right - width/3 - 1} y="4" width={width/3 - 2} height="4" fill={COLORS.wood.top} />
        </>
      )}
      
      {/* Mattress - extends for connection */}
      <rect x={left} y={connectedTop ? 0 : 10} width={width} height={24 - (connectedTop ? 0 : 10)} fill={COLORS.bed.sheet} />
      
      {/* Blanket with fold lines */}
      <rect x={left} y={connectedTop ? 6 : 14} width={width} height={connectedBottom ? 26 - (connectedTop ? 6 : 14) : 10} fill={COLORS.bed.blanket} />
      <rect x={left} y={connectedTop ? 6 : 14} width={width} height="2" fill={COLORS.bed.blanketLight} />
      {/* Blanket fold details */}
      <rect x={left + 4} y={connectedTop ? 10 : 18} width={width - 8} height="1" fill={COLORS.bed.blanketDark} opacity="0.4" />
      <rect x={left + 6} y={connectedTop ? 14 : 22} width={width - 12} height="1" fill={COLORS.bed.blanketDark} opacity="0.3" />
      
      {/* Pillows - only on head, with stitching detail */}
      {(isHead || isSingle) && (
        <>
          {/* Left pillow */}
          <rect x={left + 2} y="10" width="10" height="5" rx="1" fill={COLORS.bed.pillow} />
          <rect x={left + 2} y="10" width="10" height="1" fill={COLORS.bed.pillowShade} />
          <line x1={left + 7} y1="10" x2={left + 7} y2="15" stroke={COLORS.bed.pillowShade} strokeWidth="0.5" />
          
          {/* Right pillow */}
          <rect x={right - 12} y="10" width="10" height="5" rx="1" fill={COLORS.bed.pillow} />
          <rect x={right - 12} y="10" width="10" height="1" fill={COLORS.bed.pillowShade} />
          <line x1={right - 7} y1="10" x2={right - 7} y2="15" stroke={COLORS.bed.pillowShade} strokeWidth="0.5" />
        </>
      )}
      
      {/* Legs - only visible on non-connected ends */}
      {!connectedLeft && (
        <>
          <rect x="2" y="26" width="3" height="4" fill={COLORS.wood.dark} />
        </>
      )}
      {!connectedRight && (
        <>
          <rect x="27" y="26" width="3" height="4" fill={COLORS.wood.dark} />
        </>
      )}
    </svg>
  );
};

// Sofa - distinctive with cushion segments, armrest curves
export const SofaIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const left = connectedLeft ? 0 : 2;
  const right = connectedRight ? 32 : 30;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Sofa base/frame */}
      <rect x={left} y="22" width={width} height="8" fill={COLORS.wood.front} />
      <rect x={left} y="22" width={width} height="2" fill={COLORS.wood.top} />
      
      {/* Back cushion - only if not connected top */}
      {!connectedTop && (
        <>
          <rect x={left} y="2" width={width} height="10" fill={COLORS.sofa.main} />
          <rect x={left} y="2" width={width} height="2" fill={COLORS.sofa.light} />
          {/* Back cushion tufting */}
          <rect x={left + 4} y="5" width="1" height="5" fill={COLORS.sofa.dark} opacity="0.3" />
          <rect x={left + Math.floor(width/2)} y="5" width="1" height="5" fill={COLORS.sofa.dark} opacity="0.3" />
          <rect x={right - 5} y="5" width="1" height="5" fill={COLORS.sofa.dark} opacity="0.3" />
        </>
      )}
      
      {/* Seat cushions with visible segments */}
      <rect x={left} y={connectedTop ? 0 : 12} width={width} height={10} fill={COLORS.sofa.cushion} />
      <rect x={left} y={connectedTop ? 0 : 12} width={width} height="2" fill={COLORS.sofa.light} />
      
      {/* Seat cushion dividers */}
      {width > 15 && (
        <>
          <rect x={left + Math.floor(width/2) - 1} y={connectedTop ? 2 : 14} width="1" height="6" fill={COLORS.sofa.dark} opacity="0.4" />
        </>
      )}
      
      {/* Left armrest - curved top */}
      {!connectedLeft && (
        <>
          <rect x="2" y="4" width="6" height="18" fill={COLORS.sofa.dark} />
          <rect x="2" y="4" width="6" height="2" fill={COLORS.sofa.main} />
          <ellipse cx="5" cy="4" rx="3" ry="2" fill={COLORS.sofa.light} />
        </>
      )}
      
      {/* Right armrest - curved top */}
      {!connectedRight && (
        <>
          <rect x="24" y="4" width="6" height="18" fill={COLORS.sofa.dark} />
          <rect x="24" y="4" width="6" height="2" fill={COLORS.sofa.main} />
          <ellipse cx="27" cy="4" rx="3" ry="2" fill={COLORS.sofa.light} />
        </>
      )}
      
      {/* Feet */}
      {!connectedLeft && <rect x="3" y="28" width="3" height="2" fill={COLORS.wood.dark} />}
      {!connectedRight && <rect x="26" y="28" width="3" height="2" fill={COLORS.wood.dark} />}
    </svg>
  );
};

// Table - visible wood grain, tapered legs
export const TableIcon = ({ 
  className, 
  connectedTop = false, 
  connectedBottom = false, 
  connectedLeft = false, 
  connectedRight = false 
}: ConnectableAssetProps) => {
  const left = connectedLeft ? 0 : 2;
  const right = connectedRight ? 32 : 30;
  const top = connectedTop ? 0 : 4;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Tabletop with wood grain */}
      <rect x={left} y={top} width={width} height="8" fill={COLORS.wood.front} />
      <rect x={left} y={top} width={width} height="2" fill={COLORS.wood.highlight} />
      {/* Wood grain lines */}
      <line x1={left + 4} y1={top + 2} x2={left + 4} y2={top + 6} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
      <line x1={left + 12} y1={top + 2} x2={left + 12} y2={top + 6} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
      <line x1={right - 8} y1={top + 2} x2={right - 8} y2={top + 6} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
      
      {/* Apron */}
      <rect x={left} y={top + 6} width={width} height="4" fill={COLORS.wood.side} />
      <rect x={left + 2} y={top + 7} width={width - 4} height="2" fill={COLORS.wood.front} opacity="0.5" />
      
      {/* Tapered legs */}
      {!connectedLeft && (
        <>
          <polygon points="4,14 8,14 7,30 5,30" fill={COLORS.wood.dark} />
          <rect x="4" y="14" width="4" height="2" fill={COLORS.wood.side} />
        </>
      )}
      {!connectedRight && (
        <>
          <polygon points="24,14 28,14 27,30 25,30" fill={COLORS.wood.dark} />
          <rect x="24" y="14" width="4" height="2" fill={COLORS.wood.side} />
        </>
      )}
    </svg>
  );
};

// Desk - distinctive with drawers, handles, and modesty panel
export const DeskIcon = ({
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  const left = connectedLeft ? 0 : 2;
  const right = connectedRight ? 32 : 30;
  const top = connectedTop ? 0 : 4;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Desktop surface */}
      <rect x={left} y={top} width={width} height="6" fill={COLORS.wood.front} />
      <rect x={left} y={top} width={width} height="2" fill={COLORS.wood.highlight} />
      
      {/* Drawer pedestal on right */}
      <rect x={right - 12} y={top + 6} width="12" height={connectedBottom ? 32 - top - 6 : 24} fill={COLORS.wood.front} />
      <rect x={right - 12} y={top + 6} width="12" height="2" fill={COLORS.wood.side} />
      
      {/* Top drawer */}
      <rect x={right - 11} y={top + 8} width="10" height="8" fill={COLORS.wood.top} />
      <rect x={right - 7} y={top + 11} width="4" height="2" fill={COLORS.metal.handle} />
      
      {/* Bottom drawer */}
      <rect x={right - 11} y={top + 18} width="10" height="10" fill={COLORS.wood.top} />
      <rect x={right - 7} y={top + 22} width="4" height="2" fill={COLORS.metal.handle} />
      
      {/* Left leg */}
      {!connectedLeft && (
        <>
          <rect x="3" y={top + 6} width="4" height={connectedBottom ? 32 - top - 6 : 24} fill={COLORS.wood.dark} />
          <rect x="3" y={top + 6} width="4" height="2" fill={COLORS.wood.side} />
        </>
      )}
      
      {/* Modesty panel */}
      <rect x={left + (connectedLeft ? 0 : 6)} y={top + 8} width={width - (connectedLeft ? 0 : 6) - 14} height="2" fill={COLORS.wood.side} opacity="0.6" />
    </svg>
  );
};

// Stove - burner rings, oven window, knobs
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  const left = connectedLeft ? 0 : 2;
  const right = connectedRight ? 32 : 30;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Stove body */}
      <rect x={left} y="4" width={width} height="26" fill={COLORS.appliance.steel} />
      <rect x={left} y="4" width={width} height="2" fill={COLORS.appliance.white} />
      
      {/* Cooktop surface */}
      <rect x={left + 2} y="6" width={width - 4} height="10" fill={COLORS.metal.dark} />
      
      {/* Burner rings - distinctive spiral pattern */}
      <circle cx={left + 8} cy="11" r="4" fill="none" stroke={COLORS.metal.front} strokeWidth="1" />
      <circle cx={left + 8} cy="11" r="2.5" fill="none" stroke={COLORS.metal.front} strokeWidth="0.8" />
      <circle cx={left + 8} cy="11" r="1" fill={COLORS.metal.side} />
      
      <circle cx={right - 8} cy="11" r="4" fill="none" stroke={COLORS.metal.front} strokeWidth="1" />
      <circle cx={right - 8} cy="11" r="2.5" fill="none" stroke={COLORS.metal.front} strokeWidth="0.8" />
      <circle cx={right - 8} cy="11" r="1" fill={COLORS.metal.side} />
      
      {/* Control knobs */}
      <circle cx={left + 5} cy="18" r="2" fill={COLORS.metal.handle} />
      <circle cx={right - 5} cy="18" r="2" fill={COLORS.metal.handle} />
      <rect x={left + 4} y="17" width="2" height="1" fill={COLORS.metal.light} />
      <rect x={right - 6} y="17" width="2" height="1" fill={COLORS.metal.light} />
      
      {/* Oven door */}
      <rect x={left + 2} y="20" width={width - 4} height="10" fill={COLORS.appliance.steelDark} />
      <rect x={left + 4} y="22" width={width - 8} height="6" fill={COLORS.screen.display} />
      {/* Oven handle */}
      <rect x={left + 6} y="20" width={width - 12} height="2" fill={COLORS.metal.front} />
    </svg>
  );
};

// Sink - faucet detail, basin depth, cabinet doors
export const SinkIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  const left = connectedLeft ? 0 : 2;
  const right = connectedRight ? 32 : 30;
  const width = right - left;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Counter body */}
      <rect x={left} y="4" width={width} height="26" fill={COLORS.appliance.cream} />
      <rect x={left} y="4" width={width} height="2" fill={COLORS.appliance.white} />
      
      {/* Basin - recessed with depth indication */}
      <rect x={left + 4} y="8" width={width - 8} height="10" fill={COLORS.water.top} />
      <rect x={left + 5} y="9" width={width - 10} height="8" fill={COLORS.water.front} />
      <rect x={left + 6} y="10" width={width - 12} height="6" fill={COLORS.water.dark} />
      
      {/* Drain */}
      <circle cx={left + width/2} cy="13" r="2" fill={COLORS.metal.handle} />
      <circle cx={left + width/2} cy="13" r="1" fill={COLORS.metal.dark} />
      
      {/* Faucet - detailed curved spout */}
      <rect x={left + width/2 - 1} y="4" width="4" height="4" fill={COLORS.metal.front} />
      <rect x={left + width/2 - 2} y="4" width="6" height="2" fill={COLORS.metal.light} />
      <path d={`M${left + width/2 + 1} 6 Q${left + width/2 + 3} 6 ${left + width/2 + 3} 9`} stroke={COLORS.metal.front} strokeWidth="2" fill="none" />
      
      {/* Handles */}
      <circle cx={left + width/2 - 4} cy="6" r="2" fill={COLORS.metal.side} />
      <circle cx={left + width/2 + 6} cy="6" r="2" fill={COLORS.metal.side} />
      
      {/* Cabinet doors */}
      <rect x={left + 2} y="20" width={width/2 - 3} height="10" fill={COLORS.appliance.white} />
      <rect x={left + width/2 + 1} y="20" width={width/2 - 3} height="10" fill={COLORS.appliance.white} />
      {/* Door handles */}
      <rect x={left + width/2 - 3} y="24" width="2" height="3" fill={COLORS.metal.handle} />
      <rect x={left + width/2 + 1} y="24" width="2" height="3" fill={COLORS.metal.handle} />
    </svg>
  );
};

// ==================== SINGLE ASSETS ====================

// Armchair - rounded cushions, fabric texture
export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Base frame */}
    <rect x="4" y="24" width="24" height="6" fill={COLORS.wood.front} />
    <rect x="4" y="24" width="24" height="2" fill={COLORS.wood.top} />
    
    {/* Back cushion - rounded */}
    <rect x="6" y="4" width="20" height="10" rx="2" fill={COLORS.armchair.main} />
    <rect x="6" y="4" width="20" height="2" fill={COLORS.armchair.light} />
    
    {/* Seat cushion */}
    <rect x="6" y="14" width="20" height="10" rx="1" fill={COLORS.armchair.main} />
    <rect x="6" y="14" width="20" height="2" fill={COLORS.armchair.light} />
    
    {/* Left arm - curved */}
    <rect x="2" y="6" width="6" height="18" fill={COLORS.armchair.dark} />
    <ellipse cx="5" cy="6" rx="3" ry="2" fill={COLORS.armchair.light} />
    <rect x="2" y="6" width="6" height="2" fill={COLORS.armchair.main} />
    
    {/* Right arm - curved */}
    <rect x="24" y="6" width="6" height="18" fill={COLORS.armchair.dark} />
    <ellipse cx="27" cy="6" rx="3" ry="2" fill={COLORS.armchair.light} />
    <rect x="24" y="6" width="6" height="2" fill={COLORS.armchair.main} />
    
    {/* Feet */}
    <rect x="5" y="28" width="4" height="2" fill={COLORS.wood.dark} />
    <rect x="23" y="28" width="4" height="2" fill={COLORS.wood.dark} />
  </svg>
);

// Chair - wooden with backrest slats
export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Backrest frame */}
    <rect x="6" y="2" width="20" height="12" fill={COLORS.wood.front} />
    <rect x="6" y="2" width="20" height="2" fill={COLORS.wood.highlight} />
    
    {/* Backrest slats */}
    <rect x="8" y="4" width="4" height="8" fill={COLORS.wood.top} />
    <rect x="14" y="4" width="4" height="8" fill={COLORS.wood.top} />
    <rect x="20" y="4" width="4" height="8" fill={COLORS.wood.top} />
    
    {/* Seat */}
    <rect x="4" y="14" width="24" height="6" fill={COLORS.wood.front} />
    <rect x="4" y="14" width="24" height="2" fill={COLORS.wood.highlight} />
    
    {/* Legs - tapered */}
    <polygon points="6,20 10,20 9,30 7,30" fill={COLORS.wood.dark} />
    <polygon points="22,20 26,20 25,30 23,30" fill={COLORS.wood.dark} />
    
    {/* Cross support */}
    <rect x="8" y="24" width="16" height="2" fill={COLORS.wood.side} />
  </svg>
);

// Fridge - distinctive two-door design with handles
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Body */}
    <rect x="4" y="2" width="24" height="28" fill={COLORS.appliance.white} />
    <rect x="4" y="2" width="24" height="2" fill={COLORS.metal.light} />
    
    {/* Freezer door */}
    <rect x="5" y="3" width="22" height="8" fill={COLORS.appliance.white} />
    <rect x="5" y="3" width="22" height="1" fill={COLORS.metal.top} />
    {/* Freezer handle */}
    <rect x="24" y="5" width="2" height="4" fill={COLORS.metal.handle} />
    
    {/* Door gap */}
    <rect x="5" y="11" width="22" height="2" fill={COLORS.metal.side} />
    
    {/* Fridge door */}
    <rect x="5" y="13" width="22" height="16" fill={COLORS.appliance.white} />
    <rect x="5" y="13" width="22" height="1" fill={COLORS.metal.top} />
    {/* Fridge handle */}
    <rect x="24" y="16" width="2" height="8" fill={COLORS.metal.handle} />
    
    {/* Dispenser (optional detail) */}
    <rect x="8" y="17" width="8" height="6" fill={COLORS.metal.top} />
    <rect x="10" y="19" width="4" height="2" fill={COLORS.metal.side} />
  </svg>
);

// TV - modern flat screen with stand
export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Screen frame */}
    <rect x="2" y="4" width="28" height="18" fill={COLORS.screen.frame} />
    <rect x="2" y="4" width="28" height="2" fill={COLORS.metal.side} />
    
    {/* Screen display */}
    <rect x="4" y="6" width="24" height="14" fill={COLORS.screen.display} />
    {/* Screen reflection */}
    <rect x="5" y="7" width="10" height="4" fill={COLORS.screen.glow} opacity="0.3" />
    
    {/* Stand neck */}
    <rect x="13" y="22" width="6" height="4" fill={COLORS.metal.dark} />
    
    {/* Stand base */}
    <rect x="8" y="26" width="16" height="4" fill={COLORS.metal.front} />
    <rect x="8" y="26" width="16" height="2" fill={COLORS.metal.top} />
  </svg>
);

// Bookshelf - visible book spines with colors
export const BookshelfIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Frame */}
    <rect x="2" y="2" width="28" height="28" fill={COLORS.wood.front} />
    <rect x="2" y="2" width="28" height="2" fill={COLORS.wood.highlight} />
    
    {/* Shelves */}
    <rect x="4" y="10" width="24" height="2" fill={COLORS.wood.dark} />
    <rect x="4" y="20" width="24" height="2" fill={COLORS.wood.dark} />
    
    {/* Books row 1 - varied heights and colors */}
    <rect x="5" y="4" width="3" height="6" fill="#C86868" />
    <rect x="8" y="5" width="4" height="5" fill="#6888B8" />
    <rect x="12" y="4" width="3" height="6" fill="#68B888" />
    <rect x="15" y="5" width="5" height="5" fill="#B8A868" />
    <rect x="20" y="4" width="3" height="6" fill="#8868B8" />
    <rect x="23" y="5" width="4" height="5" fill="#B86888" />
    
    {/* Books row 2 */}
    <rect x="5" y="12" width="4" height="8" fill="#6B8B9B" />
    <rect x="9" y="13" width="3" height="7" fill="#9B6B6B" />
    <rect x="12" y="12" width="5" height="8" fill="#6B9B6B" />
    <rect x="17" y="13" width="4" height="7" fill="#9B9B6B" />
    <rect x="21" y="12" width="5" height="8" fill="#6B6B9B" />
    
    {/* Books row 3 */}
    <rect x="5" y="22" width="5" height="6" fill="#8B6B8B" />
    <rect x="10" y="23" width="4" height="5" fill="#6B8B8B" />
    <rect x="14" y="22" width="3" height="6" fill="#8B8B6B" />
    <rect x="17" y="23" width="5" height="5" fill="#6B6B8B" />
    <rect x="22" y="22" width="5" height="6" fill="#8B6B6B" />
  </svg>
);

// Plant - detailed leaves and decorative pot
export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Leaves - multiple distinct shapes */}
    <ellipse cx="16" cy="8" rx="4" ry="8" fill={COLORS.plant.leaf} />
    <ellipse cx="10" cy="10" rx="3" ry="6" fill={COLORS.plant.leaf} transform="rotate(-20 10 10)" />
    <ellipse cx="22" cy="10" rx="3" ry="6" fill={COLORS.plant.leaf} transform="rotate(20 22 10)" />
    <ellipse cx="8" cy="14" rx="2" ry="5" fill={COLORS.plant.leafDark} transform="rotate(-30 8 14)" />
    <ellipse cx="24" cy="14" rx="2" ry="5" fill={COLORS.plant.leafDark} transform="rotate(30 24 14)" />
    
    {/* Center highlights */}
    <ellipse cx="15" cy="6" rx="1" ry="3" fill={COLORS.plant.leafLight} opacity="0.5" />
    <ellipse cx="17" cy="5" rx="1" ry="2" fill={COLORS.plant.leafLight} opacity="0.5" />
    
    {/* Pot rim */}
    <ellipse cx="16" cy="18" rx="8" ry="2" fill={COLORS.plant.potDark} />
    
    {/* Pot body - tapered */}
    <path d="M8 18 L10 28 L22 28 L24 18 Z" fill={COLORS.plant.pot} />
    <path d="M9 20 L10 26 L14 26 L13 20 Z" fill={COLORS.plant.potDark} opacity="0.3" />
    
    {/* Pot base */}
    <ellipse cx="16" cy="28" rx="6" ry="1.5" fill={COLORS.plant.potDark} />
  </svg>
);

// Toilet - recognizable porcelain shape
export const ToiletIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Tank */}
    <rect x="8" y="2" width="16" height="8" rx="1" fill={COLORS.appliance.white} />
    <rect x="8" y="2" width="16" height="2" fill={COLORS.metal.light} />
    {/* Flush button */}
    <rect x="14" y="4" width="4" height="2" fill={COLORS.metal.side} />
    
    {/* Lid */}
    <ellipse cx="16" cy="12" rx="10" ry="3" fill={COLORS.appliance.white} />
    <ellipse cx="16" cy="12" rx="10" ry="2" fill={COLORS.metal.light} />
    
    {/* Bowl */}
    <ellipse cx="16" cy="20" rx="10" ry="8" fill={COLORS.appliance.white} />
    <ellipse cx="16" cy="18" rx="7" ry="5" fill={COLORS.water.top} />
    <ellipse cx="16" cy="17" rx="5" ry="3" fill={COLORS.water.front} />
    
    {/* Base */}
    <ellipse cx="16" cy="28" rx="8" ry="2" fill={COLORS.metal.top} />
  </svg>
);

// Shower - glass enclosure with showerhead
export const ShowerIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Glass enclosure */}
    <rect x="2" y="2" width="28" height="28" fill={COLORS.water.light} opacity="0.3" />
    <rect x="2" y="2" width="28" height="28" fill="none" stroke={COLORS.metal.front} strokeWidth="2" />
    
    {/* Shower arm */}
    <rect x="22" y="2" width="4" height="8" fill={COLORS.metal.front} />
    <rect x="22" y="2" width="4" height="2" fill={COLORS.metal.light} />
    
    {/* Shower head */}
    <ellipse cx="18" cy="8" rx="6" ry="3" fill={COLORS.metal.top} />
    <ellipse cx="18" cy="8" rx="5" ry="2" fill={COLORS.metal.front} />
    
    {/* Water droplets */}
    <rect x="12" y="14" width="2" height="3" rx="1" fill={COLORS.water.front} />
    <rect x="16" y="16" width="2" height="4" rx="1" fill={COLORS.water.front} />
    <rect x="20" y="14" width="2" height="3" rx="1" fill={COLORS.water.front} />
    <rect x="14" y="20" width="2" height="3" rx="1" fill={COLORS.water.front} />
    <rect x="18" y="22" width="2" height="3" rx="1" fill={COLORS.water.front} />
    
    {/* Floor drain */}
    <ellipse cx="16" cy="27" rx="4" ry="2" fill={COLORS.metal.dark} />
    <ellipse cx="16" cy="27" rx="2" ry="1" fill={COLORS.metal.handle} />
  </svg>
);

// Rug - visible pattern and fringe
export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Base */}
    <rect x="2" y="6" width="28" height="20" fill={COLORS.rug.main} />
    <rect x="2" y="6" width="28" height="2" fill={COLORS.rug.light} />
    
    {/* Border pattern */}
    <rect x="4" y="8" width="24" height="16" fill={COLORS.rug.dark} />
    <rect x="6" y="10" width="20" height="12" fill={COLORS.rug.main} />
    
    {/* Center pattern - diamond */}
    <polygon points="16,12 22,16 16,20 10,16" fill={COLORS.rug.pattern} />
    <polygon points="16,13 20,16 16,19 12,16" fill={COLORS.rug.light} opacity="0.5" />
    
    {/* Corner accents */}
    <rect x="7" y="11" width="2" height="2" fill={COLORS.rug.pattern} />
    <rect x="23" y="11" width="2" height="2" fill={COLORS.rug.pattern} />
    <rect x="7" y="19" width="2" height="2" fill={COLORS.rug.pattern} />
    <rect x="23" y="19" width="2" height="2" fill={COLORS.rug.pattern} />
    
    {/* Fringe */}
    <rect x="3" y="4" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="7" y="4" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="11" y="4" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="15" y="4" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="19" y="4" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="23" y="4" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="27" y="4" width="2" height="2" fill={COLORS.rug.light} />
    
    <rect x="3" y="26" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="7" y="26" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="11" y="26" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="15" y="26" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="19" y="26" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="23" y="26" width="2" height="2" fill={COLORS.rug.light} />
    <rect x="27" y="26" width="2" height="2" fill={COLORS.rug.light} />
  </svg>
);

// Window - detailed glass panes with light reflection
export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Frame */}
    <rect x="4" y="2" width="24" height="28" fill={COLORS.wood.front} />
    <rect x="4" y="2" width="24" height="2" fill={COLORS.wood.highlight} />
    
    {/* Glass panes */}
    <rect x="6" y="4" width="8" height="11" fill={COLORS.water.light} />
    <rect x="18" y="4" width="8" height="11" fill={COLORS.water.light} />
    <rect x="6" y="17" width="8" height="11" fill={COLORS.water.top} />
    <rect x="18" y="17" width="8" height="11" fill={COLORS.water.top} />
    
    {/* Light reflections */}
    <rect x="7" y="5" width="3" height="4" fill={COLORS.metal.white} opacity="0.4" />
    <rect x="19" y="5" width="3" height="4" fill={COLORS.metal.white} opacity="0.4" />
    
    {/* Crossbars */}
    <rect x="14" y="2" width="4" height="28" fill={COLORS.wood.dark} />
    <rect x="4" y="14" width="24" height="4" fill={COLORS.wood.dark} />
  </svg>
);

// Laptop - modern slim design
export const LaptopIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Screen */}
    <rect x="4" y="4" width="24" height="16" fill={COLORS.screen.frame} />
    <rect x="5" y="5" width="22" height="14" fill={COLORS.screen.display} />
    {/* Screen content */}
    <rect x="7" y="7" width="8" height="4" fill={COLORS.screen.glow} opacity="0.5" />
    <rect x="7" y="12" width="18" height="1" fill={COLORS.screen.glow} opacity="0.3" />
    <rect x="7" y="14" width="14" height="1" fill={COLORS.screen.glow} opacity="0.3" />
    
    {/* Base */}
    <rect x="2" y="20" width="28" height="8" fill={COLORS.metal.front} />
    <rect x="2" y="20" width="28" height="2" fill={COLORS.metal.top} />
    
    {/* Keyboard area */}
    <rect x="6" y="22" width="20" height="4" fill={COLORS.metal.dark} />
    
    {/* Trackpad */}
    <rect x="12" y="25" width="8" height="2" fill={COLORS.metal.side} />
  </svg>
);

// Rock - natural stone shape
export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Shadow */}
    <ellipse cx="16" cy="27" rx="10" ry="3" fill={COLORS.metal.dark} opacity="0.3" />
    
    {/* Rock body - irregular shape */}
    <path d="M6 20 Q4 24 8 28 L24 28 Q28 24 26 20 L22 10 Q20 6 16 6 Q12 6 10 10 Z" fill={COLORS.metal.front} />
    
    {/* Facets */}
    <path d="M8 14 Q6 18 8 22 L14 22 Q12 18 14 14 Z" fill={COLORS.metal.top} opacity="0.5" />
    <path d="M18 8 L22 14 L20 20 L16 16 Z" fill={COLORS.metal.side} opacity="0.4" />
    
    {/* Highlights */}
    <ellipse cx="12" cy="12" rx="2" ry="1" fill={COLORS.metal.light} opacity="0.4" />
  </svg>
);

// Debris - scattered wooden planks
export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    <rect x="4" y="18" width="12" height="3" fill={COLORS.wood.top} transform="rotate(-15 10 20)" />
    <rect x="14" y="14" width="10" height="3" fill={COLORS.wood.front} transform="rotate(20 19 16)" />
    <rect x="8" y="22" width="8" height="3" fill={COLORS.wood.top} transform="rotate(8 12 24)" />
    <rect x="18" y="20" width="6" height="3" fill={COLORS.wood.front} transform="rotate(-12 21 22)" />
    <rect x="6" y="12" width="6" height="2" fill={COLORS.wood.side} transform="rotate(-5 9 13)" />
  </svg>
);

// Door - detailed wooden door with panels
export const DoorIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 32 32" className={className}>
    {/* Frame */}
    <rect x="6" y="2" width="20" height="28" fill={COLORS.wood.front} />
    <rect x="6" y="2" width="20" height="2" fill={COLORS.wood.highlight} />
    
    {/* Door panels */}
    <rect x="8" y="4" width="16" height="24" fill={COLORS.wood.top} />
    
    {/* Upper panel */}
    <rect x="10" y="6" width="12" height="8" fill={COLORS.wood.front} />
    <rect x="10" y="6" width="12" height="1" fill={COLORS.wood.side} />
    
    {/* Lower panel */}
    <rect x="10" y="16" width="12" height="10" fill={COLORS.wood.front} />
    <rect x="10" y="16" width="12" height="1" fill={COLORS.wood.side} />
    
    {/* Handle */}
    <circle cx="20" cy="16" r="2" fill={COLORS.metal.front} />
    <circle cx="20" cy="16" r="1" fill={COLORS.metal.dark} />
  </svg>
);

// Empty - no visual
export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// Asset map
export const AssetIconMap: Record<string, ComponentType<AssetIconProps>> = {
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
  shower: ShowerIcon,
  sink: SinkIcon,
  desk: DeskIcon,
  laptop: LaptopIcon,
  computer: LaptopIcon,
  rock: RockIcon,
  debris: DebrisIcon,
  door: DoorIcon,
  empty: EmptyIcon,
};
