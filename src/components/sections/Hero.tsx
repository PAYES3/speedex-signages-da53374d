import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowRight, PlayCircle } from 'lucide-react';
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
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
};

export function Hero({
  videoUrl,
  posterUrl,
  eyebrow,
  title,
  subtitle,
  primaryLabel,
  primaryHref,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  const randomClip = useMemo(
    () => HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)],
    [],
  );
  const src = videoUrl && videoUrl.trim() ? videoUrl : randomClip;

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, [src]);

  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-black flex items-center">
      {/* Background video — normal original clarity */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          key={src}
          src={src}
          poster={posterUrl || undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${ready ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      {/* Optional: Mild dark overlay if text visibility needs a boost */}
      <div className="absolute inset-0 -z-10 bg-black/30 pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur px-4 py-2 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary border border-primary/15 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {eyebrow || 'Premium signage · United Arab Emirates'}
          </span>

          <h1 className="mt-6 font-extrabold text-foreground leading-[1.05] tracking-tight">
            {title || 'Transforming ideas into powerful visual identities'}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle ||
              'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.'}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to={(primaryHref as string) || '/contact'}>
              <Button
                size="lg"
                className="h-14 px-8 rounded-full text-base font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform"
              >
                {primaryLabel || 'Get a free quote'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Link to="/companies">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full text-base font-semibold border-2 border-foreground/15 bg-white/85 backdrop-blur hover:bg-white"
              >
                Explore our companies
              </Button>
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-base font-semibold text-foreground/80 hover:text-primary transition-colors"
            >
              <PlayCircle className="w-5 h-5" /> View our projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
