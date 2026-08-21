-- Public reads must not depend on has_role(), which anonymous visitors are not
-- allowed to execute. Split the mixed policies into an anon-safe public policy
-- and an admin policy limited to signed-in users.

DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services"
  ON public.services FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "Admins can view all services"
  ON public.services FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public can view published projects" ON public.portfolio_projects;
CREATE POLICY "Public can view published projects"
  ON public.portfolio_projects FOR SELECT TO anon, authenticated
  USING (published = true);
CREATE POLICY "Admins can view all projects"
  ON public.portfolio_projects FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
CREATE POLICY "Public can view approved testimonials"
  ON public.testimonials FOR SELECT TO anon, authenticated
  USING (approved = true);
CREATE POLICY "Admins can view all testimonials"
  ON public.testimonials FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Make sure the Data API roles keep the grants the public site relies on.
GRANT SELECT ON public.services, public.portfolio_projects, public.portfolio_categories,
  public.testimonials, public.companies, public.hero_slides, public.slider_slides,
  public.page_sections, public.page_content, public.site_settings, public.media_assets
  TO anon, authenticated;
GRANT INSERT ON public.testimonials TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_content(uuid) TO authenticated;