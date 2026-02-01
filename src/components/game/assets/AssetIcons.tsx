import { AssetType } from "@/types/game";

interface AssetIconProps {
  className?: string;
}

export const BedIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="24" width="40" height="16" rx="2" fill="#8B7355" />
    <rect x="6" y="16" width="14" height="10" rx="2" fill="#D4A574" />
    <rect x="8" y="18" width="10" height="6" rx="1" fill="#E8D4BE" />
    <rect x="22" y="20" width="22" height="6" rx="1" fill="#F5EDE3" />
    <rect x="4" y="38" width="4" height="6" rx="1" fill="#5C4A3A" />
    <rect x="40" y="38" width="4" height="6" rx="1" fill="#5C4A3A" />
  </svg>
);

export const SofaIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="40" height="16" rx="3" fill="#7B68A0" />
    <rect x="8" y="16" width="32" height="8" rx="2" fill="#9580B8" />
    <rect x="4" y="18" width="6" height="18" rx="2" fill="#6B5A8C" />
    <rect x="38" y="18" width="6" height="18" rx="2" fill="#6B5A8C" />
    <rect x="10" y="20" width="12" height="6" rx="1" fill="#A894C8" />
    <rect x="26" y="20" width="12" height="6" rx="1" fill="#A894C8" />
    <rect x="6" y="34" width="4" height="6" rx="1" fill="#4A3D5C" />
    <rect x="38" y="34" width="4" height="6" rx="1" fill="#4A3D5C" />
  </svg>
);

export const ArmchairIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="22" width="28" height="14" rx="2" fill="#6B8E7B" />
    <rect x="14" y="16" width="20" height="8" rx="2" fill="#7FA68D" />
    <rect x="8" y="20" width="6" height="16" rx="2" fill="#5A7D6A" />
    <rect x="34" y="20" width="6" height="16" rx="2" fill="#5A7D6A" />
    <rect x="12" y="34" width="4" height="6" rx="1" fill="#3D5247" />
    <rect x="32" y="34" width="4" height="6" rx="1" fill="#3D5247" />
  </svg>
);

export const RugIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="14" width="36" height="20" rx="1" fill="#C4A77D" />
    <rect x="10" y="18" width="28" height="12" rx="1" fill="#D4B88D" stroke="#A68B5B" strokeWidth="1" />
    <path d="M10 18h28M10 30h28" stroke="#A68B5B" strokeWidth="0.5" />
    <circle cx="24" cy="24" r="4" fill="#E8D4BE" stroke="#A68B5B" strokeWidth="0.5" />
  </svg>
);

export const WindowIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="32" height="32" rx="2" fill="#E8E4E0" stroke="#8B7355" strokeWidth="2" />
    <rect x="10" y="10" width="13" height="13" fill="#A8D4E6" />
    <rect x="25" y="10" width="13" height="13" fill="#A8D4E6" />
    <rect x="10" y="25" width="13" height="13" fill="#A8D4E6" />
    <rect x="25" y="25" width="13" height="13" fill="#A8D4E6" />
    <line x1="24" y1="10" x2="24" y2="38" stroke="#8B7355" strokeWidth="2" />
    <line x1="10" y1="24" x2="38" y2="24" stroke="#8B7355" strokeWidth="2" />
  </svg>
);

export const PlantIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="32" width="16" height="12" rx="2" fill="#D4A574" />
    <rect x="18" y="34" width="12" height="8" rx="1" fill="#8B5A2B" />
    <ellipse cx="24" cy="26" rx="10" ry="12" fill="#4A7C59" />
    <ellipse cx="20" cy="22" rx="6" ry="8" fill="#5D9B6E" />
    <ellipse cx="28" cy="24" rx="5" ry="7" fill="#5D9B6E" />
    <ellipse cx="24" cy="18" rx="4" ry="6" fill="#6BAF7C" />
  </svg>
);

export const TableIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="18" width="36" height="4" rx="1" fill="#8B7355" />
    <rect x="10" y="22" width="4" height="18" fill="#6B5A48" />
    <rect x="34" y="22" width="4" height="18" fill="#6B5A48" />
  </svg>
);

export const TvIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="12" width="36" height="24" rx="2" fill="#2C2C2C" />
    <rect x="8" y="14" width="32" height="20" rx="1" fill="#4A90A4" />
    <rect x="20" y="36" width="8" height="2" fill="#2C2C2C" />
    <rect x="14" y="38" width="20" height="3" rx="1" fill="#3C3C3C" />
  </svg>
);

export const BookshelfIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="6" width="32" height="36" fill="#8B7355" />
    <rect x="10" y="8" width="28" height="8" fill="#6B5A48" />
    <rect x="10" y="18" width="28" height="8" fill="#6B5A48" />
    <rect x="10" y="28" width="28" height="8" fill="#6B5A48" />
    <rect x="12" y="10" width="4" height="5" fill="#C75B5B" />
    <rect x="17" y="9" width="3" height="6" fill="#5B8BC7" />
    <rect x="21" y="10" width="5" height="5" fill="#5BC77C" />
    <rect x="28" y="9" width="4" height="6" fill="#C7A85B" />
    <rect x="14" y="20" width="5" height="5" fill="#7B5BC7" />
    <rect x="20" y="19" width="4" height="6" fill="#C75B8B" />
    <rect x="26" y="20" width="6" height="5" fill="#5BC7C7" />
  </svg>
);

export const RockIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 32 L16 24 L24 28 L32 22 L40 30 L36 36 L12 36 Z" fill="#8B8B8B" />
    <path d="M12 30 L18 26 L22 28 L16 32 Z" fill="#A0A0A0" />
    <path d="M26 28 L32 24 L36 30 L30 32 Z" fill="#707070" />
  </svg>
);

export const DebrisIcon = ({ className }: AssetIconProps) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="28" width="8" height="6" fill="#B87333" transform="rotate(-10 10 28)" />
    <rect x="22" y="30" width="10" height="5" fill="#A0522D" transform="rotate(5 22 30)" />
    <rect x="30" y="26" width="6" height="8" fill="#CD853F" transform="rotate(-5 30 26)" />
    <rect x="16" y="32" width="7" height="4" fill="#8B4513" transform="rotate(8 16 32)" />
  </svg>
);

export const EmptyIcon = ({ className }: AssetIconProps) => (
  <div className={className} />
);

// Map asset types to their icon components
export const AssetIconMap: Record<AssetType, React.FC<AssetIconProps>> = {
  empty: EmptyIcon,
  bed: BedIcon,
  sofa: SofaIcon,
  armchair: ArmchairIcon,
  rug: RugIcon,
  window: WindowIcon,
  plant: PlantIcon,
  table: TableIcon,
  tv: TvIcon,
  bookshelf: BookshelfIcon,
  rock: RockIcon,
  debris: DebrisIcon,
};
