import { useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowRight, Building2, Sparkles, Play, MapPin, Phone, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListCompanies } from '@/lib/admin/content.functions';

export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url?: string | null;
  image?: string | null;
  bg_url?: string | null;
  website_url?: string | null;
}

const SLIDE_MS = 6000;

const FALLBACK_BG = '/images/showcase/signage-1.jpg';

const ALL_COMPANIES: Company[] = [
  { id: '1', name: 'Speedex Signages', slug: 'speedex-signages', tagline: 'LED, Acrylic & 3D Signage', description: 'Premier signage manufacturing, LED display solutions, acrylic fabrication, 3D signboards and vehicle branding across UAE.', logo_url: '/images/logos/speedex-signages.jpg', bg_url: '/images/showcase/signage-2.jpg' },
  { id: '2', name: 'Speedex Rent A Car', slug: 'speedex-rent-a-car', tagline: 'Luxury & Commercial Rental', description: 'Luxury, SUV and commercial vehicle rentals with airport transfers and corporate leasing services.', logo_url: '/images/logos/speedex-rent-a-car.jpg', bg_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90' },
  { id: '3', name: 'Speedex Facility Management', slug: 'speedex-facility-management', tagline: 'Building Maintenance', description: 'Professional building maintenance, cleaning, MEP and complete facility management services.', logo_url: '/images/logos/speedex-facility-management.jpg', bg_url: '/images/showcase/facility.jpg' },
  { id: '4', name: 'Speedex Auto Workshop', slug: 'speedex-workshop', tagline: 'Auto Repair Experts', description: 'Mechanical repairs, diagnostics, engine rebuilding, painting and complete automotive care.', logo_url: '/images/logos/speedex-workshop.jpg', bg_url: '/images/showcase/workshop.png' },
  { id: '5', name: 'Excellent Field Contracting', slug: 'excellent-field-contracting', tagline: 'Civil & Interior', description: 'Civil contracting, fit-out works, renovation and commercial construction solutions.', logo_url: '/images/logos/excellent-field-contracting.jpg', bg_url: '/images/showcase/contracting.jpg' },
  { id: '6', name: 'Excellent General Trading', slug: 'excellent-general-trading', tagline: 'General Trading', description: 'Import, export, uniforms, safety products, building materials and industrial supplies.', logo_url: '/images/logos/excellent-general-trading.jpg', bg_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=90' },
  { id: '7', name: 'Arabsat Transport', slug: 'arabsat', tagline: 'Passenger Transport', description: 'Luxury buses, staff transportation, labour transport and airport transfer solutions.', logo_url: '/images/logos/arabsat.jpg', bg_url: '/images/showcase/transport.jpg' },
];

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

function isExternal(url?: string | null) {
  return !!url && /^https?:\/\//i.test(url.trim());
}

export function OurCompanies() {
  const fetcher = useServerFn(publicListCompanies);
  const { data } = useQuery({ queryKey: ['public-companies'], queryFn: () => fetcher(), staleTime: 60_000 });

  const companies: Company[] = useMemo(() => {
    const rows = (data ?? []) as any[];
    if (!rows.length) return ALL_COMPANIES;
    return rows.map((r, i) => ({
      id: r.id ?? String(i),
      name: r.name,
      slug: r.slug,
      tagline: r.tagline ?? '',
      description: r.description ?? '',
      logo_url: r.logo_url ?? null,
      image: r.hero_image ?? null,
      bg_url: r.banner_url ?? r.hero_image ?? null,
      website_url: r.website_url ?? null,
    }));
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [logoFailed, setLogoFailed] = useState<Record<string, boolean>>({});

  useEffect(() => { setCurrentIndex(0); }, [companies.length]);

  const goTo = useCallback((i: number) => setCurrentIndex(((i % companies.length) + companies.length) % companies.length), [companies.length]);
  const nextSlide = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const prevSlide = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Single timer, restarted on every index change (manual or automatic)
  useEffect(() => {
    if (companies.length < 2) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [currentIndex, companies.length]);

  const currentCompany = companies[Math.min(currentIndex, companies.length - 1)];
  if (!currentCompany) return null;

  const background = currentCompany.bg_url || currentCompany.image || FALLBACK_BG;
  const external = isExternal(currentCompany.website_url);
  const exploreHref = external ? currentCompany.website_url! : `/companies/${currentCompany.slug}`;

  return (
    <section id="our-groups" className="relative overflow-hidden bg-background" style={{ paddingBlock: 'clamp(3rem, 7vw, 6rem)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" />
            Speedex Group
          </div>
          <h2 className="mt-5 sm:mt-6 font-extrabold tracking-tight text-foreground" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>Our Companies</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)' }}>
            {companies.length} industry-leading entities delivering excellence across signage, automotive, facilities, contracting, trading, and transportation in the UAE.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-[0_40px_90px_-50px_rgba(0,0,0,0.35)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCompany.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={background}
                alt={currentCompany.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = FALLBACK_BG; }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 flex items-center" style={{ minHeight: 'clamp(420px, 60svh, 560px)' }}>
            <div className="w-full max-w-xl px-4 py-8 sm:px-12 sm:py-10">
              <motion.div
                key={currentCompany.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-black/5 bg-card/95 backdrop-blur-xl shadow-[0_30px_60px_-40px_rgba(0,0,0,0.45)]"
                style={{ padding: 'clamp(1.15rem, 3vw, 2rem)' }}
              >
                <div className="mb-4 sm:mb-6 flex items-center justify-center rounded-xl bg-background p-3 border border-border" style={{ height: 'clamp(4rem, 10vw, 6rem)' }}>
                  {currentCompany.logo_url && !logoFailed[currentCompany.id] ? (
                    <img
                      src={currentCompany.logo_url}
                      alt={`${currentCompany.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                      onError={() => setLogoFailed((s) => ({ ...s, [currentCompany.id]: true }))}
                    />
                  ) : (
                    <span className="grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-xl bg-primary text-lg sm:text-xl font-extrabold text-primary-foreground">
                      {initials(currentCompany.name)}
                    </span>
                  )}
                </div>

                {currentCompany.tagline && (
                  <div className="mb-3 inline-block rounded-lg bg-primary/10 px-2.5 py-1 sm:px-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary">
                    {currentCompany.tagline}
                  </div>
                )}

                <h3 className="flex items-center gap-2 sm:gap-3 font-extrabold text-foreground" style={{ fontSize: 'clamp(1.25rem, 3.2vw, 1.875rem)' }}>
                  <Building2 className="h-5 w-5 sm:h-7 sm:w-7 shrink-0 text-primary" />
                  <span className="min-w-0">{currentCompany.name}</span>
                </h3>

                <p className="mt-3 text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}>{currentCompany.description}</p>

                <a
                  href={exploreHref}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="mt-5 sm:mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold !text-white hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Explore Company
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-2 sm:p-3 text-foreground backdrop-blur hover:bg-primary transition-all"
            aria-label="Previous Company"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 p-2 sm:p-3 text-foreground backdrop-blur hover:bg-primary transition-all"
            aria-label="Next Company"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 z-30 flex max-w-[90%] flex-wrap justify-center -translate-x-1/2 gap-2">
            {companies.map((c, index) => (
              <button
                key={c.id}
                onClick={() => goTo(index)}
                aria-label={`Show ${c.name}`}
                className={`transition-all duration-300 rounded-full ${index === currentIndex ? 'h-2.5 w-8 bg-primary' : 'h-2.5 w-2.5 bg-foreground/20 hover:bg-foreground/40'}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-border/60 pt-12">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Play className="h-3.5 w-3.5 fill-current" />
              Corporate Showcase
            </div>
            <h3 className="mt-4 text-3xl font-bold text-foreground">Excellent Group of Companies</h3>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Location</p>
                  <p className="text-sm font-bold text-foreground">Abu Dhabi, UAE</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Contact</p>
                  <a href="tel:+971557178432" className="block text-sm font-bold text-foreground hover:text-primary">+971 55 717 8432</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><Globe className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Website</p>
                  <a href="https://www.excellentgroup.ae" target="_blank" rel="noreferrer" className="text-sm font-bold text-foreground hover:text-primary">www.excellentgroup.ae</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurCompanies;
