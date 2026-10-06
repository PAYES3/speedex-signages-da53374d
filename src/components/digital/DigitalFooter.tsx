import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useDigital } from '@/lib/digital/useDigital';

export function DigitalFooter() {
  const { settings: s, tr, ar } = useDigital();
  const socials = (['instagram', 'facebook', 'linkedin', 'tiktok', 'x'] as const).filter((k) => s[k]);
  const svc = [
    ['Web & Design', 'الويب والتصميم', 'website-designing'], ['Digital Marketing', 'التسويق الرقمي', 'digital-marketing'],
    ['SEO', 'تحسين البحث', 'seo-services'], ['E-Commerce', 'التجارة الإلكترونية', 'e-commerce-development'], ['UI/UX', 'تجربة المستخدم', 'ui-ux-design'],
  ] as const;
  const h = 'mb-4 text-sm font-bold uppercase tracking-wider text-foreground';
  const a = 'block py-1 text-sm text-muted-foreground hover:text-primary';
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={s.logo_url} alt="Speedex Digital" width={1640} height={575} loading="lazy" className="h-12 w-auto" />
          <p className="mt-4 font-semibold text-foreground">{tr(s.tagline, s.tagline_ar)}</p>
          <p className="mt-2 text-sm text-muted-foreground">{s.footer_text}</p>
          {socials.length > 0 && <div className="mt-4 flex flex-wrap gap-3">{socials.map((k) => <a key={k} href={s[k]} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold capitalize text-primary">{k}</a>)}</div>}
        </div>
        <div><p className={h}>{tr('Quick links', 'روابط سريعة')}</p>
          <Link to="/speedex-digital" className={a}>{tr('Home', 'الرئيسية')}</Link>
          <Link to="/speedex-digital/about" className={a}>{tr('About', 'من نحن')}</Link>
          <Link to="/speedex-digital/services" className={a}>{tr('Services', 'الخدمات')}</Link>
          <Link to="/speedex-digital/portfolio" className={a}>{tr('Portfolio', 'أعمالنا')}</Link>
          <Link to="/speedex-digital/contact" className={a}>{tr('Contact', 'تواصل معنا')}</Link>
        </div>
        <div><p className={h}>{tr('Services', 'الخدمات')}</p>
          {svc.map(([en, arL, slug]) => <Link key={slug} to="/speedex-digital/services/$slug" params={{ slug }} className={a}>{ar ? arL : en}</Link>)}
        </div>
        <div><p className={h}>{tr('Contact', 'تواصل')}</p>
          <a href={`tel:${s.phone.replace(/\s/g, '')}`} className={`${a} flex gap-2`}><Phone className="h-4 w-4 mt-0.5 shrink-0" />{s.phone}</a>
          <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className={`${a} flex gap-2`}><MessageCircle className="h-4 w-4 mt-0.5 shrink-0" />WhatsApp</a>
          <a href={`mailto:${s.email}`} className={`${a} flex gap-2 break-all`}><Mail className="h-4 w-4 mt-0.5 shrink-0" />{s.email}</a>
          <p className={`${a} flex gap-2`}><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{s.address}</p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Speedex Digital · {tr('A Speedex Group company', 'إحدى شركات مجموعة سبيدكس')}</div>
    </footer>
  );
}
