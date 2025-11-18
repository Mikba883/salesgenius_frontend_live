-- Aggiungere le colonne mancanti alla tabella sales_events
ALTER TABLE sales_events
ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS transcript_context TEXT,
ADD COLUMN IF NOT EXISTS session_id TEXT;

-- Aggiungere un indice per migliorare le query su metadata
CREATE INDEX IF NOT EXISTS idx_sales_events_metadata ON sales_events USING GIN (metadata);

-- Aggiungere commenti per documentare l'uso delle colonne
COMMENT ON COLUMN sales_events.metadata IS 'Additional structured data about the sales event (e.g., participant info, recording details)';
COMMENT ON COLUMN sales_events.transcript_context IS 'Full context or previous conversation that led to this suggestion';
COMMENT ON COLUMN sales_events.session_id IS 'WebSocket session identifier for tracking real-time connections';