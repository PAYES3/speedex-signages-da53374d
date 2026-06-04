import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = {
  nav: { home: 'Home', about: 'About', services: 'Services', explore: 'Explore', products: 'Products', careers: 'Careers', contact: 'Contact', quote: 'Get a Quote' },
  hero: {
    tag: 'UAE Signage & Branding Experts',
    title: 'We Light Up Your Brand',
    sub: 'Premium signage manufacturing, fabrication and installation across the United Arab Emirates.',
    cta1: 'Get a Quote',
    cta2: 'Explore Our Work',
  },
  common: { learnMore: 'Learn more', viewAll: 'View all', readMore: 'Read more', loading: 'Loading…', send: 'Send', submit: 'Submit', subscribe: 'Subscribe', search: 'Search' },
};

const ar = {
  nav: { home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا', explore: 'استكشف', products: 'المنتجات', careers: 'وظائف', contact: 'اتصل بنا', quote: 'احصل على عرض' },
  hero: {
    tag: 'خبراء اللافتات والعلامات التجارية في الإمارات',
    title: 'نُنير علامتك التجارية',
    sub: 'تصنيع وتركيب لافتات احترافية في جميع أنحاء الإمارات العربية المتحدة.',
    cta1: 'احصل على عرض',
    cta2: 'استكشف أعمالنا',
  },
  common: { learnMore: 'اعرف المزيد', viewAll: 'عرض الكل', readMore: 'اقرأ المزيد', loading: 'جارٍ التحميل…', send: 'إرسال', submit: 'إرسال', subscribe: 'اشتراك', search: 'بحث' },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { en: { t: en }, ar: { t: ar } },
    lng: typeof window !== 'undefined' ? localStorage.getItem('lang') || 'en' : 'en',
    fallbackLng: 'en',
    defaultNS: 't',
    interpolation: { escapeValue: false },
  });
}

export default i18n;