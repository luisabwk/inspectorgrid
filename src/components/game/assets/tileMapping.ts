import { AssetType } from "@/types/game";

/**
 * Maps game assets to regions in the tileB_inside3.png spritesheet.
 *
 * The tileset is 256x256 (16x16 grid of 16px tiles).
 * Each entry defines the top-left tile (x, y) and how many tiles to span.
 *
 * ┌──────────────────────────────────────────────────────┐
 * │ Tileset Map (tileB_inside3.png)                      │
 * │                                                       │
 * │ Row 0-1: Kitchen counter (0-3), pillows (6-7),       │
 * │          mirror (9-10), wardrobe (11-13), window(14-15)│
 * │ Row 2-3: Stove (0-3), blue bed (6-8),                │
 * │          red bed (9-11), quilt (12-15)                │
 * │ Row 4-5: TV (0), vanity (2-3), curtain (4-5),        │
 * │          bed frame (6-8), color bed (9-11),           │
 * │          fence (12-15)                                │
 * │ Row 6-7: Dressers, cabinets, small furniture          │
 * │ Row 8-9: Small items, electronics                     │
 * │ Row 10-11: Chests, nightstands                        │
 * │ Row 12-13: Bookshelves, decorative items              │
 * │ Row 14-15: Rugs/mats (colored rectangles)             │
 * └──────────────────────────────────────────────────────┘
 *
 * Assets NOT in tileset use SVG fallbacks (see AssetIcons.tsx).
 * To adjust positions, change x/y/spanX/spanY below.
 */

export interface TileRegion {
  x: number;      // Top-left tile column (0-indexed)
  y: number;      // Top-left tile row (0-indexed)
  spanX: number;  // Width in tiles
  spanY: number;  // Height in tiles
}

// Assets with tileset sprite matches
export const TILE_ASSET_MAP: Partial<Record<AssetType, TileRegion>> = {
  // Kitchen - orange counter (4 wide × 2 tall, rows 0-1)
  table:     { x: 0, y: 0, spanX: 4, spanY: 2 },

  // Kitchen - dark stove/oven area (4 wide × 2 tall, rows 2-3)
  stove:     { x: 0, y: 2, spanX: 4, spanY: 2 },

  // Bedroom - blue bed (3 wide × 2 tall, rows 2-3)
  bed:       { x: 6, y: 2, spanX: 3, spanY: 2 },

  // Living room - TV with stand (1 wide × 2 tall, rows 4-5)
  tv:        { x: 0, y: 4, spanX: 1, spanY: 2 },

  // Office - vanity/dresser with mirror (2 wide × 2 tall, rows 4-5)
  desk:      { x: 2, y: 4, spanX: 2, spanY: 2 },

  // Window (2 wide × 2 tall, rows 0-1)
  window:    { x: 14, y: 0, spanX: 2, spanY: 2 },

  // Door/wardrobe - brown panels (3 wide × 2 tall, rows 0-1)
  door:      { x: 11, y: 0, spanX: 3, spanY: 2 },

  // Bookshelf (2 wide × 2 tall, rows 12-13 area)
  bookshelf: { x: 0, y: 12, spanX: 2, spanY: 2 },

  // Rug/mat - pink rug (2 wide × 2 tall, rows 14-15)
  rug:       { x: 12, y: 14, spanX: 2, spanY: 2 },
};

// Assets that use SVG because they're not in the tileset:
// sofa, armchair, chair, fridge, sink, toilet, shower, plant,
// rock, debris, computer, empty
