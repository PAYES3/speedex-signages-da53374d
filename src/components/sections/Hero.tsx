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
    <section className="relative min-h-[92svh] flex items-center overflow-hidden bg-[#FAF7F2]">
      <AnimatePresence>
        <motion.video
          key={finalVideo}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: videoReady ? 0.9 : 0, scale: 1.02 }}
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

      {/* Light bright overlays for premium daylight feel */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/55 to-white/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />

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
            className="mt-6 text-6xl sm:text-7xl md:text-[5rem] lg:text-[5.75rem] font-extrabold text-foreground leading-[1.02] tracking-[-0.03em]"
          >
            Signage that <span className="text-primary">elevates</span> your brand.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-foreground/75 max-w-xl leading-relaxed font-medium"
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
              <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold shadow-[0_14px_36px_-12px_rgba(245,130,32,0.55)] transition-all">
                Get Free Quote <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-2 border-foreground/80 bg-white text-foreground hover:bg-foreground hover:text-white text-lg font-semibold">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-foreground/60 text-[11px] uppercase tracking-[0.35em] flex items-center gap-2"
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}