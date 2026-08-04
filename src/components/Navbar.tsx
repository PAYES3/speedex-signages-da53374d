import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Languages, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { useSiteLogo, useFaviconSync } from '@/hooks/useSiteSettings';
import { COMPANY } from '@/lib/site-data';

const NAV = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/explore', key: 'explore' },
  { to: '/products', key: 'products' },
  { to: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const logo = useSiteLogo();
  useFaviconSync();

  const listCompanies = useServerFn(publicListCompanies);
  const { data: companies } = useQuery({
    queryKey: ['public-companies'],
    queryFn: () => listCompanies(),
    staleTime: 60_000,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMega(false);
  }, [path]);

  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  const linkClass =
    'px-3 py-2 text-[15px] font-semibold text-foreground/85 hover:text-primary transition-colors relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(0,0,0,0.25)] border-b border-border py-2'
          : 'bg-white/70 backdrop-blur-lg border-b border-transparent py-3'
      }`}
      onMouseLeave={() => setMega(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label={COMPANY.name}>
          <img
            src={logo}
            alt={`${COMPANY.name} — UAE signage company logo`}
            className="h-12 sm:h-14 w-auto"
            width={220}
            height={56}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/" className={linkClass} activeProps={{ className: 'text-primary after:scale-x-100' }} activeOptions={{ exact: true }}>
            {t('nav.home')}
          </Link>
          <Link to="/about" className={linkClass} activeProps={{ className: 'text-primary after:scale-x-100' }}>
            {t('nav.about')}
          </Link>

          {/* Our Groups mega menu */}
          <div className="relative" onMouseEnter={() => setMega(true)}>
            <Link
              to="/companies"
              className={`${linkClass} inline-flex items-center gap-1`}
              activeProps={{ className: 'text-primary after:scale-x-100' }}
            >
              Our Groups
              <ChevronDown className={`w-4 h-4 transition-transform ${mega ? 'rotate-180' : ''}`} />
            </Link>
          </div>

          {NAV.filter((n) => !['/', '/about'].includes(n.to)).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={linkClass}
              activeProps={{ className: 'text-primary after:scale-x-100' }}
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} aria-label="Toggle language" className="p-2 rounded-full hover:bg-muted transition">
            <Languages className="w-4 h-4" />
            <span className="sr-only">{i18n.language === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <Link to="/contact" className="hidden sm:block">
            <Button className="rounded-full px-6 h-11 font-semibold shadow-[var(--shadow-glow)]">{t('nav.quote')}</Button>
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mega menu panel */}
      <div
        className={`hidden lg:block absolute inset-x-0 top-full origin-top transition-all duration-300 ${
          mega ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
        onMouseEnter={() => setMega(true)}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3 pb-6">
          <div className="rounded-3xl border border-border bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] p-6">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Groups</p>
                <p className="text-sm text-muted-foreground mt-1">Five specialised companies, one trusted UAE group.</p>
              </div>
              <Link to="/companies" className="text-sm font-semibold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
                All companies <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              {(companies ?? []).map((c: any) => (
                <Link
                  key={c.id}
                  to="/companies/$slug"
                  params={{ slug: c.slug }}
                  className="group flex gap-4 rounded-2xl border border-transparent hover:border-primary/25 hover:bg-muted/60 p-4 transition-all duration-300"
                >
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-muted grid place-items-center overflow-hidden border border-border">
                    {c.logo_url ? (
                      <img src={c.logo_url} alt="" className="w-full h-full object-contain p-1.5" loading="lazy" />
                    ) : (
                      <span className="text-base font-extrabold text-primary">{String(c.name).slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[15px] leading-snug truncate group-hover:text-primary transition-colors">{c.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5 leading-snug">{c.tagline || c.description}</p>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View details <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
              {!companies?.length && (
                <p className="text-sm text-muted-foreground col-span-full">Companies will appear here once added in the admin panel.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border mt-2">
          <nav className="flex flex-col p-4 gap-1 max-w-7xl mx-auto">
            <Link to="/" className="px-3 py-3 rounded-xl hover:bg-muted font-semibold">{t('nav.home')}</Link>
            <Link to="/about" className="px-3 py-3 rounded-xl hover:bg-muted font-semibold">{t('nav.about')}</Link>
            <Link to="/companies" className="px-3 py-3 rounded-xl hover:bg-muted font-semibold">Our Groups</Link>
            {(companies ?? []).map((c: any) => (
              <Link
                key={c.id}
                to="/companies/$slug"
                params={{ slug: c.slug }}
                className="ml-3 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:bg-muted"
              >
                {c.name}
              </Link>
            ))}
            {NAV.filter((n) => !['/', '/about'].includes(n.to)).map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-3 rounded-xl hover:bg-muted font-semibold">
                {t(`nav.${n.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
