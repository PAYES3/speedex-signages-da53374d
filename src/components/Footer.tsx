import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicListCompanies } from '@/lib/admin/content.functions';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'; // Youtube removed from imports
import { COMPANY } from '@/lib/site-data';
import logo from '@/assets/speedex-logo.png.asset.json';

const QUICK_LINKS = [
  { to: '/about', label: 'About' },
  { to: '/companies', label: 'Companies' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
] as const;

// Clean array without Youtube
const SOCIAL_LINKS = [
  { Icon: Instagram, url: "https://www.instagram.com/speedex_signages" },
  { Icon: Facebook, url: "https://www.facebook.com/share/19Hp7naRrK/" },
  { Icon: Linkedin, url: "https://www.linkedin.com/showcase/speedex-signages-abu-dhabi/" }
] as const;

export function Footer() {
  const fetcher = useServerFn(publicListCompanies);
  const { data: companies } = useQuery({ queryKey: ['public-companies'], queryFn: () => fetcher() });
  
  return (
    <footer className="bg-[#1B1B1B] text-white/90 mt-24 border-t-2" style={{ borderTopColor: '#D4A017' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-4 inline-block bg-white rounded-lg p-2">
            <img src={logo.url} alt={COMPANY.name} className="h-10 w-auto" width={180} height={40} />
          </div>
          <p className="text-white/65 text-base leading-relaxed">
            Speedex Group — UAE's trusted partner across signage, automotive, transport, contracting and trading since 2007.
          </p>
          
          <div className="flex gap-3 mt-5">
            {SOCIAL_LINKS.map((item, i) => (
              <a 
                key={i} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 grid place-items-center rounded-full bg-white/10 hover:bg-primary hover:text-primary-foreground transition"
              >
                <item.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-5 text-white text-lg">Group Companies</h4>
          <ul className="space-y-3 text-base text-white/65">
            {(companies ?? []).map((c: any) => (
              <li key={c.id}>
                <Link to="/companies/$slug" params={{ slug: c.slug }} className="hover:text-primary">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-5 text-white text-lg">Quick Links</h4>
          <ul className="space-y-3 text-base text-white/65">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="hover:text-primary">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-5 text-white text-lg">Contact</h4>
          <ul className="space-y-3 text-base text-white/65">
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 shrink-0" /><span>{COMPANY.address}</span></li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4" /><a href={`tel:${COMPANY.phone}`} className="hover:text-primary">{COMPANY.phone}</a></li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4" /><a href={`mailto:${COMPANY.email}`} className="hover:text-primary">{COMPANY.email}</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-white/55 flex flex-col md:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</p>
          <p>Designed and built in the UAE.</p>
        </div>
      </div>
    </footer>
  );
}
