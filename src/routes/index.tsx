import { createFileRoute, Link } from '@tanstack/react-router';
import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import { CustomerFeedback } from '@/components/sections/CustomerFeedback';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { FAQ } from '@/components/sections/FAQ';
import { CTABanner } from '@/components/sections/CTABanner';
import { OurCompanies } from '@/components/sections/OurCompanies';
import { SeoContent } from '@/components/sections/SeoContent';
import { Location } from '@/components/sections/Location';
import { Reveal } from '@/components/Reveal';
import { SERVICES, PROJECTS, FAQ as FAQ_DATA } from '@/lib/site-data';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicGetSettings } from '@/lib/admin/content.functions';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Signage Company in UAE | Speedex Signages — LED, Acrylic, 3D' },
      { name: 'description', content: "Speedex Signages — leading UAE signage company. LED signage, acrylic signage, 3D letters, vehicle branding, digital & outdoor signage across Dubai." },
      { property: 'og:title', content: 'Speedex Signages — We Light Up Your Brand | UAE Signage Company' },
      { property: 'og:description', content: 'Premium signage manufacturing, fabrication and installation across the United Arab Emirates.' },
      { property: 'og:url', content: '/' },
    ],
    links: [
      { rel: 'canonical', href: '/' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_DATA.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const getSettings = useServerFn(publicGetSettings);
  const { data: settings } = useQuery({ queryKey: ['site-settings'], queryFn: () => getSettings() });
  const s = (settings ?? {}) as Record<string, string>;
  return (
    <>
      <Hero videoUrl={s.hero_video_url} posterUrl={s.hero_poster_url} />
      <ClientLogos />
      <Stats />
      <SeoContent />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider">What we do</p>
              <h2 className="text-3xl sm:text-5xl font-bold mt-2">A full-service signage partner</h2>
              <p className="mt-4 text-muted-foreground">From concept and design to fabrication, installation and maintenance — all under one roof.</p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.slice(0, 6).map((s, i) => (
              <Reveal key={s.title} direction="up" delay={i * 0.08}>
                <div className="group bg-card border border-border rounded-2xl p-6 hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 grid place-items-center text-primary group-hover:from-primary group-hover:to-primary-glow group-hover:text-primary-foreground transition-colors">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/services"><Button variant="outline">View all services <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="text-primary text-sm font-semibold uppercase tracking-wider">Recent work</p>
                <h2 className="text-3xl sm:text-5xl font-bold mt-2">Featured projects</h2>
              </div>
              <Link to="/explore"><Button variant="outline">Explore all <ArrowRight className="ml-2 w-4 h-4" /></Button></Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} direction="up" delay={i * 0.05}>
                <Link to="/explore" className="group block relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                    <p className="text-xs uppercase tracking-wider text-background/70">{p.category}</p>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CustomerFeedback />
      <OurCompanies />
      <Location
        address={s.office_address}
        phone={s.contact_phone}
        email={s.contact_email}
        mapsEmbedUrl={s.maps_embed_url}
        mapsDirectionsUrl={s.maps_directions_url || 'https://www.google.com/maps/place/Speedex+Auto+Workshop+L.L.C/@24.3564359,54.4925938,514m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5e4195316879d7:0xd4cfbd6175b97d6c!8m2!3d24.3564342!4d54.4935042'}
      />
      <FAQ />
      <CTABanner />
    </>
  );
}
