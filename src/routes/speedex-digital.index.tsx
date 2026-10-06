import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/Reveal';
import { useDigital } from '@/lib/digital/useDigital';
import { wrap, SectionHead, ServiceCategories, PortfolioGrid, ProcessSteps, Reasons, IndustriesList, TestimonialsBlock, FaqBlock, ContactCta, digitalHead } from '@/components/digital/blocks';

export const Route = createFileRoute('/speedex-digital/')({
  head: () => {
    const h = digitalHead('/speedex-digital', 'Speedex Digital | Web Design & Digital Marketing Agency in Abu Dhabi', 'Speedex Digital builds websites and online stores and runs SEO, Google Ads, social media and WhatsApp marketing for businesses across the UAE.');
    return { ...h, scripts: [{ type: 'application/ld+json', children: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ProfessionalService', name: 'Speedex Digital', slogan: 'Driving Business Growth Through Digital Solutions', url: 'https://www.speedexsignages.com/speedex-digital', telephone: '+971507761493', email: 'admin@excellentgroup.ae', address: { '@type': 'PostalAddress', addressLocality: 'Abu Dhabi', addressRegion: 'Mussaffah', addressCountry: 'AE' }, parentOrganization: { '@type': 'Organization', name: 'Speedex Group' } }) }] };
  },
  component: DigitalHome,
});

function DigitalHome() {
  const { settings: s, tr } = useDigital();
  const backgroundX = Math.min(100, Math.max(0, Number(s.hero_background_x) || 50));
  const backgroundY = Math.min(100, Math.max(0, Number(s.hero_background_y) || 50));
  const overlay = Math.min(90, Math.max(35, Number(s.hero_overlay) || 72));
  return (
    <div className="overflow-x-clip">
      <section className="relative isolate min-h-[min(740px,calc(100svh-4rem))] overflow-hidden flex items-center py-14 sm:py-20 lg:py-24">
        <img
          src={s.hero_background_url}
          alt=""
          width={1536}
          height={1024}
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: `${backgroundX}% ${backgroundY}%` }}
        />
        <div
          className="absolute inset-0 -z-10 bg-background"
          style={{ opacity: overlay / 100 }}
          aria-hidden="true"
        />
        <div className={`${wrap} w-full`}>
          <div className="max-w-3xl">
            <img src={s.logo_url} alt="Speedex Digital" width={1640} height={575} className="mb-7 h-auto w-48 sm:w-56" />
            <p className="text-xs font-bold uppercase tracking-wider text-primary">{tr('Digital Marketing · Abu Dhabi, UAE', 'التسويق الرقمي · أبوظبي، الإمارات')}</p>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-foreground">{tr(s.tagline, s.tagline_ar)}</h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-foreground/80">{tr(s.hero_text, s.hero_text_ar)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg"><Link to="/speedex-digital/contact">{tr('Get a Free Consultation', 'احصل على استشارة مجانية')} <ArrowRight /></Link></Button>
              <Button asChild size="lg" variant="outline"><Link to="/speedex-digital/services">{tr('Explore Our Services', 'استكشف خدماتنا')}</Link></Button>
            </div>
          </div>
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
