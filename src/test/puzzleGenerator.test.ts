import { describe, it, expect } from "vitest";
import { __test } from "@/lib/puzzleGenerator";

const { buildLayout, parseAiJson, buildUserMessage } = __test;

describe("buildLayout", () => {
  it.each([5, 6, 7, 8, 9] as const)("produces a valid layout for size %i", (size) => {
    const layout = buildLayout(size);
    expect(layout.cells.length).toBe(size);
    for (const row of layout.cells) {
      expect(row.length).toBe(size);
      for (const cell of row) {
        expect(cell.roomId).toBeTruthy();
      }
    }
    // Even sizes → 4 rooms; odd sizes → 5 rooms (corridor included).
    expect(layout.rooms.length).toBe(size % 2 === 0 ? 4 : 5);
    // Every roomId on a cell exists in the rooms list.
    const roomIds = new Set(layout.rooms.map((r) => r.id));
    for (const row of layout.cells) {
      for (const cell of row) {
        expect(roomIds.has(cell.roomId!)).toBe(true);
      }
    }
  });

  it("places at least one bed in the bedroom", () => {
    const layout = buildLayout(6);
    const bedroomId = layout.rooms.find((r) => r.name === "Quarto")!.id;
    const bedroomCells = layout.cells.flat().filter((c) => c.roomId === bedroomId);
    expect(bedroomCells.some((c) => c.asset === "bed")).toBe(true);
  });

  it("places kitchen furniture (fridge, stove, sink)", () => {
    const layout = buildLayout(7);
    const kitchenId = layout.rooms.find((r) => r.name === "Cozinha")!.id;
    const kitchenAssets = layout.cells
      .flat()
      .filter((c) => c.roomId === kitchenId)
      .map((c) => c.asset);
    expect(kitchenAssets).toContain("fridge");
    expect(kitchenAssets).toContain("stove");
    expect(kitchenAssets).toContain("sink");
  });
});

describe("parseAiJson", () => {
  it("parses a clean JSON response", () => {
    const raw = JSON.stringify({
      suspects: [
        { id: "s1", name: "A", portraitId: "portrait1", color: "hsl(0 0% 0%)", isVictim: true },
        { id: "s2", name: "B", portraitId: "portrait2", color: "hsl(0 0% 0%)" },
      ],
      solution: { "0-0": "s1", "1-1": "s2" },
      clues: [
        {
          id: "c1",
          text: "X",
          type: "room",
          constraint: { kind: "in_room", suspectId: "s1", roomId: "r1" },
        },
      ],
    });
    const parsed = parseAiJson(raw);
    expect(parsed.suspects).toHaveLength(2);
    expect(parsed.solution["0-0"]).toBe("s1");
  });

  it("strips markdown code fences", () => {
    const raw = "```json\n" + JSON.stringify({
      suspects: [
        { id: "s1", name: "A", portraitId: "portrait1", color: "hsl(0 0% 0%)", isVictim: true },
      ],
      solution: { "0-0": "s1" },
      clues: [
        {
          id: "c1",
          text: "X",
          type: "room",
          constraint: { kind: "in_room", suspectId: "s1", roomId: "r1" },
        },
      ],
    }) + "\n```";
    expect(() => parseAiJson(raw)).not.toThrow();
  });

  it("rejects responses with no victim", () => {
    const raw = JSON.stringify({
      suspects: [{ id: "s1", name: "A", portraitId: "portrait1", color: "hsl(0 0% 0%)" }],
      solution: { "0-0": "s1" },
      clues: [
        {
          id: "c1",
          text: "X",
          type: "room",
          constraint: { kind: "in_room", suspectId: "s1", roomId: "r1" },
        },
      ],
    });
    expect(() => parseAiJson(raw)).toThrow(/exactly one suspect as the victim/);
  });

  it("rejects responses with multiple victims", () => {
    const raw = JSON.stringify({
      suspects: [
        { id: "s1", name: "A", portraitId: "portrait1", color: "hsl(0 0% 0%)", isVictim: true },
        { id: "s2", name: "B", portraitId: "portrait2", color: "hsl(0 0% 0%)", isVictim: true },
      ],
      solution: { "0-0": "s1", "1-1": "s2" },
      clues: [
        {
          id: "c1",
          text: "X",
          type: "room",
          constraint: { kind: "in_room", suspectId: "s1", roomId: "r1" },
        },
      ],
    });
    expect(() => parseAiJson(raw)).toThrow(/exactly one suspect as the victim/);
  });

  it("rejects clues missing constraints", () => {
    const raw = JSON.stringify({
      suspects: [{ id: "s1", name: "A", portraitId: "portrait1", color: "hsl(0 0% 0%)", isVictim: true }],
      solution: { "0-0": "s1" },
      clues: [{ id: "c1", text: "X", type: "room" }],
    });
    expect(() => parseAiJson(raw)).toThrow(/no valid constraint/);
  });
});

describe("buildUserMessage", () => {
  it("includes scene name, difficulty, room ids, and an ASCII grid", () => {
    const layout = buildLayout(5);
    const message = buildUserMessage(layout, 4, {
      gridSize: 5,
      difficulty: 2,
      sceneName: "Pizzeria",
    });
    expect(message).toContain("Pizzeria");
    expect(message).toContain("Difficulty: 2");
    expect(message).toContain("Number of suspects to place: 4");
    for (const room of layout.rooms) {
      expect(message).toContain(room.id);
    }
  });
});
