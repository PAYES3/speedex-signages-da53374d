import { Link } from '@tanstack/react-router';
import { useState, type FormEvent, type ReactNode } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Reveal } from '@/components/Reveal';
import { submitDigitalConsultation } from '@/lib/api/forms.functions';
import { useDigital } from '@/lib/digital/useDigital';
import { DIGITAL_STEPS, DIGITAL_REASONS } from '@/lib/digital/defaults';

export const wrap = 'mx-auto max-w-7xl px-5 sm:px-8 lg:px-10';
export const eyebrow = 'text-xs font-bold uppercase tracking-wider text-primary';
export const h2 = 'mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-foreground';

export function SectionHead({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return <Reveal><p className={eyebrow}>{kicker}</p><h2 className={h2}>{title}</h2>{text && <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{text}</p>}</Reveal>;
}

export function PageHeader({ kicker, title, text, children }: { kicker: string; title: string; text: string; children?: ReactNode }) {
  return (
    <section className="border-b border-border bg-muted/40 py-16 sm:py-24">
      <div className={wrap}>
        <p className={eyebrow}>{kicker}</p>
        <h1 className="mt-3 max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-foreground">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{text}</p>
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function ServiceCategories({ limit }: { limit?: number }) {
  const { services, tr } = useDigital();
  const groups = [
    { key: 'web', title: tr('Web & Design', 'الويب والتصميم') },
    { key: 'marketing', title: tr('Digital Marketing', 'التسويق الرقمي') },
  ] as const;
  return (
    <div className="mt-12 grid gap-8 lg:grid-cols-2">
      {groups.map((g) => (
        <div key={g.key} className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-foreground">{g.title}</h3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {services.filter((s) => s.category === g.key).slice(0, limit).map((s) => (
              <Link key={s.slug} to="/speedex-digital/services/$slug" params={{ slug: s.slug }} className="group rounded-lg border border-border p-4 transition hover:border-primary hover:shadow-md">
                <p className="font-semibold text-foreground group-hover:text-primary">{tr(s.title, s.title_ar)}</p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{tr(s.summary, s.summary_ar)}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProcessSteps() {
  const { tr } = useDigital();
  return (
    <div className="mt-12 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {DIGITAL_STEPS.map(([t, d, ta, da], i) => (
        <Reveal key={t}><div className="border-t-2 border-primary pt-5"><span className="text-sm font-bold text-primary">{String(i + 1).padStart(2, '0')}</span><h3 className="mt-3 text-xl font-bold">{tr(t, ta)}</h3><p className="mt-2 text-muted-foreground">{tr(d, da)}</p></div></Reveal>
      ))}
    </div>
  );
}

export function Reasons() {
  const { tr } = useDigital();
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {DIGITAL_REASONS.map(([t, d, ta, da]) => (
        <div key={t} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-primary" /><div><h3 className="font-bold">{tr(t, ta)}</h3><p className="mt-1 text-sm text-muted-foreground">{tr(d, da)}</p></div></div>
      ))}
    </div>
  );
}

export function IndustriesList() {
  const { industries, tr } = useDigital();
  return <div className="mt-10 flex flex-wrap gap-3">{industries.map((i) => <span key={i.name} className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold">{tr(i.name, i.name_ar)}</span>)}</div>;
}

export function PortfolioGrid({ limit }: { limit?: number }) {
  const { portfolio, tr } = useDigital();
  if (!portfolio.length) return <p className="mt-10 rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">{tr('Our latest projects will be published here soon.', 'سننشر أحدث مشاريعنا هنا قريباً.')}</p>;
  return (
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {portfolio.slice(0, limit).map((p) => (
        <article key={p.id} className="overflow-hidden rounded-xl border border-border bg-card">
          {p.image_url && <div className="aspect-[4/3] bg-muted"><img src={p.image_url} alt={p.title} loading="lazy" className="h-full w-full object-contain" /></div>}
          <div className="p-5"><p className={eyebrow}>{p.category}</p><h3 className="mt-2 text-lg font-bold">{tr(p.title, p.title_ar)}</h3><p className="mt-2 text-sm text-muted-foreground">{tr(p.description, p.description_ar)}</p>
            {p.link_url && <a href={p.link_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">{tr('View project', 'عرض المشروع')} <ArrowRight className="h-4 w-4" /></a>}</div>
        </article>
      ))}
    </div>
  );
}

export function TestimonialsBlock() {
  const { testimonials, tr } = useDigital();
  if (!testimonials.length) return null;
  return (
    <section className="py-20 sm:py-28 bg-muted/40"><div className={wrap}>
      <SectionHead kicker={tr('Testimonials', 'آراء العملاء')} title={tr('What Our Clients Say', 'ماذا يقول عملاؤنا')} />
      <div className="mt-12 grid gap-6 md:grid-cols-3">{testimonials.map((t) => (
        <figure key={t.id} className="rounded-xl border border-border bg-card p-6"><div className="flex gap-0.5 text-primary">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div><blockquote className="mt-4 text-foreground">“{tr(t.quote, t.quote_ar)}”</blockquote><figcaption className="mt-4 text-sm font-semibold">{t.name}{t.company && <span className="font-normal text-muted-foreground"> · {t.company}</span>}</figcaption></figure>
      ))}</div>
    </div></section>
  );
}

export function FaqBlock() {
  const { faqs, tr } = useDigital();
  return (
    <Accordion type="single" collapsible className="mt-10">
      {faqs.map((f, i) => <AccordionItem key={i} value={`f${i}`}><AccordionTrigger className="text-start text-base font-semibold">{tr(f.question, f.question_ar)}</AccordionTrigger><AccordionContent className="text-muted-foreground">{tr(f.answer, f.answer_ar)}</AccordionContent></AccordionItem>)}
    </Accordion>
  );
}

export function ContactCta() {
  const { tr, wa } = useDigital();
  return (
    <section className="py-20 sm:py-24 bg-primary text-primary-foreground"><div className={`${wrap} flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between`}>
      <div><h2 className="text-3xl sm:text-4xl font-extrabold">{tr('Ready to grow your business online?', 'هل أنت مستعد لتنمية أعمالك رقمياً؟')}</h2><p className="mt-3 text-lg opacity-90">{tr('Talk to our team and get a tailored plan and quote.', 'تحدث مع فريقنا واحصل على خطة وعرض سعر مخصص.')}</p></div>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg" variant="secondary"><Link to="/speedex-digital/contact">{tr('Get a Consultation', 'احصل على استشارة')}</Link></Button>
        <Button asChild size="lg" variant="outline" className="border-primary-foreground/60 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><a href={wa('Hello Speedex Digital, I would like to talk to your team.')} target="_blank" rel="noopener noreferrer">{tr('Talk to Our Team', 'تحدث مع فريقنا')}</a></Button>
      </div>
    </div></section>
  );
}

export function ConsultationForm({ defaultService }: { defaultService?: string }) {
  const { services, tr } = useDigital();
  const submit = useServerFn(submitDigitalConsultation);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setSending(true);
    try {
      await submit({ data: { name: String(f.get('name') || ''), company: String(f.get('company') || ''), phone: String(f.get('phone') || ''), email: String(f.get('email') || ''), service: String(f.get('service') || 'Other'), message: String(f.get('message') || '') } });
      form.reset(); setSent(true);
      toast.success(tr('Thank you! Your request has been received.', 'شكراً لك! تم استلام طلبك.'));
    } catch {
      toast.error(tr('We could not send your request. Please try again.', 'تعذر إرسال طلبك. يرجى المحاولة مجدداً.'));
    } finally { setSending(false); }
  }
  const label = 'mb-1.5 block text-sm font-semibold';
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-xl border border-border bg-card p-6 sm:p-8 sm:grid-cols-2">
      <div><label className={label} htmlFor="d-name">{tr('Full name', 'الاسم الكامل')}</label><Input id="d-name" name="name" required maxLength={120} /></div>
      <div><label className={label} htmlFor="d-company">{tr('Company', 'الشركة')}</label><Input id="d-company" name="company" maxLength={120} /></div>
      <div><label className={label} htmlFor="d-phone">{tr('Phone / WhatsApp', 'الهاتف / واتساب')}</label><Input id="d-phone" name="phone" required minLength={5} maxLength={40} /></div>
      <div><label className={label} htmlFor="d-email">{tr('Email', 'البريد الإلكتروني')}</label><Input id="d-email" name="email" type="email" required maxLength={255} /></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="d-service">{tr('Service of interest', 'الخدمة المطلوبة')}</label>
        <select id="d-service" name="service" defaultValue={defaultService ?? ''} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
          <option value="Other">{tr('Not sure yet', 'لست متأكداً بعد')}</option>
          {services.map((s) => <option key={s.slug} value={s.title}>{tr(s.title, s.title_ar)}</option>)}
        </select></div>
      <div className="sm:col-span-2"><label className={label} htmlFor="d-msg">{tr('Message', 'الرسالة')}</label><Textarea id="d-msg" name="message" required minLength={5} maxLength={2800} rows={4} /></div>
      <div className="sm:col-span-2"><Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">{sending ? tr('Sending…', 'جارٍ الإرسال…') : tr('Request a Quote', 'اطلب عرض سعر')}</Button>
        {sent && <p className="mt-3 text-sm text-primary">{tr('Our team will contact you shortly.', 'سيتواصل معك فريقنا قريباً.')}</p>}</div>
    </form>
  );
}

export function digitalHead(path: string, title: string, description: string) {
  const url = `https://www.speedexsignages.com${path}`;
  return {
    meta: [
      { title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' }, { property: 'og:url', content: url },
      { property: 'og:site_name', content: 'Speedex Digital' }, { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: url }],
  };
}
