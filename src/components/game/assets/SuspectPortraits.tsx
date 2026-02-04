interface PortraitProps {
  className?: string;
  color?: string;
}

// Pixel art portraits - Clean pastel style
// 16x20 grid with detailed pixels

// Portrait 1 - Alberto: Short dark messy hair, medium skin, green shirt
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#E0F0E8" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#5A9C69" />
    <rect x="4" y="16" width="8" height="1" fill="#6AAC79" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#D4A574" />
    <rect x="5" y="5" width="6" height="1" fill="#D4A574" />
    
    {/* Hair - messy dark */}
    <rect x="3" y="4" width="10" height="3" fill="#3A3A3A" />
    <rect x="4" y="3" width="8" height="2" fill="#3A3A3A" />
    <rect x="5" y="2" width="2" height="2" fill="#3A3A3A" />
    <rect x="9" y="2" width="2" height="2" fill="#3A3A3A" />
    <rect x="3" y="6" width="1" height="3" fill="#3A3A3A" />
    <rect x="12" y="6" width="1" height="3" fill="#3A3A3A" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#4A6080" />
    <rect x="10" y="9" width="1" height="2" fill="#4A6080" />
    <rect x="6" y="10" width="1" height="1" fill="#1A1A1A" />
    <rect x="10" y="10" width="1" height="1" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#2A2A2A" />
    <rect x="9" y="8" width="2" height="1" fill="#2A2A2A" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#C49464" />
  </svg>
);

// Portrait 2 - Beatriz: Long blonde hair, light skin, purple blouse
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#F0E8F4" />
    
    {/* Hair behind */}
    <rect x="2" y="5" width="12" height="15" fill="#D4B050" />
    <rect x="3" y="4" width="10" height="2" fill="#D4B050" />
    
    {/* Neck & Blouse */}
    <rect x="6" y="14" width="4" height="2" fill="#F0D0B0" />
    <rect x="5" y="16" width="6" height="4" fill="#8B6BB0" />
    <rect x="5" y="16" width="6" height="1" fill="#9B7BC0" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#F0D0B0" />
    <rect x="5" y="5" width="6" height="1" fill="#F0D0B0" />
    
    {/* Hair front */}
    <rect x="3" y="4" width="10" height="3" fill="#D4B050" />
    <rect x="3" y="6" width="2" height="8" fill="#D4B050" />
    <rect x="11" y="6" width="2" height="8" fill="#D4B050" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#5A8050" />
    <rect x="10" y="9" width="1" height="2" fill="#5A8050" />
    <rect x="6" y="10" width="1" height="1" fill="#1A1A1A" />
    <rect x="10" y="10" width="1" height="1" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#A08030" />
    <rect x="9" y="8" width="2" height="1" fill="#A08030" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#E0C0A0" />
  </svg>
);

// Portrait 3 - Carlos: Medium brown hair, glasses, blue shirt
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#E8F0F8" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#5080A0" />
    <rect x="4" y="16" width="8" height="1" fill="#6090B0" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#D4A574" />
    <rect x="5" y="5" width="6" height="1" fill="#D4A574" />
    
    {/* Hair */}
    <rect x="3" y="4" width="10" height="3" fill="#5A4030" />
    <rect x="4" y="3" width="8" height="2" fill="#5A4030" />
    <rect x="3" y="6" width="1" height="2" fill="#5A4030" />
    <rect x="12" y="6" width="1" height="2" fill="#5A4030" />
    
    {/* Glasses */}
    <rect x="4" y="8" width="3" height="3" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="9" y="8" width="3" height="3" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="7" y="9" width="2" height="1" fill="#404040" />
    
    {/* Eyes behind glasses */}
    <rect x="5" y="9" width="1" height="1" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="1" fill="#4A3020" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#C49464" />
  </svg>
);

// Portrait 4 - Diana: Afro hair, dark skin, earrings, coral blouse
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#F8E8E0" />
    
    {/* Afro hair behind */}
    <rect x="1" y="2" width="14" height="10" fill="#2A2A2A" />
    <rect x="2" y="1" width="12" height="2" fill="#2A2A2A" />
    <rect x="0" y="4" width="2" height="6" fill="#2A2A2A" />
    <rect x="14" y="4" width="2" height="6" fill="#2A2A2A" />
    
    {/* Earrings */}
    <rect x="1" y="11" width="2" height="2" fill="#F0C040" />
    <rect x="13" y="11" width="2" height="2" fill="#F0C040" />
    
    {/* Neck & Blouse */}
    <rect x="6" y="14" width="4" height="2" fill="#8B6040" />
    <rect x="5" y="16" width="6" height="4" fill="#E07060" />
    <rect x="5" y="16" width="6" height="1" fill="#F08070" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#9B7050" />
    <rect x="5" y="5" width="6" height="1" fill="#9B7050" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#3A2818" />
    <rect x="10" y="9" width="1" height="2" fill="#3A2818" />
    <rect x="6" y="10" width="1" height="1" fill="#1A1A1A" />
    <rect x="10" y="10" width="1" height="1" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#2A2A2A" />
    <rect x="9" y="8" width="2" height="1" fill="#2A2A2A" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#8B6040" />
  </svg>
);

// Portrait 5 - Eduardo: Short wavy hair, medium skin, teal shirt
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#E0F8F0" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#50A0A0" />
    <rect x="4" y="16" width="8" height="1" fill="#60B0B0" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#D4A574" />
    <rect x="5" y="5" width="6" height="1" fill="#D4A574" />
    
    {/* Hair - wavy */}
    <rect x="3" y="4" width="10" height="3" fill="#5A4030" />
    <rect x="4" y="3" width="8" height="2" fill="#5A4030" />
    <rect x="5" y="2" width="6" height="2" fill="#5A4030" />
    <rect x="3" y="6" width="1" height="2" fill="#5A4030" />
    <rect x="12" y="6" width="1" height="2" fill="#5A4030" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#4A6050" />
    <rect x="10" y="9" width="1" height="2" fill="#4A6050" />
    <rect x="6" y="10" width="1" height="1" fill="#1A1A1A" />
    <rect x="10" y="10" width="1" height="1" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#3A2818" />
    <rect x="9" y="8" width="2" height="1" fill="#3A2818" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#C49464" />
  </svg>
);

// Portrait 6 - Vitória: Wavy hair, necklace, pink blouse
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#FFE8F0" />
    
    {/* Hair behind */}
    <rect x="2" y="5" width="12" height="15" fill="#5A4030" />
    <rect x="3" y="4" width="10" height="2" fill="#5A4030" />
    
    {/* Earrings */}
    <rect x="2" y="12" width="1" height="2" fill="#F0C040" />
    <rect x="13" y="12" width="1" height="2" fill="#F0C040" />
    
    {/* Neck & Blouse */}
    <rect x="6" y="14" width="4" height="2" fill="#F0D0B0" />
    <rect x="5" y="16" width="6" height="4" fill="#D070A0" />
    <rect x="5" y="16" width="6" height="1" fill="#E080B0" />
    
    {/* Necklace */}
    <rect x="6" y="15" width="4" height="1" fill="#F0C040" />
    <rect x="7" y="16" width="2" height="1" fill="#F0C040" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#F0D0B0" />
    <rect x="5" y="5" width="6" height="1" fill="#F0D0B0" />
    
    {/* Hair front - wavy */}
    <rect x="3" y="4" width="10" height="3" fill="#5A4030" />
    <rect x="3" y="6" width="2" height="6" fill="#5A4030" />
    <rect x="11" y="6" width="2" height="6" fill="#5A4030" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="2" fill="#4A3020" />
    <rect x="6" y="10" width="1" height="1" fill="#1A1A1A" />
    <rect x="10" y="10" width="1" height="1" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#3A2818" />
    <rect x="9" y="8" width="2" height="1" fill="#3A2818" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#E0C0A0" />
  </svg>
);

// Portrait 7 - Senior: Balding gray hair, mustache, navy shirt
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#E8E8F0" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#C49464" />
    <rect x="4" y="16" width="8" height="4" fill="#405070" />
    <rect x="4" y="16" width="8" height="1" fill="#506080" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#C49464" />
    <rect x="5" y="5" width="6" height="1" fill="#C49464" />
    
    {/* Balding hair */}
    <rect x="3" y="5" width="2" height="3" fill="#909090" />
    <rect x="11" y="5" width="2" height="3" fill="#909090" />
    <rect x="5" y="4" width="6" height="2" fill="#909090" />
    
    {/* Mustache */}
    <rect x="5" y="11" width="6" height="2" fill="#707070" />
    
    {/* Eyes */}
    <rect x="5" y="8" width="2" height="2" fill="white" />
    <rect x="9" y="8" width="2" height="2" fill="white" />
    <rect x="6" y="8" width="1" height="2" fill="#4A3020" />
    <rect x="10" y="8" width="1" height="2" fill="#4A3020" />
    <rect x="6" y="9" width="1" height="1" fill="#1A1A1A" />
    <rect x="10" y="9" width="1" height="1" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <rect x="5" y="7" width="2" height="1" fill="#707070" />
    <rect x="9" y="7" width="2" height="1" fill="#707070" />
  </svg>
);

// Portrait 8 - Bald man: Bald with shine, round glasses, orange shirt
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#FFF0E0" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#D08050" />
    <rect x="4" y="16" width="8" height="1" fill="#E09060" />
    
    {/* Head - bald */}
    <rect x="3" y="4" width="10" height="10" fill="#D4A574" />
    <rect x="4" y="3" width="8" height="2" fill="#D4A574" />
    <rect x="5" y="2" width="6" height="2" fill="#D4A574" />
    
    {/* Head shine */}
    <rect x="5" y="3" width="3" height="2" fill="#E4B584" />
    <rect x="9" y="4" width="2" height="1" fill="#E4B584" />
    
    {/* Round glasses */}
    <rect x="4" y="8" width="3" height="3" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="9" y="8" width="3" height="3" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="7" y="9" width="2" height="1" fill="#404040" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="1" height="1" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="1" fill="#4A3020" />
    
    {/* Eyebrows */}
    <rect x="4" y="7" width="3" height="1" fill="#8B7355" />
    <rect x="9" y="7" width="3" height="1" fill="#8B7355" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#C49464" />
  </svg>
);

// Map portrait IDs to components
export const PortraitMap: Record<string, React.FC<PortraitProps>> = {
  portrait1: Portrait1,
  portrait2: Portrait2,
  portrait3: Portrait3,
  portrait4: Portrait4,
  portrait5: Portrait5,
  portrait6: Portrait6,
  portrait7: Portrait7,
  portrait8: Portrait8,
};
