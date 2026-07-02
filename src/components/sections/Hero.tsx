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
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#0a1628]">
      <AnimatePresence>
        <motion.video
          key={finalVideo}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: videoReady ? 0.55 : 0, scale: 1.03 }}
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

      {/* Navy overlays — reference-style left-to-right + bottom fades */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628] via-[#0a1628]/85 to-[#0a1628]/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/70 via-transparent to-[#0a1628]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.12),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Premium Signage Manufacturer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-bold text-white leading-[0.95] tracking-[-0.03em]"
            style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
          >
            We light up{' '}
            <span className="block text-primary">your brand.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed"
          >
            From dazzling LED facades to towering billboards — {COMPANY.name} designs,
            fabricates and installs signage that gets your brand noticed across the UAE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <Link to="/contact">
              <Button size="lg" className="h-12 px-6 rounded-full bg-primary text-primary-foreground font-semibold shadow-[0_10px_40px_-10px_rgba(34,211,238,0.8)] hover:shadow-[0_15px_50px_-10px_rgba(34,211,238,1)] hover:scale-[1.03] transition-all">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="h-12 px-6 rounded-full border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:text-primary font-semibold">
                Explore Our Work
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/50 text-[10px] uppercase tracking-[0.35em] flex items-center gap-2"
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}