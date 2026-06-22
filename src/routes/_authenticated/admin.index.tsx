import { createFileRoute, Link } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { useQuery } from '@tanstack/react-query';
import { getAdminStats } from '@/lib/admin/admin.functions';
import { Briefcase, ImageIcon, MessagesSquare, Star, FileText } from 'lucide-react';

export const Route = createFileRoute('/_authenticated/admin/')({
  component: Dashboard,
});

function Dashboard() {
  const fetch = useServerFn(getAdminStats);
  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => fetch({ data: undefined }),
  });

  const cards = [
    { label: 'Services', value: data?.services ?? 0, to: '/admin/services', icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { label: 'Projects', value: data?.projects ?? 0, to: '/admin/portfolio', icon: ImageIcon, color: 'from-purple-500 to-purple-600' },
    { label: 'Pending Reviews', value: data?.pendingReviews ?? 0, to: '/admin/reviews', icon: Star, color: 'from-amber-500 to-amber-600' },
    { label: 'Contact Messages', value: data?.messages ?? 0, to: '/admin/messages', icon: MessagesSquare, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Quote Requests', value: data?.quotes ?? 0, to: '/admin/messages', icon: FileText, color: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening on your site.</p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="group bg-card border border-border rounded-2xl p-5 hover:shadow-lg transition">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} text-white grid place-items-center mb-3`}>
              <c.icon className="w-5 h-5" />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</p>
            <p className="text-3xl font-bold mt-1">{isLoading ? '…' : c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Quick start</h2>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>1. Add your services in the <Link to="/admin/services" className="text-primary hover:underline">Services</Link> tab.</li>
            <li>2. Upload portfolio projects in the <Link to="/admin/portfolio" className="text-primary hover:underline">Portfolio</Link> tab.</li>
            <li>3. Approve customer reviews from the <Link to="/admin/reviews" className="text-primary hover:underline">Reviews</Link> tab.</li>
            <li>4. Read incoming enquiries in the <Link to="/admin/messages" className="text-primary hover:underline">Messages</Link> tab.</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="font-semibold mb-2">Security tip</h2>
          <p className="text-sm text-muted-foreground">
            You're signed in with the default admin password. Change it now from your auth dashboard for production safety.
          </p>
        </div>
      </div>
    </div>
  );
}