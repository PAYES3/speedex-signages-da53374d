import { HeroSlider } from './HeroSlider';
import { ClientLogos } from './ClientLogos';
import SignageShowcase from './SignageShowcase';
import { ServicesSection } from './ServicesSection';
import { ProjectsSection } from './ProjectsSection';
import { AboutSection } from './AboutSection';
import { RichTextSection } from './RichTextSection';
import { BeforeAfter } from './BeforeAfter';
import { ProcessTimeline } from './ProcessTimeline';
import { FactoryShowcase } from './FactoryShowcase';
import { WhyChoose } from './WhyChoose';
import { Stats } from './Stats';
import { ProcessVideo } from './ProcessVideo';
import { Testimonials } from './Testimonials';
import { CustomerFeedback } from './CustomerFeedback';
import { SeoContent } from './SeoContent';
import { FAQ } from './FAQ';
import { CTABanner } from './CTABanner';
import { Location } from './Location';
import { OurCompanies } from './OurCompanies';
import { GroupsPromoVideo } from './GroupsPromoVideo';
import { useSiteSettings } from '@/hooks/useSiteSettings';

export type SectionRow = { id: string; section_type: string; data?: Record<string, string> | null };

function OurGroupsBlock({ data }: { data: Record<string, string> }) {
  return (
    <>
      <OurCompanies />
      <GroupsPromoVideo url={data.video_url} poster={data.video_poster} />
    </>
  );
}

export function SectionRenderer({ section }: { section: SectionRow }) {
  const s = useSiteSettings();
  const data = (section.data ?? {}) as Record<string, string>;

  switch (section.section_type) {
    case 'hero': return <HeroSlider />;
    case 'client_logos': return <ClientLogos />;
    case 'signage_showcase': return <SignageShowcase />;
    case 'about': return <AboutSection data={data} />;
    case 'services': return <ServicesSection data={data} />;
    case 'our_groups': return <OurGroupsBlock data={data} />;
    case 'before_after': return <BeforeAfter data={data} />;
    case 'process_timeline': return <ProcessTimeline />;
    case 'factory_showcase': return <FactoryShowcase />;
    case 'why_choose': return <WhyChoose />;
    case 'statistics': return <Stats />;
    case 'process_video': return <ProcessVideo />;
    case 'projects': return <ProjectsSection data={data} />;
    case 'testimonials': return <Testimonials />;
    case 'feedback_form': return <CustomerFeedback />;
    case 'seo_content': return <SeoContent />;
    case 'faq': return <FAQ />;
    case 'cta_banner': return <CTABanner />;
    case 'rich_text': return <RichTextSection data={data} />;
    case 'location':
      return (
        <Location
          address={s.office_address}
          phone={s.contact_phone}
          email={s.contact_email}
          mapsEmbedUrl={s.maps_embed_url}
          mapsDirectionsUrl={s.maps_directions_url || 'https://www.google.com/maps/place/Speedex+Auto+Workshop+L.L.C/@24.3564359,54.4925938,514m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5e4195316879d7:0xd4cfbd6175b97d6c!8m2!3d24.3564342!4d54.4935042'}
        />
      );
    default: return null;
  }
}
