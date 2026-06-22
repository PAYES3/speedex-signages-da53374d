import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { publicListProjects, listCategories } from '@/lib/admin/content.functions';
import { Reveal } from '@/components/Reveal';
import { CTABanner } from '@/components/sections/CTABanner';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Route = createFileRoute('/portfolio')({
  head: () => ({
    meta: [
      { title: 'Portfolio | Signage Projects UAE | Speedex Signages' },
      { name: 'description', content: 'Browse signage projects delivered by Speedex Signages across the UAE — LED, acrylic, 3D letters, vehicle branding, retail and corporate signage in Dubai, Abu Dhabi and Sharjah.' },
      { property: 'og:title', content: 'Our Work — Speedex Signages Portfolio' },
      { property: 'og:description', content: 'Real signage projects we delivered for brands across the UAE.' },
      { property: 'og:url', content: 'https://speedex-signages.lovable.app/portfolio' },
    ],
    links: [{ rel: 'canonical', href: 'https://speedex-signages.lovable.app/portfolio' }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const fetchP = useServerFn(publicListProjects);
  const fetchC = useServerFn(listCategories);
  const { data: projects } = useQuery({ queryKey: ['public-projects'], queryFn: () => fetchP() });
  const { data: cats } = useQuery({ queryKey: ['public-cats'], queryFn: () => fetchC() });
  const [filter, setFilter] = useState<string>('all');
  const [lightbox, setLightbox] = useState<any>(null);

  const filtered = (projects ?? []).filter((p: any) => filter === 'all' || p.category_slug === filter);

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Portfolio</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Signage projects we've delivered</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              A selection of recent installations for brands across Dubai, Abu Dhabi and the wider UAE.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {(cats?.length ?? 0) > 0 && (
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
              {cats!.map((c: any) => (
                <FilterChip key={c.id} active={filter === c.slug} onClick={() => setFilter(c.slug)} label={c.name} />
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center py-20 text-muted-foreground">
              No projects published yet. Admins can add work from the Portfolio tab in the admin panel.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p: any, i: number) => (
                <Reveal key={p.id} direction="up" delay={(i % 6) * 0.05}>
                  <button onClick={() => setLightbox(p)} className="text-left w-full group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      {p.cover_url
                        ? <img src={p.cover_url} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        : <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/10" />}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold">{p.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {p.category_slug && <span className="capitalize">{cats?.find((c: any) => c.slug === p.category_slug)?.name || p.category_slug}</span>}
                        {p.year && <> · {p.year}</>}
                        {p.client && <> · {p.client}</>}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 grid place-items-center p-4 overflow-y-auto"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full my-8 overflow-hidden"
            >
              <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 grid place-items-center z-10" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
              {lightbox.cover_url && <img src={lightbox.cover_url} alt={lightbox.title} className="w-full aspect-video object-cover" />}
              <div className="p-6">
                <h2 className="text-2xl font-bold">{lightbox.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{lightbox.client} {lightbox.year ? `· ${lightbox.year}` : ''}</p>
                {lightbox.description && <p className="mt-4 whitespace-pre-wrap">{lightbox.description}</p>}
                {lightbox.media?.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6">
                    {lightbox.media.map((m: any, i: number) => (
                      m.type === 'video'
                        ? <video key={i} src={m.url} controls className="w-full aspect-square object-cover rounded-lg" />
                        : <img key={i} src={m.url} alt="" loading="lazy" className="w-full aspect-square object-cover rounded-lg" />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABanner />
    </>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition ${active ? 'bg-primary text-primary-foreground' : 'bg-card border border-border hover:border-primary'}`}
    >
      {label}
    </button>
  );
}