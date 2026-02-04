-- Add INSERT policy for profiles table as a fallback
-- This allows users to create their own profile if the trigger fails
CREATE POLICY "Users can create their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);