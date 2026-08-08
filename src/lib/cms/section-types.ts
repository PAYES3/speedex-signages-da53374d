/** Registry of every homepage/page section type the CMS can manage. */
export type FieldKind = 'text' | 'textarea' | 'richtext' | 'image' | 'video' | 'link';

export type SectionField = {
  key: string;
  label: string;
  kind: FieldKind;
  placeholder?: string;
};

export type SectionTypeDef = {
  type: string;
  label: string;
  description: string;
  fields: SectionField[];
  defaults?: Record<string, string>;
};

const HEADING_FIELDS: SectionField[] = [
  { key: 'eyebrow', label: 'Eyebrow', kind: 'text' },
  { key: 'title', label: 'Heading', kind: 'text' },
  { key: 'subtitle', label: 'Sub heading', kind: 'textarea' },
];

const CTA_FIELDS: SectionField[] = [
  { key: 'cta_label', label: 'Button label', kind: 'text' },
  { key: 'cta_href', label: 'Button link', kind: 'link', placeholder: '/contact' },
];

export const SECTION_TYPES: SectionTypeDef[] = [
  {
    type: 'hero',
    label: 'Hero',
    description: 'Full-screen hero slider (slides are managed in the Hero Slides tab).',
    fields: [],
  },
  {
    type: 'client_logos',
    label: 'Clients',
    description: 'Scrolling row of client logos.',
    fields: [{ key: 'title', label: 'Heading', kind: 'text' }],
  },
  {
    type: 'signage_showcase',
    label: 'Gallery / Showcase',
    description: 'Signage gallery grid.',
    fields: HEADING_FIELDS,
  },
  {
    type: 'about',
    label: 'About',
    description: 'Intro copy about the group.',
    fields: [
      ...HEADING_FIELDS,
      { key: 'body', label: 'Body copy', kind: 'richtext' },
      { key: 'image_url', label: 'Image', kind: 'image' },
      ...CTA_FIELDS,
    ],
  },
  {
    type: 'services',
    label: 'Services',
    description: 'Grid of services pulled from the Services CMS.',
    fields: [...HEADING_FIELDS, ...CTA_FIELDS],
  },
  {
    type: 'our_groups',
    label: 'Our Groups',
    description: 'Group companies plus the full-width promo video.',
    fields: [
      ...HEADING_FIELDS,
      { key: 'video_url', label: 'Promo video', kind: 'video' },
      { key: 'video_poster', label: 'Video poster image', kind: 'image' },
    ],
  },
  {
    type: 'before_after',
    label: 'Before & After',
    description: 'Transformation slider.',
    fields: [
      ...HEADING_FIELDS,
      { key: 'before_image', label: 'Before image', kind: 'image' },
      { key: 'after_image', label: 'After image', kind: 'image' },
      { key: 'image_label', label: 'Image caption', kind: 'text' },
    ],
  },
  { type: 'process_timeline', label: 'Process Timeline', description: 'Step-by-step delivery process.', fields: HEADING_FIELDS },
  { type: 'factory_showcase', label: 'Factory Showcase', description: 'In-house manufacturing highlights.', fields: HEADING_FIELDS },
  { type: 'why_choose', label: 'Why Choose Us', description: 'Reasons to pick Speedex.', fields: HEADING_FIELDS },
  { type: 'statistics', label: 'Statistics', description: 'Key numbers strip.', fields: HEADING_FIELDS },
  { type: 'process_video', label: 'Process Video', description: 'Video feature block.', fields: [...HEADING_FIELDS, { key: 'video_url', label: 'Video', kind: 'video' }] },
  { type: 'projects', label: 'Projects', description: 'Featured projects from the Portfolio CMS.', fields: [...HEADING_FIELDS, ...CTA_FIELDS] },
  { type: 'testimonials', label: 'Testimonials', description: 'Approved customer reviews.', fields: HEADING_FIELDS },
  { type: 'feedback_form', label: 'Customer Feedback Form', description: 'Public review submission form.', fields: HEADING_FIELDS },
  { type: 'faq', label: 'FAQ', description: 'Frequently asked questions.', fields: HEADING_FIELDS },
  { type: 'seo_content', label: 'SEO Content', description: 'Long-form SEO copy block.', fields: [{ key: 'title', label: 'Heading', kind: 'text' }, { key: 'body', label: 'Body copy', kind: 'richtext' }] },
  { type: 'location', label: 'Location / Map', description: 'Office location and map link.', fields: HEADING_FIELDS },
  { type: 'cta_banner', label: 'CTA Banner', description: 'Closing call-to-action band.', fields: [...HEADING_FIELDS, ...CTA_FIELDS] },
  {
    type: 'rich_text',
    label: 'Custom Rich Text',
    description: 'Free-form block you can add anywhere.',
    fields: [{ key: 'title', label: 'Heading', kind: 'text' }, { key: 'body', label: 'Content', kind: 'richtext' }],
  },
];

export const DEFAULT_HOME_ORDER = [
  'hero', 'client_logos', 'signage_showcase', 'services', 'before_after',
  'process_timeline', 'factory_showcase', 'why_choose', 'statistics',
  'process_video', 'projects', 'our_groups', 'testimonials', 'feedback_form',
  'seo_content', 'faq', 'location', 'cta_banner',
];

export function sectionDef(type: string) {
  return SECTION_TYPES.find((s) => s.type === type);
}
