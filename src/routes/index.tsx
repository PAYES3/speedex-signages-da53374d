import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListSections } from '@/lib/admin/cms.functions';
import { SectionRenderer, type SectionRow } from '@/components/sections/SectionRenderer';
import { DEFAULT_HOME_ORDER } from '@/lib/cms/section-types';
import { FAQ as FAQ_DATA } from '@/lib/site-data';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Signage Company in UAE | Speedex Signages — LED, Acrylic, 3D' },
      { name: 'description', content: "Speedex Signages — leading UAE signage company. LED signage, acrylic signage, 3D letters, vehicle branding, digital & outdoor signage across Dubai." },
      { property: 'og:title', content: 'Speedex Signages — We Light Up Your Brand | UAE Signage Company' },
      { property: 'og:description', content: 'Premium signage manufacturing, fabrication and installation across the United Arab Emirates.' },
      { property: 'og:url', content: '/' },
    ],
    links: [{ rel: 'canonical', href: '/' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_DATA.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const fetcher = useServerFn(publicListSections);
  const { data } = useQuery({
    queryKey: ['page-sections', 'home'],
    queryFn: () => fetcher({ data: { page: 'home' } }),
    staleTime: 15_000,
  });

  const rows = (data ?? []) as SectionRow[];

  // Until the Homepage Builder has been saved for the first time, fall back to
  // the standard section order so the site is never empty.
  const sections: SectionRow[] = rows.length
    ? rows
    : DEFAULT_HOME_ORDER.map((type) => ({ id: type, section_type: type, data: {} }));

  return (
    <>
      {sections.map((s) => (
        <SectionRenderer key={s.id} section={s} />
      ))}
    </>
  );
}
