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
 // 75 degrees = more top-down view, less side visible
 const COLORS = {
   wood: {
     top: '#DCC8A8',
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
     pillow: '#FFFFFF',
     pillowShade: '#E8F0F8',
     blanket: '#6B9BD1',
     blanketLight: '#8BB8E8',
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
     pot: '#D08050',
     potSide: '#A86040',
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
 };
 
 // Outline color for visual clarity (subtle dark brown)
 const OUTLINE = '#5D4E37';
 const OUTLINE_WIDTH = 0.8;
 
 // ==================== CONNECTABLE ASSETS (ISOMETRIC 75°) ====================
 
// Bed - isometric 75° with BOTH horizontal and vertical connection support
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
  
  // ==================== HORIZONTAL BED ====================
  if (isHorizontal && !isVertical) {
    const isLeftEnd = !connectedLeft && connectedRight;
    const isRightEnd = connectedLeft && !connectedRight;
    
    if (isLeftEnd) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Frame superior/inferior */}
          <rect x="2" y="1" width="30" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="2" y="29" width="30" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          {/* Cabeceira de madeira (vertical) */}
          <rect x="0" y="2" width="5" height="28" fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="0" y="2" width="2" height="28" fill={COLORS.wood.top} />
          <rect x="1" y="5" width="2" height="8" fill={COLORS.wood.side} rx="0.5" />
          <rect x="1" y="19" width="2" height="8" fill={COLORS.wood.side} rx="0.5" />
          {/* Colchão base */}
          <rect x="5" y="3" width="27" height="26" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          {/* Lençol bege (área do travesseiro) */}
          <rect x="6" y="4" width="14" height="24" fill={COLORS.bed.sheet} />
          {/* Cobertor verde (porção que conecta com a próxima célula) */}
          <rect x="18" y="4" width="14" height="24" fill={COLORS.bed.blanket} />
          <rect x="18" y="4" width="2" height="24" fill={COLORS.bed.blanketLight} />
          {/* Linha de transição */}
          <line x1="20" y1="6" x2="20" y2="26" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.5" />
          {/* Travesseiro único grande (retângulo arredondado) */}
          <rect x="7" y="6" width="9" height="20" rx="3" fill={COLORS.bed.pillow} />
          <rect x="8" y="7" width="7" height="18" rx="2" fill={COLORS.bed.pillowShade} />
        </svg>
      );
    }
    
    if (isRightEnd) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          {/* Frame superior/inferior */}
          <rect x="0" y="1" width="30" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="0" y="29" width="30" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          {/* Pé da cama (madeira) */}
          <rect x="27" y="3" width="3" height="26" fill={COLORS.wood.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="27" y="3" width="1" height="26" fill={COLORS.wood.front} />
          {/* Colchão base */}
          <rect x="0" y="3" width="27" height="26" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          {/* Cobertor verde (continuidade da célula esquerda) */}
          <rect x="0" y="4" width="26" height="24" fill={COLORS.bed.blanket} />
          {/* Dobras do cobertor */}
          <line x1="7" y1="6" x2="7" y2="26" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
          <line x1="14" y1="6" x2="14" y2="26" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
          <line x1="21" y1="6" x2="21" y2="26" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.2" />
        </svg>
      );
    }
    
    return (
      <svg viewBox="0 0 32 32" className={className}>
        <rect x="0" y="1" width="32" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="0" y="29" width="32" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="0" y="3" width="32" height="26" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="1" y="4" width="30" height="24" fill={COLORS.bed.blanket} />
        <line x1="10" y1="6" x2="10" y2="26" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
        <line x1="22" y1="6" x2="22" y2="26" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
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
          <rect x="1" y="2" width="2" height="30" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="29" y="2" width="2" height="30" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="2" y="0" width="28" height="5" fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="2" y="0" width="28" height="2" fill={COLORS.wood.top} />
          <rect x="5" y="1" width="8" height="2" fill={COLORS.wood.side} rx="0.5" />
          <rect x="19" y="1" width="8" height="2" fill={COLORS.wood.side} rx="0.5" />
          <rect x="3" y="5" width="26" height="27" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="4" y="6" width="24" height="26" fill={COLORS.bed.sheet} />
          <line x1="4" y1="28" x2="28" y2="28" stroke={COLORS.bed.sheetFold} strokeWidth="1" opacity="0.3" />
          <ellipse cx="10" cy="11" rx="5" ry="3.5" fill={COLORS.bed.pillow} />
          <ellipse cx="10" cy="10" rx="4" ry="2.5" fill={COLORS.bed.pillowShade} />
          <ellipse cx="22" cy="11" rx="5" ry="3.5" fill={COLORS.bed.pillow} />
          <ellipse cx="22" cy="10" rx="4" ry="2.5" fill={COLORS.bed.pillowShade} />
        </svg>
      );
    }
    
    if (isFootSegment) {
      return (
        <svg viewBox="0 0 32 32" className={className}>
          <rect x="1" y="0" width="2" height="30" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="29" y="0" width="2" height="30" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="1" y="28" width="30" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="3" y="0" width="26" height="28" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="4" y="1" width="24" height="25" fill={COLORS.bed.blanket} />
          <rect x="4" y="1" width="24" height="2" fill={COLORS.bed.blanketLight} />
          <line x1="6" y1="8" x2="26" y2="8" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.5" />
          <line x1="6" y1="14" x2="26" y2="14" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
          <line x1="6" y1="20" x2="26" y2="20" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.3" />
          <rect x="3" y="26" width="26" height="3" fill={COLORS.wood.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
          <rect x="3" y="26" width="26" height="1" fill={COLORS.wood.front} />
        </svg>
      );
    }
    
    return (
      <svg viewBox="0 0 32 32" className={className}>
        <rect x="1" y="0" width="2" height="32" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="29" y="0" width="2" height="32" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="3" y="0" width="26" height="32" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
        <rect x="4" y="1" width="24" height="30" fill={COLORS.bed.blanket} />
        <line x1="6" y1="10" x2="26" y2="10" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
        <line x1="6" y1="22" x2="26" y2="22" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
      </svg>
    );
  }
  
  // ==================== SINGLE BED ====================
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <rect x="1" y="2" width="2" height="28" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="29" y="2" width="2" height="28" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="1" y="2" width="30" height="2" fill={COLORS.bed.frameTop} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="1" y="28" width="30" height="2" fill={COLORS.bed.frame} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="2" y="0" width="28" height="4" fill={COLORS.wood.front} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="2" y="0" width="28" height="2" fill={COLORS.wood.top} />
      <rect x="5" y="1" width="8" height="2" fill={COLORS.wood.side} rx="0.5" />
      <rect x="19" y="1" width="8" height="2" fill={COLORS.wood.side} rx="0.5" />
      <rect x="3" y="5" width="26" height="23" fill={COLORS.bed.mattress} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="4" y="6" width="24" height="21" fill={COLORS.bed.sheet} />
      <rect x="4" y="15" width="24" height="11" fill={COLORS.bed.blanket} />
      <rect x="4" y="15" width="24" height="2" fill={COLORS.bed.blanketLight} />
      <line x1="6" y1="19" x2="26" y2="19" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.5" />
      <line x1="6" y1="23" x2="26" y2="23" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
      <ellipse cx="10" cy="10" rx="5" ry="3" fill={COLORS.bed.pillow} />
      <ellipse cx="10" cy="9" rx="4" ry="2" fill={COLORS.bed.pillowShade} />
      <ellipse cx="22" cy="10" rx="5" ry="3" fill={COLORS.bed.pillow} />
      <ellipse cx="22" cy="9" rx="4" ry="2" fill={COLORS.bed.pillowShade} />
      <rect x="3" y="27" width="26" height="2" fill={COLORS.wood.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
    </svg>
  );
};
 
 // Sofa - isometric 75° with horizontal connection (left-right)
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
       <rect x={left} y={bottom - 6} width={right - left} height="2" fill={COLORS.sofa.top} />
       
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
         x={left + (connectedLeft ? 0 : 5)} 
         y={top + 7} 
         width={right - left - (connectedLeft ? 0 : 5) - (connectedRight ? 0 : 5)} 
         height="9" 
         fill={COLORS.sofa.cushion}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect 
         x={left + (connectedLeft ? 0 : 5)} 
         y={top + 7} 
         width={right - left - (connectedLeft ? 0 : 5) - (connectedRight ? 0 : 5)} 
         height="2" 
         fill={COLORS.sofa.cushionTop} />
       
       {/* Cushion divider line */}
       <line x1="16" y1={top + 8} x2="16" y2={top + 15} stroke={COLORS.sofa.front} strokeWidth="0.8" opacity="0.5" />
       
       {/* Left armrest */}
       {!connectedLeft && (
         <>
           <rect x={padding} y={top + 2} width="5" height="14" 
             fill={COLORS.sofa.arm}
             stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
           <ellipse cx={padding + 2.5} cy={top + 2} rx="2.5" ry="1.5" fill={COLORS.sofa.top} />
           <rect x={padding} y={top + 2} width="5" height="2" fill={COLORS.sofa.top} />
         </>
       )}
       
       {/* Right armrest */}
       {!connectedRight && (
         <>
           <rect x={32 - padding - 5} y={top + 2} width="5" height="14" 
             fill={COLORS.sofa.arm}
             stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
           <ellipse cx={32 - padding - 2.5} cy={top + 2} rx="2.5" ry="1.5" fill={COLORS.sofa.top} />
           <rect x={32 - padding - 5} y={top + 2} width="5" height="2" fill={COLORS.sofa.top} />
         </>
       )}
       
       {/* Feet */}
       {!connectedLeft && <rect x={padding + 1} y={bottom} width="2.5" height="2" fill={COLORS.wood.shadow} rx="0.5" />}
       {!connectedRight && <rect x={32 - padding - 3.5} y={bottom} width="2.5" height="2" fill={COLORS.wood.shadow} rx="0.5" />}
     </svg>
   );
 };
 
 // Table - isometric 75°
 export const TableIcon = ({ 
   className, 
   connectedTop = false, 
   connectedBottom = false, 
   connectedLeft = false, 
   connectedRight = false 
 }: ConnectableAssetProps) => {
   // Padding for visual breathing room
   const padding = 4;
   const left = connectedLeft ? 0 : padding;
   const right = connectedRight ? 32 : 32 - padding;
   const topY = connectedTop ? 0 : 5;
   const bottomY = 26;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Tabletop */}
       <rect x={left} y={topY} width={right - left} height="5" 
         fill={COLORS.wood.top}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left} y={topY + 4} width={right - left} height="1.5" fill={COLORS.wood.front} />
       
       {/* Wood grain details */}
       <line x1={left + 4} y1={topY + 1} x2={left + 4} y2={topY + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
       <line x1="16" y1={topY + 1} x2="16" y2={topY + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.3" />
       <line x1={right - 4} y1={topY + 1} x2={right - 4} y2={topY + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
       
       {/* Apron */}
       <rect x={left + 2} y={topY + 5} width={right - left - 4} height="3" fill={COLORS.wood.side} />
       
       {/* Legs */}
       {!connectedLeft && (
         <polygon points={`${padding + 1},${topY + 9} ${padding + 3},${topY + 9} ${padding + 2.5},${bottomY} ${padding + 1.5},${bottomY}`} 
           fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       )}
       {!connectedRight && (
         <polygon points={`${32 - padding - 3},${topY + 9} ${32 - padding - 1},${topY + 9} ${32 - padding - 1.5},${bottomY} ${32 - padding - 2.5},${bottomY}`} 
           fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       )}
     </svg>
   );
 };
 
 // Desk - isometric 75°
 export const DeskIcon = ({
   className,
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableAssetProps) => {
   // Padding for visual breathing room
   const padding = 4;
   const left = connectedLeft ? 0 : padding;
   const right = connectedRight ? 32 : 32 - padding;
   const topY = connectedTop ? 0 : 5;
   const bottomY = 26;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Desktop surface */}
       <rect x={left} y={topY} width={right - left} height="4" 
         fill={COLORS.wood.top}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left} y={topY + 3} width={right - left} height="1.5" fill={COLORS.wood.front} />
       
       {/* Drawer pedestal */}
       <rect x={right - 12} y={topY + 4} width="11" height={bottomY - topY - 4} 
         fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={right - 12} y={topY + 4} width="11" height="2" fill={COLORS.wood.top} />
       {/* Top drawer */}
       <rect x={right - 11} y={topY + 7} width="9" height="6" fill={COLORS.wood.top} />
       <rect x={right - 8} y={topY + 9} width="3" height="1.5" fill={COLORS.metal.handle} rx="0.5" />
       {/* Bottom drawer */}
       <rect x={right - 11} y={topY + 14} width="9" height="6" fill={COLORS.wood.top} />
       <rect x={right - 8} y={topY + 16} width="3" height="1.5" fill={COLORS.metal.handle} rx="0.5" />
       
       {/* Left leg */}
       {!connectedLeft && (
         <polygon points={`${padding + 1},${topY + 5} ${padding + 3},${topY + 5} ${padding + 2.5},${bottomY} ${padding + 1.5},${bottomY}`} 
           fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       )}
     </svg>
   );
 };
 
 // Stove - isometric 75°
 export const StoveIcon = ({ 
   className, 
   direction = 'down',
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableDirectionalAssetProps) => {
  // Padding: ~4px when not connected
  const left = connectedLeft ? 0 : 4;
  const right = connectedRight ? 32 : 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Body */}
      <rect x={left} y="4" width={right - left} height="6" 
        fill={COLORS.metal.top} 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left} y="8" width={right - left} height="20" 
        fill={COLORS.metal.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {!connectedRight && <polygon points={`${right - 2},8 ${right},6 ${right},26 ${right - 2},28`} fill={COLORS.metal.side} />}
       
       {/* 4 Burners */}
      <ellipse cx={(left + right) / 2 - 5} cy="6" rx="3.5" ry="2" fill={COLORS.metal.shadow} />
      <ellipse cx={(left + right) / 2 - 5} cy="6" rx="2" ry="1.2" fill={COLORS.metal.side} />
      <ellipse cx={(left + right) / 2 - 5} cy="6" rx="0.8" ry="0.5" fill={COLORS.metal.shadow} />
      <ellipse cx={(left + right) / 2 + 5} cy="6" rx="3.5" ry="2" fill={COLORS.metal.shadow} />
      <ellipse cx={(left + right) / 2 + 5} cy="6" rx="2" ry="1.2" fill={COLORS.metal.side} />
      <ellipse cx={(left + right) / 2 + 5} cy="6" rx="0.8" ry="0.5" fill={COLORS.metal.shadow} />
       
       {/* Knobs */}
      <rect x={left + 2} y="11" width={right - left - 4} height="2.5" fill={COLORS.metal.side} />
      <circle cx={(left + right) / 2 - 6} cy="12" r="1.2" fill={COLORS.metal.handle} />
      <circle cx={(left + right) / 2 - 2} cy="12" r="1.2" fill={COLORS.metal.handle} />
      <circle cx={(left + right) / 2 + 2} cy="12" r="1.2" fill={COLORS.metal.handle} />
      <circle cx={(left + right) / 2 + 6} cy="12" r="1.2" fill={COLORS.metal.handle} />
       
       {/* Oven */}
      <rect x={left + 2} y="15" width={right - left - 4} height="11" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left + 3} y="16" width={right - left - 6} height="1.5" fill={COLORS.metal.chrome} />
      <rect x={left + 4} y="18" width={right - left - 8} height="6" fill={COLORS.screen.display} opacity="0.5" />
     </svg>
   );
 };
 
 // Sink - isometric 75°
 export const SinkIcon = ({ 
   className, 
   direction = 'down',
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableDirectionalAssetProps) => {
  // Padding: ~4px when not connected
  const left = connectedLeft ? 0 : 4;
  const right = connectedRight ? 32 : 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Counter */}
      <rect x={left} y="4" width={right - left} height="6" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x={left} y="8" width={right - left} height="18" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       
       {/* Basin */}
      <ellipse cx="16" cy="6" rx="7" ry="3.5" fill={COLORS.metal.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx="16" cy="6" rx="5" ry="2.5" fill={COLORS.water.top} />
      <ellipse cx="16" cy="6" rx="1.2" ry="0.8" fill={COLORS.metal.shadow} />
       
       {/* Faucet */}
      <rect x="14" y="2" width="4" height="2.5" fill={COLORS.metal.chrome} />
      <ellipse cx="16" cy="2" rx="2" ry="0.8" fill={COLORS.metal.top} />
      <path d="M18 3 Q20 3 20 6" stroke={COLORS.metal.chrome} strokeWidth="1.5" fill="none" />
      <ellipse cx="20" cy="6" rx="0.8" ry="0.4" fill={COLORS.metal.side} />
       
       {/* Cabinet doors */}
      <rect x={left + 1} y="12" width={(right - left - 2) / 2 - 1} height="12" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={left + (right - left) / 2 + 1} y="12" width={(right - left - 2) / 2 - 1} height="12" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <rect x={left + (right - left) / 2 - 3} y="16" width="1.5" height="3" fill={COLORS.metal.handle} rx="0.3" />
      <rect x={left + (right - left) / 2 + 1.5} y="16" width="1.5" height="3" fill={COLORS.metal.handle} rx="0.3" />
     </svg>
   );
 };
 
 // ==================== SINGLE ASSETS (ISOMETRIC 75°) ====================
 
 // Armchair
 export const ArmchairIcon = ({ className }: AssetIconProps) => {
   // Padding: ~4px each side for visual breathing room
   const left = 5;
   const right = 27;
   const top = 4;
   const bottom = 26;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Base frame */}
       <rect x={left + 2} y="21" width={right - left - 4} height="4" 
         fill={COLORS.armchair.front} 
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left + 2} y="19" width={right - left - 4} height="2" fill={COLORS.armchair.top} />
       
       {/* Back rest - more top-down view */}
       <rect x={left + 4} y={top + 1} width={right - left - 8} height="8" 
         fill={COLORS.armchair.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left + 4} y={top + 1} width={right - left - 8} height="2" fill={COLORS.armchair.top} />
       
       {/* Seat cushion */}
       <rect x={left + 4} y={top + 9} width={right - left - 8} height="7" 
         fill={COLORS.armchair.cushion}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left + 4} y={top + 9} width={right - left - 8} height="2" fill={COLORS.armchair.top} />
       
       {/* Left armrest */}
       <rect x={left} y={top + 3} width="5" height="14" 
         fill={COLORS.armchair.side}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <ellipse cx={left + 2.5} cy={top + 3} rx="2.5" ry="1.5" fill={COLORS.armchair.top} />
       
       {/* Right armrest */}
       <rect x={right - 5} y={top + 3} width="5" height="14" 
         fill={COLORS.armchair.side}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <ellipse cx={right - 2.5} cy={top + 3} rx="2.5" ry="1.5" fill={COLORS.armchair.top} />
       
       {/* Feet */}
       <rect x={left + 1} y={bottom} width="3" height="2" fill={COLORS.wood.shadow} rx="0.5" />
       <rect x={right - 4} y={bottom} width="3" height="2" fill={COLORS.wood.shadow} rx="0.5" />
     </svg>
   );
 };
 
 // Chair
 export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
   // Padding: ~5px each side for visual breathing room (similar to armchair)
   const left = 6;
   const right = 26;
   const top = 4;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Backrest - more top-down view */}
       <rect x={left + 2} y={top} width={right - left - 4} height="8" 
         fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left + 2} y={top} width={right - left - 4} height="2" fill={COLORS.wood.top} />
       {/* Backrest slats */}
       <rect x={left + 4} y={top + 2} width="2" height="4" fill={COLORS.wood.top} />
       <rect x="14" y={top + 2} width="4" height="4" fill={COLORS.wood.top} />
       <rect x={right - 6} y={top + 2} width="2" height="4" fill={COLORS.wood.top} />
       
       {/* Seat - flatter perspective */}
       <rect x={left} y={top + 10} width={right - left} height="5" 
         fill={COLORS.wood.top}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left} y={top + 13} width={right - left} height="2" fill={COLORS.wood.front} />
       
       {/* Legs */}
       <polygon points={`${left + 1},${top + 16} ${left + 3},${top + 16} ${left + 2.5},26 ${left + 1.5},26`} 
         fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       <polygon points={`${right - 3},${top + 16} ${right - 1},${top + 16} ${right - 1.5},26 ${right - 2.5},26`} 
         fill={COLORS.wood.shadow} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       
       {/* Stretcher bar */}
       <rect x={left + 3} y="22" width={right - left - 6} height="1.5" 
         fill={COLORS.wood.side}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
     </svg>
   );
 };
 
 // Fridge
 export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => {
   // Padding: ~5px each side
   const left = 5;
   const right = 27;
   const top = 3;
   const bottom = 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Main body */}
       <rect x={left} y={top} width={right - left} height={bottom - top} 
         fill={COLORS.appliance.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left} y={top} width={right - left} height="3" fill={COLORS.metal.top} />
       
       {/* Side panel (isometric depth) */}
       <polygon points={`${right},${top + 3} ${right + 2},${top + 1} ${right + 2},${bottom - 2} ${right},${bottom}`} 
         fill={COLORS.metal.side} stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
       
       {/* Freezer door */}
       <rect x={left + 1} y={top + 1} width={right - left - 2} height="8" fill={COLORS.appliance.top} />
       <rect x={right - 5} y={top + 3} width="2" height="4" fill={COLORS.metal.handle} rx="0.5" />
       
       {/* Divider */}
       <rect x={left + 1} y={top + 9} width={right - left - 2} height="1" fill={COLORS.metal.shadow} />
       
       {/* Fridge door */}
       <rect x={left + 1} y={top + 10} width={right - left - 2} height="13" fill={COLORS.appliance.top} />
       <rect x={right - 5} y={top + 13} width="2" height="7" fill={COLORS.metal.handle} rx="0.5" />
       
       {/* Ice maker detail */}
       <rect x={left + 3} y={top + 13} width="7" height="5" fill={COLORS.metal.side} rx="1" />
     </svg>
   );
 };
 
 // TV
 export const TvIcon = ({ className }: AssetIconProps) => {
   // Padding: ~4px each side
   const left = 4;
   const right = 28;
   const top = 5;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Screen frame */}
       <rect x={left} y={top} width={right - left} height="14" 
         fill={COLORS.screen.frame}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left} y={top} width={right - left} height="2" fill={COLORS.metal.shadow} />
       
       {/* Display */}
       <rect x={left + 1} y={top + 2} width={right - left - 2} height="11" fill={COLORS.screen.display} />
       <rect x={left + 3} y={top + 3} width="8" height="3" fill={COLORS.screen.glow} opacity="0.3" />
       
       {/* Stand neck */}
       <rect x="14" y={top + 15} width="4" height="3" fill={COLORS.metal.shadow} />
       
       {/* Stand base */}
       <rect x="11" y={top + 18} width="10" height="3" 
         fill={COLORS.metal.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x="11" y={top + 18} width="10" height="1" fill={COLORS.metal.top} />
     </svg>
   );
 };
 
 // Bookshelf
 export const BookshelfIcon = ({ className }: AssetIconProps) => {
   // Padding: ~4px each side
   const left = 4;
   const right = 28;
   const top = 4;
   const bottom = 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Main frame */}
       <rect x={left} y={top} width={right - left} height={bottom - top} 
         fill={COLORS.wood.front}
         stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
       <rect x={left} y={top} width={right - left} height="2" fill={COLORS.wood.top} />
       
       {/* Side depth */}
       <polygon points={`${right},${top + 2} ${right + 1},${top + 1} ${right + 1},${bottom - 1} ${right},${bottom}`} 
         fill={COLORS.wood.side} />
       
       {/* Shelves */}
       <rect x={left + 1} y={top + 9} width={right - left - 2} height="1.5" fill={COLORS.wood.shadow} />
       <rect x={left + 1} y={top + 16} width={right - left - 2} height="1.5" fill={COLORS.wood.shadow} />
       
       {/* Top shelf books */}
       <rect x={left + 2} y={top + 1} width="2.5" height="6" fill="#C86868" />
       <rect x={left + 4.5} y={top + 2} width="3" height="5" fill="#6888B8" />
       <rect x={left + 7.5} y={top + 1} width="2.5" height="6" fill="#68B888" />
       <rect x={left + 10} y={top + 2} width="4" height="5" fill="#B8A868" />
       <rect x={left + 14} y={top + 1} width="2.5" height="6" fill="#8868B8" />
       <rect x={left + 16.5} y={top + 2} width="4" height="5" fill="#B86888" />
       <rect x={left + 20.5} y={top + 1} width="2" height="6" fill="#689898" />
       
       {/* Middle shelf books */}
       <rect x={left + 2} y={top + 11} width="4" height="5" fill="#6B8B9B" />
       <rect x={left + 6} y={top + 12} width="3" height="4" fill="#9B6B6B" />
       <rect x={left + 9} y={top + 11} width="5" height="5" fill="#6B9B6B" />
       <rect x={left + 14} y={top + 12} width="3" height="4" fill="#9B9B6B" />
       <rect x={left + 17} y={top + 11} width="4" height="5" fill="#6B6B9B" />
       
       {/* Bottom shelf books */}
       <rect x={left + 2} y={top + 18} width="5" height="5" fill="#8B6B8B" />
       <rect x={left + 7} y={top + 19} width="4" height="4" fill="#6B8B8B" />
       <rect x={left + 11} y={top + 18} width="3" height="5" fill="#8B8B6B" />
       <rect x={left + 14} y={top + 19} width="4" height="4" fill="#6B6B8B" />
       <rect x={left + 18} y={top + 18} width="4" height="5" fill="#8B6B6B" />
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
export const ToiletIcon = ({ className }: AssetIconProps) => {
  // Padding: ~5px each side for visual breathing room
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Tank */}
      <rect x="11" y="4" width="10" height="8" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <rect x="11" y="4" width="10" height="1.5" fill={COLORS.appliance.top} />
      <ellipse cx="16" cy="5.5" rx="1.5" ry="0.7" fill={COLORS.metal.chrome} />
      
      {/* Seat lid */}
      <ellipse cx="16" cy="14" rx="9" ry="4.5" 
        fill={COLORS.appliance.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx="16" cy="14" rx="7" ry="3.5" fill={COLORS.metal.top} />
      
      {/* Bowl */}
      <ellipse cx="16" cy="21" rx="9" ry="6" 
        fill={COLORS.appliance.front}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      <ellipse cx="16" cy="19.5" rx="6" ry="4" fill={COLORS.water.top} />
      <ellipse cx="16" cy="18.5" rx="4" ry="2.5" fill={COLORS.water.front} />
      
      {/* Base shadow */}
      <ellipse cx="16" cy="26" rx="7" ry="1.8" fill={COLORS.appliance.shadow} />
    </svg>
  );
};
 
 // Shower
export const ShowerIcon = ({ className }: AssetIconProps) => {
  // Padding: ~4px each side for visual breathing room
  const left = 4;
  const right = 28;
  const top = 5;
  const bottom = 27;
  
  return (
    <svg viewBox="0 0 32 32" className={className}>
      {/* Glass box background */}
      <rect x={left} y={top} width={right - left} height={bottom - top} 
        fill={COLORS.water.top} opacity="0.15" />
      {/* Frame with subtle outline */}
      <rect x={left} y={top} width={right - left} height={bottom - top} 
        fill="none" 
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH} />
      {/* Top reflection */}
      <rect x={left} y={top} width={right - left} height="1.5" fill={COLORS.water.top} opacity="0.3" />
      
      {/* Showerhead pipe */}
      <rect x={right - 6} y={top - 2} width="3" height="6" fill={COLORS.metal.chrome} />
      {/* Showerhead */}
      <ellipse cx={(left + right) / 2 + 2} cy={top + 4} rx="5" ry="2.5" 
        fill={COLORS.metal.top}
        stroke={OUTLINE} strokeWidth={OUTLINE_WIDTH * 0.5} />
      <ellipse cx={(left + right) / 2 + 2} cy={top + 4} rx="3.5" ry="1.7" fill={COLORS.metal.front} />
      
      {/* Water droplets */}
      <ellipse cx={(left + right) / 2 - 2} cy={top + 10} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2 + 1} cy={top + 12} rx="0.8" ry="2" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2 + 4} cy={top + 9} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2} cy={top + 16} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      <ellipse cx={(left + right) / 2 + 3} cy={top + 18} rx="0.8" ry="1.8" fill={COLORS.water.front} opacity="0.7" />
      
      {/* Drain */}
      <ellipse cx={(left + right) / 2} cy={bottom - 2} rx="2.5" ry="1.2" fill={COLORS.metal.shadow} />
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