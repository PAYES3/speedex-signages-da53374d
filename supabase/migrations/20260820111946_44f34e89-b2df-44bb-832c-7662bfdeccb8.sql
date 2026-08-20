CREATE TABLE public.slider_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  context text NOT NULL CHECK (context IN ('home_our_companies','our_groups')),
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  image_url text,
  mobile_image_url text,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  visible boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.slider_slides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.slider_slides TO authenticated;
GRANT ALL ON public.slider_slides TO service_role;

ALTER TABLE public.slider_slides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view visible slides"
ON public.slider_slides FOR SELECT
TO anon, authenticated
USING (visible = true);

CREATE POLICY "Content managers can view all slides"
ON public.slider_slides FOR SELECT
TO authenticated
USING (public.can_manage_content(auth.uid()));

CREATE POLICY "Content managers can insert slides"
ON public.slider_slides FOR INSERT
TO authenticated
WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Content managers can update slides"
ON public.slider_slides FOR UPDATE
TO authenticated
USING (public.can_manage_content(auth.uid()))
WITH CHECK (public.can_manage_content(auth.uid()));

CREATE POLICY "Content managers can delete slides"
ON public.slider_slides FOR DELETE
TO authenticated
USING (public.can_manage_content(auth.uid()));

CREATE INDEX slider_slides_context_order_idx ON public.slider_slides (context, sort_order);

CREATE TRIGGER slider_slides_set_updated_at
BEFORE UPDATE ON public.slider_slides
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.slider_slides (context, company_id, image_url, mobile_image_url, sort_order, visible)
SELECT 'home_our_companies', c.id, COALESCE(c.banner_url, c.hero_image), c.mobile_banner_url, c.sort_order, true
FROM public.companies c WHERE c.active = true;

INSERT INTO public.slider_slides (context, company_id, image_url, mobile_image_url, sort_order, visible)
SELECT 'our_groups', c.id, COALESCE(c.banner_url, c.hero_image), c.mobile_banner_url, c.sort_order, true
FROM public.companies c WHERE c.active = true;