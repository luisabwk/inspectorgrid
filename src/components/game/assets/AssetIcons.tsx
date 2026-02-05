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
 
 // ==================== CONNECTABLE ASSETS (ISOMETRIC 75°) ====================
 
 // Bed - isometric 75° with VERTICAL connection (top-bottom)
 export const BedIcon = ({ 
   className,
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableAssetProps) => {
   // Bed connects VERTICALLY - head at top, foot at bottom
   const isHead = !connectedTop && connectedBottom;
   const isFoot = connectedTop && !connectedBottom;
   const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
   
   const top = connectedTop ? 0 : 2;
   const bottom = connectedBottom ? 32 : 30;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Bed frame sides */}
       <rect x="1" y={top} width="2" height={bottom - top} fill={COLORS.bed.frame} />
       <rect x="29" y={top} width="2" height={bottom - top} fill={COLORS.bed.frame} />
       {!connectedTop && <rect x="1" y={top} width="30" height="2" fill={COLORS.bed.frameTop} />}
       {!connectedBottom && <rect x="1" y={bottom - 2} width="30" height="2" fill={COLORS.bed.frame} />}
       
       {/* Headboard at TOP */}
       {(isHead || isSingle) && (
         <>
           <rect x="2" y="0" width="28" height="4" fill={COLORS.wood.front} />
           <rect x="2" y="0" width="28" height="2" fill={COLORS.wood.top} />
           <rect x="5" y="1" width="8" height="2" fill={COLORS.wood.side} rx="0.5" />
           <rect x="19" y="1" width="8" height="2" fill={COLORS.wood.side} rx="0.5" />
         </>
       )}
       
       {/* Mattress */}
       <rect x="3" y={connectedTop ? 0 : (isHead || isSingle ? 5 : top)} 
             width="26" 
             height={bottom - (connectedTop ? 0 : (isHead || isSingle ? 5 : top))} 
             fill={COLORS.bed.mattress} />
       <rect x="4" y={connectedTop ? 1 : (isHead || isSingle ? 6 : top + 1)} 
             width="24" 
             height={bottom - (connectedTop ? 2 : (isHead || isSingle ? 7 : top + 2))} 
             fill={COLORS.bed.sheet} />
       
       {/* Blanket */}
       <rect x="4" y="16" width="24" height={bottom - 16 - (connectedBottom ? 0 : 1)} fill={COLORS.bed.blanket} />
       <rect x="4" y="16" width="24" height="2" fill={COLORS.bed.blanketLight} />
       <line x1="6" y1="20" x2="26" y2="20" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.5" />
       <line x1="6" y1="24" x2="26" y2="24" stroke={COLORS.bed.sheetFold} strokeWidth="0.5" opacity="0.4" />
       
       {/* Pillows at top */}
       {(isHead || isSingle) && (
         <>
           <ellipse cx="10" cy="10" rx="5" ry="3" fill={COLORS.bed.pillow} />
           <ellipse cx="10" cy="9" rx="4" ry="2" fill={COLORS.bed.pillowShade} />
           <ellipse cx="22" cy="10" rx="5" ry="3" fill={COLORS.bed.pillow} />
           <ellipse cx="22" cy="9" rx="4" ry="2" fill={COLORS.bed.pillowShade} />
         </>
       )}
       
       {/* Footboard */}
       {(isFoot || isSingle) && !connectedBottom && (
         <rect x="3" y="28" width="26" height="2" fill={COLORS.wood.side} />
       )}
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
   const left = connectedLeft ? 0 : 2;
   const right = connectedRight ? 32 : 30;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Base */}
       <rect x={left} y="24" width={right - left} height="6" fill={COLORS.sofa.front} />
       <rect x={left} y="22" width={right - left} height="2" fill={COLORS.sofa.top} />
       
       {/* Back cushion */}
       <rect x={left + (connectedLeft ? 0 : 4)} y="2" width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)} height="8" fill={COLORS.sofa.front} />
       <rect x={left + (connectedLeft ? 0 : 4)} y="2" width={right - left - (connectedLeft ? 0 : 4) - (connectedRight ? 0 : 4)} height="3" fill={COLORS.sofa.top} />
       <line x1={left + 12} y1="3" x2={left + 12} y2="9" stroke={COLORS.sofa.side} strokeWidth="0.8" opacity="0.5" />
       <line x1="16" y1="3" x2="16" y2="9" stroke={COLORS.sofa.side} strokeWidth="0.8" opacity="0.5" />
       <line x1={right - 12} y1="3" x2={right - 12} y2="9" stroke={COLORS.sofa.side} strokeWidth="0.8" opacity="0.5" />
       
       {/* Seat cushions */}
       <rect x={left + (connectedLeft ? 0 : 6)} y="10" width={right - left - (connectedLeft ? 0 : 6) - (connectedRight ? 0 : 6)} height="12" fill={COLORS.sofa.cushion} />
       <rect x={left + (connectedLeft ? 0 : 6)} y="10" width={right - left - (connectedLeft ? 0 : 6) - (connectedRight ? 0 : 6)} height="3" fill={COLORS.sofa.cushionTop} />
       <line x1={left + 10} y1="11" x2={left + 10} y2="21" stroke={COLORS.sofa.front} strokeWidth="0.8" opacity="0.6" />
       <line x1={right - 10} y1="11" x2={right - 10} y2="21" stroke={COLORS.sofa.front} strokeWidth="0.8" opacity="0.6" />
       
       {/* Armrests */}
       {!connectedLeft && (
         <>
           <rect x="2" y="4" width="6" height="20" fill={COLORS.sofa.arm} />
           <ellipse cx="5" cy="4" rx="3" ry="2" fill={COLORS.sofa.top} />
           <rect x="2" y="4" width="6" height="3" fill={COLORS.sofa.top} />
         </>
       )}
       {!connectedRight && (
         <>
           <rect x="24" y="4" width="6" height="20" fill={COLORS.sofa.arm} />
           <ellipse cx="27" cy="4" rx="3" ry="2" fill={COLORS.sofa.top} />
           <rect x="24" y="4" width="6" height="3" fill={COLORS.sofa.top} />
         </>
       )}
       
       {/* Feet */}
       {!connectedLeft && <rect x="3" y="28" width="3" height="2" fill={COLORS.wood.shadow} rx="0.5" />}
       {!connectedRight && <rect x="26" y="28" width="3" height="2" fill={COLORS.wood.shadow} rx="0.5" />}
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
   const left = connectedLeft ? 0 : 2;
   const right = connectedRight ? 32 : 30;
   const top = connectedTop ? 0 : 4;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Tabletop */}
       <rect x={left} y={top} width={right - left} height="6" fill={COLORS.wood.top} />
       <rect x={left} y={top + 4} width={right - left} height="2" fill={COLORS.wood.front} />
       
       {/* Wood grain */}
       <line x1={left + 4} y1={top + 1} x2={left + 4} y2={top + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
       <line x1={left + 10} y1={top + 1} x2={left + 10} y2={top + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.3" />
       <line x1={left + 16} y1={top + 1} x2={left + 16} y2={top + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.4" />
       <line x1={right - 8} y1={top + 1} x2={right - 8} y2={top + 3} stroke={COLORS.wood.grain} strokeWidth="0.5" opacity="0.3" />
       
       {/* Apron */}
       <rect x={left + 2} y={top + 6} width={right - left - 4} height="4" fill={COLORS.wood.side} />
       
       {/* Legs */}
       {!connectedLeft && <polygon points="4,12 8,12 7,28 5,28" fill={COLORS.wood.shadow} />}
       {!connectedRight && <polygon points="24,12 28,12 27,28 25,28" fill={COLORS.wood.shadow} />}
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
   const left = connectedLeft ? 0 : 2;
   const right = connectedRight ? 32 : 30;
   const top = connectedTop ? 0 : 4;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Desktop */}
       <rect x={left} y={top} width={right - left} height="4" fill={COLORS.wood.top} />
       <rect x={left} y={top + 3} width={right - left} height="2" fill={COLORS.wood.front} />
       
       {/* Drawer pedestal */}
       <rect x="18" y={top + 5} width="12" height="23" fill={COLORS.wood.front} />
       <rect x="18" y={top + 5} width="12" height="2" fill={COLORS.wood.top} />
       <rect x="19" y={top + 8} width="10" height="8" fill={COLORS.wood.top} />
       <rect x="22" y={top + 11} width="4" height="2" fill={COLORS.metal.handle} rx="0.5" />
       <rect x="19" y={top + 18} width="10" height="8" fill={COLORS.wood.top} />
       <rect x="22" y={top + 21} width="4" height="2" fill={COLORS.metal.handle} rx="0.5" />
       
       {/* Left leg */}
       {!connectedLeft && <polygon points="4,10 8,10 7,28 5,28" fill={COLORS.wood.shadow} />}
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
   const left = connectedLeft ? 0 : 2;
   const right = connectedRight ? 32 : 30;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Body */}
       <rect x={left} y="2" width={right - left} height="6" fill={COLORS.metal.top} />
       <rect x={left} y="6" width={right - left} height="24" fill={COLORS.metal.front} />
       {!connectedRight && <polygon points="30,6 32,4 32,28 30,30" fill={COLORS.metal.side} />}
       
       {/* 4 Burners */}
       <ellipse cx={left + 7} cy="4" rx="4" ry="2.5" fill={COLORS.metal.shadow} />
       <ellipse cx={left + 7} cy="4" rx="2.5" ry="1.5" fill={COLORS.metal.side} />
       <ellipse cx={left + 7} cy="4" rx="1" ry="0.6" fill={COLORS.metal.shadow} />
       <ellipse cx={right - 7} cy="4" rx="4" ry="2.5" fill={COLORS.metal.shadow} />
       <ellipse cx={right - 7} cy="4" rx="2.5" ry="1.5" fill={COLORS.metal.side} />
       <ellipse cx={right - 7} cy="4" rx="1" ry="0.6" fill={COLORS.metal.shadow} />
       
       {/* Knobs */}
       <rect x={left + 2} y="9" width={right - left - 4} height="3" fill={COLORS.metal.side} />
       <circle cx={left + 6} cy="10.5" r="1.5" fill={COLORS.metal.handle} />
       <circle cx={left + 11} cy="10.5" r="1.5" fill={COLORS.metal.handle} />
       <circle cx={right - 11} cy="10.5" r="1.5" fill={COLORS.metal.handle} />
       <circle cx={right - 6} cy="10.5" r="1.5" fill={COLORS.metal.handle} />
       
       {/* Oven */}
       <rect x={left + 3} y="14" width={right - left - 6} height="14" fill={COLORS.appliance.top} />
       <rect x={left + 4} y="15" width={right - left - 8} height="2" fill={COLORS.metal.chrome} />
       <rect x={left + 5} y="18" width={right - left - 10} height="8" fill={COLORS.screen.display} opacity="0.5" />
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
   const left = connectedLeft ? 0 : 2;
   const right = connectedRight ? 32 : 30;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Counter */}
       <rect x={left} y="2" width={right - left} height="6" fill={COLORS.appliance.top} />
       <rect x={left} y="6" width={right - left} height="24" fill={COLORS.appliance.front} />
       
       {/* Basin */}
       <ellipse cx="16" cy="5" rx="8" ry="4" fill={COLORS.metal.side} />
       <ellipse cx="16" cy="5" rx="6" ry="3" fill={COLORS.water.top} />
       <ellipse cx="16" cy="5" rx="1.5" ry="1" fill={COLORS.metal.shadow} />
       
       {/* Faucet */}
       <rect x="14" y="0" width="4" height="3" fill={COLORS.metal.chrome} />
       <ellipse cx="16" cy="0" rx="2" ry="1" fill={COLORS.metal.top} />
       <path d="M18 1.5 Q21 1.5 21 5" stroke={COLORS.metal.chrome} strokeWidth="2" fill="none" />
       <ellipse cx="21" cy="5" rx="1" ry="0.5" fill={COLORS.metal.side} />
       
       {/* Cabinet doors */}
       <rect x={left + 2} y="12" width="12" height="16" fill={COLORS.appliance.top} />
       <rect x={right - 14} y="12" width="12" height="16" fill={COLORS.appliance.top} />
       <rect x={left + 12} y="18" width="2" height="4" fill={COLORS.metal.handle} rx="0.5" />
       <rect x={right - 4} y="18" width="2" height="4" fill={COLORS.metal.handle} rx="0.5" />
     </svg>
   );
 };
 
 // ==================== SINGLE ASSETS (ISOMETRIC 75°) ====================
 
 // Armchair
 export const ArmchairIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="4" y="24" width="24" height="4" fill={COLORS.armchair.front} />
     <rect x="4" y="22" width="24" height="2" fill={COLORS.armchair.top} />
     <rect x="8" y="4" width="16" height="10" fill={COLORS.armchair.front} />
     <rect x="8" y="4" width="16" height="3" fill={COLORS.armchair.top} />
     <rect x="8" y="14" width="16" height="8" fill={COLORS.armchair.cushion} />
     <rect x="8" y="14" width="16" height="2" fill={COLORS.armchair.top} />
     <rect x="2" y="6" width="6" height="18" fill={COLORS.armchair.side} />
     <ellipse cx="5" cy="6" rx="3" ry="2" fill={COLORS.armchair.top} />
     <rect x="24" y="6" width="6" height="18" fill={COLORS.armchair.side} />
     <ellipse cx="27" cy="6" rx="3" ry="2" fill={COLORS.armchair.top} />
     <rect x="5" y="28" width="4" height="2" fill={COLORS.wood.shadow} rx="0.5" />
     <rect x="23" y="28" width="4" height="2" fill={COLORS.wood.shadow} rx="0.5" />
   </svg>
 );
 
 // Chair
 export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="8" y="2" width="16" height="10" fill={COLORS.wood.front} />
     <rect x="8" y="2" width="16" height="2" fill={COLORS.wood.top} />
     <rect x="10" y="4" width="3" height="6" fill={COLORS.wood.top} />
     <rect x="14.5" y="4" width="3" height="6" fill={COLORS.wood.top} />
     <rect x="19" y="4" width="3" height="6" fill={COLORS.wood.top} />
     <rect x="6" y="14" width="20" height="6" fill={COLORS.wood.top} />
     <rect x="6" y="18" width="20" height="2" fill={COLORS.wood.front} />
     <polygon points="7,20 10,20 9,30 8,30" fill={COLORS.wood.shadow} />
     <polygon points="22,20 25,20 24,30 23,30" fill={COLORS.wood.shadow} />
     <rect x="10" y="25" width="12" height="1.5" fill={COLORS.wood.side} />
   </svg>
 );
 
 // Fridge
 export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="4" y="2" width="24" height="4" fill={COLORS.metal.top} />
     <rect x="4" y="4" width="24" height="2" fill={COLORS.appliance.front} />
     <rect x="4" y="4" width="24" height="26" fill={COLORS.appliance.front} />
     <polygon points="28,4 30,2 30,28 28,30" fill={COLORS.metal.side} />
     <rect x="5" y="5" width="22" height="9" fill={COLORS.appliance.top} />
     <rect x="23" y="7" width="2" height="5" fill={COLORS.metal.handle} rx="0.5" />
     <rect x="5" y="14" width="22" height="1" fill={COLORS.metal.shadow} />
     <rect x="5" y="15" width="22" height="14" fill={COLORS.appliance.top} />
     <rect x="23" y="18" width="2" height="8" fill={COLORS.metal.handle} rx="0.5" />
     <rect x="8" y="18" width="8" height="6" fill={COLORS.metal.side} rx="1" />
   </svg>
 );
 
 // TV
 export const TvIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="1" y="4" width="30" height="16" fill={COLORS.screen.frame} />
     <rect x="1" y="4" width="30" height="2" fill={COLORS.metal.shadow} />
     <rect x="2" y="6" width="28" height="13" fill={COLORS.screen.display} />
     <rect x="4" y="7" width="10" height="4" fill={COLORS.screen.glow} opacity="0.3" />
     <rect x="14" y="20" width="4" height="4" fill={COLORS.metal.shadow} />
     <rect x="10" y="24" width="12" height="4" fill={COLORS.metal.front} />
     <rect x="10" y="24" width="12" height="1" fill={COLORS.metal.top} />
   </svg>
 );
 
 // Bookshelf
 export const BookshelfIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="1" y="2" width="30" height="28" fill={COLORS.wood.front} />
     <rect x="1" y="2" width="30" height="2" fill={COLORS.wood.top} />
     <polygon points="31,4 32,2 32,30 31,30" fill={COLORS.wood.side} />
     <rect x="2" y="10" width="28" height="1.5" fill={COLORS.wood.shadow} />
     <rect x="2" y="20" width="28" height="1.5" fill={COLORS.wood.shadow} />
     <rect x="3" y="3" width="3" height="7" fill="#C86868" />
     <rect x="6" y="4" width="4" height="6" fill="#6888B8" />
     <rect x="10" y="3" width="3" height="7" fill="#68B888" />
     <rect x="13" y="4" width="5" height="6" fill="#B8A868" />
     <rect x="18" y="3" width="3" height="7" fill="#8868B8" />
     <rect x="21" y="4" width="5" height="6" fill="#B86888" />
     <rect x="26" y="3" width="3" height="7" fill="#689898" />
     <rect x="3" y="12" width="5" height="8" fill="#6B8B9B" />
     <rect x="8" y="13" width="4" height="7" fill="#9B6B6B" />
     <rect x="12" y="12" width="6" height="8" fill="#6B9B6B" />
     <rect x="18" y="13" width="4" height="7" fill="#9B9B6B" />
     <rect x="22" y="12" width="5" height="8" fill="#6B6B9B" />
     <rect x="3" y="22" width="6" height="6" fill="#8B6B8B" />
     <rect x="9" y="23" width="5" height="5" fill="#6B8B8B" />
     <rect x="14" y="22" width="4" height="6" fill="#8B8B6B" />
     <rect x="18" y="23" width="5" height="5" fill="#6B6B8B" />
     <rect x="23" y="22" width="5" height="6" fill="#8B6B6B" />
   </svg>
 );
 
 // Plant
 export const PlantIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <ellipse cx="16" cy="6" rx="5" ry="8" fill={COLORS.plant.leafFront} />
     <ellipse cx="10" cy="8" rx="3" ry="6" fill={COLORS.plant.leafFront} transform="rotate(-20 10 8)" />
     <ellipse cx="22" cy="8" rx="3" ry="6" fill={COLORS.plant.leafFront} transform="rotate(20 22 8)" />
     <ellipse cx="7" cy="12" rx="2" ry="4" fill={COLORS.plant.leafSide} transform="rotate(-35 7 12)" />
     <ellipse cx="25" cy="12" rx="2" ry="4" fill={COLORS.plant.leafSide} transform="rotate(35 25 12)" />
     <ellipse cx="15" cy="4" rx="1.5" ry="4" fill={COLORS.plant.leafTop} opacity="0.5" />
     <ellipse cx="16" cy="18" rx="8" ry="4" fill={COLORS.plant.potSide} />
     <polygon points="8,18 24,18 22,28 10,28" fill={COLORS.plant.pot} />
     <polygon points="8,18 10,28 12,28 10,18" fill={COLORS.plant.potSide} />
     <ellipse cx="16" cy="18" rx="7" ry="3" fill={COLORS.plant.pot} />
   </svg>
 );
 
 // Toilet
 export const ToiletIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="10" y="2" width="12" height="10" fill={COLORS.appliance.front} />
     <rect x="10" y="2" width="12" height="2" fill={COLORS.appliance.top} />
     <ellipse cx="16" cy="4" rx="2" ry="1" fill={COLORS.metal.chrome} />
     <ellipse cx="16" cy="14" rx="10" ry="5" fill={COLORS.appliance.top} />
     <ellipse cx="16" cy="14" rx="8" ry="4" fill={COLORS.metal.top} />
     <ellipse cx="16" cy="22" rx="10" ry="7" fill={COLORS.appliance.front} />
     <ellipse cx="16" cy="20" rx="7" ry="5" fill={COLORS.water.top} />
     <ellipse cx="16" cy="19" rx="5" ry="3" fill={COLORS.water.front} />
     <ellipse cx="16" cy="28" rx="8" ry="2" fill={COLORS.appliance.shadow} />
   </svg>
 );
 
 // Shower
 export const ShowerIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <rect x="1" y="4" width="30" height="26" fill={COLORS.water.top} opacity="0.15" />
     <rect x="1" y="4" width="30" height="26" fill="none" stroke={COLORS.metal.chrome} strokeWidth="2" />
     <rect x="1" y="4" width="30" height="2" fill={COLORS.water.top} opacity="0.3" />
     <rect x="24" y="2" width="4" height="8" fill={COLORS.metal.chrome} />
     <ellipse cx="20" cy="8" rx="6" ry="3" fill={COLORS.metal.top} />
     <ellipse cx="20" cy="8" rx="4" ry="2" fill={COLORS.metal.front} />
     <ellipse cx="14" cy="14" rx="1" ry="2" fill={COLORS.water.front} opacity="0.7" />
     <ellipse cx="18" cy="16" rx="1" ry="2.5" fill={COLORS.water.front} opacity="0.7" />
     <ellipse cx="22" cy="13" rx="1" ry="2" fill={COLORS.water.front} opacity="0.7" />
     <ellipse cx="16" cy="20" rx="1" ry="2" fill={COLORS.water.front} opacity="0.7" />
     <ellipse cx="20" cy="22" rx="1" ry="2" fill={COLORS.water.front} opacity="0.7" />
     <ellipse cx="16" cy="28" rx="3" ry="1.5" fill={COLORS.metal.shadow} />
   </svg>
 );
 
 // Rug
 export const RugIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <ellipse cx="16" cy="16" rx="14" ry="10" fill={COLORS.rug.top} />
     <ellipse cx="16" cy="16" rx="12" ry="8" fill={COLORS.rug.front} />
     <ellipse cx="16" cy="16" rx="10" ry="6" fill={COLORS.rug.top} />
     <ellipse cx="16" cy="16" rx="4" ry="2.5" fill={COLORS.rug.pattern} />
     <ellipse cx="10" cy="16" rx="2" ry="1.5" fill={COLORS.rug.pattern} opacity="0.7" />
     <ellipse cx="22" cy="16" rx="2" ry="1.5" fill={COLORS.rug.pattern} opacity="0.7" />
     <ellipse cx="16" cy="10" rx="2" ry="1.5" fill={COLORS.rug.pattern} opacity="0.7" />
     <ellipse cx="16" cy="22" rx="2" ry="1.5" fill={COLORS.rug.pattern} opacity="0.7" />
   </svg>
 );
 
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