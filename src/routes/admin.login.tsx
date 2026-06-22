import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useServerFn } from '@tanstack/react-start';
import { setupFirstAdmin } from '@/lib/admin/admin.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, ShieldCheck } from 'lucide-react';

export const Route = createFileRoute('/admin/login')({
  head: () => ({
    meta: [
      { title: 'Admin Login | Speedex Signages' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const setup = useServerFn(setupFirstAdmin);
  const [email, setEmail] = useState('admin@speedexsignages.ae');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [setupRunning, setSetupRunning] = useState(false);

  useEffect(() => {
    // Auto-run first-time setup so the default admin exists.
    setSetupRunning(true);
    setup({ data: undefined })
      .catch(() => {})
      .finally(() => setSetupRunning(false));
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Welcome back!');
    navigate({ to: '/admin' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      <div className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Speedex Admin</h1>
            <p className="text-xs text-muted-foreground">Sign in to manage your site</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
          </div>
          <Button type="submit" disabled={loading || setupRunning} className="w-full bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            {loading || setupRunning ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {setupRunning ? 'Preparing…' : 'Signing in…'}</>) : 'Sign in'}
          </Button>
        </form>

        <div className="mt-6 p-3 rounded-lg bg-secondary/40 border border-border text-xs text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">First time here?</p>
          <p>Default admin: <code>admin@speedexsignages.ae</code> / <code>Speedex@Siganges.com</code>. Change the password from the admin dashboard after sign-in.</p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-primary hover:underline">← Back to website</Link>
        </div>
      </div>
    </div>
  );
}