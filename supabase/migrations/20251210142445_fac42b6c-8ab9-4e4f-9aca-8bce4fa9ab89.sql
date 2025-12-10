-- Add missing RLS policies for user_profiles table

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" 
ON public.user_profiles 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.user_profiles 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Allow service role to manage all profiles (for Stripe webhook)
CREATE POLICY "Service role can manage profiles" 
ON public.user_profiles 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);