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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
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
