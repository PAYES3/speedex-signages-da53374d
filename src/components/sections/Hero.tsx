import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
  const randomVideo = useMemo(() => HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)], []);
  const finalVideo = videoUrl || randomVideo || COMPANY.heroVideo;
  const finalPoster = posterUrl || COMPANY.heroImage;
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative min-h-[92svh] flex items-center overflow-hidden bg-foreground">
      <AnimatePresence>
        <motion.video
          key={finalVideo}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: videoReady ? 0.6 : 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={finalPoster}
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={finalVideo} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* Subtle charcoal overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1F2937]/85 via-[#1F2937]/60 to-[#1F2937]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F2937]/70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/15 text-primary text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase backdrop-blur"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Premium Signage — UAE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold text-white leading-[1.02] tracking-[-0.025em]"
          >
            Signage that <span className="text-primary">elevates</span> your brand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-base sm:text-lg text-white/80 max-w-xl leading-relaxed"
          >
            {COMPANY.name} designs, fabricates and installs premium signage across the UAE —
            from LED facades and 3D letters to full corporate branding.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="h-12 px-7 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_10px_30px_-10px_rgba(245,130,32,0.6)] transition-all">
                Get Free Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="h-12 px-7 rounded-full border-white/70 bg-white/5 backdrop-blur text-white hover:bg-white hover:text-foreground font-semibold">
                View Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-[10px] uppercase tracking-[0.35em] flex items-center gap-2"
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}