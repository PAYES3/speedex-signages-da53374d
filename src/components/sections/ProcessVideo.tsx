import React from 'react';
import { Reveal } from '@/components/Reveal';
import { Palette, Hammer, Sparkles, Wrench } from 'lucide-react';
import hero1 from '@/assets/hero/hero-1.mp4.asset.json';

const STEPS = [
  { icon: Palette, title: 'Design', desc: 'Concept, 3D visualization and material selection tailored to your brand.' },
  { icon: Hammer, title: 'Fabrication', desc: 'CNC routing, laser cutting, acrylic forming and metal work in our Al Quoz facility.' },
  { icon: Sparkles, title: 'Finishing', desc: 'Paint, polish, LED integration and quality inspection before dispatch.' },
  { icon: Wrench, title: 'Installation', desc: 'Certified crews mount signage at any elevation, with permits handled end-to-end.' },
];

export function ProcessVideo() {
  return (
    <section className="py-24 lg:py-32 bg-[color:var(--surface-beige)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl mb-14">
            <p className="text-primary text-sm font-semibold tracking-[0.25em] uppercase">Our Process</p>
            <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]">
              From design to installation — we build signage that represents your brand.
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          {/* Left Column: Video Showcase */}
          <Reveal direction="left" className="lg:col-span-3">
            <div className="relative rounded-3xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/5 bg-black">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full aspect-video object-cover"
              >
                <source src={hero1.url} type="video/mp4" />
                Your browser does not support video playback.
              </video>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </Reveal>

          {/* Right Column: Step-by-Step List */}
          <Reveal direction="right" className="lg:col-span-2">
            <ol className="space-y-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-full grid place-items-center bg-white border border-border shadow-[var(--shadow-card)]">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#D4A017' }}>
                        Step {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
                    <p className="mt-1 text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default ProcessVideo;
