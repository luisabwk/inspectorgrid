/**
 * Builds a PostgREST-compatible IN list for use with supabase-js filters.
 *
 * Example:
 * - buildInFilter(["a", "b"]) => ("a","b")
 * - buildInFilter([]) => null
 */
export function buildInFilter(values: string[]): string | null {
  const trimmed = (values || []).map((v) => v?.trim()).filter(Boolean);
  if (trimmed.length === 0) return null;

  // Values are expected to be UUIDs/ids. We still quote them for safety.
  const quoted = trimmed.map((v) => `"${v}"`);
  return `(${quoted.join(",")})`;
}

