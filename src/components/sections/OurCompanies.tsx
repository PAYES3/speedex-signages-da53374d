import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ArrowRight, Building2, Sparkles, Play, MapPin, Phone, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListSlides } from '@/lib/admin/content.functions';
import { AdaptiveImage, MediaBackdrop } from '@/components/AdaptiveMedia';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { readGlass, glassStyle } from '@/lib/glass';
import { useViewport } from '@/lib/responsive';
import { useLang } from '@/hooks/useLang';

export interface Company {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo_url?: string | null;
  image?: string | null;
  bg_url?: string | null;
  mobile_bg_url?: string | null;
  website_url?: string | null;
  cta_label?: string | null;
}

const SLIDE_MS = 6000;

const FALLBACK_BG = '/images/showcase/signage-1.jpg';

function initials(name: string) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

function isExternal(url?: string | null) {
  return !!url && /^https?:\/\//i.test(url.trim());
}

export type SliderContext = 'home_our_companies' | 'our_groups';

export function OurCompanies({
  context = 'home_our_companies',
  showHeader = true,
  showFooter = true,
}: {
  context?: SliderContext;
  showHeader?: boolean;
  showFooter?: boolean;
}) {
  const fetcher = useServerFn(publicListSlides);
  const { data } = useQuery({
    queryKey: ['slides', context],
    queryFn: () => fetcher({ data: { context } }),
    staleTime: 60_000,
  });

  const companies: Company[] = useMemo(() => {
    const rows = (data ?? []) as any[];
    return rows.map((r, i) => {
      const c = r.companies ?? {};
      return {
        id: r.id ?? String(i),
        name: r.title?.trim() || c.name || '',
        slug: c.slug ?? '',
        tagline: c.tagline ?? '',
        description: r.description?.trim() || c.description || '',
        logo_url: c.logo_url ?? null,
        image: c.hero_image ?? null,
        bg_url: r.image_url ?? c.hero_image ?? null,
        mobile_bg_url: r.mobile_image_url ?? null,
        website_url: c.website_url ?? null,
        cta_label: c.cta_label ?? null,
      };
    });
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [logoFailed, setLogoFailed] = useState<Record<string, boolean>>({});
  const glass = readGlass(useSiteSettings());
  const [paused, setPaused] = useState(false);
  const vp = useViewport();
  const { T } = useLang();

  useEffect(() => { setCurrentIndex(0); }, [companies.length]);

  const goTo = useCallback((i: number) => setCurrentIndex(((i % companies.length) + companies.length) % companies.length), [companies.length]);
  const nextSlide = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const prevSlide = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Single timer, restarted on every index change (manual or automatic).
  useEffect(() => {
    if (companies.length < 2 || paused) return;
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length);
    }, SLIDE_MS);
    return () => clearTimeout(timer);
  }, [currentIndex, companies.length, paused]);

  // Pause autoplay while the tab is hidden.
  useEffect(() => {
    const onVis = () => setPaused(document.visibilityState === 'hidden');
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  // Touch swipe (horizontal only, so vertical scrolling is untouched).
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) nextSlide(); else prevSlide();
  };

  const currentCompany = companies[Math.min(currentIndex, companies.length - 1)];
  if (!currentCompany) return null;

  const isPhone = vp.device === 'mobile';
  const smallScreen = vp.orientation === 'portrait' || vp.short;
  const background =
    (smallScreen ? currentCompany.mobile_bg_url : null) ||
    currentCompany.bg_url || currentCompany.image || FALLBACK_BG;
  const external = isExternal(currentCompany.website_url);
  const exploreHref = external ? currentCompany.website_url! : `/companies/${currentCompany.slug}`;

  // Apple-style glass controls
  const arrowClass =
    'grid place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-xl backdrop-saturate-150 ' +
    'shadow-[0_10px_40px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.35)] ' +
    'transition-all duration-300 hover:bg-white/30 hover:scale-105 active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/40';

  const arrowClassLight =
    'grid place-items-center rounded-full border border-black/10 bg-white/60 text-foreground backdrop-blur-xl backdrop-saturate-150 ' +
    'shadow-[0_10px_30px_-14px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.6)] ' +
    'transition-all duration-300 hover:bg-white/85 active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30';

  const prevLabel = T('companies.prev', 'Previous slide');
  const nextLabel = T('companies.next', 'Next slide');

  return (
    <section id={context === 'our_groups' ? 'our-groups-slider' : 'our-groups'} className="relative overflow-hidden bg-background" style={{ paddingBlock: 'clamp(3rem, 7vw, 6rem)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeader && (
        <div className="mx-auto max-w-3xl text-center" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="h-4 w-4" />
            {T('companies.eyebrow', 'Speedex Group')}
          </div>
          <h2 className="mt-5 sm:mt-6 font-extrabold tracking-tight text-foreground" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}>{T('companies.title', 'Our Companies')}</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)' }}>
            {companies.length} industry-leading entities delivering excellence across signage, automotive, facilities, contracting, trading, and transportation in the UAE.
          </p>
        </div>
        )}

        <div
          className="relative isolate flex flex-col sm:block overflow-hidden rounded-[clamp(1rem,3vw,2rem)] border border-white/25 bg-black shadow-[0_50px_120px_-60px_rgba(0,0,0,0.65)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label={T('companies.title', 'Our Companies')}
        >
          <MediaBackdrop src={background} className="-z-20" />

          {/* Full original composition: 16:9 block on phones, contained full-bleed on larger screens */}
          <div className="relative -z-10 w-full aspect-video sm:absolute sm:inset-0 sm:aspect-auto">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentCompany.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <AdaptiveImage src={background} alt={currentCompany.name} eager={currentIndex === 0} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="relative z-10 flex items-end sm:items-center"
            style={{
              minHeight: isPhone
                ? undefined
                : vp.device === 'tablet'
                  ? 'clamp(400px, 56vw, 560px)'
                  : vp.short
                    ? 'clamp(380px, 68svh, 500px)'
                    : 'clamp(440px, 42vw, 620px)',
            }}
          >
            <div className="w-full max-w-full px-3 pt-3 pb-5 sm:max-w-[66%] sm:ps-20 sm:pe-8 sm:py-8 lg:max-w-[36rem] lg:ps-24 lg:pe-12 lg:py-10">
              <motion.div
                key={currentCompany.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ ...glassStyle(glass, isPhone), padding: isPhone ? '0.9rem 1rem' : 'clamp(1rem, 3vw, 2rem)' }}
              >
                <div className="mb-3 sm:mb-5 lg:mb-6 flex items-center justify-center rounded-xl border border-white/30 bg-white/80 backdrop-blur-md p-2 sm:p-3" style={{ height: 'clamp(2.75rem, 9vw, 5.5rem)' }}>
                  {currentCompany.logo_url && !logoFailed[currentCompany.id] ? (
                    <img
                      src={currentCompany.logo_url}
                      alt={`${currentCompany.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                      onError={() => setLogoFailed((s) => ({ ...s, [currentCompany.id]: true }))}
                    />
                  ) : (
                    <span className="grid h-9 w-9 sm:h-12 sm:w-12 lg:h-16 lg:w-16 place-items-center rounded-xl bg-primary text-sm sm:text-lg lg:text-xl font-extrabold text-primary-foreground">
                      {initials(currentCompany.name)}
                    </span>
                  )}
                </div>

                {currentCompany.tagline && (
                  <div className="mb-2 sm:mb-3 inline-block max-w-full truncate rounded-lg border border-white/25 bg-white/15 px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {currentCompany.tagline}
                  </div>
                )}

                <h3 className="flex items-center gap-2 sm:gap-3 font-extrabold !text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.5)]" style={{ fontSize: 'clamp(1.05rem, 3.6vw, 1.875rem)' }}>
                  <Building2 className="h-4 w-4 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0 text-white/85" />
                  <span className="min-w-0 break-words">{currentCompany.name}</span>
                </h3>

                <p className="mt-2 sm:mt-3 line-clamp-3 sm:line-clamp-4 text-white/80 leading-relaxed" style={{ fontSize: 'clamp(0.8rem, 2.2vw, 1rem)' }}>{currentCompany.description}</p>

                <a
                  href={exploreHref}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  className="mt-4 sm:mt-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/20 px-4 py-2 sm:px-6 sm:py-3 text-[11px] sm:text-sm font-semibold !text-white backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-white/35 hover:scale-[1.03]"
                >
                  {currentCompany.cta_label?.trim() || T('companies.explore', 'Explore Company')}
                  <ArrowRight className="h-4 w-4 rtl-flip" />
                </a>
              </motion.div>
            </div>
          </div>


          {/* Desktop / tablet arrows — always visible, centred on the sides */}
          <button
            type="button"
            onClick={prevSlide}
            title={prevLabel}
            className={`hidden sm:grid absolute left-4 top-1/2 z-30 -translate-y-1/2 h-14 w-14 ${arrowClass}`}
            aria-label={prevLabel}
          >
            <ChevronLeft className="h-7 w-7 rtl-flip" strokeWidth={2.75} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            title={nextLabel}
            className={`hidden sm:grid absolute right-4 top-1/2 z-30 -translate-y-1/2 h-14 w-14 ${arrowClass}`}
            aria-label={nextLabel}
          >
            <ChevronRight className="h-7 w-7 rtl-flip" strokeWidth={2.75} />
          </button>

          <div className="absolute top-3 bottom-auto sm:top-auto sm:bottom-5 left-1/2 z-30 flex max-w-[92%] flex-wrap justify-center -translate-x-1/2 items-center gap-1 rounded-full border border-white/25 bg-white/12 px-2 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]">
            {companies.map((c, index) => (
              <button
                key={c.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Show ${c.name}`}
                aria-current={index === currentIndex}
                className="grid h-7 place-items-center px-1"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${index === currentIndex ? 'h-2 w-8 bg-white' : 'h-2 w-2 bg-white/50 hover:bg-white/80'}`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Mobile control row — the card is full width there, so arrows sit below the slide */}
        <div className="mt-4 flex items-center justify-center gap-4 sm:hidden">
          <button type="button" onClick={prevSlide} aria-label={prevLabel} className={`h-12 w-12 ${arrowClassLight}`}>
            <ChevronLeft className="h-6 w-6 rtl-flip" strokeWidth={2.75} />
          </button>
          <span className="text-sm font-semibold text-muted-foreground tabular-nums">
            {currentIndex + 1} / {companies.length}
          </span>
          <button type="button" onClick={nextSlide} aria-label={nextLabel} className={`h-12 w-12 ${arrowClassLight}`}>
            <ChevronRight className="h-6 w-6 rtl-flip" strokeWidth={2.75} />
          </button>
        </div>


        {showFooter && (
        <div className="mt-16 border-t border-border/60 pt-12">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Play className="h-3.5 w-3.5 fill-current" />
              {T('companies.showcase', 'Corporate Showcase')}
            </div>
            <h3 className="mt-4 text-3xl font-bold text-foreground">{T('companies.group', 'Excellent Group of Companies')}</h3>
          </div>

          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><MapPin className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{T('companies.location', 'Location')}</p>
                  <p className="text-sm font-bold text-foreground">Abu Dhabi, UAE</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{T('companies.contact', 'Contact')}</p>
                  <a href="tel:+971557178432" className="block text-sm font-bold text-foreground hover:text-primary">+971 55 717 8432</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 text-primary"><Globe className="h-5 w-5" /></div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground">{T('companies.website', 'Website')}</p>
                  <a href="https://www.excellentgroup.ae" target="_blank" rel="noreferrer" className="text-sm font-bold text-foreground hover:text-primary">www.excellentgroup.ae</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

export default OurCompanies;
