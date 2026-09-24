import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { toast } from 'sonner';
import { Save, RotateCcw } from 'lucide-react';
import { updateSettings } from '@/lib/admin/content.functions';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { GLASS_DEFAULTS, glassStyle, glassToEntries, readGlass, type GlassSettings } from '@/lib/glass';

const RANGES: { key: keyof GlassSettings; label: string; min: number; max: number; unit: string }[] = [
  { key: 'opacity', label: 'Glass transparency / opacity', min: 0, max: 100, unit: '%' },
  { key: 'blur', label: 'Blur amount', min: 0, max: 40, unit: 'px' },
  { key: 'border', label: 'Border thickness', min: 0, max: 5, unit: 'px' },
  { key: 'borderOpacity', label: 'Border opacity', min: 0, max: 100, unit: '%' },
  { key: 'shadow', label: 'Shadow intensity', min: 0, max: 100, unit: '%' },
  { key: 'radius', label: 'Corner radius', min: 0, max: 40, unit: 'px' },
];

/** Glass look for the inner sliders only (the main hero never uses glass). */
export function GlassSettingsPanel({ settings }: { settings?: Record<string, string> }) {
  const update = useServerFn(updateSettings);
  const qc = useQueryClient();
  const [g, setG] = useState<GlassSettings>(GLASS_DEFAULTS);
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (settings) setG(readGlass(settings)); }, [settings]);

  const set = <K extends keyof GlassSettings>(k: K, v: GlassSettings[K]) => setG((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await update({ data: { entries: glassToEntries(g) } });
      toast.success('Glass settings saved');
      qc.invalidateQueries({ queryKey: ['site-settings'] });
    } catch (e: any) {
      toast.error(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="p-5 space-y-5">
      <div>
        <h2 className="text-lg font-bold">Inner slider glass cards</h2>
        <p className="text-sm text-muted-foreground">Applies to the glass cards on the sliders below the main banner. The main banner never uses glass.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {RANGES.map((r) => (
            <div key={r.key}>
              <div className="flex justify-between text-sm">
                <Label>{r.label}</Label>
                <span className="tabular-nums text-muted-foreground">{g[r.key] as number}{r.unit}</span>
              </div>
              <Slider className="mt-2" min={r.min} max={r.max} step={1} value={[g[r.key] as number]} onValueChange={([v]) => set(r.key, v as never)} />
            </div>
          ))}
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="glass-tint">Background tint</Label>
            <input id="glass-tint" type="color" value={g.tint} onChange={(e) => set('tint', e.target.value)} className="h-9 w-16 cursor-pointer rounded border border-border bg-transparent" />
          </div>
          <div>
            <Label>Glass / frost strength</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {(['light', 'medium', 'strong'] as const).map((s) => (
                <Button key={s} type="button" size="sm" variant={g.strength === s ? 'default' : 'outline'} onClick={() => set('strength', s)} className="capitalize">{s}</Button>
              ))}
            </div>
          </div>
        </div>

        {/* Live preview */}
        <div>
          <Label>Live preview</Label>
          <div className="relative mt-2 overflow-hidden rounded-xl border border-border aspect-[4/3] bg-neutral-900">
            <img src="/images/showcase/signage-3.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-center p-5">
              <div className="max-w-[80%] text-white" style={{ ...glassStyle(g), padding: '1.25rem' }}>
                <span className="inline-block rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">Commercial branding</span>
                <p className="mt-3 text-lg font-extrabold leading-tight drop-shadow">Corporate Retail & Reception Displays</p>
                <p className="mt-2 text-xs text-white/90">Custom indoor branding crafted with high precision.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={save} disabled={saving}><Save className="w-4 h-4" /> Save glass settings</Button>
        <Button variant="outline" onClick={() => setG(GLASS_DEFAULTS)}><RotateCcw className="w-4 h-4" /> Reset</Button>
      </div>
    </Card>
  );
}
