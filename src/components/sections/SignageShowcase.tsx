import { useState, useEffect, useCallback } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDE_MS = 6000;

const SECONDARY_SLIDES = [
  {
    id: 1,
    image: '/images/showcase/signage-1.jpg',
    badge: 'INDOOR & 3D SIGNAGE',
    title: 'Precision 3D Acrylic & Metallic Letters',
    subtitle: 'Premium LED illuminated logo displays designed and fabricated for high-end retail.',
    buttonText: 'Explore Projects',
    buttonHref: '/portfolio',
  },
  {
    id: 2,
    image: '/images/showcase/signage-2.jpg',
    badge: 'OUTDOOR & ARCHITECTURAL',
    title: 'Building & Exterior Signages',
    subtitle: 'High-visibility architectural signages engineered for corporate environments across the UAE.',
    buttonText: 'View Portfolio',
    buttonHref: '/portfolio',
  },
  {
    id: 3,
    image: '/images/showcase/signage-3.jpg',
    badge: 'COMMERCIAL BRANDING',
    title: 'Corporate Retail & Reception Displays',
    subtitle: 'Custom indoor branding and illuminated displays crafted with high precision.',
    buttonText: 'Contact Us',
    buttonHref: '/contact',
  },
  {
    id: 4,
    image: '/images/showcase/signage-4.jpg',
    badge: 'WAYFINDING & PYLONS',
    title: 'Pylon, Wayfinding & Directory Signage',
    subtitle: 'Durable illuminated pylons and wayfinding systems built for malls, clinics and campuses.',
    buttonText: 'Our Services',
    buttonHref: '/services',
  },
  {
    id: 5,
    image: '/images/showcase/signage-5.jpg',
    badge: 'FLEET GRAPHICS',
    title: 'Custom Commercial Fleet Branding',
    subtitle: 'Transform commercial vehicles into mobile brand assets with durable wraps.',
    buttonText: 'Our Services',
    buttonHref: '/services',
  },
];

export function SecondarySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setCurrentIndex(((i % SECONDARY_SLIDES.length) + SECONDARY_SLIDES.length) % SECONDARY_SLIDES.length);
  }, []);

  // Single timer, restarted whenever the index changes (auto or manual)
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SECONDARY_SLIDES.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentSlide = SECONDARY_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-black flex items-center my-6"
      style={{ minHeight: 'clamp(360px, 62svh, 600px)' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            loading={currentSlide.id === 1 ? 'eager' : 'lazy'}
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-[min(28rem,92%)] bg-white/95 backdrop-blur-md border border-white/80 rounded-2xl sm:rounded-3xl shadow-xl"
            style={{ padding: 'clamp(1.25rem, 3vw, 2rem)' }}
          >
            <span className="inline-block px-2.5 py-1 sm:px-3 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {currentSlide.badge}
            </span>

            <h2 className="mt-3 sm:mt-4 font-extrabold text-slate-900 leading-tight" style={{ fontSize: 'clamp(1.15rem, 2.6vw, 1.6rem)' }}>{currentSlide.title}</h2>

            <p className="mt-2 sm:mt-3 text-slate-600 leading-relaxed font-medium" style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>{currentSlide.subtitle}</p>

            <div className="mt-4 sm:mt-6">
              <Link to={currentSlide.buttonHref}>
                <Button className="h-10 sm:h-11 px-5 sm:px-6 rounded-full bg-[#35524A] hover:bg-[#253B35] !text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md">
                  {currentSlide.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={() => goTo(currentIndex - 1)}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => goTo(currentIndex + 1)}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SECONDARY_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  );
}

export default SecondarySlider;
