import { CLIENTS } from '@/lib/site-data';

export function ClientLogos() {
  return (
    <section className="py-14 border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8 font-semibold">
          Trusted by leading brands across the UAE
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 items-center justify-items-center">
          {CLIENTS.map((c) => (
            <div
              key={c}
              className="text-lg sm:text-xl font-bold text-muted-foreground/60 grayscale hover:grayscale-0 hover:text-primary transition-all duration-300"
            >
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}