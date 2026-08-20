import { createFileRoute } from '@tanstack/react-router';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SlideManager } from '@/components/admin/SlideManager';

export const Route = createFileRoute('/_authenticated/admin/group-slides')({
  head: () => ({
    meta: [
      { title: 'Our Groups slider | Admin' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminGroupSlidesPage,
});

function AdminGroupSlidesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Our Groups — Slider"
        subtitle="Background slides for the slider on the Our Groups page only. This does not affect the Home or About slider, company records or logos."
      />
      <SlideManager context="our_groups" folder="backgrounds" />
    </div>
  );
}