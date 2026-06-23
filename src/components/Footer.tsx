import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { COMPANY } from '@/lib/site-data';
import logo from '@/assets/speedex-logo.png.asset.json';

const QUICK_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/companies', label: 'Companies' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
] as const;

export function Footer() {
  const fetcher = useServerFn(publicListCompanies);
  const { data: companies } = useQuery({ queryKey: ['public-companies'], queryFn: () => fetcher() });
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-4 inline-block bg-background/95 rounded-lg p-2">
            <img src={logo.url} alt={COMPANY.name} className="h-10 w-auto" width={180} height={40} />
          </div>
          <p className="text-background/70 text-sm leading-relaxed">
            Speedex Group — UAE's trusted partner across signage, automotive, transport, contracting and trading since 2007.
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 grid place-items-center rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground transition">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Group Companies</h4>
          <ul className="space-y-2 text-sm text-background/70">
            {(companies ?? []).map((c: any) => (
              <li key={c.id}>
                <Link to="/companies/$slug" params={{ slug: c.slug }} className="hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-background/70">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-background/70">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 shrink-0" /><span>{COMPANY.address}</span></li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /><a href={`tel:${COMPANY.phone}`} className="hover:text-primary">{COMPANY.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href={`mailto:${COMPANY.email}`} className="hover:text-primary">{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-background/60 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Designed and built in the UAE.</p>
        </div>
      </div>
    </footer>
  );
}