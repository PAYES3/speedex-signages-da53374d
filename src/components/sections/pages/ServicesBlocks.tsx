import { Link } from '@tanstack/react-router';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';
import { PROCESS, SERVICES, SERVICE_GROUPS, SERVICE_WORKFLOW } from '@/lib/site-data';
import type { BlockData } from '../PageHero';

export const SERVICES_PROCESS_DEFAULTS: BlockData = { title: 'How we work' };
export const SERVICES_WORKFLOW_DEFAULTS: BlockData = {
  eyebrow: 'Our Services',
  title: 'What we offer end-to-end',
};
export const SERVICES_CATALOG_DEFAULTS: BlockData = {
  eyebrow: 'What we deliver',
  title: 'Signage solutions for every brand',
};
export const SERVICE_GROUPS_DEFAULTS: BlockData = {
  eyebrow: 'Types of Signage',
  title: 'Complete range of signage we deliver',
  subtitle:
    'From exterior 3D illuminated signage to interior wayfinding, compliance signs and wide-format printing — every category produced in-house at our UAE facility.',
};

const pick = (data: BlockData, defaults: BlockData) => (k: string) =>
  data[k]?.trim() ? data[k] : (defaults[k] ?? '');

export function ServicesProcess({ data }: { data: BlockData }) {
  const v = pick(data, SERVICES_PROCESS_DEFAULTS);
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal><h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{v('title')}</h2></Reveal>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.title} direction="up" delay={i * 0.05}>
              <div className="bg-card border border-border rounded-2xl p-5 h-full">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3"><p.icon className="w-5 h-5" /></div>
                <p className="text-xs text-muted-foreground">Step {i + 1}</p>
                <h3 className="font-semibold mt-1">{p.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesWorkflow({ data }: { data: BlockData }) {
  const v = pick(data, SERVICES_WORKFLOW_DEFAULTS);
  return (
    <section className="py-16 border-t border-border/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10">
            {v('eyebrow') && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{v('eyebrow')}</p>}
            {v('title') && <h2 className="text-3xl sm:text-4xl font-bold mt-2">{v('title')}</h2>}
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_WORKFLOW.map((w, i) => (
            <Reveal key={w.title} direction="up" delay={i * 0.05}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full hover:border-primary/40 transition">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary grid place-items-center text-sm font-bold">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesCatalog({ data }: { data: BlockData }) {
  const v = pick(data, SERVICES_CATALOG_DEFAULTS);
  return (
    <section className="py-16 bg-[color:var(--surface-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10">
            {v('eyebrow') && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{v('eyebrow')}</p>}
            {v('title') && <h2 className="text-3xl sm:text-4xl font-bold mt-2">{v('title')}</h2>}
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} direction="up" delay={(i % 6) * 0.05}>
              <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all h-full flex flex-col">
                <div className="aspect-[16/10] overflow-hidden bg-muted">
                  <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary grid place-items-center">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground flex-1">{s.desc}</p>
                  <Link to="/contact" className="mt-4 inline-flex items-center text-primary text-sm font-medium hover:gap-2 gap-1 transition-all">
                    Get a quote <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceGroupsBlock({ data }: { data: BlockData }) {
  const v = pick(data, SERVICE_GROUPS_DEFAULTS);
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
        <Reveal>
          <div className="text-center">
            {v('eyebrow') && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{v('eyebrow')}</p>}
            {v('title') && <h2 className="text-3xl sm:text-4xl font-bold mt-2">{v('title')}</h2>}
            {v('subtitle') && <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">{v('subtitle')}</p>}
          </div>
        </Reveal>
        {SERVICE_GROUPS.map((g, gi) => (
          <Reveal key={g.title} direction="up" delay={gi * 0.04}>
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-primary">{g.title}</h3>
              <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((it) => (
                  <div key={it.name} className="border border-border rounded-xl p-4 hover:border-primary transition">
                    <h4 className="font-semibold">{it.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}