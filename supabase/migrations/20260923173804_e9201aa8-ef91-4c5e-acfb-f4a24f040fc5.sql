ALTER TABLE public.hero_slides
  ADD COLUMN IF NOT EXISTS mobile_media_url text,
  ADD COLUMN IF NOT EXISTS focal_desktop text NOT NULL DEFAULT 'center',
  ADD COLUMN IF NOT EXISTS focal_mobile text NOT NULL DEFAULT 'center';