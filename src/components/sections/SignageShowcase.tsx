import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Direct path rendering (Prevents Vite import bundle crashes)
const SECONDARY_SLIDES = [
  {
    id: 1,
    image: '/src/assets/hero/SIGNAGE-1.jpg',
    badge: 'INDOOR & 3D SIGNAGE',
    title: 'Precision 3D Acrylic & Metallic Letters',
    subtitle: 'Premium LED illuminated logo displays designed and fabricated for high-end retail.',
    buttonText: 'Explore Projects',
    buttonHref: '/portfolio',
  },
  {
    id: 2,
    image: '/src/assets/hero/SIGNAGE-2.jpg',
    badge: 'OUTDOOR & ARCHITECTURAL',
    title: 'Building & Exterior Signages',
    subtitle: 'High-visibility architectural signages engineered for corporate environments across the UAE.',
    buttonText: 'View Portfolio',
    buttonHref: '/portfolio',
  },
  {
    id: 3,
    image: '/src/assets/hero/SIGNAGE-3.jpg',
    badge: 'COMMERCIAL BRANDING',
    title: 'Corporate Retail & Reception Displays',
    subtitle: 'Custom indoor branding and illuminated displays crafted with high precision.',
    buttonText: 'Contact Us',
    buttonHref: '/contact',
  },
  {
    id: 4,
    image: '/src/assets/hero/SIGNAGE-5-(BASCOM).jpg',
    badge: 'FLEET GRAPHICS',
    title: 'Custom Commercial Fleet Branding',
    subtitle: 'Transform commercial vehicles into mobile brand assets with durable wraps.',
    buttonText: 'Our Services',
    buttonHref: '/services',
  },
];

export function SecondarySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SECONDARY_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = SECONDARY_SLIDES[currentIndex];

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-slate-100 flex items-center my-6">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Card Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/80 p-8 rounded-3xl shadow-xl"
          >
            <span className="inline-block px-3 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {currentSlide.badge}
            </span>

            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 leading-tight">
              {currentSlide.title}
            </h2>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
              {currentSlide.subtitle}
            </p>

            <div className="mt-6">
              <Link to={currentSlide.buttonHref}>
                <Button className="h-11 px-6 rounded-full bg-[#35524A] hover:bg-[#253B35] text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md">
                  {currentSlide.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + SECONDARY_SLIDES.length) % SECONDARY_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 active:scale-95"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % SECONDARY_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 active:scale-95"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  );
}

export default SecondarySlider;
