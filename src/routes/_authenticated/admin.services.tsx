import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { listAllServices, upsertService, deleteService } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { FileUpload, MediaPreview } from '@/components/admin/FileUpload';

export const Route = createFileRoute('/_authenticated/admin/services')({
  component: Services,
});

type Svc = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  image_url: string | null;
  sort_order: number;
  published: boolean;
};

const empty: Svc = { title: '', slug: '', description: '', icon: 'Sparkles', image_url: null, sort_order: 0, published: true };

function Services() {
  const list = useServerFn(listAllServices);
  const save = useServerFn(upsertService);
  const del = useServerFn(deleteService);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['admin-services'], queryFn: () => list({ data: undefined }) });
  const [editing, setEditing] = useState<Svc | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      await save({ data: editing as any });
      toast.success('Saved');
      setEditing(null);
      qc.invalidateQueries({ queryKey: ['admin-services'] });
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await del({ data: { id } });
    qc.invalidateQueries({ queryKey: ['admin-services'] });
    toast.success('Deleted');
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Services</h1>
          <p className="text-muted-foreground mt-1">Manage what appears on /services.</p>
        </div>
        <Button onClick={() => setEditing({ ...empty })}><Plus className="w-4 h-4 mr-2" />New service</Button>
      </header>

      <div className="grid lg:grid-cols-2 gap-4">
        {data?.map((s: any) => (
          <div key={s.id} className="bg-card border border-border rounded-xl p-4 flex gap-4">
            {s.image_url ? <img src={s.image_url} alt="" className="w-20 h-20 rounded-lg object-cover" /> : <div className="w-20 h-20 rounded-lg bg-muted" />}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{s.title}</h3>
                {!s.published && <span className="text-xs px-2 py-0.5 rounded-full bg-muted">Draft</span>}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{s.description}</p>
              <p className="text-xs text-muted-foreground mt-1">/{s.slug}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="icon" variant="ghost" onClick={() => setEditing(s)}><Pencil className="w-4 h-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => remove(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
        {!data?.length && <p className="text-muted-foreground col-span-full text-center py-12">No services yet. Click "New service" to add one.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 grid place-items-center p-4" onClick={() => setEditing(null)}>
          <form onSubmit={submit} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h2 className="text-xl font-bold">{editing.id ? 'Edit service' : 'New service'}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></div>
              <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required /></div>
            </div>
            <div><Label>Description</Label><Textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Icon (lucide name)</Label><Input value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} /></div>
              <div><Label>Sort order</Label><Input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>
            <div>
              <Label>Image</Label>
              <div className="mt-2 flex items-center gap-3">
                {editing.image_url && <MediaPreview url={editing.image_url} type="image" onRemove={() => setEditing({ ...editing, image_url: null })} />}
                <FileUpload bucket="services-media" accept="image/*" label="Upload image" onUploaded={(files) => setEditing({ ...editing, image_url: files[0].url })} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
              <Label>Published</Label>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}