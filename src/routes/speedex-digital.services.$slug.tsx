import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDigital } from '@/lib/digital/useDigital';
import { DIGITAL_SERVICES } from '@/lib/digital/defaults';
import { wrap, PageHeader, SectionHead, ProcessSteps, ConsultationForm, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/services/$slug')({
  loader: ({ params }) => {
    const svc = DIGITAL_SERVICES.find((s) => s.slug === params.slug);
    return { title: svc?.title ?? 'Service', summary: svc?.summary ?? '' };
  },
  head: ({ params, loaderData }) => digitalHead(`/speedex-digital/services/${params.slug}`, `${loaderData?.title ?? 'Service'} | Speedex Digital Abu Dhabi`, loaderData?.summary || 'Digital services from Speedex Digital in Abu Dhabi, UAE.'),
  component: ServiceDetail,
  notFoundComponent: () => <div className="p-20 text-center">Service not found.</div>,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { services, tr } = useDigital();
  const svc = services.find((s) => s.slug === slug);
  if (!svc) throw notFound();
  const related = services.filter((s) => s.category === svc.category && s.slug !== svc.slug).slice(0, 4);
  return <>
    <PageHeader kicker={svc.category === 'web' ? tr('Web & Design', 'الويب والتصميم') : tr('Digital Marketing', 'التسويق الرقمي')} title={tr(svc.title, svc.title_ar)} text={tr(svc.summary, svc.summary_ar)}>
      <Button asChild size="lg"><a href="#quote">{tr('Request a Quote', 'اطلب عرض سعر')}</a></Button>
      {svc.slug === 'website-designing' && <Button asChild size="lg" variant="outline"><Link to="/speedex-digital/web-design">{tr('See our web design approach', 'تعرّف على نهجنا في التصميم')}</Link></Button>}
    </PageHeader>
    <section className="py-16 sm:py-24"><div className={`${wrap} grid gap-12 lg:grid-cols-2`}>
      <div><h2 className="text-2xl sm:text-3xl font-bold">{tr('Overview', 'نظرة عامة')}</h2><p className="mt-4 text-lg text-muted-foreground leading-relaxed">{tr(svc.body, svc.body_ar)}</p></div>
      <div><h2 className="text-2xl sm:text-3xl font-bold">{tr('What you get', 'ما تحصل عليه')}</h2><ul className="mt-4 space-y-3">{svc.benefits.map((b) => <li key={b} className="flex gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-primary" />{b}</li>)}</ul></div>
    </div></section>
    <section className="py-16 sm:py-24 bg-muted/40"><div className={wrap}><SectionHead kicker={tr('Process', 'آلية العمل')} title={tr('How We Deliver', 'كيف ننفذ')} /><ProcessSteps /></div></section>
    {related.length > 0 && <section className="py-16"><div className={wrap}><h2 className="text-2xl font-bold">{tr('Related services', 'خدمات ذات صلة')}</h2><div className="mt-6 flex flex-wrap gap-3">{related.map((r) => <Link key={r.slug} to="/speedex-digital/services/$slug" params={{ slug: r.slug }} className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">{tr(r.title, r.title_ar)}</Link>)}</div></div></section>}
    <section id="quote" className="py-16 sm:py-24 bg-muted/40"><div className={`${wrap} max-w-4xl`}><SectionHead kicker={tr('Get started', 'ابدأ الآن')} title={tr('Request a Quote', 'اطلب عرض سعر')} /><div className="mt-8"><ConsultationForm defaultService={svc.title} /></div></div></section>
  </>;
}
