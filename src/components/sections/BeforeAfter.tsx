import { useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';

const DEFAULT_BEFORE = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80';
const DEFAULT_AFTER = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80';

export function BeforeAfter({ data }: { data?: Record<string, string> }) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const pair = {
    before: data?.before_image?.trim() || DEFAULT_BEFORE,
    after: data?.after_image?.trim() || DEFAULT_AFTER,
    label: data?.image_label?.trim() || 'Retail storefront transformation',
  };

  const onMove = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <section className="bg-background" style={{ paddingBlock: 'clamp(3rem, 7vw, 8rem)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <p className="text-primary font-semibold tracking-[0.3em] uppercase" style={{ fontSize: 'clamp(0.65rem, 1.4vw, 0.875rem)' }}>{data?.eyebrow?.trim() || 'Before / After'}</p>
            <h2 className="mt-3 font-extrabold tracking-tight" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.75rem)', lineHeight: 1.1 }}>{data?.title?.trim() || 'See the transformation'}</h2>
            <p className="mt-4 text-muted-foreground" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.125rem)' }}>{data?.subtitle?.trim() || 'Drag the slider to reveal how Speedex reshapes a facade.'}</p>
          </div>
        </Reveal>
        <Reveal>
          <div
            ref={ref}
            aria-label={pair.label}
            className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden select-none glass-panel"
            onMouseMove={(e) => e.buttons === 1 && onMove(e.clientX)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            onClick={(e) => onMove(e.clientX)}
          >
            <img src={pair.after} alt={`After — ${pair.label}`} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src={pair.before}
                alt={`Before — ${pair.label}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full object-cover"
                style={{ width: `${(100 / pos) * 100}%`, maxWidth: 'none' }}
              />
            </div>
            <div className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_20px_rgba(80,160,255,0.9)]" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold shadow-lg cursor-ew-resize">
                ⇔
              </div>
            </div>
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-black/60 text-white">Before</div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-widest bg-primary text-primary-foreground">After</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}