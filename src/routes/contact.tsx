import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { COMPANY } from '@/lib/site-data';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useServerFn } from '@tanstack/react-start';
import { submitContact } from '@/lib/api/forms.functions';
import { toast } from 'sonner';

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: [
      { title: 'Contact — Speedex Signages UAE | Get a Quote' },
      { name: 'description', content: 'Get in touch with Speedex Signages for a free signage quote. Based in Al Quoz, Dubai — serving the entire UAE.' },
      { property: 'og:title', content: 'Contact Speedex Signages' },
      { property: 'og:description', content: 'Get a signage quote from the UAE’s trusted manufacturer and installer.' },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const submit = useServerFn(submitContact);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await submit({ data: {
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        subject: String(fd.get('subject') || ''),
        message: String(fd.get('message') || ''),
      } });
      toast.success("Message sent! We'll reply within one business day.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error('Could not send your message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Contact</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Let's light up your brand</h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">Tell us about your project — we'll respond with a tailored quote within one business day.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
          <Reveal direction="left">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl font-bold">Send us a message</h2>
              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input name="name" placeholder="Full name *" required maxLength={120} />
                  <Input name="email" type="email" placeholder="Email *" required maxLength={255} />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input name="phone" placeholder="Phone (optional)" maxLength={40} />
                  <Input name="subject" placeholder="Subject" maxLength={200} />
                </div>
                <Textarea name="message" placeholder="Your message *" rows={5} required maxLength={4000} />
                <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-[var(--shadow-glow)]">
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 flex gap-4 items-start">
                <MapPin className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <p className="font-semibold">Visit our facility</p>
                  <p className="text-sm text-muted-foreground mt-1">{COMPANY.address}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <a href={`tel:${COMPANY.phone}`} className="bg-card border border-border rounded-2xl p-6 flex gap-3 items-start hover:border-primary transition">
                  <Phone className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-medium">{COMPANY.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${COMPANY.email}`} className="bg-card border border-border rounded-2xl p-6 flex gap-3 items-start hover:border-primary transition">
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium break-all">{COMPANY.email}</p>
                  </div>
                </a>
              </div>
              <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noopener" className="block bg-[#25D366] text-white rounded-2xl p-6 flex gap-3 items-center hover:opacity-95 transition">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <p className="font-semibold">Chat on WhatsApp</p>
                  <p className="text-sm opacity-90">Instant responses during business hours</p>
                </div>
              </a>
              <div className="rounded-2xl overflow-hidden border border-border aspect-[4/3]">
                <iframe
                  title="Speedex Signages location"
                  src={COMPANY.mapEmbed}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}