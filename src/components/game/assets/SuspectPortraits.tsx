interface PortraitProps {
  className?: string;
  color?: string;
}

// Pixel art portraits - Stardew Valley inspired style
// 16x20 grid with chunky pixels

// Portrait 1 - Alberto: Short dark messy hair, medium skin, green shirt
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#A8D8C8" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#4A7C59" />
    <rect x="4" y="16" width="8" height="1" fill="#5A8C69" />
    
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
    <rect x="6" y="9" width="1" height="2" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="2" fill="#4A3020" />
    
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
    <rect width="16" height="20" fill="#F0E8D0" />
    
    {/* Hair behind */}
    <rect x="2" y="5" width="12" height="15" fill="#C8A040" />
    <rect x="3" y="4" width="10" height="2" fill="#C8A040" />
    
    {/* Neck & Blouse */}
    <rect x="6" y="14" width="4" height="2" fill="#F0D0B0" />
    <rect x="5" y="16" width="6" height="4" fill="#7B5BA0" />
    <rect x="5" y="16" width="6" height="1" fill="#8B6BB0" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#F0D0B0" />
    <rect x="5" y="5" width="6" height="1" fill="#F0D0B0" />
    
    {/* Hair front */}
    <rect x="3" y="4" width="10" height="3" fill="#C8A040" />
    <rect x="3" y="6" width="2" height="8" fill="#C8A040" />
    <rect x="11" y="6" width="2" height="8" fill="#C8A040" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="2" fill="#4A3020" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#987030" />
    <rect x="9" y="8" width="2" height="1" fill="#987030" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#E0C0A0" />
  </svg>
);

// Portrait 3 - Carlos: Medium brown hair, glasses, red shirt
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#E0D8C8" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#A05050" />
    <rect x="4" y="16" width="8" height="1" fill="#B06060" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#D4A574" />
    <rect x="5" y="5" width="6" height="1" fill="#D4A574" />
    
    {/* Hair */}
    <rect x="3" y="4" width="10" height="3" fill="#5A4030" />
    <rect x="4" y="3" width="8" height="2" fill="#5A4030" />
    <rect x="3" y="6" width="1" height="2" fill="#5A4030" />
    <rect x="12" y="6" width="1" height="2" fill="#5A4030" />
    
    {/* Glasses */}
    <rect x="4" y="8" width="3" height="3" fill="none" stroke="#2A2A2A" strokeWidth="1" />
    <rect x="9" y="8" width="3" height="3" fill="none" stroke="#2A2A2A" strokeWidth="1" />
    <rect x="7" y="9" width="2" height="1" fill="#2A2A2A" />
    
    {/* Eyes behind glasses */}
    <rect x="5" y="9" width="1" height="1" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="1" fill="#4A3020" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#C49464" />
  </svg>
);

// Portrait 4 - Diana: Afro hair, dark skin, earrings, blue blouse
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#B8D0E0" />
    
    {/* Afro hair behind */}
    <rect x="1" y="2" width="14" height="10" fill="#3A3A3A" />
    <rect x="2" y="1" width="12" height="2" fill="#3A3A3A" />
    <rect x="0" y="4" width="2" height="6" fill="#3A3A3A" />
    <rect x="14" y="4" width="2" height="6" fill="#3A3A3A" />
    
    {/* Earrings */}
    <rect x="1" y="11" width="2" height="2" fill="#F0C040" />
    <rect x="13" y="11" width="2" height="2" fill="#F0C040" />
    
    {/* Neck & Blouse */}
    <rect x="6" y="14" width="4" height="2" fill="#8B6040" />
    <rect x="5" y="16" width="6" height="4" fill="#5080A0" />
    <rect x="5" y="16" width="6" height="1" fill="#6090B0" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#9B7050" />
    <rect x="5" y="5" width="6" height="1" fill="#9B7050" />
    
    {/* Eyes */}
    <rect x="5" y="9" width="2" height="2" fill="white" />
    <rect x="9" y="9" width="2" height="2" fill="white" />
    <rect x="6" y="9" width="1" height="2" fill="#2A1810" />
    <rect x="10" y="9" width="1" height="2" fill="#2A1810" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#2A2A2A" />
    <rect x="9" y="8" width="2" height="1" fill="#2A2A2A" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#8B6040" />
  </svg>
);

// Portrait 5 - Eduardo: Short wavy hair, medium skin, yellow shirt
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#F0E8C0" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#C0A050" />
    <rect x="4" y="16" width="8" height="1" fill="#D0B060" />
    
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
    <rect x="6" y="9" width="1" height="2" fill="#4A3020" />
    <rect x="10" y="9" width="1" height="2" fill="#4A3020" />
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#3A2818" />
    <rect x="9" y="8" width="2" height="1" fill="#3A2818" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#C49464" />
  </svg>
);

// Portrait 6 - Vitória (Victim): Wavy hair, necklace, pink blouse
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#F0D0D0" />
    
    {/* Hair behind */}
    <rect x="2" y="5" width="12" height="15" fill="#5A4030" />
    <rect x="3" y="4" width="10" height="2" fill="#5A4030" />
    
    {/* Earrings */}
    <rect x="2" y="12" width="1" height="2" fill="#F0C040" />
    <rect x="13" y="12" width="1" height="2" fill="#F0C040" />
    
    {/* Neck & Blouse */}
    <rect x="6" y="14" width="4" height="2" fill="#F0D0B0" />
    <rect x="5" y="16" width="6" height="4" fill="#A05080" />
    <rect x="5" y="16" width="6" height="1" fill="#B06090" />
    
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
    
    {/* Eyebrows */}
    <rect x="5" y="8" width="2" height="1" fill="#3A2818" />
    <rect x="9" y="8" width="2" height="1" fill="#3A2818" />
    
    {/* Nose */}
    <rect x="7" y="10" width="2" height="2" fill="#E0C0A0" />
  </svg>
);

// Portrait 7 - Senior: Balding gray hair, mustache, cyan shirt
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#D0D0D0" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#C49464" />
    <rect x="4" y="16" width="8" height="4" fill="#50A0A0" />
    <rect x="4" y="16" width="8" height="1" fill="#60B0B0" />
    
    {/* Head */}
    <rect x="4" y="6" width="8" height="8" fill="#C49464" />
    <rect x="5" y="5" width="6" height="1" fill="#C49464" />
    
    {/* Balding hair */}
    <rect x="3" y="5" width="2" height="3" fill="#808080" />
    <rect x="11" y="5" width="2" height="3" fill="#808080" />
    <rect x="5" y="4" width="6" height="2" fill="#808080" />
    
    {/* Mustache */}
    <rect x="5" y="11" width="6" height="2" fill="#606060" />
    
    {/* Eyes */}
    <rect x="5" y="8" width="2" height="2" fill="white" />
    <rect x="9" y="8" width="2" height="2" fill="white" />
    <rect x="6" y="8" width="1" height="2" fill="#4A3020" />
    <rect x="10" y="8" width="1" height="2" fill="#4A3020" />
    
    {/* Eyebrows */}
    <rect x="5" y="7" width="2" height="1" fill="#606060" />
    <rect x="9" y="7" width="2" height="1" fill="#606060" />
  </svg>
);

// Portrait 8 - Bald man: Bald with shine, round glasses, orange shirt
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 16 20" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Background */}
    <rect width="16" height="20" fill="#E0D8C0" />
    
    {/* Neck & Shirt */}
    <rect x="6" y="14" width="4" height="2" fill="#D4A574" />
    <rect x="4" y="16" width="8" height="4" fill="#C07040" />
    <rect x="4" y="16" width="8" height="1" fill="#D08050" />
    
    {/* Head - bald */}
    <rect x="3" y="4" width="10" height="10" fill="#D4A574" />
    <rect x="4" y="3" width="8" height="2" fill="#D4A574" />
    <rect x="5" y="2" width="6" height="2" fill="#D4A574" />
    
    {/* Head shine */}
    <rect x="5" y="3" width="3" height="2" fill="#E4B584" />
    <rect x="9" y="4" width="2" height="1" fill="#E4B584" />
    
    {/* Round glasses */}
    <rect x="4" y="8" width="3" height="3" fill="none" stroke="#2A2A2A" strokeWidth="1" />
    <rect x="9" y="8" width="3" height="3" fill="none" stroke="#2A2A2A" strokeWidth="1" />
    <rect x="7" y="9" width="2" height="1" fill="#2A2A2A" />
    
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
