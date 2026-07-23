import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Building2, Sparkles, Play, MapPin, Phone, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

// 🎬 Video Asset Import
import defaultGroupVideo from '@/assets/hero/ALL-COMPANIES.mp4';

// 🖼️ Logo Asset Imports (Resolves paths properly in Vite build)
import speedexSignageLogo from '@/assets/hero/speedex-signage.jpg';
import rentACarLogo from '@/assets/hero/cars-rental.jpg';
import facilityManagementLogo from '@/assets/hero/facility-management.jpg';
import workshopLogo from '@/assets/hero/workshop.jpg';
import fieldContractingLogo from '@/assets/hero/field-contracting.jpg';
import generalTradingLogo from '@/assets/hero/general-trading.jpg';
import arabsatLogo from '@/assets/hero/arabsat.jpg';

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
    logo_url: speedexSignageLogo,
    bg_url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '2',
    name: 'Speedex Rent A Car',
    slug: 'speedex-rent-a-car',
    tagline: 'Luxury & Commercial Rental',
    description: 'Fleet rentals, vehicle leasing, and airport transfers across Dubai & Abu Dhabi.',
    logo_url: rentACarLogo,
    bg_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '3',
    name: 'Speedex Facility Management',
    slug: 'speedex-facility-management',
    tagline: 'Building Maintenance & Care',
    description: 'Complete facility management and building maintenance services.',
    logo_url: facilityManagementLogo,
    bg_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '4',
    name: 'Speedex Auto Workshop',
    slug: 'speedex-workshop',
    tagline: 'Technical & Auto Care',
    description: 'Advanced vehicle servicing, engine rebuilds, diagnostics, and bodywork.',
    logo_url: workshopLogo,
    bg_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '5',
    name: 'Excellent Field Contracting',
    slug: 'excellent-field-contracting',
    tagline: 'Civil & Interior Works',
    description: 'High-quality contracting and fit-out execution for commercial spaces.',
    logo_url: fieldContractingLogo,
    bg_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '6',
    name: 'Excellent General Trading',
    slug: 'excellent-general-trading',
    tagline: 'Import, Export & Supply',
    description: 'Safety products, cleaning materials, building supplies, uniforms, and gifts.',
    logo_url: generalTradingLogo,
    bg_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: '7',
    name: 'Arabsat Transport Passengers by Buses LLC',
    slug: 'arabsat',
    tagline: 'Passenger Transport & Bus Charter',
    description: 'Staff & labour transportation, airport transfers, luxury bus charter, and fleet leasing across UAE.',
    logo_url: arabsatLogo,
    bg_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80',
  },
];

export function OurCompanies({ groupVideoUrl }: { groupVideoUrl?: string }) {
  const [companies] = useState(DEFAULT_COMPANIES);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [videoUrl, setVideoUrl] = useState<string>(groupVideoUrl || defaultGroupVideo);

  // Supabase dynamic video fetch
  useEffect(() => {
    async function loadCompanyData() {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'group_video_url')
          .single();

        if (data?.value && !error) {
          setVideoUrl(data.value);
        }
      } catch {
        // Fallback remains as defaultGroupVideo
      }
    }
    loadCompanyData();
  }, []);

  // Slider Navigation Logic
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === companies.length - 1 ? 0 : prev + 1));
  }, [companies.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? companies.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentCompany = companies[currentIndex];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden w-full max-w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
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

        {/* HERO FULL SLIDER SECTION */}
        <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-border/80 bg-zinc-950 text-white">
          {companies.map((c, i) => (
            <div
              key={c.id || i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={c.bg_url}
                alt={c.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/30" />
            </div>
          ))}

          {/* Active Card Content */}
          <div className="relative z-10 max-w-xl h-full p-6 sm:p-10 flex flex-col justify-center">
            <div className="bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/20 shadow-xl">
              
              {/* 🎯 LOGO BOX: Always displays full logo inside box without crop */}
              <div className="w-full h-24 bg-white rounded-xl flex items-center justify-center p-2 mb-5 border border-white/30 shadow-inner overflow-hidden">
                {currentCompany.logo_url ? (
                  <img
                    src={currentCompany.logo_url}
                    alt={`${currentCompany.name} logo`}
                    className="max-h-full max-w-full w-auto h-auto object-contain drop-shadow-sm select-none"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary text-white grid place-items-center font-bold text-base">
                    {initialsOf(currentCompany.name)}
                  </div>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-white">
                <Building2 className="w-5 h-5 text-primary shrink-0" />
                <span className="truncate">{currentCompany.name}</span>
              </h3>

              {currentCompany.tagline && (
                <p className="mt-1 text-xs sm:text-sm font-semibold tracking-wider text-primary uppercase">
                  {currentCompany.tagline}
                </p>
              )}

              <p className="mt-3 text-xs sm:text-sm text-zinc-200 leading-relaxed line-clamp-3">
                {currentCompany.description}
              </p>

              <a
                href={`/companies/${currentCompany.slug}`}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all group"
              >
                Explore Company
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/80 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-black/50 text-white hover:bg-black/80 border border-white/20 backdrop-blur-md transition-all cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {companies.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                type="button"
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex ? 'w-7 bg-primary' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 🎬 VIDEO SHOWCASE SECTION */}
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

          <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-black/90 relative aspect-video">
            {videoUrl ? (
              <video
                src={videoUrl}
                autoPlay
                muted
                loop
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

          {/* Quick Contact Bar */}
          <div className="mt-6 max-w-4xl mx-auto bg-card/60 border border-border/80 rounded-2xl p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm shadow-sm">
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

export default OurCompanies;
