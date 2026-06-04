import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { JOBS, BENEFITS } from '@/lib/site-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Briefcase, MapPin, Upload, CheckCircle2 } from 'lucide-react';
import { useServerFn } from '@tanstack/react-start';
import { submitApplication } from '@/lib/api/forms.functions';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const Route = createFileRoute('/careers')({
  head: () => ({
    meta: [
      { title: 'Careers — Join Speedex Signages UAE' },
      { name: 'description', content: "We're hiring designers, fabricators, installers and project managers across the UAE. Explore openings at Speedex Signages." },
      { property: 'og:title', content: 'Careers at Speedex Signages' },
      { property: 'og:description', content: 'Build your career with the UAE’s trusted signage company.' },
    ],
  }),
  component: CareersPage,
});

function CareersPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Careers</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Build your career with us</h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">Join a multicultural team crafting signage that defines UAE skylines and brands.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-10">
          <Reveal direction="left" className="lg:col-span-1">
            <div>
              <h2 className="text-2xl font-bold">Why Speedex</h2>
              <p className="mt-3 text-muted-foreground">We invest in our people and the craft. Here's what you get:</p>
              <ul className="mt-5 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-2 space-y-4">
            <Reveal><h2 className="text-2xl font-bold">Open positions</h2></Reveal>
            {JOBS.map((j, i) => (
              <Reveal key={j.title} direction="up" delay={i * 0.05}>
                <div className="bg-card border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary transition">
                  <div>
                    <h3 className="font-semibold text-lg">{j.title}</h3>
                    <div className="mt-1 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {j.dept}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {j.location}</span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{j.type}</span>
                    </div>
                  </div>
                  <Button onClick={() => setOpen(j.title)} className="bg-primary text-primary-foreground">Apply Now</Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ApplyDialog position={open} onClose={() => setOpen(null)} />
    </>
  );
}

function ApplyDialog({ position, onClose }: { position: string | null; onClose: () => void }) {
  const submit = useServerFn(submitApplication);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!position) return;
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      let cvPath = '';
      if (file) {
        if (file.size > 8 * 1024 * 1024) throw new Error('CV must be under 8 MB');
        const ext = file.name.split('.').pop() || 'pdf';
        cvPath = `applications/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from('cvs').upload(cvPath, file, { upsert: false, contentType: file.type || 'application/octet-stream' });
        if (error) throw new Error('CV upload failed');
      }
      await submit({ data: {
        name: String(fd.get('name') || ''),
        email: String(fd.get('email') || ''),
        phone: String(fd.get('phone') || ''),
        position,
        cover_letter: String(fd.get('cover_letter') || ''),
        cv_path: cvPath,
      } });
      toast.success('Application submitted! Our team will be in touch.');
      onClose();
      setFile(null);
    } catch (err) {
      toast.error((err as Error).message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!position} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Apply for {position}</DialogTitle></DialogHeader>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input name="name" placeholder="Full name" required maxLength={120} />
          <Input name="email" type="email" placeholder="Email" required maxLength={255} />
          <Input name="phone" placeholder="Phone" maxLength={40} />
          <Textarea name="cover_letter" placeholder="Brief cover letter (optional)" rows={4} maxLength={2000} />
          <label className="block">
            <span className="text-sm font-medium">CV (PDF / DOCX, max 8MB)</span>
            <div className="mt-1 flex items-center gap-3 border border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-primary">
              <Upload className="w-5 h-5 text-muted-foreground" />
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} className="flex-1 text-sm" />
            </div>
            {file && <p className="text-xs text-muted-foreground mt-1">{file.name}</p>}
          </label>
          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground">
            {loading ? 'Submitting…' : 'Submit Application'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}