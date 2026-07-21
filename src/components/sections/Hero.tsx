import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPANY } from '@/lib/site-data';
import { Button } from '@/components/ui/button';
import hero1 from '@/assets/hero/hero-1.mp4.asset.json';
import hero2 from '@/assets/hero/hero-2.mp4.asset.json';
import hero3 from '@/assets/hero/hero-3.mp4.asset.json';
import hero4 from '@/assets/hero/hero-4.mp4.asset.json';
import hero5 from '@/assets/hero/hero-5.mp4.asset.json';

const HERO_VIDEOS = [hero1.url, hero2.url, hero3.url, hero4.url, hero5.url];

type HeroProps = {
  videoUrl?: string;
  posterUrl?: string;
};

export function Hero({ videoUrl, posterUrl }: HeroProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  // Array of videos or fallback single video
  const videoList = videoUrl ? [videoUrl] : HERO_VIDEOS;
  const currentVideo = videoList[currentIndex] || COMPANY.heroVideo;
  const finalPoster = posterUrl || COMPANY.heroImage;

  // Next Slide Handler
  const handleNext = () => {
    setVideoReady(false);
    setCurrentIndex((prev) => (prev + 1) % videoList.length);
  };

  // Prev Slide Handler
  const handlePrev = () => {
    setVideoReady(false);
    setCurrentIndex((prev) => (prev - 1 + videoList.length) % videoList.length);
  };

  // Auto Play Slider (Every 8 seconds)
  useEffect(() => {
    if (videoList.length <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(interval);
  }, [currentIndex, videoList.length]);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-black">
      {/* 🎯 VIDEO CAROUSEL WITH ANIMATE PRESENCE */}
      <AnimatePresence mode="wait">
        <motion.video
          key={currentVideo}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={finalPoster}
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={currentVideo} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* 🎯 LIGHTER CINEMATIC OVERLAYS (Fixes Dark/Black Display) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

      {/* HERO CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase backdrop-blur-md bg-white/10 border border-white/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
            Premium Signage · United Arab Emirates
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] font-extrabold text-white leading-[1.05] tracking-[-0.03em] drop-shadow-md"
          >
            We light up <span className="bg-gradient-to-r from-[color:var(--gold)] via-white to-primary bg-clip-text text-transparent">your brand</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl leading-relaxed drop-shadow"
          >
            Cinematic LED, acrylic and 3D signage — designed, manufactured and installed in-house for the UAE's most demanding brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-[var(--shadow-glow)] transition-all">
                Get Free Quote <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/40 bg-white/10 text-white hover:bg-white/20 text-base font-semibold backdrop-blur-md">
                View Portfolio
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* 🎯 LEFT & RIGHT NAVIGATION ARROW BUTTONS */}
      {videoList.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Video"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-black/70 hover:scale-110 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Video"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 hover:bg-black/70 hover:scale-110 transition-all cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center items-center gap-2">
            {videoList.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setVideoReady(false);
                  setCurrentIndex(i);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-8 z-10 text-white/60 text-[11px] uppercase tracking-[0.35em] hidden sm:flex items-center gap-2 pointer-events-none"
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}
