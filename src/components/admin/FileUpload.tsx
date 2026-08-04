import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { optimizeImage } from '@/lib/image-optimize';
import { bucketForFolder } from '@/lib/media-folders';

export type Uploaded = {
  url: string;
  type: 'image' | 'video';
  path: string;
  name: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  bucket: string;
};

export async function uploadFiles(
  files: File[],
  opts: { bucket?: string; folder?: string } = {},
): Promise<Uploaded[]> {
  const bucket = opts.bucket ?? bucketForFolder(opts.folder ?? 'general');
  const prefix = opts.folder ? `${opts.folder}/` : '';
  const results: Uploaded[] = [];

  for (const file of files) {
    const optimized = await optimizeImage(file);
    const ext = optimized.name.split('.').pop() || 'bin';
    const path = `${prefix}${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, optimized.blob, {
      cacheControl: '31536000',
      upsert: false,
      contentType: optimized.type || undefined,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    results.push({
      url: data.publicUrl,
      type: (optimized.type || file.type).startsWith('video/') ? 'video' : 'image',
      path,
      name: optimized.name,
      mime: optimized.type || file.type,
      size: optimized.blob.size,
      width: optimized.width,
      height: optimized.height,
      bucket,
    });
  }
  return results;
}

export function FileUpload({
  bucket,
  folder,
  onUploaded,
  accept = 'image/*,video/*',
  label = 'Upload file',
  multiple = false,
}: {
  bucket?: string;
  folder?: string;
  onUploaded: (files: Uploaded[]) => void;
  accept?: string;
  label?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [over, setOver] = useState(false);

  const handle = async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    setBusy(true);
    try {
      const results = await uploadFiles(Array.from(fileList), { bucket, folder });
      onUploaded(results);
      toast.success(`Uploaded ${results.length} file${results.length === 1 ? '' : 's'}`);
    } catch (err: any) {
      toast.error(err?.message || 'Upload failed');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      }}
      className={`inline-flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 transition-colors ${
        over ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handle(e.currentTarget.files)}
      />
      <Button type="button" variant="outline" size="sm" onClick={() => inputRef.current?.click()} disabled={busy}>
        {busy ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
        {busy ? 'Uploading…' : label}
      </Button>
      <span className="text-xs text-muted-foreground hidden sm:inline">or drag &amp; drop — auto WebP + compressed</span>
    </div>
  );
}

export function MediaPreview({ url, type, onRemove }: { url: string; type: 'image' | 'video'; onRemove?: () => void }) {
  return (
    <div className="relative group rounded-lg overflow-hidden border border-border bg-muted">
      {type === 'video' ? (
        <video src={url} className="w-full h-32 object-cover" muted />
      ) : (
        <img src={url} alt="" className="w-full h-32 object-cover" loading="lazy" />
      )}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-background/90 grid place-items-center opacity-0 group-hover:opacity-100 transition"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
