-- Create a public view for cases that excludes the solution field
CREATE VIEW public.cases_public
WITH (security_invoker=on) AS
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

-- Drop the existing permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can view cases" ON public.cases;

-- Create a restrictive policy that only allows admins to SELECT from the base table
CREATE POLICY "Only admins can view full cases with solutions" 
ON public.cases 
FOR SELECT 
USING (is_admin());