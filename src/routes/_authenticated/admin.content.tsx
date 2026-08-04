import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { listPageContent, upsertPageContent } from '@/lib/admin/media.functions';
import { CONTENT_SCHEMA } from '@/lib/content-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload, MediaPreview } from '@/components/admin/FileUpload';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/admin/content')({
  component: ContentEditor,
});

function ContentEditor() {
  const list = useServerFn(listPageContent);
  const save = useServerFn(upsertPageContent);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['admin-page-content'], queryFn: () => list({ data: undefined }) });
  const [active, setActive] = useState(CONTENT_SCHEMA[0].page);
  const [values, setValues] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!data) return;
    const next: Record<string, string> = {};
    for (const r of data as any[]) next[`${r.page}.${r.key}`] = r.value ?? '';
    setValues(next);
  }, [data]);

  const section = CONTENT_SCHEMA.find((s) => s.page === active)!;
  const get = (key: string) => values[`${active}.${key}`] ?? '';
  const set = (key: string, value: string) => setValues((v) => ({ ...v, [`${active}.${key}`]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await save({
        data: {
          items: section.fields.map((f) => ({ page: active, key: f.key, value: get(f.key) })),
        },
      });
      toast.success('Saved — the site updates instantly');
      qc.invalidateQueries({ queryKey: ['admin-page-content'] });
      qc.invalidateQueries({ queryKey: ['page-content'] });
    } catch (err: any) {
      toast.error(err?.message || 'Save failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="Website Content" subtitle="Every heading, paragraph, button label and image on the public site." />

      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <nav className="space-y-1">
          {CONTENT_SCHEMA.map((s) => (
            <button
              key={s.page}
              onClick={() => setActive(s.page)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                active === s.page ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <form onSubmit={submit} className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h2 className="text-xl font-bold">{section.label}</h2>

          {section.fields.map((f) => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              {f.kind === 'textarea' ? (
                <Textarea rows={3} value={get(f.key)} placeholder={f.fallback} onChange={(e) => set(f.key, e.target.value)} />
              ) : f.kind === 'image' || f.kind === 'video' ? (
                <div className="mt-2 flex items-center gap-3 flex-wrap">
                  {get(f.key) && (
                    <div className="w-40">
                      <MediaPreview url={get(f.key)} type={f.kind === 'video' ? 'video' : 'image'} onRemove={() => set(f.key, '')} />
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
                <Input value={get(f.key)} placeholder={f.fallback} onChange={(e) => set(f.key, e.target.value)} />
              )}
            </div>
          ))}

          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={busy} className="rounded-full px-6">
              <Save className="w-4 h-4 mr-2" /> {busy ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
