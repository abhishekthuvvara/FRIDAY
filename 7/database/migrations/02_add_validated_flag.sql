-- PHASE 7: Add validation tracking for Python coding features
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS is_validated BOOLEAN DEFAULT false;
