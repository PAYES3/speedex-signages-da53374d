import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Reveal } from '@/components/Reveal';
import { publicGetCompany } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export const Route = createFileRoute('/companies/$slug')({
  head: ({ params }) => {
    const titleText = slugToTitle(params.slug);
    return {
      meta: [
        { title: `${titleText} | Speedex Group UAE` },
        { name: 'description', content: `${titleText} — part of Speedex Group UAE.` },
        { property: 'og:title', content: `${titleText} | Speedex Group` },
        { property: 'og:url', content: `https://speedex-signages.lovable.app/companies/${params.slug}` },
      ],
      links: [{ rel: 'canonical', href: `https://speedex-signages.lovable.app/companies/${params.slug}` }],
    };
  },
  component: CompanyDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-4 text-center bg-background text-foreground">
      <div>
        <h1 className="text-3xl font-bold">Company not found</h1>
        <Link to="/companies" className="mt-4 inline-block text-primary font-medium hover:underline">
          ← Back to companies
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center px-4 text-center bg-background text-foreground">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2 font-medium">{error.message}</p>
      </div>
    </div>
  ),
});

function slugToTitle(slug: string) {
  if (!slug) return 'Company Details';
  return slug
    .split('-')
    .map((w) => (w[0] ? w[0].toUpperCase() + w.slice(1) : ''))
    .join(' ');
}

function CompanyDetailPage() {
  const { slug } = Route.useParams();
  const fetcher = useServerFn(publicGetCompany);
  
  const { data: company, isLoading } = useQuery({
    queryKey: ['public-company', slug],
    queryFn: () => fetcher({ data: { slug } }),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background text-muted-foreground font-medium">
        Loading…
      </div>
    );
  }

  if (!company) {
    throw notFound();
  }

  const accent = company.accent_color || '#F58220';
  const servicesList = Array.isArray(company.services) ? company.services : [];

  return (
    <>
      {/* Hero Header Area Panel wrapper */}
      <section
        className="relative pt-32 pb-20 overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 30%, black))` }}
      >
        {company.hero_image && (
          <img 
            src={company.hero_image} 
            alt={company.name} 
            className="absolute inset-0 w-full h-full object-cover opacity-30 select-none pointer-events-none" 
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <Link to="/companies" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> All companies
          </Link>
          
          <div className="flex items-center gap-3 mt-6">
            <Building2 className="w-5 h-5 text-white/90" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/80 font-bold">Speedex Group</p>
          </div>
          
          <h1 className="mt-3 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            {company.name}
          </h1>
          
          {company.tagline && (
            <p className="mt-3 text-lg text-white/90 font-semibold tracking-wide">
              {company.tagline}
            </p>
          )}
          
          <p className="mt-6 text-white/85 max-w-3xl text-lg leading-relaxed font-normal">
            {company.description}
          </p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90 font-bold shadow-sm rounded-xl">
                Request a Quote <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur font-bold rounded-xl">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Iteration section mapping */}
      <section className="py-20 bg-background text-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <p className="text-primary text-sm font-bold uppercase tracking-wider">Services</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">What we deliver</h2>
          </Reveal>
          
          {servicesList.length > 0 ? (
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {servicesList.map((s, i) => (
                <Reveal key={s} direction="up" delay={i * 0.05}>
                  <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-3 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <p className="font-semibold text-card-foreground leading-snug">{s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-10 text-muted-foreground text-sm font-medium">
              No specific operational service data structures detailed currently.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
