import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FAQ as DATA } from '@/lib/site-data';
import { Reveal } from '@/components/Reveal';

export function FAQ() {
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">FAQ</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">Frequently asked</h2>
          </div>
        </Reveal>
        <Reveal direction="up">
          <Accordion type="single" collapsible className="bg-card rounded-2xl p-2 border border-border">
            {DATA.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`} className="px-4">
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}