import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, PlayCircle, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListHeroSlides } from '@/lib/admin/cms.functions';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { AdaptiveImage, AdaptiveVideo, MediaBackdrop } from '@/components/AdaptiveMedia';
import { useViewport } from '@/lib/responsive';
import { useLang } from '@/hooks/useLang';
import { HERO_GLASS_DEFAULTS, glassStyle, readGlass } from '@/lib/glass';
import hero1 from '@/assets/hero/hero-1.mp4.asset.json';
import hero2 from '@/assets/hero/hero-2.mp4.asset.json';
import hero3 from '@/assets/hero/hero-3.mp4.asset.json';
import hero4 from '@/assets/hero/hero-4.mp4.asset.json';
import hero5 from '@/assets/hero/hero-5.mp4.asset.json';

const BUNDLED = [hero1.url, hero2.url, hero3.url, hero4.url, hero5.url];
const AUTOPLAY_MS = 9000;
const isVideoUrl = (u: string) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u);

export type Slide = {
  id: string;
  media_url: string;
  media_type: string;
  poster_url?: string | null;
  mobile_media_url?: string | null;
  focal_desktop?: string | null;
  focal_mobile?: string | null;
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
  const { data } = useQuery({ queryKey: ['hero-slides'], queryFn: () => fetcher(), staleTime: 0, refetchOnWindowFocus: true });
  const settings = useSiteSettings();
  const { T } = useLang();
  const reduceMotion = useReducedMotion();

  const randomClip = useMemo(() => BUNDLED[Math.floor(Math.random() * BUNDLED.length)], []);

  const slides: Slide[] = useMemo(() => {
    const rows = (data ?? []) as Slide[];
    const usable = rows.filter((r) => r.media_url?.trim() || r.mobile_media_url?.trim());
    if (usable.length) return usable;
    const cmsVideo = settings.hero_video_url?.trim();
    return [{
      id: 'default',
      media_url: cmsVideo || randomClip,
      media_type: 'video',
      poster_url: settings.hero_poster_url?.trim() || null,
      title: T('hero.title', 'Transforming ideas into powerful visual identities'),
      subtitle: T('hero.badge', 'Premium signage · United Arab Emirates'),
      description: T('hero.subtitle', 'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.'),
      cta_primary_label: T('hero.quote', 'Get a free quote'),
      cta_primary_href: '/contact',
      cta_secondary_label: T('hero.companies', 'Explore our companies'),
      cta_secondary_href: '/companies',
    }];
  }, [data, randomClip, settings.hero_video_url, settings.hero_poster_url, T]);

  const [index, setIndex] = useState(0);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const current = slides[Math.min(index, slides.length - 1)];
  const vp = useViewport();
  const isPhone = vp.device === 'mobile' || (vp.orientation === 'portrait' && vp.device !== 'desktop');
  const multi = slides.length > 1;

  useEffect(() => { setIndex(0); }, [slides.length]);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!multi || hoverPaused || userPaused || reduceMotion) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [multi, hoverPaused, userPaused, reduceMotion, go, index]);

  // Touch swipe
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; setHoverPaused(true); };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current; touchX.current = null; setHoverPaused(false);
    if (start == null || !multi) return;
    const dx = e.changedTouches[0].clientX - start;
    if (Math.abs(dx) > 45) {
      const rtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
      go((dx < 0) !== rtl ? 1 : -1);
    }
  };

  const heroGlass = readGlass(settings, 'hero_glass', HERO_GLASS_DEFAULTS);
  if (!current) return null;

  const phoneSrc = current.mobile_media_url?.trim();
  const src = (isPhone && phoneSrc) || current.media_url || phoneSrc || '';
  const asVideo = src === current.media_url ? current.media_type !== 'image' : isVideoUrl(src);
  const focal = {
    mobile: current.focal_mobile || '58% 40%',
    portrait: current.focal_mobile || '58% 40%',
    tablet: current.focal_desktop || 'center',
    desktop: current.focal_desktop || 'center',
  };
  const mediaFailed = failed[current.id];

  // Blurred fill behind the contained media (never a zoomed crop of it)
  const backdropSrc = current.poster_url || (!asVideo ? src : null);

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-neutral-950 flex flex-col pt-[4.5rem] sm:pt-0 sm:flex-row sm:items-center"
      style={isPhone ? undefined : {
        // Height follows a ~16:8 landscape ratio so images keep their composition.
        minHeight: vp.device === 'tablet'
          ? 'clamp(440px, 62vw, 640px)'
          : vp.short
            ? 'clamp(460px, 92svh, 640px)'
            : 'clamp(520px, 50vw, min(92svh, 960px))',
      }}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setHoverPaused(true)}
      onBlurCapture={() => setHoverPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={(e) => {
        if (!multi) return;
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
      aria-roledescription={multi ? 'carousel' : undefined}
      aria-label={T('hero.label', 'Featured')}
    >
      <MediaBackdrop src={backdropSrc} className="-z-20" />

      {/* Media: full width 16:9 block on phones, full-bleed behind the text on larger screens */}
      <div className="relative -z-10 w-full aspect-video sm:absolute sm:inset-0 sm:aspect-auto">
        <AnimatePresence initial={false}>
          <motion.div
            key={current.id + src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
          >
            {mediaFailed ? (
              current.poster_url
                ? <AdaptiveImage src={current.poster_url} alt="" eager focal={focal} />
                : <div className="h-full w-full bg-gradient-to-br from-neutral-800 to-neutral-950" />
            ) : asVideo ? (
              <div className="h-full w-full" onErrorCapture={() => setFailed((s) => ({ ...s, [current.id]: true }))}>
                <AdaptiveVideo src={src} poster={current.poster_url || undefined} preload={index === 0 ? 'auto' : 'metadata'} focal={focal} fit={isPhone ? 'contain' : 'cover'} />
              </div>
            ) : (
              <div className="h-full w-full" onErrorCapture={() => setFailed((s) => ({ ...s, [current.id]: true }))}>
                <AdaptiveImage src={src} alt={current.title} eager={index === 0} focal={focal} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Subtle readability gradient (admin-controlled), only on the text side */}
      {!isPhone && heroGlass.overlay > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] rtl:scale-x-[-1]" style={{ background: `linear-gradient(90deg, rgb(0 0 0 / ${heroGlass.overlay / 100}) 0%, rgb(0 0 0 / ${heroGlass.overlay / 250}) 45%, transparent 75%)` }} />
      )}

      <div
        className="relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8"
        style={{
          paddingTop: isPhone ? '0.75rem' : 'clamp(6rem, 13vh, 8.5rem)',
          paddingBottom: multi ? (isPhone ? '4.5rem' : 'clamp(5rem, 11vh, 7rem)') : 'clamp(1rem, 5vh, 4rem)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            // Main hero: premium white/light glass panel
            className="relative w-full overflow-hidden sm:max-w-[min(var(--hero-card-w),60%)] lg:max-w-[var(--hero-card-w)]"
            style={{
              ...glassStyle(heroGlass, isPhone),
              ['--hero-card-w' as string]: `${heroGlass.width}rem`,
              padding: isPhone ? '0.9rem 1rem 1.1rem' : `clamp(1rem, 2.4vw, ${heroGlass.padding}px)`,
            }}
          >
            <span aria-hidden className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-80" />

            {current.subtitle && (
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[var(--hero-card-border)] bg-[var(--hero-card-chip)] px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[var(--hero-card-ink)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" />
                <span className="truncate">{current.subtitle}</span>
              </span>
            )}

            <h1
              className="mt-3 sm:mt-5 font-extrabold text-[var(--hero-card-ink)] leading-[1.06] tracking-tight [text-wrap:balance]"
              style={{ fontSize: isPhone ? 'clamp(1.4rem, 6.4vw, 2.1rem)' : 'clamp(1.9rem, 4vw, 3.6rem)' }}
            >
              {current.title}
            </h1>

            {current.description && (
              <p className="mt-2.5 sm:mt-5 text-[var(--hero-card-muted)] leading-relaxed line-clamp-3 sm:line-clamp-none" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
                {current.description}
              </p>
            )}

            <div className="mt-4 sm:mt-7 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
              {current.cta_primary_label && (
                <Button asChild size="lg" className="h-11 sm:h-13 px-6 sm:px-7 rounded-full text-sm sm:text-base font-semibold shadow-[var(--shadow-glow)] transition-transform hover:-translate-y-0.5">
                  <Link to={current.cta_primary_href || '/contact'}>
                    {current.cta_primary_label} <ArrowRight className="ms-2 h-5 w-5 rtl-flip" />
                  </Link>
                </Button>
              )}
              {current.cta_secondary_label && (
                <Button asChild size="lg" variant="outline" className="h-11 sm:h-13 px-6 sm:px-7 rounded-full text-sm sm:text-base font-semibold border border-[var(--hero-card-border)] bg-[var(--hero-card-chip)] text-[var(--hero-card-ink)] hover:bg-[var(--hero-card-border)] hover:text-[var(--hero-card-ink)]">
                  <Link to={current.cta_secondary_href || '/companies'}>{current.cta_secondary_label}</Link>
                </Button>
              )}
              <Link to="/portfolio" className="inline-flex items-center gap-2 rounded-full px-1 py-2 text-sm sm:text-base font-semibold text-[var(--hero-card-ink)] hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <PlayCircle className="h-5 w-5" /> {T('hero.projects', 'View our projects')}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {multi && (
        <div className="absolute inset-x-0 bottom-[clamp(1rem,3vh,1.75rem)] z-20 flex justify-center px-3">
          <div className="flex max-w-full items-center bg-black/70 border border-white/15 shadow-lg gap-1 sm:gap-2 rounded-full p-1.5">
            <button type="button" aria-label={T('hero.prev', 'Previous slide')} onClick={() => go(-1)} className="hero-ctrl h-10 w-10 sm:h-11 sm:w-11">
              <ChevronLeft className="h-5 w-5 rtl-flip" />
            </button>
            <div className="flex items-center gap-1 overflow-x-auto px-1">
              {slides.map((s, i) => (
                <button key={s.id} type="button" aria-label={`${T('hero.goto', 'Go to slide')} ${i + 1}`} aria-current={i === index}
                  onClick={() => setIndex(i)} className="grid h-8 min-w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70">
                  <span className={`block h-2 rounded-full transition-all duration-300 ${i === index ? 'w-7 bg-white' : 'w-2 bg-white/50'}`} />
                </button>
              ))}
            </div>
            <button type="button" aria-label={userPaused ? T('hero.play', 'Play slideshow') : T('hero.pause', 'Pause slideshow')}
              onClick={() => setUserPaused((p) => !p)} className="hero-ctrl h-10 w-10 sm:h-11 sm:w-11">
              {userPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            </button>
            <button type="button" aria-label={T('hero.next', 'Next slide')} onClick={() => go(1)} className="hero-ctrl h-10 w-10 sm:h-11 sm:w-11">
              <ChevronRight className="h-5 w-5 rtl-flip" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
