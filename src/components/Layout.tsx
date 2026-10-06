import { type ReactNode, useEffect } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { BackToTop } from './BackToTop';
import { Chatbot } from './Chatbot';
import { DigitalHeader } from './digital/DigitalHeader';
import { DigitalFooter } from './digital/DigitalFooter';
import { useDigital } from '@/lib/digital/useDigital';
import '@/lib/i18n';
import { useTranslation } from 'react-i18next';

function DigitalChrome({ children }: { children: ReactNode }) {
  const { settings } = useDigital();
  return (
    <>
      <DigitalHeader />
      <main className="min-h-screen pt-16 sm:pt-20">{children}</main>
      <DigitalFooter />
      <Chatbot
        endpoint="/api/public/digital-chat"
        title="Speedex Digital AI"
        logoUrl={settings.logo_url}
        welcome="Hello! Welcome to Speedex Digital. How can we help grow your business through digital solutions?"
        placeholder="Ask about websites, SEO, ads, social…"
      />
      <BackToTop />
    </>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [i18n.language]);

  if (pathname === '/speedex-digital' || pathname.startsWith('/speedex-digital/')) {
    return <DigitalChrome>{children}</DigitalChrome>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppButton />
      <Chatbot />
      <BackToTop />
    </>
  );
}
