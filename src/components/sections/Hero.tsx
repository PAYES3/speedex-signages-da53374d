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
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-transparent flex items-center">
      {/* Background Video — Full natural quality without white filters */}
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
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
            ready ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Badge using glass utility & primary OKLCH token */}
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-primary border border-primary/20 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {eyebrow || 'Premium signage · United Arab Emirates'}
          </span>

          {/* Heading using theme foreground charcoal */}
          <h1 className="mt-6 font-extrabold text-foreground leading-[1.05] tracking-tight text-4xl sm:text-6xl">
            {title || 'Transforming ideas into powerful visual identities'}
          </h1>

          {/* Subtitle using theme muted-foreground */}
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-medium">
            {subtitle ||
              'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.'}
          </p>

          {/* Action Buttons using theme tokens & hover-glow utility */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to={(primaryHref as string) || '/contact'}>
              <Button
                size="lg"
                className="h-14 px-8 rounded-full text-base font-semibold bg-primary text-primary-foreground hover-glow hover:bg-primary/90 transition-all"
              >
                {primaryLabel || 'Get a free quote'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <Link to="/companies">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 rounded-full text-base font-semibold border-2 border-border glass hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Explore our companies
              </Button>
            </Link>

            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-primary/80 transition-colors"
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
