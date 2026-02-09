import { AssetType } from "@/types/game";
import { TilesetKey } from "./TileSprite";

/**
 * Maps game assets to regions in tileset spritesheets.
 *
 * Each tileset is 256x256 (16x16 grid of 16px tiles).
 * Each entry defines the top-left tile (x, y), span, and which tileset to use.
 *
 * ┌──────────────────────────────────────────────────────────────┐
 * │ TILESET: inside (tileB_inside3.png) - Original              │
 * │ Row 0-1: Counter (0-3), pillows (6-7), mirror (9-10),      │
 * │          wardrobe (11-13), window (14-15)                    │
 * │ Row 2-3: Stove (0-3), blue bed (6-8), red bed (9-11)       │
 * │ Row 4-5: TV (0), vanity (2-3), bed frame (6-8)             │
 * │ Row 6-7: Dressers, cabinets                                 │
 * │ Row 8-9: Small items, electronics                           │
 * │ Row 10-11: Chests, nightstands                              │
 * │ Row 12-13: Bookshelves, decorative items                    │
 * │ Row 14-15: Rugs/mats                                        │
 * ├──────────────────────────────────────────────────────────────┤
 * │ TILESET: furniture (furniture_outdoor.png) - Tileset 1      │
 * │ Row 0-1: Brown desk (0-2), monitor (3-4), cabinet (5-6),   │
 * │          fireplace (7-9), small items (10-15)               │
 * │ Row 2-3: Green desk (0-2), monitor (3-4), filing cab (5-6),│
 * │          gray sofa (7-8), green sofa (11-12), dk sofa(13-14)│
 * │ Row 4-5: Red desk (0-2), monitor (3-4), plants (5-6),      │
 * │          armchair (8-9), wardrobes (10-15)                  │
 * │ Row 6-7: Various chairs (office, dining, colored)           │
 * │ Row 8-9: More chairs, small furniture                       │
 * │ Row 10-11: Wooden benches (0-2), wooden fences              │
 * │ Row 12-13: Park benches, more fences                        │
 * │ Row 14-15: Colorful benches (blue, green, purple, rainbow)  │
 * ├──────────────────────────────────────────────────────────────┤
 * │ TILESET: living (living_decoration.png) - Tileset 2         │
 * │ Row 0-1: Windows with curtains (0-7), bookshelves (8-15)   │
 * │ Row 2-3: More windows (0-5), electronics (6-7),            │
 * │          bookshelves with books (8-15)                       │
 * │ Row 4-5: Paintings (0-3), yellow sofa (4-5),               │
 * │          blue sofa (8-9), teal sofa (10-11)                 │
 * │ Row 6-7: Paintings (0-3), blue couch (4-5),                │
 * │          blue-gray couch (6-7)                               │
 * │ Row 8-9: Lamps (0-2), small items (3-5),                   │
 * │          red sofa (6-7), yellow sofa (10-11)                │
 * │ Row 10-11: Floor lamps (0-2), tables (3-4),                │
 * │           yellow sofa (5-7), magenta sofa (8-10)            │
 * │ Row 12-13: Tables (0-4), purple sofa (5-7),                │
 * │           orange sofa (8-10)                                 │
 * └──────────────────────────────────────────────────────────────┘
 */

export interface TileRegion {
  x: number;      // Top-left tile column (0-indexed)
  y: number;      // Top-left tile row (0-indexed)
  spanX: number;  // Width in tiles
  spanY: number;  // Height in tiles
  tileset: TilesetKey; // Which tileset PNG to use
}

// ========================== ASSET → TILE MAPPINGS ==========================
// Each asset maps to the best sprite across all tilesets.
// To override visuals, change the coordinates/tileset below.

export const TILE_ASSET_MAP: Partial<Record<AssetType, TileRegion>> = {
  // ---- From 'inside' tileset (tileB_inside3.png) ----
  table:     { x: 0,  y: 0,  spanX: 4, spanY: 2, tileset: 'inside' },
  stove:     { x: 0,  y: 2,  spanX: 4, spanY: 2, tileset: 'inside' },
  bed:       { x: 6,  y: 2,  spanX: 3, spanY: 2, tileset: 'inside' },
  tv:        { x: 0,  y: 4,  spanX: 1, spanY: 2, tileset: 'inside' },
  desk:      { x: 2,  y: 4,  spanX: 2, spanY: 2, tileset: 'inside' },
  rug:       { x: 12, y: 14, spanX: 2, spanY: 2, tileset: 'inside' },

  // ---- From 'furniture' tileset (furniture_outdoor.png) ----
  // Brown office desk with drawers (rows 0-1, cols 0-2)
  // desk:   { x: 0,  y: 0,  spanX: 3, spanY: 2, tileset: 'furniture' },
  // Computer monitor on stand (rows 0-1, cols 3-4)
  computer:  { x: 3,  y: 0,  spanX: 2, spanY: 2, tileset: 'furniture' },
  // Green plant in pot (rows 4-5, col 5)
  plant:     { x: 5,  y: 4,  spanX: 1, spanY: 2, tileset: 'furniture' },
  // Dark armchair (rows 4-5, cols 8-9)
  armchair:  { x: 8,  y: 4,  spanX: 2, spanY: 2, tileset: 'furniture' },
  // Chair - first chair in row 6 (rows 6-7, cols 0-1)
  chair:     { x: 0,  y: 6,  spanX: 2, spanY: 2, tileset: 'furniture' },

  // ---- From 'living' tileset (living_decoration.png) ----
  // Window with curtain (rows 0-1, cols 0-1)
  window:    { x: 0,  y: 0,  spanX: 2, spanY: 2, tileset: 'living' },
  // Large bookshelf (rows 0-1, cols 8-11)
  bookshelf: { x: 8,  y: 0,  spanX: 4, spanY: 2, tileset: 'living' },
  // Door/wardrobe from inside tileset
  door:      { x: 11, y: 0,  spanX: 3, spanY: 2, tileset: 'inside' },
};

// Assets that use SVG only (no tileset match):
// sofa, fridge, toilet, shower, sink, laptop, rock, debris, empty
