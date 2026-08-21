import { useEffect, useRef } from 'react';
import { focalFor, useViewport, type FocalMap } from '@/lib/responsive';

type Common = {
  className?: string;
  focal?: FocalMap;
  /** extra style applied to the media element */
  style?: React.CSSProperties;
};

/**
 * Image that keeps its natural aspect ratio (cover, never stretched) while the
 * focal point moves per device so the subject stays visible on phones.
 */
export function AdaptiveImage({
  src,
  alt,
  eager,
  className = '',
  focal,
  style,
}: Common & { src: string; alt: string; eager?: boolean }) {
  const vp = useViewport();
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`w-full h-full object-cover ${className}`}
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
}: Common & { src: string; poster?: string | null; preload?: 'none' | 'metadata' | 'auto' }) {
  const vp = useViewport();
  const ref = useRef<HTMLVideoElement | null>(null);

  // Autoplay is best-effort: browsers reject play() when the element is not yet
  // ready, when the tab is hidden, or before any user gesture. Retry on every
  // signal instead of giving up after the first attempt (which left background
  // videos frozen on the first frame).
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
      className={`w-full h-full object-cover ${className}`}
      style={{ objectPosition: focalFor(vp, focal), ...style }}
    />
  );
}

