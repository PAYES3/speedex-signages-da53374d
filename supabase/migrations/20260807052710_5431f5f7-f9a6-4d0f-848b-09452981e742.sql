DROP POLICY IF EXISTS "Public Storage Read Access" ON storage.objects;
DROP POLICY IF EXISTS "Public read media buckets" ON storage.objects;
CREATE POLICY "Public read public buckets"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id IN ('services-media','portfolio-media','company-logos','hero-videos'));

DROP POLICY IF EXISTS "Public can read settings" ON public.site_settings;
CREATE POLICY "Public can read approved settings"
ON public.site_settings FOR SELECT
TO anon, authenticated
USING (
  key IN (
    'contact_phone','contact_email','whatsapp_number','office_address',
    'maps_embed_url','maps_directions_url','hero_video_url','hero_poster_url',
    'logo_url','site_title','site_description',
    'social_facebook','social_instagram','social_linkedin','social_youtube','social_twitter'
  )
  OR key LIKE 'public_%'
);
CREATE POLICY "Admins can read all settings"
ON public.site_settings FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));