import { useRef, useState } from 'react';
import { Reveal } from '@/components/Reveal';

const PAIRS = [
  {
    before: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80',
    after: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    label: 'Retail storefront transformation',
  },
];

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const pair = PAIRS[0];

  const onMove = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase">Before / After</p>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">See the transformation</h2>
            <p className="mt-5 text-lg text-muted-foreground">Drag the slider to reveal how Speedex reshapes a facade.</p>
          </div>
        </Reveal>
        <Reveal>
          <div
            ref={ref}
            className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden select-none glass-panel"
            onMouseMove={(e) => e.buttons === 1 && onMove(e.clientX)}
            onTouchMove={(e) => onMove(e.touches[0].clientX)}
            onClick={(e) => onMove(e.clientX)}
          >
            <img src={pair.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
              <img
                src={pair.before}
                alt="Before"
                className="absolute inset-0 h-full object-cover"
                style={{ width: `${(100 / pos) * 100}%`, maxWidth: 'none' }}
              />
            </div>
            <div className="absolute top-0 bottom-0 w-0.5 bg-primary shadow-[0_0_20px_rgba(80,160,255,0.9)]" style={{ left: `${pos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-primary-foreground grid place-items-center font-bold shadow-lg cursor-ew-resize">
                ⇔
              </div>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-black/60 text-white">Before</div>
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-primary text-primary-foreground">After</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}