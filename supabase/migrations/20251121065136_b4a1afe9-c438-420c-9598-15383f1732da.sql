-- Create rate limiting table for contact form
CREATE TABLE IF NOT EXISTS public.contact_form_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  identifier TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for efficient rate limit lookups
CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_identifier_created 
ON public.contact_form_rate_limits(identifier, created_at);

-- Enable RLS (not needed for service role operations, but best practice)
ALTER TABLE public.contact_form_rate_limits ENABLE ROW LEVEL SECURITY;

-- Service role can manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.contact_form_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);