import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Reveal } from '@/components/Reveal';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { ArrowRight, Building2 } from 'lucide-react';

export const Route = createFileRoute('/companies')({
  head: () => ({
    meta: [
      { title: 'Our Companies | Speedex Group UAE' },
      { name: 'description', content: 'Speedex Group — five UAE companies covering signage, automotive workshop, transport, contracting and general trading across the Emirates.' },
      { property: 'og:title', content: 'Speedex Group — Our Companies' },
      { property: 'og:description', content: 'Signage, automotive, transport, contracting and trading services across the United Arab Emirates.' },
      { property: 'og:url', content: 'https://speedex-signages.lovable.app/companies' },
    ],
    links: [{ rel: 'canonical', href: 'https://speedex-signages.lovable.app/companies' }],
  }),
  component: CompaniesPage,
});

function initialsOf(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? '').join('');
}

function CompaniesPage() {
  const fetcher = useServerFn(publicListCompanies);
  const { data, isLoading } = useQuery({ queryKey: ['public-companies'], queryFn: () => fetcher() });
  const companies = data ?? [];

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Speedex Group</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Our Companies</h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">
              A diversified UAE business group delivering specialist services across five sectors.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading && <p className="text-center text-muted-foreground">Loading…</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((c: any, i: number) => (
              <Reveal key={c.id} direction="up" delay={i * 0.06}>
                <Link
                  to="/companies/$slug"
                  params={{ slug: c.slug }}
                  className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 hover:border-primary transition-all h-full"
                >
                  <div
                    className="aspect-[16/9] relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${c.accent_color}, color-mix(in oklab, ${c.accent_color} 30%, black))` }}
                  >
                    {c.hero_image ? (
                      <img src={c.hero_image} alt={c.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-white/90">
                        <span className="text-5xl font-bold tracking-tight">{initialsOf(c.name)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      {c.name}
                    </h3>
                    {c.tagline && <p className="mt-1 text-xs uppercase tracking-wider text-primary font-semibold">{c.tagline}</p>}
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{c.description}</p>
                    <ul className="mt-4 space-y-1">
                      {(c.services as string[]).slice(0, 3).map((s) => (
                        <li key={s} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary" /> {s}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}