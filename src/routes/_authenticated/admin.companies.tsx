import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { listAllCompanies, upsertCompany, deleteCompany, reorderCompanies, duplicateCompany } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/admin/FileUpload';
import { toast } from 'sonner';
import { Plus, Trash2, Save, Edit3, Tags, Copy, GripVertical } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export const Route = createFileRoute('/_authenticated/admin/companies')({
  head: () => ({
    meta: [
      { title: 'Manage Companies | Admin' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminCompaniesPage,
});

type Company = {
  id?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  services: string[];
  hero_image: string | null;
  logo_url: string | null;
  banner_url: string | null;
  mobile_banner_url: string | null;
  accent_color: string;
  website_url: string | null;
  sort_order: number;
  active: boolean;
};

const blank: Company = {
  name: '',
  slug: '',
  tagline: '',
  description: '',
  services: [],
  hero_image: null,
  logo_url: null,
  banner_url: null,
  mobile_banner_url: null,
  accent_color: '#F58220',
  website_url: null,
  sort_order: 0,
  active: true,
};

function AdminCompaniesPage() {
  const list = useServerFn(listAllCompanies);
  const upsert = useServerFn(upsertCompany);
  const del = useServerFn(deleteCompany);
  const reorder = useServerFn(reorderCompanies);
  const duplicate = useServerFn(duplicateCompany);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-companies'], queryFn: () => list() });
  const [editing, setEditing] = useState<Company | null>(null);
  const [order, setOrder] = useState<any[] | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const rows: any[] = order ?? (data ?? []);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin-companies'] });
    qc.invalidateQueries({ queryKey: ['public-companies'] });
    setOrder(null);
  };

  const onDrop = async (to: number) => {
    const from = dragIndex;
    setDragIndex(null);
    if (from === null || from === to) return;
    const next = [...rows];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setOrder(next);
    try {
      await reorder({ data: { ids: next.map((r) => r.id) } });
      toast.success('Order saved');
      refresh();
    } catch (e: any) {
      toast.error(e.message || 'Reorder failed');
      setOrder(null);
    }
  };

  const onDuplicate = async (id: string) => {
    try {
      await duplicate({ data: { id } });
      toast.success('Company duplicated (saved as inactive)');
      refresh();
    } catch (e: any) {
      toast.error(e.message || 'Duplicate failed');
    }
  };

  const onSave = async () => {
    if (!editing) return;
    try {
      await upsert({ data: editing as any });
      toast.success('Saved');
      setEditing(null);
      refresh();
    } catch (e: any) {
      toast.error(e.message || 'Save failed');
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this company?')) return;
    try {
      await del({ data: { id } });
      toast.success('Deleted');
      refresh();
    } catch (e: any) {
      toast.error(e.message || 'Delete failed');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <AdminPageHeader
        title="Companies"
        subtitle="Manage the Speedex Group companies shown on the public site."
        addLabel="Add company"
        onAdd={() => setEditing({ ...blank })}
      />

      {editing && (
        <Card className="p-5 space-y-4 border-primary/40">
          <h2 className="font-semibold">{editing.id ? 'Edit' : 'New'} company</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <Label>Name</Label>
              <Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} maxLength={200} />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })} maxLength={160} />
            </div>
          </div>
          <div>
            <Label>Tagline</Label>
            <Input value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} maxLength={400} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} maxLength={8000} />
          </div>
          <div>
            <Label>Services (one per line)</Label>
            <Textarea
              rows={5}
              value={(editing.services ?? []).join('\n')}
              onChange={(e) => setEditing({ ...editing, services: e.target.value.split('\n').map((s) => s.trim()).filter(Boolean) })}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <Label>Accent color</Label>
              <Input type="color" value={editing.accent_color} onChange={(e) => setEditing({ ...editing, accent_color: e.target.value })} />
            </div>
            <div>
              <Label>Sort order</Label>
              <Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
            </div>
            <div className="flex items-end gap-2">
              <Switch checked={editing.active} onCheckedChange={(v) => setEditing({ ...editing, active: v })} />
              <Label>Active</Label>
            </div>
          </div>
          <div>
            <Label>Website URL</Label>
            <Input
              value={editing.website_url ?? ''}
              placeholder="https://speedexsignages.ae"
              onChange={(e) => setEditing({ ...editing, website_url: e.target.value.trim() || null })}
              maxLength={800}
            />
            <p className="text-xs text-muted-foreground mt-1">
              If this starts with http:// or https://, the "Explore Company" button opens this website in a new tab. Leave empty to use the internal company page.
            </p>
          </div>
          <div>
            <Label>Logo</Label>
            <div className="flex items-center gap-3 mt-1">
              {editing.logo_url && (
                <img src={editing.logo_url} alt="" className="h-16 w-16 object-contain rounded-md border border-border bg-white p-1" />
              )}
              <FileUpload
                bucket="company-logos"
                accept="image/*"
                label={editing.logo_url ? 'Replace logo' : 'Upload logo'}
                onUploaded={(files) => {
                  const first = files[0];
                  if (first) setEditing({ ...editing, logo_url: first.url });
                }}
              />
              {editing.logo_url && (
                <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, logo_url: null })}>Remove</Button>
              )}
            </div>
          </div>
          <div>
            <Label>Background image</Label>
            <div className="flex items-center gap-3 mt-1">
              {editing.banner_url && (
                <img src={editing.banner_url} alt="" className="h-16 w-24 object-cover rounded-md border border-border" />
              )}
              <FileUpload
                bucket="portfolio-media"
                accept="image/*"
                label={editing.banner_url ? 'Replace background' : 'Upload background'}
                onUploaded={(files) => {
                  const first = files[0];
                  if (first) setEditing({ ...editing, banner_url: first.url });
                }}
              />
              {editing.banner_url && (
                <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, banner_url: null })}>Remove</Button>
              )}
            </div>
          </div>
          <div>
            <Label>Mobile background image (optional)</Label>
            <div className="flex items-center gap-3 mt-1">
              {editing.mobile_banner_url && (
                <img src={editing.mobile_banner_url} alt="" className="h-16 w-12 object-cover rounded-md border border-border" />
              )}
              <FileUpload
                bucket="portfolio-media"
                accept="image/*"
                label={editing.mobile_banner_url ? 'Replace mobile image' : 'Upload mobile image'}
                onUploaded={(files) => {
                  const first = files[0];
                  if (first) setEditing({ ...editing, mobile_banner_url: first.url });
                }}
              />
              {editing.mobile_banner_url && (
                <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, mobile_banner_url: null })}>Remove</Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Used on phones/portrait screens. Falls back to the background image when empty.</p>
          </div>
          <div>
            <Label>Hero image</Label>
            <div className="flex items-center gap-3 mt-1">
              {editing.hero_image && (
                <img src={editing.hero_image} alt="" className="h-16 w-24 object-cover rounded-md border border-border" />
              )}
              <FileUpload
                bucket="portfolio-media"
                accept="image/*"
                label={editing.hero_image ? 'Replace image' : 'Upload image'}
                onUploaded={(files) => {
                  const first = files[0];
                  if (first) setEditing({ ...editing, hero_image: first.url });
                }}
              />
              {editing.hero_image && (
                <Button variant="ghost" size="sm" onClick={() => setEditing({ ...editing, hero_image: null })}>Remove</Button>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={onSave}><Save className="w-4 h-4" /> Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      {isLoading && <p>Loading…</p>}
      <p className="text-xs text-muted-foreground">Drag a card by the handle to change the order shown in the homepage slider.</p>
      <div className="space-y-2">
        {rows.map((c: any, i: number) => (
          <Card
            key={c.id}
            draggable
            onDragStart={() => setDragIndex(i)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(i)}
            className={`p-4 flex items-center gap-4 ${dragIndex === i ? 'opacity-50' : ''}`}
          >
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab shrink-0" />
            <div
              className="w-12 h-12 rounded-lg text-white grid place-items-center font-bold shrink-0"
              style={{ background: c.accent_color }}
            >
              {c.name.split(' ').slice(0, 2).map((w: string) => w[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{c.name} {!c.active && <span className="text-xs text-muted-foreground">(inactive)</span>}</p>
              <p className="text-xs text-muted-foreground truncate">{c.tagline}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setEditing(c)}><Edit3 className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" title="Duplicate" onClick={() => onDuplicate(c.id)}><Copy className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}