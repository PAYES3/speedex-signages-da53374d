import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, Briefcase, ImageIcon, MessagesSquare, Star, LogOut, Globe, Building2, Settings as SettingsIcon, FolderOpen, FileText, LayoutTemplate, BookOpen, GalleryHorizontal, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/homepage', label: 'Homepage Builder', icon: LayoutTemplate, exact: false },
  { to: '/admin/content', label: 'Website Content', icon: FileText, exact: false },
  { to: '/admin/media', label: 'Media Library', icon: FolderOpen, exact: false },
  { to: '/admin/home-companies', label: 'Our Companies — Home', icon: GalleryHorizontal, exact: false },
  { to: '/admin/group-slides', label: 'Our Groups — Slider', icon: Layers, exact: false },
  { to: '/admin/companies', label: 'Our Groups', icon: Building2, exact: false },
  { to: '/admin/services', label: 'Services', icon: Briefcase, exact: false },
  { to: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon, exact: false },
  { to: '/admin/reviews', label: 'Reviews', icon: Star, exact: false },
  { to: '/admin/messages', label: 'Messages', icon: MessagesSquare, exact: false },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon, exact: false },
  { to: '/admin/manual', label: 'User Manual', icon: BookOpen, exact: false },
] as const;

export function AdminShell({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: '/admin/login', search: { next: undefined }, replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <aside className="fixed inset-y-0 left-0 w-60 bg-card border-r border-border hidden lg:flex flex-col z-20">
        <div className="p-5 border-b border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Speedex</p>
          <p className="font-bold text-lg">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${active ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/50'}`}
              >
                <n.icon className="w-4 h-4" />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border space-y-2 bg-card">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent/50">
            <Globe className="w-4 h-4" /> View site
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start text-destructive hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile / tablet top navigation */}
      <div className="lg:hidden sticky top-0 z-30 bg-card border-b border-border">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <p className="font-bold">Speedex Admin</p>
          <div className="flex items-center gap-1">
            <Link to="/" aria-label="View site" className="p-2 rounded-lg hover:bg-accent/50">
              <Globe className="w-4 h-4" />
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-destructive hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-lg text-xs font-semibold transition ${active ? 'bg-primary text-primary-foreground' : 'bg-muted/60 hover:bg-accent/50'}`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="lg:ml-60 p-4 sm:p-8 lg:p-10 pt-6 lg:pt-12 min-h-screen overflow-x-hidden">
        <div className="max-w-7xl mx-auto min-w-0">
          {children}
        </div>
      </main>
    </div>
  );
}
