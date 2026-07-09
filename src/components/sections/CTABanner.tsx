import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="zoom">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF6EC] via-white to-[#FFEBD5] border border-primary/20 p-12 md:p-20 text-center shadow-[var(--shadow-elegant)]">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#D4A017]/20 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-primary text-sm font-semibold uppercase tracking-[0.25em]">Start your project</p>
              <h2 className="mt-3 text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight">Ready to elevate your brand?</h2>
              <p className="mt-5 text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">Tell us about your project — we'll respond with a tailored quote within one business day.</p>
              <Link to="/contact">
                <Button size="lg" className="mt-8 h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-[0_14px_36px_-12px_rgba(245,130,32,0.55)]">
                  Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}