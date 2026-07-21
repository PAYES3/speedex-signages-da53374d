import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

// Static / Admin fallback slides data
const SHOWCASE_SLIDES = [
  {
    id: 1,
    tagline: 'OUTDOOR SIGNAGE',
    title: 'Pylons, billboards & wayfinding',
    desc: 'Large-format outdoor signage installed to municipal compliance across the Emirates.',
    link: '/explore',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1600'
  },
  {
    id: 2,
    tagline: 'INDOOR & 3D SIGNAGE',
    title: 'Precision 3D Acrylic & Metallic Letters',
    desc: 'Premium LED illuminated logo displays designed and fabricated for high-end retail.',
    link: '/explore',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1600'
  }
];

export function SignageShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  // Optional: Auto-play slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = SHOWCASE_SLIDES[currentIndex];

  return (
    <section className="relative w-full h-[80vh] min-h-[550px] max-h-[750px] overflow-hidden bg-black">
      {/* 🖼️ BACKGROUND IMAGE WITH FADE ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current.id || currentIndex}
          src={current.image}
          alt={current.title}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {/* 🎯 LIGHT CONTRAST OVERLAY (Ensures image visibility while preserving readability) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

      {/* 🎯 TEXT CONTAINER WITH GLASS CONTRAST BOX */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl p-6 sm:p-8 rounded-3xl bg-black/50 backdrop-blur-md border border-white/15 shadow-2xl space-y-4"
        >
          {/* Subtitle / Tagline */}
          <p className="text-xs sm:text-sm font-bold tracking-[0.25em] uppercase text-primary bg-primary/20 border border-primary/30 px-3.5 py-1 rounded-full inline-block">
            {current.tagline}
          </p>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
            {current.title}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 leading-relaxed drop-shadow">
            {current.desc}
          </p>

          {/* CTA Button with Brand Gradient */}
          <div className="pt-2">
            <Link to={current.link}>
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary via-teal-600 to-emerald-600 hover:opacity-95 text-white font-semibold px-7 py-3 shadow-lg hover:shadow-primary/40 transition-all cursor-pointer">
                Explore Projects <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 🎯 LEFT & RIGHT NAVIGATION ARROW BUTTONS */}
      <button
        onClick={handlePrev}
        type="button"
        aria-label="Previous Slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-primary hover:border-primary hover:scale-110 transition-all cursor-pointer shadow-2xl"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        type="button"
        aria-label="Next Slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/20 hover:bg-primary hover:border-primary hover:scale-110 transition-all cursor-pointer shadow-2xl"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 🎯 BOTTOM DOTS INDICATOR */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex justify-center items-center gap-2">
        {SHOWCASE_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all cursor-pointer ${
              i === currentIndex ? 'w-8 bg-primary' : 'w-2.5 bg-white/40 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default SignageShowcase;
