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
 
 // Isometric 75-degree color palette - 4 tone shading system
// Updated to 85 degrees = almost top-down with subtle depth
 const COLORS = {
   wood: {
    top: '#E8C878',
     front: '#B89870',
     side: '#8C6C48',
     shadow: '#604428',
     grain: '#A88050',
   },
   bed: {
     frame: '#8B6040',
     frameTop: '#A87850',
     mattress: '#F5F0E8',
     mattressShade: '#E8E0D0',
     sheet: '#E0E8F0',
     sheetFold: '#C8D8E8',
    pillow: '#F5E8D0',
    pillowShade: '#E8DCC0',
    blanket: '#8B9B68',
    blanketLight: '#A0B080',
   },
   sofa: {
     top: '#B89868',
     front: '#987848',
     side: '#785828',
     cushion: '#D4B48C',
     cushionTop: '#E8D0B0',
     arm: '#A88858',
   },
   armchair: {
     top: '#709060',
     front: '#507840',
     side: '#386028',
     cushion: '#88A878',
   },
   metal: {
     top: '#F8F8F8',
     front: '#D8D8D8',
     side: '#B0B0B0',
     shadow: '#808080',
     handle: '#505050',
     chrome: '#E8E8E8',
   },
   appliance: {
     top: '#FFFFFF',
     front: '#F0F0F0',
     side: '#D0D0D0',
     shadow: '#B0B0B0',
   },
   water: {
     top: '#D0F0FF',
     front: '#A0D8F0',
     side: '#70B8D8',
   },
   plant: {
     leafTop: '#90D898',
     leafFront: '#68B878',
     leafSide: '#489858',
    pot: '#78B8A8',
    potSide: '#5A9A8A',
   },
   rug: {
     top: '#D88080',
     front: '#B86060',
     pattern: '#F0C868',
   },
   screen: {
     frame: '#303030',
     display: '#1A2A3A',
     glow: '#405060',
   },
  chair: {
    seat: '#E8DCC8',
    back: '#C8B898',
    legs: '#604428',
  },
 };
 
 // Outline color for visual clarity (subtle dark brown)
 const OUTLINE = '#5D4E37';
 const OUTLINE_WIDTH = 0.8;
 
 // ==================== CONNECTABLE ASSETS (ISOMETRIC 75°) ====================
 
// Bed - isometric 75° with BOTH horizontal and vertical connection support
// Bed - 85° isometric perspective with frontal base (like sofa)
export const BedIcon = ({ 
  className,
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableAssetProps) => {
  // Detect orientation: horizontal vs vertical vs single
  const isHorizontal = connectedLeft || connectedRight;
  const isVertical = connectedTop || connectedBottom;
  
  // Constants for consistent 85° perspective (matching sofa)
  const PAD = 4;        // Visual padding from cell edges
  const TOP = 5;        // Top edge of bed content
  const BOTTOM = 26;    // Bottom edge before base
  const BASE_H = 4;     // Height of frontal base (depth indicator)
  const TOP_STRIP = 1.5; // Highlight strip height
  
  // ==================== HORIZONTAL BED ====================
  if (isHorizontal && !isVertical) {
    const isLeftEnd = !connectedLeft && connectedRight;
    const isRightEnd = connectedLeft && !connectedRight;
    
    if (isLeftEnd) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Headboard (vertical, at left) - with depth */}
          <rect x={PAD} y={TOP} width="5" height={BOTTOM - TOP + BASE_H} fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y={TOP} width="5" height={TOP_STRIP} fill={COLORS.wood.top} />
          {/* Wood slats on headboard */}
          <rect x={PAD + 1} y={TOP + 3} width="3" height="6" fill={COLORS.wood.side} rx="0.5" />
          <rect x={PAD + 1} y={TOP + 12} width="3" height="6" fill={COLORS.wood.side} rx="0.5" />
          
          {/* Mattress area */}
          <rect x={PAD + 5} y={TOP} width={32 - PAD - 5} height={BOTTOM - TOP} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD + 5} y={TOP} width={32 - PAD - 5} height={TOP_STRIP} fill="#F8F4EC" />
          
          {/* Sheet (pillow area) */}
          <rect x={PAD + 6} y={TOP + 2} width="10" height={BOTTOM - TOP - 4} fill={COLORS.bed.sheet} />
          
          {/* Blanket (continues to next cell) */}
          <rect x={PAD + 16} y={TOP + 2} width={32 - PAD - 16} height={BOTTOM - TOP - 4} fill={COLORS.bed.blanket} />
          <rect x={PAD + 16} y={TOP + 2} width="2" height={BOTTOM - TOP - 4} fill={COLORS.bed.blanketLight} />
          
          {/* Large single pillow (rounded rect with top highlight) */}
          <rect x={PAD + 7} y={TOP + 4} width="8" height={BOTTOM - TOP - 8} rx="2" fill={COLORS.bed.pillow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
          <rect x={PAD + 7} y={TOP + 4} width="8" height={TOP_STRIP} rx="2" fill={COLORS.bed.pillowShade} />
          
          {/* FRONTAL BASE - 85° depth indicator (like sofa) */}
          <rect x={PAD} y={BOTTOM} width={32 - PAD} height={BASE_H} fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y={BOTTOM} width={32 - PAD} height={TOP_STRIP} fill={COLORS.bed.frameTop} />
        </svg>
      );
    }
    
    if (isRightEnd) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Footboard (vertical, at right) - with depth */}
          <rect x={32 - PAD - 3} y={TOP} width="3" height={BOTTOM - TOP + BASE_H} fill={COLORS.wood.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={32 - PAD - 3} y={TOP} width="3" height={TOP_STRIP} fill={COLORS.wood.front} />
          
          {/* Mattress area */}
          <rect x="0" y={TOP} width={32 - PAD - 3} height={BOTTOM - TOP} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="0" y={TOP} width={32 - PAD - 3} height={TOP_STRIP} fill="#F8F4EC" />
          
          {/* Blanket (continuation from left cell) */}
          <rect x="1" y={TOP + 2} width={32 - PAD - 5} height={BOTTOM - TOP - 4} fill={COLORS.bed.blanket} />
          <rect x="1" y={TOP + 2} width={32 - PAD - 5} height="2" fill={COLORS.bed.blanketLight} />
          
          {/* Blanket fold lines for texture */}
          <line x1="8" y1={TOP + 6} x2="8" y2={BOTTOM - 4} stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
          <line x1="16" y1={TOP + 6} x2="16" y2={BOTTOM - 4} stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.25" />
          
          {/* FRONTAL BASE - 85° depth indicator (like sofa) */}
          <rect x="0" y={BOTTOM} width={32 - PAD} height={BASE_H} fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="0" y={BOTTOM} width={32 - PAD} height={TOP_STRIP} fill={COLORS.bed.frameTop} />
        </svg>
      );
    }
    
    // Middle segment (horizontal)
    return (
      <svg viewBox="0 0 32 32" className={className}>
        {/* Mattress area */}
        <rect x="0" y={TOP} width="32" height={BOTTOM - TOP} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="0" y={TOP} width="32" height={TOP_STRIP} fill="#F8F4EC" />
        
        {/* Blanket (continuous) */}
        <rect x="1" y={TOP + 2} width="30" height={BOTTOM - TOP - 4} fill={COLORS.bed.blanket} />
        <rect x="1" y={TOP + 2} width="30" height="2" fill={COLORS.bed.blanketLight} />
        
        {/* Fold lines */}
        <line x1="10" y1={TOP + 6} x2="10" y2={BOTTOM - 4} stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
        <line x1="22" y1={TOP + 6} x2="22" y2={BOTTOM - 4} stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
        
        {/* FRONTAL BASE - 85° depth indicator */}
        <rect x="0" y={BOTTOM} width="32" height={BASE_H} fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="0" y={BOTTOM} width="32" height={TOP_STRIP} fill={COLORS.bed.frameTop} />
      </svg>
    );
  }
  
  // ==================== VERTICAL BED ====================
  if (isVertical && !isHorizontal) {
    const isHeadSegment = !connectedTop && connectedBottom;
    const isFootSegment = connectedTop && !connectedBottom;
    
    if (isHeadSegment) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Headboard (horizontal, at top) - with depth */}
          <rect x={PAD} y={PAD} width={32 - PAD * 2} height="5" fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y={PAD} width={32 - PAD * 2} height={TOP_STRIP} fill={COLORS.wood.top} />
          {/* Wood slats */}
          <rect x={PAD + 3} y={PAD + 1} width="6" height="2" fill={COLORS.wood.side} rx="0.5" />
          <rect x={32 - PAD - 9} y={PAD + 1} width="6" height="2" fill={COLORS.wood.side} rx="0.5" />
          
          {/* Mattress area */}
          <rect x={PAD} y={PAD + 5} width={32 - PAD * 2} height={32 - PAD - 5} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y={PAD + 5} width={32 - PAD * 2} height={TOP_STRIP} fill="#F8F4EC" />
          
          {/* Sheet area */}
          <rect x={PAD + 1} y={PAD + 7} width={32 - PAD * 2 - 2} height="8" fill={COLORS.bed.sheet} />
          
          {/* Pillows (rounded rects with top highlight, not ellipses) */}
          <rect x={PAD + 2} y={PAD + 8} width="9" height="5" rx="1.5" fill={COLORS.bed.pillow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
          <rect x={PAD + 2} y={PAD + 8} width="9" height={TOP_STRIP} rx="1.5" fill={COLORS.bed.pillowShade} />
          <rect x={32 - PAD - 11} y={PAD + 8} width="9" height="5" rx="1.5" fill={COLORS.bed.pillow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
          <rect x={32 - PAD - 11} y={PAD + 8} width="9" height={TOP_STRIP} rx="1.5" fill={COLORS.bed.pillowShade} />
          
          {/* Blanket (continues to next cell) */}
          <rect x={PAD + 1} y={PAD + 16} width={32 - PAD * 2 - 2} height={32 - PAD - 16} fill={COLORS.bed.blanket} />
          <rect x={PAD + 1} y={PAD + 16} width={32 - PAD * 2 - 2} height="2" fill={COLORS.bed.blanketLight} />
        </svg>
      );
    }
    
    if (isFootSegment) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Mattress area */}
          <rect x={PAD} y="0" width={32 - PAD * 2} height={BOTTOM - PAD} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y="0" width={32 - PAD * 2} height={TOP_STRIP} fill="#F8F4EC" />
          
          {/* Blanket (continuation from head cell) */}
          <rect x={PAD + 1} y="2" width={32 - PAD * 2 - 2} height={BOTTOM - PAD - 4} fill={COLORS.bed.blanket} />
          <rect x={PAD + 1} y="2" width={32 - PAD * 2 - 2} height="2" fill={COLORS.bed.blanketLight} />
          
          {/* Fold lines */}
          <line x1={PAD + 3} y1="8" x2={32 - PAD - 3} y2="8" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
          <line x1={PAD + 3} y1="14" x2={32 - PAD - 3} y2="14" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.25" />
          
          {/* Footboard - with depth */}
          <rect x={PAD} y={BOTTOM - PAD} width={32 - PAD * 2} height="4" fill={COLORS.wood.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y={BOTTOM - PAD} width={32 - PAD * 2} height={TOP_STRIP} fill={COLORS.wood.front} />
          
          {/* FRONTAL BASE - 85° depth indicator */}
          <rect x={PAD} y={BOTTOM} width={32 - PAD * 2} height={BASE_H} fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x={PAD} y={BOTTOM} width={32 - PAD * 2} height={TOP_STRIP} fill={COLORS.bed.frameTop} />
        </svg>
      );
    }
    
    // Middle segment (vertical)
    return (
      <svg viewBox="0 0 32 32" className={className}>
        {/* Mattress area */}
        <rect x={PAD} y="0" width={32 - PAD * 2} height={BOTTOM} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x={PAD} y="0" width={32 - PAD * 2} height={TOP_STRIP} fill="#F8F4EC" />
        
        {/* Blanket (continuous) */}
        <rect x={PAD + 1} y="2" width={32 - PAD * 2 - 2} height={BOTTOM - 4} fill={COLORS.bed.blanket} />
        <rect x={PAD + 1} y="2" width={32 - PAD * 2 - 2} height="2" fill={COLORS.bed.blanketLight} />
        
        {/* Fold lines */}
        <line x1={PAD + 3} y1="10" x2={32 - PAD - 3} y2="10" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
        <line x1={PAD + 3} y1="18" x2={32 - PAD - 3} y2="18" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
        
        {/* FRONTAL BASE - 85° depth indicator */}
        <rect x={PAD} y={BOTTOM} width={32 - PAD * 2} height={BASE_H} fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x={PAD} y={BOTTOM} width={32 - PAD * 2} height={TOP_STRIP} fill={COLORS.bed.frameTop} />
      </svg>
    );
  }
  
  // ==================== SINGLE BED ====================
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Headboard with 85° depth (at top) */}
      <rect x={PAD} y={PAD} width={32 - PAD * 2} height="4" fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={PAD} y={PAD} width={32 - PAD * 2} height={TOP_STRIP} fill={COLORS.wood.top} />
      {/* Wood slats on headboard */}
      <rect x={PAD + 3} y={PAD + 1} width="2" height="2" fill={COLORS.wood.side} rx="0.3" />
      <rect x="15" y={PAD + 1} width="2" height="2" fill={COLORS.wood.side} rx="0.3" />
      <rect x={32 - PAD - 5} y={PAD + 1} width="2" height="2" fill={COLORS.wood.side} rx="0.3" />
      
      {/* Mattress base */}
      <rect x={PAD} y={PAD + 4} width={32 - PAD * 2} height={BOTTOM - PAD - 4} fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={PAD} y={PAD + 4} width={32 - PAD * 2} height={TOP_STRIP} fill="#F8F4EC" />
      
      {/* Pillows (rounded rects with top highlight) */}
      <rect x={PAD + 2} y={PAD + 6} width="8" height="4" rx="1" fill={COLORS.bed.pillow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={PAD + 2} y={PAD + 6} width="8" height={TOP_STRIP} rx="1" fill={COLORS.bed.pillowShade} />
      <rect x={32 - PAD - 10} y={PAD + 6} width="8" height="4" rx="1" fill={COLORS.bed.pillow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={32 - PAD - 10} y={PAD + 6} width="8" height={TOP_STRIP} rx="1" fill={COLORS.bed.pillowShade} />
      
      {/* Blanket with 85° depth highlight */}
      <rect x={PAD + 1} y={PAD + 11} width={32 - PAD * 2 - 2} height={BOTTOM - PAD - 12} fill={COLORS.bed.blanket} />
      <rect x={PAD + 1} y={PAD + 11} width={32 - PAD * 2 - 2} height="2" fill={COLORS.bed.blanketLight} />
      <line x1={PAD + 3} y1={PAD + 15} x2={32 - PAD - 3} y2={PAD + 15} stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
      <line x1={PAD + 3} y1={PAD + 18} x2={32 - PAD - 3} y2={PAD + 18} stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
      
      {/* FRONTAL BASE - 85° depth indicator (like sofa) */}
      <rect x={PAD} y={BOTTOM} width={32 - PAD * 2} height={BASE_H} fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={PAD} y={BOTTOM} width={32 - PAD * 2} height={TOP_STRIP} fill={COLORS.bed.frameTop} />
    </svg>
  );
};
 
 // Sofa - isometric 75° with horizontal connection (left-right)
// Sofa - 85° isometric perspective with curved armrests
 export const SofaIcon = ({ 
   className,
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableAssetProps) => {
   // Padding for visual breathing room (~4px on ends)
   const padding = 4;
   const left = connectedLeft ? 0 : padding;
   const right = connectedRight ? 32 : 32 - padding;
   const top = 5; // top padding
   const bottom = 26; // bottom padding
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Base frame */}
       <rect x={left} y={bottom - 4} width={right - left} height="5" 
         fill={COLORS.sofa.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left} y={bottom - 5} width={right - left} height="1.5" fill={COLORS.sofa.top} />
       
      {/* Back cushion */}
      <rect 
       x={left + (connectedLeft ? 0 : 4)} 
        y={top} 
       width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)} 
        height="7" 
        fill={COLORS.sofa.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect 
       x={left + (connectedLeft ? 0 : 4)} 
        y={top} 
       width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)} 
        height="2" 
        fill={COLORS.sofa.top} />
      
      {/* Seat cushion */}
      <rect 
        x={left + (connectedLeft ? 0 : 4)} 
        y={top + 7} 
        width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)} 
        height="9" 
        fill={COLORS.sofa.cushion}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect 
        x={left + (connectedLeft ? 0 : 4)} 
        y={top + 7} 
        width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)} 
        height="2" 
        fill={COLORS.sofa.cushionTop} />
      
      {/* Cushion divider line */}
      <line x1="16" y1={top + 8} x2="16" y2={top + 15} stroke={COLORS.sofa.front} strokeWidth="0.8" opacity="0.5" />
      
      {/* Left armrest */}
      {!connectedLeft && (
        <>
         <rect x={padding} y={top + 2} width="4" height="14" 
            fill={COLORS.sofa.arm}
           stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
         {/* Curved top ellipse for 85° depth */}
         <ellipse cx={padding + 2} cy={top + 2} rx="2" ry="1" 
           fill={COLORS.sofa.top} />
        </>
      )}
      
      {/* Right armrest */}
      {!connectedRight && (
        <>
         <rect x={32 - padding - 4} y={top + 2} width="4" height="14" 
            fill={COLORS.sofa.arm}
           stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
         {/* Curved top ellipse for 85° depth */}
         <ellipse cx={32 - padding - 2} cy={top + 2} rx="2" ry="1" 
           fill={COLORS.sofa.top} />
        </>
      )}
       
       {/* Feet */}
       {!connectedLeft && <rect x={padding + 1} y={bottom} width="2.5" height="2" fill={COLORS.wood.shadow} rx="0.5" />}
       {!connectedRight && <rect x={32 - padding - 3.5} y={bottom} width="2.5" height="2" fill={COLORS.wood.shadow} rx="0.5" />}
     </svg>
   );
 };
 
// Table - 85° perspective
// Table - 85° isometric perspective with rectangular legs and depth
 export const TableIcon = ({ 
   className, 
   connectedTop = false, 
   connectedBottom = false, 
   connectedLeft = false, 
   connectedRight = false 
 }: ConnectableAssetProps) => {
   const padding = 4;
   const left = connectedLeft ? 0 : padding;
   const right = connectedRight ? 32 : 32 - padding;
  const topY = connectedTop ? 0 : 6;
  const bottomY = 27;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Left side depth (85°) - only when not connected */}
       {!connectedLeft && (
         <rect x={left} y={topY} width="1.5" height="5" fill={COLORS.wood.side} />
       )}
       
       {/* Tabletop with 85° depth - thinner (5px) */}
       <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="5" 
          fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="1.5" 
         fill={COLORS.wood.top} />
       
       {/* Apron - thinner (2px) */}
       <rect x={left + (connectedLeft ? 1 : 2.5)} y={topY + 5} width={right - left - (connectedLeft ? 2 : 5)} height="2" 
         fill={COLORS.wood.side} />
       
      {/* Legs - wider (4px) for better proportion */}
       {!connectedLeft && (
         <rect x={left + 2} y={topY + 7} width="4" height={bottomY - topY - 7} 
            fill={COLORS.wood.shadow} 
            stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       )}
       {!connectedRight && (
         <rect x={right - 6} y={topY + 7} width="4" height={bottomY - topY - 7} 
            fill={COLORS.wood.shadow} 
            stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       )}
     </svg>
   );
 };
 
// Desk - 85° perspective
// Desk - 85° isometric perspective with pedestal and depth
 export const DeskIcon = ({
   className,
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableAssetProps) => {
   const padding = 4;
   const left = connectedLeft ? 0 : padding;
   const right = connectedRight ? 32 : 32 - padding;
  const topY = connectedTop ? 0 : 6;
  const bottomY = 27;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Left side depth (85°) */}
       {!connectedLeft && (
         <rect x={left} y={topY} width="1.5" height="5" fill={COLORS.wood.side} />
       )}
       
       {/* Desktop surface with 85° depth - thinner */}
       <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="5" 
          fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left + (connectedLeft ? 0 : 1.5)} y={topY} width={right - left - (connectedLeft ? 0 : 1.5)} height="1.5" 
         fill={COLORS.wood.top} />
       
       {/* Drawer pedestal - narrower (9px) */}
       <rect x={right - 10} y={topY + 5} width="9" height={bottomY - topY - 5} 
         fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        {/* Left side of pedestal (85° depth) */}
       <rect x={right - 11} y={topY + 5} width="1.5" height={bottomY - topY - 5} 
          fill={COLORS.wood.side} />
       {/* Top drawer */}
       <rect x={right - 9} y={topY + 7} width="7" height="4" fill={COLORS.wood.top} />
       <rect x={right - 7} y={topY + 8.5} width="3" height="1" fill={COLORS.metal.handle} rx="0.5" />
       {/* Bottom drawer */}
       <rect x={right - 9} y={topY + 12} width="7" height="5" fill={COLORS.wood.top} />
       <rect x={right - 7} y={topY + 14} width="3" height="1" fill={COLORS.metal.handle} rx="0.5" />
       
      {/* Left support panel (instead of thin leg) */}
       {!connectedLeft && (
          <>
           <rect x={left + 2} y={topY + 5} width="5" height={bottomY - topY - 5} 
              fill={COLORS.wood.side} 
              stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
           <rect x={left + 2} y={topY + 5} width="5" height="1.5" 
              fill={COLORS.wood.front} />
          </>
       )}
     </svg>
   );
 };
 
 // Stove - 85° perspective (narrower, aligned with sink)
export const StoveIcon = ({ 
  className, 
  direction = 'down',
  connectedTop = false,
  connectedBottom = false,
  connectedLeft = false,
  connectedRight = false
}: ConnectableDirectionalAssetProps) => {
  // Mais estreito (18px) e mesma altura que pia (top=4)
  const left = connectedLeft ? 0 : 7;
  const right = connectedRight ? 32 : 25;
  const top = 4;      // Igual à pia para alinhar bancada
  const bottom = 28;
  const center = (left + right) / 2;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Left side depth (85°) */}
      {!connectedLeft && (
        <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
      )}
      
      {/* Cooktop surface */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height="6" 
        fill={COLORS.metal.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* 2 Burners */}
      <ellipse cx={center - 3.5} cy={top + 3} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center - 3.5} cy={top + 3} rx="1.5" ry="0.7" fill={COLORS.metal.side} />
      <ellipse cx={center + 3.5} cy={top + 3} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
      <ellipse cx={center + 3.5} cy={top + 3} rx="1.5" ry="0.7" fill={COLORS.metal.side} />
      
      {/* Body */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top + 6} width={right - left - (connectedLeft ? 0 : 2)} height={bottom - top - 6} 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Control panel with knobs */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={top + 7} width={right - left - (connectedLeft ? 2 : 4)} height="2.5" 
        fill={COLORS.metal.side} />
      <circle cx={center - 3} cy={top + 8.2} r="0.9" fill={COLORS.metal.handle} />
      <circle cx={center} cy={top + 8.2} r="0.9" fill={COLORS.metal.handle} />
      <circle cx={center + 3} cy={top + 8.2} r="0.9" fill={COLORS.metal.handle} />
      
      {/* Oven door */}
      <rect x={left + (connectedLeft ? 2 : 4)} y={top + 10.5} width={right - left - (connectedLeft ? 4 : 6)} height="8" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Oven handle */}
      <rect x={left + (connectedLeft ? 3 : 5)} y={top + 11.5} width={right - left - (connectedLeft ? 6 : 8)} height="1.2" 
        fill={COLORS.metal.chrome} rx="0.5" />
      {/* Oven window */}
      <rect x={left + (connectedLeft ? 4 : 6)} y={top + 13.5} width={right - left - (connectedLeft ? 8 : 10)} height="4" 
        fill={COLORS.screen.display} opacity="0.4" />
    </svg>
  );
};
 
  // Sink - 85° perspective with rectangular basin (kitchen style)
 export const SinkIcon = ({ 
   className, 
   direction = 'down',
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableDirectionalAssetProps) => {
  const left = connectedLeft ? 0 : 5;
  const right = connectedRight ? 32 : 27;
  const center = (left + right) / 2;
  const top = 4;
  const counterH = 8;
  const cabinetTop = top + counterH;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
        {/* Left side depth (85°) */}
        {!connectedLeft && (
         <rect x={left} y={top} width="2" height="24" fill={COLORS.appliance.side} />
        )}
        
       {/* Counter with depth - thicker */}
      <rect x={left + (connectedLeft ? 0 : 2)} y={top} width={right - left - (connectedLeft ? 0 : 2)} height={counterH} 
         fill={COLORS.appliance.top} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        
       {/* Basin - RETANGULAR (pia de cozinha) */}
       <rect x={center - 5.5} y={top + 2} width="11" height="4.5" rx="1"
         fill={COLORS.metal.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       <rect x={center - 4.5} y={top + 2.8} width="9" height="3" rx="0.8" 
         fill={COLORS.water.top} />
       {/* Drain */}
       <ellipse cx={center} cy={top + 4.5} rx="1" ry="0.5" fill={COLORS.metal.shadow} />
       
       {/* Faucet - simpler and smaller */}
       <rect x={center - 1} y={top} width="2" height="2" fill={COLORS.metal.chrome} />
       <rect x={center + 1} y={top + 0.5} width="2.5" height="1" fill={COLORS.metal.chrome} />
       <circle cx={center + 3.2} cy={top + 1.5} r="0.5" fill={COLORS.metal.side} />
       
       {/* Cabinet */}
       <rect x={left + (connectedLeft ? 0 : 2)} y={cabinetTop} width={right - left - (connectedLeft ? 0 : 2)} height="14" 
         fill={COLORS.appliance.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       
       {/* Cabinet doors */}
      <rect x={left + (connectedLeft ? 1 : 3)} y={cabinetTop + 1} width={(right - left - (connectedLeft ? 2 : 4)) / 2 - 1} height="11" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={center + 0.5} y={cabinetTop + 1} width={(right - left - (connectedLeft ? 2 : 4)) / 2 - 1} height="11" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       
       {/* Door handles */}
       <rect x={center - 2} y={cabinetTop + 5} width="1" height="2.5" fill={COLORS.metal.handle} rx="0.3" />
       <rect x={center + 1} y={cabinetTop + 5} width="1" height="2.5" fill={COLORS.metal.handle} rx="0.3" />
     </svg>
   );
 };
 
 // ==================== SINGLE ASSETS (ISOMETRIC 75°) ====================
 
// Armchair - 85° isometric perspective, unified piece (no gaps)
export const ArmchairIcon = ({ className }: AssetIconProps) => {
  const left = 4;
  const right = 28;
  const top = 5;
 const armWidth = 3;
  
  const innerLeft = left + armWidth;
  const innerRight = right - armWidth;
  const innerWidth = innerRight - innerLeft;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Back rest - taller and rounded */}
      <rect x={innerLeft} y={top} width={innerWidth} height="7" 
        fill={COLORS.armchair.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH}
        rx="2" />
      <rect x={innerLeft} y={top} width={innerWidth} height="2" 
        fill={COLORS.armchair.top}
        rx="2" />
      
      {/* Seat cushion */}
      <rect x={innerLeft} y={top + 7} width={innerWidth} height="5" 
        fill={COLORS.armchair.cushion}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={innerLeft} y={top + 7} width={innerWidth} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Base/front */}
      <rect x={innerLeft} y={top + 12} width={innerWidth} height="4" 
        fill={COLORS.armchair.front} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={innerLeft} y={top + 12} width={innerWidth} height="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Left armrest - rounded */}
      <rect x={left} y={top + 4} width={armWidth} height="11" 
        fill={COLORS.armchair.side}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH}
        rx="1" />
      <ellipse cx={left + armWidth/2} cy={top + 4} rx={armWidth/2} ry="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Right armrest - rounded */}
      <rect x={right - armWidth} y={top + 4} width={armWidth} height="11" 
        fill={COLORS.armchair.side}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH}
        rx="1" />
      <ellipse cx={right - armWidth/2} cy={top + 4} rx={armWidth/2} ry="1.5" 
        fill={COLORS.armchair.top} />
      
      {/* Small feet */}
      <rect x={innerLeft} y={top + 16} width="2" height="2" 
        fill={COLORS.wood.shadow} rx="0.5" />
      <rect x={innerRight - 2} y={top + 16} width="2" height="2" 
        fill={COLORS.wood.shadow} rx="0.5" />
    </svg>
  );
};
 
 // Chair
// Chair - 85° isometric perspective with rectangular legs
 export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
   const PAD = 6;
   const TOP = 4;
   const SEAT_Y = 13;
   const SEAT_H = 6;
   const LEG_H = 8;
 
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Back legs (behind, slightly visible) */}
       <rect x={PAD + 1} y={SEAT_Y + SEAT_H - 1} width="3" height={LEG_H + 1} 
         fill={COLORS.wood.shadow} opacity="0.6" />
       <rect x={32 - PAD - 4} y={SEAT_Y + SEAT_H - 1} width="3" height={LEG_H + 1} 
         fill={COLORS.wood.shadow} opacity="0.6" />
       
       {/* Backrest - taller and narrower */}
       <rect x={PAD} y={TOP} width={32 - PAD * 2} height="10" 
        fill={COLORS.chair.back} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={PAD} y={TOP} width={32 - PAD * 2} height="2" fill={COLORS.chair.seat} />
       {/* Backrest left side depth */}
       <rect x={PAD - 1} y={TOP} width="1.5" height="10" fill={COLORS.wood.side} />
       {/* Backrest vertical slats detail */}
       <rect x={PAD + 3} y={TOP + 3} width="2" height="5" fill={COLORS.wood.side} rx="0.5" />
       <rect x="15" y={TOP + 3} width="2" height="5" fill={COLORS.wood.side} rx="0.5" />
       <rect x={32 - PAD - 5} y={TOP + 3} width="2" height="5" fill={COLORS.wood.side} rx="0.5" />
      
       {/* Seat - thinner */}
       <rect x={PAD} y={SEAT_Y} width={32 - PAD * 2} height={SEAT_H} 
        fill={COLORS.chair.seat} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={PAD} y={SEAT_Y} width={32 - PAD * 2} height="1.5" fill="#F0E8D8" />
       {/* Seat left side depth */}
       <rect x={PAD - 1} y={SEAT_Y} width="1.5" height={SEAT_H} fill={COLORS.wood.grain} />
      
       {/* Front legs - wider */}
       <rect x={PAD} y={SEAT_Y + SEAT_H} width="3.5" height={LEG_H} fill={COLORS.chair.legs} 
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       <rect x={32 - PAD - 3.5} y={SEAT_Y + SEAT_H} width="3.5" height={LEG_H} fill={COLORS.chair.legs} 
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
     </svg>
   );
 };
 
 // Fridge
// Fridge - 85° perspective (taller than stove)
export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
  const left = 5;
  const right = 27;
  const top = 2;      // Maximum height
  const bottom = 30;  // Maximum height
   
  return (
    <svg viewBox="0 0 32 32" className={className}>
        {/* Left side depth (85°) */}
        <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.metal.side} />
        
       {/* Main body */}
       <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top} 
         fill={COLORS.appliance.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       
       {/* Top surface (85° depth indicator) */}
       <rect x={left} y={top} width={right - left} height="2" fill={COLORS.metal.top} />
       
       {/* Freezer compartment - taller */}
       <rect x={left + 4} y={top + 4} width={right - left - 6} height="8" fill={COLORS.appliance.top} />
       <rect x={right - 5} y={top + 6} width="1.5" height="4" fill={COLORS.metal.handle} rx="0.3" />
       
       {/* Divider line */}
       <rect x={left + 4} y={top + 12.5} width={right - left - 6} height="1" fill={COLORS.metal.shadow} />
       
       {/* Fridge compartment - larger */}
       <rect x={left + 4} y={top + 14} width={right - left - 6} height="13" fill={COLORS.appliance.top} />
       <rect x={right - 5} y={top + 18} width="1.5" height="5" fill={COLORS.metal.handle} rx="0.3" />
    </svg>
  );
};
 
 // TV - 85° perspective with depth
 export const TvIcon = ({ className }: AssetIconProps) => {
   const left = 4;
   const right = 28;
   const top = 5;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Left side depth (85°) */}
       <rect x={left} y={top} width="2" height="14" fill={COLORS.metal.shadow} />
       
       {/* Screen frame */}
       <rect x={left + 2} y={top} width={right - left - 2} height="14" 
         fill={COLORS.screen.frame}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       
       {/* Top surface (85° depth indicator) */}
       <rect x={left} y={top} width={right - left} height="2" fill={COLORS.metal.side} />
       
       {/* Display */}
       <rect x={left + 3} y={top + 2.5} width={right - left - 5} height="10" fill={COLORS.screen.display} />
       {/* Screen reflection */}
       <rect x={left + 4} y={top + 3.5} width="7" height="2.5" fill={COLORS.screen.glow} opacity="0.25" />
       
       {/* Stand neck - thicker */}
       <rect x="13" y={top + 14} width="6" height="3" fill={COLORS.metal.shadow} />
       <rect x="13" y={top + 14} width="1.5" height="3" fill={COLORS.metal.side} opacity="0.5" />
       
       {/* Stand base with 85° depth */}
       <rect x="10" y={top + 17} width="1.5" height="4" fill={COLORS.metal.side} />
       <rect x="11.5" y={top + 17} width="10" height="4" 
         fill={COLORS.metal.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x="10" y={top + 17} width="11.5" height="1.5" fill={COLORS.metal.top} />
     </svg>
   );
 };
 
 // Bookshelf - 85° perspective with depth
 export const BookshelfIcon = ({ className }: AssetIconProps) => {
   const left = 4;
   const right = 28;
   const top = 4;
   const bottom = 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Left side depth (85°) */}
       <rect x={left} y={top} width="2" height={bottom - top} fill={COLORS.wood.side} />
       
       {/* Main frame */}
       <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top} 
         fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       
       {/* Top surface (85° depth indicator) */}
       <rect x={left} y={top} width={right - left} height="2" fill={COLORS.wood.top} />
       
       {/* Shelves with depth */}
       <rect x={left + 2} y={top + 8} width={right - left - 3} height="2" fill={COLORS.wood.shadow} />
       <rect x={left + 2} y={top + 8} width={right - left - 3} height="0.8" fill={COLORS.wood.side} />
       
       <rect x={left + 2} y={top + 15} width={right - left - 3} height="2" fill={COLORS.wood.shadow} />
       <rect x={left + 2} y={top + 15} width={right - left - 3} height="0.8" fill={COLORS.wood.side} />
       
       {/* Top shelf books - with slight 3D effect */}
       <rect x={left + 3} y={top + 2} width="2.5" height="5.5" fill="#C86868" />
       <rect x={left + 3} y={top + 2} width="0.6" height="5.5" fill="#A85050" />
       
       <rect x={left + 5.5} y={top + 2.5} width="3" height="5" fill="#6888B8" />
       <rect x={left + 5.5} y={top + 2.5} width="0.6" height="5" fill="#4868A0" />
       
       <rect x={left + 8.5} y={top + 2} width="2.5" height="5.5" fill="#68B888" />
       <rect x={left + 8.5} y={top + 2} width="0.6" height="5.5" fill="#48A868" />
       
       <rect x={left + 11} y={top + 2.5} width="3.5" height="5" fill="#B8A868" />
       <rect x={left + 11} y={top + 2.5} width="0.6" height="5" fill="#A89050" />
       
       <rect x={left + 14.5} y={top + 2} width="2.5" height="5.5" fill="#8868B8" />
       <rect x={left + 14.5} y={top + 2} width="0.6" height="5.5" fill="#6850A0" />
       
       <rect x={left + 17} y={top + 2.5} width="3.5" height="5" fill="#B86888" />
       <rect x={left + 17} y={top + 2.5} width="0.6" height="5" fill="#A05068" />
       
       <rect x={left + 20.5} y={top + 2} width="2" height="5.5" fill="#689898" />
       <rect x={left + 20.5} y={top + 2} width="0.5" height="5.5" fill="#508080" />
       
       {/* Middle shelf books */}
       <rect x={left + 3} y={top + 10.5} width="4" height="4" fill="#6B8B9B" />
       <rect x={left + 3} y={top + 10.5} width="0.7" height="4" fill="#4B6B7B" />
       
       <rect x={left + 7} y={top + 11} width="3" height="3.5" fill="#9B6B6B" />
       <rect x={left + 7} y={top + 11} width="0.6" height="3.5" fill="#7B4B4B" />
       
       <rect x={left + 10} y={top + 10.5} width="4.5" height="4" fill="#6B9B6B" />
       <rect x={left + 10} y={top + 10.5} width="0.7" height="4" fill="#4B7B4B" />
       
       <rect x={left + 14.5} y={top + 11} width="3" height="3.5" fill="#9B9B6B" />
       <rect x={left + 14.5} y={top + 11} width="0.6" height="3.5" fill="#7B7B4B" />
       
       <rect x={left + 17.5} y={top + 10.5} width="4" height="4" fill="#6B6B9B" />
       <rect x={left + 17.5} y={top + 10.5} width="0.7" height="4" fill="#4B4B7B" />
       
       {/* Bottom shelf books */}
       <rect x={left + 3} y={top + 17.5} width="4.5" height="5" fill="#8B6B8B" />
       <rect x={left + 3} y={top + 17.5} width="0.8" height="5" fill="#6B4B6B" />
       
       <rect x={left + 7.5} y={top + 18} width="3.5" height="4.5" fill="#6B8B8B" />
       <rect x={left + 7.5} y={top + 18} width="0.6" height="4.5" fill="#4B6B6B" />
       
       <rect x={left + 11} y={top + 17.5} width="3" height="5" fill="#8B8B6B" />
       <rect x={left + 11} y={top + 17.5} width="0.6" height="5" fill="#6B6B4B" />
       
       <rect x={left + 14} y={top + 18} width="3.5" height="4.5" fill="#6B6B8B" />
       <rect x={left + 14} y={top + 18} width="0.6" height="4.5" fill="#4B4B6B" />
       
       <rect x={left + 17.5} y={top + 17.5} width="4" height="5" fill="#8B6B6B" />
       <rect x={left + 17.5} y={top + 17.5} width="0.7" height="5" fill="#6B4B4B" />
     </svg>
   );
 };
 
 // Plant
 export const PlantIcon = ({ className }: AssetIconProps) => {
   // Padding: ~5px each side
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Center leaves */}
       <ellipse cx="16" cy="7" rx="4" ry="6" 
         fill={COLORS.plant.leafFront}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       {/* Side leaves */}
       <ellipse cx="11" cy="9" rx="2.5" ry="5" 
         fill={COLORS.plant.leafFront} 
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5}
         transform="rotate(-20 11 9)" />
       <ellipse cx="21" cy="9" rx="2.5" ry="5" 
         fill={COLORS.plant.leafFront} 
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5}
         transform="rotate(20 21 9)" />
       {/* Outer leaves */}
       <ellipse cx="8" cy="12" rx="1.8" ry="3.5" 
         fill={COLORS.plant.leafSide} transform="rotate(-35 8 12)" />
       <ellipse cx="24" cy="12" rx="1.8" ry="3.5" 
         fill={COLORS.plant.leafSide} transform="rotate(35 24 12)" />
       {/* Leaf highlight */}
       <ellipse cx="15" cy="5" rx="1.2" ry="3" fill={COLORS.plant.leafTop} opacity="0.5" />
       
       {/* Pot rim */}
       <ellipse cx="16" cy="17" rx="7" ry="3.5" 
         fill={COLORS.plant.potSide}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       {/* Pot body */}
       <polygon points="9,17 23,17 21,26 11,26" 
         fill={COLORS.plant.pot}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       {/* Pot shading */}
       <polygon points="9,17 11,26 13,26 11,17" fill={COLORS.plant.potSide} />
       {/* Pot top */}
       <ellipse cx="16" cy="17" rx="6" ry="2.5" fill={COLORS.plant.pot} />
     </svg>
   );
 };
 
 // Toilet
// Toilet - 85° perspective with solid rectangular depth indicators
export const ToiletIcon = ({ className }: AssetIconProps) => {
  const left = 5;
  const right = 27;
  const top = 4;
  const tankHeight = 8;
  const seatTop = top + tankHeight + 1;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* TANK - perspectiva 85° */}
      {/* Tank left side depth */}
      <rect x={left} y={top} width="2" height={tankHeight} fill={COLORS.appliance.side} />
      
      {/* Tank body */}
      <rect x={left + 2} y={top} width={right - left - 2} height={tankHeight} 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Tank top surface */}
      <rect x={left} y={top} width={right - left} height="2" fill={COLORS.appliance.top} />
      
      {/* Flush button */}
      <ellipse cx="16" cy={top + 3.5} rx="2" ry="1" fill={COLORS.metal.chrome} />
      
      {/* SEAT/LID - perspectiva 85° */}
      {/* Seat left side depth */}
      <rect x={left - 1} y={seatTop} width="2" height="6" fill={COLORS.appliance.side} />
      
      {/* Seat lid body */}
      <rect x={left + 1} y={seatTop} width={right - left - 2} height="6" rx="3"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Seat top surface */}
      <rect x={left - 1} y={seatTop} width={right - left + 2} height="1.5" rx="1"
        fill={COLORS.appliance.top} />
      
      {/* Seat opening (interior oval) */}
      <ellipse cx="16" cy={seatTop + 3.5} rx="7" ry="2.8" fill={COLORS.metal.top} />
      
      {/* BOWL - com profundidade */}
      {/* Bowl left side depth */}
      <rect x={left - 2} y={seatTop + 6} width="2" height="7" fill={COLORS.appliance.side} rx="1" />
      
      {/* Bowl body */}
      <rect x={left} y={seatTop + 6} width={right - left} height="7" rx="3"
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Water inside */}
      <ellipse cx="16" cy={seatTop + 9} rx="5" ry="2" fill={COLORS.water.top} />
      
      {/* Base shadow */}
      <ellipse cx="16" cy={seatTop + 12.5} rx="8" ry="1.5" fill={COLORS.appliance.shadow} />
    </svg>
  );
};
 
// Shower - 85° perspective with solid base and visible glass depth
export const ShowerIcon = ({ className }: AssetIconProps) => {
  const left = 4;
  const right = 28;
  const top = 4;
  const bottom = 28;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* BASE/PISO - elemento mais sólido */}
      {/* Base left side depth (85°) - SÓLIDO */}
      <rect x={left} y={bottom - 4} width="2" height="4" fill={COLORS.appliance.side} />
      
      {/* Base floor */}
      <rect x={left + 2} y={bottom - 4} width={right - left - 2} height="4" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Base top surface */}
      <rect x={left} y={bottom - 4} width={right - left} height="1.5" fill={COLORS.appliance.top} />
      
      {/* Drain */}
      <ellipse cx="16" cy={bottom - 2} rx="2.5" ry="1" fill={COLORS.metal.shadow} />
      
      {/* GLASS PANELS - com profundidade esquerda visível */}
      {/* Left glass side depth (85°) - mais visível */}
      <rect x={left} y={top} width="2" height={bottom - top - 4} 
        fill={COLORS.water.front} opacity="0.5" />
      
      {/* Glass main panel - translúcido */}
      <rect x={left + 2} y={top} width={right - left - 2} height={bottom - top - 4} 
        fill={COLORS.water.top} opacity="0.2"
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      
      {/* Glass top edge */}
      <rect x={left} y={top} width={right - left} height="2" 
        fill={COLORS.water.top} opacity="0.6" />
      
      {/* Chrome frame left edge */}
      <rect x={left} y={top} width="1" height={bottom - top - 4} 
        fill={COLORS.metal.chrome} />
      
      {/* SHOWERHEAD */}
      {/* Pipe - com profundidade */}
      <rect x={right - 6} y={top + 1} width="1.5" height="5" fill={COLORS.metal.side} />
      <rect x={right - 4.5} y={top + 1} width="2" height="5" fill={COLORS.metal.chrome} />
      
      {/* Showerhead */}
      <ellipse cx="17" cy={top + 6} rx="5" ry="2.5" 
        fill={COLORS.metal.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <ellipse cx="17" cy={top + 6} rx="3.5" ry="1.7" fill={COLORS.metal.front} />
      
      {/* Water droplets */}
      <ellipse cx="14" cy={top + 12} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx="17" cy={top + 14} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx="20" cy={top + 11} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx="16" cy={top + 18} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
    </svg>
  );
};
 
 // Rug
export const RugIcon = ({ className }: AssetIconProps) => {
  // Padding: ~3px each side for visual breathing room
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Outer ellipse with subtle stroke */}
      <ellipse cx="16" cy="16" rx="12" ry="9" 
        fill={COLORS.rug.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} strokeOpacity="0.5" />
      {/* Middle ring */}
      <ellipse cx="16" cy="16" rx="10" ry="7" fill={COLORS.rug.front} />
      {/* Inner ring */}
      <ellipse cx="16" cy="16" rx="8" ry="5" fill={COLORS.rug.top} />
      {/* Center pattern */}
      <ellipse cx="16" cy="16" rx="3.5" ry="2.2" fill={COLORS.rug.pattern} />
      {/* Corner decorations */}
      <ellipse cx="10" cy="16" rx="1.8" ry="1.3" fill={COLORS.rug.pattern} opacity="0.7" />
      <ellipse cx="22" cy="16" rx="1.8" ry="1.3" fill={COLORS.rug.pattern} opacity="0.7" />
      <ellipse cx="16" cy="10" rx="1.8" ry="1.3" fill={COLORS.rug.pattern} opacity="0.7" />
      <ellipse cx="16" cy="22" rx="1.8" ry="1.3" fill={COLORS.rug.pattern} opacity="0.7" />
    </svg>
  );
};
 
 // Window
 export const WindowIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="2" y="2" width="28" height="28" fill={COLORS.wood.front} />
     <rect x="2" y="2" width="28" height="2" fill={COLORS.wood.top} />
     <rect x="4" y="5" width="10" height="9" fill={COLORS.water.top} />
     <rect x="18" y="5" width="10" height="9" fill={COLORS.water.top} />
     <rect x="4" y="18" width="10" height="9" fill={COLORS.water.front} />
     <rect x="18" y="18" width="10" height="9" fill={COLORS.water.front} />
     <rect x="5" y="6" width="4" height="3" fill="#FFFFFF" opacity="0.4" />
     <rect x="19" y="6" width="4" height="3" fill="#FFFFFF" opacity="0.4" />
     <rect x="14" y="4" width="4" height="24" fill={COLORS.wood.shadow} />
     <rect x="2" y="14" width="28" height="4" fill={COLORS.wood.shadow} />
   </svg>
 );
 
 // Laptop
 export const LaptopIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="4,4 28,4 26,14 6,14" fill={COLORS.screen.frame} />
     <polygon points="5,5 27,5 25,13 7,13" fill={COLORS.screen.display} />
     <polygon points="8,6 16,6 15,10 9,10" fill={COLORS.screen.glow} opacity="0.3" />
     <rect x="2" y="14" width="28" height="12" fill={COLORS.metal.front} />
     <rect x="2" y="14" width="28" height="2" fill={COLORS.metal.top} />
     <rect x="5" y="17" width="22" height="6" fill={COLORS.metal.shadow} />
     <rect x="12" y="23" width="8" height="2" fill={COLORS.metal.side} rx="0.5" />
   </svg>
 );
 
 // Rock
 export const RockIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <ellipse cx="16" cy="28" rx="10" ry="3" fill={COLORS.metal.shadow} opacity="0.3" />
     <polygon points="8,26 4,18 6,10 12,6 20,6 26,10 28,18 24,26" fill={COLORS.metal.front} />
     <polygon points="10,8 22,8 24,12 8,12" fill={COLORS.metal.top} />
     <polygon points="6,12 8,26 14,24 10,12" fill={COLORS.metal.side} />
     <line x1="12" y1="14" x2="16" y2="20" stroke={COLORS.metal.shadow} strokeWidth="0.5" opacity="0.5" />
     <line x1="20" y1="12" x2="22" y2="18" stroke={COLORS.metal.shadow} strokeWidth="0.5" opacity="0.5" />
   </svg>
 );
 
 // Debris
 export const DebrisIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="4,16 16,12 18,14 6,18" fill={COLORS.wood.top} />
     <polygon points="14,10 26,6 28,8 16,12" fill={COLORS.wood.front} />
     <polygon points="8,24 18,20 20,22 10,26" fill={COLORS.wood.top} />
     <polygon points="18,22 28,18 30,20 20,24" fill={COLORS.wood.side} />
     <polygon points="6,12 12,8 14,10 8,14" fill={COLORS.wood.front} />
     <rect x="20" y="14" width="3" height="2" fill={COLORS.wood.side} transform="rotate(15 21 15)" />
     <rect x="10" y="20" width="2" height="3" fill={COLORS.wood.front} transform="rotate(-10 11 21)" />
   </svg>
 );
 
 // Door
 export const DoorIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="6" y="2" width="20" height="28" fill={COLORS.wood.front} />
     <rect x="6" y="2" width="20" height="2" fill={COLORS.wood.top} />
     <rect x="8" y="4" width="16" height="25" fill={COLORS.wood.top} />
     <rect x="10" y="6" width="12" height="8" fill={COLORS.wood.front} />
     <rect x="10" y="6" width="12" height="1" fill={COLORS.wood.side} />
     <rect x="10" y="17" width="12" height="10" fill={COLORS.wood.front} />
     <rect x="10" y="17" width="12" height="1" fill={COLORS.wood.side} />
     <ellipse cx="21" cy="17" rx="2" ry="1.5" fill={COLORS.metal.chrome} />
     <ellipse cx="21" cy="17" rx="1" ry="0.8" fill={COLORS.metal.shadow} />
   </svg>
 );
 
 // Empty
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