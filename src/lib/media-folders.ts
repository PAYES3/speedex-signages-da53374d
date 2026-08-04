/** Media library folders mapped onto the project's public storage buckets. */
export const MEDIA_FOLDERS = [
  'logos',
  'hero',
  'services',
  'projects',
  'gallery',
  'clients',
  'partners',
  'certificates',
  'backgrounds',
  'documents',
  'general',
] as const;

export type MediaFolder = (typeof MEDIA_FOLDERS)[number];

const BUCKET_BY_FOLDER: Record<string, string> = {
  logos: 'company-logos',
  clients: 'company-logos',
  partners: 'company-logos',
  certificates: 'company-logos',
  hero: 'hero-videos',
  projects: 'portfolio-media',
  gallery: 'portfolio-media',
  backgrounds: 'portfolio-media',
  services: 'services-media',
  documents: 'services-media',
  general: 'services-media',
};

export function bucketForFolder(folder: string) {
  return BUCKET_BY_FOLDER[folder] ?? 'services-media';
}
