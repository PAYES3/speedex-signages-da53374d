export type FieldKind = 'text' | 'textarea' | 'image' | 'video';
export type ContentField = { key: string; label: string; kind: FieldKind; fallback: string };
export type ContentSection = { page: string; label: string; fields: ContentField[] };

export const CONTENT_SCHEMA: ContentSection[] = [
  {
    page: 'home_hero',
    label: 'Homepage — Hero',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', kind: 'text', fallback: 'Premium signage · United Arab Emirates' },
      { key: 'title', label: 'Headline', kind: 'text', fallback: 'Transforming ideas into powerful visual identities' },
      { key: 'subtitle', label: 'Sub headline', kind: 'textarea', fallback: 'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.' },
      { key: 'cta_label', label: 'Primary button label', kind: 'text', fallback: 'Get a free quote' },
      { key: 'cta_href', label: 'Primary button link', kind: 'text', fallback: '/contact' },
      { key: 'video_url', label: 'Background video', kind: 'video', fallback: '' },
      { key: 'poster_url', label: 'Video poster image', kind: 'image', fallback: '' },
    ],
  },
  {
    page: 'home_services',
    label: 'Homepage — Services block',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', kind: 'text', fallback: 'What we do' },
      { key: 'title', label: 'Heading', kind: 'text', fallback: 'A full-service signage partner' },
      { key: 'subtitle', label: 'Intro paragraph', kind: 'textarea', fallback: 'From concept and design to fabrication, installation and maintenance — all under one roof.' },
      { key: 'cta_label', label: 'Button label', kind: 'text', fallback: 'View all services' },
    ],
  },
  {
    page: 'home_projects',
    label: 'Homepage — Featured projects',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', kind: 'text', fallback: 'Recent work' },
      { key: 'title', label: 'Heading', kind: 'text', fallback: 'Featured projects' },
      { key: 'cta_label', label: 'Button label', kind: 'text', fallback: 'Explore all' },
    ],
  },
  {
    page: 'about',
    label: 'About page',
    fields: [
      { key: 'title', label: 'Heading', kind: 'text', fallback: '' },
      { key: 'intro', label: 'Intro paragraph', kind: 'textarea', fallback: '' },
      { key: 'mission', label: 'Mission', kind: 'textarea', fallback: '' },
      { key: 'vision', label: 'Vision', kind: 'textarea', fallback: '' },
      { key: 'image_url', label: 'Feature image', kind: 'image', fallback: '' },
    ],
  },
  {
    page: 'stats',
    label: 'Statistics',
    fields: [
      { key: 'stat_1_label', label: 'Stat 1 label', kind: 'text', fallback: 'Years of experience' },
      { key: 'stat_1_value', label: 'Stat 1 value', kind: 'text', fallback: '18+' },
      { key: 'stat_2_label', label: 'Stat 2 label', kind: 'text', fallback: 'Projects delivered' },
      { key: 'stat_2_value', label: 'Stat 2 value', kind: 'text', fallback: '2,500+' },
      { key: 'stat_3_label', label: 'Stat 3 label', kind: 'text', fallback: 'Happy clients' },
      { key: 'stat_3_value', label: 'Stat 3 value', kind: 'text', fallback: '900+' },
      { key: 'stat_4_label', label: 'Stat 4 label', kind: 'text', fallback: 'Emirates covered' },
      { key: 'stat_4_value', label: 'Stat 4 value', kind: 'text', fallback: '7' },
    ],
  },
  {
    page: 'cta',
    label: 'Call-to-action banner',
    fields: [
      { key: 'title', label: 'Heading', kind: 'text', fallback: '' },
      { key: 'subtitle', label: 'Sub text', kind: 'textarea', fallback: '' },
      { key: 'button_label', label: 'Button label', kind: 'text', fallback: '' },
    ],
  },
  {
    page: 'footer',
    label: 'Footer',
    fields: [
      { key: 'about', label: 'About text', kind: 'textarea', fallback: '' },
      { key: 'copyright', label: 'Copyright line', kind: 'text', fallback: '' },
    ],
  },
  {
    page: 'careers',
    label: 'Careers page',
    fields: [
      { key: 'title', label: 'Heading', kind: 'text', fallback: '' },
      { key: 'intro', label: 'Intro paragraph', kind: 'textarea', fallback: '' },
    ],
  },
  {
    page: 'contact',
    label: 'Contact page',
    fields: [
      { key: 'title', label: 'Heading', kind: 'text', fallback: '' },
      { key: 'intro', label: 'Intro paragraph', kind: 'textarea', fallback: '' },
      { key: 'office_hours', label: 'Office hours', kind: 'text', fallback: '' },
    ],
  },
  {
    page: 'seo',
    label: 'SEO defaults',
    fields: [
      { key: 'title', label: 'Default title', kind: 'text', fallback: '' },
      { key: 'description', label: 'Meta description', kind: 'textarea', fallback: '' },
      { key: 'keywords', label: 'Keywords', kind: 'textarea', fallback: '' },
      { key: 'og_image', label: 'Open Graph image', kind: 'image', fallback: '' },
      { key: 'canonical', label: 'Canonical base URL', kind: 'text', fallback: '' },
      { key: 'robots', label: 'Robots directive', kind: 'text', fallback: 'index, follow' },
    ],
  },
];
