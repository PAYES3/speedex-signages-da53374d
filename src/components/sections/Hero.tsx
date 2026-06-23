import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, FolderKanban, Phone } from 'lucide-react';
import { COMPANY } from '@/lib/site-data';
import { Button } from '@/components/ui/button';
import logo from '@/assets/speedex-logo.png.asset.json';

type HeroProps = {
  videoUrl?: string;
  posterUrl?: string;
};

export function Hero({ videoUrl, posterUrl }: HeroProps = {}) {
  const finalVideo = videoUrl || COMPANY.heroVideo;
  const finalPoster = posterUrl || COMPANY.heroImage;

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={finalPoster}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src={finalVideo} type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(14,124,123,0.18),transparent_50%,rgba(14,124,123,0.18))] mix-blend-screen" />

      {/* Top + bottom letterboxing for cinema feel */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-6xl mx-auto pt-24 pb-16">
        {/* Glass logo plate */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-4 shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <img src={logo.url} alt="Speedex Group logo" className="h-14 sm:h-16 w-auto" width={220} height={70} />
          </div>
        </motion.div>

        {/* Tag chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs sm:text-sm font-medium tracking-wide uppercase"
        >
          <span className="w-2 h-2 rounded-full bg-primary-glow animate-pulse" />
          Speedex Group · United Arab Emirates
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.02] tracking-tight"
          style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
        >
          Transforming Ideas Into{' '}
          <span className="bg-gradient-to-r from-primary-glow via-white to-primary-glow bg-clip-text text-transparent">
            Powerful Visual Identities
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-7 text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed"
        >
          Professional Signage, Transport, Contracting, Trading & Automotive Solutions Across UAE
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <Link to="/companies">
            <Button size="lg" className="h-12 px-6 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[0_10px_40px_-10px_rgba(14,124,123,0.8)] hover:shadow-[0_15px_50px_-10px_rgba(14,124,123,1)] hover:scale-[1.03] transition-all">
              <Building2 className="w-4 h-4" /> Explore Our Companies
            </Button>
          </Link>
          <Link to="/portfolio">
            <Button size="lg" variant="outline" className="h-12 px-6 border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md">
              <FolderKanban className="w-4 h-4" /> View Our Projects
            </Button>
          </Link>
          <Link to="/contact">
            <Button size="lg" variant="outline" className="h-12 px-6 border-white/30 bg-transparent text-white hover:bg-white/10 backdrop-blur-md">
              <Phone className="w-4 h-4" /> Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto"
        >
          {[
            { v: '18+', l: 'Years Experience' },
            { v: '5', l: 'Group Companies' },
            { v: '2,400+', l: 'Projects Delivered' },
            { v: '7', l: 'Emirates Served' },
          ].map((s) => (
            <div key={s.l} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-center">
              <p className="text-xl sm:text-2xl font-bold text-white">{s.v}</p>
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-white/60 mt-1">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-white/60 text-[10px] uppercase tracking-[0.3em] flex flex-col items-center gap-2"
      >
        <span>Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}