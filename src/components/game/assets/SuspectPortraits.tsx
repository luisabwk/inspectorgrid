interface PortraitProps {
  className?: string;
  color?: string;
}

// Portrait style configurations
const PORTRAIT_STYLES = {
  // Hair colors
  hairColors: ['#2C1810', '#4A3728', '#8B4513', '#D4A574', '#1C1C1C', '#5C4033', '#A0522D'],
  // Skin tones
  skinTones: ['#FFDFC4', '#F0D5BE', '#D4A574', '#C68642', '#8D5524'],
  // Shirt colors
  shirtColors: ['#6B8E7B', '#7B68A0', '#C75B5B', '#5B8BC7', '#C7A85B', '#5BC7C7', '#C75B8B'],
};

// Base portrait component with customizable features
const BasePortrait = ({ 
  hairColor, 
  skinTone, 
  shirtColor, 
  hairStyle, 
  hasGlasses,
  hasMustache,
  className 
}: { 
  hairColor: string; 
  skinTone: string; 
  shirtColor: string; 
  hairStyle: 'short' | 'medium' | 'long' | 'bald' | 'ponytail';
  hasGlasses?: boolean;
  hasMustache?: boolean;
  className?: string;
}) => (
  <svg viewBox="0 0 64 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="64" height="80" rx="4" fill="currentColor" />
    
    {/* Shirt/Body */}
    <path d="M12 80 L12 62 Q32 54 52 62 L52 80 Z" fill={shirtColor} />
    
    {/* Neck */}
    <rect x="26" y="50" width="12" height="14" fill={skinTone} />
    
    {/* Face */}
    <ellipse cx="32" cy="38" rx="16" ry="18" fill={skinTone} />
    
    {/* Hair styles */}
    {hairStyle === 'short' && (
      <path d="M16 32 Q16 18 32 16 Q48 18 48 32 L48 28 Q48 14 32 12 Q16 14 16 28 Z" fill={hairColor} />
    )}
    {hairStyle === 'medium' && (
      <>
        <path d="M14 36 Q14 16 32 14 Q50 16 50 36 L50 28 Q50 12 32 10 Q14 12 14 28 Z" fill={hairColor} />
        <path d="M14 36 L14 42 Q14 48 18 46 L18 36 Z" fill={hairColor} />
        <path d="M50 36 L50 42 Q50 48 46 46 L46 36 Z" fill={hairColor} />
      </>
    )}
    {hairStyle === 'long' && (
      <>
        <path d="M12 36 Q12 14 32 12 Q52 14 52 36 L52 28 Q52 10 32 8 Q12 10 12 28 Z" fill={hairColor} />
        <path d="M12 36 L10 56 Q12 60 16 54 L18 36 Z" fill={hairColor} />
        <path d="M52 36 L54 56 Q52 60 48 54 L46 36 Z" fill={hairColor} />
      </>
    )}
    {hairStyle === 'ponytail' && (
      <>
        <path d="M16 32 Q16 18 32 16 Q48 18 48 32 L48 28 Q48 14 32 12 Q16 14 16 28 Z" fill={hairColor} />
        <ellipse cx="50" cy="24" rx="6" ry="8" fill={hairColor} />
      </>
    )}
    
    {/* Eyes */}
    <ellipse cx="26" cy="36" rx="3" ry="2" fill="#2C2C2C" />
    <ellipse cx="38" cy="36" rx="3" ry="2" fill="#2C2C2C" />
    <circle cx="25" cy="35" r="1" fill="white" />
    <circle cx="37" cy="35" r="1" fill="white" />
    
    {/* Glasses */}
    {hasGlasses && (
      <>
        <rect x="20" y="32" width="10" height="8" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
        <rect x="34" y="32" width="10" height="8" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
        <line x1="30" y1="36" x2="34" y2="36" stroke="#2C2C2C" strokeWidth="1.5" />
      </>
    )}
    
    {/* Mustache */}
    {hasMustache && (
      <path d="M26 46 Q32 50 38 46 Q36 48 32 48 Q28 48 26 46" fill={hairColor} />
    )}
    
    {/* Mouth */}
    <path d="M28 48 Q32 51 36 48" stroke="#8B6B5B" strokeWidth="1.5" fill="none" />
  </svg>
);

// Pre-defined character portraits for suspects
export const Portrait1 = ({ className, color = '#E8D4BE' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#2C1810"
    skinTone="#FFDFC4"
    shirtColor="#6B8E7B"
    hairStyle="short"
  />
);

export const Portrait2 = ({ className, color = '#D4E8BE' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#D4A574"
    skinTone="#F0D5BE"
    shirtColor="#7B68A0"
    hairStyle="long"
  />
);

export const Portrait3 = ({ className, color = '#BED4E8' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#4A3728"
    skinTone="#D4A574"
    shirtColor="#C75B5B"
    hairStyle="medium"
    hasGlasses
  />
);

export const Portrait4 = ({ className, color = '#E8BED4' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#1C1C1C"
    skinTone="#C68642"
    shirtColor="#5B8BC7"
    hairStyle="short"
  />
);

export const Portrait5 = ({ className, color = '#E8E8BE' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#8B4513"
    skinTone="#FFDFC4"
    shirtColor="#C7A85B"
    hairStyle="ponytail"
  />
);

export const Portrait6 = ({ className, color = '#BEE8E8' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#5C4033"
    skinTone="#8D5524"
    shirtColor="#5BC7C7"
    hairStyle="short"
    hasMustache
  />
);

export const Portrait7 = ({ className, color = '#E8D4E8' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#A0522D"
    skinTone="#F0D5BE"
    shirtColor="#C75B8B"
    hairStyle="medium"
  />
);

export const Portrait8 = ({ className, color = '#D4E8D4' }: PortraitProps) => (
  <BasePortrait 
    className={className}
    hairColor="#2C1810"
    skinTone="#D4A574"
    shirtColor="#4A7C59"
    hairStyle="bald"
    hasGlasses
    hasMustache
  />
);

// Portrait lookup map
export const PortraitMap: Record<string, React.FC<PortraitProps>> = {
  'portrait1': Portrait1,
  'portrait2': Portrait2,
  'portrait3': Portrait3,
  'portrait4': Portrait4,
  'portrait5': Portrait5,
  'portrait6': Portrait6,
  'portrait7': Portrait7,
  'portrait8': Portrait8,
};

// Get portrait by index (0-based)
export const getPortraitByIndex = (index: number): React.FC<PortraitProps> => {
  const portraits = [Portrait1, Portrait2, Portrait3, Portrait4, Portrait5, Portrait6, Portrait7, Portrait8];
  return portraits[index % portraits.length];
};
