import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { COMPANY } from '@/lib/site-data';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={COMPANY.heroPoster}
      >
        <source src={COMPANY.heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/90 text-xs sm:text-sm mb-6"
        >
          {t('hero.tag')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white glow-text leading-[1.05]"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto"
        >
          {t('hero.sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/contact">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)] hover:scale-105 transition-transform">
              {t('hero.cta1')} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/explore">
            <Button size="lg" variant="outline" className="border-white/40 bg-white/5 text-white hover:bg-white/15 backdrop-blur">
              <Play className="mr-2 w-4 h-4" /> {t('hero.cta2')}
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 text-xs flex flex-col items-center gap-1"
      >
        <span>Scroll</span>
        <div className="w-px h-8 bg-white/40 animate-pulse" />
      </motion.div>
    </section>
  );
}