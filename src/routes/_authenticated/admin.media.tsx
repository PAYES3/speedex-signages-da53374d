import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { listMedia, saveMedia, renameMedia, deleteMedia } from '@/lib/admin/media.functions';
import { MEDIA_FOLDERS } from '@/lib/media-folders';
import { FileUpload } from '@/components/admin/FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Copy, Trash2, Pencil, Search } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/admin/media')({
  component: MediaLibrary,
});

function MediaLibrary() {
  const list = useServerFn(listMedia);
  const save = useServerFn(saveMedia);
  const rename = useServerFn(renameMedia);
  const del = useServerFn(deleteMedia);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['admin-media'], queryFn: () => list({ data: undefined }) });
  const [folder, setFolder] = useState<string>('all');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<any | null>(null);

  const items = useMemo(() => {
    let rows = (data ?? []) as any[];
    if (folder !== 'all') rows = rows.filter((r) => r.folder === folder);
    if (q.trim()) rows = rows.filter((r) => `${r.name} ${r.alt}`.toLowerCase().includes(q.toLowerCase()));
    return rows;
  }, [data, folder, q]);

  const uploadFolder = folder === 'all' ? 'general' : folder;

  const onUploaded = async (files: any[]) => {
    await save({
      data: {
        items: files.map((f) => ({
          folder: uploadFolder,
          name: f.name,
          url: f.url,
          path: f.path,
          mime_type: f.mime,
          size_bytes: f.size,
          width: f.width || null,
          height: f.height || null,
          alt: '',
        })),
      },
    });
    qc.invalidateQueries({ queryKey: ['admin-media'] });
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this asset from the library?')) return;
    await del({ data: { ids: [id] } });
    qc.invalidateQueries({ queryKey: ['admin-media'] });
    toast.success('Deleted');
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    await rename({ data: { id: editing.id, name: editing.name, alt: editing.alt ?? '', folder: editing.folder } });
    setEditing(null);
    qc.invalidateQueries({ queryKey: ['admin-media'] });
    toast.success('Saved');
  };

  return (
    <div>
      <AdminPageHeader title="Media Library" subtitle="Upload once, reuse anywhere. Images are compressed and converted to WebP automatically." />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <FileUpload folder={uploadFolder} multiple accept="image/*,video/*,application/pdf" label="Bulk upload" onUploaded={onUploaded} />
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search media…" className="pl-9 w-56" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {['all', ...MEDIA_FOLDERS].map((f) => (
          <button
            key={f}
            onClick={() => setFolder(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition ${
              folder === f ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/70'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map((m) => (
          <div key={m.id} className="rounded-xl border border-border bg-card overflow-hidden group">
            <div className="aspect-square bg-muted grid place-items-center overflow-hidden">
              {m.mime_type?.startsWith('video/') ? (
                <video src={m.url} className="w-full h-full object-cover" muted />
              ) : m.mime_type === 'application/pdf' ? (
                <span className="text-xs font-bold text-muted-foreground">PDF</span>
              ) : (
                <img src={m.url} alt={m.alt || m.name} className="w-full h-full object-cover" loading="lazy" />
              )}
            </div>
            <div className="p-3">
              <p className="text-xs font-semibold truncate" title={m.name}>{m.name}</p>
              <p className="text-[11px] text-muted-foreground">
                {m.folder} · {Math.max(1, Math.round((m.size_bytes || 0) / 1024))} KB
              </p>
              <div className="flex gap-1 mt-2">
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => { navigator.clipboard.writeText(m.url); toast.success('URL copied'); }}>
                  <Copy className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditing({ ...m })}>
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => remove(m.id)}>
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {!items.length && <p className="col-span-full text-center text-muted-foreground py-16">No media in this folder yet.</p>}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 grid place-items-center p-4" onClick={() => setEditing(null)}>
          <form onSubmit={saveEdit} onClick={(e) => e.stopPropagation()} className="bg-card border border-border rounded-2xl p-6 w-full max-w-md space-y-4">
            <h2 className="text-xl font-bold">Edit asset</h2>
            <div><Label>Name</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required /></div>
            <div><Label>Alt text</Label><Input value={editing.alt ?? ''} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} /></div>
            <div>
              <Label>Folder</Label>
              <select
                className="mt-1 w-full h-11 rounded-lg border border-input bg-background px-3 text-sm"
                value={editing.folder}
                onChange={(e) => setEditing({ ...editing, folder: e.target.value })}
              >
                {MEDIA_FOLDERS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
