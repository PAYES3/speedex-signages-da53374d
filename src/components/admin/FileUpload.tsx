import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, Link as LinkIcon, Loader2, Image as ImageIcon, Video as VideoIcon, X } from 'lucide-react';

interface FileUploadProps {
  value?: string;
  onChange: (url: string) => void;
  type?: 'image' | 'video' | 'both';
  bucket?: string;
  label?: string;
}

export function FileUpload({
  value = '',
  onChange,
  type = 'both',
  bucket = 'media',
  label = 'Upload Asset',
}: FileUploadProps) {
  const [tab, setTab] = useState<'upload' | 'link'>('upload');
  const [uploading, setUploading] = useState(false);

  // PC-யில் இருந்து Direct Supabase Upload செய்யும் Function
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Upload ஆன பிறகு Public URL-ஐ பெறுகிறோம்
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange(data.publicUrl);
    } catch (error: any) {
      alert('Upload failed: ' + (error.message || 'Error uploading file'));
    } finally {
      setUploading(false);
    }
  };

  const isVideo = value?.match(/\.(mp4|webm|ogg)$/i) || type === 'video';

  return (
    <div className="space-y-3 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
          {type === 'video' ? (
            <VideoIcon className="w-4 h-4 text-primary" />
          ) : (
            <ImageIcon className="w-4 h-4 text-primary" />
          )}
          {label}
        </label>

        {/* 🎯 TAB TOGGLE: 1. UPLOAD FROM PC | 2. PASTE LINK */}
        <div className="flex bg-zinc-800/80 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              tab === 'upload'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload PC
          </button>
          <button
            type="button"
            onClick={() => setTab('link')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              tab === 'link'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            URL Link
          </button>
        </div>
      </div>

      {/* 📥 OPTION 1: UPLOAD FROM PC */}
      {tab === 'upload' && (
        <div className="relative border-2 border-dashed border-zinc-700 hover:border-primary/60 rounded-xl p-4 text-center transition-all bg-zinc-950/40">
          <input
            type="file"
            accept={
              type === 'video'
                ? 'video/*'
                : type === 'image'
                ? 'image/*'
                : 'image/*,video/*'
            }
            onChange={handleFileUpload}
            disabled={uploading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center justify-center gap-1">
            {uploading ? (
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            ) : (
              <Upload className="w-6 h-6 text-gray-400" />
            )}
            <p className="text-xs font-semibold text-gray-300">
              {uploading
                ? 'Uploading to Storage...'
                : 'Click or Drag file to Upload from PC'}
            </p>
            <p className="text-[10px] text-gray-500">
              Supports: JPG, PNG, WEBP, MP4, WEBM
            </p>
          </div>
        </div>
      )}

      {/* 🔗 OPTION 2: EXTERNAL URL LINK */}
      {tab === 'link' && (
        <div className="relative">
          <LinkIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Paste media URL (https://...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-primary"
          />
        </div>
      )}

      {/* 👁️ MEDIA PREVIEW BOX */}
      {value && (
        <div className="relative mt-2 rounded-xl overflow-hidden border border-zinc-700 bg-black max-h-48 flex items-center justify-center group">
          {isVideo ? (
            <video src={value} controls className="w-full h-36 object-cover" />
          ) : (
            <img
              src={value}
              alt="Preview"
              className="w-full h-36 object-contain p-2"
            />
          )}

          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600/80 text-white hover:bg-red-600 transition-all shadow-lg"
            title="Remove Media"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
