import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  listAllProjects, upsertProject, deleteProject,
  listCategories, upsertCategory, deleteCategory,
} from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Pencil, Trash2, Plus, Tags } from 'lucide-react';
import { toast } from 'sonner';
import { FileUpload, MediaPreview } from '@/components/admin/FileUpload';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export const Route = createFileRoute('/_authenticated/admin/portfolio')({
  component: Portfolio,
});

type Media = { url: string; type: 'image' | 'video'; alt?: string };
type Project = {
  id?: string;
  title: string;
  slug: string;
  category_slug: string | null;
  description: string;
  cover_url: string | null;
  media: Media[];
  client: string | null;
  year: number | null;
  sort_order: number;
  published: boolean;
};

const empty: Project = {
  title: '', slug: '', category_slug: null, description: '',
  cover_url: null, media: [], client: null, year: new Date().getFullYear(),
  sort_order: 0, published: true,
};

function Portfolio() {
  const listP = useServerFn(listAllProjects);
  const saveP = useServerFn(upsertProject);
  const delP = useServerFn(deleteProject);
  const listC = useServerFn(listCategories);
  const saveC = useServerFn(upsertCategory);
  const delC = useServerFn(deleteCategory);
  const qc = useQueryClient();

  const { data: projects } = useQuery({ queryKey: ['admin-projects'], queryFn: () => listP({ data: undefined }) });
  const { data: cats } = useQuery({ queryKey: ['admin-cats'], queryFn: () => listC() });

  const [editing, setEditing] = useState<Project | null>(null);
  const [catModal, setCatModal] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', slug: '' });

  const submitP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    try {
      await saveP({ data: editing as any });
      toast.success('Project saved');
      setEditing(null);
      qc.invalidateQueries({ queryKey: ['admin-projects'] });
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  };

  const removeP = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await delP({ data: { id } });
    qc.invalidateQueries({ queryKey: ['admin-projects'] });
    toast.success('Deleted');
  };

  const submitC = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveC({ data: { ...newCat, sort_order: 0 } as any });
      setNewCat({ name: '', slug: '' });
      qc.invalidateQueries({ queryKey: ['admin-cats'] });
      toast.success('Category added');
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Portfolio"
        subtitle="Manage projects shown on /portfolio."
        addLabel="New project"
        onAdd={() => setEditing({ ...empty })}
        extra={
          <Button variant="outline" size="lg" className="h-12" onClick={() => setCatModal(true)}>
            <Tags className="w-4 h-4 mr-2" />Categories
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects?.map((p: any) => (
          <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden">
            {p.cover_url ? <img src={p.cover_url} alt="" className="w-full h-40 object-cover" /> : <div className="w-full h-40 bg-muted" />}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold truncate">{p.title}</h3>
                {!p.published && <span className="text-xs px-2 py-0.5 rounded-full bg-muted">Draft</span>}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{p.category_slug || 'Uncategorized'} {p.year ? `· ${p.year}` : ''}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" onClick={() => setEditing(p)}><Pencil className="w-3 h-3 mr-1" />Edit</Button>
                <Button size="sm" variant="ghost" onClick={() => removeP(p.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
        {!projects?.length && <p className="text-muted-foreground col-span-full text-center py-12">No projects yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 grid place-items-center p-4 overflow-y-auto" onClick={() => setEditing(null)}>
          <form onSubmit={submitP} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl p-6 max-w-3xl w-full my-8 space-y-4">
            <h2 className="text-xl font-bold">{editing.id ? 'Edit project' : 'New project'}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div><Label>Title</Label><Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required /></div>
              <div><Label>Slug</Label><Input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required /></div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <Label>Category</Label>
                <select className="w-full border border-input bg-background rounded-md h-10 px-3" value={editing.category_slug || ''} onChange={(e) => setEditing({ ...editing, category_slug: e.target.value || null })}>
                  <option value="">Uncategorized</option>
                  {cats?.map((c: any) => <option key={c.id} value={c.slug}>{c.name}</option>)}
                </select>
              </div>
              <div><Label>Client</Label><Input value={editing.client || ''} onChange={(e) => setEditing({ ...editing, client: e.target.value || null })} /></div>
              <div><Label>Year</Label><Input type="number" value={editing.year || ''} onChange={(e) => setEditing({ ...editing, year: Number(e.target.value) || null })} /></div>
            </div>
            <div><Label>Description</Label><Textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></div>

            <div>
              <Label>Cover image</Label>
              <div className="mt-2 flex items-center gap-3">
                {editing.cover_url && <MediaPreview url={editing.cover_url} type="image" onRemove={() => setEditing({ ...editing, cover_url: null })} />}
                <FileUpload bucket="portfolio-media" accept="image/*" label="Upload cover" onUploaded={(files) => setEditing({ ...editing, cover_url: files[0].url })} />
              </div>
            </div>

            <div>
              <Label>Gallery (images + videos)</Label>
              <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {editing.media.map((m, i) => (
                  <MediaPreview key={i} url={m.url} type={m.type} onRemove={() => setEditing({ ...editing, media: editing.media.filter((_, j) => j !== i) })} />
                ))}
              </div>
              <div className="mt-2">
                <FileUpload bucket="portfolio-media" multiple label="Add gallery files" onUploaded={(files) => setEditing({ ...editing, media: [...editing.media, ...files.map((f) => ({ url: f.url, type: f.type }))] })} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2"><Switch checked={editing.published} onCheckedChange={(v) => setEditing({ ...editing, published: v })} /><Label>Published</Label></div>
              <div className="flex items-center gap-2"><Label>Sort order</Label><Input type="number" className="w-20" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} /></div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}

      {catModal && (
        <div className="fixed inset-0 bg-black/60 z-50 grid place-items-center p-4" onClick={() => setCatModal(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl p-6 max-w-md w-full space-y-4">
            <h2 className="text-xl font-bold">Categories</h2>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {cats?.map((c: any) => (
                <li key={c.id} className="flex items-center justify-between border border-border rounded-lg px-3 py-2">
                  <span className="text-sm">{c.name} <span className="text-muted-foreground text-xs">/{c.slug}</span></span>
                  <Button size="icon" variant="ghost" onClick={async () => { await delC({ data: { id: c.id } }); qc.invalidateQueries({ queryKey: ['admin-cats'] }); }}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </li>
              ))}
              {!cats?.length && <p className="text-sm text-muted-foreground text-center py-4">No categories yet.</p>}
            </ul>
            <form onSubmit={submitC} className="flex gap-2">
              <Input placeholder="Name" value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value, slug: newCat.slug || e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') })} required />
              <Input placeholder="slug" value={newCat.slug} onChange={(e) => setNewCat({ ...newCat, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required />
              <Button type="submit">Add</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}