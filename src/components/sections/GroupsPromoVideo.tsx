import { useEffect, useRef, useState } from 'react';
import hero3 from '@/assets/hero/hero-3.mp4.asset.json';

/** Full-width promotional video shown below the group company list. */
export function GroupsPromoVideo({ url, poster }: { url?: string; poster?: string }) {
  const src = url && url.trim() ? url : hero3.url;
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          el.muted = true;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative w-full bg-black">
      <video
        ref={ref}
        src={visible ? src : undefined}
        data-src={src}
        poster={poster || undefined}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-[46vh] sm:h-[62vh] object-cover"
      />
    </section>
  );
}
