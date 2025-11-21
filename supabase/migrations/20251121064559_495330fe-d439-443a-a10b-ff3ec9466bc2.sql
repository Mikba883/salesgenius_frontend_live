-- Fix: Make user_id NOT NULL in user_profiles
ALTER TABLE user_profiles 
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE user_profiles 
ALTER COLUMN user_id DROP DEFAULT;