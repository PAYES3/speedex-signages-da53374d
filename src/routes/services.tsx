import { createFileRoute, Link } from '@tanstack/react-router';
import { Reveal } from '@/components/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { PROCESS, SERVICES, SERVICE_GROUPS } from '@/lib/site-data';
import { ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/services')({
  head: () => ({
    meta: [
      { title: 'Signage Services UAE | LED, Acrylic, 3D, Vehicle | Speedex' },
      { name: 'description', content: 'Indoor, outdoor & LED signage services in the UAE: acrylic, 3D letters, vehicle branding, wayfinding, digital signage, CNC & laser cutting by Speedex Signages.' },
      { property: 'og:title', content: 'Speedex Signages — Signage Services in the UAE' },
      { property: 'og:description', content: 'Design, fabrication, installation and maintenance of premium signage across Dubai and the UAE.' },
      { property: 'og:url', content: '/services' },
    ],
    links: [{ rel: 'canonical', href: '/services' }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: [
            'Indoor Signage', 'Outdoor Signage', 'LED Signage', 'Acrylic Signage',
            '3D Letter Signage', 'Vehicle Branding', 'Wayfinding Signage', 'Digital Signage',
            'CNC Cutting', 'Laser Cutting',
          ].map((name, i) => ({
            "@type": "ListItem", position: i + 1,
            item: { "@type": "Service", name: `${name} UAE`, provider: { "@type": "LocalBusiness", name: "Speedex Signages" }, areaServed: "United Arab Emirates" },
          })),
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Services</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Everything signage — under one roof</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Concept, design, fabrication, installation and maintenance — delivered by an in-house team across the UAE.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">How we work</h2>
          </Reveal>
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

      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">What we deliver</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">Signage solutions for every brand</h2>
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

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          <Reveal>
            <div className="text-center">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">Types of Signage</p>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2">Complete range of signage we deliver</h2>
              <p className="mt-4 text-muted-foreground max-w-3xl mx-auto">
                From exterior 3D illuminated signage to interior wayfinding, compliance signs and wide-format printing — every category produced in-house at our UAE facility.
              </p>
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

      <CTABanner />
    </>
  );
}