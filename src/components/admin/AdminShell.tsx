import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, Briefcase, ImageIcon, MessagesSquare, Star, LogOut, Globe, Building2, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/companies', label: 'Companies', icon: Building2, exact: false },
  { to: '/admin/services', label: 'Services', icon: Briefcase, exact: false },
  { to: '/admin/portfolio', label: 'Portfolio', icon: ImageIcon, exact: false },
  { to: '/admin/reviews', label: 'Reviews', icon: Star, exact: false },
  { to: '/admin/messages', label: 'Messages', icon: MessagesSquare, exact: false },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon, exact: false },
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
    navigate({ to: '/admin/login', replace: true });
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      <aside className="fixed inset-y-0 left-0 w-60 bg-card border-r border-border flex flex-col">
        <div className="p-5 border-b border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">Speedex</p>
          <p className="font-bold text-lg">Admin Panel</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
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
        <div className="p-3 border-t border-border space-y-2">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent/50">
            <Globe className="w-4 h-4" /> View site
          </Link>
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start">
            <LogOut className="w-4 h-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>
      <main className="ml-60 p-6 sm:p-8">{children}</main>
    </div>
  );
}