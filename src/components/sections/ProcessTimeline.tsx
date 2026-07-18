import { Reveal } from '@/components/Reveal';
import { MessageSquare, PenTool, Factory, ShieldCheck, HardHat, Wrench } from 'lucide-react';

const STEPS = [
  { icon: MessageSquare, title: 'Consultation', desc: 'Site visit, brand review, and requirements capture.' },
  { icon: PenTool, title: 'Design', desc: '3D renders and material mockups for sign-off.' },
  { icon: Factory, title: 'Fabrication', desc: 'CNC, laser, acrylic and metal work in-house.' },
  { icon: ShieldCheck, title: 'Quality', desc: 'Illumination, structural and finish inspection.' },
  { icon: HardHat, title: 'Installation', desc: 'Certified crews, MEWP and civil-defense compliant.' },
  { icon: Wrench, title: 'Maintenance', desc: 'Warranty-backed servicing and upgrades.' },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 lg:py-32 bg-[color:var(--surface-gray)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase">Our Process</p>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">From brief to bright</h2>
            <p className="mt-5 text-lg text-muted-foreground">A six-step journey engineered for premium outcomes.</p>
          </div>
        </Reveal>
        <div className="relative">
          <div className="hidden lg:block absolute top-14 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} direction="up" delay={i * 0.08}>
                <div className="relative text-center">
                  <div className="mx-auto w-16 h-16 rounded-2xl glass-panel grid place-items-center text-primary relative z-10">
                    <s.icon className="w-7 h-7" strokeWidth={1.75} />
                  </div>
                  <div className="mt-4 text-xs font-bold uppercase tracking-[0.25em] gold-text">Step {i + 1}</div>
                  <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}