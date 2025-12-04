-- 1. Rimuovi la policy RESTRICTIVE esistente
DROP POLICY IF EXISTS "Enable read access for all users" ON user_profiles;

-- 2. Crea una nuova policy PERMISSIVE (default)
CREATE POLICY "Users can read own profile"
ON user_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);