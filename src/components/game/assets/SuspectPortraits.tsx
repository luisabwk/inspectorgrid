interface PortraitProps {
  className?: string;
  color?: string;
}

// Pixel Art Portraits - 32x40 viewBox, geometric style with crisp edges

// Skin tones (pixel art friendly)
const SKIN = {
  light: { base: '#F8D8C0', shadow: '#E0B8A0', cheek: '#F0C0B0' },
  medium: { base: '#E0C0A0', shadow: '#C0A080', cheek: '#D8B090' },
  tan: { base: '#D0A878', shadow: '#B08858', cheek: '#C89868' },
  olive: { base: '#C8A070', shadow: '#A88050', cheek: '#B89060' },
  brown: { base: '#A07048', shadow: '#805830', cheek: '#906040' },
  dark: { base: '#684028', shadow: '#503018', cheek: '#603820' },
};

// Hair colors
const HAIR = {
  black: '#282828',
  brown: '#584030',
  blonde: '#D8B050',
  red: '#A84830',
  gray: '#888888',
};

// Eye colors
const EYES = {
  brown: '#483020',
  blue: '#4878A8',
  green: '#488858',
  hazel: '#786848',
};

// Background colors (pastel)
const BG = {
  mint: '#D8F0E0',
  lavender: '#E8E0F0',
  sky: '#E0E8F0',
  peach: '#F0E0D8',
  cream: '#F0ECE0',
  rose: '#F0E0E8',
  sage: '#E0E8E0',
  powder: '#E8E8F0',
};

// Portrait 1 - Alberto: Short dark messy hair, medium skin
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.mint} />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.medium.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#589868" />
    <path d="M12 33 L14 36 L18 36 L20 33" fill={SKIN.medium.base} />
    
    {/* Head */}
    <rect x="8" y="12" width="16" height="18" fill={SKIN.medium.base} />
    <rect x="6" y="14" width="2" height="12" fill={SKIN.medium.base} />
    <rect x="24" y="14" width="2" height="12" fill={SKIN.medium.base} />
    
    {/* Hair */}
    <rect x="6" y="6" width="20" height="8" fill={HAIR.black} />
    <rect x="6" y="12" width="3" height="4" fill={HAIR.black} />
    <rect x="23" y="12" width="3" height="4" fill={HAIR.black} />
    <rect x="8" y="6" width="4" height="2" fill={HAIR.black} />
    <rect x="20" y="6" width="4" height="2" fill={HAIR.black} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="18" width="4" height="3" fill="white" />
    <rect x="18" y="18" width="4" height="3" fill="white" />
    <rect x="11" y="18" width="2" height="3" fill={EYES.blue} />
    <rect x="19" y="18" width="2" height="3" fill={EYES.blue} />
    <rect x="11" y="19" width="1" height="2" fill="#181818" />
    <rect x="19" y="19" width="1" height="2" fill="#181818" />
    
    {/* Eyebrows */}
    <rect x="10" y="16" width="4" height="1" fill={HAIR.black} />
    <rect x="18" y="16" width="4" height="1" fill={HAIR.black} />
    
    {/* Nose */}
    <rect x="15" y="22" width="2" height="3" fill={SKIN.medium.shadow} />
    
    {/* Mouth */}
    <rect x="13" y="27" width="6" height="1" fill="#A08070" />
  </svg>
);

// Portrait 2 - Beatriz: Long blonde hair, light skin
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.lavender} />
    
    {/* Hair behind */}
    <rect x="4" y="6" width="24" height="34" fill={HAIR.blonde} />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.light.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#8868A8" />
    
    {/* Head */}
    <rect x="8" y="12" width="16" height="18" fill={SKIN.light.base} />
    <rect x="6" y="14" width="2" height="12" fill={SKIN.light.base} />
    <rect x="24" y="14" width="2" height="12" fill={SKIN.light.base} />
    
    {/* Hair front */}
    <rect x="6" y="6" width="20" height="8" fill={HAIR.blonde} />
    <rect x="4" y="12" width="4" height="16" fill={HAIR.blonde} />
    <rect x="24" y="12" width="4" height="16" fill={HAIR.blonde} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="18" width="4" height="3" fill="white" />
    <rect x="18" y="18" width="4" height="3" fill="white" />
    <rect x="11" y="18" width="2" height="3" fill={EYES.green} />
    <rect x="19" y="18" width="2" height="3" fill={EYES.green} />
    <rect x="11" y="19" width="1" height="2" fill="#181818" />
    <rect x="19" y="19" width="1" height="2" fill="#181818" />
    
    {/* Eyelashes */}
    <rect x="10" y="17" width="1" height="1" fill={HAIR.brown} />
    <rect x="13" y="17" width="1" height="1" fill={HAIR.brown} />
    <rect x="18" y="17" width="1" height="1" fill={HAIR.brown} />
    <rect x="21" y="17" width="1" height="1" fill={HAIR.brown} />
    
    {/* Eyebrows */}
    <rect x="10" y="16" width="4" height="1" fill="#A88040" />
    <rect x="18" y="16" width="4" height="1" fill="#A88040" />
    
    {/* Nose */}
    <rect x="15" y="22" width="2" height="2" fill={SKIN.light.shadow} />
    
    {/* Mouth */}
    <rect x="13" y="26" width="6" height="2" fill="#C08080" />
    
    {/* Cheeks */}
    <rect x="9" y="23" width="2" height="2" fill={SKIN.light.cheek} opacity="0.5" />
    <rect x="21" y="23" width="2" height="2" fill={SKIN.light.cheek} opacity="0.5" />
  </svg>
);

// Portrait 3 - Carlos: Brown hair, glasses
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.sky} />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.medium.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#4878A0" />
    <path d="M12 33 L14 36 L18 36 L20 33" fill={SKIN.medium.base} />
    
    {/* Head */}
    <rect x="8" y="12" width="16" height="18" fill={SKIN.medium.base} />
    <rect x="6" y="14" width="2" height="12" fill={SKIN.medium.base} />
    <rect x="24" y="14" width="2" height="12" fill={SKIN.medium.base} />
    
    {/* Hair */}
    <rect x="6" y="6" width="20" height="8" fill={HAIR.brown} />
    <rect x="6" y="12" width="2" height="3" fill={HAIR.brown} />
    <rect x="24" y="12" width="2" height="3" fill={HAIR.brown} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="18" width="4" height="3" fill="white" />
    <rect x="18" y="18" width="4" height="3" fill="white" />
    <rect x="11" y="18" width="2" height="3" fill={EYES.brown} />
    <rect x="19" y="18" width="2" height="3" fill={EYES.brown} />
    <rect x="11" y="19" width="1" height="2" fill="#181818" />
    <rect x="19" y="19" width="1" height="2" fill="#181818" />
    
    {/* Glasses */}
    <rect x="8" y="16" width="7" height="6" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="17" y="16" width="7" height="6" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="15" y="18" width="2" height="1" fill="#404040" />
    <rect x="6" y="18" width="2" height="1" fill="#404040" />
    <rect x="24" y="18" width="2" height="1" fill="#404040" />
    
    {/* Eyebrows */}
    <rect x="9" y="14" width="5" height="1" fill={HAIR.brown} />
    <rect x="18" y="14" width="5" height="1" fill={HAIR.brown} />
    
    {/* Nose */}
    <rect x="15" y="22" width="2" height="3" fill={SKIN.medium.shadow} />
    
    {/* Mouth */}
    <rect x="13" y="27" width="6" height="1" fill="#907070" />
  </svg>
);

// Portrait 4 - Diana: Afro hair, dark skin, earrings
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.peach} />
    
    {/* Afro */}
    <ellipse cx="16" cy="12" rx="14" ry="10" fill={HAIR.black} />
    <rect x="2" y="10" width="28" height="10" fill={HAIR.black} />
    
    {/* Earrings */}
    <circle cx="4" cy="22" r="2" fill="#E8B040" />
    <circle cx="28" cy="22" r="2" fill="#E8B040" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.brown.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#D86858" />
    
    {/* Head */}
    <rect x="8" y="14" width="16" height="16" fill={SKIN.brown.base} />
    <rect x="6" y="16" width="2" height="10" fill={SKIN.brown.base} />
    <rect x="24" y="16" width="2" height="10" fill={SKIN.brown.base} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="20" width="4" height="3" fill="white" />
    <rect x="18" y="20" width="4" height="3" fill="white" />
    <rect x="11" y="20" width="2" height="3" fill="#382818" />
    <rect x="19" y="20" width="2" height="3" fill="#382818" />
    <rect x="11" y="21" width="1" height="2" fill="#181818" />
    <rect x="19" y="21" width="1" height="2" fill="#181818" />
    
    {/* Eyebrows */}
    <rect x="10" y="18" width="4" height="1" fill={HAIR.black} />
    <rect x="18" y="18" width="4" height="1" fill={HAIR.black} />
    
    {/* Nose */}
    <rect x="14" y="23" width="4" height="2" fill={SKIN.brown.shadow} />
    
    {/* Mouth */}
    <rect x="13" y="27" width="6" height="2" fill="#804040" />
    
    {/* Cheeks */}
    <rect x="9" y="24" width="2" height="2" fill={SKIN.brown.cheek} opacity="0.4" />
    <rect x="21" y="24" width="2" height="2" fill={SKIN.brown.cheek} opacity="0.4" />
  </svg>
);

// Portrait 5 - Eduardo: Wavy brown hair, tan skin
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.sage} />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.tan.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#489898" />
    <path d="M12 33 L14 36 L18 36 L20 33" fill={SKIN.tan.base} />
    
    {/* Head */}
    <rect x="8" y="12" width="16" height="18" fill={SKIN.tan.base} />
    <rect x="6" y="14" width="2" height="12" fill={SKIN.tan.base} />
    <rect x="24" y="14" width="2" height="12" fill={SKIN.tan.base} />
    
    {/* Hair */}
    <rect x="6" y="4" width="20" height="10" fill={HAIR.brown} />
    <rect x="4" y="8" width="4" height="8" fill={HAIR.brown} />
    <rect x="24" y="8" width="4" height="8" fill={HAIR.brown} />
    {/* Wave detail */}
    <rect x="8" y="4" width="3" height="2" fill={HAIR.brown} />
    <rect x="14" y="3" width="4" height="2" fill={HAIR.brown} />
    <rect x="21" y="4" width="3" height="2" fill={HAIR.brown} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="18" width="4" height="3" fill="white" />
    <rect x="18" y="18" width="4" height="3" fill="white" />
    <rect x="11" y="18" width="2" height="3" fill={EYES.hazel} />
    <rect x="19" y="18" width="2" height="3" fill={EYES.hazel} />
    <rect x="11" y="19" width="1" height="2" fill="#181818" />
    <rect x="19" y="19" width="1" height="2" fill="#181818" />
    
    {/* Eyebrows */}
    <rect x="10" y="16" width="4" height="1" fill={HAIR.brown} />
    <rect x="18" y="16" width="4" height="1" fill={HAIR.brown} />
    
    {/* Nose */}
    <rect x="15" y="22" width="2" height="3" fill={SKIN.tan.shadow} />
    
    {/* Smile */}
    <rect x="12" y="27" width="8" height="1" fill="#907868" />
    <rect x="13" y="28" width="6" height="1" fill="#907868" />
  </svg>
);

// Portrait 6 - Vitória: Wavy brown hair, necklace
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.rose} />
    
    {/* Hair behind */}
    <rect x="4" y="6" width="24" height="34" fill={HAIR.brown} />
    
    {/* Earrings */}
    <circle cx="5" cy="24" r="1.5" fill="#E8B040" />
    <circle cx="27" cy="24" r="1.5" fill="#E8B040" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.light.base} />
    
    {/* Necklace */}
    <rect x="11" y="32" width="10" height="1" fill="#E8B040" />
    <circle cx="16" cy="34" r="2" fill="#E8B040" />
    
    {/* Shirt */}
    <rect x="6" y="35" width="20" height="5" fill="#C868A0" />
    
    {/* Head */}
    <rect x="8" y="12" width="16" height="18" fill={SKIN.light.base} />
    <rect x="6" y="14" width="2" height="12" fill={SKIN.light.base} />
    <rect x="24" y="14" width="2" height="12" fill={SKIN.light.base} />
    
    {/* Hair front */}
    <rect x="6" y="6" width="20" height="8" fill={HAIR.brown} />
    <rect x="4" y="12" width="4" height="18" fill={HAIR.brown} />
    <rect x="24" y="12" width="4" height="18" fill={HAIR.brown} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="18" width="4" height="3" fill="white" />
    <rect x="18" y="18" width="4" height="3" fill="white" />
    <rect x="11" y="18" width="2" height="3" fill={EYES.brown} />
    <rect x="19" y="18" width="2" height="3" fill={EYES.brown} />
    <rect x="11" y="19" width="1" height="2" fill="#181818" />
    <rect x="19" y="19" width="1" height="2" fill="#181818" />
    
    {/* Eyelashes */}
    <rect x="10" y="17" width="1" height="1" fill={HAIR.brown} />
    <rect x="13" y="17" width="1" height="1" fill={HAIR.brown} />
    <rect x="18" y="17" width="1" height="1" fill={HAIR.brown} />
    <rect x="21" y="17" width="1" height="1" fill={HAIR.brown} />
    
    {/* Eyebrows */}
    <rect x="10" y="16" width="4" height="1" fill={HAIR.brown} />
    <rect x="18" y="16" width="4" height="1" fill={HAIR.brown} />
    
    {/* Nose */}
    <rect x="15" y="22" width="2" height="2" fill={SKIN.light.shadow} />
    
    {/* Lips */}
    <rect x="13" y="26" width="6" height="2" fill="#C06080" />
    
    {/* Cheeks */}
    <rect x="9" y="23" width="2" height="2" fill={SKIN.light.cheek} opacity="0.5" />
    <rect x="21" y="23" width="2" height="2" fill={SKIN.light.cheek} opacity="0.5" />
  </svg>
);

// Portrait 7 - Senior: Balding gray hair, mustache
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.powder} />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.olive.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#405070" />
    <path d="M12 33 L14 36 L18 36 L20 33" fill={SKIN.olive.base} />
    
    {/* Head */}
    <rect x="8" y="10" width="16" height="20" fill={SKIN.olive.base} />
    <rect x="6" y="14" width="2" height="12" fill={SKIN.olive.base} />
    <rect x="24" y="14" width="2" height="12" fill={SKIN.olive.base} />
    
    {/* Balding hair */}
    <rect x="4" y="8" width="6" height="8" fill={HAIR.gray} />
    <rect x="22" y="8" width="6" height="8" fill={HAIR.gray} />
    <rect x="10" y="6" width="12" height="4" fill={SKIN.olive.base} />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="16" width="4" height="3" fill="white" />
    <rect x="18" y="16" width="4" height="3" fill="white" />
    <rect x="11" y="16" width="2" height="3" fill={EYES.brown} />
    <rect x="19" y="16" width="2" height="3" fill={EYES.brown} />
    <rect x="11" y="17" width="1" height="2" fill="#181818" />
    <rect x="19" y="17" width="1" height="2" fill="#181818" />
    
    {/* Eyebrows */}
    <rect x="10" y="14" width="4" height="1" fill={HAIR.gray} />
    <rect x="18" y="14" width="4" height="1" fill={HAIR.gray} />
    
    {/* Nose */}
    <rect x="14" y="20" width="4" height="3" fill={SKIN.olive.shadow} />
    
    {/* Mustache */}
    <rect x="10" y="24" width="12" height="2" fill={HAIR.gray} />
    
    {/* Mouth */}
    <rect x="13" y="27" width="6" height="1" fill="#706060" />
  </svg>
);

// Portrait 8 - Bald man with round glasses
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className}>
    <rect width="32" height="40" fill={BG.cream} />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill={SKIN.medium.base} />
    
    {/* Shirt */}
    <rect x="6" y="33" width="20" height="7" fill="#C87848" />
    <path d="M12 33 L14 36 L18 36 L20 33" fill={SKIN.medium.base} />
    
    {/* Head (bald) */}
    <rect x="6" y="6" width="20" height="24" fill={SKIN.medium.base} />
    <rect x="4" y="10" width="2" height="16" fill={SKIN.medium.base} />
    <rect x="26" y="10" width="2" height="16" fill={SKIN.medium.base} />
    
    {/* Head shine */}
    <rect x="10" y="6" width="6" height="2" fill={SKIN.medium.shadow} opacity="0.2" />
    
    {/* Eyes - 3 layer system */}
    <rect x="10" y="18" width="4" height="3" fill="white" />
    <rect x="18" y="18" width="4" height="3" fill="white" />
    <rect x="11" y="18" width="2" height="3" fill={EYES.brown} />
    <rect x="19" y="18" width="2" height="3" fill={EYES.brown} />
    <rect x="11" y="19" width="1" height="2" fill="#181818" />
    <rect x="19" y="19" width="1" height="2" fill="#181818" />
    
    {/* Round glasses */}
    <circle cx="12" cy="19" r="5" fill="none" stroke="#404040" strokeWidth="1" />
    <circle cx="20" cy="19" r="5" fill="none" stroke="#404040" strokeWidth="1" />
    <rect x="15" y="19" width="2" height="1" fill="#404040" />
    <rect x="5" y="18" width="2" height="1" fill="#404040" />
    <rect x="25" y="18" width="2" height="1" fill="#404040" />
    
    {/* Eyebrows */}
    <rect x="9" y="13" width="6" height="1" fill="#806848" />
    <rect x="17" y="13" width="6" height="1" fill="#806848" />
    
    {/* Nose */}
    <rect x="15" y="22" width="2" height="3" fill={SKIN.medium.shadow} />
    
    {/* Mouth */}
    <rect x="13" y="27" width="6" height="1" fill="#886060" />
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
