import { createFileRoute } from '@tanstack/react-router';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, PageHeader, ServiceCategories, ContactCta, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/services/')({
  head: () => digitalHead('/speedex-digital/services', 'Services | Speedex Digital', 'Website development, design, e-commerce, SEO, Google Ads, social media and WhatsApp marketing services from Speedex Digital.'),
  component: Services,
});

function Services() {
  const { tr } = useDigital();
  return <>
    <PageHeader kicker={tr('Services', 'الخدمات')} title={tr('Web & Design and Digital Marketing Services', 'خدمات الويب والتصميم والتسويق الرقمي')} text={tr('Everything you need to build, launch and grow your business online.', 'كل ما تحتاجه لبناء أعمالك وإطلاقها وتنميتها رقمياً.')} />
    <section className="py-16 sm:py-24"><div className={wrap}><ServiceCategories /></div></section>
    <ContactCta />
  </>;
}
