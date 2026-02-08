interface TileSpriteProps {
  tileX: number;      // Coluna do tile (0-indexed)
  tileY: number;      // Linha do tile (0-indexed)
  tileSize?: number;  // Tamanho do tile em pixels (default: 16px)
  className?: string;
}

/**
 * Component to render sprites directly from the tileB_inside3.png tileset
 * Uses CSS background-position to extract specific tiles from the spritesheet
 * 
 * Each tile is 16x16 pixels in the source image
 * 
 * Example: <TileSprite tileX={0} tileY={14} className="w-full h-full" />
 */
export const TileSprite = ({ 
  tileX, 
  tileY, 
  tileSize = 16, 
  className 
}: TileSpriteProps) => {
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/tiles/tileB_inside3.png)',
        backgroundPosition: `-${tileX * tileSize}px -${tileY * tileSize}px`,
        backgroundSize: 'auto',
        imageRendering: 'pixelated' as const,
      }}
    />
  );
};
