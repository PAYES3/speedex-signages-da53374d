import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Reveal } from '@/components/Reveal';
import { publicGetCompany } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';

export const Route = createFileRoute('/companies/$slug')({
  head: ({ params }) => ({
    meta: [
      { title: `${slugToTitle(params.slug)} | Speedex Group UAE` },
      { name: 'description', content: `${slugToTitle(params.slug)} — part of Speedex Group UAE.` },
      { property: 'og:title', content: `${slugToTitle(params.slug)} | Speedex Group` },
      { property: 'og:url', content: `https://speedex-signages.lovable.app/companies/${params.slug}` },
    ],
    links: [{ rel: 'canonical', href: `https://speedex-signages.lovable.app/companies/${params.slug}` }],
  }),
  component: CompanyDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Company not found</h1>
        <Link to="/companies" className="mt-4 inline-block text-primary">← Back to companies</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
      </div>
    </div>
  ),
});

function slugToTitle(slug: string) {
  return slug.split('-').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ');
}

function CompanyDetailPage() {
  const { slug } = Route.useParams();
  const fetcher = useServerFn(publicGetCompany);
  const { data: company, isLoading } = useQuery({
    queryKey: ['public-company', slug],
    queryFn: () => fetcher({ data: { slug } }),
  });

  if (!isLoading && !company) {
    throw notFound();
  }

  if (!company) {
    return <div className="min-h-screen grid place-items-center">Loading…</div>;
  }

  const accent = company.accent_color || '#0E7C7B';

  return (
    <>
      <section
        className="relative pt-32 pb-20 overflow-hidden text-white"
        style={{ background: `linear-gradient(135deg, ${accent}, color-mix(in oklab, ${accent} 30%, black))` }}
      >
        {company.hero_image && (
          <img src={company.hero_image} alt={company.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <Link to="/companies" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm">
            <ArrowLeft className="w-4 h-4" /> All companies
          </Link>
          <div className="flex items-center gap-3 mt-6">
            <Building2 className="w-5 h-5" />
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">Speedex Group</p>
          </div>
          <h1 className="mt-3 text-4xl sm:text-6xl font-bold tracking-tight">{company.name}</h1>
          {company.tagline && <p className="mt-3 text-lg text-white/90 font-medium">{company.tagline}</p>}
          <p className="mt-6 text-white/85 max-w-3xl text-lg leading-relaxed">{company.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button size="lg" variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur">
                View Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Services</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">What we deliver</h2>
          </Reveal>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {(company.services as string[]).map((s, i) => (
              <Reveal key={s} direction="up" delay={i * 0.05}>
                <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-3 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="font-medium">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}