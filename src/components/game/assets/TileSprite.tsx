/**
 * Available tileset files in /public/tiles/.
 * Each is 256x256px = 16x16 grid of 16px tiles.
 */
export const TILESETS = {
  inside:    '/tiles/tileB_inside3.png',    // Beds, kitchen, rugs, windows, bathroom
  furniture: '/tiles/tileB_inside2.png',    // Chairs, fences, fireplaces, tables, plants
  living:    '/tiles/tileB_inside1.png',     // Windows, bookshelves, sofas, lamps, paintings
} as const;

export type TilesetKey = keyof typeof TILESETS;

interface TileSpriteProps {
  tileX: number;      // Tile column (0-indexed)
  tileY: number;      // Tile row (0-indexed)
  spanX?: number;     // Width in tiles (default: 1)
  spanY?: number;     // Height in tiles (default: 1)
  tileset?: TilesetKey | string; // Which tileset to use (key or raw path)
  className?: string;
}

const TOTAL_TILES = 16; // 16x16 grid

/**
 * Renders a region from a tileset spritesheet.
 *
 * Single tile:  <TileSprite tileX={0} tileY={0} />
 * Multi-tile:   <TileSprite tileX={6} tileY={2} spanX={3} spanY={2} />
 * Other tileset: <TileSprite tileX={0} tileY={0} tileset="furniture" />
 *
 * CSS background-position percentage formula:
 *   pos% = tileIndex / (totalTiles - span) * 100
 */
export const TileSprite = ({
  tileX,
  tileY,
  spanX = 1,
  spanY = 1,
  tileset = 'inside',
  className
}: TileSpriteProps) => {
  // Resolve tileset path
  const tilesetPath = tileset in TILESETS
    ? TILESETS[tileset as TilesetKey]
    : tileset;

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
        backgroundImage: `url(${tilesetPath})`,
        backgroundSize: `${bgSizeX}% ${bgSizeY}%`,
        backgroundPosition: `${bgPosX}% ${bgPosY}%`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated' as const,
      }}
    />
  );
};
