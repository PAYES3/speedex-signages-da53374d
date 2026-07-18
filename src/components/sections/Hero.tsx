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
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-black">
      <AnimatePresence>
        <motion.video
          key={finalVideo}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: videoReady ? 1 : 0, scale: 1.02 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={finalPoster}
          aria-hidden="true"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={finalVideo} type="video/mp4" />
        </motion.video>
      </AnimatePresence>

      {/* Cinematic dark overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-3xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-white text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
            Premium Signage · United Arab Emirates
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-5xl sm:text-6xl md:text-[4.25rem] lg:text-[4.75rem] font-extrabold text-white leading-[1.05] tracking-[-0.03em]"
          >
            We light up <span className="bg-gradient-to-r from-[color:var(--gold)] via-white to-primary bg-clip-text text-transparent">your brand</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed"
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
                Get Free Quote <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-white/40 bg-white/5 text-white hover:bg-white/15 text-base font-semibold backdrop-blur">
                View Portfolio
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-[11px] uppercase tracking-[0.35em] flex items-center gap-2"
      >
        <span>Scroll</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}