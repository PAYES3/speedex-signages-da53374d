import { useState, useEffect } from 'react';
import { ArrowRight, Building2, Sparkles, Play, ShieldCheck, Phone, MapPin, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

const DEFAULT_COMPANIES = [
  {
    id: '1',
    name: 'Speedex Signages',
    slug: 'speedex-signages',
    tagline: 'LED, Acrylic & 3D Signage',
    description: 'Premier signage manufacturing, 2D/3D signboards, and vehicle graphics in UAE.',
    logo_url: '/assets/logos/speedex-signage.jpg',
  },
  {
    id: '2',
    name: 'Speedex Rent A Car',
    slug: 'speedex-rent-a-car',
    tagline: 'Luxury & Commercial Rental',
    description: 'Fleet rentals, vehicle leasing, and airport transfers across Dubai & Abu Dhabi.',
    logo_url: '/assets/logos/cars-rental.jpg',
  },
  {
    id: '3',
    name: 'Speedex Facility Management',
    slug: 'speedex-facility-management',
    tagline: 'Building Maintenance & Care',
    description: 'Complete facility management and building maintenance services.',
    logo_url: '/assets/logos/facility-management.jpg',
  },
  {
    id: '4',
    name: 'Speedex Auto Workshop',
    slug: 'speedex-workshop',
    tagline: 'Technical & Auto Care',
    description: 'Advanced vehicle servicing, engine rebuilds, diagnostics, and bodywork.',
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
    description: 'Safety products, cleaning materials, building supplies, uniforms, and gifts.',
    logo_url: '/assets/logos/general-trading.jpg',
  },
  {
    id: '7',
    name: 'Arabsat Media & Telecom',
    slug: 'arabsat',
    tagline: 'Passenger Transport & Bus Charter',
    description: 'Staff & labour transportation, airport transfers, and vehicle leasing.',
    logo_url: '/assets/logos/arabsat.jpg',
  },
];

export function OurCompanies({ groupVideoUrl }: { groupVideoUrl?: string }) {
  const [companies, setCompanies] = useState(DEFAULT_COMPANIES);
  const [videoUrl, setVideoUrl] = useState(
    groupVideoUrl || ''
  );

  useEffect(() => {
    // Dynamic Fetch from Supabase settings if configured
    async function loadCompanyData() {
      try {
        const { data } = await supabase.from('site_settings').select('value').eq('key', 'group_video_url').single();
        if (data?.value) {
          setVideoUrl(data.value);
        }
      } catch (e) {
        // Fallback to static props/defaults
      }
    }
    loadCompanyData();
  }, []);

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden w-full max-w-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,theme(colors.primary/0.08),transparent_60%)] pointer-events-none" />

      {/* Main Container - Responsive Fit */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
        
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto px-2">
          <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 shrink-0" /> Speedex Group
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mt-4 tracking-tight leading-tight text-foreground">
            A Trusted Group of UAE Businesses
          </h2>
          <p className="mt-3 text-xs sm:text-base text-muted-foreground leading-relaxed">
            Specialized companies serving clients across the Emirates — Signage, Workshop, Rental, Trading, Contracting & Transport.
          </p>
        </div>

        {/* 3-COLUMN RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {companies.map((c, i) => (
            <div key={c.id || i} className="w-full">
              <a
                href={`/companies/${c.slug}`}
                className="group block bg-card/90 backdrop-blur-sm border border-border/80 rounded-2xl p-5 sm:p-6 h-full hover:shadow-xl hover:-translate-y-1 hover:border-primary/60 transition-all relative overflow-hidden flex flex-col justify-between"
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

                  <h3 className="font-bold text-base sm:text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                    <Building2 className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{c.name}</span>
                  </h3>

                  {c.tagline && (
                    <p className="mt-1 text-[11px] sm:text-xs uppercase tracking-wider text-primary font-semibold">
                      {c.tagline}
                    </p>
                  )}

                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                  Explore Company <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* 🎬 VIDEO SHOWCASE SECTION BELOW COMPANIES */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-border/60">
          <div className="text-center mb-8 max-w-2xl mx-auto px-2">
            <span className="text-xs uppercase font-bold tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2">
              <Play className="w-3.5 h-3.5 fill-current" /> Corporate Video
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Excellent Group of Companies
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Watch our full corporate presentation showcasing our facilities, services, and fleet across Abu Dhabi and UAE.
            </p>
          </div>

          {/* Mobile-Fit Video Player Box */}
          <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-black/90 relative aspect-video">
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                playsInline
                className="w-full h-full object-contain"
                poster="/assets/images/video-poster.jpg"
              >
                Your browser does not support video playback.
              </video>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-zinc-950">
                <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-4">
                  <Play className="w-8 h-8 fill-current translate-x-0.5" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Excellent Group Showcase Video</h4>
                <p className="text-xs text-zinc-400 max-w-md">
                  Upload the promo video in Admin Panel to play it directly here.
                </p>
              </div>
            )}
          </div>

          {/* Quick Contact Bar from Video Info */}
          <div className="mt-6 max-w-4xl mx-auto bg-card/60 border border-border/80 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Abu Dhabi - UAE</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <a href="tel:+971557178432" className="hover:text-primary transition-colors">+971 55 717 84 32</a>
              <span>/</span>
              <a href="tel:+97125522661" className="hover:text-primary transition-colors">+971 2 55 22 661</a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="w-4 h-4 text-primary shrink-0" />
              <a href="https://www.excellentgroup.ae" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors font-medium">www.excellentgroup.ae</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
