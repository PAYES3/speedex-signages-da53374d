import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Reveal } from '@/components/Reveal';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { ArrowRight, Building2 } from 'lucide-react';
import { AdaptiveVideo } from '@/components/AdaptiveMedia';
import groupVideo from '@/assets/hero/ALL-COMPANIES.mp4.asset.json';
import { normalizeExternalUrl } from '@/lib/url';
import { OurCompanies } from '@/components/sections/OurCompanies';

export const Route = createFileRoute('/companies')({
  head: () => ({
    meta: [
      { title: 'Our Companies | Speedex Group UAE' },
      {
        name: 'description',
        content:
          'Speedex Group — specialised UAE companies covering signage, automotive workshop, transport, contracting, facility management and general trading across the Emirates.',
      },
      {
        property: 'og:title',
        content: 'Speedex Group — Our Companies',
      },
      {
        property: 'og:description',
        content:
          'Signage, automotive, transport, contracting, facility management and trading services across the United Arab Emirates.',
      },
      {
        property: 'og:url',
        content: 'https://speedex-signages.lovable.app/companies',
      },
    ],
    links: [
      {
        rel: 'canonical',
        href: 'https://speedex-signages.lovable.app/companies',
      },
    ],
  }),
  component: CompaniesPage,
});

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

const COUNT_WORDS: Record<number, string> = {
  1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
  6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
};

export function countWord(n: number) {
  return COUNT_WORDS[n] ?? String(n);
}

function CompaniesPage() {
  const fetcher = useServerFn(publicListCompanies);

  const { data, isLoading } = useQuery({
    queryKey: ['public-companies'],
    queryFn: () => fetcher(),
  });

  const companies = data ?? [];

  return (
    <>
      {/* Page Header */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Speedex Group
            </p>

            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Our Companies
            </h1>

            <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-muted-foreground">
              A diversified UAE business group delivering specialist services
              {companies.length ? ` across ${countWord(companies.length)} specialised companies.` : '.'}
            </p>
          </div>
        </div>
      </section>

      {/* Group Showreel */}
      <section className="pb-4">
        <OurCompanies context="our_groups" />
      </section>

      <section className="w-full bg-primary">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div
            className="relative w-full overflow-hidden sm:rounded-3xl bg-primary"
            style={{
              height: 'clamp(180px, min(45vw, 55svh), 600px)',
            }}
          >
            <AdaptiveVideo
              src={groupVideo.url}
              preload="metadata"
              focal={{
                mobile: '50% 45%',
                tablet: 'center',
                desktop: 'center',
              }}
              className="!object-contain"
            />
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {isLoading && (
            <p className="text-center text-muted-foreground">
              Loading…
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((c: any, i: number) => {
              const website = normalizeExternalUrl(c.website_url);
              return (
              <Reveal
                key={c.id}
                direction="up"
                delay={i * 0.06}
              >
                <div className="group flex h-full flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 hover:border-primary transition-all">
                  {/* Company Image */}
                  <div
                    className="aspect-[16/9] relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${c.accent_color}, color-mix(in oklab, ${c.accent_color} 30%, black))`,
                    }}
                  >
                    {c.banner_url || c.hero_image ? (
                      <img
                        src={c.banner_url || c.hero_image}
                        alt={c.name}
                        className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-white/90">
                        <span className="text-5xl font-bold tracking-tight">
                          {initialsOf(c.name)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Company Content */}
                  <div className="p-6 flex flex-1 flex-col">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      {c.name}
                    </h3>

                    {c.tagline && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-primary font-semibold">
                        {c.tagline}
                      </p>
                    )}

                    <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                      {c.description}
                    </p>

                    <ul className="mt-4 space-y-1">
                      {(c.services as string[])
                        .slice(0, 3)
                        .map((s) => (
                          <li
                            key={s}
                            className="text-xs text-muted-foreground flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-primary" />
                            {s}
                          </li>
                        ))}
                    </ul>

                    <div className="mt-auto pt-5">
                      {website ? (
                        <a
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                        >
                          Learn more
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link
                          to="/companies/$slug"
                          params={{ slug: c.slug }}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                        >
                          Learn more
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
