import { createFileRoute, Link } from '@tanstack/react-router';
import { Monitor, Tablet, Smartphone, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, PageHeader, SectionHead, ProcessSteps, PortfolioGrid, FaqBlock, ContactCta, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/web-design')({
  head: () => digitalHead('/speedex-digital/web-design', 'Website Designing in Abu Dhabi | Speedex Digital', 'Premium, responsive website design and development from Speedex Digital, with a user-centred UI/UX approach.'),
  component: WebDesign,
});

function WebDesign() {
  const { settings: s, services, tr } = useDigital();
  const draftly = s.draftly_url?.trim();
  const caps = services.filter((x) => x.category === 'web').slice(0, 6);
  return <>
    <PageHeader kicker={tr('Website Designing', 'تصميم المواقع')} title={tr('Websites Designed to Impress and Convert', 'مواقع مصممة لتبهر وتحقق النتائج')} text={tr('Premium, responsive websites crafted around your brand and your customers.', 'مواقع راقية ومتجاوبة مصممة حول علامتك وعملائك.')}>
      {draftly
        ? <Button asChild size="lg"><a href={draftly} target="_blank" rel="noopener noreferrer">{tr('Get Experience', 'جرّب التجربة')} <ExternalLink /></a></Button>
        : <Button size="lg" disabled title="Coming soon">{tr('Get Experience — coming soon', 'جرّب التجربة — قريباً')}</Button>}
      <Button asChild size="lg" variant="outline"><Link to="/speedex-digital/contact">{tr('Get a Consultation', 'احصل على استشارة')}</Link></Button>
    </PageHeader>
    <section className="py-16 sm:py-24"><div className={wrap}>
      <SectionHead kicker={tr('Capabilities', 'القدرات')} title={tr('Design and Development Capabilities', 'قدرات التصميم والتطوير')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{caps.map((c) => <Link key={c.slug} to="/speedex-digital/services/$slug" params={{ slug: c.slug }} className="rounded-xl border border-border p-6 hover:border-primary"><h3 className="font-bold">{tr(c.title, c.title_ar)}</h3><p className="mt-2 text-sm text-muted-foreground">{tr(c.summary, c.summary_ar)}</p></Link>)}</div>
    </div></section>
    <section className="py-16 sm:py-24 bg-muted/40"><div className={wrap}>
      <SectionHead kicker={tr('Responsive', 'متجاوب')} title={tr('Perfect on Every Screen', 'مثالي على كل شاشة')} />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">{[[Monitor, 'Desktop', 'الحاسوب'], [Tablet, 'Tablet', 'الجهاز اللوحي'], [Smartphone, 'Mobile', 'الهاتف']].map(([Icon, en, ar]) => { const I = Icon as typeof Monitor; return <div key={en as string} className="rounded-xl border border-border bg-card p-6 text-center"><I className="mx-auto h-10 w-10 text-primary" /><p className="mt-3 font-bold">{tr(en as string, ar as string)}</p><p className="mt-1 text-sm text-muted-foreground">{tr('Layouts tested and refined for this screen size.', 'تصاميم مختبرة ومحسّنة لهذا الحجم.')}</p></div>; })}</div>
    </div></section>
    <section className="py-16 sm:py-24"><div className={wrap}>
      <SectionHead kicker="UI/UX" title={tr('Our UI/UX Approach', 'نهجنا في تجربة المستخدم')} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">{[tr('Research your users and goals', 'دراسة المستخدمين والأهداف'), tr('Map clear user journeys', 'رسم رحلات مستخدم واضحة'), tr('Wireframe and prototype', 'نماذج أولية تفاعلية'), tr('Polished, accessible interface design', 'تصميم واجهات أنيق وسهل الوصول')].map((x) => <li key={x} className="flex gap-3"><Check className="mt-1 h-5 w-5 text-primary" />{x}</li>)}</ul>
    </div></section>
    <section className="py-16 sm:py-24 bg-muted/40"><div className={wrap}><SectionHead kicker={tr('Showcase', 'أعمالنا')} title={tr('Website Projects', 'مشاريع المواقع')} /><PortfolioGrid limit={6} /></div></section>
    <section className="py-16 sm:py-24"><div className={wrap}><SectionHead kicker={tr('Process', 'آلية العمل')} title={tr('Design and Development Process', 'مراحل التصميم والتطوير')} /><ProcessSteps /></div></section>
    <section className="py-16 sm:py-24 bg-muted/40"><div className={`${wrap} max-w-4xl`}><SectionHead kicker="FAQ" title={tr('Frequently Asked Questions', 'الأسئلة الشائعة')} /><FaqBlock /></div></section>
    <ContactCta />
  </>;
}
