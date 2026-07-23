import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Moon, Sun, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import logo from '@/assets/speedex-logo.png.asset.json';
import { COMPANY } from '@/lib/site-data';

interface NavItem {
  to: string;
  hash?: string;
  key: string;
  customLabel: string;
}

const NAV: NavItem[] = [
  { to: '/', key: 'home', customLabel: 'Home' },
  { to: '/', hash: 'about', key: 'about', customLabel: 'About' },
  { to: '/', hash: 'our-groups', key: 'companies', customLabel: 'Our Groups' },
  { to: '/services', key: 'services', customLabel: 'Services' },
  { to: '/portfolio', key: 'portfolio', customLabel: 'Portfolio' },
  { to: '/explore', key: 'explore', customLabel: 'Explore' },
  { to: '/products', key: 'products', customLabel: 'Products' },
  { to: '/contact', key: 'contact', customLabel: 'Contact' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  // Hide Navbar on Admin pages
  if (path.startsWith('/admin')) {
    return null;
  }

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

  useEffect(() => {
    setOpen(false);
  }, [path]);

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

  const handleNavClick = (hash?: string) => {
    if (hash) {
      setTimeout(() => {
        const elem = document.getElementById(hash);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? 'bg-background/95 backdrop-blur shadow-sm border-b border-border py-2' : 'bg-background/80 backdrop-blur border-b border-transparent py-3'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label={COMPANY.name}>
          <img
            src={logo.url}
            alt={`${COMPANY.name} — UAE signage company logo`}
            className="h-12 sm:h-14 w-auto drop-shadow-sm"
            width={220}
            height={56}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.key}
              to={n.to as any}
              onClick={() => handleNavClick(n.hash)}
              className="px-3 py-2 text-sm font-medium tracking-tight text-foreground hover:text-primary transition-colors relative after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
              activeProps={{ className: 'text-primary font-semibold after:scale-x-100' }}
            >
              {n.customLabel ?? t(`nav.${n.key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleLang} aria-label="Toggle language" className="p-2 rounded-md hover:bg-accent/40 transition cursor-pointer">
            <Languages className="w-4 h-4" />
            <span className="sr-only">{i18n.language === 'ar' ? 'EN' : 'AR'}</span>
          </button>
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-md hover:bg-accent/40 transition cursor-pointer">
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/contact" className="hidden sm:block">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-5 font-medium">
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
              <Link
                key={n.key}
                to={n.to as any}
                onClick={() => {
                  setOpen(false);
                  handleNavClick(n.hash);
                }}
                className="px-3 py-3 rounded-md hover:bg-accent/40 font-medium"
                activeProps={{ className: 'bg-accent/40 text-primary' }}
              >
                {n.customLabel ?? t(`nav.${n.key}`)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
