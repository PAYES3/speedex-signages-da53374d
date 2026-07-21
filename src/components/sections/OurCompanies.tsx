import { Link } from '@tanstack/react-router';
import { ArrowRight, Building2, Sparkles } from 'lucide-react';

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

const COMPANIES_DATA = [
  {
    id: '1',
    name: 'Speedex Signages',
    slug: 'speedex-signages',
    tagline: 'LED, Acrylic & 3D Signage',
    description: 'Premier signage manufacturing and installation across the UAE.',
    logo_url: '/assets/logos/speedex-signage.jpg',
  },
  {
    id: '2',
    name: 'Speedex Rent A Car',
    slug: 'speedex-rent-a-car',
    tagline: 'Luxury & Commercial Rental',
    description: 'Reliable vehicle rental and fleet management solutions in Dubai.',
    logo_url: '/assets/logos/cars-rental.jpg',
  },
  {
    id: '3',
    name: 'Speedex Facility Management',
    slug: 'speedex-facility-management',
    tagline: 'Building Maintenance & Care',
    description: 'Complete facility management and maintenance services.',
    logo_url: '/assets/logos/facility-management.jpg',
  },
  {
    id: '4',
    name: 'Speedex Auto Workshop',
    slug: 'speedex-workshop',
    tagline: 'Technical & Auto Care',
    description: 'Advanced vehicle servicing, bodywork and technical maintenance.',
    logo_url: '/assets/logos/workshop.jpg',
  },
  {
    id: '5',
    name: 'Excellent Field Contracting',
    slug: 'excellent-field-contracting',
    tagline: 'Civil & Interior Works',
    description: 'High-quality contracting and fit-out execution for commercial spaces.',
    logo_url: '/assets/logos/field-contracting.jpg',
  },
  {
    id: '6',
    name: 'Excellent General Trading',
    slug: 'excellent-general-trading',
    tagline: 'Import, Export & Supply',
    description: 'Global trading partner providing premium materials and equipment.',
    logo_url: '/assets/logos/general-trading.jpg',
  },
  {
    id: '7',
    name: 'Arabsat Media & Telecom',
    slug: 'arabsat',
    tagline: 'Digital Media & Signage',
    description: 'Innovative digital display solutions and telecom infrastructure.',
    logo_url: '/assets/logos/arabsat.jpg',
  },
];

export function OurCompanies() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/0.08),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.25em] bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" /> Speedex Group
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-4 tracking-tight leading-tight">
            A Trusted Group of UAE Businesses
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            Specialized companies under one group — Signage, Workshop, Auto Rental, Contracting, Trading, and Facility Management serving clients across the Emirates.
          </p>
        </div>

        {/* 3-COLUMN GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMPANIES_DATA.map((c, i) => (
            <div key={c.id || i}>
              <Link
                to="/companies/$slug"
                params={{ slug: c.slug }}
                className="group block bg-card/80 backdrop-blur-sm border border-border/80 rounded-2xl p-6 h-full hover:shadow-xl hover:-translate-y-1 hover:border-primary/60 transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-20 mb-4 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-border/60 flex items-center justify-center shadow-sm group-hover:border-primary/50 transition-colors overflow-hidden">
                    {c.logo_url ? (
                      <img
                        src={c.logo_url}
                        alt={`${c.name} logo`}
                        className="max-h-full max-w-full w-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-primary text-white grid place-items-center font-bold text-base shadow-md">
                        {initialsOf(c.name)}
                      </div>
                    )}
                  </div>

                  <h3 className="font-bold text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <span>{c.name}</span>
                  </h3>

                  {c.tagline && (
                    <p className="mt-1 text-xs uppercase tracking-wider text-primary font-semibold">
                      {c.tagline}
                    </p>
                  )}

                  <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                  Explore Company <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <Link
            to="/companies"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground shadow-sm transition-all"
          >
            View All Group Companies <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
