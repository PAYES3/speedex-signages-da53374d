import { createFileRoute } from '@tanstack/react-router';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { SlideManager } from '@/components/admin/SlideManager';

export const Route = createFileRoute('/_authenticated/admin/home-companies')({
  head: () => ({
    meta: [
      { title: 'Our Companies — Home | Admin' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminHomeCompaniesPage,
});

function AdminHomeCompaniesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Our Companies — Home"
        subtitle="Background slides for the Our Companies slider on the Home and About pages. This does not affect the Our Groups slider or any company logo."
      />
      <SlideManager context="home_our_companies" folder="backgrounds" />
    </div>
  );
}