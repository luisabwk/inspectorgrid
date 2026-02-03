-- Fix the cases_public view to work for all authenticated users
-- The view uses security_invoker which doesn't work with the admin-only base table
-- Change to security_definer (default) so it executes with owner privileges

DROP VIEW IF EXISTS public.cases_public;

CREATE VIEW public.cases_public AS
  SELECT 
    id,
    title,
    description,
    difficulty,
    grid_size,
    layout_config,
    suspects,
    clues,
    created_at,
    updated_at
  FROM public.cases;

-- Grant SELECT on the view to all authenticated users
GRANT SELECT ON public.cases_public TO authenticated;
GRANT SELECT ON public.cases_public TO anon;