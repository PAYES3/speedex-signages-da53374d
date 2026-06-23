import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useEffect, useState } from 'react';
import { publicGetSettings, updateSettings } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/admin/settings')({
  head: () => ({
    meta: [
      { title: 'Site Settings | Admin' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminSettingsPage,
});

const FIELDS: { key: string; label: string; placeholder?: string; helper?: string }[] = [
  { key: 'hero_video_url', label: 'Hero background video URL (.mp4)', placeholder: 'https://…/video.mp4', helper: 'Cinematic signage industry MP4. Autoplay, muted, looped.' },
  { key: 'hero_poster_url', label: 'Hero poster image URL', helper: 'Shown while the video loads.' },
  { key: 'contact_phone', label: 'Contact phone' },
  { key: 'contact_email', label: 'Contact email' },
  { key: 'whatsapp_number', label: 'WhatsApp number (no + or spaces)' },
  { key: 'office_address', label: 'Office address' },
  { key: 'maps_embed_url', label: 'Google Maps embed URL', helper: 'Paste a maps.google.com embed src.' },
  { key: 'maps_directions_url', label: 'Google Maps directions URL' },
];

function AdminSettingsPage() {
  const get = useServerFn(publicGetSettings);
  const update = useServerFn(updateSettings);
  const qc = useQueryClient();
  const { data } = useQuery({ queryKey: ['site-settings'], queryFn: () => get() });
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (data) setForm(data as Record<string, string>);
  }, [data]);

  const onSave = async () => {
    try {
      await update({ data: { entries: form } });
      toast.success('Settings saved');
      qc.invalidateQueries({ queryKey: ['site-settings'] });
    } catch (e: any) {
      toast.error(e.message || 'Save failed');
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <p className="text-sm text-muted-foreground">Hero video, contact details and map embed used across the public site.</p>
      </div>
      <Card className="p-5 space-y-4">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <Label>{f.label}</Label>
            <Input
              value={form[f.key] ?? ''}
              placeholder={f.placeholder}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              maxLength={2000}
            />
            {f.helper && <p className="text-xs text-muted-foreground mt-1">{f.helper}</p>}
          </div>
        ))}
        <Button onClick={onSave}><Save className="w-4 h-4" /> Save settings</Button>
      </Card>
    </div>
  );
}