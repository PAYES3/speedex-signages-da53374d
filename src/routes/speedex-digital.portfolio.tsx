import { createFileRoute } from '@tanstack/react-router';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, PageHeader, PortfolioGrid, TestimonialsBlock, ContactCta, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/portfolio')({
  head: () => digitalHead('/speedex-digital/portfolio', 'Portfolio | Speedex Digital', 'Websites, online stores and digital campaigns delivered by Speedex Digital.'),
  component: Portfolio,
});

function Portfolio() {
  const { tr } = useDigital();
  return <>
    <PageHeader kicker={tr('Portfolio', 'أعمالنا')} title={tr('Our Work', 'أعمالنا')} text={tr('A selection of websites and digital projects delivered by our team.', 'مجموعة مختارة من المواقع والمشاريع الرقمية التي نفذها فريقنا.')} />
    <section className="py-16 sm:py-24"><div className={wrap}><PortfolioGrid /></div></section>
    <TestimonialsBlock />
    <ContactCta />
  </>;
}
