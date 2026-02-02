interface PortraitProps {
  className?: string;
  color?: string;
}

// RPG Maker style chibi portraits - simple, clean, iconic
// Proportions: Large head, small body, expressive eyes

// Alberto - Homem maduro, cabelo curto escuro, camisa verde
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/Shirt */}
    <path d="M8 40 L8 34 Q8 30 12 29 L16 28 L20 29 Q24 30 24 34 L24 40 Z" fill="#4A7C59" />
    <path d="M13 29 L16 31 L19 29" stroke="#3A6249" strokeWidth="1" fill="none" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#E8C4A0" />
    
    {/* Head - large chibi style */}
    <ellipse cx="16" cy="16" rx="11" ry="12" fill="#F0D4B8" />
    
    {/* Ears */}
    <ellipse cx="5" cy="16" rx="2" ry="3" fill="#E8C4A0" />
    <ellipse cx="27" cy="16" rx="2" ry="3" fill="#E8C4A0" />
    
    {/* Hair - short masculine */}
    <path d="M5 14 Q5 4 16 2 Q27 4 27 14 L27 10 Q27 2 16 0 Q5 2 5 10 Z" fill="#2C1810" />
    
    {/* Eyebrows */}
    <path d="M9 11 Q11 10 13 11" stroke="#2C1810" strokeWidth="1.5" fill="none" />
    <path d="M19 11 Q21 10 23 11" stroke="#2C1810" strokeWidth="1.5" fill="none" />
    
    {/* Eyes - large RPG style */}
    <ellipse cx="11" cy="15" rx="3" ry="3" fill="white" />
    <ellipse cx="21" cy="15" rx="3" ry="3" fill="white" />
    <ellipse cx="11" cy="15" rx="2" ry="2" fill="#3D2920" />
    <ellipse cx="21" cy="15" rx="2" ry="2" fill="#3D2920" />
    <circle cx="10" cy="14" r="1" fill="white" />
    <circle cx="20" cy="14" r="1" fill="white" />
    
    {/* Nose */}
    <path d="M16 17 L15.5 20" stroke="#D4A080" strokeWidth="1" strokeLinecap="round" />
    
    {/* Mouth */}
    <path d="M13 23 Q16 24 19 23" stroke="#C08060" strokeWidth="1" fill="none" />
  </svg>
);

// Beatriz - Mulher jovem, cabelo longo loiro, blusa roxa
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Long hair behind */}
    <path d="M3 12 Q2 28 8 36 L11 36 Q8 28 9 14 Z" fill="#D4A574" />
    <path d="M29 12 Q30 28 24 36 L21 36 Q24 28 23 14 Z" fill="#D4A574" />
    
    {/* Body/Blouse */}
    <path d="M8 40 L8 34 Q9 30 13 29 L16 28 L19 29 Q23 30 24 34 L24 40 Z" fill="#7B68A0" />
    <path d="M12 29 L16 32 L20 29" fill="#F0D4B8" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#FDE8D8" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="10" ry="11" fill="#FDE8D8" />
    
    {/* Cheek blush */}
    <ellipse cx="8" cy="18" rx="2" ry="1" fill="#F8C8C8" opacity="0.5" />
    <ellipse cx="24" cy="18" rx="2" ry="1" fill="#F8C8C8" opacity="0.5" />
    
    {/* Ears */}
    <ellipse cx="6" cy="16" rx="1.5" ry="2" fill="#F0D4B8" />
    <ellipse cx="26" cy="16" rx="1.5" ry="2" fill="#F0D4B8" />
    
    {/* Hair - long flowing */}
    <path d="M6 14 Q6 4 16 2 Q26 4 26 14 L26 8 Q26 1 16 0 Q6 1 6 8 Z" fill="#E8C080" />
    <path d="M6 14 L5 24 Q6 26 8 24 L8 14 Z" fill="#D4A574" />
    <path d="M26 14 L27 24 Q26 26 24 24 L24 14 Z" fill="#D4A574" />
    {/* Bangs */}
    <path d="M8 12 Q10 8 14 10 Q16 6 18 10 Q22 8 24 12" fill="#E8C080" />
    
    {/* Eyebrows */}
    <path d="M9 10 Q11 9 13 10" stroke="#C08860" strokeWidth="1" fill="none" />
    <path d="M19 10 Q21 9 23 10" stroke="#C08860" strokeWidth="1" fill="none" />
    
    {/* Eyes - large feminine */}
    <ellipse cx="11" cy="14" rx="3" ry="3.5" fill="white" />
    <ellipse cx="21" cy="14" rx="3" ry="3.5" fill="white" />
    <ellipse cx="11" cy="14" rx="2" ry="2.5" fill="#4A7090" />
    <ellipse cx="21" cy="14" rx="2" ry="2.5" fill="#4A7090" />
    <circle cx="10" cy="13" r="1" fill="white" />
    <circle cx="20" cy="13" r="1" fill="white" />
    
    {/* Eyelashes */}
    <path d="M8 12 L7 11 M10 11 L9 10 M13 11 L14 10" stroke="#2C1810" strokeWidth="0.5" />
    <path d="M18 11 L17 10 M22 11 L23 10 M24 12 L25 11" stroke="#2C1810" strokeWidth="0.5" />
    
    {/* Nose */}
    <path d="M16 16 L15.5 19" stroke="#E8C4A0" strokeWidth="0.8" strokeLinecap="round" />
    
    {/* Mouth - with lipstick */}
    <path d="M13 22 Q16 24 19 22" fill="#D08080" />
  </svg>
);

// Carlos - Homem com óculos, cabelo médio castanho, camisa vermelha
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/Shirt */}
    <path d="M8 40 L8 34 Q8 30 12 29 L16 28 L20 29 Q24 30 24 34 L24 40 Z" fill="#C75B5B" />
    <path d="M12 29 L16 31 L20 29" stroke="#A04848" strokeWidth="1" fill="none" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#D4A574" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="11" ry="12" fill="#E0B898" />
    
    {/* Ears */}
    <ellipse cx="5" cy="16" rx="2" ry="3" fill="#D4A080" />
    <ellipse cx="27" cy="16" rx="2" ry="3" fill="#D4A080" />
    
    {/* Hair - medium wavy */}
    <path d="M5 14 Q5 4 16 2 Q27 4 27 14 L27 10 Q27 2 16 0 Q5 2 5 10 Z" fill="#4A3728" />
    <path d="M5 14 L5 18 Q6 20 8 18 L8 14 Z" fill="#4A3728" />
    <path d="M27 14 L27 18 Q26 20 24 18 L24 14 Z" fill="#4A3728" />
    
    {/* Glasses */}
    <rect x="7" y="12" width="8" height="6" rx="1" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <rect x="17" y="12" width="8" height="6" rx="1" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <line x1="15" y1="15" x2="17" y2="15" stroke="#2C2C2C" strokeWidth="1.5" />
    
    {/* Eyebrows (behind glasses) */}
    <path d="M8 10 Q10 9 14 10" stroke="#4A3728" strokeWidth="1.5" fill="none" />
    <path d="M18 10 Q22 9 24 10" stroke="#4A3728" strokeWidth="1.5" fill="none" />
    
    {/* Eyes (behind glasses) */}
    <ellipse cx="11" cy="15" rx="2" ry="2" fill="white" />
    <ellipse cx="21" cy="15" rx="2" ry="2" fill="white" />
    <ellipse cx="11" cy="15" rx="1.5" ry="1.5" fill="#3D5040" />
    <ellipse cx="21" cy="15" rx="1.5" ry="1.5" fill="#3D5040" />
    <circle cx="10" cy="14" r="0.5" fill="white" />
    <circle cx="20" cy="14" r="0.5" fill="white" />
    
    {/* Nose */}
    <path d="M16 17 L15.5 20" stroke="#C09070" strokeWidth="1" strokeLinecap="round" />
    
    {/* Mouth */}
    <path d="M13 23 Q16 24 19 23" stroke="#A07060" strokeWidth="1" fill="none" />
  </svg>
);

// Diana - Mulher pele escura, cabelo curto cacheado, blusa azul
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/Blouse */}
    <path d="M8 40 L8 34 Q9 30 13 29 L16 28 L19 29 Q23 30 24 34 L24 40 Z" fill="#5B8BC7" />
    <path d="M12 29 Q16 32 20 29" fill="#D4966A" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#C68642" />
    
    {/* Earrings */}
    <circle cx="5" cy="20" r="1.5" fill="#FFD700" />
    <circle cx="27" cy="20" r="1.5" fill="#FFD700" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="10" ry="11" fill="#D4966A" />
    
    {/* Ears */}
    <ellipse cx="6" cy="16" rx="1.5" ry="2.5" fill="#C68642" />
    <ellipse cx="26" cy="16" rx="1.5" ry="2.5" fill="#C68642" />
    
    {/* Hair - short curly afro */}
    <ellipse cx="16" cy="8" rx="12" ry="9" fill="#1C1C1C" />
    <path d="M5 12 Q3 16 6 18 L6 13 Z" fill="#1C1C1C" />
    <path d="M27 12 Q29 16 26 18 L26 13 Z" fill="#1C1C1C" />
    {/* Curl texture */}
    <circle cx="10" cy="6" r="2" fill="#2C2C2C" />
    <circle cx="16" cy="4" r="2" fill="#2C2C2C" />
    <circle cx="22" cy="6" r="2" fill="#2C2C2C" />
    <circle cx="7" cy="10" r="1.5" fill="#2C2C2C" />
    <circle cx="25" cy="10" r="1.5" fill="#2C2C2C" />
    
    {/* Eyebrows */}
    <path d="M9 10 Q11 9 13 10" stroke="#1C1C1C" strokeWidth="1.2" fill="none" />
    <path d="M19 10 Q21 9 23 10" stroke="#1C1C1C" strokeWidth="1.2" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="11" cy="14" rx="3" ry="3" fill="white" />
    <ellipse cx="21" cy="14" rx="3" ry="3" fill="white" />
    <ellipse cx="11" cy="14" rx="2" ry="2" fill="#2C1810" />
    <ellipse cx="21" cy="14" rx="2" ry="2" fill="#2C1810" />
    <circle cx="10" cy="13" r="1" fill="white" />
    <circle cx="20" cy="13" r="1" fill="white" />
    
    {/* Nose */}
    <path d="M16 16 L14.5 20 Q16 21 17.5 20" stroke="#B07050" strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M13 23 Q16 25 19 23" fill="#C06060" />
  </svg>
);

// Eduardo - Homem rabo de cavalo, camisa amarela
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/Shirt */}
    <path d="M8 40 L8 34 Q8 30 12 29 L16 28 L20 29 Q24 30 24 34 L24 40 Z" fill="#C7A85B" />
    <path d="M12 29 L16 31 L20 29" stroke="#A08040" strokeWidth="1" fill="none" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#F0D4B8" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="11" ry="12" fill="#FDE8D8" />
    
    {/* Ears */}
    <ellipse cx="5" cy="16" rx="2" ry="3" fill="#F0D4B8" />
    <ellipse cx="27" cy="16" rx="2" ry="3" fill="#F0D4B8" />
    
    {/* Hair base */}
    <path d="M6 14 Q6 4 16 2 Q26 4 26 14 L26 8 Q26 1 16 0 Q6 1 6 8 Z" fill="#8B4513" />
    {/* Ponytail */}
    <ellipse cx="30" cy="12" rx="3" ry="6" fill="#8B4513" />
    <path d="M27 12 L29 9 L30 12" fill="#8B4513" />
    {/* Hair tie */}
    <ellipse cx="28" cy="9" rx="1.5" ry="0.8" fill="#2C2C2C" />
    
    {/* Eyebrows */}
    <path d="M9 10 Q11 9 13 10" stroke="#6B3510" strokeWidth="1.2" fill="none" />
    <path d="M19 10 Q21 9 23 10" stroke="#6B3510" strokeWidth="1.2" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="11" cy="15" rx="3" ry="2.5" fill="white" />
    <ellipse cx="21" cy="15" rx="3" ry="2.5" fill="white" />
    <ellipse cx="11" cy="15" rx="2" ry="2" fill="#5A7030" />
    <ellipse cx="21" cy="15" rx="2" ry="2" fill="#5A7030" />
    <circle cx="10" cy="14" r="0.8" fill="white" />
    <circle cx="20" cy="14" r="0.8" fill="white" />
    
    {/* Nose */}
    <path d="M16 17 L15.5 20" stroke="#E0B090" strokeWidth="1" strokeLinecap="round" />
    
    {/* Mouth - smile */}
    <path d="M13 23 Q16 25 19 23" stroke="#B08070" strokeWidth="1" fill="none" />
  </svg>
);

// Vitória (Vítima) - Mulher elegante, cabelo médio, blusa rosa, colar
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Hair behind */}
    <path d="M4 14 Q3 26 8 34 L10 34 Q7 26 8 16 Z" fill="#5C4033" />
    <path d="M28 14 Q29 26 24 34 L22 34 Q25 26 24 16 Z" fill="#5C4033" />
    
    {/* Body/Blouse */}
    <path d="M8 40 L8 34 Q9 30 13 29 L16 28 L19 29 Q23 30 24 34 L24 40 Z" fill="#C75B8B" />
    <path d="M11 29 Q16 33 21 29" fill="#FDE8D8" />
    {/* Necklace */}
    <path d="M12 31 Q16 33 20 31" stroke="#FFD700" strokeWidth="0.8" fill="none" />
    <circle cx="16" cy="33" r="1.5" fill="#FFD700" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#F8E0C8" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="10" ry="11" fill="#FDE8D8" />
    
    {/* Cheek blush */}
    <ellipse cx="8" cy="18" rx="2" ry="1" fill="#F8C8C8" opacity="0.4" />
    <ellipse cx="24" cy="18" rx="2" ry="1" fill="#F8C8C8" opacity="0.4" />
    
    {/* Ears */}
    <ellipse cx="6" cy="16" rx="1.5" ry="2" fill="#F0D4B8" />
    <ellipse cx="26" cy="16" rx="1.5" ry="2" fill="#F0D4B8" />
    {/* Earrings */}
    <circle cx="6" cy="19" r="1" fill="#FFD700" />
    <circle cx="26" cy="19" r="1" fill="#FFD700" />
    
    {/* Hair */}
    <path d="M6 14 Q6 4 16 2 Q26 4 26 14 L26 8 Q26 1 16 0 Q6 1 6 8 Z" fill="#6B4A38" />
    <path d="M6 14 L5 22 Q6 24 8 22 L8 14 Z" fill="#5C4033" />
    <path d="M26 14 L27 22 Q26 24 24 22 L24 14 Z" fill="#5C4033" />
    {/* Bangs */}
    <path d="M8 12 Q11 8 14 11 Q16 7 18 11 Q21 8 24 12" fill="#6B4A38" />
    
    {/* Eyebrows */}
    <path d="M9 10 Q11 9 13 10" stroke="#5C4033" strokeWidth="1" fill="none" />
    <path d="M19 10 Q21 9 23 10" stroke="#5C4033" strokeWidth="1" fill="none" />
    
    {/* Eyes - large expressive */}
    <ellipse cx="11" cy="14" rx="3" ry="3.5" fill="white" />
    <ellipse cx="21" cy="14" rx="3" ry="3.5" fill="white" />
    <ellipse cx="11" cy="14" rx="2" ry="2.5" fill="#6A5040" />
    <ellipse cx="21" cy="14" rx="2" ry="2.5" fill="#6A5040" />
    <circle cx="10" cy="13" r="1" fill="white" />
    <circle cx="20" cy="13" r="1" fill="white" />
    
    {/* Eyelashes */}
    <path d="M8 12 L7 11 M10 11 L9 10 M13 11 L14 10" stroke="#3C2820" strokeWidth="0.5" />
    <path d="M18 11 L17 10 M22 11 L23 10 M24 12 L25 11" stroke="#3C2820" strokeWidth="0.5" />
    
    {/* Nose */}
    <path d="M16 16 L15.5 19" stroke="#E8C4A0" strokeWidth="0.8" strokeLinecap="round" />
    
    {/* Mouth */}
    <path d="M13 22 Q16 24 19 22" fill="#D08090" />
  </svg>
);

// Portrait 7 - Homem mais velho, bigode, camisa ciano
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/Shirt */}
    <path d="M8 40 L8 34 Q8 30 12 29 L16 28 L20 29 Q24 30 24 34 L24 40 Z" fill="#5BC7C7" />
    <path d="M12 29 L16 31 L20 29" stroke="#48A8A8" strokeWidth="1" fill="none" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#C68642" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="11" ry="12" fill="#D4966A" />
    
    {/* Ears */}
    <ellipse cx="5" cy="16" rx="2" ry="3" fill="#C68642" />
    <ellipse cx="27" cy="16" rx="2" ry="3" fill="#C68642" />
    
    {/* Hair - balding/short gray */}
    <path d="M7 12 Q7 6 16 4 Q25 6 25 12 L25 8 Q25 3 16 2 Q7 3 7 8 Z" fill="#808080" />
    
    {/* Eyebrows - bushy */}
    <path d="M8 10 Q10 8 14 10" stroke="#606060" strokeWidth="2" fill="none" />
    <path d="M18 10 Q22 8 24 10" stroke="#606060" strokeWidth="2" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="11" cy="14" rx="2.5" ry="2.5" fill="white" />
    <ellipse cx="21" cy="14" rx="2.5" ry="2.5" fill="white" />
    <ellipse cx="11" cy="14" rx="1.5" ry="1.5" fill="#4A4A4A" />
    <ellipse cx="21" cy="14" rx="1.5" ry="1.5" fill="#4A4A4A" />
    <circle cx="10" cy="13" r="0.5" fill="white" />
    <circle cx="20" cy="13" r="0.5" fill="white" />
    
    {/* Nose */}
    <path d="M16 16 L15 20 Q16 21 17 20" stroke="#B07050" strokeWidth="1" fill="none" />
    
    {/* Mustache */}
    <path d="M10 21 Q13 23 16 21 Q19 23 22 21" fill="#606060" />
    
    {/* Mouth (behind mustache) */}
    <path d="M13 24 Q16 25 19 24" stroke="#A07060" strokeWidth="0.8" fill="none" />
  </svg>
);

// Portrait 8 - Homem careca com óculos, camisa laranja
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 32 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Body/Shirt */}
    <path d="M8 40 L8 34 Q8 30 12 29 L16 28 L20 29 Q24 30 24 34 L24 40 Z" fill="#D4804A" />
    <path d="M12 29 L16 31 L20 29" stroke="#B06030" strokeWidth="1" fill="none" />
    
    {/* Neck */}
    <rect x="13" y="25" width="6" height="4" fill="#E0B898" />
    
    {/* Head */}
    <ellipse cx="16" cy="16" rx="11" ry="12" fill="#F0D4B8" />
    
    {/* Ears */}
    <ellipse cx="5" cy="16" rx="2" ry="3" fill="#E8C4A0" />
    <ellipse cx="27" cy="16" rx="2" ry="3" fill="#E8C4A0" />
    
    {/* Bald head - just a shine highlight */}
    <ellipse cx="16" cy="6" rx="8" ry="4" fill="#F8E0C8" opacity="0.5" />
    
    {/* Glasses - round */}
    <circle cx="11" cy="14" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <circle cx="21" cy="14" r="4" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <line x1="15" y1="14" x2="17" y2="14" stroke="#2C2C2C" strokeWidth="1.5" />
    
    {/* Eyebrows */}
    <path d="M8 9 Q10 8 14 9" stroke="#8B7355" strokeWidth="1.2" fill="none" />
    <path d="M18 9 Q22 8 24 9" stroke="#8B7355" strokeWidth="1.2" fill="none" />
    
    {/* Eyes (behind glasses) */}
    <ellipse cx="11" cy="14" rx="2" ry="2" fill="white" />
    <ellipse cx="21" cy="14" rx="2" ry="2" fill="white" />
    <ellipse cx="11" cy="14" rx="1.2" ry="1.2" fill="#5A7030" />
    <ellipse cx="21" cy="14" rx="1.2" ry="1.2" fill="#5A7030" />
    <circle cx="10" cy="13" r="0.5" fill="white" />
    <circle cx="20" cy="13" r="0.5" fill="white" />
    
    {/* Nose */}
    <path d="M16 16 L15.5 20" stroke="#D4A080" strokeWidth="1" strokeLinecap="round" />
    
    {/* Mouth - friendly */}
    <path d="M13 23 Q16 25 19 23" stroke="#C08060" strokeWidth="1" fill="none" />
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
