import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// 1. Ungal assets/hero folder-il irundhu images-ai import pannungal
import signage1 from '@/assets/hero/SIGNAGE-1.jpg';
import signage2 from '@/assets/hero/SIGNAGE-2.jpg';
import signage3 from '@/assets/hero/SIGNAGE-3.jpg';
import signage5 from '@/assets/hero/SIGNAGE-5-(BASCOM).jpg';

const CAROUSEL_SLIDES = [
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
    badge: 'VEHICLE GRAPHICS',
    title: 'Custom Commercial Fleet Branding',
    subtitle: 'Transform your commercial vehicles into mobile brand assets with durable wraps.',
    buttonText: 'Our Services',
    buttonHref: '/services',
  },
];

export function SecondarySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play interval (6 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const currentSlide = CAROUSEL_SLIDES[currentIndex];

  return (
    <section className="relative w-full h-[650px] overflow-hidden bg-slate-50 flex items-center my-8">
      {/* Background Image Slider with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle overlay for light design */}
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
        </motion.div>
      </AnimatePresence>

      {/* Center Left - Floating White Card */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md bg-white/95 backdrop-blur-md border border-white/80 p-8 sm:p-10 rounded-3xl shadow-2xl"
          >
            {/* Badge */}
            <span className="inline-block px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {currentSlide.badge}
            </span>

            {/* Title */}
            <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {currentSlide.title}
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm text-slate-600 leading-relaxed font-medium">
              {currentSlide.subtitle}
            </p>

            {/* Button */}
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

      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur flex items-center justify-center text-slate-700 transition-all active:scale-95"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg backdrop-blur flex items-center justify-center text-slate-700 transition-all active:scale-95"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Bottom Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {CAROUSEL_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-7 bg-[#35524A]'
                : 'w-2 bg-slate-400/60 hover:bg-slate-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default SecondarySlider;
