import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { STATS } from '@/lib/site-data';
import { Reveal } from '@/components/Reveal';

export function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <section ref={ref} className="py-24 bg-[#FAF7F2] border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} direction="zoom" delay={i * 0.1}>
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-extrabold text-foreground tracking-tight">
                {inView ? <CountUp end={s.value} duration={2.5} separator="," /> : 0}
                <span className="text-primary">{s.suffix}</span>
              </div>
              <div className="mt-3 mx-auto w-10 h-[3px] rounded-full bg-primary" />
              <p className="mt-3 text-muted-foreground text-base sm:text-lg font-medium">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}