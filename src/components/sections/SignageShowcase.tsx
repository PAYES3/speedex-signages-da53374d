import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Assets folder-il irukkum EXACT filenames
import signage1 from '@/assets/hero/SIGNAGE-1.jpg';
import signage2 from '@/assets/hero/SIGNAGE-2.jpg';
import signage3 from '@/assets/hero/SIGNAGE-3.jpg';
import signage5 from '@/assets/hero/SIGNAGE-5-(BASCOM).jpg';
import signage6 from '@/assets/hero/SIGNAGE-6-(NMC).jpg';
import signage7 from '@/assets/hero/SIGNAGE-7-(DANAT).jpg';

const SECONDARY_SLIDES = [
  {
    id: 1,
    image: signage1,
    badge: 'INDOOR & 3D SIGNAGE',
    title: 'Precision 3D Acrylic & Metallic Letters',
    subtitle: 'Premium LED illuminated logo displays designed and fabricated for high-end retail.',
    buttonText: 'Explore Projects',
    buttonHref: '/portfolio',
  },
  {
    id: 2,
    image: signage2,
    badge: 'OUTDOOR & ARCHITECTURAL',
    title: 'Building & Exterior Signages',
    subtitle: 'High-visibility architectural signages engineered for corporate environments across the UAE.',
    buttonText: 'View Portfolio',
    buttonHref: '/portfolio',
  },
  {
    id: 3,
    image: signage3,
    badge: 'COMMERCIAL BRANDING',
    title: 'Corporate Retail & Reception Displays',
    subtitle: 'Custom indoor branding and illuminated displays crafted with high precision.',
    buttonText: 'Contact Us',
    buttonHref: '/contact',
  },
  {
    id: 4,
    image: signage5,
    badge: 'FLEET GRAPHICS',
    title: 'Custom Commercial Fleet Branding',
    subtitle: 'Transform commercial vehicles into mobile brand assets with durable wraps.',
    buttonText: 'Our Services',
    buttonHref: '/services',
  },
  {
    id: 5,
    image: signage6,
    badge: 'HEALTHCARE & CORPORATE',
    title: 'Medical & Commercial Signage',
    subtitle: 'Turnkey interior and exterior visual identity solutions for facilities.',
    buttonText: 'Explore Projects',
    buttonHref: '/portfolio',
  },
  {
    id: 6,
    image: signage7,
    badge: 'LUXURY & ARCHITECTURAL',
    title: 'Premium Project Fabrication',
    subtitle: 'Engineered signage assets designed to match exact brand specifications.',
    buttonText: 'Get a Free Quote',
    buttonHref: '/contact',
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
    <section className="relative w-full h-[600px] sm:h-[650px] overflow-hidden bg-slate-100 flex items-center my-6">
      {/* Background Image Layer */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
        </motion.div>
      </AnimatePresence>

      {/* Floating Content Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/80 p-6 sm:p-10 rounded-3xl shadow-xl"
          >
            <span className="inline-block px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {currentSlide.badge}
            </span>

            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
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

      {/* Navigation Controls */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + SECONDARY_SLIDES.length) % SECONDARY_SLIDES.length)}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % SECONDARY_SLIDES.length)}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-slate-700 active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SECONDARY_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'w-7 bg-[#35524A]' : 'w-2 bg-slate-400/60'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default SecondarySlider;
