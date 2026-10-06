import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Trash2, Plus, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DIGITAL_SERVICES, DIGITAL_FAQ, DIGITAL_INDUSTRIES, DIGITAL_SETTINGS_DEFAULTS } from '@/lib/digital/defaults';

export const Route = createFileRoute('/_authenticated/admin/speedex-digital')({ component: AdminDigital });

type Field = { key: string; label: string; type?: 'text' | 'textarea' | 'list' | 'number' | 'bool' | 'select'; options?: string[] };
type TableName = 'digital_services' | 'digital_portfolio' | 'digital_testimonials' | 'digital_faqs' | 'digital_industries';

const SETTINGS_GROUPS: { tab: string; label: string; keys: [string, string, boolean?][] }[] = [
  { tab: 'home', label: 'Homepage & About', keys: [['tagline', 'Tagline'], ['tagline_ar', 'Tagline (Arabic)'], ['hero_text', 'Hero text', true], ['hero_text_ar', 'Hero text (Arabic)', true], ['about_text', 'About text', true], ['about_text_ar', 'About text (Arabic)', true]] },
  { tab: 'contact', label: 'Contact & Footer', keys: [['phone', 'Phone'], ['whatsapp', 'WhatsApp number (digits, e.g. 971507761493)'], ['email', 'Email'], ['address', 'Address'], ['footer_text', 'Footer text', true], ['instagram', 'Instagram URL'], ['facebook', 'Facebook URL'], ['linkedin', 'LinkedIn URL'], ['tiktok', 'TikTok URL'], ['x', 'X URL']] },
  { tab: 'seo', label: 'SEO, Media & Draftly', keys: [['seo_title', 'SEO title'], ['seo_description', 'SEO description', true], ['logo_url', 'Logo URL (leave empty for the uploaded official logo)'], ['draftly_url', 'Draftly experience URL for the "Get Experience" button']] },
  { tab: 'ai', label: 'AI knowledge', keys: [['ai_knowledge', 'Extra approved facts for Speedex Digital AI (no prices)', true]] },
];

const TABLES: { tab: string; label: string; table: TableName; title: string; fields: Field[]; starter?: () => Record<string, unknown>[] }[] = [
  { tab: 'services', label: 'Services', table: 'digital_services', title: 'title', fields: [{ key: 'slug', label: 'URL slug' }, { key: 'category', label: 'Category', type: 'select', options: ['web', 'marketing'] }, { key: 'title', label: 'Title' }, { key: 'title_ar', label: 'Title (Arabic)' }, { key: 'summary', label: 'Summary', type: 'textarea' }, { key: 'summary_ar', label: 'Summary (Arabic)', type: 'textarea' }, { key: 'body', label: 'Details', type: 'textarea' }, { key: 'body_ar', label: 'Details (Arabic)', type: 'textarea' }, { key: 'benefits', label: 'Benefits (one per line)', type: 'list' }, { key: 'sort_order', label: 'Order', type: 'number' }, { key: 'active', label: 'Visible', type: 'bool' }],
    starter: () => DIGITAL_SERVICES.map((s, i) => ({ ...s, sort_order: i })) },
  { tab: 'portfolio', label: 'Portfolio', table: 'digital_portfolio', title: 'title', fields: [{ key: 'title', label: 'Title' }, { key: 'title_ar', label: 'Title (Arabic)' }, { key: 'category', label: 'Category' }, { key: 'description', label: 'Description', type: 'textarea' }, { key: 'description_ar', label: 'Description (Arabic)', type: 'textarea' }, { key: 'image_url', label: 'Image URL' }, { key: 'link_url', label: 'Project link' }, { key: 'sort_order', label: 'Order', type: 'number' }, { key: 'active', label: 'Visible', type: 'bool' }] },
  { tab: 'testimonials', label: 'Testimonials', table: 'digital_testimonials', title: 'name', fields: [{ key: 'name', label: 'Client name' }, { key: 'company', label: 'Company' }, { key: 'quote', label: 'Quote', type: 'textarea' }, { key: 'quote_ar', label: 'Quote (Arabic)', type: 'textarea' }, { key: 'rating', label: 'Rating 1–5', type: 'number' }, { key: 'sort_order', label: 'Order', type: 'number' }, { key: 'active', label: 'Visible', type: 'bool' }] },
  { tab: 'industries', label: 'Industries', table: 'digital_industries', title: 'name', fields: [{ key: 'name', label: 'Name' }, { key: 'name_ar', label: 'Name (Arabic)' }, { key: 'sort_order', label: 'Order', type: 'number' }, { key: 'active', label: 'Visible', type: 'bool' }],
    starter: () => DIGITAL_INDUSTRIES.map(([name, name_ar], i) => ({ name, name_ar, sort_order: i })) },
  { tab: 'faqs', label: 'FAQs', table: 'digital_faqs', title: 'question', fields: [{ key: 'question', label: 'Question' }, { key: 'answer', label: 'Answer', type: 'textarea' }, { key: 'question_ar', label: 'Question (Arabic)' }, { key: 'answer_ar', label: 'Answer (Arabic)', type: 'textarea' }, { key: 'sort_order', label: 'Order', type: 'number' }, { key: 'active', label: 'Visible', type: 'bool' }],
    starter: () => DIGITAL_FAQ.map(([question, answer, question_ar, answer_ar], i) => ({ question, answer, question_ar, answer_ar, sort_order: i })) },
];

function AdminDigital() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold">Speedex Digital</h1><p className="text-sm text-muted-foreground">Content here only affects the Speedex Digital pages. Speedex Signages content is never changed.</p></div>
      <Tabs defaultValue="home">
        <TabsList className="flex h-auto flex-wrap justify-start">
          {SETTINGS_GROUPS.map((g) => <TabsTrigger key={g.tab} value={g.tab}>{g.label}</TabsTrigger>)}
          {TABLES.map((t) => <TabsTrigger key={t.tab} value={t.tab}>{t.label}</TabsTrigger>)}
        </TabsList>
        {SETTINGS_GROUPS.map((g) => <TabsContent key={g.tab} value={g.tab}><SettingsForm keys={g.keys} /></TabsContent>)}
        {TABLES.map((t) => <TabsContent key={t.tab} value={t.tab}><TableEditor {...t} /></TabsContent>)}
      </Tabs>
    </div>
  );
}

function SettingsForm({ keys }: { keys: [string, string, boolean?][] }) {
  const qc = useQueryClient();
  const [vals, setVals] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    supabase.from('digital_settings').select('key,value').then(({ data }) => {
      const v: Record<string, string> = {};
      for (const [k] of keys) v[k] = DIGITAL_SETTINGS_DEFAULTS[k] ?? '';
      for (const r of data ?? []) if (r.key in v) v[r.key] = r.value;
      setVals(v);
    });
  }, [keys]);
  async function save() {
    setSaving(true);
    const { error } = await supabase.from('digital_settings').upsert(keys.map(([k]) => ({ key: k, value: vals[k] ?? '', updated_at: new Date().toISOString() })));
    setSaving(false);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ['digital-data'] });
    toast.success('Saved');
  }
  return (
    <div className="mt-4 space-y-4 rounded-xl border border-border bg-card p-6">
      {keys.map(([k, label, long]) => <div key={k}><label className="mb-1 block text-sm font-semibold">{label}</label>
        {long ? <Textarea rows={4} value={vals[k] ?? ''} onChange={(e) => setVals({ ...vals, [k]: e.target.value })} /> : <Input value={vals[k] ?? ''} onChange={(e) => setVals({ ...vals, [k]: e.target.value })} />}</div>)}
      <Button onClick={save} disabled={saving}><Save /> {saving ? 'Saving…' : 'Save'}</Button>
    </div>
  );
}

type Row = Record<string, unknown> & { id?: string };

function TableEditor({ table, title, fields, starter }: { table: TableName; title: string; fields: Field[]; starter?: () => Record<string, unknown>[] }) {
  const qc = useQueryClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [edit, setEdit] = useState<Row | null>(null);
  const load = async () => { const { data } = await supabase.from(table).select('*').order('sort_order'); setRows((data ?? []) as Row[]); };
  useEffect(() => { load(); }, [table]);
  const refresh = () => { load(); qc.invalidateQueries({ queryKey: ['digital-data'] }); };
  async function save() {
    if (!edit) return;
    const payload = { ...edit } as Record<string, unknown>;
    delete payload.created_at; delete payload.updated_at;
    const { error } = edit.id ? await supabase.from(table).update(payload as never).eq('id', edit.id) : await supabase.from(table).insert(payload as never);
    if (error) return toast.error(error.message);
    toast.success('Saved'); setEdit(null); refresh();
  }
  async function remove(id: string) {
    if (!confirm('Delete this item?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) return toast.error(error.message);
    refresh();
  }
  async function importStarter() {
    if (!starter) return;
    const { error } = await supabase.from(table).insert(starter() as never);
    if (error) return toast.error(error.message);
    toast.success('Starter content added'); refresh();
  }
  const blank = () => Object.fromEntries(fields.map((f) => [f.key, f.type === 'bool' ? true : f.type === 'number' ? (f.key === 'rating' ? 5 : rows.length) : f.type === 'list' ? [] : f.type === 'select' ? f.options![0] : ''])) as Row;
  return (
    <div className="mt-4 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => setEdit(blank())}><Plus /> Add</Button>
        {starter && rows.length === 0 && <Button variant="outline" onClick={importStarter}>Load starter content</Button>}
      </div>
      {rows.length === 0 && <p className="text-sm text-muted-foreground">{starter ? 'No items saved yet. The site is currently showing the built-in starter content. Load it here to edit it.' : 'No items yet. This section stays hidden on the site until you add real items.'}</p>}
      <div className="divide-y divide-border rounded-xl border border-border bg-card">
        {rows.map((r) => <div key={r.id} className="flex items-center justify-between gap-3 p-3">
          <button className="flex-1 text-start text-sm font-medium hover:text-primary" onClick={() => setEdit(r)}>{String(r[title])}{r.active === false && <span className="ms-2 text-xs text-muted-foreground">(hidden)</span>}</button>
          <Button size="icon" variant="ghost" onClick={() => remove(r.id!)} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
        </div>)}
      </div>
      {edit && <div className="space-y-3 rounded-xl border border-primary/40 bg-card p-6">
        {fields.map((f) => {
          const v = edit[f.key];
          const set = (val: unknown) => setEdit({ ...edit, [f.key]: val });
          return <div key={f.key}><label className="mb-1 block text-sm font-semibold">{f.label}</label>
            {f.type === 'textarea' ? <Textarea rows={3} value={String(v ?? '')} onChange={(e) => set(e.target.value)} />
              : f.type === 'list' ? <Textarea rows={4} value={((v as string[]) ?? []).join('\n')} onChange={(e) => set(e.target.value.split('\n'))} />
              : f.type === 'number' ? <Input type="number" value={Number(v ?? 0)} onChange={(e) => set(Number(e.target.value))} />
              : f.type === 'bool' ? <input type="checkbox" checked={Boolean(v)} onChange={(e) => set(e.target.checked)} className="h-5 w-5" />
              : f.type === 'select' ? <select value={String(v)} onChange={(e) => set(e.target.value)} className="h-10 rounded-md border border-input bg-background px-3">{f.options!.map((o) => <option key={o}>{o}</option>)}</select>
              : <Input value={String(v ?? '')} onChange={(e) => set(e.target.value)} />}</div>;
        })}
        <div className="flex gap-2"><Button onClick={() => { if (edit.benefits) edit.benefits = (edit.benefits as string[]).filter(Boolean); save(); }}><Save /> Save</Button><Button variant="outline" onClick={() => setEdit(null)}>Cancel</Button></div>
      </div>}
    </div>
  );
}
