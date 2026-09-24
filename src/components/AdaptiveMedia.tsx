import { useEffect, useRef } from 'react';
import { focalFor, useViewport, type FocalMap } from '@/lib/responsive';

type Common = {
  className?: string;
  focal?: FocalMap;
  /** extra style applied to the media element */
  style?: React.CSSProperties;
  /**
   * contain (default) = full original composition, never zoomed or cropped.
   * cover = fill the box (crops). Only use for decorative backdrops.
   */
  fit?: 'contain' | 'cover';
};

/**
 * Soft, blurred copy of an image used to fill any space around a
 * `contain`-fitted image so there are no empty bars. Purely decorative.
 */
export function MediaBackdrop({ src, className = '' }: { src?: string | null; className?: string }) {
  if (!src) return <div aria-hidden className={`absolute inset-0 bg-neutral-900 ${className}`} />;
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden bg-neutral-900 ${className}`}>
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className="h-full w-full scale-110 object-cover opacity-70 blur-2xl"
      />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}

/**
 * Image that keeps its original aspect ratio and composition. By default it is
 * fitted with `contain` (scaled down proportionally, never zoomed); the focal
 * point only matters when `fit="cover"`.
 */
export function AdaptiveImage({
  src,
  alt,
  eager,
  className = '',
  focal,
  style,
  fit = 'contain',
}: Common & { src: string; alt: string; eager?: boolean }) {
  const vp = useViewport();
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      // @ts-expect-error fetchpriority is valid HTML, not yet in React types
      fetchpriority={eager ? 'high' : 'auto'}
      decoding="async"
      sizes="100vw"
      className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
      style={{ objectPosition: focalFor(vp, focal), ...style }}
    />
  );
}

/** Background video with the same device-aware framing. Never shows controls. */
export function AdaptiveVideo({
  src,
  poster,
  className = '',
  focal,
  style,
  preload = 'metadata',
  fit = 'cover',
}: Common & { src: string; poster?: string | null; preload?: 'none' | 'metadata' | 'auto' }) {
  const vp = useViewport();
  const ref = useRef<HTMLVideoElement | null>(null);

  // Autoplay is best-effort: browsers reject play() when the element is not yet
  // ready, when the tab is hidden, or before any user gesture. Retry on every
  // signal instead of giving up after the first attempt.
  useEffect(() => {
    const el = ref.current;
    if (!el || !src) return;

    let cancelled = false;
    const tryPlay = () => {
      if (cancelled || !el.isConnected) return;
      el.muted = true;
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    el.addEventListener('loadeddata', tryPlay);
    el.addEventListener('canplay', tryPlay);
    document.addEventListener('visibilitychange', tryPlay);
    window.addEventListener('pointerdown', tryPlay, { once: true });
    window.addEventListener('touchstart', tryPlay, { once: true });

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              for (const e of entries) if (e.isIntersecting) tryPlay();
            },
            { threshold: 0.05 },
          )
        : null;
    io?.observe(el);

    tryPlay();
    const t = setTimeout(tryPlay, 600);

    return () => {
      cancelled = true;
      clearTimeout(t);
      io?.disconnect();
      el.removeEventListener('loadeddata', tryPlay);
      el.removeEventListener('canplay', tryPlay);
      document.removeEventListener('visibilitychange', tryPlay);
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('touchstart', tryPlay);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      key={src}
      src={src}
      poster={poster || undefined}
      autoPlay
      loop
      muted
      playsInline
      preload={preload}
      controls={false}
      disablePictureInPicture
      controlsList="nodownload noplaybackrate noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
      style={{ objectPosition: focalFor(vp, focal), ...style }}
    />
  );
}
