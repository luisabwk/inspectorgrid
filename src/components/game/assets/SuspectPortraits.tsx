interface PortraitProps {
  className?: string;
  color?: string;
}

// Clean vector portraits with smooth shapes

// Skin tones
const SKIN = {
  light: { base: '#F5DCC8', shadow: '#E8C8B0', cheek: '#F0C8B8' },
  medium: { base: '#E0C0A0', shadow: '#C8A888', cheek: '#D8B0A0' },
  tan: { base: '#D0A880', shadow: '#B08860', cheek: '#C8A078' },
  olive: { base: '#C8A878', shadow: '#A88858', cheek: '#C09868' },
  brown: { base: '#A07848', shadow: '#885830', cheek: '#987048' },
  dark: { base: '#704828', shadow: '#583820', cheek: '#684028' },
};

// Hair colors
const HAIR = {
  black: '#2A2A2A',
  brown: '#5A4030',
  blonde: '#D4B050',
  red: '#A04830',
  gray: '#909090',
};

// Eye colors
const EYES = {
  brown: '#5A4030',
  blue: '#5080A0',
  green: '#508060',
  hazel: '#807050',
};

// Background colors (pastel)
const BG = {
  mint: '#E0F4E8',
  lavender: '#F0E8F8',
  sky: '#E8F0F8',
  peach: '#F8E8E0',
  cream: '#F8F4E8',
  rose: '#F8E8F0',
  sage: '#E8F0E8',
  powder: '#F0F0F8',
};

// Portrait 1 - Alberto: Short dark messy hair, medium skin
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.mint} />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.medium.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#5A9C69" />
    <path d="M15 40 L17 44 L23 44 L25 40" fill={SKIN.medium.base} />
    
    {/* Head */}
    <ellipse cx="20" cy="24" rx="12" ry="14" fill={SKIN.medium.base} />
    
    {/* Hair */}
    <path d="M8 18 Q8 8 20 8 Q32 8 32 18 L32 22 Q28 16 20 16 Q12 16 8 22 Z" fill={HAIR.black} />
    <ellipse cx="10" cy="20" rx="3" ry="4" fill={HAIR.black} />
    <ellipse cx="30" cy="20" rx="3" ry="4" fill={HAIR.black} />
    
    {/* Eyes */}
    <ellipse cx="15" cy="24" rx="3" ry="2" fill="white" />
    <ellipse cx="25" cy="24" rx="3" ry="2" fill="white" />
    <circle cx="15" cy="24" r="1.5" fill={EYES.blue} />
    <circle cx="25" cy="24" r="1.5" fill={EYES.blue} />
    <circle cx="15" cy="24" r="0.8" fill="#1A1A1A" />
    <circle cx="25" cy="24" r="0.8" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M12 21 Q15 20 18 21" stroke={HAIR.black} strokeWidth="1" fill="none" />
    <path d="M22 21 Q25 20 28 21" stroke={HAIR.black} strokeWidth="1" fill="none" />
    
    {/* Nose */}
    <path d="M20 26 L19 30 L21 30" stroke={SKIN.medium.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M17 33 Q20 35 23 33" stroke="#A08080" strokeWidth="1" fill="none" />
  </svg>
);

// Portrait 2 - Beatriz: Long blonde hair, light skin
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.lavender} />
    
    {/* Hair behind */}
    <path d="M6 14 Q6 8 20 8 Q34 8 34 14 L34 50 L6 50 Z" fill={HAIR.blonde} />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.light.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#8B6BB0" />
    
    {/* Head */}
    <ellipse cx="20" cy="24" rx="11" ry="13" fill={SKIN.light.base} />
    
    {/* Hair front */}
    <path d="M9 16 Q9 10 20 10 Q31 10 31 16 L31 20 Q27 18 20 18 Q13 18 9 20 Z" fill={HAIR.blonde} />
    <path d="M8 16 L8 32 Q8 28 10 24 L10 18 Q10 16 8 16" fill={HAIR.blonde} />
    <path d="M32 16 L32 32 Q32 28 30 24 L30 18 Q30 16 32 16" fill={HAIR.blonde} />
    
    {/* Eyes */}
    <ellipse cx="15" cy="24" rx="3" ry="2.5" fill="white" />
    <ellipse cx="25" cy="24" rx="3" ry="2.5" fill="white" />
    <circle cx="15" cy="24" r="1.5" fill={EYES.green} />
    <circle cx="25" cy="24" r="1.5" fill={EYES.green} />
    <circle cx="15" cy="24" r="0.8" fill="#1A1A1A" />
    <circle cx="25" cy="24" r="0.8" fill="#1A1A1A" />
    
    {/* Eyelashes */}
    <path d="M12 22 L11 21 M14 21.5 L14 20.5 M16 22 L17 21" stroke={HAIR.brown} strokeWidth="0.5" />
    <path d="M22 22 L21 21 M24 21.5 L24 20.5 M26 22 L27 21" stroke={HAIR.brown} strokeWidth="0.5" />
    
    {/* Eyebrows */}
    <path d="M12 21 Q15 20 18 21" stroke="#A08030" strokeWidth="0.8" fill="none" />
    <path d="M22 21 Q25 20 28 21" stroke="#A08030" strokeWidth="0.8" fill="none" />
    
    {/* Nose */}
    <path d="M20 26 L19 29 L21 29" stroke={SKIN.light.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M17 32 Q20 34 23 32" stroke="#C08080" strokeWidth="1.2" fill="none" />
    
    {/* Cheeks */}
    <ellipse cx="12" cy="28" rx="2" ry="1" fill={SKIN.light.cheek} opacity="0.5" />
    <ellipse cx="28" cy="28" rx="2" ry="1" fill={SKIN.light.cheek} opacity="0.5" />
  </svg>
);

// Portrait 3 - Carlos: Brown hair, glasses
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.sky} />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.medium.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#5080A0" />
    <path d="M15 40 L17 44 L23 44 L25 40" fill={SKIN.medium.base} />
    
    {/* Head */}
    <ellipse cx="20" cy="24" rx="12" ry="14" fill={SKIN.medium.base} />
    
    {/* Hair */}
    <path d="M8 18 Q8 8 20 8 Q32 8 32 18 L32 20 Q28 14 20 14 Q12 14 8 20 Z" fill={HAIR.brown} />
    <ellipse cx="9" cy="19" rx="2" ry="3" fill={HAIR.brown} />
    <ellipse cx="31" cy="19" rx="2" ry="3" fill={HAIR.brown} />
    
    {/* Eyes */}
    <ellipse cx="15" cy="24" rx="2.5" ry="2" fill="white" />
    <ellipse cx="25" cy="24" rx="2.5" ry="2" fill="white" />
    <circle cx="15" cy="24" r="1.3" fill={EYES.brown} />
    <circle cx="25" cy="24" r="1.3" fill={EYES.brown} />
    <circle cx="15" cy="24" r="0.6" fill="#1A1A1A" />
    <circle cx="25" cy="24" r="0.6" fill="#1A1A1A" />
    
    {/* Glasses */}
    <rect x="11" y="21" width="8" height="6" rx="1" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="21" y="21" width="8" height="6" rx="1" fill="none" stroke="#404040" strokeWidth="1" />
    <path d="M19 24 L21 24" stroke="#404040" strokeWidth="1" />
    <path d="M11 24 L8 23" stroke="#404040" strokeWidth="0.8" />
    <path d="M29 24 L32 23" stroke="#404040" strokeWidth="0.8" />
    
    {/* Eyebrows */}
    <path d="M12 19 Q15 18 18 19" stroke={HAIR.brown} strokeWidth="1" fill="none" />
    <path d="M22 19 Q25 18 28 19" stroke={HAIR.brown} strokeWidth="1" fill="none" />
    
    {/* Nose */}
    <path d="M20 26 L19 30 L21 30" stroke={SKIN.medium.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M17 34 L23 34" stroke="#A08080" strokeWidth="1" fill="none" />
  </svg>
);

// Portrait 4 - Diana: Afro hair, dark skin, earrings
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.peach} />
    
    {/* Afro */}
    <ellipse cx="20" cy="18" rx="16" ry="14" fill={HAIR.black} />
    
    {/* Earrings */}
    <circle cx="5" cy="28" r="2" fill="#F0C040" />
    <circle cx="35" cy="28" r="2" fill="#F0C040" />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.brown.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#E07060" />
    
    {/* Head */}
    <ellipse cx="20" cy="26" rx="10" ry="12" fill={SKIN.brown.base} />
    
    {/* Eyes */}
    <ellipse cx="16" cy="25" rx="2.5" ry="2" fill="white" />
    <ellipse cx="24" cy="25" rx="2.5" ry="2" fill="white" />
    <circle cx="16" cy="25" r="1.3" fill="#3A2818" />
    <circle cx="24" cy="25" r="1.3" fill="#3A2818" />
    <circle cx="16" cy="25" r="0.6" fill="#1A1A1A" />
    <circle cx="24" cy="25" r="0.6" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M14 22 Q16 21 18 22" stroke={HAIR.black} strokeWidth="1" fill="none" />
    <path d="M22 22 Q24 21 26 22" stroke={HAIR.black} strokeWidth="1" fill="none" />
    
    {/* Nose */}
    <ellipse cx="20" cy="29" rx="2" ry="1.5" fill={SKIN.brown.shadow} />
    
    {/* Mouth */}
    <path d="M17 33 Q20 35 23 33" stroke="#804040" strokeWidth="1.2" fill="none" />
    
    {/* Cheeks */}
    <ellipse cx="13" cy="29" rx="1.5" ry="1" fill={SKIN.brown.cheek} opacity="0.4" />
    <ellipse cx="27" cy="29" rx="1.5" ry="1" fill={SKIN.brown.cheek} opacity="0.4" />
  </svg>
);

// Portrait 5 - Eduardo: Wavy brown hair, medium skin
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.sage} />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.tan.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#50A0A0" />
    <path d="M15 40 L17 44 L23 44 L25 40" fill={SKIN.tan.base} />
    
    {/* Head */}
    <ellipse cx="20" cy="24" rx="12" ry="14" fill={SKIN.tan.base} />
    
    {/* Hair */}
    <path d="M8 16 Q8 6 20 6 Q32 6 32 16 L32 22 Q28 14 20 14 Q12 14 8 22 Z" fill={HAIR.brown} />
    <path d="M10 10 Q12 6 16 8" fill={HAIR.brown} />
    <path d="M30 10 Q28 6 24 8" fill={HAIR.brown} />
    <ellipse cx="9" cy="18" rx="2" ry="4" fill={HAIR.brown} />
    <ellipse cx="31" cy="18" rx="2" ry="4" fill={HAIR.brown} />
    
    {/* Eyes */}
    <ellipse cx="15" cy="24" rx="3" ry="2" fill="white" />
    <ellipse cx="25" cy="24" rx="3" ry="2" fill="white" />
    <circle cx="15" cy="24" r="1.5" fill={EYES.hazel} />
    <circle cx="25" cy="24" r="1.5" fill={EYES.hazel} />
    <circle cx="15" cy="24" r="0.8" fill="#1A1A1A" />
    <circle cx="25" cy="24" r="0.8" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M12 21 Q15 20 18 21" stroke={HAIR.brown} strokeWidth="1" fill="none" />
    <path d="M22 21 Q25 20 28 21" stroke={HAIR.brown} strokeWidth="1" fill="none" />
    
    {/* Nose */}
    <path d="M20 26 L19 30 L21 30" stroke={SKIN.tan.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Smile */}
    <path d="M16 33 Q20 36 24 33" stroke="#A08080" strokeWidth="1" fill="none" />
  </svg>
);

// Portrait 6 - Vitória: Wavy brown hair, necklace
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.rose} />
    
    {/* Hair behind */}
    <path d="M6 14 Q6 8 20 8 Q34 8 34 14 L34 50 L6 50 Z" fill={HAIR.brown} />
    
    {/* Earrings */}
    <circle cx="7" cy="30" r="1.5" fill="#F0C040" />
    <circle cx="33" cy="30" r="1.5" fill="#F0C040" />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.light.base} />
    
    {/* Necklace */}
    <path d="M14 40 Q20 44 26 40" stroke="#F0C040" strokeWidth="1.5" fill="none" />
    <circle cx="20" cy="43" r="2" fill="#F0C040" />
    
    {/* Shirt */}
    <path d="M10 45 Q12 42 15 42 L25 42 Q28 42 30 45 L32 50 L8 50 Z" fill="#D070A0" />
    
    {/* Head */}
    <ellipse cx="20" cy="24" rx="11" ry="13" fill={SKIN.light.base} />
    
    {/* Hair front */}
    <path d="M9 16 Q9 10 20 10 Q31 10 31 16 L31 22 Q27 16 20 16 Q13 16 9 22 Z" fill={HAIR.brown} />
    <path d="M8 16 L8 34 Q8 28 10 24 L10 18 Q10 16 8 16" fill={HAIR.brown} />
    <path d="M32 16 L32 34 Q32 28 30 24 L30 18 Q30 16 32 16" fill={HAIR.brown} />
    
    {/* Eyes */}
    <ellipse cx="15" cy="24" rx="3" ry="2.5" fill="white" />
    <ellipse cx="25" cy="24" rx="3" ry="2.5" fill="white" />
    <circle cx="15" cy="24" r="1.5" fill={EYES.brown} />
    <circle cx="25" cy="24" r="1.5" fill={EYES.brown} />
    <circle cx="15" cy="24" r="0.8" fill="#1A1A1A" />
    <circle cx="25" cy="24" r="0.8" fill="#1A1A1A" />
    
    {/* Eyelashes */}
    <path d="M12 22 L11 21 M14 21.5 L14 20.5 M16 22 L17 21" stroke={HAIR.brown} strokeWidth="0.5" />
    <path d="M22 22 L21 21 M24 21.5 L24 20.5 M26 22 L27 21" stroke={HAIR.brown} strokeWidth="0.5" />
    
    {/* Eyebrows */}
    <path d="M12 21 Q15 20 18 21" stroke={HAIR.brown} strokeWidth="0.8" fill="none" />
    <path d="M22 21 Q25 20 28 21" stroke={HAIR.brown} strokeWidth="0.8" fill="none" />
    
    {/* Nose */}
    <path d="M20 26 L19 29 L21 29" stroke={SKIN.light.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Lips */}
    <path d="M17 32 Q20 34 23 32" stroke="#C06080" strokeWidth="1.5" fill="none" />
    
    {/* Cheeks */}
    <ellipse cx="12" cy="28" rx="2" ry="1" fill={SKIN.light.cheek} opacity="0.5" />
    <ellipse cx="28" cy="28" rx="2" ry="1" fill={SKIN.light.cheek} opacity="0.5" />
  </svg>
);

// Portrait 7 - Senior: Balding gray hair, mustache
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.powder} />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.olive.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#405070" />
    <path d="M15 40 L17 44 L23 44 L25 40" fill={SKIN.olive.base} />
    
    {/* Head */}
    <ellipse cx="20" cy="24" rx="12" ry="14" fill={SKIN.olive.base} />
    
    {/* Balding hair */}
    <path d="M8 20 Q8 12 14 12 L14 18 Q10 18 8 20" fill={HAIR.gray} />
    <path d="M32 20 Q32 12 26 12 L26 18 Q30 18 32 20" fill={HAIR.gray} />
    <path d="M14 12 Q20 10 26 12 L26 14 Q20 12 14 14 Z" fill={SKIN.olive.base} />
    
    {/* Eyes */}
    <ellipse cx="15" cy="22" rx="2.5" ry="2" fill="white" />
    <ellipse cx="25" cy="22" rx="2.5" ry="2" fill="white" />
    <circle cx="15" cy="22" r="1.3" fill={EYES.brown} />
    <circle cx="25" cy="22" r="1.3" fill={EYES.brown} />
    <circle cx="15" cy="22" r="0.6" fill="#1A1A1A" />
    <circle cx="25" cy="22" r="0.6" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M12 19 Q15 18 18 19" stroke={HAIR.gray} strokeWidth="1.2" fill="none" />
    <path d="M22 19 Q25 18 28 19" stroke={HAIR.gray} strokeWidth="1.2" fill="none" />
    
    {/* Nose */}
    <path d="M20 24 L18 29 L22 29" stroke={SKIN.olive.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Mustache */}
    <path d="M13 31 Q20 34 27 31 Q20 32 13 31" fill={HAIR.gray} />
    
    {/* Mouth */}
    <path d="M17 34 L23 34" stroke="#806060" strokeWidth="1" fill="none" />
  </svg>
);

// Portrait 8 - Bald man with glasses
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 40 50" className={className}>
    <rect width="40" height="50" fill={BG.cream} />
    
    {/* Neck */}
    <rect x="15" y="35" width="10" height="8" fill={SKIN.medium.base} />
    
    {/* Shirt */}
    <path d="M10 43 Q12 40 15 40 L25 40 Q28 40 30 43 L32 50 L8 50 Z" fill="#D08050" />
    <path d="M15 40 L17 44 L23 44 L25 40" fill={SKIN.medium.base} />
    
    {/* Head (bald) */}
    <ellipse cx="20" cy="22" rx="13" ry="15" fill={SKIN.medium.base} />
    
    {/* Head shine */}
    <ellipse cx="16" cy="12" rx="4" ry="2" fill={SKIN.medium.shadow} opacity="0.2" />
    
    {/* Eyes */}
    <ellipse cx="15" cy="24" rx="2.5" ry="2" fill="white" />
    <ellipse cx="25" cy="24" rx="2.5" ry="2" fill="white" />
    <circle cx="15" cy="24" r="1.3" fill={EYES.brown} />
    <circle cx="25" cy="24" r="1.3" fill={EYES.brown} />
    <circle cx="15" cy="24" r="0.6" fill="#1A1A1A" />
    <circle cx="25" cy="24" r="0.6" fill="#1A1A1A" />
    
    {/* Round glasses */}
    <circle cx="15" cy="24" r="5" fill="none" stroke="#404040" strokeWidth="1" />
    <circle cx="25" cy="24" r="5" fill="none" stroke="#404040" strokeWidth="1" />
    <path d="M20 24 L20 24" stroke="#404040" strokeWidth="1" />
    <path d="M10 24 L7 22" stroke="#404040" strokeWidth="0.8" />
    <path d="M30 24 L33 22" stroke="#404040" strokeWidth="0.8" />
    
    {/* Eyebrows */}
    <path d="M11 18 Q15 17 19 18" stroke="#8B7355" strokeWidth="1" fill="none" />
    <path d="M21 18 Q25 17 29 18" stroke="#8B7355" strokeWidth="1" fill="none" />
    
    {/* Nose */}
    <path d="M20 26 L19 30 L21 30" stroke={SKIN.medium.shadow} strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M17 34 Q20 35 23 34" stroke="#906060" strokeWidth="1" fill="none" />
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
