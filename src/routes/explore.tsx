import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { PROJECTS, PROJECT_CATEGORIES, COMPANY } from '@/lib/site-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Play, X } from 'lucide-react';

export const Route = createFileRoute('/explore')({
  head: () => ({
    meta: [
      { title: 'Signage Portfolio UAE | Our Projects | Speedex Signages' },
      { name: 'description', content: 'Explore signage projects across the UAE — LED channel letters, 3D illuminated signs, vehicle wraps, pylons and wayfinding by Speedex Signages.' },
      { property: 'og:title', content: 'Speedex Signages — UAE Signage Portfolio' },
      { property: 'og:description', content: 'A showcase of premium signage projects delivered across the UAE.' },
      { property: 'og:url', content: '/explore' },
    ],
    links: [{ rel: 'canonical', href: '/explore' }],
  }),
  component: ExplorePage,
});

function ExplorePage() {
  const [filter, setFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);
  const [openProject, setOpenProject] = useState<typeof PROJECTS[number] | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);

  const filtered = useMemo(() => filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter), [filter]);

  return (
    <>
      <section className="pt-32 pb-10 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Portfolio</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Explore our work</h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">A selection of signage and branding projects we've delivered across the UAE.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {PROJECT_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  filter === c
                    ? 'bg-primary text-primary-foreground border-primary shadow-[var(--shadow-glow)]'
                    : 'bg-card border-border hover:border-primary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={(i % 6) * 0.05}>
                <button
                  onClick={() => setOpenProject(p)}
                  className="group relative block w-full overflow-hidden rounded-2xl aspect-[4/3] bg-muted text-left"
                >
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-background">
                    <p className="text-xs uppercase tracking-wider text-background/70">{p.category} · {p.year}</p>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="mt-16">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Video showcase</h2>
            </Reveal>
            <Reveal direction="zoom">
              <button onClick={() => setVideoOpen(true)} className="relative block mx-auto w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-foreground group">
                <img src={COMPANY.heroImage} alt="Showreel preview" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-[var(--shadow-glow)] group-hover:scale-110 transition">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                </div>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      <Dialog open={!!openProject} onOpenChange={(v) => !v && setOpenProject(null)}>
        <DialogContent className="max-w-3xl">
          {openProject && (
            <>
              <DialogHeader>
                <DialogTitle>{openProject.title}</DialogTitle>
              </DialogHeader>
              <img src={openProject.img} alt={openProject.title} className="rounded-lg w-full aspect-video object-cover cursor-zoom-in" onClick={() => setLightboxIndex(0)} />
              <div className="grid sm:grid-cols-3 gap-3 text-sm">
                <div><p className="text-muted-foreground">Client</p><p className="font-medium">{openProject.client}</p></div>
                <div><p className="text-muted-foreground">Category</p><p className="font-medium">{openProject.category}</p></div>
                <div><p className="text-muted-foreground">Year</p><p className="font-medium">{openProject.year}</p></div>
              </div>
              <p className="text-sm text-muted-foreground">{openProject.description}</p>
            </>
          )}
        </DialogContent>
      </Dialog>

      {videoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 grid place-items-center p-4" onClick={() => setVideoOpen(false)}>
          <button className="absolute top-4 right-4 text-white p-2" aria-label="Close"><X /></button>
          <img src={COMPANY.heroImage} alt="Speedex Signages showreel" className="max-w-5xl w-full rounded-lg" />
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={Math.max(0, lightboxIndex)}
        close={() => setLightboxIndex(-1)}
        slides={openProject ? [{ src: openProject.img }] : []}
      />
    </>
  );
}