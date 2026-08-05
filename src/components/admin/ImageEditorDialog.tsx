import { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RotateCw, Crop } from 'lucide-react';

const ASPECTS: { label: string; value: number | null }[] = [
  { label: 'Original', value: null },
  { label: '16:9', value: 16 / 9 },
  { label: '4:3', value: 4 / 3 },
  { label: '1:1', value: 1 },
  { label: '3:4', value: 3 / 4 },
];

export type EditorResult = { file: File };

/** Crop / rotate / resize / zoom / compress / convert to WebP before upload. */
export function ImageEditorDialog({
  file, open, onCancel, onDone,
}: { file: File | null; open: boolean; onCancel: () => void; onDone: (r: EditorResult) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [aspect, setAspect] = useState<number | null>(null);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [quality, setQuality] = useState(0.82);
  const drag = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!file || !open) return;
    setRotation(0); setZoom(1); setOffset({ x: 0, y: 0 }); setAspect(null);
    createImageBitmap(file).then((b) => { if (!cancelled) setBitmap(b); });
    return () => { cancelled = true; };
  }, [file, open]);

  const outSize = () => {
    if (!bitmap) return { w: 0, h: 0 };
    const rotated = rotation % 180 !== 0;
    const bw = rotated ? bitmap.height : bitmap.width;
    const bh = rotated ? bitmap.width : bitmap.height;
    const a = aspect ?? bw / bh;
    let w = bw;
    let h = Math.round(w / a);
    if (h > bh) { h = bh; w = Math.round(h * a); }
    return { w, h };
  };

  const draw = (canvas: HTMLCanvasElement, scaleTo?: number) => {
    if (!bitmap) return;
    const { w, h } = outSize();
    const scale = scaleTo ? Math.min(1, scaleTo / w) : 1;
    canvas.width = Math.max(1, Math.round(w * scale));
    canvas.height = Math.max(1, Math.round(h * scale));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2 + offset.x * scale, canvas.height / 2 + offset.y * scale);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    const base = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
    const dw = bitmap.width * base;
    const dh = bitmap.height * base;
    ctx.drawImage(bitmap, -dw / 2, -dh / 2, dw, dh);
    ctx.restore();
  };

  useEffect(() => {
    if (canvasRef.current) draw(canvasRef.current, 720);
  }, [bitmap, rotation, zoom, offset, aspect]);

  const apply = async () => {
    if (!bitmap || !file) return;
    const out = document.createElement('canvas');
    draw(out, maxWidth);
    const blob = await new Promise<Blob | null>((r) => out.toBlob(r, 'image/webp', quality));
    if (!blob) return;
    const name = file.name.replace(/\.[^.]+$/, '') + '.webp';
    onDone({ file: new File([blob], name, { type: 'image/webp' }) });
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader><DialogTitle className="flex items-center gap-2"><Crop className="w-4 h-4" /> Edit image before upload</DialogTitle></DialogHeader>

        <div className="grid md:grid-cols-[1fr_220px] gap-5">
          <div className="rounded-xl border border-border overflow-hidden bg-muted grid place-items-center">
            <canvas
              ref={canvasRef}
              className="max-h-[45vh] w-full object-contain cursor-move touch-none"
              onPointerDown={(e) => { drag.current = { x: e.clientX, y: e.clientY }; (e.target as Element).setPointerCapture(e.pointerId); }}
              onPointerMove={(e) => {
                if (!drag.current) return;
                const dx = e.clientX - drag.current.x;
                const dy = e.clientY - drag.current.y;
                drag.current = { x: e.clientX, y: e.clientY };
                setOffset((o) => ({ x: o.x + dx * 2, y: o.y + dy * 2 }));
              }}
              onPointerUp={() => { drag.current = null; }}
            />
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-xs">Crop ratio</Label>
              <div className="flex flex-wrap gap-1.5 mt-1.5">
                {ASPECTS.map((a) => (
                  <button key={a.label} type="button" onClick={() => setAspect(a.value)}
                    className={`px-2.5 py-1 rounded-md text-xs border ${aspect === a.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-muted'}`}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs">Zoom — {zoom.toFixed(2)}x</Label>
              <Slider className="mt-2" min={0.5} max={3} step={0.01} value={[zoom]} onValueChange={([v]) => setZoom(v)} />
            </div>
            <div>
              <Label className="text-xs">Resize width — {maxWidth}px</Label>
              <Slider className="mt-2" min={320} max={2560} step={20} value={[maxWidth]} onValueChange={([v]) => setMaxWidth(v)} />
            </div>
            <div>
              <Label className="text-xs">Compression quality — {Math.round(quality * 100)}%</Label>
              <Slider className="mt-2" min={0.3} max={1} step={0.01} value={[quality]} onValueChange={([v]) => setQuality(v)} />
            </div>
            <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => setRotation((r) => (r + 90) % 360)}>
              <RotateCw className="w-4 h-4 mr-2" /> Rotate 90°
            </Button>
            <p className="text-[11px] text-muted-foreground">Drag the image to reposition. Saved as optimized WebP.</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button onClick={apply}>Apply &amp; upload</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
