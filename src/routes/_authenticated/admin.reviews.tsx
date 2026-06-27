import { createFileRoute } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { listAllTestimonials, moderateTestimonial, deleteTestimonial } from '@/lib/admin/content.functions';
import { Button } from '@/components/ui/button';
import { Check, X, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';

export const Route = createFileRoute('/_authenticated/admin/reviews')({
  component: Reviews,
});

function Reviews() {
  const list = useServerFn(listAllTestimonials);
  const moderate = useServerFn(moderateTestimonial);
  const del = useServerFn(deleteTestimonial);
  const qc = useQueryClient();

  const { data } = useQuery({ queryKey: ['admin-reviews'], queryFn: () => list({ data: undefined }) });

  const act = async (id: string, approved: boolean) => {
    await moderate({ data: { id, approved } });
    qc.invalidateQueries({ queryKey: ['admin-reviews'] });
    toast.success(approved ? 'Approved' : 'Unapproved');
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    await del({ data: { id } });
    qc.invalidateQueries({ queryKey: ['admin-reviews'] });
    toast.success('Deleted');
  };

  return (
    <div>
      <AdminPageHeader
        title="Reviews"
        subtitle="Moderate customer testimonials before they appear on your site."
      />
      <div className="space-y-3">
        {data?.map((t: any) => (
          <div key={t.id} className={`bg-card border rounded-xl p-4 ${t.approved ? 'border-border' : 'border-amber-300 dark:border-amber-700'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{t.name}</span>
                  {t.company && <span className="text-sm text-muted-foreground">· {t.company}</span>}
                  {!t.approved && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-200">Pending</span>}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/40'}`} />
                  ))}
                </div>
                <p className="text-sm mt-2">{t.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(t.created_at).toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-1">
                {!t.approved ? (
                  <Button size="sm" onClick={() => act(t.id, true)}><Check className="w-3 h-3 mr-1" />Approve</Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => act(t.id, false)}><X className="w-3 h-3 mr-1" />Unapprove</Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => remove(t.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
              </div>
            </div>
          </div>
        ))}
        {!data?.length && <p className="text-muted-foreground text-center py-12">No reviews yet. Customers can submit reviews from the homepage.</p>}
      </div>
    </div>
  );
}