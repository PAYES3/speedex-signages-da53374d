import { Reveal } from '@/components/Reveal';
import type { BlockData } from './PageHero';

export function TextImage({ data, defaults }: { data: BlockData; defaults?: BlockData }) {
  const v = (k: string) => (data[k]?.trim() ? data[k] : (defaults?.[k] ?? ''));
  const image = v('image_url');
  const flip = v('image_side') === 'right';

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <Reveal direction="left" className={flip ? 'md:order-2' : undefined}>
          {image && (
            <img
              src={image}
              alt={v('title')}
              loading="lazy"
              className="rounded-2xl shadow-[var(--shadow-elegant)] aspect-[4/3] object-cover w-full"
            />
          )}
        </Reveal>
        <Reveal direction="right" className={flip ? 'md:order-1' : undefined}>
          {v('eyebrow') && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{v('eyebrow')}</p>}
          {v('title') && <h2 className="text-3xl sm:text-4xl font-bold mt-2">{v('title')}</h2>}
          {v('body') && <p className="mt-4 text-muted-foreground whitespace-pre-line">{v('body')}</p>}
          {v('body_2') && <p className="mt-3 text-muted-foreground whitespace-pre-line">{v('body_2')}</p>}
        </Reveal>
      </div>
    </section>
  );
}