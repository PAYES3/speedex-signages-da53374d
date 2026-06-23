import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Reveal } from '@/components/Reveal';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { ArrowRight, Building2 } from 'lucide-react';

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function OurCompanies() {
  const fetcher = useServerFn(publicListCompanies);
  const { data } = useQuery({ queryKey: ['public-companies'], queryFn: () => fetcher() });
  const companies = data ?? [];

  return (
    <section className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/0.07),transparent_50%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <Reveal>
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Speedex Group</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">A trusted group of UAE businesses</h2>
            <p className="mt-4 text-muted-foreground">
              Five specialized companies — signage, automotive, transport, contracting and trading — under one group, serving clients across the Emirates.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies.map((c: any, i: number) => (
            <Reveal key={c.id} direction="up" delay={i * 0.06}>
              <Link
                to="/companies/$slug"
                params={{ slug: c.slug }}
                className="group block bg-card border border-border rounded-2xl p-6 h-full hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 hover:border-primary transition-all relative overflow-hidden"
              >
                <div
                  className="w-14 h-14 rounded-xl text-primary-foreground grid place-items-center font-bold text-lg shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${c.accent_color}, color-mix(in oklab, ${c.accent_color} 60%, white))` }}
                >
                  {initialsOf(c.name)}
                </div>
                <h3 className="mt-4 font-semibold text-lg flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  {c.name}
                </h3>
                {c.tagline && <p className="mt-1 text-xs uppercase tracking-wider text-primary font-semibold">{c.tagline}</p>}
                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/companies" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View all group companies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}