-- Revoke all public access to the sales_events_aggregates view
REVOKE ALL ON public.sales_events_aggregates FROM anon;
REVOKE ALL ON public.sales_events_aggregates FROM authenticated;

-- Grant SELECT only to authenticated users
-- The view will inherit RLS restrictions from the underlying sales_events table
GRANT SELECT ON public.sales_events_aggregates TO authenticated;