import { Reveal } from '@/components/Reveal';

export type BlockData = Record<string, string>;

export function PageHero({ data, defaults }: { data: BlockData; defaults?: BlockData }) {
  const v = (k: string) => (data[k]?.trim() ? data[k] : (defaults?.[k] ?? ''));
  const eyebrow = v('eyebrow');
  const title = v('title');
  const subtitle = v('subtitle');
  const image = v('image_url');

  return (
    <section className="pt-32 pb-12 bg-gradient-to-br from-secondary/40 to-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <Reveal>
          {eyebrow && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{eyebrow}</p>}
          {title && <h1 className="text-4xl sm:text-6xl font-bold mt-3">{title}</h1>}
          {subtitle && <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          {image && (
            <img src={image} alt={title} loading="lazy" className="mt-10 rounded-2xl w-full object-cover aspect-[16/7]" />
          )}
        </Reveal>
      </div>
    </section>
  );
}