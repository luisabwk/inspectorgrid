interface TileSpriteProps {
  tileX: number;      // Coluna do tile (0-indexed)
  tileY: number;      // Linha do tile (0-indexed)
  spanX?: number;     // Quantos tiles de largura (default: 1)
  spanY?: number;     // Quantos tiles de altura (default: 1)
  className?: string;
}

const TOTAL_TILES = 16; // 16x16 grid of 16px tiles in a 256x256 tileset

/**
 * Renders a region from the tileB_inside3.png spritesheet.
 *
 * Single tile:  <TileSprite tileX={0} tileY={0} />
 * Multi-tile:   <TileSprite tileX={6} tileY={2} spanX={3} spanY={2} /> (3x2 bed)
 *
 * The tileset is 256x256px = 16x16 grid of 16px tiles.
 * CSS background-position percentage formula:
 *   pos% = tileIndex / (totalTiles - span) * 100
 */
export const TileSprite = ({
  tileX,
  tileY,
  spanX = 1,
  spanY = 1,
  className
}: TileSpriteProps) => {
  // backgroundSize: make spanX tiles fill 100% width, spanY tiles fill 100% height
  const bgSizeX = (TOTAL_TILES / spanX) * 100;
  const bgSizeY = (TOTAL_TILES / spanY) * 100;

  // CSS percentage positioning:
  //   actual_offset = (container - bg_size) * percentage
  //   We need offset = -(tileX/spanX) * container
  //   So percentage = tileX / (totalTiles - spanX)
  const maxX = TOTAL_TILES - spanX;
  const maxY = TOTAL_TILES - spanY;
  const bgPosX = maxX > 0 ? (tileX / maxX) * 100 : 0;
  const bgPosY = maxY > 0 ? (tileY / maxY) * 100 : 0;

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/tiles/tileB_inside3.png)',
        backgroundSize: `${bgSizeX}% ${bgSizeY}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated' as const,
      }}
    />
  );
};
