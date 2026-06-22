import { useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { publicListTestimonials, submitTestimonial } from '@/lib/admin/content.functions';
import { Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Reveal } from '@/components/Reveal';
import { toast } from 'sonner';

export function CustomerFeedback() {
  const fetchList = useServerFn(publicListTestimonials);
  const submit = useServerFn(submitTestimonial);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['public-testimonials'], queryFn: () => fetchList() });

  const [form, setForm] = useState({ name: '', company: '', rating: 5, content: '' });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: form as any });
      toast.success('Thank you! Your review will appear after our team approves it.');
      setForm({ name: '', company: '', rating: 5, content: '' });
      qc.invalidateQueries({ queryKey: ['public-testimonials'] });
    } catch (err: any) {
      toast.error(err?.message || 'Could not submit');
    } finally {
      setLoading(false);
    }
  };

  const items = data ?? [];
  const avg = items.length ? items.reduce((s: number, t: any) => s + t.rating, 0) / items.length : 0;

  return (
    <section className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="text-center mb-10">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Customer Feedback</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">What clients say about us</h2>
            {items.length > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(avg) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`} />)}</div>
                <span className="text-sm font-semibold">{avg.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground">· {items.length} review{items.length === 1 ? '' : 's'}</span>
              </div>
            )}
          </div>
        </Reveal>

        {items.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {items.slice(0, 6).map((t: any, i: number) => (
              <Reveal key={t.id} direction="up" delay={(i % 6) * 0.05}>
                <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col">
                  <Quote className="w-6 h-6 text-primary/40" />
                  <p className="text-sm mt-3 flex-1">{t.content}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      {t.company && <p className="text-xs text-muted-foreground">{t.company}</p>}
                    </div>
                    <div className="flex">{Array.from({ length: 5 }).map((_, j) => <Star key={j} className={`w-3 h-3 ${j < t.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`} />)}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold">Leave us a review</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input placeholder="Your name *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required maxLength={120} />
              <Input placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })} aria-label={`${n} stars`}>
                    <Star className={`w-7 h-7 ${n <= form.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea placeholder="Tell us about your experience *" rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required maxLength={2000} />
            <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
              {loading ? 'Submitting…' : 'Submit review'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">Reviews appear on the site after admin approval.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}