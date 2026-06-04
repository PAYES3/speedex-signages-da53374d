import { createFileRoute } from '@tanstack/react-router';
import { Reveal } from '@/components/Reveal';
import { Stats } from '@/components/sections/Stats';
import { CTABanner } from '@/components/sections/CTABanner';
import { TIMELINE } from '@/lib/site-data';
import { Award, Target, Eye, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About Us — Speedex Signages UAE' },
      { name: 'description', content: 'Since 2007, Speedex Signages has designed, fabricated and installed premium signage across the UAE. Our story, mission and values.' },
      { property: 'og:title', content: 'About Speedex Signages' },
      { property: 'og:description', content: "UAE's trusted signage and branding partner since 2007." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: ShieldCheck, title: 'Quality without compromise', text: 'Materials, finishing and engineering held to international standards.' },
  { icon: Heart, title: 'Client obsession', text: 'We earn long-term trust through transparency, speed and care.' },
  { icon: Sparkles, title: 'Creative craftsmanship', text: 'Design-led thinking from first sketch to final installation.' },
  { icon: Award, title: 'Safety first', text: 'Compliant with UAE municipality and civil defense standards.' },
];

function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">About Us</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Crafting signage that defines brands</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Speedex Signages is a full-service signage manufacturer based in Dubai, UAE. Since 2007 we've helped 950+ brands stand out — from boutique cafés to international corporates.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <img src="https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1200&q=80" alt="Signage manufacturing facility" className="rounded-2xl shadow-[var(--shadow-elegant)] aspect-[4/3] object-cover w-full" loading="lazy" />
          </Reveal>
          <Reveal direction="right">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Our story</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">From a small workshop to a UAE-wide signage leader</h2>
            <p className="mt-4 text-muted-foreground">
              What started as a single fabrication unit in Al Quoz has grown into a 2,000+ m² facility with in-house CNC, laser cutting, fabrication, painting and a dedicated installation crew operating across all seven Emirates.
            </p>
            <p className="mt-3 text-muted-foreground">
              Our team blends seasoned designers, engineers and field technicians who treat every project — large or small — with the same craftsmanship.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6">
          <Reveal direction="left">
            <div className="bg-card border border-border rounded-2xl p-8 h-full">
              <Target className="w-10 h-10 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Our Mission</h3>
              <p className="mt-3 text-muted-foreground">To deliver signage solutions that elevate brands through craftsmanship, technology and reliability — on time, on budget, every time.</p>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div className="bg-card border border-border rounded-2xl p-8 h-full">
              <Eye className="w-10 h-10 text-accent" />
              <h3 className="mt-4 text-2xl font-bold">Our Vision</h3>
              <p className="mt-3 text-muted-foreground">To be the most trusted signage and visual branding partner in the Middle East, recognized for quality, innovation and integrity.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">Core Values</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">What we stand for</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} direction="up" delay={i * 0.08}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full">
                  <v.icon className="w-8 h-8 text-primary" />
                  <h3 className="mt-4 font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">Timeline</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">Our milestones</h2>
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

      <CTABanner />
    </>
  );
}