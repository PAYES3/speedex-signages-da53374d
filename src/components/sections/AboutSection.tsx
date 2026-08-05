import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { RichText } from '@/components/RichText';
import { ArrowRight } from 'lucide-react';

export function AboutSection({ data = {} }: { data?: Record<string, string> }) {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            {data.eyebrow && <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em]">{data.eyebrow}</p>}
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3 tracking-tight leading-[1.06]">
              {data.title || 'Built in-house, delivered across the UAE'}
            </h2>
            {data.subtitle && <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{data.subtitle}</p>}
            <RichText html={data.body} className="mt-5 text-muted-foreground" />
            {data.cta_label && (
              <Link to={(data.cta_href as any) || '/about'}>
                <Button size="lg" className="mt-8 rounded-full px-7">
                  {data.cta_label} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>
        </Reveal>
        {data.image_url && (
          <Reveal direction="up">
            <img src={data.image_url} alt={data.title || 'About Speedex'} loading="lazy"
              className="rounded-3xl w-full object-cover aspect-[4/3] shadow-[var(--shadow-card)]" />
          </Reveal>
        )}
      </div>
    </section>
  );
}
