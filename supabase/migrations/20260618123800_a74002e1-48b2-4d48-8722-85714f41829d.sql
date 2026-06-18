
CREATE POLICY "no client access" ON public.contact_messages
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "no client access" ON public.quote_requests
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE POLICY "no client access" ON public.job_applications
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
