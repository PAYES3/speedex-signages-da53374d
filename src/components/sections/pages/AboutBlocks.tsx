import { Reveal } from '@/components/Reveal';
import { Target, Eye, ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';
import { TIMELINE } from '@/lib/site-data';
import type { BlockData } from '../PageHero';

const VALUE_ICONS = [ShieldCheck, Heart, Sparkles, Award];

export const ABOUT_VALUE_DEFAULTS: BlockData = {
  eyebrow: 'Core Values',
  title: 'What we stand for',
  card1_title: 'Quality without compromise',
  card1_text: 'Materials, finishing and engineering held to international standards.',
  card2_title: 'Client obsession',
  card2_text: 'We earn long-term trust through transparency, speed and care.',
  card3_title: 'Creative craftsmanship',
  card3_text: 'Design-led thinking from first sketch to final installation.',
  card4_title: 'Safety first',
  card4_text: 'Compliant with UAE municipality and civil defense standards.',
};

export const ABOUT_MISSION_DEFAULTS: BlockData = {
  mission_title: 'Our Mission',
  mission_text: 'To deliver signage solutions that elevate brands through craftsmanship, technology and reliability — on time, on budget, every time.',
  vision_title: 'Our Vision',
  vision_text: 'To be the most trusted signage and visual branding partner in the Middle East, recognized for quality, innovation and integrity.',
};

export const ABOUT_TIMELINE_DEFAULTS: BlockData = {
  eyebrow: 'Timeline',
  title: 'Our milestones',
};

function pick(data: BlockData, defaults: BlockData) {
  return (k: string) => (data[k]?.trim() ? data[k] : (defaults[k] ?? ''));
}

export function MissionVision({ data }: { data: BlockData }) {
  const v = pick(data, ABOUT_MISSION_DEFAULTS);
  return (
    <section className="py-20 bg-[color:var(--surface-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
        <Reveal direction="left">
          <div className="bg-card border border-border rounded-2xl p-8 h-full">
            <Target className="w-10 h-10 text-primary" />
            <h3 className="mt-4 text-2xl font-bold">{v('mission_title')}</h3>
            <p className="mt-3 text-muted-foreground">{v('mission_text')}</p>
          </div>
        </Reveal>
        <Reveal direction="right">
          <div className="bg-card border border-border rounded-2xl p-8 h-full">
            <Eye className="w-10 h-10 text-accent" />
            <h3 className="mt-4 text-2xl font-bold">{v('vision_title')}</h3>
            <p className="mt-3 text-muted-foreground">{v('vision_text')}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ValuesCards({ data }: { data: BlockData }) {
  const v = pick(data, ABOUT_VALUE_DEFAULTS);
  const cards = [1, 2, 3, 4]
    .map((n, i) => ({ title: v(`card${n}_title`), text: v(`card${n}_text`), Icon: VALUE_ICONS[i] }))
    .filter((c) => c.title);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            {v('eyebrow') && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{v('eyebrow')}</p>}
            {v('title') && <h2 className="text-3xl sm:text-4xl font-bold mt-2">{v('title')}</h2>}
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} direction="up" delay={i * 0.08}>
              <div className="bg-card border border-border rounded-2xl p-6 h-full">
                <c.Icon className="w-8 h-8 text-primary" />
                <h3 className="mt-4 font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutTimeline({ data }: { data: BlockData }) {
  const v = pick(data, ABOUT_TIMELINE_DEFAULTS);
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            {v('eyebrow') && <p className="text-primary text-sm font-semibold uppercase tracking-wider">{v('eyebrow')}</p>}
            {v('title') && <h2 className="text-3xl sm:text-4xl font-bold mt-2">{v('title')}</h2>}
          </div>
        </Reveal>
        <div className="relative pl-8 border-l-2 border-border space-y-8">
          {TIMELINE.map((m, i) => (
            <Reveal key={m.year} direction="left" delay={i * 0.06}>
              <div className="relative">
                <div className="absolute -left-[42px] top-1 w-5 h-5 rounded-full bg-primary ring-4 ring-background" />
                <p className="text-primary font-bold">{m.year}</p>
                <p className="mt-1 text-muted-foreground">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}