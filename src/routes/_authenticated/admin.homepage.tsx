import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  listSections, saveSection, deleteSection, duplicateSection, reorderSections,
  listHeroSlides, saveHeroSlide, deleteHeroSlide, duplicateHeroSlide, reorderHeroSlides,
  listVersions, restoreVersion,
} from '@/lib/admin/cms.functions';
import { SECTION_TYPES, DEFAULT_HOME_ORDER, sectionDef } from '@/lib/cms/section-types';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { FileUpload, MediaPreview } from '@/components/admin/FileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import {
  GripVertical, Eye, EyeOff, Copy, Trash2, Plus, Save, History, ExternalLink, ChevronUp, ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/admin/homepage')({
  head: () => ({ meta: [{ title: 'Homepage Builder | Admin' }, { name: 'robots', content: 'noindex, nofollow' }] }),
  component: HomepageBuilder,
});

type Section = {
  id: string;
  page: string;
  section_type: string;
  sort_order: number;
  visible: boolean;
  status: string;
  publish_at: string | null;
  data: Record<string, string>;
};

function HomepageBuilder() {
  return (
    <div>
      <AdminPageHeader title="Homepage Builder" subtitle="Enable, reorder, edit, duplicate and schedule every block on the homepage." />
      <Tabs defaultValue="sections">
        <TabsList className="mb-6">
          <TabsTrigger value="sections">Sections</TabsTrigger>
          <TabsTrigger value="hero">Hero slides</TabsTrigger>
        </TabsList>
        <TabsContent value="sections"><SectionsTab /></TabsContent>
        <TabsContent value="hero"><HeroTab /></TabsContent>
      </Tabs>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SECTIONS                                                            */
/* ------------------------------------------------------------------ */
function SectionsTab() {
  const list = useServerFn(listSections);
  const save = useServerFn(saveSection);
  const remove = useServerFn(deleteSection);
  const dup = useServerFn(duplicateSection);
  const reorder = useServerFn(reorderSections);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['admin-sections', 'home'], queryFn: () => list({ data: { page: 'home' } }) });
  const [rows, setRows] = useState<Section[]>([]);
  const [editing, setEditing] = useState<Section | null>(null);
  const [adding, setAdding] = useState(false);
  const [history, setHistory] = useState<Section | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  useEffect(() => { if (data) setRows(data as Section[]); }, [data]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin-sections', 'home'] });
    qc.invalidateQueries({ queryKey: ['page-sections', 'home'] });
  };

  const seedDefaults = async () => {
    try {
      for (let i = 0; i < DEFAULT_HOME_ORDER.length; i++) {
        await save({ data: { page: 'home', section_type: DEFAULT_HOME_ORDER[i], sort_order: i, visible: true, status: 'published', data: {} } });
      }
      toast.success('Homepage sections created');
      refresh();
    } catch (e: any) { toast.error(e?.message || 'Could not create sections'); }
  };

  const persistOrder = async (next: Section[]) => {
    setRows(next);
    try { await reorder({ data: { ids: next.map((r) => r.id) } }); refresh(); }
    catch (e: any) { toast.error(e?.message || 'Reorder failed'); }
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= rows.length) return;
    const next = [...rows];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    persistOrder(next);
  };

  const toggle = async (row: Section, patch: Partial<Section>) => {
    try {
      await save({ data: { ...row, ...patch, publish_at: row.publish_at ?? null } as any });
      refresh();
    } catch (e: any) { toast.error(e?.message || 'Update failed'); }
  };

  if (!rows.length) {
    return (
      <div className="bg-card border border-border rounded-2xl p-10 text-center">
        <p className="text-muted-foreground">Your homepage is still using the built-in layout.</p>
        <Button className="mt-5 rounded-full px-6" onClick={seedDefaults}>
          <Plus className="w-4 h-4 mr-2" /> Import current homepage into the builder
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <p className="text-sm text-muted-foreground">Drag a row (or use the arrows) to change the order on the live site.</p>
        <div className="flex gap-2">
          <a href="/" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" className="rounded-full"><ExternalLink className="w-4 h-4 mr-2" /> Preview site</Button>
          </a>
          <Button size="sm" className="rounded-full" onClick={() => setAdding(true)}><Plus className="w-4 h-4 mr-2" /> Add section</Button>
        </div>
      </div>

      <div className="space-y-2">
        {rows.map((row, i) => {
          const def = sectionDef(row.section_type);
          const scheduled = row.publish_at && new Date(row.publish_at) > new Date();
          return (
            <div
              key={row.id}
              draggable
              onDragStart={() => setDragIdx(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => { if (dragIdx !== null && dragIdx !== i) move(dragIdx, i); setDragIdx(null); }}
              className={`flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 ${row.visible ? '' : 'opacity-60'}`}
            >
              <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab shrink-0" />
              <div className="flex flex-col">
                <button onClick={() => move(i, i - 1)} className="text-muted-foreground hover:text-foreground" aria-label="Move up"><ChevronUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => move(i, i + 1)} className="text-muted-foreground hover:text-foreground" aria-label="Move down"><ChevronDown className="w-3.5 h-3.5" /></button>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold truncate">{def?.label ?? row.section_type}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {row.data?.title || def?.description}
                </p>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${row.status === 'published' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                {scheduled ? 'Scheduled' : row.status === 'published' ? 'Published' : 'Draft'}
              </span>
              <button title={row.visible ? 'Hide section' : 'Show section'} onClick={() => toggle(row, { visible: !row.visible })}
                className="w-9 h-9 grid place-items-center rounded-lg hover:bg-muted">
                {row.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button title="Version history" onClick={() => setHistory(row)} className="w-9 h-9 grid place-items-center rounded-lg hover:bg-muted"><History className="w-4 h-4" /></button>
              <button title="Duplicate" onClick={async () => { await dup({ data: { id: row.id } }); refresh(); }} className="w-9 h-9 grid place-items-center rounded-lg hover:bg-muted"><Copy className="w-4 h-4" /></button>
              <button title="Delete" onClick={async () => { if (confirm('Delete this section?')) { await remove({ data: { id: row.id } }); refresh(); } }}
                className="w-9 h-9 grid place-items-center rounded-lg hover:bg-destructive/10 text-destructive"><Trash2 className="w-4 h-4" /></button>
              <Button size="sm" variant="outline" className="rounded-full" onClick={() => setEditing(row)}>Edit</Button>
            </div>
          );
        })}
      </div>

      {editing && (
        <SectionEditor section={editing} onClose={() => setEditing(null)} onSaved={refresh} />
      )}
      {adding && (
        <AddSectionDialog
          onClose={() => setAdding(false)}
          onPick={async (type) => {
            await save({ data: { page: 'home', section_type: type, sort_order: rows.length, visible: true, status: 'draft', data: {} } });
            setAdding(false); refresh(); toast.success('Section added as a draft');
          }}
        />
      )}
      {history && <HistoryDialog entityType="page_section" entityId={history.id} onClose={() => setHistory(null)} onRestored={refresh} />}
    </div>
  );
}

function AddSectionDialog({ onClose, onPick }: { onClose: () => void; onPick: (type: string) => void }) {
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle>Add a section</DialogTitle></DialogHeader>
        <div className="grid sm:grid-cols-2 gap-2 max-h-[60vh] overflow-auto">
          {SECTION_TYPES.map((t) => (
            <button key={t.type} onClick={() => onPick(t.type)}
              className="text-left p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition">
              <p className="font-semibold">{t.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.description}</p>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionEditor({ section, onClose, onSaved }: { section: Section; onClose: () => void; onSaved: () => void }) {
  const save = useServerFn(saveSection);
  const def = sectionDef(section.section_type);
  const [values, setValues] = useState<Record<string, string>>(section.data ?? {});
  const [status, setStatus] = useState(section.status);
  const [visible, setVisible] = useState(section.visible);
  const [publishAt, setPublishAt] = useState(section.publish_at ? section.publish_at.slice(0, 16) : '');
  const [busy, setBusy] = useState(false);

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));

  const submit = async (overrideStatus?: string) => {
    setBusy(true);
    try {
      await save({
        data: {
          id: section.id,
          page: section.page,
          section_type: section.section_type,
          sort_order: section.sort_order,
          visible,
          status: (overrideStatus ?? status) as 'draft' | 'published',
          publish_at: publishAt ? new Date(publishAt).toISOString() : null,
          data: values,
        },
      });
      toast.success('Saved — the live site is updated');
      onSaved(); onClose();
    } catch (e: any) { toast.error(e?.message || 'Save failed'); }
    finally { setBusy(false); }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[88vh] overflow-auto">
        <DialogHeader><DialogTitle>{def?.label ?? section.section_type}</DialogTitle></DialogHeader>

        <div className="space-y-4">
          {!def?.fields.length && (
            <p className="text-sm text-muted-foreground">
              This block has no text of its own. Its content is managed in its own admin area.
            </p>
          )}
          {def?.fields.map((f) => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              {f.kind === 'richtext' ? (
                <div className="mt-2"><RichTextEditor value={values[f.key] ?? ''} onChange={(v) => set(f.key, v)} /></div>
              ) : f.kind === 'textarea' ? (
                <Textarea rows={3} value={values[f.key] ?? ''} onChange={(e) => set(f.key, e.target.value)} />
              ) : f.kind === 'image' || f.kind === 'video' ? (
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  {values[f.key] && (
                    <div className="w-44">
                      <MediaPreview url={values[f.key]} type={f.kind === 'video' ? 'video' : 'image'} onRemove={() => set(f.key, '')} />
                    </div>
                  )}
                  <FileUpload
                    folder={f.kind === 'video' ? 'hero' : 'backgrounds'}
                    accept={f.kind === 'video' ? 'video/*' : 'image/*'}
                    label={`Upload ${f.kind}`}
                    onUploaded={(files) => set(f.key, files[0].url)}
                  />
                </div>
              ) : (
                <Input value={values[f.key] ?? ''} placeholder={f.placeholder} onChange={(e) => set(f.key, e.target.value)} />
              )}
            </div>
          ))}

          <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-border">
            <div className="flex items-center gap-3 pt-4">
              <Switch checked={visible} onCheckedChange={setVisible} id="vis" />
              <Label htmlFor="vis">Show this section on the website</Label>
            </div>
            <div>
              <Label>Schedule publishing (optional)</Label>
              <Input type="datetime-local" value={publishAt} onChange={(e) => setPublishAt(e.target.value)} />
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="outline" disabled={busy} onClick={() => { setStatus('draft'); submit('draft'); }}>Save draft</Button>
          {section.status === 'published' ? (
            <Button variant="outline" disabled={busy} onClick={() => submit('draft')}>Unpublish</Button>
          ) : null}
          <Button disabled={busy} onClick={() => submit('published')}><Save className="w-4 h-4 mr-2" /> Publish</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* HERO SLIDES                                                         */
/* ------------------------------------------------------------------ */
type Slide = {
  id: string; media_url: string; media_type: string; poster_url: string | null;
  title: string; subtitle: string; description: string;
  cta_primary_label: string; cta_primary_href: string;
  cta_secondary_label: string; cta_secondary_href: string;
  sort_order: number; active: boolean;
};

const BLANK: Omit<Slide, 'id'> = {
  media_url: '', media_type: 'video', poster_url: '', title: '', subtitle: '', description: '',
  cta_primary_label: 'Get a free quote', cta_primary_href: '/contact',
  cta_secondary_label: 'Explore our companies', cta_secondary_href: '/companies',
  sort_order: 0, active: true,
};

function HeroTab() {
  const list = useServerFn(listHeroSlides);
  const save = useServerFn(saveHeroSlide);
  const remove = useServerFn(deleteHeroSlide);
  const dup = useServerFn(duplicateHeroSlide);
  const reorder = useServerFn(reorderHeroSlides);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['admin-hero-slides'], queryFn: () => list({ data: undefined }) });
  const rows = (data ?? []) as Slide[];
  const [editing, setEditing] = useState<Partial<Slide> | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ['admin-hero-slides'] });
    qc.invalidateQueries({ queryKey: ['hero-slides'] });
  };

  const move = async (i: number, dir: -1 | 1) => {
    const next = [...rows];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    await reorder({ data: { ids: next.map((r) => r.id) } });
    refresh();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">
          Add as many hero slides as you like — the hero rotates automatically. With one slide the slider is hidden.
        </p>
        <Button size="sm" className="rounded-full" onClick={() => setEditing({ ...BLANK, sort_order: rows.length })}>
          <Plus className="w-4 h-4 mr-2" /> Add slide
        </Button>
      </div>

      {!rows.length && (
        <div className="bg-card border border-border rounded-2xl p-8 text-center text-muted-foreground">
          No slides yet — the homepage is showing the built-in cinematic clip.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {rows.map((row, i) => (
          <div key={row.id} className={`bg-card border border-border rounded-2xl overflow-hidden ${row.active ? '' : 'opacity-60'}`}>
            {row.media_url && (row.media_type === 'video'
              ? <video src={row.media_url} muted className="w-full h-40 object-cover" />
              : <img src={row.media_url} alt={row.title} className="w-full h-40 object-cover" />)}
            <div className="p-4 space-y-2">
              <p className="font-bold truncate">{row.title || 'Untitled slide'}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{row.description}</p>
              <div className="flex items-center gap-1 pt-2">
                <Button size="sm" variant="outline" className="rounded-full" onClick={() => setEditing(row)}>Edit</Button>
                <button title="Show/hide" onClick={async () => { await save({ data: { ...row, poster_url: row.poster_url ?? '', active: !row.active } as any }); refresh(); }}
                  className="w-9 h-9 grid place-items-center rounded-lg hover:bg-muted">{row.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                <button title="Duplicate" onClick={async () => { await dup({ data: { id: row.id } }); refresh(); }} className="w-9 h-9 grid place-items-center rounded-lg hover:bg-muted"><Copy className="w-4 h-4" /></button>
                <button title="Delete" onClick={async () => { if (confirm('Delete slide?')) { await remove({ data: { id: row.id } }); refresh(); } }}
                  className="w-9 h-9 grid place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></button>
                <div className="ml-auto flex">
                  <button onClick={() => move(i, -1)} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-muted" aria-label="Move up"><ChevronUp className="w-4 h-4" /></button>
                  <button onClick={() => move(i, 1)} className="w-8 h-8 grid place-items-center rounded-lg hover:bg-muted" aria-label="Move down"><ChevronDown className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && <SlideEditor slide={editing} onClose={() => setEditing(null)} onSaved={refresh} />}
    </div>
  );
}

function SlideEditor({ slide, onClose, onSaved }: { slide: Partial<Slide>; onClose: () => void; onSaved: () => void }) {
  const save = useServerFn(saveHeroSlide);
  const [f, setF] = useState<Partial<Slide>>(slide);
  const [busy, setBusy] = useState(false);
  const set = (k: keyof Slide, v: any) => setF((s) => ({ ...s, [k]: v }));

  const submit = async () => {
    setBusy(true);
    try {
      await save({ data: { ...BLANK, ...f, poster_url: f.poster_url ?? '' } as any });
      toast.success('Slide saved');
      onSaved(); onClose();
    } catch (e: any) { toast.error(e?.message || 'Save failed'); }
    finally { setBusy(false); }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[88vh] overflow-auto">
        <DialogHeader><DialogTitle>{f.id ? 'Edit hero slide' : 'New hero slide'}</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Background media</Label>
            <div className="mt-2 flex items-center gap-3 flex-wrap">
              {f.media_url && (
                <div className="w-52">
                  <MediaPreview url={f.media_url} type={(f.media_type as any) === 'image' ? 'image' : 'video'} onRemove={() => set('media_url', '')} />
                </div>
              )}
              <FileUpload folder="hero" accept="image/*,video/*" label="Upload video or image"
                onUploaded={(files) => { set('media_url', files[0].url); set('media_type', files[0].type); }} />
            </div>
          </div>
          <div>
            <Label>Poster image (shown while a video loads)</Label>
            <div className="mt-2 flex items-center gap-3 flex-wrap">
              {f.poster_url && <div className="w-40"><MediaPreview url={f.poster_url} type="image" onRemove={() => set('poster_url', '')} /></div>}
              <FileUpload folder="hero" accept="image/*" label="Upload poster" onUploaded={(files) => set('poster_url', files[0].url)} />
            </div>
          </div>
          <div><Label>Eyebrow / subtitle</Label><Input value={f.subtitle ?? ''} onChange={(e) => set('subtitle', e.target.value)} /></div>
          <div><Label>Title</Label><Input value={f.title ?? ''} onChange={(e) => set('title', e.target.value)} /></div>
          <div><Label>Description</Label><Textarea rows={3} value={f.description ?? ''} onChange={(e) => set('description', e.target.value)} /></div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><Label>Primary button label</Label><Input value={f.cta_primary_label ?? ''} onChange={(e) => set('cta_primary_label', e.target.value)} /></div>
            <div><Label>Primary button link</Label><Input value={f.cta_primary_href ?? ''} onChange={(e) => set('cta_primary_href', e.target.value)} /></div>
            <div><Label>Secondary button label</Label><Input value={f.cta_secondary_label ?? ''} onChange={(e) => set('cta_secondary_label', e.target.value)} /></div>
            <div><Label>Secondary button link</Label><Input value={f.cta_secondary_href ?? ''} onChange={(e) => set('cta_secondary_href', e.target.value)} /></div>
          </div>
          <div className="flex items-center gap-3">
            <Switch id="active" checked={f.active ?? true} onCheckedChange={(v) => set('active', v)} />
            <Label htmlFor="active">Active (visible in the slider)</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={busy} onClick={submit}><Save className="w-4 h-4 mr-2" /> Save slide</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* VERSION HISTORY                                                     */
/* ------------------------------------------------------------------ */
export function HistoryDialog({ entityType, entityId, onClose, onRestored }: {
  entityType: string; entityId: string; onClose: () => void; onRestored: () => void;
}) {
  const list = useServerFn(listVersions);
  const restore = useServerFn(restoreVersion);
  const { data } = useQuery({
    queryKey: ['versions', entityType, entityId],
    queryFn: () => list({ data: { entity_type: entityType, entity_id: entityId } }),
  });
  const rows = (data ?? []) as any[];

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-auto">
        <DialogHeader><DialogTitle>Version history</DialogTitle></DialogHeader>
        {!rows.length && <p className="text-sm text-muted-foreground">No previous versions yet. A snapshot is stored every time you save.</p>}
        <div className="space-y-2">
          {rows.map((v) => (
            <div key={v.id} className="border border-border rounded-xl p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{v.label || entityType}</p>
                  <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleString()}</p>
                </div>
                <Button size="sm" variant="outline" className="rounded-full"
                  onClick={async () => { await restore({ data: { version_id: v.id } }); toast.success('Version restored'); onRestored(); onClose(); }}>
                  Restore
                </Button>
              </div>
              <pre className="mt-2 text-[11px] bg-muted/60 rounded-lg p-2 overflow-auto max-h-32">{JSON.stringify(v.payload?.data ?? v.payload, null, 2)}</pre>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
