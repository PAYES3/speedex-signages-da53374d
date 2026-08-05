import { useEffect, useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListHeroSlides } from '@/lib/admin/cms.functions';

// 1. Assets folder-il irukkum exact filenames moolam import panna pattu ulladhu
import signage1 from '@/assets/hero/SIGNAGE-1.jpg';
import signage2 from '@/assets/hero/SIGNAGE-2.jpg';
import signage3 from '@/assets/hero/SIGNAGE-3.jpg';
import signage5 from '@/assets/hero/SIGNAGE-5-(BASCOM).jpg';
import signage6 from '@/assets/hero/SIGNAGE-6-(NMC).jpg';
import signage7 from '@/assets/hero/SIGNAGE-7-(DANAT).jpg';

export type Slide = {
  id: string;
  media_url: string;
  media_type: string;
  poster_url?: string | null;
  title: string;
  subtitle: string;
  description: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
};

// Default slides configuration using uploaded images
const DEFAULT_SLIDES: Slide[] = [
  {
    id: 'default-1',
    media_url: signage1,
    media_type: 'image',
    poster_url: null,
    title: 'Transforming ideas into powerful visual identities',
    subtitle: 'Premium signage · United Arab Emirates',
    description: 'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.',
    cta_primary_label: 'Get a free quote',
    cta_primary_href: '/contact',
    cta_secondary_label: 'Explore our companies',
    cta_secondary_href: '/companies',
  },
  {
    id: 'default-2',
    media_url: signage2,
    media_type: 'image',
    poster_url: null,
    title: 'Precision 3D Acrylic & Metallic Letters',
    subtitle: 'High-End Retail & Corporate Displays',
    description: 'Premium LED illuminated logo displays designed, cut, and fabricated for maximum durability and visibility.',
    cta_primary_label: 'Get a free quote',
    cta_primary_href: '/contact',
    cta_secondary_label: 'View Portfolio',
    cta_secondary_href: '/portfolio',
  },
  {
    id: 'default-3',
    media_url: signage3,
    media_type: 'image',
    poster_url: null,
    title: 'Architectural & Outdoor Signage Solutions',
    subtitle: 'Turnkey Branding Across UAE',
    description: 'Complete indoor and outdoor architectural signages engineered to match exact corporate specifications.',
    cta_primary_label: 'Contact Us',
    cta_primary_href: '/contact',
    cta_secondary_label: 'Our Services',
    cta_secondary_href: '/services',
  },
  {
    id: 'default-4',
    media_url: signage5,
    media_type: 'image',
    poster_url: null,
    title: 'Custom Commercial Fleet Branding',
    subtitle: 'Vehicle Graphics & Contracting',
    description: 'Transform your vehicles into mobile brand assets with high-precision graphic printing and wrapping.',
    cta_primary_label: 'Get a Quote',
    cta_primary_href: '/contact',
    cta_secondary_label: 'Explore Projects',
    cta_secondary_href: '/portfolio',
  },
];

export function HeroSlider() {
  const fetcher = useServerFn(publicListHeroSlides);
  const { data } = useQuery({ queryKey: ['hero-slides'], queryFn: () => fetcher(), staleTime: 30_000 });

  const slides: Slide[] = useMemo(() => {
    const rows = (data ?? []) as Slide[];
    if (rows.length) return rows;
    return DEFAULT_SLIDES;
  }, [data]);

  const [index, setIndex] = useState(0);
  const current = slides[Math.min(index, slides.length - 1)];

  useEffect(() => { setIndex(0); }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  if (!current) return null;

  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-black flex items-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={current.media_url}
            src={current.media_url}
            alt={current.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        {/* Dark overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {current.subtitle && (
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary border border-primary/20 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {current.subtitle}
              </span>
            )}

            <h1 className="mt-6 font-extrabold text-white leading-[1.05] tracking-tight text-4xl sm:text-6xl">
              {current.title}
            </h1>

            {current.description && (
              <p className="mt-6 text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed font-medium">
                {current.description}
              </p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {current.cta_primary_label && (
                <Link to={current.cta_primary_href || '/contact'}>
                  <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold bg-primary text-primary-foreground hover-glow hover:bg-primary/90 transition-all">
                    {current.cta_primary_label} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              {current.cta_secondary_label && (
                <Link to={current.cta_secondary_href || '/companies'}>
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold border-2 border-white/20 glass text-white hover:bg-white hover:text-black transition-all">
                    {current.cta_secondary_label}
                  </Button>
                </Link>
              )}
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-base font-semibold text-white hover:text-primary transition-colors">
                <PlayCircle className="w-5 h-5" /> View our projects
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows & Pagination Dots */}
        {slides.length > 1 && (
          <div className="mt-12 flex items-center gap-3 relative z-20">
            <button
              aria-label="Previous slide"
              onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              className="w-11 h-11 rounded-full glass border border-white/20 grid place-items-center text-white hover:bg-white hover:text-black transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => setIndex((i) => (i + 1) % slides.length)}
              className="w-11 h-11 rounded-full glass border border-white/20 grid place-items-center text-white hover:bg-white hover:text-black transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 ml-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-3 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroSlider;
