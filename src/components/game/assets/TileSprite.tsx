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
  // The tileset is 256x256px (16x16 tiles of 16px each)
  // We need to scale up from 16px to fill the container
  // backgroundSize scales the entire tileset proportionally
  // backgroundPosition must be calculated based on the scaled size
  
  return (
    <div 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/tiles/tileB_inside3.png)',
        // Scale the tileset so each 16px tile fills 100% of the container
        // Original: 256px tileset, we want 1 tile (16px) to be 100%
        // So backgroundSize should be 1600% (256/16 * 100%)
        backgroundSize: '1600% 1600%',
        // With percentage-based positioning: 0% = first tile, 100/(16-1) = ~6.67% per tile
        // Formula: (tileIndex / (totalTiles - 1)) * 100%
        backgroundPosition: `${(tileX / 15) * 100}% ${(tileY / 15) * 100}%`,
        imageRendering: 'pixelated' as const,
      }}
    />
  );
};
