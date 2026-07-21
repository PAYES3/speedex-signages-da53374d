import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image_url: string;
  button_text: string;
  button_link: string;
}

// Fallback Default 5 Slides (Admin-ல் டேட்டா இல்லை என்றாலும் சைடு ஒர்க் ஆகும்)
const DEFAULT_SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Speedex Signages & Advertising',
    subtitle: 'Premium Signage · United Arab Emirates',
    description: 'Cinematic LED, acrylic and 3D signage — designed, manufactured and installed in-house.',
    image_url: 'https://images.unsplash.com/photo-1542744094-3a3121699f11?w=1600&auto=format&fit=crop',
    button_text: 'Get Free Quote',
    button_link: '/contact',
  },
  {
    id: '2',
    title: 'Speedex Rent A Car & Leasing',
    subtitle: 'Luxury & Commercial Fleet',
    description: 'Luxury vehicles, commercial fleets, and airport transfer services across Dubai & Abu Dhabi.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&auto=format&fit=crop',
    button_text: 'View Fleet',
    button_link: '/portfolio',
  },
  {
    id: '3',
    title: 'Excellent General Trading',
    subtitle: 'Import, Export & Supply',
    description: 'Trusted supplier for Safety Products, Building Materials, Uniforms & Cleaning Supplies.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&auto=format&fit=crop',
    button_text: 'Trading Products',
    button_link: '/portfolio',
  },
  {
    id: '4',
    title: 'Arabsat Passenger Transport',
    subtitle: 'Bus Charters & Staff Transit',
    description: 'Staff & Labour transportation, bus charters, and 24-hour call center support.',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&auto=format&fit=crop',
    button_text: 'Transport Services',
    button_link: '/contact',
  },
  {
    id: '5',
    title: 'Speedex Auto Workshop',
    subtitle: 'Technical & Auto Care',
    description: 'Advanced vehicle diagnostics, engine rebuilds, body shop, and routine maintenance.',
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1600&auto=format&fit=crop',
    button_text: 'Book Service',
    button_link: '/contact',
  },
];

export function Hero() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);

  // Admin-ல் மாற்றிய ஸ்லைடுகளை Supabase-ல் இருந்து எடுத்தல்
  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .order('slide_order', { ascending: true })
          .limit(5);

        if (data && data.length > 0 && !error) {
          setSlides(data);
        }
      } catch {
        // Error வந்தாலும் DEFAULT_SLIDES சேஃப்பாக இருக்கும்
      }
    }
    fetchSlides();
  }, []);

  // 6 வினாடிக்கு ஒரு முறை தானாக அடுத்த ஸ்லைடருக்கு மாறுதல்
  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  if (!slides.length) return null;

  const activeSlide = slides[current];

  return (
    <section className="relative min-h-[100svh] w-full max-w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Dynamic Slide Background Image / Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id || current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeSlide.image_url}
            alt={activeSlide.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlays (மொபைலிலும் டெக்ஸ்ட் தெளிவாக தெரிய) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 z-10 pointer-events-none" />

      {/* Main Slide Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 box-border">
        <div className="max-w-3xl text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Badge Header */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase border border-white/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold,#d4af37)] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                {activeSlide.subtitle || 'Speedex Group · UAE'}
              </div>

              {/* Dynamic Title */}
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
                {activeSlide.title}
              </h1>

              {/* Dynamic Description */}
              <p className="text-sm sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                {activeSlide.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to={activeSlide.button_link || '/contact'}>
                  <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold shadow-lg transition-all hover:scale-105">
                    {activeSlide.button_text || 'Learn More'} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 text-sm sm:text-base font-semibold backdrop-blur">
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ⬅️ Left Arrow Navigation */}
      <button
        onClick={prevSlide}
        type="button"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* ➡️ Right Arrow Navigation */}
      <button
        onClick={nextSlide}
        type="button"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            type="button"
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current ? 'w-8 bg-primary' : 'w-2 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
