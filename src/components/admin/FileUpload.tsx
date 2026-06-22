import { useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';

type Uploaded = { url: string; type: 'image' | 'video'; path: string };

export function FileUpload({
  bucket,
  onUploaded,
  accept = 'image/*,video/*',
  label = 'Upload file',
  multiple = false,
}: {
  bucket: 'services-media' | 'portfolio-media' | 'testimonial-avatars';
  onUploaded: (files: Uploaded[]) => void;
  accept?: string;
  label?: string;
  multiple?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const handle = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setBusy(true);
    const results: Uploaded[] = [];
    try {
      for (const file of Array.from(files)) {
        const ext = file.name.split('.').pop() || 'bin';
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error } = await supabase.storage.from(bucket).upload(path, file, {
          cacheControl: '31536000',
          upsert: false,
          contentType: file.type || undefined,
        });
        if (error) throw error;
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        results.push({
          url: data.publicUrl,
          type: file.type.startsWith('video/') ? 'video' : 'image',
          path,
        });
      }
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
    <div className="inline-flex items-center gap-2">
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