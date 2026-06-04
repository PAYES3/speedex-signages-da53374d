import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { STATS } from '@/lib/site-data';
import { Reveal } from '@/components/Reveal';

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-foreground to-foreground/90 text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} direction="zoom" delay={i * 0.1}>
            <div className="text-center">
              <div className="text-5xl sm:text-6xl font-bold gradient-text">
                {inView ? <CountUp end={s.value} duration={2.5} separator="," /> : 0}{s.suffix}
              </div>
              <p className="mt-2 text-background/70 text-sm sm:text-base">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}