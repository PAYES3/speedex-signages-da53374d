import { Reveal } from '@/components/Reveal';

const TILES = [
  { img: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80', title: 'CNC Fabrication', span: 'lg:col-span-2 lg:row-span-2' },
  { img: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=1000&q=80', title: 'Laser Cutting', span: '' },
  { img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1000&q=80', title: 'Acrylic Bending', span: '' },
  { img: 'https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=1000&q=80', title: 'LED Assembly', span: 'lg:col-span-2' },
  { img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1000&q=80', title: 'Quality Control', span: '' },
  { img: 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1000&q=80', title: 'Team & Installation', span: '' },
];

export function FactoryShowcase() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div className="max-w-2xl">
              <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase">Inside our factory</p>
              <h2 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">Where premium signage is made</h2>
            </div>
            <p className="text-muted-foreground text-lg max-w-md">
              20,000+ sq ft of in-house CNC, laser, acrylic and metal fabrication — engineered for volume without compromising craft.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
          {TILES.map((t, i) => (
            <Reveal key={t.title} direction="up" delay={(i % 4) * 0.06}>
              <div className={`group relative overflow-hidden rounded-2xl ${t.span}`}>
                <img src={t.img} alt={t.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-[10px] uppercase tracking-[0.3em] gold-text font-bold">Facility</p>
                  <h3 className="mt-1 text-white font-bold text-xl">{t.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}