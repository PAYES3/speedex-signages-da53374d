import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Languages, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { Button } from '@/components/ui/button';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { useSiteLogo, useFaviconSync } from '@/hooks/useSiteSettings';
import { COMPANY } from '@/lib/site-data';
import { useLang } from '@/hooks/useLang';

const NAV = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/speedex-digital', key: 'speedexDigital' },
  { to: '/portfolio', key: 'portfolio' },
  { to: '/explore', key: 'explore' },
  { to: '/products', key: 'products' },
  { to: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { lang, toggle, T } = useLang();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const logo = useSiteLogo();
  useFaviconSync();

  const listCompanies = useServerFn(publicListCompanies);
  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ['public-companies'],
    queryFn: () => listCompanies(),
    staleTime: 0, refetchOnWindowFocus: true,
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

  const megaRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega(true);
  };
  const closeMegaSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMega(false), 150);
  };

  useEffect(() => {
    if (!mega) return;
    const onDown = (e: PointerEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMega(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMega(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [mega]);

  const toggleLang = toggle;

  const linkClass =
    'px-3 py-2 text-[15px] font-semibold text-foreground/85 hover:text-primary transition-colors relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left';

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_-18px_rgba(0,0,0,0.25)] border-b border-border py-2'
          : 'bg-white/70 backdrop-blur-lg border-b border-transparent py-3'
      }`}
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

          {/* Our Groups compact dropdown */}
          <div ref={megaRef} className="relative" onMouseEnter={openMega} onMouseLeave={closeMegaSoon}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={mega}
              onClick={() => setMega((v) => !v)}
              className={`${linkClass} inline-flex items-center gap-1 ${path.startsWith('/companies') ? 'text-primary after:scale-x-100' : ''}`}
            >
              {T('nav.groups', 'Our Groups')}
              <ChevronDown className={`w-4 h-4 transition-transform ${mega ? 'rotate-180' : ''}`} />
            </button>

            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[min(520px,90vw)] transition-all duration-200 ${
                mega ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="rounded-2xl border border-border bg-white shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] p-3">
                <div className="grid grid-cols-2 gap-1">
                  {(companies ?? []).map((c: any) => (
                    <Link
                      key={c.id}
                      to={c.slug === 'speedex-digital' ? '/speedex-digital' : '/companies/$slug'}
                      params={c.slug === 'speedex-digital' ? undefined : { slug: c.slug }}
                      className="group flex items-center gap-2.5 rounded-xl p-2 hover:bg-muted/70 transition-colors"
                    >
                      <div className="w-9 h-9 shrink-0 rounded-lg bg-muted grid place-items-center overflow-hidden border border-border">
                        {c.logo_url ? (
                          <img src={c.logo_url} alt="" className="w-full h-full object-contain p-1" loading="lazy" />
                        ) : (
                          <span className="text-xs font-extrabold text-primary">{String(c.name).slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <span className="text-sm font-semibold leading-tight line-clamp-2 group-hover:text-primary transition-colors">{c.name}</span>
                    </Link>
                  ))}
                  {!companies?.length && (
                    <p className="text-sm text-muted-foreground col-span-full p-2">
                      {companiesLoading ? 'Loading companies…' : 'Companies will appear here once added in the admin panel.'}
                    </p>
                  )}
                </div>
                <Link to="/companies" className="mt-2 flex items-center justify-center gap-1 rounded-xl border-t border-border pt-2.5 pb-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
                  All companies <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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
          <button
            onClick={toggleLang}
            aria-label={T('nav.language', 'Language')}
            title={lang === 'ar' ? 'English' : 'العربية'}
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full hover:bg-muted transition text-sm font-semibold"
          >
            <Languages className="w-4 h-4" />
            <span>{lang === 'ar' ? 'EN' : 'العربية'}</span>
          </button>
          <Link to="/contact" className="hidden sm:block">
            <Button className="rounded-full px-6 h-11 font-semibold shadow-[var(--shadow-glow)]">{t('nav.quote')}</Button>
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
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
                to={c.slug === 'speedex-digital' ? '/speedex-digital' : '/companies/$slug'}
                params={c.slug === 'speedex-digital' ? undefined : { slug: c.slug }}
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
