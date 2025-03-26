-- Analytics Tables for Workhorse AI Platform
-- Execute these migrations in your Supabase SQL editor or through migrations

-- Create analytics events table to track user interactions
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_data JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  session_id TEXT,
  device_info JSONB,
  
  -- Add indexes for faster querying
  CONSTRAINT valid_event_type CHECK (
    event_type IN (
      'ai_prompt_sent', 
      'ai_response_received', 
      'project_health_analyzed', 
      'insight_generated', 
      'artifact_analyzed', 
      'feature_used', 
      'error_occurred'
    )
  )
);

-- Create index on user_id and timestamp for efficient user history queries
CREATE INDEX IF NOT EXISTS analytics_events_user_id_timestamp_idx 
  ON analytics_events(user_id, timestamp DESC);

-- Create index on event_type for filtering by event type
CREATE INDEX IF NOT EXISTS analytics_events_event_type_idx 
  ON analytics_events(event_type);

-- Create AI usage metrics table for tracking costs and usage
CREATE TABLE IF NOT EXISTS ai_usage_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  model TEXT NOT NULL,
  prompt_type TEXT NOT NULL,
  prompt_tokens INTEGER NOT NULL,
  completion_tokens INTEGER NOT NULL,
  total_tokens INTEGER NOT NULL,
  estimated_cost DECIMAL(10, 6) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and timestamp for efficient user history queries
CREATE INDEX IF NOT EXISTS ai_usage_metrics_user_id_timestamp_idx 
  ON ai_usage_metrics(user_id, timestamp DESC);

-- Create stored procedure for getting most used AI model
CREATE OR REPLACE FUNCTION get_most_used_ai_model(user_id_param UUID)
RETURNS TABLE (
  model TEXT,
  usage_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.model,
    COUNT(*) AS usage_count
  FROM 
    ai_usage_metrics m
  WHERE 
    m.user_id = user_id_param
  GROUP BY 
    m.model
  ORDER BY 
    usage_count DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create stored procedure for getting most common prompt type
CREATE OR REPLACE FUNCTION get_most_common_prompt_type(user_id_param UUID)
RETURNS TABLE (
  prompt_type TEXT,
  usage_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.prompt_type,
    COUNT(*) AS usage_count
  FROM 
    ai_usage_metrics m
  WHERE 
    m.user_id = user_id_param
  GROUP BY 
    m.prompt_type
  ORDER BY 
    usage_count DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Create view for monthly usage summary
CREATE OR REPLACE VIEW monthly_ai_usage_summary AS
SELECT
  user_id,
  DATE_TRUNC('month', timestamp) AS month,
  SUM(total_tokens) AS total_tokens,
  SUM(estimated_cost) AS total_cost,
  COUNT(*) AS total_requests
FROM
  ai_usage_metrics
GROUP BY
  user_id, month
ORDER BY
  month DESC;

-- Create RLS policies for analytics events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own analytics events
CREATE POLICY analytics_events_user_isolation
  ON analytics_events
  FOR ALL
  USING (auth.uid() = user_id);

-- Create RLS policies for AI usage metrics
ALTER TABLE ai_usage_metrics ENABLE ROW LEVEL SECURITY;

-- Only allow users to see their own AI usage metrics
CREATE POLICY ai_usage_metrics_user_isolation
  ON ai_usage_metrics
  FOR ALL
  USING (auth.uid() = user_id);

-- Only allow users to see their own monthly summary
ALTER VIEW monthly_ai_usage_summary SECURITY INVOKER;

-- Create storage bucket for AI-generated assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ai_generated_assets', 'AI Generated Assets', false)
ON CONFLICT (id) DO NOTHING;

-- Set up bucket policy
CREATE POLICY "Users can only access their own AI assets" 
  ON storage.objects 
  FOR ALL 
  USING (bucket_id = 'ai_generated_assets' AND auth.uid() = owner)
  WITH CHECK (bucket_id = 'ai_generated_assets' AND auth.uid() = owner);

-- Grant admin access to authenticated users for analytics tables
GRANT ALL ON analytics_events TO authenticated;
GRANT ALL ON ai_usage_metrics TO authenticated;
GRANT EXECUTE ON FUNCTION get_most_used_ai_model TO authenticated;
GRANT EXECUTE ON FUNCTION get_most_common_prompt_type TO authenticated; 