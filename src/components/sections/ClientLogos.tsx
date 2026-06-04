import { CLIENTS } from '@/lib/site-data';

export function ClientLogos() {
  return (
    <section className="py-12 border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">Trusted by leading brands across the UAE</p>
        <div className="flex gap-12 items-center justify-center flex-wrap opacity-70">
          {CLIENTS.map((c) => (
            <div key={c} className="text-xl font-bold text-muted-foreground hover:text-primary transition-colors">{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
}