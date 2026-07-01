import { Reveal } from '@/components/Reveal';
import { COMPANY } from '@/lib/site-data';
import { MapPin, Navigation, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  address?: string;
  phone?: string;
  email?: string;
  mapsEmbedUrl?: string;
  mapsDirectionsUrl?: string;
};

export function Location({
  address = COMPANY.address,
  phone = COMPANY.phone,
  email = COMPANY.email,
  mapsEmbedUrl = COMPANY.mapEmbed,
  mapsDirectionsUrl = 'https://www.google.com/maps/place/Speedex+Auto+Workshop+L.L.C/@24.3564359,54.4925938,514m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5e4195316879d7:0xd4cfbd6175b97d6c!8m2!3d24.3564342!4d54.4935042',
}: Props) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Location</p>
            <h2 className="text-3xl sm:text-5xl font-bold mt-2">Visit our UAE headquarters</h2>
            <p className="mt-4 text-muted-foreground">
              Drop by our facility or get in touch — we serve every Emirate.
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-6 items-stretch">
          {/* Info card */}
          <Reveal direction="left" className="lg:col-span-2">
            <div className="h-full bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-7 flex flex-col gap-5 shadow-[var(--shadow-elegant)]">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Head office</p>
                  <p className="font-semibold mt-1">{address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                  <a href={`tel:${phone}`} className="font-semibold mt-1 hover:text-primary block">{phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                  <a href={`mailto:${email}`} className="font-semibold mt-1 hover:text-primary break-all block">{email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/15 text-primary grid place-items-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Hours</p>
                  <p className="font-semibold mt-1">Sun – Thu · 8:30 AM – 7:00 PM</p>
                </div>
              </div>
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="mt-auto">
                <Button className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
                  <Navigation className="w-4 h-4" /> Get Directions
                </Button>
              </a>
            </div>
          </Reveal>

          {/* Map — clicking anywhere opens Google Maps in a new tab */}
          <Reveal direction="right" className="lg:col-span-3">
            <a
              href={mapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Speedex location in Google Maps"
              className="group relative block h-full min-h-[420px] rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-elegant)]"
            >
              <iframe
                title="Speedex Group location"
                src={mapsEmbedUrl}
                className="w-full h-full pointer-events-none"
                style={{ minHeight: 420 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
              <div className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-semibold shadow-md border border-border">
                <Navigation className="w-3.5 h-3.5 text-primary" /> Open in Google Maps
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}