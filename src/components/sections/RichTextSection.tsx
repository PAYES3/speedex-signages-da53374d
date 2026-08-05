import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';

export function RichTextSection({ data = {} }: { data?: Record<string, string> }) {
  if (!data.title && !data.body) return null;
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          {data.title && <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">{data.title}</h2>}
          <RichText html={data.body} />
        </Reveal>
      </div>
    </section>
  );
}
