interface PortraitProps {
  className?: string;
  color?: string;
}

// Avatar portraits using cartela reference style
// Style: Head shapes with outlined hair, simple eyes, clean geometric forms

// Alberto - Homem maduro, cabelo curto escuro, camisa verde
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#D4E5E0" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E8C4A0" />
    
    {/* Shirt collar - green */}
    <path d="M8 32 L12 28 L16 31 L20 28 L24 32 L24 40 L8 40 Z" fill="#4A7C59" />
    
    {/* Head - oval */}
    <ellipse cx="16" cy="18" rx="9" ry="10" fill="#F0D4B8" />
    
    {/* Hair - short masculine, dark gray with outline */}
    <path d="M7 16 Q7 8 16 6 Q25 8 25 16 L25 12 Q25 6 16 4 Q7 6 7 12 Z" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.8" />
    {/* Side hair */}
    <path d="M7 14 L7 18 Q8 18 8 16 L8 14 Z" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.5" />
    <path d="M25 14 L25 18 Q24 18 24 16 L24 14 Z" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.5" />
    
    {/* Eyes - simple ovals with pupils */}
    <ellipse cx="12" cy="18" rx="1.8" ry="2" fill="white" />
    <ellipse cx="20" cy="18" rx="1.8" ry="2" fill="white" />
    <circle cx="12" cy="18.5" r="1" fill="#5C4033" />
    <circle cx="20" cy="18.5" r="1" fill="#5C4033" />
    
    {/* Eyebrows */}
    <path d="M10 15 Q12 14 14 15" stroke="#4A4A4A" strokeWidth="0.8" fill="none" />
    <path d="M18 15 Q20 14 22 15" stroke="#4A4A4A" strokeWidth="0.8" fill="none" />
  </svg>
);

// Beatriz - Mulher jovem, cabelo longo loiro, blusa roxa
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F5E6D3" />
    
    {/* Long hair behind - blonde/light brown */}
    <path d="M5 14 Q4 32 12 40 L20 40 Q28 32 27 14 Z" fill="#A08050" stroke="#6B5030" strokeWidth="0.8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#F8E0C8" />
    
    {/* Shirt - purple */}
    <path d="M10 31 L16 35 L22 31 L22 40 L10 40 Z" fill="#7B68A0" />
    
    {/* Head */}
    <ellipse cx="16" cy="18" rx="8" ry="9" fill="#FDE8D8" />
    
    {/* Hair - long wavy with bangs */}
    <path d="M8 14 Q8 6 16 4 Q24 6 24 14" fill="#C4A060" stroke="#8B7040" strokeWidth="0.8" />
    {/* Bangs */}
    <path d="M9 14 Q11 10 14 14 Q16 11 19 14 Q21 10 23 14" fill="#C4A060" stroke="#8B7040" strokeWidth="0.6" />
    {/* Side hair strands */}
    <path d="M8 14 L6 28 Q8 30 10 27 L9 16 Z" fill="#B89850" stroke="#8B7040" strokeWidth="0.5" />
    <path d="M24 14 L26 28 Q24 30 22 27 L23 16 Z" fill="#B89850" stroke="#8B7040" strokeWidth="0.5" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="18" rx="1.6" ry="1.8" fill="white" />
    <ellipse cx="20" cy="18" rx="1.6" ry="1.8" fill="white" />
    <circle cx="12" cy="18.5" r="0.9" fill="#5C4033" />
    <circle cx="20" cy="18.5" r="0.9" fill="#5C4033" />
    
    {/* Eyebrows - thinner, feminine */}
    <path d="M10 15.5 Q12 15 14 15.5" stroke="#8B7040" strokeWidth="0.6" fill="none" />
    <path d="M18 15.5 Q20 15 22 15.5" stroke="#8B7040" strokeWidth="0.6" fill="none" />
  </svg>
);

// Carlos - Homem com óculos, cabelo médio castanho, camisa vermelha
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#E0D4C8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E0B898" />
    
    {/* Shirt - red */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#C75B5B" />
    
    {/* Head */}
    <ellipse cx="16" cy="18" rx="9" ry="10" fill="#F0D4B8" />
    
    {/* Hair - medium messy, dark brown with outline */}
    <path d="M7 15 Q7 7 16 5 Q25 7 25 15" fill="#5C4033" stroke="#3C2818" strokeWidth="0.8" />
    {/* Messy top */}
    <path d="M9 12 Q10 8 12 11 Q14 7 16 10 Q18 6 20 11 Q22 8 23 12" fill="#5C4033" stroke="#3C2818" strokeWidth="0.6" />
    {/* Side hair */}
    <path d="M7 15 L6 20 Q8 21 9 18 L8 15 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    <path d="M25 15 L26 20 Q24 21 23 18 L24 15 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    
    {/* Glasses - rectangular frames */}
    <rect x="8" y="16" width="7" height="5" rx="1" fill="none" stroke="#2C2C2C" strokeWidth="1" />
    <rect x="17" y="16" width="7" height="5" rx="1" fill="none" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="15" y1="18.5" x2="17" y2="18.5" stroke="#2C2C2C" strokeWidth="1" />
    
    {/* Eyes behind glasses */}
    <circle cx="11.5" cy="18.5" r="0.8" fill="#5C4033" />
    <circle cx="20.5" cy="18.5" r="0.8" fill="#5C4033" />
  </svg>
);

// Diana - Mulher pele escura, cabelo curto cacheado/afro, blusa azul
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#B8D4E8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#8B6B4A" />
    
    {/* Shirt - blue */}
    <path d="M10 31 L16 35 L22 31 L22 40 L10 40 Z" fill="#5B8BC7" />
    
    {/* Earrings */}
    <circle cx="6" cy="22" r="1.5" fill="#FFD700" />
    <circle cx="26" cy="22" r="1.5" fill="#FFD700" />
    
    {/* Hair behind - afro/curly, big and round */}
    <ellipse cx="16" cy="12" rx="12" ry="10" fill="#3C3C3C" stroke="#1C1C1C" strokeWidth="0.8" />
    {/* Curly texture */}
    <circle cx="8" cy="10" r="3" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="16" cy="6" r="3" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="24" cy="10" r="3" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="6" cy="16" r="2.5" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="26" cy="16" r="2.5" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.4" />
    
    {/* Head */}
    <ellipse cx="16" cy="19" rx="8" ry="9" fill="#A07850" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="19" rx="1.6" ry="1.8" fill="white" />
    <ellipse cx="20" cy="19" rx="1.6" ry="1.8" fill="white" />
    <circle cx="12" cy="19.5" r="0.9" fill="#2C1810" />
    <circle cx="20" cy="19.5" r="0.9" fill="#2C1810" />
    
    {/* Eyebrows */}
    <path d="M10 16.5 Q12 16 14 16.5" stroke="#2C2C2C" strokeWidth="0.6" fill="none" />
    <path d="M18 16.5 Q20 16 22 16.5" stroke="#2C2C2C" strokeWidth="0.6" fill="none" />
  </svg>
);

// Eduardo - Homem rabo de cavalo, camisa amarela
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F0E8D0" />
    
    {/* Ponytail behind */}
    <ellipse cx="28" cy="18" rx="4" ry="10" fill="#6B4A30" stroke="#4A3020" strokeWidth="0.6" />
    {/* Hair tie */}
    <ellipse cx="26" cy="12" rx="1.5" ry="1" fill="#2C2C2C" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#F0D4B8" />
    
    {/* Shirt - yellow */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#C7A85B" />
    
    {/* Head */}
    <ellipse cx="16" cy="18" rx="9" ry="10" fill="#FDE8D8" />
    
    {/* Hair - slicked back to ponytail */}
    <path d="M8 14 Q8 6 16 4 Q24 6 24 14" fill="#7B5A38" stroke="#5A4028" strokeWidth="0.8" />
    {/* Slicked back texture */}
    <path d="M10 12 Q16 8 22 12" stroke="#5A4028" strokeWidth="0.5" fill="none" />
    <path d="M11 14 Q16 10 21 14" stroke="#5A4028" strokeWidth="0.5" fill="none" />
    {/* Connection to ponytail */}
    <path d="M24 12 L26 12" stroke="#5A4028" strokeWidth="2" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="18" rx="1.8" ry="2" fill="white" />
    <ellipse cx="20" cy="18" rx="1.8" ry="2" fill="white" />
    <circle cx="12" cy="18.5" r="1" fill="#5C4033" />
    <circle cx="20" cy="18.5" r="1" fill="#5C4033" />
    
    {/* Eyebrows */}
    <path d="M10 15 Q12 14.5 14 15" stroke="#5A4028" strokeWidth="0.7" fill="none" />
    <path d="M18 15 Q20 14.5 22 15" stroke="#5A4028" strokeWidth="0.7" fill="none" />
  </svg>
);

// Vitória (Vítima) - Mulher elegante, cabelo médio ondulado, blusa rosa, colar
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F8E0E0" />
    
    {/* Hair behind - wavy */}
    <path d="M5 16 Q4 32 12 40 L20 40 Q28 32 27 16 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#F8E0C8" />
    
    {/* Necklace */}
    <path d="M11 30 Q16 33 21 30" stroke="#FFD700" strokeWidth="1" fill="none" />
    <circle cx="16" cy="32" r="2" fill="#FFD700" />
    
    {/* Shirt - pink */}
    <path d="M10 31 L16 36 L22 31 L22 40 L10 40 Z" fill="#C75B8B" />
    
    {/* Earrings */}
    <circle cx="6" cy="22" r="1.2" fill="#FFD700" />
    <circle cx="26" cy="22" r="1.2" fill="#FFD700" />
    
    {/* Head */}
    <ellipse cx="16" cy="18" rx="8" ry="9" fill="#FDE8D8" />
    
    {/* Hair - wavy with side parts */}
    <path d="M8 14 Q8 6 16 4 Q24 6 24 14" fill="#6B4A38" stroke="#4A3028" strokeWidth="0.8" />
    {/* Wavy bangs */}
    <path d="M9 14 Q12 11 15 14 Q18 11 21 14 Q23 12 24 14" fill="#6B4A38" stroke="#4A3028" strokeWidth="0.6" />
    {/* Side waves */}
    <path d="M8 14 Q6 20 7 26 Q9 28 10 25 Q8 20 9 16 Z" fill="#5C4033" stroke="#4A3028" strokeWidth="0.5" />
    <path d="M24 14 Q26 20 25 26 Q23 28 22 25 Q24 20 23 16 Z" fill="#5C4033" stroke="#4A3028" strokeWidth="0.5" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="18" rx="1.6" ry="1.8" fill="white" />
    <ellipse cx="20" cy="18" rx="1.6" ry="1.8" fill="white" />
    <circle cx="12" cy="18.5" r="0.9" fill="#5C4033" />
    <circle cx="20" cy="18.5" r="0.9" fill="#5C4033" />
    
    {/* Eyebrows - feminine */}
    <path d="M10 15.5 Q12 15 14 15.5" stroke="#5C4033" strokeWidth="0.6" fill="none" />
    <path d="M18 15.5 Q20 15 22 15.5" stroke="#5C4033" strokeWidth="0.6" fill="none" />
  </svg>
);

// Portrait 7 - Homem mais velho, cabelo grisalho/calvo, bigode, camisa ciano
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#D0E8E8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#D4A574" />
    
    {/* Shirt - cyan */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#5BC7C7" />
    
    {/* Head */}
    <ellipse cx="16" cy="18" rx="9" ry="10" fill="#E8C4A0" />
    
    {/* Hair - balding/receding gray */}
    <path d="M7 16 Q7 12 10 10 L10 14 Q8 14 7 16 Z" fill="#808080" stroke="#606060" strokeWidth="0.6" />
    <path d="M25 16 Q25 12 22 10 L22 14 Q24 14 25 16 Z" fill="#808080" stroke="#606060" strokeWidth="0.6" />
    {/* Top sparse hair */}
    <path d="M10 10 Q13 8 16 9 Q19 8 22 10" stroke="#808080" strokeWidth="1" fill="none" />
    
    {/* Mustache - full */}
    <path d="M10 23 Q13 25 16 23 Q19 25 22 23" fill="#606060" stroke="#404040" strokeWidth="0.5" />
    <path d="M10 23 L10 24.5 Q13 26 16 24.5 Q19 26 22 24.5 L22 23" fill="#606060" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="17" rx="1.6" ry="1.8" fill="white" />
    <ellipse cx="20" cy="17" rx="1.6" ry="1.8" fill="white" />
    <circle cx="12" cy="17.5" r="0.9" fill="#5C4033" />
    <circle cx="20" cy="17.5" r="0.9" fill="#5C4033" />
    
    {/* Eyebrows - bushy */}
    <path d="M9 14 Q12 13 14 14" stroke="#606060" strokeWidth="1" fill="none" />
    <path d="M18 14 Q20 13 23 14" stroke="#606060" strokeWidth="1" fill="none" />
  </svg>
);

// Portrait 8 - Homem careca com óculos redondos, camisa laranja
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="32" height="40" fill="#F5E0C8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E0B898" />
    
    {/* Shirt - orange */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#D4804A" />
    
    {/* Head - bald, slightly larger */}
    <ellipse cx="16" cy="16" rx="10" ry="12" fill="#F0D4B8" />
    
    {/* Bald head shine highlights */}
    <ellipse cx="12" cy="10" rx="4" ry="2" fill="#F8E8D8" opacity="0.7" />
    <ellipse cx="20" cy="8" rx="2" ry="1" fill="#F8E8D8" opacity="0.5" />
    
    {/* Head outline for definition */}
    <ellipse cx="16" cy="16" rx="10" ry="12" fill="none" stroke="#D4B898" strokeWidth="0.5" />
    
    {/* Glasses - round frames */}
    <circle cx="11" cy="17" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <circle cx="21" cy="17" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <line x1="15" y1="17" x2="17" y2="17" stroke="#2C2C2C" strokeWidth="1.2" />
    {/* Temple arms */}
    <line x1="7" y1="16" x2="5" y2="14" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="25" y1="16" x2="27" y2="14" stroke="#2C2C2C" strokeWidth="1" />
    
    {/* Eyes behind glasses */}
    <circle cx="11" cy="17" r="0.9" fill="#5C4033" />
    <circle cx="21" cy="17" r="0.9" fill="#5C4033" />
    
    {/* Eyebrows */}
    <path d="M8 13 Q11 12 14 13" stroke="#8B7355" strokeWidth="0.7" fill="none" />
    <path d="M18 13 Q21 12 24 13" stroke="#8B7355" strokeWidth="0.7" fill="none" />
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
