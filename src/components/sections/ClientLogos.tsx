import { useTranslation } from 'react-i18next';
import { CLIENTS } from '@/lib/site-data';

/** Seamless right-to-left client ticker. The track is duplicated so the loop never jumps. */
export function ClientLogos({ data }: { data?: Record<string, string> }) {
  const { t } = useTranslation();
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <section className="border-y border-border bg-white overflow-hidden" style={{ paddingBlock: 'clamp(2.25rem, 4vw, 3.5rem)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="text-center uppercase tracking-[0.3em] text-muted-foreground font-semibold"
          style={{ fontSize: 'clamp(0.65rem, 1.4vw, 0.875rem)', marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)' }}
        >
          {data?.title?.trim() || t('clients.title')}
        </p>
      </div>

      <div className="marquee">
        <div className="marquee-track">
          {track.map((c, i) => (
            <span
              key={`${c}-${i}`}
              aria-hidden={i >= CLIENTS.length}
              className="marquee-item font-bold text-muted-foreground/60 whitespace-nowrap hover:text-primary transition-colors duration-300"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 1.35rem)' }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
