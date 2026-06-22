import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { listInbox, deleteMessage } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Mail, Trash2, Phone, FileText, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

export const Route = createFileRoute('/_authenticated/admin/messages')({
  component: Messages,
});

function Messages() {
  const list = useServerFn(listInbox);
  const del = useServerFn(deleteMessage);
  const qc = useQueryClient();
  const [tab, setTab] = useState<'contact' | 'quotes' | 'jobs'>('contact');

  const { data } = useQuery({ queryKey: ['admin-inbox'], queryFn: () => list({ data: undefined }) });

  const remove = async (id: string, table: 'contact_messages' | 'quote_requests' | 'job_applications') => {
    if (!confirm('Delete this entry?')) return;
    await del({ data: { id, table } });
    qc.invalidateQueries({ queryKey: ['admin-inbox'] });
    toast.success('Deleted');
  };

  const items = tab === 'contact' ? data?.contact : tab === 'quotes' ? data?.quotes : data?.jobs;
  const table = tab === 'contact' ? 'contact_messages' : tab === 'quotes' ? 'quote_requests' : 'job_applications';

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground mt-1">Contact form submissions, quote requests, and job applications.</p>
      </header>

      <div className="flex gap-2 mb-4 border-b border-border">
        {[
          { k: 'contact', label: 'Contact', icon: Mail, count: data?.contact?.length ?? 0 },
          { k: 'quotes', label: 'Quotes', icon: FileText, count: data?.quotes?.length ?? 0 },
          { k: 'jobs', label: 'Jobs', icon: Briefcase, count: data?.jobs?.length ?? 0 },
        ].map((t) => (
          <button
            key={t.k}
            onClick={() => setTab(t.k as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition flex items-center gap-2 ${tab === t.k ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            <t.icon className="w-4 h-4" /> {t.label} <span className="text-xs bg-muted px-2 rounded-full">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items?.map((m: any) => (
          <div key={m.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold">{m.name}</span>
                  <a href={`mailto:${m.email}`} className="text-sm text-primary hover:underline">{m.email}</a>
                  {m.phone && <a href={`tel:${m.phone}`} className="text-sm text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" />{m.phone}</a>}
                </div>
                {m.subject && <p className="text-sm font-medium mt-1">Re: {m.subject}</p>}
                {m.position && <p className="text-sm font-medium mt-1">Position: {m.position}</p>}
                <p className="text-sm mt-2 whitespace-pre-wrap">{m.message || m.cover_letter || '—'}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Button asChild size="sm">
                  <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + (m.subject || m.position || 'Your enquiry to Speedex Signages'))}&body=${encodeURIComponent('Hi ' + m.name + ',\n\nThank you for reaching out to Speedex Signages.\n\n')}`}>
                    <Mail className="w-3 h-3 mr-1" /> Reply
                  </a>
                </Button>
                <Button size="sm" variant="ghost" onClick={() => remove(m.id, table)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
        {!items?.length && <p className="text-muted-foreground text-center py-12">Inbox empty.</p>}
      </div>
    </div>
  );
}