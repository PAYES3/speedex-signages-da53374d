import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Building2,
  Sparkles,
  Play,
  MapPin,
  Phone,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url: string;
  bg_url: string;
}

// Direct public paths matching your exact GitHub repository filenames
const ALL_COMPANIES: Company[] = [
  {
    id: "1",
    name: "Speedex Signages",
    slug: "speedex-signages",
    tagline: "LED, Acrylic & 3D Signage",
    description: "Premier signage manufacturing, LED display solutions, acrylic fabrication, 3D signboards and vehicle branding across UAE.",
    logo_url: "/assets/logos/Speedex Signages LOGO_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    name: "Speedex Rent A Car",
    slug: "speedex-rent-a-car",
    tagline: "Luxury & Commercial Rental",
    description: "Luxury, SUV and commercial vehicle rentals with airport transfers and corporate leasing services.",
    logo_url: "/assets/logos/CARS RENTAL LOGO_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    name: "Speedex Facility Management",
    slug: "speedex-facility-management",
    tagline: "Building Maintenance",
    description: "Professional building maintenance, cleaning, MEP and complete facility management services.",
    logo_url: "/assets/logos/Facility management logo_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    name: "Speedex Auto Workshop",
    slug: "speedex-workshop",
    tagline: "Auto Repair Experts",
    description: "Mechanical repairs, diagnostics, engine rebuilding, painting and complete automotive care.",
    logo_url: "/assets/logos/workshop logo ( updated )_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "5",
    name: "Excellent Field Contracting",
    slug: "excellent-field-contracting",
    tagline: "Civil & Interior",
    description: "Civil contracting, fit-out works, renovation and commercial construction solutions.",
    logo_url: "/assets/logos/Excellent Feild contract_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "6",
    name: "Excellent General Trading",
    slug: "excellent-general-trading",
    tagline: "General Trading",
    description: "Import, export, uniforms, safety products, building materials and industrial supplies.",
    logo_url: "/assets/logos/Excellent trading logo_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "7",
    name: "Arabsat Transport",
    slug: "arabsat",
    tagline: "Passenger Transport",
    description: "Luxury buses, staff transportation, labour transport and airport transfer solutions.",
    logo_url: "/assets/logos/ARABSAT LOGO_page-0001.jpg",
    bg_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
  },
];

export function OurCompanies() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === ALL_COMPANIES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ALL_COMPANIES.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentCompany = ALL_COMPANIES[currentIndex];

  return (
    <section id="our-groups" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" />
            Speedex Group
          </div>
          <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Our Companies
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            7 industry-leading entities delivering excellence across signage, automotive, facilities, contracting, trading, and transportation in the UAE.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-3xl border border-border bg-black shadow-2xl">
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
                src={currentCompany.bg_url}
                alt={currentCompany.name}
                className="h-full w-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Slide Content */}
          <div className="relative z-10 flex min-h-[520px] items-center">
            <div className="max-w-xl px-6 py-10 sm:px-12">
              <motion.div
                key={currentCompany.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/20 bg-black/50 p-6 sm:p-8 backdrop-blur-md"
              >
                {/* Logo Display Container */}
                <div className="mb-6 flex h-24 items-center justify-center rounded-xl bg-white p-3 shadow-inner">
                  <img
                    src={currentCompany.logo_url}
                    alt={currentCompany.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="mb-3 inline-block rounded-lg bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {currentCompany.tagline}
                </div>

                <h3 className="flex items-center gap-3 text-2xl sm:text-3xl font-extrabold text-white">
                  <Building2 className="h-7 w-7 text-primary" />
                  {currentCompany.name}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed">
                  {currentCompany.description}
                </p>

                <a
                  href={`/companies/${currentCompany.slug}`}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all hover:scale-105"
                >
                  Explore Company
                  <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur hover:bg-primary transition-all"
            aria-label="Previous Company"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white backdrop-blur hover:bg-primary transition-all"
            aria-label="Next Company"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
            {ALL_COMPANIES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex ? "h-2.5 w-8 bg-primary" : "h-2.5 w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-16 border-t border-border/60 pt-12">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Play className="h-3.5 w-3.5 fill-current" />
              Corporate Showcase
            </div>
            <h3 className="mt-4 text-3xl font-bold text-foreground">
              Excellent Group of Companies
            </h3>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Location</p>
                  <p className="text-sm font-bold text-foreground">Abu Dhabi, UAE</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Contact</p>
                  <a href="tel:+971557178432" className="block text-sm font-bold text-foreground hover:text-primary">
                    +971 55 717 8432
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">Website</p>
                  <a href="https://www.excellentgroup.ae" target="_blank" rel="noreferrer" className="text-sm font-bold text-foreground hover:text-primary">
                    www.excellentgroup.ae
                  </a>
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
