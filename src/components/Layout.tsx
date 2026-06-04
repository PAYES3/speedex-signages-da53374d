import { type ReactNode, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { WhatsAppButton } from './WhatsAppButton';
import { BackToTop } from './BackToTop';
import { Chatbot } from './Chatbot';
import '@/lib/i18n';
import { useTranslation } from 'react-i18next';

export function Layout({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [i18n.language]);

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