import { Reveal } from '@/components/Reveal';
import { COMPANIES } from '@/lib/site-data';
import { ExternalLink } from 'lucide-react';

export function OurCompanies() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Our Group</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">Our Companies</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Part of a trusted group of UAE businesses delivering quality across signage, broadcasting, trading and automotive services.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COMPANIES.map((c, i) => {
            const Inner = (
              <div className="group bg-card border border-border rounded-2xl p-6 h-full hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 hover:border-primary transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground grid place-items-center font-bold text-lg shadow-[var(--shadow-glow)]">
                  {c.initials}
                </div>
                <h3 className="mt-4 font-semibold text-lg flex items-center gap-2">
                  {c.name}
                  {!c.internal && <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                {!c.internal && (
                  <p className="mt-3 text-xs text-primary font-medium break-all">{c.url.replace('https://', '')}</p>
                )}
              </div>
            );
            return (
              <Reveal key={c.name} direction="up" delay={i * 0.06}>
                {c.internal ? (
                  <a href={c.url}>{Inner}</a>
                ) : (
                  <a href={c.url} target="_blank" rel="noopener noreferrer">{Inner}</a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}