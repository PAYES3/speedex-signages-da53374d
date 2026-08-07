import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { publicListProjects } from '@/lib/admin/content.functions';
import { PROJECTS } from '@/lib/site-data';

export function ProjectsSection({ data = {} }: { data?: Record<string, string> }) {
  const fetcher = useServerFn(publicListProjects);
  const { data: rows } = useQuery({ queryKey: ['public-projects'], queryFn: () => fetcher(), staleTime: 30_000 });

  const items = (rows ?? []).length
    ? (rows as any[]).slice(0, 6).map((p) => ({
        id: p.id as string,
        title: p.title as string,
        category: (p.category_slug as string) ?? '',
        img: (p.cover_url as string) ?? '',
      }))
    : PROJECTS.slice(0, 6).map((p) => ({ id: p.id, title: p.title, category: p.category, img: p.img }));

  return (
    <section className="py-24 lg:py-32 bg-[color:var(--surface-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em]">{data.eyebrow || 'Recent work'}</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 tracking-tight">{data.title || 'Featured projects'}</h2>
            </div>
            <Link to={(data.cta_href as any) || '/portfolio'}>
              <Button size="lg" className="rounded-full border-2 border-primary bg-primary !text-white hover:bg-primary/90">
                {data.cta_label || 'Explore all'} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Reveal key={p.id} direction="up" delay={i * 0.05}>
              <Link to="/portfolio" className="group block relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all">
                {p.img && <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  {p.category && <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">{p.category}</p>}
                  <h3 className="font-bold text-xl mt-2">{p.title}</h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
