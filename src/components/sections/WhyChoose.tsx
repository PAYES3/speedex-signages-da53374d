import { Reveal } from '@/components/Reveal';
import {
  ShieldCheck, Users, Palette, Truck, Wrench, Tag, Award, Layers,
} from 'lucide-react';

const ITEMS = [
  { icon: ShieldCheck, title: 'Quality Materials', desc: 'Premium acrylic, stainless steel, aluminium and LED components sourced to spec.' },
  { icon: Users, title: 'Experienced Team', desc: 'Designers, engineers and installers with decades of combined UAE experience.' },
  { icon: Palette, title: 'Custom Designs', desc: 'Every sign designed for your brand — no templates, no shortcuts.' },
  { icon: Truck, title: 'Fast Delivery', desc: 'In-house fabrication means faster turnaround from concept to installation.' },
  { icon: Wrench, title: 'Professional Installation', desc: 'Certified crews handle rope-access, MEWP and civil-defense compliant work.' },
  { icon: Tag, title: 'Competitive Pricing', desc: 'Transparent quotes with no hidden fees — priced for real commercial value.' },
  { icon: Award, title: 'Warranty Support', desc: 'Every installation backed by warranty and long-term maintenance options.' },
  { icon: Layers, title: 'Complete Solutions', desc: 'Design, permits, fabrication, installation and maintenance — one partner.' },
];

export function WhyChoose() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">Why Choose Us</p>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              Built for brands that expect the best
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Eight reasons UAE's leading brands trust Speedex for their signage.
            </p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} direction="up" delay={(i % 4) * 0.06}>
              <div className="h-full bg-white border border-border rounded-2xl p-7 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 hover:border-primary/40 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl grid place-items-center bg-primary/10 text-primary mb-5">
                  <it.icon className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-bold">{it.title}</h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}