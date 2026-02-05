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
 
 // Isometric 60-degree color palette - 4 tone shading system
 const COLORS = {
   wood: {
     top: '#E8D4B8',
     front: '#C4A882',
     side: '#9B7B5A',
     shadow: '#6B5038',
   },
   bed: {
     top: '#A8C8E8',
     front: '#7BA8D0',
     side: '#5888B0',
     pillow: '#FFFFFF',
     pillowShade: '#E0E8F0',
   },
   sofa: {
     top: '#C8B0D8',
     front: '#A888C0',
     side: '#8868A0',
     shadow: '#684880',
   },
   armchair: {
     top: '#A8D0A8',
     front: '#80B080',
     side: '#609060',
     shadow: '#407040',
   },
   metal: {
     top: '#F8F8F8',
     front: '#D8D8D8',
     side: '#B0B0B0',
     shadow: '#808080',
     handle: '#505050',
   },
   appliance: {
     top: '#FFFFFF',
     front: '#F0F0F0',
     side: '#D0D0D0',
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
 
 // ==================== CONNECTABLE ASSETS (ISOMETRIC 60°) ====================
 
 // Bed - isometric with blanket folds and pillows
 export const BedIcon = ({ 
   className,
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableAssetProps) => {
   const isHead = (!connectedTop && connectedBottom) || (!connectedLeft && connectedRight);
   const isSingle = !connectedTop && !connectedBottom && !connectedLeft && !connectedRight;
   
   const left = connectedLeft ? 0 : 1;
   const right = connectedRight ? 32 : 31;
   const frontY = connectedBottom ? 32 : 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Bed frame */}
       <polygon points={`${left},${frontY} ${right},${frontY} ${right},22 ${left},22`} fill={COLORS.wood.front} />
       <polygon points={`${left},22 ${right},22 ${right - 2},20 ${left + 2},20`} fill={COLORS.wood.top} />
       
       {/* Headboard */}
       {(isHead || isSingle) && (
         <>
           <polygon points={`${left},10 ${right},10 ${right},2 ${left},2`} fill={COLORS.wood.front} />
           <polygon points={`${left},2 ${right},2 ${right - 2},0 ${left + 2},0`} fill={COLORS.wood.top} />
           <rect x={left} y="2" width="2" height="8" fill={COLORS.wood.side} />
         </>
       )}
       
       {/* Mattress */}
       <polygon points={`${left + 1},21 ${right - 1},21 ${right - 1},${connectedTop ? 0 : 10} ${left + 1},${connectedTop ? 0 : 10}`} fill={COLORS.bed.front} />
       <polygon points={`${left + 1},${connectedTop ? 0 : 10} ${right - 1},${connectedTop ? 0 : 10} ${right - 3},${connectedTop ? 0 : 8} ${left + 3},${connectedTop ? 0 : 8}`} fill={COLORS.bed.top} />
       
       {/* Pillows */}
       {(isHead || isSingle) && (
         <>
           <ellipse cx={left + 8} cy="12" rx="5" ry="2" fill={COLORS.bed.pillow} />
           <ellipse cx={left + 8} cy="12" rx="4" ry="1.5" fill={COLORS.bed.pillowShade} />
           <ellipse cx={right - 8} cy="12" rx="5" ry="2" fill={COLORS.bed.pillow} />
           <ellipse cx={right - 8} cy="12" rx="4" ry="1.5" fill={COLORS.bed.pillowShade} />
         </>
       )}
       
       {/* Blanket folds */}
       <line x1={left + 4} y1="16" x2={right - 4} y2="16" stroke={COLORS.bed.side} strokeWidth="0.5" opacity="0.5" />
       <line x1={left + 6} y1="19" x2={right - 6} y2="19" stroke={COLORS.bed.side} strokeWidth="0.5" opacity="0.3" />
       
       {/* Legs */}
       {!connectedLeft && <rect x={left} y={frontY - 4} width="2" height="4" fill={COLORS.wood.shadow} />}
       {!connectedRight && <rect x={right - 2} y={frontY - 4} width="2" height="4" fill={COLORS.wood.shadow} />}
     </svg>
   );
 };
 
 // Sofa - isometric with tufted cushions
 export const SofaIcon = ({ 
   className,
   connectedTop = false,
   connectedBottom = false,
   connectedLeft = false,
   connectedRight = false
 }: ConnectableAssetProps) => {
   const left = connectedLeft ? 0 : 2;
   const right = connectedRight ? 32 : 30;
   const frontY = connectedBottom ? 32 : 28;
   
   return (
     <svg viewBox="0 0 32 32" className={className}>
       {/* Base */}
       <polygon points={`${left},${frontY} ${right},${frontY} ${right},24 ${left},24`} fill={COLORS.wood.front} />
       
       {/* Back cushion */}
       {!connectedTop && (
         <>
           <polygon points={`${left + (connectedLeft ? 0 : 4)},12 ${right - (connectedRight ? 0 : 4)},12 ${right - (connectedRight ? 0 : 4)},2 ${left + (connectedLeft ? 0 : 4)},2`} fill={COLORS.sofa.front} />
           <polygon points={`${left + (connectedLeft ? 0 : 4)},2 ${right - (connectedRight ? 0 : 4)},2 ${right - (connectedRight ? 0 : 6)},0 ${left + (connectedLeft ? 0 : 6)},0`} fill={COLORS.sofa.top} />
           <line x1={left + 10} y1="3" x2={left + 10} y2="10" stroke={COLORS.sofa.shadow} strokeWidth="1" opacity="0.4" />
           <line x1="16" y1="3" x2="16" y2="10" stroke={COLORS.sofa.shadow} strokeWidth="1" opacity="0.4" />
           <line x1={right - 10} y1="3" x2={right - 10} y2="10" stroke={COLORS.sofa.shadow} strokeWidth="1" opacity="0.4" />
         </>
       )}
       
       {/* Seat cushion */}
       <polygon points={`${left + (connectedLeft ? 0 : 4)},23 ${right - (connectedRight ? 0 : 4)},23 ${right - (connectedRight ? 0 : 4)},${connectedTop ? 0 : 12} ${left + (connectedLeft ? 0 : 4)},${connectedTop ? 0 : 12}`} fill={COLORS.sofa.front} />
       <polygon points={`${left + (connectedLeft ? 0 : 4)},${connectedTop ? 0 : 12} ${right - (connectedRight ? 0 : 4)},${connectedTop ? 0 : 12} ${right - (connectedRight ? 0 : 6)},${connectedTop ? 0 : 10} ${left + (connectedLeft ? 0 : 6)},${connectedTop ? 0 : 10}`} fill={COLORS.sofa.top} />
       
       {/* Arms */}
       {!connectedLeft && (
         <>
           <polygon points="2,24 8,24 8,4 2,4" fill={COLORS.sofa.side} />
           <ellipse cx="5" cy="4" rx="3" ry="2" fill={COLORS.sofa.top} />
         </>
       )}
       {!connectedRight && (
         <>
           <polygon points="24,24 30,24 30,4 24,4" fill={COLORS.sofa.side} />
           <ellipse cx="27" cy="4" rx="3" ry="2" fill={COLORS.sofa.top} />
         </>
       )}
       
       {/* Feet */}
       {!connectedLeft && <rect x="3" y="28" width="3" height="2" fill={COLORS.wood.shadow} />}
       {!connectedRight && <rect x="26" y="28" width="3" height="2" fill={COLORS.wood.shadow} />}
     </svg>
   );
 };
 
 // Table - isometric with wood grain
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
       <polygon points={`${left + 2},${top} ${right - 2},${top} ${right},${top + 4} ${left},${top + 4}`} fill={COLORS.wood.top} />
       <line x1={left + 6} y1={top + 1} x2={left + 4} y2={top + 3} stroke={COLORS.wood.front} strokeWidth="0.5" opacity="0.3" />
       <line x1={left + 14} y1={top + 1} x2={left + 12} y2={top + 3} stroke={COLORS.wood.front} strokeWidth="0.5" opacity="0.3" />
       <line x1={right - 8} y1={top + 1} x2={right - 10} y2={top + 3} stroke={COLORS.wood.front} strokeWidth="0.5" opacity="0.3" />
       
       {/* Front edge */}
       <polygon points={`${left},${top + 4} ${right},${top + 4} ${right},${top + 8} ${left},${top + 8}`} fill={COLORS.wood.front} />
       
       {/* Apron */}
       <polygon points={`${left + 2},${top + 8} ${right - 2},${top + 8} ${right - 2},${top + 12} ${left + 2},${top + 12}`} fill={COLORS.wood.side} />
       
       {/* Legs */}
       {!connectedLeft && <polygon points="4,14 8,14 7,30 5,30" fill={COLORS.wood.shadow} />}
       {!connectedRight && <polygon points="24,14 28,14 27,30 25,30" fill={COLORS.wood.shadow} />}
     </svg>
   );
 };
 
 // Desk - isometric with drawer pedestal
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
       <polygon points={`${left + 2},${top} ${right - 2},${top} ${right},${top + 3} ${left},${top + 3}`} fill={COLORS.wood.top} />
       <polygon points={`${left},${top + 3} ${right},${top + 3} ${right},${top + 6} ${left},${top + 6}`} fill={COLORS.wood.front} />
       
       {/* Drawer pedestal */}
       <rect x="20" y={top + 6} width="10" height="22" fill={COLORS.wood.front} />
       <rect x="21" y={top + 8} width="8" height="8" fill={COLORS.wood.top} />
       <rect x="23" y={top + 11} width="4" height="2" fill={COLORS.metal.handle} />
       <rect x="21" y={top + 18} width="8" height="9" fill={COLORS.wood.top} />
       <rect x="23" y={top + 21} width="4" height="2" fill={COLORS.metal.handle} />
       
       {/* Left leg */}
       {!connectedLeft && <polygon points="4,10 8,10 7,28 5,28" fill={COLORS.wood.shadow} />}
     </svg>
   );
 };
 
 // Stove - isometric with burners
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
       <polygon points={`${left + 2},2 ${right - 2},2 ${right},6 ${left},6`} fill={COLORS.metal.top} />
       <polygon points={`${left},6 ${right},6 ${right},30 ${left},30`} fill={COLORS.metal.front} />
       {!connectedRight && <polygon points="30,6 32,4 32,28 30,30" fill={COLORS.metal.side} />}
       
       {/* Burners */}
       <ellipse cx={left + 8} cy="4" rx="4" ry="2" fill={COLORS.metal.shadow} />
       <ellipse cx={left + 8} cy="4" rx="2.5" ry="1.2" fill={COLORS.metal.side} />
       <ellipse cx={right - 8} cy="4" rx="4" ry="2" fill={COLORS.metal.shadow} />
       <ellipse cx={right - 8} cy="4" rx="2.5" ry="1.2" fill={COLORS.metal.side} />
       
       {/* Knobs */}
       <circle cx={left + 5} cy="10" r="2" fill={COLORS.metal.handle} />
       <circle cx={right - 5} cy="10" r="2" fill={COLORS.metal.handle} />
       
       {/* Oven */}
       <rect x={left + 3} y="14" width={right - left - 6} height="14" fill={COLORS.metal.side} />
       <rect x={left + 5} y="16" width={right - left - 10} height="8" fill={COLORS.screen.display} />
       <rect x={left + 6} y="14" width={right - left - 12} height="2" fill={COLORS.metal.top} />
     </svg>
   );
 };
 
 // Sink - isometric with faucet
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
       <polygon points={`${left + 2},2 ${right - 2},2 ${right},6 ${left},6`} fill={COLORS.appliance.top} />
       <polygon points={`${left},6 ${right},6 ${right},30 ${left},30`} fill={COLORS.appliance.front} />
       
       {/* Basin */}
       <ellipse cx="16" cy="5" rx="8" ry="3" fill={COLORS.water.top} />
       <ellipse cx="16" cy="6" rx="6" ry="2" fill={COLORS.water.front} />
       <ellipse cx="16" cy="6" rx="1.5" ry="0.8" fill={COLORS.metal.shadow} />
       
       {/* Faucet */}
       <rect x="14" y="0" width="4" height="4" fill={COLORS.metal.front} />
       <ellipse cx="16" cy="0" rx="2" ry="1" fill={COLORS.metal.top} />
       <path d="M18 2 Q20 2 20 5" stroke={COLORS.metal.front} strokeWidth="2" fill="none" />
       
       {/* Cabinet doors */}
       <rect x={left + 2} y="16" width="10" height="12" fill={COLORS.appliance.top} />
       <rect x={right - 12} y="16" width="10" height="12" fill={COLORS.appliance.top} />
       <rect x={left + 10} y="20" width="2" height="4" fill={COLORS.metal.handle} />
       <rect x={right - 4} y="20" width="2" height="4" fill={COLORS.metal.handle} />
     </svg>
   );
 };
 
 // ==================== SINGLE ASSETS (ISOMETRIC 60°) ====================
 
 // Armchair
 export const ArmchairIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="4,28 28,28 28,24 4,24" fill={COLORS.wood.front} />
     <polygon points="8,14 24,14 24,4 8,4" fill={COLORS.armchair.front} />
     <polygon points="8,4 24,4 22,2 10,2" fill={COLORS.armchair.top} />
     <polygon points="8,23 24,23 24,14 8,14" fill={COLORS.armchair.front} />
     <polygon points="8,14 24,14 22,12 10,12" fill={COLORS.armchair.top} />
     <polygon points="2,24 8,24 8,6 2,6" fill={COLORS.armchair.side} />
     <ellipse cx="5" cy="6" rx="3" ry="2" fill={COLORS.armchair.top} />
     <polygon points="24,24 30,24 30,6 24,6" fill={COLORS.armchair.side} />
     <ellipse cx="27" cy="6" rx="3" ry="2" fill={COLORS.armchair.top} />
     <rect x="5" y="28" width="4" height="2" fill={COLORS.wood.shadow} />
     <rect x="23" y="28" width="4" height="2" fill={COLORS.wood.shadow} />
   </svg>
 );
 
 // Chair
 export const ChairIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="8,12 24,12 24,2 8,2" fill={COLORS.wood.front} />
     <polygon points="8,2 24,2 22,0 10,0" fill={COLORS.wood.top} />
     <rect x="10" y="4" width="3" height="6" fill={COLORS.wood.top} />
     <rect x="15" y="4" width="3" height="6" fill={COLORS.wood.top} />
     <rect x="20" y="4" width="3" height="6" fill={COLORS.wood.top} />
     <polygon points="6,18 26,18 28,14 4,14" fill={COLORS.wood.top} />
     <polygon points="6,18 26,18 26,20 6,20" fill={COLORS.wood.front} />
     <polygon points="7,20 10,20 9,30 8,30" fill={COLORS.wood.shadow} />
     <polygon points="22,20 25,20 24,30 23,30" fill={COLORS.wood.shadow} />
     <rect x="10" y="24" width="12" height="2" fill={COLORS.wood.side} />
   </svg>
 );
 
 // Fridge
 export const FridgeIcon = ({ className, direction = 'down' }: DirectionalAssetProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="6,2 26,2 28,4 4,4" fill={COLORS.metal.top} />
     <polygon points="4,4 28,4 28,30 4,30" fill={COLORS.appliance.front} />
     <polygon points="28,4 30,2 30,28 28,30" fill={COLORS.metal.side} />
     <rect x="5" y="5" width="22" height="8" fill={COLORS.appliance.top} />
     <rect x="24" y="7" width="2" height="4" fill={COLORS.metal.handle} />
     <rect x="5" y="13" width="22" height="2" fill={COLORS.metal.shadow} />
     <rect x="5" y="15" width="22" height="14" fill={COLORS.appliance.top} />
     <rect x="24" y="18" width="2" height="8" fill={COLORS.metal.handle} />
     <rect x="8" y="18" width="8" height="6" fill={COLORS.metal.side} />
   </svg>
 );
 
 // TV
 export const TvIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="2,4 30,4 32,6 0,6" fill={COLORS.screen.frame} />
     <polygon points="0,6 32,6 32,20 0,20" fill={COLORS.screen.frame} />
     <rect x="2" y="7" width="28" height="12" fill={COLORS.screen.display} />
     <rect x="4" y="8" width="10" height="4" fill={COLORS.screen.glow} opacity="0.3" />
     <polygon points="14,20 18,20 18,24 14,24" fill={COLORS.metal.shadow} />
     <polygon points="10,24 22,24 24,28 8,28" fill={COLORS.metal.front} />
     <polygon points="10,24 22,24 20,22 12,22" fill={COLORS.metal.top} />
   </svg>
 );
 
 // Bookshelf
 export const BookshelfIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="2,2 30,2 32,4 0,4" fill={COLORS.wood.top} />
     <polygon points="0,4 32,4 32,30 0,30" fill={COLORS.wood.front} />
     <polygon points="32,4 34,2 34,28 32,30" fill={COLORS.wood.side} />
     <rect x="2" y="10" width="28" height="2" fill={COLORS.wood.shadow} />
     <rect x="2" y="20" width="28" height="2" fill={COLORS.wood.shadow} />
     <rect x="4" y="4" width="3" height="6" fill="#C86868" />
     <rect x="7" y="5" width="4" height="5" fill="#6888B8" />
     <rect x="11" y="4" width="3" height="6" fill="#68B888" />
     <rect x="14" y="5" width="5" height="5" fill="#B8A868" />
     <rect x="19" y="4" width="3" height="6" fill="#8868B8" />
     <rect x="22" y="5" width="5" height="5" fill="#B86888" />
     <rect x="4" y="12" width="5" height="8" fill="#6B8B9B" />
     <rect x="9" y="13" width="4" height="7" fill="#9B6B6B" />
     <rect x="13" y="12" width="6" height="8" fill="#6B9B6B" />
     <rect x="19" y="13" width="4" height="7" fill="#9B9B6B" />
     <rect x="23" y="12" width="5" height="8" fill="#6B6B9B" />
     <rect x="4" y="22" width="6" height="6" fill="#8B6B8B" />
     <rect x="10" y="23" width="5" height="5" fill="#6B8B8B" />
     <rect x="15" y="22" width="4" height="6" fill="#8B8B6B" />
     <rect x="19" y="23" width="5" height="5" fill="#6B6B8B" />
     <rect x="24" y="22" width="4" height="6" fill="#8B6B6B" />
   </svg>
 );
 
 // Plant
 export const PlantIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <ellipse cx="16" cy="6" rx="4" ry="7" fill={COLORS.plant.leafFront} />
     <ellipse cx="10" cy="9" rx="3" ry="5" fill={COLORS.plant.leafFront} transform="rotate(-25 10 9)" />
     <ellipse cx="22" cy="9" rx="3" ry="5" fill={COLORS.plant.leafFront} transform="rotate(25 22 9)" />
     <ellipse cx="8" cy="13" rx="2" ry="4" fill={COLORS.plant.leafSide} transform="rotate(-35 8 13)" />
     <ellipse cx="24" cy="13" rx="2" ry="4" fill={COLORS.plant.leafSide} transform="rotate(35 24 13)" />
     <ellipse cx="15" cy="4" rx="1" ry="3" fill={COLORS.plant.leafTop} opacity="0.6" />
     <ellipse cx="16" cy="18" rx="8" ry="3" fill={COLORS.plant.potSide} />
     <polygon points="8,18 24,18 22,28 10,28" fill={COLORS.plant.pot} />
     <polygon points="8,18 10,28 12,28 10,18" fill={COLORS.plant.potSide} />
     <ellipse cx="16" cy="18" rx="7" ry="2.5" fill={COLORS.plant.pot} />
   </svg>
 );
 
 // Toilet
 export const ToiletIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="10,2 22,2 24,4 8,4" fill={COLORS.appliance.top} />
     <polygon points="8,4 24,4 24,12 8,12" fill={COLORS.appliance.front} />
     <ellipse cx="16" cy="3" rx="2" ry="1" fill={COLORS.metal.side} />
     <ellipse cx="16" cy="14" rx="10" ry="4" fill={COLORS.appliance.top} />
     <ellipse cx="16" cy="14" rx="9" ry="3" fill={COLORS.metal.top} />
     <ellipse cx="16" cy="22" rx="10" ry="6" fill={COLORS.appliance.front} />
     <ellipse cx="16" cy="20" rx="7" ry="4" fill={COLORS.water.top} />
     <ellipse cx="16" cy="19" rx="5" ry="2.5" fill={COLORS.water.front} />
     <ellipse cx="16" cy="28" rx="8" ry="2" fill={COLORS.metal.side} />
   </svg>
 );
 
 // Shower
 export const ShowerIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="2,4 30,4 32,6 0,6" fill={COLORS.water.top} opacity="0.3" />
     <polygon points="0,6 32,6 32,30 0,30" fill={COLORS.water.front} opacity="0.2" />
     <rect x="0" y="4" width="32" height="26" fill="none" stroke={COLORS.metal.front} strokeWidth="2" />
     <rect x="24" y="2" width="4" height="8" fill={COLORS.metal.front} />
     <ellipse cx="20" cy="8" rx="6" ry="3" fill={COLORS.metal.top} />
     <ellipse cx="20" cy="8" rx="5" ry="2" fill={COLORS.metal.front} />
     <ellipse cx="14" cy="16" rx="1" ry="2" fill={COLORS.water.front} />
     <ellipse cx="18" cy="18" rx="1" ry="2.5" fill={COLORS.water.front} />
     <ellipse cx="22" cy="15" rx="1" ry="2" fill={COLORS.water.front} />
     <ellipse cx="16" cy="22" rx="1" ry="2" fill={COLORS.water.front} />
     <ellipse cx="20" cy="24" rx="1" ry="2" fill={COLORS.water.front} />
     <ellipse cx="16" cy="28" rx="4" ry="1.5" fill={COLORS.metal.shadow} />
   </svg>
 );
 
 // Rug
 export const RugIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="2,16 16,6 30,16 16,26" fill={COLORS.rug.top} />
     <polygon points="4,16 16,8 28,16 16,24" fill={COLORS.rug.front} />
     <polygon points="6,16 16,10 26,16 16,22" fill={COLORS.rug.top} />
     <polygon points="12,16 16,13 20,16 16,19" fill={COLORS.rug.pattern} />
     <polygon points="8,16 10,14 12,16 10,18" fill={COLORS.rug.pattern} opacity="0.7" />
     <polygon points="20,16 22,14 24,16 22,18" fill={COLORS.rug.pattern} opacity="0.7" />
     <polygon points="14,10 16,8 18,10 16,12" fill={COLORS.rug.pattern} opacity="0.7" />
     <polygon points="14,22 16,20 18,22 16,24" fill={COLORS.rug.pattern} opacity="0.7" />
   </svg>
 );
 
 // Window
 export const WindowIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="4,2 28,2 30,4 2,4" fill={COLORS.wood.top} />
     <polygon points="2,4 30,4 30,30 2,30" fill={COLORS.wood.front} />
     <rect x="4" y="5" width="10" height="10" fill={COLORS.water.top} />
     <rect x="18" y="5" width="10" height="10" fill={COLORS.water.top} />
     <rect x="4" y="18" width="10" height="10" fill={COLORS.water.front} />
     <rect x="18" y="18" width="10" height="10" fill={COLORS.water.front} />
     <rect x="5" y="6" width="4" height="4" fill="#FFFFFF" opacity="0.3" />
     <rect x="19" y="6" width="4" height="4" fill="#FFFFFF" opacity="0.3" />
     <rect x="14" y="4" width="4" height="26" fill={COLORS.wood.shadow} />
     <rect x="2" y="15" width="28" height="3" fill={COLORS.wood.shadow} />
   </svg>
 );
 
 // Laptop
 export const LaptopIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="4,4 28,4 26,16 6,16" fill={COLORS.screen.frame} />
     <polygon points="6,5 26,5 24,15 8,15" fill={COLORS.screen.display} />
     <polygon points="9,7 17,7 16,11 10,11" fill={COLORS.screen.glow} opacity="0.4" />
     <polygon points="2,18 30,18 32,16 0,16" fill={COLORS.metal.top} />
     <polygon points="2,18 30,18 30,26 2,26" fill={COLORS.metal.front} />
     <rect x="6" y="19" width="20" height="5" fill={COLORS.metal.shadow} />
     <rect x="12" y="23" width="8" height="2" fill={COLORS.metal.side} />
   </svg>
 );
 
 // Rock
 export const RockIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <ellipse cx="16" cy="28" rx="10" ry="3" fill={COLORS.metal.shadow} opacity="0.3" />
     <polygon points="8,24 4,18 6,10 12,6 20,6 26,10 28,18 24,24" fill={COLORS.metal.front} />
     <polygon points="10,8 22,8 24,12 8,12" fill={COLORS.metal.top} />
     <polygon points="6,12 8,24 14,24 10,12" fill={COLORS.metal.side} />
   </svg>
 );
 
 // Debris
 export const DebrisIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="4,18 16,14 18,16 6,20" fill={COLORS.wood.top} />
     <polygon points="14,12 26,8 28,10 16,14" fill={COLORS.wood.front} />
     <polygon points="8,24 18,20 20,22 10,26" fill={COLORS.wood.top} />
     <polygon points="18,22 28,18 30,20 20,24" fill={COLORS.wood.side} />
     <polygon points="6,14 12,10 14,12 8,16" fill={COLORS.wood.front} />
   </svg>
 );
 
 // Door
 export const DoorIcon = ({ className }: AssetIconProps) => (
   <svg viewBox="0 0 32 32" className={className}>
     <polygon points="8,2 24,2 26,4 6,4" fill={COLORS.wood.top} />
     <polygon points="6,4 26,4 26,30 6,30" fill={COLORS.wood.front} />
     <rect x="8" y="5" width="16" height="24" fill={COLORS.wood.top} />
     <rect x="10" y="7" width="12" height="8" fill={COLORS.wood.front} />
     <rect x="10" y="7" width="12" height="1" fill={COLORS.wood.side} />
     <rect x="10" y="18" width="12" height="10" fill={COLORS.wood.front} />
     <rect x="10" y="18" width="12" height="1" fill={COLORS.wood.side} />
     <ellipse cx="20" cy="18" rx="2" ry="1.5" fill={COLORS.metal.front} />
     <ellipse cx="20" cy="18" rx="1" ry="0.8" fill={COLORS.metal.shadow} />
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