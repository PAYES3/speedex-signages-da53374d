import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListHeroSlides } from '@/lib/admin/cms.functions';
import hero1 from '@/assets/hero/hero-1.mp4.asset.json';
import hero2 from '@/assets/hero/hero-2.mp4.asset.json';
import hero3 from '@/assets/hero/hero-3.mp4.asset.json';
import hero4 from '@/assets/hero/hero-4.mp4.asset.json';
import hero5 from '@/assets/hero/hero-5.mp4.asset.json';

const BUNDLED = [hero1.url, hero2.url, hero3.url, hero4.url, hero5.url];

export type Slide = {
  id: string;
  media_url: string;
  media_type: string;
  poster_url?: string | null;
  title: string;
  subtitle: string;
  description: string;
  cta_primary_label: string;
  cta_primary_href: string;
  cta_secondary_label: string;
  cta_secondary_href: string;
};

export function HeroSlider() {
  const fetcher = useServerFn(publicListHeroSlides);
  const { data } = useQuery({ queryKey: ['hero-slides'], queryFn: () => fetcher(), staleTime: 30_000 });

  const randomClip = useMemo(() => BUNDLED[Math.floor(Math.random() * BUNDLED.length)], []);

  const slides: Slide[] = useMemo(() => {
    const rows = (data ?? []) as Slide[];
    if (rows.length) return rows;
    return [{
      id: 'default',
      media_url: randomClip,
      media_type: 'video',
      poster_url: null,
      title: 'Transforming ideas into powerful visual identities',
      subtitle: 'Premium signage · United Arab Emirates',
      description: 'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.',
      cta_primary_label: 'Get a free quote',
      cta_primary_href: '/contact',
      cta_secondary_label: 'Explore our companies',
      cta_secondary_href: '/companies',
    }];
  }, [data, randomClip]);

  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const current = slides[Math.min(index, slides.length - 1)];

  useEffect(() => { setIndex(0); }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 9000);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  }, [current?.media_url]);

  if (!current) return null;

  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden bg-black flex items-center">
      <div className="absolute inset-0 -z-10">
        {current.media_type === 'image' ? (
          <img src={current.media_url} alt={current.title} className="w-full h-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            key={current.media_url}
            src={current.media_url}
            poster={current.poster_url || undefined}
            autoPlay loop muted playsInline preload="metadata"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Single soft scrim for text legibility only — the video stays fully visible */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/35 to-transparent pointer-events-none" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            {current.subtitle && (
              <span className="inline-flex items-center gap-2 rounded-full bg-black/40 backdrop-blur px-4 py-2 text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-white border border-white/25 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {current.subtitle}
              </span>
            )}

            <h1 className="mt-6 font-extrabold text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">{current.title}</h1>

            {current.description && (
              <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl leading-relaxed">{current.description}</p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-4">
              {current.cta_primary_label && (
                <Link to={current.cta_primary_href || '/contact'}>
                  <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold shadow-[var(--shadow-glow)] hover:-translate-y-0.5 transition-transform">
                    {current.cta_primary_label} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              {current.cta_secondary_label && (
                <Link to={current.cta_secondary_href || '/companies'}>
                  <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-base font-semibold border-2 border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:text-white">
                    {current.cta_secondary_label}
                  </Button>
                </Link>
              )}
              <Link to="/portfolio" className="inline-flex items-center gap-2 text-base font-semibold text-white/85 hover:text-white transition-colors">
                <PlayCircle className="w-5 h-5" /> View our projects
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {slides.length > 1 && (
          <div className="mt-12 flex items-center gap-3">
            <button aria-label="Previous slide" onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
              className="w-11 h-11 rounded-full bg-white/15 text-white border border-white/30 grid place-items-center hover:bg-white/25">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button aria-label="Next slide" onClick={() => setIndex((i) => (i + 1) % slides.length)}
              className="w-11 h-11 rounded-full bg-white/15 text-white border border-white/30 grid place-items-center hover:bg-white/25">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 ml-2">
              {slides.map((s, i) => (
                <button key={s.id} aria-label={`Go to slide ${i + 1}`} onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-primary' : 'w-3 bg-white/45'}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 
