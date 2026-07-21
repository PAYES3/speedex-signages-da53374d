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
              Specialized companies under one group — signage, workshop, transport, contracting, trading, and facilities management serving clients across the Emirates.
            </p>
          </div>
        </Reveal>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((c: any, i: number) => {
            const logoSrc = c.logo_url || c.image_url;

            return (
              <Reveal key={c.id} direction="up" delay={i * 0.06}>
                <Link
                  to="/companies/$slug"
                  params={{ slug: c.slug }}
                  className="group block bg-card border border-border rounded-2xl p-6 h-full hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 hover:border-primary transition-all relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* 🎯 LOGO SLOT FIX FOR ALL ASPECT RATIOS */}
                    <div className="w-full h-20 mb-5 p-3 bg-white dark:bg-card rounded-xl border border-border/60 flex items-center justify-center shadow-sm group-hover:border-primary/50 transition-colors overflow-hidden">
                      {logoSrc ? (
                        <img
                          src={logoSrc}
                          alt={`${c.name} logo`}
                          className="max-h-full max-w-full w-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-12 h-12 rounded-lg text-primary-foreground grid place-items-center font-bold text-base shadow-md"
                          style={{ background: `linear-gradient(135deg, ${c.accent_color || '#000'}, color-mix(in oklab, ${c.accent_color || '#000'} 60%, white))` }}
                        >
                          {initialsOf(c.name)}
                        </div>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span>{c.name}</span>
                    </h3>
                    
                    {c.tagline && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-primary font-semibold">
                        {c.tagline}
                      </p>
                    )}
                    
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                      {c.description}
                    </p>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/companies" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View all group companies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
