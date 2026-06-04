import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground p-10 md:p-16 text-center">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/30 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-5xl font-bold">Ready to light up your brand?</h2>
              <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto">Tell us about your project — we'll get back with a tailored quote within one business day.</p>
              <Link to="/contact">
                <Button size="lg" className="mt-8 bg-foreground text-background hover:bg-foreground/90">
                  Get a Quote <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}