import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface SlidePhoto {
  id: string;
  image_url: string;
  title?: string;
}

// Fallback Default Signage Photos (Admin-ல் போட்டோஸ் இல்லை என்றால் இவை காட்டும்)
const DEFAULT_SIGNAGE_PHOTOS: SlidePhoto[] = [
  {
    id: '1',
    image_url: 'https://images.unsplash.com/photo-1542744094-3a3121699f11?w=1600&auto=format&fit=crop',
    title: '3D Acrylic & Cinematic LED Signage',
  },
  {
    id: '2',
    image_url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1600&auto=format&fit=crop',
    title: 'Outdoor Commercial Billboards & Displays',
  },
  {
    id: '3',
    image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1600&auto=format&fit=crop',
    title: 'Custom Vehicle Branding & Graphics',
  },
  {
    id: '4',
    image_url: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=1600&auto=format&fit=crop',
    title: 'Architectural Neon & Lightboxes',
  },
];

export function Hero() {
  const [photos, setPhotos] = useState<SlidePhoto[]>(DEFAULT_SIGNAGE_PHOTOS);
  const [current, setCurrent] = useState(0);

  // Admin Panel-ல் Upload செய்யும் போட்டோக்களை Supabase-ல் இருந்து எடுத்தல்
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .order('slide_order', { ascending: true });

        if (data && data.length > 0 && !error) {
          const mapped = data.map((item) => ({
            id: item.id,
            image_url: item.image_url,
            title: item.title || 'Speedex Signage Work Showcase',
          }));
          setPhotos(mapped);
        }
      } catch {
        // DB கிடைக்கவில்லை என்றால் DEFAULT_SIGNAGE_PHOTOS சேஃப்பாக இருக்கும்
      }
    }
    fetchPhotos();
  }, []);

  // 5 வினாடிக்கு ஒரு முறை Photos Automatic Slide மாறுதல்
  useEffect(() => {
    if (photos.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-black text-white">
      
      {/* 1️⃣ SPEEDEX SIGNAGES MAIN HERO HEADER */}
      <div className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Glowing Background Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/30 via-black to-black pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

        <div className="relative z-20 max-w-4xl text-center mx-auto space-y-6">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase border border-white/20 bg-white/5 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-[color:var(--gold,#d4af37)] shadow-[0_0_10px_rgba(212,175,55,0.9)] animate-pulse" />
            Speedex Signages & Advertising · UAE
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-[4.75rem] font-extrabold leading-[1.08] tracking-[-0.03em]"
          >
            We light up <span className="bg-gradient-to-r from-[color:var(--gold,#d4af37)] via-white to-primary bg-clip-text text-transparent">your brand</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed"
          >
            Cinematic LED, acrylic and 3D signage — designed, manufactured and installed in-house across Dubai, Abu Dhabi, and UAE.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="h-12 sm:h-14 px-7 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold shadow-lg transition-all hover:scale-105">
                Get Free Quote <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-7 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 text-sm sm:text-base font-semibold backdrop-blur">
                View Portfolio
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* 2️⃣ HERO BOTTOM COLUMN: RUNNING UPLOADED PHOTOS SLIDER */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        
        {/* Column Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-spin" />
            <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/90">
              Featured Signage Work Showcase
            </span>
          </div>
          <div className="text-xs font-mono text-white/60">
            {current + 1} / {photos.length}
          </div>
        </div>

        {/* Dynamic Image Carousel Container */}
        <div className="relative w-full h-72 sm:h-[450px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950 group">
          
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[current]?.id || current}
              src={photos[current]?.image_url}
              alt={photos[current]?.title || 'Signage Photo'}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Photo Caption Overlay */}
          {photos[current]?.title && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-6 z-10">
              <p className="text-white font-semibold text-sm sm:text-lg tracking-wide">
                {photos[current].title}
              </p>
            </div>
          )}

          {/* ⬅️ Left Navigation Arrow */}
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* ➡️ Right Navigation Arrow */}
          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/60 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                type="button"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-6 bg-primary' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
