import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

/**
 * Full bilingual dictionary. Keys mirror the visible UI so a missing Arabic
 * value simply falls back to the English string — nothing ever renders blank.
 */
const en = {
  nav: {
    home: 'Home', about: 'About', companies: 'Companies', groups: 'Our Groups', services: 'Services',
    portfolio: 'Portfolio', explore: 'Explore', products: 'Products', careers: 'Careers',
    contact: 'Contact', quote: 'Get a Quote', menu: 'Menu', language: 'Language',
  },
  hero: {
    badge: 'Premium signage · United Arab Emirates',
    title: 'Transforming ideas into powerful visual identities',
    subtitle: 'Signage, branding, transport, contracting and trading solutions delivered across the UAE — designed, manufactured and installed in-house.',
    quote: 'Get a free quote',
    companies: 'Explore our companies',
    projects: 'View our projects',
    prev: 'Previous slide',
    next: 'Next slide',
  },
  clients: { title: 'Trusted by leading brands across the UAE' },
  showcase: {
    explore: 'Explore Projects', portfolio: 'View Portfolio', contact: 'Contact Us', services: 'Our Services',
  },
  companies: {
    eyebrow: 'Speedex Group',
    title: 'Our Companies',
    subtitle: 'Industry-leading entities delivering excellence across signage, automotive, facilities, contracting, trading and transportation in the UAE.',
    explore: 'Explore Company',
    learnMore: 'Learn more',
    showcase: 'Corporate Showcase',
    group: 'Excellent Group of Companies',
    location: 'Location', contact: 'Contact', website: 'Website',
    prev: 'Previous slide', next: 'Next slide',
  },
  beforeAfter: {
    eyebrow: 'Before / After',
    title: 'See the transformation',
    subtitle: 'Drag the slider to reveal how Speedex reshapes a facade.',
    before: 'Before', after: 'After',
  },
  sections: {
    services: 'Our Services', projects: 'Featured Projects', process: 'Our Process',
    factory: 'Inside our factory', why: 'Why choose us', stats: 'By the numbers',
    testimonials: 'What our clients say', faq: 'Frequently asked questions',
    location: 'Find us', feedback: 'Share your feedback',
  },
  form: {
    name: 'Name', email: 'Email', phone: 'Phone', subject: 'Subject', message: 'Message',
    company: 'Company', rating: 'Rating', send: 'Send message', submit: 'Submit',
    sending: 'Sending…', required: 'This field is required', invalidEmail: 'Enter a valid email address',
    success: 'Thank you — we will get back to you shortly.', error: 'Something went wrong. Please try again.',
    namePlaceholder: 'Your full name', emailPlaceholder: 'you@company.com',
    phonePlaceholder: '+971 …', messagePlaceholder: 'Tell us about your project',
  },
  common: {
    learnMore: 'Learn more', viewAll: 'View all', readMore: 'Read more', loading: 'Loading…',
    empty: 'Nothing to show yet.', send: 'Send', submit: 'Submit', subscribe: 'Subscribe',
    search: 'Search', close: 'Close', previous: 'Previous', next: 'Next', getQuote: 'Get a quote',
    callUs: 'Call us', whatsapp: 'WhatsApp', backToTop: 'Back to top',
  },
  footer: {
    tagline: 'Signage, branding and business services across the United Arab Emirates.',
    quickLinks: 'Quick links', ourGroups: 'Our groups', contact: 'Contact',
    rights: 'All rights reserved.',
  },
};

const ar = {
  nav: {
    home: 'الرئيسية', about: 'من نحن', companies: 'شركاتنا', groups: 'مجموعتنا', services: 'خدماتنا',
    portfolio: 'أعمالنا', explore: 'استكشف', products: 'المنتجات', careers: 'الوظائف',
    contact: 'اتصل بنا', quote: 'اطلب عرض سعر', menu: 'القائمة', language: 'اللغة',
  },
  hero: {
    badge: 'لافتات فاخرة · الإمارات العربية المتحدة',
    title: 'نحوّل الأفكار إلى هويات بصرية مؤثرة',
    subtitle: 'حلول اللافتات والعلامات التجارية والنقل والمقاولات والتجارة في جميع أنحاء الإمارات — تصميم وتصنيع وتركيب داخل منشآتنا.',
    quote: 'احصل على عرض سعر مجاني',
    companies: 'استكشف شركاتنا',
    projects: 'شاهد مشاريعنا',
    prev: 'الشريحة السابقة',
    next: 'الشريحة التالية',
  },
  clients: { title: 'موضع ثقة كبرى العلامات التجارية في الإمارات' },
  showcase: {
    explore: 'استكشف المشاريع', portfolio: 'عرض الأعمال', contact: 'اتصل بنا', services: 'خدماتنا',
  },
  companies: {
    eyebrow: 'مجموعة سبيدكس',
    title: 'شركاتنا',
    subtitle: 'شركات رائدة تقدم التميز في اللافتات والسيارات والمرافق والمقاولات والتجارة والنقل في الإمارات.',
    explore: 'استكشف الشركة',
    learnMore: 'اعرف المزيد',
    showcase: 'العرض المؤسسي',
    group: 'مجموعة إكسلنت للشركات',
    location: 'الموقع', contact: 'التواصل', website: 'الموقع الإلكتروني',
    prev: 'الشركة السابقة', next: 'الشركة التالية',
  },
  beforeAfter: {
    eyebrow: 'قبل / بعد',
    title: 'شاهد التحول',
    subtitle: 'اسحب الشريط لترى كيف تعيد سبيدكس تشكيل الواجهة.',
    before: 'قبل', after: 'بعد',
  },
  sections: {
    services: 'خدماتنا', projects: 'مشاريع مختارة', process: 'آلية عملنا',
    factory: 'داخل مصنعنا', why: 'لماذا تختارنا', stats: 'بالأرقام',
    testimonials: 'آراء عملائنا', faq: 'الأسئلة الشائعة',
    location: 'موقعنا', feedback: 'شاركنا رأيك',
  },
  form: {
    name: 'الاسم', email: 'البريد الإلكتروني', phone: 'الهاتف', subject: 'الموضوع', message: 'الرسالة',
    company: 'الشركة', rating: 'التقييم', send: 'إرسال الرسالة', submit: 'إرسال',
    sending: 'جارٍ الإرسال…', required: 'هذا الحقل مطلوب', invalidEmail: 'أدخل بريدًا إلكترونيًا صحيحًا',
    success: 'شكرًا لك — سنعاود التواصل معك قريبًا.', error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    namePlaceholder: 'اسمك الكامل', emailPlaceholder: 'you@company.com',
    phonePlaceholder: '+971 …', messagePlaceholder: 'أخبرنا عن مشروعك',
  },
  common: {
    learnMore: 'اعرف المزيد', viewAll: 'عرض الكل', readMore: 'اقرأ المزيد', loading: 'جارٍ التحميل…',
    empty: 'لا يوجد شيء لعرضه بعد.', send: 'إرسال', submit: 'إرسال', subscribe: 'اشتراك',
    search: 'بحث', close: 'إغلاق', previous: 'السابق', next: 'التالي', getQuote: 'اطلب عرض سعر',
    callUs: 'اتصل بنا', whatsapp: 'واتساب', backToTop: 'العودة للأعلى',
  },
  footer: {
    tagline: 'اللافتات والعلامات التجارية وخدمات الأعمال في جميع أنحاء الإمارات العربية المتحدة.',
    quickLinks: 'روابط سريعة', ourGroups: 'مجموعتنا', contact: 'تواصل معنا',
    rights: 'جميع الحقوق محفوظة.',
  },
};

export const SUPPORTED_LANGS = ['en', 'ar'] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

export function storedLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const l = localStorage.getItem('lang');
  return l === 'ar' ? 'ar' : 'en';
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: { en: { t: en }, ar: { t: ar } },
    lng: storedLang(),
    fallbackLng: 'en',
    defaultNS: 't',
    interpolation: { escapeValue: false },
  });
}

export default i18n;
