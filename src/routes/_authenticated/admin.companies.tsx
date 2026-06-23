import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useState } from 'react';
import { listAllCompanies, upsertCompany, deleteCompany } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/admin/FileUpload';
import { toast } from 'sonner';
import { Plus, Trash2, Save, Edit3 } from 'lucide-react';

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
  accent_color: '#0E7C7B',
  website_url: null,
  sort_order: 0,
  active: true,
};

function AdminCompaniesPage() {
  const list = useServerFn(listAllCompanies);
  const upsert = useServerFn(upsertCompany);
  const del = useServerFn(deleteCompany);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ['admin-companies'], queryFn: () => list() });
  const [editing, setEditing] = useState<Company | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin-companies'] });
    qc.invalidateQueries({ queryKey: ['public-companies'] });
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
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Companies</h1>
          <p className="text-sm text-muted-foreground">Manage the Speedex Group companies shown on the public site.</p>
        </div>
        <Button onClick={() => setEditing({ ...blank })}>
          <Plus className="w-4 h-4" /> Add company
        </Button>
      </div>

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
            <Label>Hero image</Label>
            <FileUpload
              bucket="portfolio-media"
              accept="image/*"
              currentUrl={editing.hero_image || ''}
              onUploaded={(url) => setEditing({ ...editing, hero_image: url })}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={onSave}><Save className="w-4 h-4" /> Save</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      {isLoading && <p>Loading…</p>}
      <div className="space-y-2">
        {(data ?? []).map((c: any) => (
          <Card key={c.id} className="p-4 flex items-center gap-4">
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
            <Button variant="ghost" size="sm" onClick={() => onDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </Card>
        ))}
      </div>
    </div>
  );
}