import { useState, useEffect, useRef } from 'react';
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
  video_url?: string;
  button_text: string;
  button_link: string;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Speedex Signages & Advertising',
    subtitle: 'PREMIUM SIGNAGE · UNITED ARAB EMIRATES',
    description: 'Cinematic LED, acrylic and 3D signage — designed, manufactured and installed in-house.',
    image_url: 'https://images.unsplash.com/photo-1542744094-3a3121699f11?w=1920&q=80',
    button_text: 'Get Free Quote',
    button_link: '/contact',
  },
];

export function Hero() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Double Slash (//) பிரச்சனை வந்தால் அதை Auto-Fix செய்யும் Helper Function
  const cleanMediaUrl = (url?: string) => {
    if (!url) return '';
    // URL protocol (https://) தவிர மற்ற இடங்களில் வரும் // ஐ / ஆக மாற்றும்
    return url.replace(/([^:]\/)\/+/g, '$1');
  };

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .order('slide_order', { ascending: true });

        if (data && data.length > 0 && !error) {
          const formattedSlides = data.map((item) => {
            let rawImageUrl = item.image_url || '';
            let rawVideoUrl = item.video_url || '';

            if (rawImageUrl && !rawImageUrl.startsWith('http')) {
              rawImageUrl = supabase.storage.from('hero-videos').getPublicUrl(rawImageUrl).data.publicUrl;
            }
            if (rawVideoUrl && !rawVideoUrl.startsWith('http')) {
              rawVideoUrl = supabase.storage.from('hero-videos').getPublicUrl(rawVideoUrl).data.publicUrl;
            }

            return {
              ...item,
              image_url: cleanMediaUrl(rawImageUrl) || DEFAULT_SLIDES[0].image_url,
              video_url: cleanMediaUrl(rawVideoUrl),
            };
          });

          setSlides(formattedSlides);
        }
      } catch {
        // Fallback
      }
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay Error handling
      });
    }
  }, [current]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  if (!slides.length) return null;
  const activeSlide = slides[current];

  const isVideoUrl = (url?: string) => {
    if (!url) return false;
    const cleanUrl = url.split('?')[0].toLowerCase();
    return cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm') || cleanUrl.endsWith('.mov');
  };

  const rawMedia = activeSlide.video_url || activeSlide.image_url;
  const showVideo = !videoError && isVideoUrl(rawMedia);

  return (
    <section className="relative min-h-[90svh] w-full max-w-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Background Media Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id || current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full bg-black"
        >
          {showVideo ? (
            <video
              ref={videoRef}
              key={rawMedia}
              src={rawMedia}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={activeSlide.image_url !== rawMedia ? activeSlide.image_url : undefined}
              className="w-full h-full object-cover object-center"
              onError={() => {
                console.error("Video failed to load:", rawMedia);
                setVideoError(true);
              }}
            />
          ) : (
            <img
              src={activeSlide.image_url || DEFAULT_SLIDES[0].image_url}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_SLIDES[0].image_url;
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 z-10 pointer-events-none" />

      {/* Hero Text Content */}
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase border border-white/20 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold,#d4af37)] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                {activeSlide.subtitle || 'PREMIUM SIGNAGE · UNITED ARAB EMIRATES'}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-extrabold text-white leading-[1.1] tracking-[-0.02em]">
                {activeSlide.title}
              </h1>

              <p className="text-sm sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed">
                {activeSlide.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link to={activeSlide.button_link || '/contact'}>
                  <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold shadow-lg transition-all hover:scale-105">
                    {activeSlide.button_text || 'Get Free Quote'} <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
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

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            type="button"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            type="button"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

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
        </>
      )}
    </section>
  );
}
