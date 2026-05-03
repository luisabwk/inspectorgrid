import {
  BedDouble,
  Sofa,
  Armchair,
  Tv,
  DoorOpen,
  AppWindow,
  Leaf,
  Table2,
  Library,
  Mountain,
  Trash2,
  Refrigerator,
  FlameKindling,
  Droplets,
  ShowerHead,
  Monitor,
  Laptop,
  Grid2x2,
  type LucideIcon,
} from "lucide-react";
import type { AssetType } from "@/types/game";

const ToiletIcon: LucideIcon = (({ className, size = 20, ...rest }: { className?: string; size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...rest}
  >
    <ellipse cx="12" cy="15" rx="6" ry="5" />
    <rect x="8" y="4" width="8" height="5" rx="1" />
    <line x1="10" y1="9" x2="10" y2="10" />
    <line x1="14" y1="9" x2="14" y2="10" />
  </svg>
)) as unknown as LucideIcon;

const ICON_MAP: Partial<Record<AssetType, LucideIcon>> = {
  bed: BedDouble,
  sofa: Sofa,
  armchair: Armchair,
  chair: Armchair,
  tv: Tv,
  door: DoorOpen,
  window: AppWindow,
  plant: Leaf,
  table: Table2,
  bookshelf: Library,
  rock: Mountain,
  debris: Trash2,
  fridge: Refrigerator,
  stove: FlameKindling,
  sink: Droplets,
  shower: ShowerHead,
  desk: Laptop,
  computer: Monitor,
  rug: Grid2x2,
  toilet: ToiletIcon,
};

interface AssetIconProps {
  assetType: AssetType;
  className?: string;
  size?: number;
}

export const AssetIcon = ({ assetType, className, size = 20 }: AssetIconProps) => {
  const Icon = ICON_MAP[assetType];
  if (!Icon) return null;
  return <Icon className={className} size={size} />;
};
