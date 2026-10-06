CREATE TABLE public.digital_settings (key text PRIMARY KEY, value text NOT NULL DEFAULT '', updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.digital_services (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE, category text NOT NULL CHECK (category IN ('web','marketing')), title text NOT NULL, title_ar text NOT NULL DEFAULT '', summary text NOT NULL DEFAULT '', summary_ar text NOT NULL DEFAULT '', body text NOT NULL DEFAULT '', body_ar text NOT NULL DEFAULT '', benefits text[] NOT NULL DEFAULT '{}', image_url text, sort_order int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.digital_portfolio (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, title_ar text NOT NULL DEFAULT '', category text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', description_ar text NOT NULL DEFAULT '', image_url text, link_url text, sort_order int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.digital_testimonials (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, company text NOT NULL DEFAULT '', quote text NOT NULL, quote_ar text NOT NULL DEFAULT '', rating int NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5), sort_order int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.digital_faqs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question text NOT NULL, answer text NOT NULL, question_ar text NOT NULL DEFAULT '', answer_ar text NOT NULL DEFAULT '', sort_order int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.digital_industries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, name_ar text NOT NULL DEFAULT '', sort_order int NOT NULL DEFAULT 0, active boolean NOT NULL DEFAULT true, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());

DO $$ DECLARE t text; BEGIN
  FOREACH t IN ARRAY ARRAY['digital_settings','digital_services','digital_portfolio','digital_testimonials','digital_faqs','digital_industries'] LOOP
    EXECUTE format('GRANT SELECT ON public.%I TO anon', t);
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY "Admins manage %s" ON public.%I FOR ALL TO authenticated USING (public.has_role(auth.uid(), ''admin''::app_role)) WITH CHECK (public.has_role(auth.uid(), ''admin''::app_role))', t, t);
  END LOOP;
  FOREACH t IN ARRAY ARRAY['digital_services','digital_portfolio','digital_testimonials','digital_faqs','digital_industries'] LOOP
    EXECUTE format('CREATE POLICY "Public reads active %s" ON public.%I FOR SELECT TO anon, authenticated USING (active = true)', t, t);
  END LOOP;
END $$;
CREATE POLICY "Public reads digital settings" ON public.digital_settings FOR SELECT TO anon, authenticated USING (true);