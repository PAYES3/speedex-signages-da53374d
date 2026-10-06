import { createFileRoute } from '@tanstack/react-router';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, PageHeader, ConsultationForm, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/contact')({
  head: () => digitalHead('/speedex-digital/contact', 'Contact Speedex Digital | Get a Consultation', 'Contact Speedex Digital in Abu Dhabi for a consultation and tailored quote on websites and digital marketing.'),
  component: Contact,
});

function Contact() {
  const { settings: s, tr } = useDigital();
  const row = 'flex gap-3 text-foreground hover:text-primary break-all';
  return <>
    <PageHeader kicker={tr('Contact', 'تواصل معنا')} title={tr('Get a Consultation', 'احصل على استشارة')} text={tr('Tell us about your goals and our team will reply with a tailored plan and quote.', 'أخبرنا بأهدافك وسيرد فريقنا بخطة وعرض سعر مخصص.')} />
    <section className="py-16 sm:py-24"><div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_1.6fr]`}>
      <div className="space-y-5">
        <a href={`tel:${s.phone.replace(/\s/g, '')}`} className={row}><Phone className="h-5 w-5 shrink-0 text-primary" />{s.phone}</a>
        <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className={row}><MessageCircle className="h-5 w-5 shrink-0 text-primary" />WhatsApp</a>
        <a href={`mailto:${s.email}`} className={row}><Mail className="h-5 w-5 shrink-0 text-primary" />{s.email}</a>
        <p className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-primary" />{s.address}</p>
      </div>
      <ConsultationForm />
    </div></section>
  </>;
}
