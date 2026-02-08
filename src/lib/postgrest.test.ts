import { describe, it, expect } from "vitest";
import { buildInFilter } from "./postgrest";

describe("buildInFilter", () => {
  it("returns null for empty input", () => {
    expect(buildInFilter([])).toBeNull();
    expect(buildInFilter(["", "   "])).toBeNull();
  });

  it("builds a quoted parenthesized list", () => {
    expect(buildInFilter(["a"])).toBe('("a")');
    expect(buildInFilter(["a", "b"])).toBe('("a","b")');
  });

  it("trims and drops empty values", () => {
    expect(buildInFilter(["  x  ", "", "y"])).toBe('("x","y")');
  });
});

