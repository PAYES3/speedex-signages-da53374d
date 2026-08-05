import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Assets folder-il irukkum exact image imports
import signage1 from '@/assets/hero/SIGNAGE-1.jpg';
import signage2 from '@/assets/hero/SIGNAGE-2.jpg';
import signage3 from '@/assets/hero/SIGNAGE-3.jpg';
import signage5 from '@/assets/hero/SIGNAGE-5-(BASCOM).jpg';
import signage6 from '@/assets/hero/SIGNAGE-6-(NMC).jpg';
import signage7 from '@/assets/hero/SIGNAGE-7-(DANAT).jpg';

export type Slide = {
  id: string;
  media_url: string;
  subtitle: string;
  title: string;
  description: string;
  cta_primary_label: string;
  cta_primary_href: string;
};

// Direct Local Slides
const LOCAL_SLIDES: Slide[] = [
  {
    id: 'slide-1',
    media_url: signage1,
    subtitle: 'INDOOR & 3D SIGNAGE',
    title: 'Precision 3D Acrylic & Metallic Letters',
    description: 'Premium LED illuminated logo displays designed and fabricated for high-end retail.',
    cta_primary_label: 'Explore Projects',
    cta_primary_href: '/portfolio',
  },
  {
    id: 'slide-2',
    media_url: signage2,
    subtitle: 'OUTDOOR & ARCHITECTURAL',
    title: 'Building & Exterior Signages',
    description: 'High-visibility architectural signages engineered for corporate environments across the UAE.',
    cta_primary_label: 'Get a Free Quote',
    cta_primary_href: '/contact',
  },
  {
    id: 'slide-3',
    media_url: signage3,
    subtitle: 'COMMERCIAL BRANDING',
    title: 'Corporate Retail & Reception Displays',
    description: 'Custom indoor branding and illuminated displays crafted with high precision.',
    cta_primary_label: 'Contact Us',
    cta_primary_href: '/contact',
  },
  {
    id: 'slide-4',
    media_url: signage5,
    subtitle: 'VEHICLE GRAPHICS',
    title: 'Custom Commercial Fleet Branding',
    description: 'Transform your commercial vehicles into mobile brand assets with durable wraps.',
    cta_primary_label: 'Our Services',
    cta_primary_href: '/services',
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const slides = LOCAL_SLIDES;
  const current = slides[index];

  // Auto-play interval (5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative isolate min-h-[85vh] w-full overflow-hidden bg-slate-100 flex items-center">
      {/* Background Image Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={current.media_url}
            alt={current.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle light background blur/overlay */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Floating White Content Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/80 p-8 sm:p-10 rounded-3xl shadow-xl"
          >
            {current.subtitle && (
              <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                {current.subtitle}
              </span>
            )}

            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {current.title}
            </h2>

            {current.description && (
              <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
                {current.description}
              </p>
            )}

            <div className="mt-6">
              <Link to={current.cta_primary_href}>
                <Button className="h-11 px-6 rounded-full bg-[#2D4A43] hover:bg-[#1E332E] text-white font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md">
                  {current.cta_primary_label}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 transition-all active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setIndex((i) => (i + 1) % slides.length)}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 transition-all active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-[#2D4A43]' : 'w-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
