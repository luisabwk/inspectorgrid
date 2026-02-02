interface PortraitProps {
  className?: string;
  color?: string;
}

// Avatar portraits following cartela reference style
// Style: Geometric hair silhouettes with dark outlines, expressive eyes (white + iris + pupil)

// Portrait 1 - Alberto: Cabelo curto escuro bagunçado, pele média, camisa verde
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - verde água */}
    <rect width="32" height="40" fill="#C8E8E0" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E8C4A0" />
    
    {/* Shirt - green */}
    <path d="M8 32 L12 28 L16 31 L20 28 L24 32 L24 40 L8 40 Z" fill="#4A7C59" />
    
    {/* Head oval - pele média */}
    <ellipse cx="16" cy="18" rx="8.5" ry="10" fill="#E8C4A0" />
    
    {/* Hair - short messy dark (linha 2 style) */}
    <path 
      d="M7.5 16 Q7.5 10 11 7 Q14 5 16 5 Q18 5 21 7 Q24.5 10 24.5 16 L24 14 Q23 9 16 7 Q9 9 8 14 Z" 
      fill="#4A4A4A" 
      stroke="#2C2C2C" 
      strokeWidth="0.8" 
    />
    {/* Messy top spikes */}
    <path d="M10 9 L11 6 L13 9" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.5" />
    <path d="M14 7 L16 4 L18 7" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.5" />
    <path d="M19 9 L21 6 L22 9" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.5" />
    
    {/* Eyes - white base + brown iris + black pupil */}
    <ellipse cx="12" cy="18" rx="2" ry="2.2" fill="white" />
    <ellipse cx="20" cy="18" rx="2" ry="2.2" fill="white" />
    <circle cx="12" cy="18.3" r="1.3" fill="#5C4033" />
    <circle cx="20" cy="18.3" r="1.3" fill="#5C4033" />
    <circle cx="12" cy="18.3" r="0.6" fill="#1A1A1A" />
    <circle cx="20" cy="18.3" r="0.6" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M9.5 15 Q12 14 14 15" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
    <path d="M18 15 Q20 14 22.5 15" stroke="#2C2C2C" strokeWidth="0.8" fill="none" />
    
    {/* Nose - subtle L shape */}
    <path d="M16 19 L16 22 L17.5 22" stroke="#D4A574" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// Portrait 2 - Beatriz: Cabelo longo liso loiro, pele clara, blusa roxa
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - creme */}
    <rect width="32" height="40" fill="#F5ECD7" />
    
    {/* Long hair behind - blonde (linha 4 style) */}
    <path 
      d="M5 12 Q4 28 10 40 L22 40 Q28 28 27 12 Q26 8 16 6 Q6 8 5 12 Z" 
      fill="#A08050" 
      stroke="#6B5030" 
      strokeWidth="0.8" 
    />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="5" fill="#FADCBC" />
    
    {/* Blouse - purple */}
    <path d="M10 31 L16 35 L22 31 L22 40 L10 40 Z" fill="#7B5B9A" />
    
    {/* Head oval - pele clara */}
    <ellipse cx="16" cy="18" rx="8" ry="9.5" fill="#FADCBC" />
    
    {/* Hair front - fringe/bangs */}
    <path 
      d="M8 14 Q8 8 16 6 Q24 8 24 14 L23 12 Q22 9 16 8 Q10 9 9 12 Z" 
      fill="#A08050" 
      stroke="#6B5030" 
      strokeWidth="0.8" 
    />
    {/* Side strands */}
    <path d="M8 14 L7 24 Q9 25 10 22 L9 14 Z" fill="#A08050" stroke="#6B5030" strokeWidth="0.5" />
    <path d="M24 14 L25 24 Q23 25 22 22 L23 14 Z" fill="#A08050" stroke="#6B5030" strokeWidth="0.5" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="18" rx="1.8" ry="2" fill="white" />
    <ellipse cx="20" cy="18" rx="1.8" ry="2" fill="white" />
    <circle cx="12" cy="18.3" r="1.2" fill="#5C4033" />
    <circle cx="20" cy="18.3" r="1.2" fill="#5C4033" />
    <circle cx="12" cy="18.3" r="0.5" fill="#1A1A1A" />
    <circle cx="20" cy="18.3" r="0.5" fill="#1A1A1A" />
    
    {/* Eyebrows - thin feminine */}
    <path d="M10 15.5 Q12 14.8 14 15.5" stroke="#6B5030" strokeWidth="0.6" fill="none" />
    <path d="M18 15.5 Q20 14.8 22 15.5" stroke="#6B5030" strokeWidth="0.6" fill="none" />
    
    {/* Nose */}
    <path d="M16 19 L16 21.5 L17 21.5" stroke="#E8C4A0" strokeWidth="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Portrait 3 - Carlos: Cabelo médio castanho, óculos retangulares, camisa vermelha
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - bege */}
    <rect width="32" height="40" fill="#E8DCC8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E8C4A0" />
    
    {/* Shirt - red */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#C75B5B" />
    
    {/* Head oval */}
    <ellipse cx="16" cy="18" rx="8.5" ry="10" fill="#E8C4A0" />
    
    {/* Hair - medium masculine brown (linha 2 style) */}
    <path 
      d="M7.5 15 Q7.5 9 12 6 Q14 5 16 5 Q18 5 20 6 Q24.5 9 24.5 15 L24 13 Q23 8 16 6.5 Q9 8 8 13 Z" 
      fill="#5C4033" 
      stroke="#3C2818" 
      strokeWidth="0.8" 
    />
    {/* Side hair */}
    <path d="M7.5 15 L7 19 Q8.5 19 8.5 17 L8 15 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    <path d="M24.5 15 L25 19 Q23.5 19 23.5 17 L24 15 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    
    {/* Glasses - rectangular frames */}
    <rect x="8" y="16" width="6" height="4.5" rx="0.8" fill="none" stroke="#2C2C2C" strokeWidth="1" />
    <rect x="18" y="16" width="6" height="4.5" rx="0.8" fill="none" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="14" y1="18" x2="18" y2="18" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="8" y1="18" x2="6" y2="16" stroke="#2C2C2C" strokeWidth="0.8" />
    <line x1="24" y1="18" x2="26" y2="16" stroke="#2C2C2C" strokeWidth="0.8" />
    
    {/* Eyes behind glasses */}
    <circle cx="11" cy="18" r="1" fill="#5C4033" />
    <circle cx="21" cy="18" r="1" fill="#5C4033" />
    <circle cx="11" cy="18" r="0.4" fill="#1A1A1A" />
    <circle cx="21" cy="18" r="0.4" fill="#1A1A1A" />
    
    {/* Eyebrows above glasses */}
    <path d="M8.5 14.5 Q11 13.5 13.5 14.5" stroke="#3C2818" strokeWidth="0.7" fill="none" />
    <path d="M18.5 14.5 Q21 13.5 23.5 14.5" stroke="#3C2818" strokeWidth="0.7" fill="none" />
  </svg>
);

// Portrait 4 - Diana: Cabelo afro volumoso, pele escura, brincos, blusa azul
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - azul claro */}
    <rect width="32" height="40" fill="#C8DDE8" />
    
    {/* Afro hair behind - big round (linha 5 style) */}
    <ellipse cx="16" cy="14" rx="13" ry="11" fill="#4A4A4A" stroke="#2C2C2C" strokeWidth="0.8" />
    {/* Curly texture circles */}
    <circle cx="6" cy="12" r="3.5" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="26" cy="12" r="3.5" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="10" cy="6" r="3" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="16" cy="4" r="3" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="22" cy="6" r="3" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="4" cy="18" r="2.5" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    <circle cx="28" cy="18" r="2.5" fill="#3C3C3C" stroke="#2C2C2C" strokeWidth="0.4" />
    
    {/* Earrings */}
    <circle cx="5" cy="24" r="1.8" fill="#FFD700" stroke="#DAA520" strokeWidth="0.3" />
    <circle cx="27" cy="24" r="1.8" fill="#FFD700" stroke="#DAA520" strokeWidth="0.3" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="5" fill="#8B6B4A" />
    
    {/* Blouse - blue */}
    <path d="M10 31 L16 35 L22 31 L22 40 L10 40 Z" fill="#5B8BC7" />
    
    {/* Head oval - pele escura */}
    <ellipse cx="16" cy="19" rx="8" ry="9" fill="#A07850" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="19" rx="1.8" ry="2" fill="white" />
    <ellipse cx="20" cy="19" rx="1.8" ry="2" fill="white" />
    <circle cx="12" cy="19.3" r="1.2" fill="#2C1810" />
    <circle cx="20" cy="19.3" r="1.2" fill="#2C1810" />
    <circle cx="12" cy="19.3" r="0.5" fill="#1A1A1A" />
    <circle cx="20" cy="19.3" r="0.5" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M10 16.5 Q12 15.8 14 16.5" stroke="#2C2C2C" strokeWidth="0.6" fill="none" />
    <path d="M18 16.5 Q20 15.8 22 16.5" stroke="#2C2C2C" strokeWidth="0.6" fill="none" />
    
    {/* Nose */}
    <path d="M16 20 L16 22.5 L17.5 22.5" stroke="#8B6B4A" strokeWidth="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Portrait 5 - Eduardo: Cabelo com rabo de cavalo, pele média, camisa amarela
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - amarelo claro */}
    <rect width="32" height="40" fill="#F5F0C8" />
    
    {/* Ponytail behind */}
    <ellipse cx="28" cy="16" rx="4" ry="8" fill="#5C4033" stroke="#3C2818" strokeWidth="0.6" />
    {/* Hair tie */}
    <ellipse cx="26" cy="10" rx="1.5" ry="1" fill="#2C2C2C" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E8C4A0" />
    
    {/* Shirt - yellow */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#C7A85B" />
    
    {/* Head oval */}
    <ellipse cx="16" cy="18" rx="8.5" ry="10" fill="#E8C4A0" />
    
    {/* Hair - slicked back to ponytail (linha 6 style) */}
    <path 
      d="M8 14 Q8 8 16 6 Q24 8 24 14 L24 12 Q23 8 16 7 Q9 8 8 12 Z" 
      fill="#5C4033" 
      stroke="#3C2818" 
      strokeWidth="0.8" 
    />
    {/* Slicked lines */}
    <path d="M10 11 Q16 8 22 11" stroke="#3C2818" strokeWidth="0.4" fill="none" />
    <path d="M9 13 Q16 10 23 13" stroke="#3C2818" strokeWidth="0.4" fill="none" />
    {/* Connection to ponytail */}
    <path d="M24 11 L26 10" stroke="#3C2818" strokeWidth="2" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="18" rx="2" ry="2.2" fill="white" />
    <ellipse cx="20" cy="18" rx="2" ry="2.2" fill="white" />
    <circle cx="12" cy="18.3" r="1.3" fill="#5C4033" />
    <circle cx="20" cy="18.3" r="1.3" fill="#5C4033" />
    <circle cx="12" cy="18.3" r="0.6" fill="#1A1A1A" />
    <circle cx="20" cy="18.3" r="0.6" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M9.5 15 Q12 14 14 15" stroke="#3C2818" strokeWidth="0.7" fill="none" />
    <path d="M18 15 Q20 14 22.5 15" stroke="#3C2818" strokeWidth="0.7" fill="none" />
    
    {/* Nose */}
    <path d="M16 19 L16 22 L17.5 22" stroke="#D4A574" strokeWidth="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Portrait 6 - Vitória (Vítima): Cabelo médio ondulado, colar e brincos, blusa rosa
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - rosa */}
    <rect width="32" height="40" fill="#F0D4D4" />
    
    {/* Wavy hair behind */}
    <path 
      d="M5 14 Q4 30 11 40 L21 40 Q28 30 27 14 Q26 8 16 6 Q6 8 5 14 Z" 
      fill="#5C4033" 
      stroke="#3C2818" 
      strokeWidth="0.8" 
    />
    
    {/* Earrings */}
    <circle cx="5.5" cy="23" r="1.5" fill="#FFD700" stroke="#DAA520" strokeWidth="0.3" />
    <circle cx="26.5" cy="23" r="1.5" fill="#FFD700" stroke="#DAA520" strokeWidth="0.3" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="5" fill="#FADCBC" />
    
    {/* Necklace */}
    <path d="M11 30 Q16 33 21 30" stroke="#FFD700" strokeWidth="1.2" fill="none" />
    <circle cx="16" cy="32" r="2" fill="#FFD700" stroke="#DAA520" strokeWidth="0.3" />
    
    {/* Blouse - pink */}
    <path d="M10 31 L16 36 L22 31 L22 40 L10 40 Z" fill="#C75B8B" />
    
    {/* Head oval - pele clara */}
    <ellipse cx="16" cy="18" rx="8" ry="9.5" fill="#FADCBC" />
    
    {/* Wavy hair front */}
    <path 
      d="M8 14 Q8 8 16 6 Q24 8 24 14" 
      fill="#5C4033" 
      stroke="#3C2818" 
      strokeWidth="0.8" 
    />
    {/* Wavy bangs */}
    <path d="M9 14 Q11 11 14 14 Q16 12 18 14 Q20 11 23 14" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    {/* Side waves */}
    <path d="M8 14 Q6 20 7 26 Q9 27 10 24 Q8 20 9 16 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    <path d="M24 14 Q26 20 25 26 Q23 27 22 24 Q24 20 23 16 Z" fill="#5C4033" stroke="#3C2818" strokeWidth="0.5" />
    
    {/* Eyes */}
    <ellipse cx="12" cy="18" rx="1.8" ry="2" fill="white" />
    <ellipse cx="20" cy="18" rx="1.8" ry="2" fill="white" />
    <circle cx="12" cy="18.3" r="1.2" fill="#5C4033" />
    <circle cx="20" cy="18.3" r="1.2" fill="#5C4033" />
    <circle cx="12" cy="18.3" r="0.5" fill="#1A1A1A" />
    <circle cx="20" cy="18.3" r="0.5" fill="#1A1A1A" />
    
    {/* Eyebrows - feminine */}
    <path d="M10 15.5 Q12 14.8 14 15.5" stroke="#3C2818" strokeWidth="0.6" fill="none" />
    <path d="M18 15.5 Q20 14.8 22 15.5" stroke="#3C2818" strokeWidth="0.6" fill="none" />
    
    {/* Nose */}
    <path d="M16 19 L16 21.5 L17 21.5" stroke="#E8C4A0" strokeWidth="0.5" fill="none" strokeLinecap="round" />
  </svg>
);

// Portrait 7 - Senhor Idoso: Cabelo grisalho/calvo, bigode, camisa ciano
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - cinza */}
    <rect width="32" height="40" fill="#D4D4D4" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#D4A574" />
    
    {/* Shirt - cyan */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#5BC7C7" />
    
    {/* Head oval */}
    <ellipse cx="16" cy="18" rx="9" ry="10" fill="#D4A574" />
    
    {/* Hair - balding gray (linha 1 style) */}
    <path d="M7 17 Q7 14 9 11 L10 15 Q8 15 7 17 Z" fill="#808080" stroke="#606060" strokeWidth="0.6" />
    <path d="M25 17 Q25 14 23 11 L22 15 Q24 15 25 17 Z" fill="#808080" stroke="#606060" strokeWidth="0.6" />
    {/* Top sparse hair */}
    <path d="M10 11 Q13 9 16 10 Q19 9 22 11" stroke="#808080" strokeWidth="1.2" fill="none" />
    <path d="M11 9 Q14 7 16 8 Q18 7 21 9" stroke="#707070" strokeWidth="0.8" fill="none" />
    
    {/* Mustache - full */}
    <path 
      d="M9 23 Q12 24.5 16 23 Q20 24.5 23 23 L23 24.5 Q20 26 16 24.5 Q12 26 9 24.5 Z" 
      fill="#606060" 
      stroke="#404040" 
      strokeWidth="0.4" 
    />
    
    {/* Eyes */}
    <ellipse cx="12" cy="17" rx="1.8" ry="2" fill="white" />
    <ellipse cx="20" cy="17" rx="1.8" ry="2" fill="white" />
    <circle cx="12" cy="17.3" r="1.1" fill="#5C4033" />
    <circle cx="20" cy="17.3" r="1.1" fill="#5C4033" />
    <circle cx="12" cy="17.3" r="0.5" fill="#1A1A1A" />
    <circle cx="20" cy="17.3" r="0.5" fill="#1A1A1A" />
    
    {/* Eyebrows - bushy gray */}
    <path d="M9 14 Q12 12.5 14.5 14" stroke="#606060" strokeWidth="1.2" fill="none" />
    <path d="M17.5 14 Q20 12.5 23 14" stroke="#606060" strokeWidth="1.2" fill="none" />
    
    {/* Nose */}
    <path d="M16 18 L16 21 L17.5 21" stroke="#C4956A" strokeWidth="0.6" fill="none" strokeLinecap="round" />
  </svg>
);

// Portrait 8 - Homem Careca: Careca com brilho, óculos redondos, camisa laranja
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background - bege */}
    <rect width="32" height="40" fill="#E8DCC8" />
    
    {/* Neck */}
    <rect x="12" y="27" width="8" height="6" fill="#E8C4A0" />
    
    {/* Shirt - orange */}
    <path d="M9 32 L12 28 L16 31 L20 28 L23 32 L23 40 L9 40 Z" fill="#D4804A" />
    
    {/* Head - bald, slightly larger */}
    <ellipse cx="16" cy="16" rx="10" ry="12" fill="#E8C4A0" />
    
    {/* Bald head shine highlights */}
    <ellipse cx="11" cy="9" rx="4" ry="2.5" fill="#F5E0C8" opacity="0.8" />
    <ellipse cx="20" cy="7" rx="2" ry="1.2" fill="#F5E0C8" opacity="0.6" />
    
    {/* Subtle head outline */}
    <ellipse cx="16" cy="16" rx="10" ry="12" fill="none" stroke="#D4B090" strokeWidth="0.4" />
    
    {/* Glasses - round frames */}
    <circle cx="11" cy="17" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <circle cx="21" cy="17" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.2" />
    <line x1="15" y1="17" x2="17" y2="17" stroke="#2C2C2C" strokeWidth="1.2" />
    <line x1="7" y1="16" x2="5" y2="14" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="25" y1="16" x2="27" y2="14" stroke="#2C2C2C" strokeWidth="1" />
    
    {/* Eyes behind glasses */}
    <ellipse cx="11" cy="17" rx="1.2" ry="1.4" fill="white" />
    <ellipse cx="21" cy="17" rx="1.2" ry="1.4" fill="white" />
    <circle cx="11" cy="17.2" r="0.8" fill="#5C4033" />
    <circle cx="21" cy="17.2" r="0.8" fill="#5C4033" />
    <circle cx="11" cy="17.2" r="0.35" fill="#1A1A1A" />
    <circle cx="21" cy="17.2" r="0.35" fill="#1A1A1A" />
    
    {/* Eyebrows */}
    <path d="M8 13 Q11 12 14 13" stroke="#8B7355" strokeWidth="0.7" fill="none" />
    <path d="M18 13 Q21 12 24 13" stroke="#8B7355" strokeWidth="0.7" fill="none" />
    
    {/* Nose */}
    <path d="M16 18 L16 21 L17.5 21" stroke="#D4A574" strokeWidth="0.5" fill="none" strokeLinecap="round" />
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
