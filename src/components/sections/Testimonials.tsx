import { Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/site-data';
import { Reveal } from '@/components/Reveal';

export function Testimonials() {
  return (
    <section className="py-24 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase">Testimonials</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">What our clients say</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} direction="up" delay={i * 0.08}>
              <div className="bg-white border border-border p-7 rounded-2xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-5 h-5 fill-primary text-primary" />)}
                </div>
                <p className="text-base text-foreground/85 flex-1 leading-relaxed">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20" loading="lazy" />
                  <div>
                    <p className="font-semibold text-base">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}