import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { ChevronDown, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/hooks/useLang';
import { useDigital } from '@/lib/digital/useDigital';

const LINKS = [
  { to: '/speedex-digital', en: 'Home', ar: 'الرئيسية', exact: true },
  { to: '/speedex-digital/about', en: 'About', ar: 'من نحن' },
  { to: '/speedex-digital/portfolio', en: 'Portfolio', ar: 'أعمالنا' },
  { to: '/speedex-digital/industries', en: 'Industries', ar: 'القطاعات' },
  { to: '/speedex-digital/contact', en: 'Contact', ar: 'تواصل معنا' },
] as const;

export function DigitalHeader() {
  const { services, settings, tr } = useDigital();
  const { toggle, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [mobileSvc, setMobileSvc] = useState(false);
  const groups = [
    { key: 'web', label: tr('Web & Design', 'الويب والتصميم') },
    { key: 'marketing', label: tr('Digital Marketing', 'التسويق الرقمي') },
  ] as const;
  const link = 'px-3 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors';

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link to="/speedex-digital" className="shrink-0" aria-label="Speedex Digital home">
          <img src={settings.logo_url} alt="Speedex Digital" width={1640} height={575} className="h-9 sm:h-11 w-auto" />
        </Link>
        <nav className="hidden lg:flex items-center" aria-label="Speedex Digital">
          <Link to={LINKS[0].to} activeOptions={{ exact: true }} className={link} activeProps={{ className: 'text-primary' }}>{tr(LINKS[0].en, LINKS[0].ar)}</Link>
          <Link to={LINKS[1].to} className={link} activeProps={{ className: 'text-primary' }}>{tr(LINKS[1].en, LINKS[1].ar)}</Link>
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button type="button" onClick={() => setMega((v) => !v)} aria-expanded={mega} className={`${link} inline-flex items-center gap-1`}>
              {tr('Services', 'الخدمات')} <ChevronDown className="h-4 w-4" />
            </button>
            {mega && (
              <div className="absolute left-1/2 top-full w-[min(720px,90vw)] -translate-x-1/2 pt-3">
                <div className="grid grid-cols-2 gap-8 rounded-xl border border-border bg-popover p-7 shadow-xl">
                  {groups.map((g) => (
                    <div key={g.key}>
                      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-primary">{g.label}</p>
                      <ul className="space-y-1">
                        {services.filter((s) => s.category === g.key).map((s) => (
                          <li key={s.slug}><Link to="/speedex-digital/services/$slug" params={{ slug: s.slug }} onClick={() => setMega(false)} className="block rounded-md px-2 py-1.5 text-sm text-foreground/80 hover:bg-muted hover:text-primary">{tr(s.title, s.title_ar)}</Link></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link to="/speedex-digital/services" onClick={() => setMega(false)} className="col-span-2 border-t border-border pt-4 text-sm font-semibold text-primary">{tr('View all services →', 'عرض جميع الخدمات ←')}</Link>
                </div>
              </div>
            )}
          </div>
          {LINKS.slice(2).map((l) => <Link key={l.to} to={l.to} className={link} activeProps={{ className: 'text-primary' }}>{tr(l.en, l.ar)}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={toggle} className="inline-flex items-center gap-1 rounded-md px-2 py-2 text-sm font-semibold text-foreground/80 hover:text-primary" aria-label="Switch language">
            <Globe className="h-4 w-4" />{lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          <Button asChild className="hidden sm:inline-flex"><Link to="/speedex-digital/contact">{tr('Get a Consultation', 'احصل على استشارة')}</Link></Button>
          <button type="button" className="lg:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-border bg-background px-5 pb-6">
          {[LINKS[0], LINKS[1]].map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-semibold">{tr(l.en, l.ar)}</Link>)}
          <button type="button" onClick={() => setMobileSvc((v) => !v)} className="flex w-full items-center justify-between border-b border-border py-3 font-semibold">{tr('Services', 'الخدمات')}<ChevronDown className={`h-4 w-4 transition ${mobileSvc ? 'rotate-180' : ''}`} /></button>
          {mobileSvc && groups.map((g) => (
            <div key={g.key} className="py-2">
              <p className="py-1 text-xs font-bold uppercase text-primary">{g.label}</p>
              {services.filter((s) => s.category === g.key).map((s) => <Link key={s.slug} to="/speedex-digital/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)} className="block py-2 ps-3 text-sm text-foreground/80">{tr(s.title, s.title_ar)}</Link>)}
            </div>
          ))}
          {LINKS.slice(2).map((l) => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block border-b border-border py-3 font-semibold">{tr(l.en, l.ar)}</Link>)}
          <Button asChild className="mt-5 w-full"><Link to="/speedex-digital/contact" onClick={() => setOpen(false)}>{tr('Get a Consultation', 'احصل على استشارة')}</Link></Button>
        </div>
      )}
    </header>
  );
}
