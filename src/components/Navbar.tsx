import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import logo from '@/assets/speedex-logo.png.asset.json';
import { COMPANY } from '@/lib/site-data';

const NAV = [
  { to: '/', key: 'home' },
  { to: '/about', key: 'about' },
  { to: '/services', key: 'services' },
  { to: '/explore', key: 'explore' },
  { to: '/products', key: 'products' },
  { to: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleLang = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(next);
    localStorage.setItem('lang', next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'glass shadow-sm py-2' : 'py-4 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label={COMPANY.name}>
          <img src={logo.url} alt={COMPANY.name} className="h-9 w-auto" width={160} height={36} />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative"
              activeProps={{ className: 'text-primary' }}
              activeOptions={{ exact: n.to === '/' }}
            >
              {t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} aria-label="Toggle language" className="p-2 rounded-md hover:bg-accent/40 transition">
            <Languages className="w-4 h-4" />
            <span className="sr-only">{i18n.language === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-md hover:bg-accent/40 transition">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/contact" className="hidden sm:block">
            <Button className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
              {t('nav.quote')}
            </Button>
          </Link>
          <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-border mt-2">
          <nav className="flex flex-col p-4 gap-1 max-w-7xl mx-auto">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="px-3 py-3 rounded-md hover:bg-accent/40 font-medium" activeProps={{ className: 'bg-accent/40 text-primary' }}>
                {t(`nav.${n.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}