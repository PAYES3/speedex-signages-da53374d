
-- Drop overly permissive INSERT policies; server functions use service role.
DROP POLICY IF EXISTS "anyone can submit quote" ON public.quote_requests;
DROP POLICY IF EXISTS "anyone can submit contact" ON public.contact_messages;
DROP POLICY IF EXISTS "anyone can apply" ON public.job_applications;

-- Add explicit deny-all policies on chat tables so RLS-enabled tables have policies.
-- Service role bypasses RLS and continues to read/write normally.
CREATE POLICY "no client access" ON public.chat_conversations
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "no client access" ON public.chat_messages
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
