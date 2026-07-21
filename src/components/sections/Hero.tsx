import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Slide {
  id: string;
  title: string;
  description: string;
  image_url: string;
  button_text: string;
  button_link: string;
}

// Fallback Default 5 Slides (Build Crash ஆகாமல் இருக்க)
const DEFAULT_SLIDES: Slide[] = [
  {
    id: '1',
    title: 'Speedex Signages & Advertising',
    description: 'Premier 2D/3D signage manufacturing, LED displays & vehicle graphics across UAE.',
    image_url: 'https://images.unsplash.com/photo-1542744094-3a3121699f11?w=1200&auto=format&fit=crop',
    button_text: 'Explore Signages',
    button_link: '/companies/speedex-signages',
  },
  {
    id: '2',
    title: 'Speedex Rent A Car & Leasing',
    description: 'Luxury vehicles, commercial fleets, and airport transfer services in Abu Dhabi & Dubai.',
    image_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop',
    button_text: 'View Fleet',
    button_link: '/companies/speedex-rent-a-car',
  },
  {
    id: '3',
    title: 'Excellent General Trading',
    description: 'Trusted supplier for Safety Products, Building Materials, Uniforms & Cleaning Supplies.',
    image_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop',
    button_text: 'Trading Products',
    button_link: '/companies/excellent-general-trading',
  },
  {
    id: '4',
    title: 'Arabsat Passenger Transport',
    description: 'Staff & Labour transportation, bus charters, and airport transport solutions.',
    image_url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&auto=format&fit=crop',
    button_text: 'Transport Services',
    button_link: '/companies/arabsat',
  },
  {
    id: '5',
    title: 'Speedex Auto Workshop',
    description: 'Advanced vehicle diagnostics, engine rebuilds, body shop, and routine maintenance.',
    image_url: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=1200&auto=format&fit=crop',
    button_text: 'Book Service',
    button_link: '/companies/speedex-workshop',
  },
];

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchSlides() {
      try {
        const { data, error } = await supabase
          .from('hero_slides')
          .select('*')
          .order('slide_order', { ascending: true })
          .limit(5);

        if (data && data.length > 0 && !error) {
          setSlides(data);
        }
      } catch (err) {
        // Fallback to DEFAULT_SLIDES on error
      }
    }
    fetchSlides();
  }, []);

  // Auto Slide Change (Every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  if (!slides.length) return null;

  return (
    <div className="relative w-full h-[80vh] min-h-[500px] max-h-[700px] bg-black overflow-hidden group">
      {/* Slide Background Image & Content */}
      {slides.map((slide, index) => (
        <div
          key={slide.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Overlay gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />
          <img
            src={slide.image_url}
            alt={slide.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
          />

          {/* Text Content */}
          <div className="absolute inset-0 z-20 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                <p className="text-sm sm:text-lg text-gray-200 line-clamp-3 leading-relaxed">
                  {slide.description}
                </p>
                <div className="pt-2">
                  <a
                    href={slide.button_link || '#'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
                  >
                    {slide.button_text || 'Learn More'} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ⬅️ Left Arrow Button */}
      <button
        onClick={prevSlide}
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/50 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all opacity-80 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* ➡️ Right Arrow Button */}
      <button
        onClick={nextSlide}
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-black/50 text-white hover:bg-primary border border-white/20 backdrop-blur-md transition-all opacity-80 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            type="button"
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-8 bg-primary' : 'w-2 bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
