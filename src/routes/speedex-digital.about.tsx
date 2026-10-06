import { createFileRoute } from '@tanstack/react-router';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, PageHeader, SectionHead, ProcessSteps, Reasons, ContactCta, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/about')({
  head: () => digitalHead('/speedex-digital/about', 'About Speedex Digital | Abu Dhabi Digital Agency', 'Learn about Speedex Digital, the web design and digital marketing company of Speedex Group in Abu Dhabi.'),
  component: About,
});

function About() {
  const { settings: s, tr } = useDigital();
  return <>
    <PageHeader kicker={tr('About us', 'من نحن')} title={tr(s.tagline, s.tagline_ar)} text={tr(s.about_text, s.about_text_ar)} />
    <section className="py-20 sm:py-28"><div className={wrap}><SectionHead kicker={tr('Why us', 'لماذا نحن')} title={tr('What Makes Us Different', 'ما يميزنا')} /><Reasons /></div></section>
    <section className="py-20 sm:py-28 bg-muted/40"><div className={wrap}><SectionHead kicker={tr('Our process', 'آلية عملنا')} title={tr('How We Work', 'كيف نعمل')} /><ProcessSteps /></div></section>
    <ContactCta />
  </>;
}
