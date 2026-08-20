import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import {
  listSlides,
  upsertSlide,
  deleteSlide,
  reorderSlides,
  listAllCompanies,
} from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/admin/FileUpload';
import { toast } from 'sonner';
import { Plus, Trash2, Save, Edit3, ArrowUp, ArrowDown, Eye } from 'lucide-react';

export type SliderContext = 'home_our_companies' | 'our_groups';

type Slide = {
  id?: string;
  context: SliderContext;
  company_id: string | null;
  image_url: string | null;
  mobile_image_url: string | null;
  title: string;
  description: string;
  sort_order: number;
  visible: boolean;
};

function blank(context: SliderContext, sort_order: number): Slide {
  return {
    context,
    company_id: null,
    image_url: null,
    mobile_image_url: null,
    title: '',
    description: '',
    sort_order,
    visible: true,
  };
}

export function SlideManager({ context, folder }: { context: SliderContext; folder: string }) {
  const list = useServerFn(listSlides);
  const upsert = useServerFn(upsertSlide);
  const del = useServerFn(deleteSlide);
  const reorder = useServerFn(reorderSlides);
  const companiesFn = useServerFn(listAllCompanies);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-slides', context],
    queryFn: () => list({ data: { context } }),
  });
  const { data: companies } = useQuery({ queryKey: ['admin-companies'], queryFn: () => companiesFn() });

  const [editing, setEditing] = useState<Slide | null>(null);
  const rows: any[] = (data ?? []) as any[];

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin-slides', context] });
    qc.invalidateQueries({ queryKey: ['slides', context] });
  };

  const save = async () => {
    if (!editing) return;
    try {
      await upsert({ data: editing });
      toast.success('Slide saved');
      setEditing(null);
      refresh();
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not save slide');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this slide? Company records and logos are not affected.')) return;
    try {
      await del({ data: { id } });
      toast.success('Slide deleted');
      refresh();
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not delete slide');
    }
  };

  const move = async (index: number, dir: -1 | 1) => {
    const next = [...rows];
    const to = index + dir;
    if (to < 0 || to >= next.length) return;
    const [item] = next.splice(index, 1);
    next.splice(to, 0, item);
    try {
      await reorder({ data: { ids: next.map((r) => r.id) } });
      refresh();
    } catch (e: any) {
      toast.error(e?.message ?? 'Could not reorder');
    }
  };

  const companyName = (id: string | null) =>
    (companies as any[] | undefined)?.find((c) => c.id === id)?.name ?? 'No company linked';

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setEditing(blank(context, rows.length))}>
          <Plus className="mr-2 h-4 w-4" /> Add slide
        </Button>
      </div>

      {editing && (
        <Card className="space-y-5 p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Company (logo, name and text come from this record)</Label>
              <select
                className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={editing.company_id ?? ''}
                onChange={(e) => setEditing({ ...editing, company_id: e.target.value || null })}
              >
                <option value="">— none —</option>
                {((companies as any[]) ?? []).map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-muted-foreground">
                Company logos are never changed here. Edit them under Our Groups (companies).
              </p>
            </div>

            <div className="flex items-end gap-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={editing.visible}
                  onCheckedChange={(v) => setEditing({ ...editing, visible: v })}
                />
                <Label>Visible</Label>
              </div>
            </div>

            <div>
              <Label>Title override (optional)</Label>
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Leave blank to use the company name"
              />
            </div>

            <div>
              <Label>Description override (optional)</Label>
              <Textarea
                rows={3}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                placeholder="Leave blank to use the company description"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Label>Background image (desktop)</Label>
              <div className="mt-2 overflow-hidden rounded-xl border border-border bg-muted" style={{ aspectRatio: '16 / 9' }}>
                {editing.image_url ? (
                  <img src={editing.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-muted-foreground">No background image</div>
                )}
              </div>
              <div className="mt-2 flex gap-2">
                <FileUpload
                  folder={folder}
                  accept="image/*"
                  label={editing.image_url ? 'Replace image' : 'Upload image'}
                  onUploaded={(files) => setEditing((s) => (s && files[0] ? { ...s, image_url: files[0].url } : s))}
                />
                {editing.image_url && (
                  <Button variant="outline" onClick={() => setEditing({ ...editing, image_url: null })}>
                    Remove
                  </Button>
                )}
              </div>
            </div>

            <div>
              <Label>Background image (mobile, optional)</Label>
              <div className="mt-2 max-w-[260px] overflow-hidden rounded-xl border border-border bg-muted" style={{ aspectRatio: '9 / 14' }}>
                {editing.mobile_image_url ? (
                  <img src={editing.mobile_image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-muted-foreground">Uses the desktop image</div>
                )}
              </div>
              <div className="mt-2 flex gap-2">
                <FileUpload
                  folder={folder}
                  accept="image/*"
                  label={editing.mobile_image_url ? 'Replace image' : 'Upload image'}
                  onUploaded={(files) => setEditing((s) => (s && files[0] ? { ...s, mobile_image_url: files[0].url } : s))}
                />
                {editing.mobile_image_url && (
                  <Button variant="outline" onClick={() => setEditing({ ...editing, mobile_image_url: null })}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={save}><Save className="mr-2 h-4 w-4" /> Save slide</Button>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </Card>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="space-y-3">
        {rows.map((r, i) => (
          <Card key={r.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="h-20 w-36 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
              {r.image_url ? (
                <img src={r.image_url} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="grid h-full place-items-center text-[11px] text-muted-foreground">No image</div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold">Slide {i + 1} — {r.title?.trim() || companyName(r.company_id)}</p>
              <p className="truncate text-xs text-muted-foreground">
                {r.visible ? 'Visible' : 'Hidden'} · {r.companies?.name ?? companyName(r.company_id)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => move(i, -1)} aria-label="Move up">
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => move(i, 1)} aria-label="Move down">
                <ArrowDown className="h-4 w-4" />
              </Button>
              {r.image_url && (
                <Button variant="outline" size="icon" asChild aria-label="Preview image">
                  <a href={r.image_url} target="_blank" rel="noreferrer"><Eye className="h-4 w-4" /></a>
                </Button>
              )}
              <Button
                variant="outline"
                onClick={() =>
                  setEditing({
                    id: r.id,
                    context,
                    company_id: r.company_id ?? null,
                    image_url: r.image_url ?? null,
                    mobile_image_url: r.mobile_image_url ?? null,
                    title: r.title ?? '',
                    description: r.description ?? '',
                    sort_order: r.sort_order ?? i,
                    visible: !!r.visible,
                  })
                }
              >
                <Edit3 className="mr-2 h-4 w-4" /> Edit
              </Button>
              <Button variant="destructive" size="icon" onClick={() => remove(r.id)} aria-label="Delete slide">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
        {!isLoading && !rows.length && (
          <p className="text-sm text-muted-foreground">No slides yet — add the first one.</p>
        )}
      </div>
    </div>
  );
}