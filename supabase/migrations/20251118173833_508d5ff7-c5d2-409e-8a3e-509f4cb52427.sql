-- Permettere a service_role di inserire sales_events (per il backend)
CREATE POLICY "Service role can insert sales_events"
  ON sales_events
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Permettere a service_role di leggere tutti i sales_events (per analytics/reporting)
CREATE POLICY "Service role can read all sales_events"
  ON sales_events
  FOR SELECT
  TO service_role
  USING (true);