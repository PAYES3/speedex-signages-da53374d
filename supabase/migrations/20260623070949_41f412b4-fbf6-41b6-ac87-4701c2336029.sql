
-- companies table
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  tagline text DEFAULT '',
  description text DEFAULT '',
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  hero_image text,
  accent_color text DEFAULT '#0E7C7B',
  website_url text,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.companies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.companies TO authenticated;
GRANT ALL ON public.companies TO service_role;

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active companies"
  ON public.companies FOR SELECT
  USING (active = true);

CREATE POLICY "Admins can read all companies"
  ON public.companies FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert companies"
  ON public.companies FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update companies"
  ON public.companies FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete companies"
  ON public.companies FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER companies_set_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- site_settings table (key/value)
CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.site_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert settings"
  ON public.site_settings FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update settings"
  ON public.site_settings FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete settings"
  ON public.site_settings FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER site_settings_set_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- seed companies (verbatim content)
INSERT INTO public.companies (name, slug, tagline, description, services, sort_order, accent_color) VALUES
  ('Speedex Signages', 'speedex-signages',
   'Signage Solutions, Branding & Advertising',
   'UAE leader in signage manufacturing, branding and large-format advertising — concept to installation under one roof.',
   '["Signage Solutions","Branding & Advertising","Digital Printing","Custom Sign Boards","Indoor & Outdoor Signages"]'::jsonb,
   1, '#0E7C7B'),
  ('Speedex Auto Workshop', 'speedex-auto-workshop',
   'Professional Vehicle Maintenance & Repairs',
   'Full-service automotive workshop covering mechanical, electrical, diagnostics and fleet maintenance across the UAE.',
   '["Vehicle Maintenance","Mechanical Services","Electrical Repairs","Vehicle Diagnostics","Fleet Maintenance Services"]'::jsonb,
   2, '#1E40AF'),
  ('Arabsat Transport', 'arabsat-transport',
   'Professional Transport & Logistics Services',
   'Reliable transport, logistics and fleet management for industrial and commercial clients across the Emirates.',
   '["Professional Transport Services","Logistics Solutions","Fleet Management","Material Transportation","Industrial Transport Support"]'::jsonb,
   3, '#B45309'),
  ('Excellent Field Contracting', 'excellent-field-contracting',
   'ADNOC-Related Contracting Services',
   'Industrial field operations, maintenance and infrastructure support for the UAE oil & gas sector.',
   '["ADNOC-Related Contracting Services","Industrial Field Operations","Maintenance Support Services","Oil & Gas Sector Support","Infrastructure Projects"]'::jsonb,
   4, '#047857'),
  ('Excellent General Trading', 'excellent-general-trading',
   'General Trading & Industrial Supply',
   'Trading, procurement and commercial supply chain services for industrial and commercial customers.',
   '["General Trading Services","Industrial Supplies","Equipment Supply","Trading & Procurement Solutions","Commercial Supply Chain Services"]'::jsonb,
   5, '#7C3AED');

-- seed site settings
INSERT INTO public.site_settings (key, value) VALUES
  ('hero_video_url', 'https://cdn.coverr.co/videos/coverr-neon-sign-in-the-city-1573/1080p.mp4'),
  ('hero_poster_url', ''),
  ('contact_phone', '+971 50 123 4567'),
  ('contact_email', 'info@speedexsignages.ae'),
  ('whatsapp_number', '971501234567'),
  ('office_address', 'Al Quoz Industrial Area, Dubai, United Arab Emirates'),
  ('maps_embed_url', 'https://www.google.com/maps?q=Al+Quoz+Industrial+Area+Dubai&output=embed'),
  ('maps_directions_url', 'https://www.google.com/maps/dir/?api=1&destination=Al+Quoz+Industrial+Area+Dubai');
