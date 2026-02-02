interface PortraitProps {
  className?: string;
  color?: string;
}

// Alberto - Homem maduro, cabelo curto escuro, camisa verde
export const Portrait1 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Body/Shirt */}
    <path d="M10 64 L10 52 Q10 46 16 44 L24 42 L32 44 Q38 46 38 52 L38 64 Z" fill="#4A7C59" />
    {/* Shirt collar */}
    <path d="M20 44 L24 48 L28 44" fill="none" stroke="#3A6249" strokeWidth="1.5" />
    {/* Shirt folds */}
    <path d="M16 50 Q18 54 16 58" stroke="#3A6249" strokeWidth="0.5" fill="none" />
    <path d="M32 50 Q30 54 32 58" stroke="#3A6249" strokeWidth="0.5" fill="none" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#E8C4A0" />
    <path d="M20 38 L20 42" stroke="#D4A080" strokeWidth="0.5" />
    
    {/* Head shape */}
    <ellipse cx="24" cy="26" rx="14" ry="16" fill="#F0D4B8" />
    {/* Face shadow */}
    <path d="M12 30 Q14 38 24 40 Q34 38 36 30" fill="#E8C4A0" />
    
    {/* Ears */}
    <ellipse cx="10" cy="26" rx="2" ry="3" fill="#E8C4A0" />
    <ellipse cx="38" cy="26" rx="2" ry="3" fill="#E8C4A0" />
    <ellipse cx="10" cy="26" rx="1" ry="2" fill="#D4A080" />
    <ellipse cx="38" cy="26" rx="1" ry="2" fill="#D4A080" />
    
    {/* Hair - short masculine style */}
    <path d="M10 22 Q10 10 24 8 Q38 10 38 22 L38 18 Q38 8 24 6 Q10 8 10 18 Z" fill="#2C1810" />
    {/* Hair highlight */}
    <path d="M16 12 Q20 10 26 12" stroke="#3D2920" strokeWidth="1" fill="none" />
    {/* Hair texture */}
    <path d="M14 16 L16 14 M20 14 L22 12 M28 14 L30 12 M34 16 L32 14" stroke="#1C0C08" strokeWidth="0.5" />
    
    {/* Eyebrows */}
    <path d="M16 20 Q19 18 22 20" stroke="#2C1810" strokeWidth="1.5" fill="none" />
    <path d="M26 20 Q29 18 32 20" stroke="#2C1810" strokeWidth="1.5" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="19" cy="26" rx="3.5" ry="3" fill="white" />
    <ellipse cx="29" cy="26" rx="3.5" ry="3" fill="white" />
    <ellipse cx="19" cy="26" rx="2" ry="2" fill="#3D2920" />
    <ellipse cx="29" cy="26" rx="2" ry="2" fill="#3D2920" />
    <circle cx="18" cy="25" r="0.8" fill="white" />
    <circle cx="28" cy="25" r="0.8" fill="white" />
    {/* Eyelids */}
    <path d="M15 24 Q19 23 23 24" stroke="#D4A080" strokeWidth="0.5" fill="none" />
    <path d="M25 24 Q29 23 33 24" stroke="#D4A080" strokeWidth="0.5" fill="none" />
    
    {/* Nose */}
    <path d="M24 28 L23 32 Q24 33 25 32 L24 28" stroke="#D4A080" strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M20 36 Q24 38 28 36" stroke="#C08060" strokeWidth="1" fill="none" />
  </svg>
);

// Beatriz - Mulher jovem, cabelo longo loiro, blusa roxa
export const Portrait2 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Long hair behind */}
    <path d="M6 20 Q4 40 10 56 L14 56 Q10 40 12 24 Z" fill="#D4A574" />
    <path d="M42 20 Q44 40 38 56 L34 56 Q38 40 36 24 Z" fill="#D4A574" />
    
    {/* Body/Blouse */}
    <path d="M10 64 L10 52 Q12 46 18 44 L24 42 L30 44 Q36 46 38 52 L38 64 Z" fill="#7B68A0" />
    {/* Blouse neckline - V-neck */}
    <path d="M18 44 L24 50 L30 44" fill="#F0D4B8" stroke="#6A5890" strokeWidth="0.5" />
    {/* Blouse folds */}
    <path d="M14 52 Q16 56 14 60" stroke="#6A5890" strokeWidth="0.5" fill="none" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#F0D4B8" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="13" ry="15" fill="#FDE8D8" />
    {/* Cheeks blush */}
    <ellipse cx="14" cy="30" rx="2" ry="1.5" fill="#F8C8C8" opacity="0.5" />
    <ellipse cx="34" cy="30" rx="2" ry="1.5" fill="#F8C8C8" opacity="0.5" />
    
    {/* Ears (behind hair) */}
    <ellipse cx="11" cy="26" rx="1.5" ry="2.5" fill="#F0D4B8" />
    <ellipse cx="37" cy="26" rx="1.5" ry="2.5" fill="#F0D4B8" />
    
    {/* Hair - long flowing */}
    <path d="M11 22 Q11 10 24 8 Q37 10 37 22 L37 16 Q37 6 24 4 Q11 6 11 16 Z" fill="#E8C080" />
    {/* Hair sides */}
    <path d="M11 22 L9 38 Q10 42 14 38 L14 22 Z" fill="#D4A574" />
    <path d="M37 22 L39 38 Q38 42 34 38 L34 22 Z" fill="#D4A574" />
    {/* Hair bangs */}
    <path d="M14 18 Q16 14 20 16 Q22 12 26 16 Q30 12 32 16 Q34 14 36 18" fill="#E8C080" />
    {/* Hair highlights */}
    <path d="M16 10 Q20 8 26 10" stroke="#F0D090" strokeWidth="1" fill="none" />
    <path d="M8 30 L10 28" stroke="#F0D090" strokeWidth="0.5" />
    <path d="M40 30 L38 28" stroke="#F0D090" strokeWidth="0.5" />
    
    {/* Eyebrows */}
    <path d="M15 20 Q18 19 21 20" stroke="#C08860" strokeWidth="1" fill="none" />
    <path d="M27 20 Q30 19 33 20" stroke="#C08860" strokeWidth="1" fill="none" />
    
    {/* Eyes - larger, feminine */}
    <ellipse cx="18" cy="26" rx="4" ry="3.5" fill="white" />
    <ellipse cx="30" cy="26" rx="4" ry="3.5" fill="white" />
    <ellipse cx="18" cy="26" rx="2.5" ry="2.5" fill="#4A7090" />
    <ellipse cx="30" cy="26" rx="2.5" ry="2.5" fill="#4A7090" />
    <circle cx="17" cy="25" r="1" fill="white" />
    <circle cx="29" cy="25" r="1" fill="white" />
    {/* Eyelashes */}
    <path d="M14 24 L13 22 M16 23 L15 21 M22 23 L23 21 M24 24 L25 22" stroke="#2C1810" strokeWidth="0.5" />
    <path d="M26 24 L25 22 M28 23 L27 21 M34 23 L35 21 M36 24 L37 22" stroke="#2C1810" strokeWidth="0.5" />
    
    {/* Nose */}
    <path d="M24 28 L23.5 31 Q24 32 24.5 31 L24 28" stroke="#E8C4A0" strokeWidth="0.6" fill="none" />
    
    {/* Mouth - with lipstick */}
    <path d="M21 35 Q24 37 27 35" fill="#D08080" />
    <path d="M22 35 Q24 36 26 35" fill="#E09090" />
  </svg>
);

// Carlos - Homem com óculos, cabelo médio castanho, camisa vermelha
export const Portrait3 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Body/Shirt */}
    <path d="M10 64 L10 52 Q10 46 16 44 L24 42 L32 44 Q38 46 38 52 L38 64 Z" fill="#C75B5B" />
    {/* Collar */}
    <path d="M18 44 L24 48 L30 44" fill="none" stroke="#A04848" strokeWidth="1.5" />
    {/* Pocket */}
    <rect x="28" y="52" width="6" height="5" fill="none" stroke="#A04848" strokeWidth="0.5" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#D4A574" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="14" ry="16" fill="#E0B898" />
    {/* Face shadow */}
    <path d="M12 30 Q14 38 24 40 Q34 38 36 30" fill="#D4A080" />
    
    {/* Ears */}
    <ellipse cx="10" cy="26" rx="2" ry="3" fill="#D4A080" />
    <ellipse cx="38" cy="26" rx="2" ry="3" fill="#D4A080" />
    
    {/* Hair - medium wavy */}
    <path d="M10 24 Q10 10 24 8 Q38 10 38 24 L38 18 Q38 6 24 4 Q10 6 10 18 Z" fill="#4A3728" />
    {/* Hair sides */}
    <path d="M10 24 L10 30 Q11 32 13 30 L13 24 Z" fill="#4A3728" />
    <path d="M38 24 L38 30 Q37 32 35 30 L35 24 Z" fill="#4A3728" />
    {/* Hair texture */}
    <path d="M14 14 Q18 12 22 14 Q26 12 30 14 Q34 12 36 16" stroke="#3A2718" strokeWidth="0.5" fill="none" />
    
    {/* Glasses */}
    <rect x="13" y="22" width="10" height="8" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <rect x="25" y="22" width="10" height="8" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <line x1="23" y1="26" x2="25" y2="26" stroke="#2C2C2C" strokeWidth="1.5" />
    <line x1="10" y1="26" x2="13" y2="26" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="35" y1="26" x2="38" y2="26" stroke="#2C2C2C" strokeWidth="1" />
    {/* Glass reflection */}
    <path d="M15 24 L17 26" stroke="white" strokeWidth="0.5" opacity="0.5" />
    <path d="M27 24 L29 26" stroke="white" strokeWidth="0.5" opacity="0.5" />
    
    {/* Eyebrows (behind glasses) */}
    <path d="M14 20 Q17 18 22 20" stroke="#4A3728" strokeWidth="1.5" fill="none" />
    <path d="M26 20 Q31 18 34 20" stroke="#4A3728" strokeWidth="1.5" fill="none" />
    
    {/* Eyes (behind glasses) */}
    <ellipse cx="18" cy="26" rx="2.5" ry="2" fill="white" />
    <ellipse cx="30" cy="26" rx="2.5" ry="2" fill="white" />
    <ellipse cx="18" cy="26" rx="1.5" ry="1.5" fill="#3D5040" />
    <ellipse cx="30" cy="26" rx="1.5" ry="1.5" fill="#3D5040" />
    <circle cx="17" cy="25" r="0.5" fill="white" />
    <circle cx="29" cy="25" r="0.5" fill="white" />
    
    {/* Nose */}
    <path d="M24 28 L23 32 Q24 34 25 32 L24 28" stroke="#C09070" strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M20 36 Q24 38 28 36" stroke="#A07060" strokeWidth="1" fill="none" />
  </svg>
);

// Diana - Mulher pele escura, cabelo curto, blusa azul
export const Portrait4 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Body/Blouse */}
    <path d="M10 64 L10 52 Q12 46 18 44 L24 42 L30 44 Q36 46 38 52 L38 64 Z" fill="#5B8BC7" />
    {/* Blouse details */}
    <path d="M18 44 Q24 48 30 44" fill="#F0D4B8" />
    {/* Button */}
    <circle cx="24" cy="52" r="1.5" fill="#4A7AB0" stroke="#3A6A90" strokeWidth="0.5" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#C68642" />
    
    {/* Earrings */}
    <circle cx="10" cy="30" r="2" fill="#FFD700" />
    <circle cx="38" cy="30" r="2" fill="#FFD700" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="13" ry="15" fill="#D4966A" />
    {/* Face highlight */}
    <ellipse cx="24" cy="22" rx="8" ry="6" fill="#D8A070" opacity="0.3" />
    
    {/* Ears */}
    <ellipse cx="11" cy="26" rx="2" ry="3" fill="#C68642" />
    <ellipse cx="37" cy="26" rx="2" ry="3" fill="#C68642" />
    
    {/* Hair - short curly afro style */}
    <ellipse cx="24" cy="16" rx="16" ry="12" fill="#1C1C1C" />
    <path d="M10 20 Q8 26 12 28 L12 22 Q10 20 10 20" fill="#1C1C1C" />
    <path d="M38 20 Q40 26 36 28 L36 22 Q38 20 38 20" fill="#1C1C1C" />
    {/* Hair texture - curls */}
    <circle cx="16" cy="12" r="3" fill="#2C2C2C" />
    <circle cx="24" cy="10" r="3" fill="#2C2C2C" />
    <circle cx="32" cy="12" r="3" fill="#2C2C2C" />
    <circle cx="12" cy="18" r="2.5" fill="#2C2C2C" />
    <circle cx="36" cy="18" r="2.5" fill="#2C2C2C" />
    {/* Hair highlights */}
    <circle cx="18" cy="10" r="0.8" fill="#3C3C3C" />
    <circle cx="28" cy="8" r="0.8" fill="#3C3C3C" />
    
    {/* Eyebrows */}
    <path d="M15 20 Q18 18 21 20" stroke="#1C1C1C" strokeWidth="1.2" fill="none" />
    <path d="M27 20 Q30 18 33 20" stroke="#1C1C1C" strokeWidth="1.2" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="18" cy="26" rx="3.5" ry="3" fill="white" />
    <ellipse cx="30" cy="26" rx="3.5" ry="3" fill="white" />
    <ellipse cx="18" cy="26" rx="2" ry="2" fill="#2C1810" />
    <ellipse cx="30" cy="26" rx="2" ry="2" fill="#2C1810" />
    <circle cx="17" cy="25" r="0.8" fill="white" />
    <circle cx="29" cy="25" r="0.8" fill="white" />
    {/* Eyeliner */}
    <path d="M14 25 Q18 23 22 25" stroke="#1C1C1C" strokeWidth="0.5" fill="none" />
    <path d="M26 25 Q30 23 34 25" stroke="#1C1C1C" strokeWidth="0.5" fill="none" />
    
    {/* Nose */}
    <path d="M24 28 L22.5 32 Q24 34 25.5 32 L24 28" stroke="#B07050" strokeWidth="0.8" fill="none" />
    
    {/* Mouth */}
    <path d="M20 36 Q24 38 28 36" fill="#C06060" />
    <path d="M21 36 Q24 37 27 36" fill="#D07070" />
  </svg>
);

// Eduardo - Homem rabo de cavalo, camisa amarela
export const Portrait5 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Body/Shirt */}
    <path d="M10 64 L10 52 Q10 46 16 44 L24 42 L32 44 Q38 46 38 52 L38 64 Z" fill="#C7A85B" />
    {/* Shirt collar */}
    <path d="M18 44 L24 48 L30 44" fill="none" stroke="#A08040" strokeWidth="1.5" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#F0D4B8" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="14" ry="16" fill="#FDE8D8" />
    {/* Face shadow */}
    <path d="M12 30 Q14 38 24 40 Q34 38 36 30" fill="#F0D4B8" />
    
    {/* Ears */}
    <ellipse cx="10" cy="26" rx="2" ry="3" fill="#F0D4B8" />
    <ellipse cx="38" cy="26" rx="2" ry="3" fill="#F0D4B8" />
    
    {/* Hair base */}
    <path d="M12 22 Q12 10 24 8 Q36 10 36 22 L36 16 Q36 6 24 4 Q12 6 12 16 Z" fill="#8B4513" />
    {/* Ponytail */}
    <ellipse cx="42" cy="18" rx="4" ry="8" fill="#8B4513" />
    <path d="M38 18 L40 14 L42 18" fill="#8B4513" />
    {/* Hair tie */}
    <ellipse cx="40" cy="14" rx="2" ry="1" fill="#2C2C2C" />
    {/* Hair highlights */}
    <path d="M16 12 Q22 10 28 12" stroke="#A05520" strokeWidth="0.8" fill="none" />
    
    {/* Eyebrows */}
    <path d="M15 20 Q18 18 21 20" stroke="#6B3510" strokeWidth="1.2" fill="none" />
    <path d="M27 20 Q30 18 33 20" stroke="#6B3510" strokeWidth="1.2" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="18" cy="26" rx="3" ry="2.5" fill="white" />
    <ellipse cx="30" cy="26" rx="3" ry="2.5" fill="white" />
    <ellipse cx="18" cy="26" rx="1.8" ry="1.8" fill="#5A7030" />
    <ellipse cx="30" cy="26" rx="1.8" ry="1.8" fill="#5A7030" />
    <circle cx="17" cy="25" r="0.7" fill="white" />
    <circle cx="29" cy="25" r="0.7" fill="white" />
    
    {/* Nose */}
    <path d="M24 28 L23 32 Q24 33 25 32 L24 28" stroke="#E0B090" strokeWidth="0.8" fill="none" />
    
    {/* Mouth - slight smile */}
    <path d="M20 36 Q24 39 28 36" stroke="#B08070" strokeWidth="1" fill="none" />
    <path d="M22 37 Q24 38 26 37" stroke="#C09080" strokeWidth="0.5" fill="none" />
  </svg>
);

// Vitória (Vítima) - Mulher elegante, cabelo médio, blusa rosa
export const Portrait6 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Hair behind */}
    <path d="M8 24 Q6 40 12 50 L16 50 Q12 40 14 26 Z" fill="#5C4033" />
    <path d="M40 24 Q42 40 36 50 L32 50 Q36 40 34 26 Z" fill="#5C4033" />
    
    {/* Body/Blouse */}
    <path d="M10 64 L10 52 Q12 46 18 44 L24 42 L30 44 Q36 46 38 52 L38 64 Z" fill="#C75B8B" />
    {/* Blouse neckline */}
    <path d="M16 44 Q24 50 32 44" fill="#F0D4B8" />
    {/* Necklace */}
    <path d="M18 46 Q24 50 30 46" stroke="#FFD700" strokeWidth="1" fill="none" />
    <circle cx="24" cy="50" r="2" fill="#FFD700" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#F8E0C8" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="13" ry="15" fill="#FDE8D8" />
    {/* Cheek blush */}
    <ellipse cx="14" cy="30" rx="2" ry="1.5" fill="#F8C8C8" opacity="0.4" />
    <ellipse cx="34" cy="30" rx="2" ry="1.5" fill="#F8C8C8" opacity="0.4" />
    
    {/* Ears */}
    <ellipse cx="11" cy="26" rx="1.5" ry="2.5" fill="#F0D4B8" />
    <ellipse cx="37" cy="26" rx="1.5" ry="2.5" fill="#F0D4B8" />
    {/* Earrings */}
    <circle cx="11" cy="30" r="1.5" fill="#FFD700" />
    <circle cx="37" cy="30" r="1.5" fill="#FFD700" />
    
    {/* Hair */}
    <path d="M11 22 Q11 10 24 8 Q37 10 37 22 L37 16 Q37 6 24 4 Q11 6 11 16 Z" fill="#6B4A38" />
    {/* Hair sides */}
    <path d="M11 22 L10 34 Q11 38 14 34 L14 22 Z" fill="#5C4033" />
    <path d="M37 22 L38 34 Q37 38 34 34 L34 22 Z" fill="#5C4033" />
    {/* Hair highlights */}
    <path d="M15 10 Q20 8 28 10" stroke="#7C5A48" strokeWidth="1" fill="none" />
    {/* Styled bangs */}
    <path d="M14 18 Q18 14 22 18 Q26 14 30 18 Q34 14 36 18" fill="#6B4A38" />
    
    {/* Eyebrows - elegant arch */}
    <path d="M14 20 Q17 18 21 20" stroke="#5C4033" strokeWidth="1" fill="none" />
    <path d="M27 20 Q31 18 34 20" stroke="#5C4033" strokeWidth="1" fill="none" />
    
    {/* Eyes - large, expressive */}
    <ellipse cx="18" cy="26" rx="4" ry="3.5" fill="white" />
    <ellipse cx="30" cy="26" rx="4" ry="3.5" fill="white" />
    <ellipse cx="18" cy="26" rx="2.5" ry="2.5" fill="#6A5040" />
    <ellipse cx="30" cy="26" rx="2.5" ry="2.5" fill="#6A5040" />
    <circle cx="17" cy="25" r="1" fill="white" />
    <circle cx="29" cy="25" r="1" fill="white" />
    {/* Eyelashes */}
    <path d="M14 24 L13 22 M16 23 L15 21 M20 23 L21 21 M22 24 L23 22" stroke="#3C2820" strokeWidth="0.5" />
    <path d="M26 24 L25 22 M28 23 L27 21 M32 23 L33 21 M34 24 L35 22" stroke="#3C2820" strokeWidth="0.5" />
    
    {/* Nose */}
    <path d="M24 28 L23 31 Q24 32 25 31 L24 28" stroke="#E8C4A0" strokeWidth="0.6" fill="none" />
    
    {/* Mouth - elegant */}
    <path d="M20 35 Q24 37 28 35" fill="#D08090" />
    <path d="M21 35 Q24 36 27 35" fill="#E0A0A0" />
  </svg>
);

// Portrait 7 - Homem mais velho, bigode, camisa ciano
export const Portrait7 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Body/Shirt */}
    <path d="M10 64 L10 52 Q10 46 16 44 L24 42 L32 44 Q38 46 38 52 L38 64 Z" fill="#5BC7C7" />
    {/* Collar */}
    <path d="M18 44 L24 48 L30 44" fill="none" stroke="#48A8A8" strokeWidth="1.5" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#C68642" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="14" ry="16" fill="#D4966A" />
    
    {/* Ears */}
    <ellipse cx="10" cy="26" rx="2" ry="3" fill="#C68642" />
    <ellipse cx="38" cy="26" rx="2" ry="3" fill="#C68642" />
    
    {/* Hair - short graying */}
    <path d="M12 22 Q12 12 24 10 Q36 12 36 22 L36 18 Q36 8 24 6 Q12 8 12 18 Z" fill="#5C5050" />
    {/* Gray streaks */}
    <path d="M16 14 L18 12" stroke="#808080" strokeWidth="1" />
    <path d="M30 14 L32 12" stroke="#808080" strokeWidth="1" />
    
    {/* Eyebrows - bushy */}
    <path d="M14 20 Q18 17 22 20" stroke="#5C5050" strokeWidth="2" fill="none" />
    <path d="M26 20 Q30 17 34 20" stroke="#5C5050" strokeWidth="2" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="18" cy="26" rx="3" ry="2.5" fill="white" />
    <ellipse cx="30" cy="26" rx="3" ry="2.5" fill="white" />
    <ellipse cx="18" cy="26" rx="1.8" ry="1.8" fill="#3D2920" />
    <ellipse cx="30" cy="26" rx="1.8" ry="1.8" fill="#3D2920" />
    <circle cx="17" cy="25" r="0.6" fill="white" />
    <circle cx="29" cy="25" r="0.6" fill="white" />
    {/* Crow's feet */}
    <path d="M10 26 L12 25 M10 27 L12 27 M10 28 L12 29" stroke="#B08060" strokeWidth="0.3" />
    <path d="M38 26 L36 25 M38 27 L36 27 M38 28 L36 29" stroke="#B08060" strokeWidth="0.3" />
    
    {/* Nose */}
    <path d="M24 28 L22.5 33 Q24 35 25.5 33 L24 28" stroke="#B07050" strokeWidth="0.8" fill="none" />
    
    {/* Mustache */}
    <path d="M18 36 Q20 34 24 35 Q28 34 30 36 Q28 38 24 37 Q20 38 18 36" fill="#5C5050" />
    
    {/* Mouth */}
    <path d="M22 40 Q24 41 26 40" stroke="#A07060" strokeWidth="0.8" fill="none" />
  </svg>
);

// Portrait 8 - Homem careca com óculos, camisa verde escuro
export const Portrait8 = ({ className }: PortraitProps) => (
  <svg viewBox="0 0 48 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <circle cx="24" cy="28" r="22" fill="currentColor" opacity="0.2" />
    
    {/* Body/Shirt */}
    <path d="M10 64 L10 52 Q10 46 16 44 L24 42 L32 44 Q38 46 38 52 L38 64 Z" fill="#4A7C59" />
    {/* Collar */}
    <path d="M18 44 L24 48 L30 44" fill="none" stroke="#3A6249" strokeWidth="1.5" />
    
    {/* Neck */}
    <rect x="20" y="38" width="8" height="8" fill="#D4A574" />
    
    {/* Head */}
    <ellipse cx="24" cy="26" rx="14" ry="16" fill="#E0B898" />
    {/* Bald head shine */}
    <ellipse cx="24" cy="16" rx="8" ry="4" fill="#F0C8A8" opacity="0.5" />
    
    {/* Ears */}
    <ellipse cx="10" cy="26" rx="2" ry="3" fill="#D4A080" />
    <ellipse cx="38" cy="26" rx="2" ry="3" fill="#D4A080" />
    
    {/* Remaining hair on sides */}
    <path d="M10 22 Q10 20 12 18 L12 28 Q10 28 10 26 Z" fill="#2C1810" />
    <path d="M38 22 Q38 20 36 18 L36 28 Q38 28 38 26 Z" fill="#2C1810" />
    
    {/* Glasses */}
    <rect x="12" y="22" width="11" height="9" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <rect x="25" y="22" width="11" height="9" rx="2" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
    <line x1="23" y1="26" x2="25" y2="26" stroke="#2C2C2C" strokeWidth="1.5" />
    <line x1="10" y1="26" x2="12" y2="26" stroke="#2C2C2C" strokeWidth="1" />
    <line x1="36" y1="26" x2="38" y2="26" stroke="#2C2C2C" strokeWidth="1" />
    {/* Glass reflection */}
    <path d="M14 24 L16 26" stroke="white" strokeWidth="0.5" opacity="0.4" />
    <path d="M27 24 L29 26" stroke="white" strokeWidth="0.5" opacity="0.4" />
    
    {/* Eyebrows */}
    <path d="M14 20 Q17 18 22 20" stroke="#2C1810" strokeWidth="1" fill="none" />
    <path d="M26 20 Q31 18 34 20" stroke="#2C1810" strokeWidth="1" fill="none" />
    
    {/* Eyes */}
    <ellipse cx="17.5" cy="26" rx="2.5" ry="2" fill="white" />
    <ellipse cx="30.5" cy="26" rx="2.5" ry="2" fill="white" />
    <ellipse cx="17.5" cy="26" rx="1.5" ry="1.5" fill="#3D5040" />
    <ellipse cx="30.5" cy="26" rx="1.5" ry="1.5" fill="#3D5040" />
    <circle cx="16.5" cy="25" r="0.5" fill="white" />
    <circle cx="29.5" cy="25" r="0.5" fill="white" />
    
    {/* Nose */}
    <path d="M24 28 L22.5 33 Q24 35 25.5 33 L24 28" stroke="#C09070" strokeWidth="0.8" fill="none" />
    
    {/* Goatee */}
    <path d="M22 38 Q24 42 26 38 Q24 40 22 38" fill="#2C1810" />
    <path d="M22 36 L22 38 M26 36 L26 38" stroke="#2C1810" strokeWidth="0.8" />
    
    {/* Mouth */}
    <path d="M22 36 Q24 37 26 36" stroke="#A07060" strokeWidth="0.8" fill="none" />
  </svg>
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
