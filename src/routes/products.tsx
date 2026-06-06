import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { Reveal } from '@/components/Reveal';
import { PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/site-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, ArrowRight } from 'lucide-react';
import { useServerFn } from '@tanstack/react-start';
import { submitQuote } from '@/lib/api/forms.functions';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

export const Route = createFileRoute('/products')({
  head: () => ({
    meta: [
      { title: 'Signage Products UAE | LED, Acrylic, Neon & 3D | Speedex' },
      { name: 'description', content: 'Signage product catalog for the UAE — LED signs, acrylic 3D letters, LED neon, reception logos, illuminated pylons, exit signs and wayfinding plaques.' },
      { property: 'og:title', content: 'Speedex Signages — Signage Products UAE' },
      { property: 'og:description', content: 'A complete signage product catalog for businesses across the UAE.' },
      { property: 'og:url', content: '/products' },
    ],
    links: [{ rel: 'canonical', href: '/products' }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const [openProduct, setOpenProduct] = useState<typeof PRODUCTS[number] | null>(null);
  const [inquiry, setInquiry] = useState<typeof PRODUCTS[number] | null>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => (filter === 'All' || p.category === filter) && p.name.toLowerCase().includes(q.toLowerCase()));
  }, [filter, q]);

  return (
    <>
      <section className="pt-32 pb-10 bg-gradient-to-br from-secondary/40 to-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <Reveal>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider">Products</p>
            <h1 className="text-4xl sm:text-6xl font-bold mt-3">Signage product catalog</h1>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto">Explore our most-requested signage products. Need something custom? Just ask.</p>
          </Reveal>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search products…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-2">
              {PRODUCT_CATEGORIES.map((c) => (
                <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1.5 rounded-full text-xs font-medium transition border ${
                  filter === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:border-primary'
                }`}>{c}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && <p className="text-center text-muted-foreground py-16">No products match your search.</p>}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p, i) => (
              <Reveal key={p.id} direction="up" delay={(i % 6) * 0.05}>
                <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all h-full flex flex-col">
                  <button onClick={() => setOpenProduct(p)} className="aspect-square overflow-hidden bg-muted">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </button>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                    <h3 className="mt-1 font-semibold">{p.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 flex-1">{p.desc}</p>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => setOpenProduct(p)}>Details</Button>
                      <Button size="sm" className="flex-1 bg-primary text-primary-foreground" onClick={() => setInquiry(p)}>Inquire</Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!openProduct} onOpenChange={(v) => !v && setOpenProduct(null)}>
        <DialogContent className="max-w-2xl">
          {openProduct && (
            <>
              <DialogHeader><DialogTitle>{openProduct.name}</DialogTitle></DialogHeader>
              <img src={openProduct.img} alt={openProduct.name} className="rounded-lg w-full aspect-video object-cover" />
              <p className="text-sm text-muted-foreground">{openProduct.desc}</p>
              <Button onClick={() => { setInquiry(openProduct); setOpenProduct(null); }} className="bg-primary text-primary-foreground">
                Request a Quotation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <InquiryDialog product={inquiry} onClose={() => setInquiry(null)} />
    </>
  );
}

function InquiryDialog({ product, onClose }: { product: typeof PRODUCTS[number] | null; onClose: () => void }) {
  const submit = useServerFn(submitQuote);
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
        subject: `Quote: ${product?.name || ''}`,
        message: String(fd.get('message') || 'Please send a quotation.'),
      } });
      toast.success("Inquiry sent! We'll get back to you shortly.");
      onClose();
    } catch (err) {
      toast.error('Could not send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
    void submit;
  };
  return (
    <Dialog open={!!product} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg">
        {product && (
          <>
            <DialogHeader><DialogTitle>Inquire about {product.name}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-3">
              <Input name="name" placeholder="Full name" required maxLength={120} />
              <Input name="email" type="email" placeholder="Email" required maxLength={255} />
              <Input name="phone" placeholder="Phone (optional)" maxLength={40} />
              <Textarea name="message" placeholder="Tell us about quantity, size, location…" rows={4} maxLength={2000} />
              <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground">
                {loading ? 'Sending…' : 'Send inquiry'}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}