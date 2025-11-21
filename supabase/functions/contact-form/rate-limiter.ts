import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

export async function checkRateLimit(
  supabase: SupabaseClient,
  identifier: string,
  windowMs: number,
  maxSubmissions: number
): Promise<{ allowed: boolean; remaining: number }> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMs);

  // Clean up old entries
  await supabase
    .from('contact_form_rate_limits')
    .delete()
    .lt('created_at', windowStart.toISOString());

  // Count recent submissions
  const { data, error } = await supabase
    .from('contact_form_rate_limits')
    .select('id', { count: 'exact' })
    .eq('identifier', identifier)
    .gte('created_at', windowStart.toISOString());

  if (error) {
    console.error('Rate limit check error:', error);
    // Fail open - allow submission if we can't check rate limit
    return { allowed: true, remaining: maxSubmissions };
  }

  const count = data?.length || 0;
  const remaining = Math.max(0, maxSubmissions - count);

  if (count >= maxSubmissions) {
    return { allowed: false, remaining: 0 };
  }

  // Record this submission
  await supabase
    .from('contact_form_rate_limits')
    .insert({ identifier, created_at: now.toISOString() });

  return { allowed: true, remaining: remaining - 1 };
}
