import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { publicListServices } from '@/lib/admin/content.functions';
import { SERVICES } from '@/lib/site-data';

export function ServicesSection({ data = {} }: { data?: Record<string, string> }) {
  const fetcher = useServerFn(publicListServices);
  const { data: rows } = useQuery({ queryKey: ['public-services'], queryFn: () => fetcher(), staleTime: 30_000 });

  const items = (rows ?? []).length
    ? (rows as any[]).slice(0, 6).map((s) => ({
        title: s.title as string,
        desc: (s.description as string) ?? '',
        icon: ((Icons as any)[s.icon] ?? Icons.Sparkles) as any,
        image: s.image_url as string | null,
      }))
    : SERVICES.slice(0, 6).map((s) => ({ title: s.title, desc: s.desc, icon: s.icon, image: null }));

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em]">{data.eyebrow || 'What we do'}</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mt-3 tracking-tight leading-[1.05]">
              {data.title || 'A full-service signage partner'}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {data.subtitle || 'From concept and design to fabrication, installation and maintenance — all under one roof.'}
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={i * 0.08}>
              <div className="group glass-panel p-8 hover-glow h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-4">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to={(data.cta_href as any) || '/services'}>
            <Button variant="outline" size="lg" className="rounded-full border-2">
              {data.cta_label || 'View all services'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
