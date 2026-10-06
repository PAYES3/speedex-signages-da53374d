import { createFileRoute } from '@tanstack/react-router';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, PageHeader, IndustriesList, ContactCta, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/industries')({
  head: () => digitalHead('/speedex-digital/industries', 'Industries We Serve | Speedex Digital', 'Speedex Digital builds websites and runs digital marketing for automotive, real estate, retail, healthcare, hospitality and more across the UAE.'),
  component: Industries,
});

function Industries() {
  const { tr } = useDigital();
  return <>
    <PageHeader kicker={tr('Industries', 'القطاعات')} title={tr('Industries We Serve', 'القطاعات التي نخدمها')} text={tr('We understand the customers and competition in the UAE sectors we work with.', 'نفهم العملاء والمنافسة في القطاعات التي نعمل بها في الإمارات.')} />
    <section className="py-16 sm:py-24"><div className={wrap}><IndustriesList /></div></section>
    <ContactCta />
  </>;
}
