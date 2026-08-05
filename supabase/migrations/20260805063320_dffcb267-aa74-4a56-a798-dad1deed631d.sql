CREATE OR REPLACE FUNCTION public.can_manage_content(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin','admin','content_manager','editor')
  )
$$;
REVOKE ALL ON FUNCTION public.can_manage_content(uuid) FROM public;
GRANT EXECUTE ON FUNCTION public.can_manage_content(uuid) TO authenticated, service_role;

CREATE TABLE public.page_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL DEFAULT 'home',
  section_type text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'published',
  publish_at timestamptz,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.page_sections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.page_sections TO authenticated;
GRANT ALL ON public.page_sections TO service_role;
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read live sections" ON public.page_sections FOR SELECT
  USING (visible = true AND status = 'published' AND (publish_at IS NULL OR publish_at <= now()));
CREATE POLICY "Staff read all sections" ON public.page_sections FOR SELECT TO authenticated
  USING (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff manage sections" ON public.page_sections FOR ALL TO authenticated
  USING (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER page_sections_set_updated_at BEFORE UPDATE ON public.page_sections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  media_url text NOT NULL DEFAULT '',
  media_type text NOT NULL DEFAULT 'video',
  poster_url text,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  cta_primary_label text NOT NULL DEFAULT '',
  cta_primary_href text NOT NULL DEFAULT '',
  cta_secondary_label text NOT NULL DEFAULT '',
  cta_secondary_href text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.hero_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read active slides" ON public.hero_slides FOR SELECT USING (active = true);
CREATE POLICY "Staff read all slides" ON public.hero_slides FOR SELECT TO authenticated
  USING (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Staff manage slides" ON public.hero_slides FOR ALL TO authenticated
  USING (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER hero_slides_set_updated_at BEFORE UPDATE ON public.hero_slides
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  label text NOT NULL DEFAULT '',
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  author_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX content_versions_entity_idx ON public.content_versions (entity_type, entity_id, created_at DESC);
GRANT SELECT, INSERT, DELETE ON public.content_versions TO authenticated;
GRANT ALL ON public.content_versions TO service_role;
ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff manage versions" ON public.content_versions FOR ALL TO authenticated
  USING (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.can_manage_content(auth.uid()) OR public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.media_assets
  ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS thumbnail_url text,
  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS hidden boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS duplicated_from uuid;

ALTER TABLE public.page_content
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published',
  ADD COLUMN IF NOT EXISTS publish_at timestamptz;