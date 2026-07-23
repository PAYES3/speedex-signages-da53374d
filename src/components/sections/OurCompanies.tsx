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
import { supabase } from "@/integrations/supabase/client";

// =======================
// VIDEO
// =======================
import defaultGroupVideo from "@/assets/hero/ALL-COMPANIES.mp4";

// =======================
// COMPANY LOGOS
// =======================
import speedexSignageLogo from "@/assets/logos/speedex-signage.jpg";
import rentACarLogo from "@/assets/logos/cars-rental.jpg";
import facilityManagementLogo from "@/assets/logos/facility-management.jpg";
import workshopLogo from "@/assets/logos/workshop.jpg";
import fieldContractingLogo from "@/assets/logos/field-contracting.jpg";
import generalTradingLogo from "@/assets/logos/general-trading.jpg";
import arabsatLogo from "@/assets/logos/arabsat.jpg";

// =======================
// REAL SIGNAGE IMAGES
// CHANGE THESE FILENAMES
// =======================

import signage1 from "@/assets/hero/signage1.jpg";
import signage2 from "@/assets/hero/signage2.jpg";
import signage3 from "@/assets/hero/signage3.jpg";
import signage4 from "@/assets/hero/signage4.jpg";
import signage5 from "@/assets/hero/signage5.jpg";
import signage6 from "@/assets/hero/signage6.jpg";
import signage7 from "@/assets/hero/signage7.jpg";

// =======================

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url: string;
  bg_url: string;
}

const DEFAULT_COMPANIES: Company[] = [
  {
    id: "1",
    name: "Speedex Signages",
    slug: "speedex-signages",
    tagline: "LED, Acrylic & 3D Signage",
    description:
      "Premier signage manufacturing, LED display solutions, acrylic fabrication, 3D signboards and vehicle branding across UAE.",
    logo_url: speedexSignageLogo,
    bg_url: signage1,
  },
  {
    id: "2",
    name: "Speedex Rent A Car",
    slug: "speedex-rent-a-car",
    tagline: "Luxury & Commercial Rental",
    description:
      "Luxury, SUV and commercial vehicle rentals with airport transfers and corporate leasing services.",
    logo_url: rentACarLogo,
    bg_url: signage2,
  },
  {
    id: "3",
    name: "Speedex Facility Management",
    slug: "speedex-facility-management",
    tagline: "Building Maintenance",
    description:
      "Professional building maintenance, cleaning, MEP and complete facility management services.",
    logo_url: facilityManagementLogo,
    bg_url: signage3,
  },
  {
    id: "4",
    name: "Speedex Auto Workshop",
    slug: "speedex-workshop",
    tagline: "Auto Repair Experts",
    description:
      "Mechanical repairs, diagnostics, engine rebuilding, painting and complete automotive care.",
    logo_url: workshopLogo,
    bg_url: signage4,
  },
  {
    id: "5",
    name: "Excellent Field Contracting",
    slug: "excellent-field-contracting",
    tagline: "Civil & Interior",
    description:
      "Civil contracting, fit-out works, renovation and commercial construction solutions.",
    logo_url: fieldContractingLogo,
    bg_url: signage5,
  },
  {
    id: "6",
    name: "Excellent General Trading",
    slug: "excellent-general-trading",
    tagline: "General Trading",
    description:
      "Import, export, uniforms, safety products, building materials and industrial supplies.",
    logo_url: generalTradingLogo,
    bg_url: signage6,
  },
  {
    id: "7",
    name: "Arabsat Transport",
    slug: "arabsat",
    tagline: "Passenger Transport",
    description:
      "Luxury buses, staff transportation, labour transport and airport transfer solutions.",
    logo_url: arabsatLogo,
    bg_url: signage7,
  },
];

export function OurCompanies({
  groupVideoUrl,
}: {
  groupVideoUrl?: string;
}) {
  const [companies] = useState(DEFAULT_COMPANIES);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [videoUrl, setVideoUrl] = useState(
    groupVideoUrl || defaultGroupVideo
  );

  useEffect(() => {
    async function loadCompanyData() {
      try {
        const { data } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "group_video_url")
          .single();

        if (data?.value) {
          setVideoUrl(data.value);
        }
      } catch {}
    }

    loadCompanyData();
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === companies.length - 1 ? 0 : prev + 1
    );
  }, [companies.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? companies.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentCompany = companies[currentIndex];
    return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background py-16 sm:py-24">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">

            <Sparkles className="h-4 w-4" />

            Speedex Group

          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">

            Our Companies

          </h2>

          <p className="mt-5 text-muted-foreground leading-7">

            Premium companies delivering signage, construction, transport,

            workshop, rental and trading services throughout the UAE.

          </p>

        </div>



        {/* Slider */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">

          <AnimatePresence mode="wait">

            <motion.div

              key={currentCompany.id}

              initial={{ opacity: 0, scale: 1.08 }}

              animate={{ opacity: 1, scale: 1 }}

              exit={{ opacity: 0, scale: 1.08 }}

              transition={{ duration: 0.8 }}

              className="absolute inset-0"

            >

              <img

                src={currentCompany.bg_url}

                alt={currentCompany.name}

                className="h-full w-full object-cover"

              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />

            </motion.div>

          </AnimatePresence>



          <div className="relative z-10 flex min-h-[620px] items-center">

            <div className="max-w-xl px-8 py-10 md:px-14">

              <motion.div

                key={currentCompany.name}

                initial={{ opacity: 0, y: 30 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: .6 }}

                className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl"

              >

                {/* Logo */}

                <div className="mb-6 flex h-24 items-center justify-center rounded-2xl bg-white p-4">

                  {currentCompany.logo_url ? (

                    <img

                      src={currentCompany.logo_url}

                      alt={currentCompany.name}

                      className="max-h-full object-contain"

                    />

                  ) : (

                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary text-white font-bold">

                      {initialsOf(currentCompany.name)}

                    </div>

                  )}

                </div>



                <h3 className="flex items-center gap-2 text-3xl font-bold text-white">

                  <Building2 className="h-6 w-6 text-primary" />

                  {currentCompany.name}

                </h3>



                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">

                  {currentCompany.tagline}

                </p>



                <p className="mt-5 text-white/80 leading-7">

                  {currentCompany.description}

                </p>



                <a

                  href={`/companies/${currentCompany.slug}`}

                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-primary/90"

                >

                  Explore Company

                  <ArrowRight className="h-4 w-4" />

                </a>

              </motion.div>

            </div>

          </div>



          {/* Previous */}

          <button

            onClick={prevSlide}

            className="absolute left-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur transition hover:scale-110"

          >

            <ChevronLeft className="h-6 w-6" />

          </button>



          {/* Next */}

          <button

            onClick={nextSlide}

            className="absolute right-6 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/20 bg-black/50 p-3 text-white backdrop-blur transition hover:scale-110"

          >

            <ChevronRight className="h-6 w-6" />

          </button>



          {/* Pagination */}

          <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">

            {companies.map((_, index) => (

              <button

                key={index}

                onClick={() => setCurrentIndex(index)}

                className={`transition-all duration-300 rounded-full ${

                  index === currentIndex

                    ? "h-2 w-8 bg-primary"

                    : "h-2 w-2 bg-white/40"

                }`}

              />

            ))}

          </div>

        </div>

                {/* ================= VIDEO SECTION ================= */}

        <div className="mt-24 border-t border-border/60 pt-16">

          <div className="mx-auto mb-10 max-w-3xl text-center">

            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-primary">

              <Play className="h-4 w-4 fill-current" />

              Corporate Video

            </div>

            <h3 className="mt-6 text-4xl font-extrabold tracking-tight">

              Excellent Group of Companies

            </h3>

            <p className="mt-4 text-muted-foreground">

              Discover our companies, facilities, manufacturing capabilities,
              transport fleet and premium services across the UAE.

            </p>

          </div>

          <motion.div

            initial={{ opacity: 0, y: 40 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{ duration: .7 }}

            className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border shadow-2xl"

          >

            {videoUrl ? (

              <video

                src={videoUrl}

                autoPlay

                muted

                loop

                playsInline

                controls

                className="aspect-video w-full bg-black object-cover"

              />

            ) : (

              <div className="flex aspect-video items-center justify-center bg-zinc-950">

                <div className="text-center">

                  <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-primary/20">

                    <Play className="h-10 w-10 fill-current text-primary" />

                  </div>

                  <h4 className="text-xl font-bold text-white">

                    Group Video

                  </h4>

                  <p className="mt-2 text-sm text-zinc-400">

                    Upload a corporate video from the admin panel.

                  </p>

                </div>

              </div>

            )}

          </motion.div>

          {/* ================= CONTACT BAR ================= */}

          <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-border bg-card p-6 shadow-sm">

            <div className="grid gap-6 md:grid-cols-3">

              <div className="flex items-center gap-3">

                <MapPin className="h-5 w-5 text-primary" />

                <div>

                  <p className="text-xs uppercase text-muted-foreground">

                    Address

                  </p>

                  <p className="font-semibold">

                    Abu Dhabi, UAE

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Phone className="h-5 w-5 text-primary" />

                <div>

                  <p className="text-xs uppercase text-muted-foreground">

                    Phone

                  </p>

                  <div className="space-y-1">

                    <a

                      href="tel:+971557178432"

                      className="block font-semibold hover:text-primary"

                    >

                      +971 55 717 8432

                    </a>

                    <a

                      href="tel:+97125522661"

                      className="block font-semibold hover:text-primary"

                    >

                      +971 2 552 2661

                    </a>

                  </div>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <Globe className="h-5 w-5 text-primary" />

                <div>

                  <p className="text-xs uppercase text-muted-foreground">

                    Website

                  </p>

                  <a

                    href="https://www.excellentgroup.ae"

                    target="_blank"

                    rel="noreferrer"

                    className="font-semibold hover:text-primary"

                  >

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
