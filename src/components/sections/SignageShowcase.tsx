import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1556139943-4bdca53adf1e?w=1800&q=80',
    kicker: 'Building Signage',
    title: 'Illuminated 3D facades',
    desc: 'Chaneleum and stainless steel letters engineered for UAE weather.',
  },
  {
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80',
    kicker: 'LED Video Walls',
    title: 'Digital displays that command attention',
    desc: 'High-resolution LED walls for showrooms, malls and corporate lobbies.',
  },
  {
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=80',
    kicker: 'Office Branding',
    title: 'Reception & interior signage',
    desc: 'Backlit acrylic logos and brushed metal wordmarks for premium interiors.',
  },
  {
    img: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=1800&q=80',
    kicker: 'Retail & F&B',
    title: 'Storefronts customers remember',
    desc: 'LED neon flex, illuminated boxes and custom fabrication for retail spaces.',
  },
  {
    img: 'https://images.unsplash.com/photo-1517242810446-cc8951b2be40?w=1800&q=80',
    kicker: 'Outdoor Signage',
    title: 'Pylons, billboards & wayfinding',
    desc: 'Large-format outdoor signage installed to municipal compliance across the Emirates.',
  },
];

export function SignageShowcase() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [paused]);
  const s = SLIDES[i];
  return (
    <section
      className="relative w-full h-[80svh] min-h-[560px] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={s.img}
          src={s.img}
          alt={s.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl text-white"
          >
            <p className="text-primary text-sm font-semibold tracking-[0.3em] uppercase">{s.kicker}</p>
            <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">{s.title}</h2>
            <p className="mt-5 text-lg sm:text-xl text-white/85 max-w-xl leading-relaxed">{s.desc}</p>
            <Link to="/portfolio" className="inline-block mt-8">
              <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90">
                Explore Projects <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            onClick={() => setI(n)}
            aria-label={`Slide ${n + 1}`}
            className={`h-1.5 rounded-full transition-all ${n === i ? 'w-10 bg-primary' : 'w-4 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>
    </section>
  );
}