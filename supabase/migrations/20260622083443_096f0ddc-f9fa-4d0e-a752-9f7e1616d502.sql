
-- Public read for media buckets
DROP POLICY IF EXISTS "Public read media buckets" ON storage.objects;
CREATE POLICY "Public read media buckets" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('services-media','portfolio-media','testimonial-avatars'));

-- Admin write
DROP POLICY IF EXISTS "Admins write media buckets" ON storage.objects;
CREATE POLICY "Admins write media buckets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('services-media','portfolio-media','testimonial-avatars')
    AND public.has_role(auth.uid(), 'admin')
  );

DROP POLICY IF EXISTS "Admins update media buckets" ON storage.objects;
CREATE POLICY "Admins update media buckets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id IN ('services-media','portfolio-media','testimonial-avatars')
    AND public.has_role(auth.uid(), 'admin')
  );

DROP POLICY IF EXISTS "Admins delete media buckets" ON storage.objects;
CREATE POLICY "Admins delete media buckets" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id IN ('services-media','portfolio-media','testimonial-avatars')
    AND public.has_role(auth.uid(), 'admin')
  );
