-- Create game_cases table for AI-generated puzzles.
-- Solution is stored server-side only and never returned to the client.

CREATE TABLE public.game_cases (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    difficulty int NOT NULL CHECK (difficulty BETWEEN 1 AND 3),
    grid_size int NOT NULL,
    layout_config jsonb NOT NULL,
    suspects jsonb NOT NULL,
    clues jsonb NOT NULL,
    solution jsonb NOT NULL,
    scene_name text,
    created_at timestamptz DEFAULT now(),
    is_published boolean DEFAULT false
);

ALTER TABLE public.game_cases ENABLE ROW LEVEL SECURITY;

-- Anonymous and authenticated users can read published cases (solution column
-- is excluded by the public_game_cases view below).
CREATE POLICY "public read published"
  ON public.game_cases
  FOR SELECT
  USING (is_published = true);

-- Authenticated users (admins) have full write access.
CREATE POLICY "authenticated write"
  ON public.game_cases
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Public-facing view that omits the solution column. Clients must read through
-- this view; the underlying table's solution stays server-side.
CREATE VIEW public.game_cases_public AS
  SELECT
    id,
    title,
    description,
    difficulty,
    grid_size,
    layout_config,
    suspects,
    clues,
    scene_name,
    created_at,
    is_published
  FROM public.game_cases
  WHERE is_published = true;

GRANT SELECT ON public.game_cases_public TO authenticated;
GRANT SELECT ON public.game_cases_public TO anon;
