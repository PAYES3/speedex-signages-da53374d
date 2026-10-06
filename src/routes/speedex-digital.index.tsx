import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, SectionHead, ServiceCategories, PortfolioGrid, ProcessSteps, Reasons, IndustriesList, TestimonialsBlock, FaqBlock, ContactCta, digitalHead } from '@/components/digital/blocks';
import workspace from '@/assets/speedex-digital-workspace.jpg';

export const Route = createFileRoute('/speedex-digital/')({
  head: () => {
    const h = digitalHead('/speedex-digital', 'Speedex Digital | Web Design & Digital Marketing Agency in Abu Dhabi', 'Speedex Digital builds websites and online stores and runs SEO, Google Ads, social media and WhatsApp marketing for businesses across the UAE.');
    return { ...h, scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Speedex Digital', slogan: 'Driving Business Growth Through Digital Solutions', url: 'https://www.speedexsignages.com/speedex-digital', telephone: '+971507761493', email: 'admin@excellentgroup.ae', address: { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressRegion: 'Mussaffah', addressCountry: 'AE' }, parentOrganization: { '@type': 'Organization', name: 'Speedex Group' } }) }] };
  },
  component: DigitalHome,
});

function DigitalHome() {
  const { settings: s, tr } = useDigital();
  return (
    <div className="overflow-x-clip">
      <section className="bg-background py-14 sm:py-20 lg:py-24">
        <div className={`${wrap} grid items-center gap-10 lg:grid-cols-2`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-primary">{tr('Speedex Digital · Abu Dhabi, UAE', 'سبيدكس ديجيتال · أبوظبي، الإمارات')}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-foreground">{tr(s.tagline, s.tagline_ar)}</h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">{tr(s.hero_text, s.hero_text_ar)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/speedex-digital/services">{tr('Explore Our Services', 'استكشف خدماتنا')} <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/speedex-digital/contact">{tr('Get a Consultation', 'احصل على استشارة')}</Link></Button>
            </div>
          </div>
          <img src={workspace} width={1536} height={1024} fetchPriority="high" alt="Speedex Digital team planning websites and campaigns" className="w-full h-auto rounded-2xl border border-border shadow-xl" />
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-muted/40"><div className={wrap}>
        <SectionHead kicker={tr('Our services', 'خدماتنا')} title={tr('Web & Design and Digital Marketing', 'الويب والتصميم والتسويق الرقمي')} text={tr('Two expert teams, one partner for your digital growth.', 'فريقان متخصصان وشريك واحد لنموك الرقمي.')} />
        <ServiceCategories />
      </div></section>

      <section className="py-20 sm:py-28"><div className={wrap}>
        <SectionHead kicker={tr('Portfolio', 'أعمالنا')} title={tr('Selected Projects', 'مشاريع مختارة')} />
        <PortfolioGrid limit={3} />
      </div></section>

      <section className="py-20 sm:py-28 bg-muted/40"><div className={wrap}>
        <SectionHead kicker={tr('Our process', 'آلية عملنا')} title={tr('How We Deliver Results', 'كيف نحقق النتائج')} />
        <ProcessSteps />
      </div></section>

      <section className="py-20 sm:py-28"><div className={wrap}>
        <SectionHead kicker={tr('Why us', 'لماذا نحن')} title={tr('Why Choose Speedex Digital', 'لماذا تختار سبيدكس ديجيتال')} />
        <Reasons />
      </div></section>

      <section className="py-20 sm:py-28 bg-muted/40"><div className={wrap}>
        <SectionHead kicker={tr('Industries', 'القطاعات')} title={tr('Industries We Serve', 'القطاعات التي نخدمها')} />
        <IndustriesList />
      </div></section>

      <TestimonialsBlock />

      <section className="py-20 sm:py-28"><div className={`${wrap} max-w-4xl`}>
        <Reveal><SectionHead kicker="FAQ" title={tr('Frequently Asked Questions', 'الأسئلة الشائعة')} /></Reveal>
        <FaqBlock />
      </div></section>

      <ContactCta />
    </div>
  );
}
