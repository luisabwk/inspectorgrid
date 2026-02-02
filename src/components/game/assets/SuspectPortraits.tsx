interface PortraitProps {
  className?: string;
  color?: string;
}

// Minimalist flat portraits inspired by reference
// Style: Solid colors, geometric hair shapes, minimal facial features

// Alberto - Homem maduro, cabelo curto escuro, camisa verde
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#E8D5C4" />
    
    {/* Neck */}
    <rect x="11" y="28" width="10" height="6" fill="#D4A574" />
    
    {/* Shirt collar */}
    <path d="M8 34 L11 28 L16 32 L21 28 L24 34 L24 40 L8 40 Z" fill="#4A7C59" />
    
    {/* Head - oval */}
    <ellipse cx="16" cy="20" rx="9" ry="10" fill="#E8C4A0" />
    
    {/* Hair - short masculine, dark */}
    <path d="M7 18 Q7 10 16 8 Q25 10 25 18 L25 14 Q25 8 16 6 Q7 8 7 14 Z" fill="#2C1810" />
    
    {/* Simple eyes - just dots */}
    <circle cx="12" cy="20" r="1.2" fill="#2C1810" />
    <circle cx="20" cy="20" r="1.2" fill="#2C1810" />
  </svg>
);

// Beatriz - Mulher jovem, cabelo longo loiro, blusa roxa
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F5E6D3" />
    
    {/* Long hair behind */}
    <path d="M4 14 Q3 30 10 40 L22 40 Q29 30 28 14 Z" fill="#D4A574" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#F0D4B8" />
    
    {/* Shirt */}
    <path d="M10 32 L16 36 L22 32 L22 40 L10 40 Z" fill="#7B68A0" />
    
    {/* Head */}
    <ellipse cx="16" cy="20" rx="8" ry="9" fill="#FDE8D8" />
    
    {/* Hair - long flowing */}
    <path d="M8 16 Q8 8 16 6 Q24 8 24 16 L24 12 Q24 5 16 4 Q8 5 8 12 Z" fill="#E8C080" />
    {/* Side hair */}
    <path d="M8 16 L6 28 Q8 30 10 28 L10 18 Z" fill="#D4A574" />
    <path d="M24 16 L26 28 Q24 30 22 28 L22 18 Z" fill="#D4A574" />
    {/* Bangs */}
    <path d="M10 14 Q12 10 16 12 Q20 10 22 14 L22 12 Q20 8 16 10 Q12 8 10 12 Z" fill="#E8C080" />
    
    {/* Simple eyes */}
    <circle cx="12" cy="20" r="1" fill="#2C1810" />
    <circle cx="20" cy="20" r="1" fill="#2C1810" />
  </svg>
);

// Carlos - Homem com óculos, cabelo médio castanho, camisa vermelha
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#E0D4C8" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#D4A574" />
    
    {/* Shirt */}
    <path d="M9 34 L12 30 L16 33 L20 30 L23 34 L23 40 L9 40 Z" fill="#C75B5B" />
    
    {/* Head */}
    <ellipse cx="16" cy="20" rx="9" ry="10" fill="#E0B898" />
    
    {/* Hair - medium wavy */}
    <path d="M7 17 Q7 9 16 7 Q25 9 25 17 L25 12 Q25 6 16 5 Q7 6 7 12 Z" fill="#4A3728" />
    {/* Side hair */}
    <path d="M7 17 L6 22 Q8 23 9 21 L9 17 Z" fill="#4A3728" />
    <path d="M25 17 L26 22 Q24 23 23 21 L23 17 Z" fill="#4A3728" />
    
    {/* Glasses - simple rectangles */}
    <rect x="9" y="18" width="6" height="4" rx="0.5" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <rect x="17" y="18" width="6" height="4" rx="0.5" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <line x1="15" y1="20" x2="17" y2="20" stroke="#2C2C2C" strokeWidth="1.2" />
    
    {/* Eyes behind glasses */}
    <circle cx="12" cy="20" r="0.8" fill="#2C1810" />
    <circle cx="20" cy="20" r="0.8" fill="#2C1810" />
  </svg>
);

// Diana - Mulher pele escura, cabelo curto cacheado, blusa azul
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#D4E5F0" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#C68642" />
    
    {/* Shirt */}
    <path d="M10 32 L16 36 L22 32 L22 40 L10 40 Z" fill="#5B8BC7" />
    
    {/* Earrings */}
    <circle cx="7" cy="24" r="1.5" fill="#FFD700" />
    <circle cx="25" cy="24" r="1.5" fill="#FFD700" />
    
    {/* Head */}
    <ellipse cx="16" cy="20" rx="8" ry="9" fill="#D4966A" />
    
    {/* Hair - afro style, big and round */}
    <ellipse cx="16" cy="14" rx="11" ry="10" fill="#1C1C1C" />
    
    {/* Simple eyes */}
    <circle cx="12" cy="21" r="1" fill="#1C1C1C" />
    <circle cx="20" cy="21" r="1" fill="#1C1C1C" />
  </svg>
);

// Eduardo - Homem rabo de cavalo, camisa amarela
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F0E8D8" />
    
    {/* Ponytail behind */}
    <ellipse cx="28" cy="16" rx="4" ry="8" fill="#8B4513" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#F0D4B8" />
    
    {/* Shirt */}
    <path d="M9 34 L12 30 L16 33 L20 30 L23 34 L23 40 L9 40 Z" fill="#C7A85B" />
    
    {/* Head */}
    <ellipse cx="16" cy="20" rx="9" ry="10" fill="#FDE8D8" />
    
    {/* Hair - slicked back to ponytail */}
    <path d="M8 16 Q8 9 16 7 Q24 9 24 16 L24 12 Q24 5 16 4 Q8 5 8 12 Z" fill="#8B4513" />
    {/* Hair tie connection */}
    <path d="M24 14 L28 12 L28 16 L24 18 Z" fill="#8B4513" />
    
    {/* Simple eyes */}
    <circle cx="12" cy="20" r="1.2" fill="#2C1810" />
    <circle cx="20" cy="20" r="1.2" fill="#2C1810" />
  </svg>
);

// Vitória (Vítima) - Mulher elegante, cabelo médio, blusa rosa, colar
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F8E8E8" />
    
    {/* Hair behind */}
    <path d="M5 16 Q4 30 10 40 L22 40 Q28 30 27 16 Z" fill="#5C4033" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#F8E0C8" />
    
    {/* Necklace */}
    <path d="M11 32 Q16 35 21 32" stroke="#FFD700" strokeWidth="1" fill="none" />
    <circle cx="16" cy="34" r="1.5" fill="#FFD700" />
    
    {/* Shirt */}
    <path d="M10 33 L16 38 L22 33 L22 40 L10 40 Z" fill="#C75B8B" />
    
    {/* Earrings */}
    <circle cx="7" cy="24" r="1" fill="#FFD700" />
    <circle cx="25" cy="24" r="1" fill="#FFD700" />
    
    {/* Head */}
    <ellipse cx="16" cy="20" rx="8" ry="9" fill="#FDE8D8" />
    
    {/* Hair */}
    <path d="M8 16 Q8 8 16 6 Q24 8 24 16 L24 12 Q24 5 16 4 Q8 5 8 12 Z" fill="#6B4A38" />
    {/* Side hair */}
    <path d="M8 16 L6 26 Q8 28 10 26 L10 18 Z" fill="#5C4033" />
    <path d="M24 16 L26 26 Q24 28 22 26 L22 18 Z" fill="#5C4033" />
    {/* Bangs */}
    <path d="M10 14 Q13 10 16 13 Q19 10 22 14 L22 12 Q19 8 16 11 Q13 8 10 12 Z" fill="#6B4A38" />
    
    {/* Simple eyes */}
    <circle cx="12" cy="20" r="1" fill="#2C1810" />
    <circle cx="20" cy="20" r="1" fill="#2C1810" />
  </svg>
);

// Portrait 7 - Homem mais velho, bigode, camisa ciano
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#D8E8E8" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#C68642" />
    
    {/* Shirt */}
    <path d="M9 34 L12 30 L16 33 L20 30 L23 34 L23 40 L9 40 Z" fill="#5BC7C7" />
    
    {/* Head */}
    <ellipse cx="16" cy="20" rx="9" ry="10" fill="#D4966A" />
    
    {/* Hair - balding/gray */}
    <path d="M8 16 Q8 11 12 10 L12 14 Q8 14 8 16 Z" fill="#808080" />
    <path d="M24 16 Q24 11 20 10 L20 14 Q24 14 24 16 Z" fill="#808080" />
    
    {/* Mustache */}
    <path d="M10 24 Q13 26 16 24 Q19 26 22 24 L22 25 Q19 27 16 25 Q13 27 10 25 Z" fill="#606060" />
    
    {/* Simple eyes */}
    <circle cx="12" cy="19" r="1" fill="#2C1810" />
    <circle cx="20" cy="19" r="1" fill="#2C1810" />
  </svg>
);

// Portrait 8 - Homem careca com óculos, camisa laranja
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F5E0D0" />
    
    {/* Neck */}
    <rect x="12" y="28" width="8" height="6" fill="#E0B898" />
    
    {/* Shirt */}
    <path d="M9 34 L12 30 L16 33 L20 30 L23 34 L23 40 L9 40 Z" fill="#D4804A" />
    
    {/* Head - bald */}
    <ellipse cx="16" cy="18" rx="10" ry="11" fill="#F0D4B8" />
    
    {/* Bald head shine */}
    <ellipse cx="14" cy="12" rx="4" ry="2" fill="#F8E0C8" opacity="0.6" />
    
    {/* Glasses - round */}
    <circle cx="11" cy="18" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <circle cx="21" cy="18" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <line x1="15" y1="18" x2="17" y2="18" stroke="#2C2C2C" strokeWidth="1.2" />
    
    {/* Eyes behind glasses */}
    <circle cx="11" cy="18" r="0.8" fill="#2C1810" />
    <circle cx="21" cy="18" r="0.8" fill="#2C1810" />
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
