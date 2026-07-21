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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .order('slide_order', { ascending: true });

        if (data && data.length > 0 && !error) {
          const formattedSlides = data.map((item) => {
            let finalImageUrl = item.image_url;
            let finalVideoUrl = item.video_url;

            // உங்கள் Supabase Bucket பெயரான 'hero-videos'-ல் இருந்து Permanent Public URL எடுத்தல்
            if (finalImageUrl && !finalImageUrl.startsWith('http')) {
              const { data: pubData } = supabase.storage.from('hero-videos').getPublicUrl(finalImageUrl);
              finalImageUrl = pubData.publicUrl;
            }
            if (finalVideoUrl && !finalVideoUrl.startsWith('http')) {
              const { data: pubData } = supabase.storage.from('hero-videos').getPublicUrl(finalVideoUrl);
              finalVideoUrl = pubData.publicUrl;
            }

            return {
              ...item,
              image_url: finalImageUrl || DEFAULT_SLIDES[0].image_url,
              video_url: finalVideoUrl,
            };
          });

          setSlides(formattedSlides);
        }
      } catch {
        // Fallback to default
      }
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const activeSlide = slides[current];
    if (activeSlide.video_url) return; 

    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [slides, current]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {});
    }
  }, [current]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  if (!slides.length) return null;
  const activeSlide = slides[current];

  const isVideo = (url?: string) => {
    if (!url) return false;
    return url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('video');
  };

  const hasVideo = isVideo(activeSlide.video_url) || isVideo(activeSlide.image_url);
  const mediaSrc = activeSlide.video_url || activeSlide.image_url;

  return (
    <section className="relative min-h-[90svh] w-full max-w-full overflow-hidden bg-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.id || current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full bg-black"
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={activeSlide.image_url}
              className="w-full h-full object-cover object-center"
              onEnded={nextSlide}
            />
          ) : (
            <img
              src={activeSlide.image_url}
              alt={activeSlide.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.currentTarget.src = DEFAULT_SLIDES[0].image_url;
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 z-10 pointer-events-none" />

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
                {activeSlide.subtitle || 'SPEEDEX SIGNAGES · UAE'}
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
