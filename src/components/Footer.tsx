import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { COMPANY } from '@/lib/site-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import logo from '@/assets/speedex-logo.png.asset.json';

export function Footer() {
  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success('Subscribed! Thanks for joining our newsletter.');
    (e.target as HTMLFormElement).reset();
  };
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="mb-4 inline-block bg-background/95 rounded-lg p-2">
            <img src={logo.url} alt={COMPANY.name} className="h-10 w-auto" width={180} height={40} />
          </div>
          <p className="text-background/70 text-sm leading-relaxed">
            UAE's trusted signage and branding partner — designing, fabricating and installing premium signage across the Emirates since 2007.
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
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-background/70">
            {['About','Services','Explore','Products','Careers','Contact'].map((l) => (
              <li key={l}><Link to={`/${l.toLowerCase()}`} className="hover:text-primary">{l}</Link></li>
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

        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-background/70 mb-3">Get signage trends & project highlights in your inbox.</p>
          <form className="flex gap-2" onSubmit={onSubscribe}>
            <Input required type="email" placeholder="Your email" className="bg-background/10 border-background/20 text-background placeholder:text-background/50" />
            <Button type="submit" className="bg-primary text-primary-foreground">Join</Button>
          </form>
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