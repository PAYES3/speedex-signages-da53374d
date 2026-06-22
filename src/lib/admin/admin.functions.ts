import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

const ADMIN_EMAIL = 'admin@speedexsignages.ae';
const ADMIN_PASSWORD = 'Speedex@Siganges.com';

/**
 * One-time setup: if no admin user exists yet, create one with the
 * default credentials and grant the admin role. Idempotent — safe to call
 * repeatedly; once an admin exists it becomes a no-op.
 */
export const setupFirstAdmin = createServerFn({ method: 'POST' })
  .handler(async () => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');

    const { count, error: countErr } = await supabaseAdmin
      .from('user_roles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'admin');
    if (countErr) throw new Error(countErr.message);
    if ((count ?? 0) > 0) {
      return { ok: true, created: false, email: ADMIN_EMAIL };
    }

    // Try create the user; if email already exists we'll look it up.
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });

    let userId = created?.user?.id;
    if (createErr && !userId) {
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
      const found = list?.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
      if (!found) throw new Error(createErr.message);
      userId = found.id;
    }
    if (!userId) throw new Error('Could not provision admin user');

    const { error: roleErr } = await supabaseAdmin
      .from('user_roles')
      .upsert({ user_id: userId, role: 'admin' }, { onConflict: 'user_id,role' });
    if (roleErr) throw new Error(roleErr.message);

    return { ok: true, created: true, email: ADMIN_EMAIL };
  });

/** Returns whether the calling user has the admin role. */
export const checkIsAdmin = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc('has_role', {
      _user_id: context.userId,
      _role: 'admin',
    });
    if (error) return { isAdmin: false };
    return { isAdmin: Boolean(data) };
  });

/** Aggregate counts for the admin dashboard. */
export const getAdminStats = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc('has_role', {
      _user_id: context.userId,
      _role: 'admin',
    });
    if (!isAdmin) throw new Error('Forbidden');

    const [messages, quotes, projects, services, pendingReviews] = await Promise.all([
      context.supabase.from('contact_messages').select('id', { count: 'exact', head: true }),
      context.supabase.from('quote_requests').select('id', { count: 'exact', head: true }),
      context.supabase.from('portfolio_projects').select('id', { count: 'exact', head: true }),
      context.supabase.from('services').select('id', { count: 'exact', head: true }),
      context.supabase.from('testimonials').select('id', { count: 'exact', head: true }).eq('approved', false),
    ]);
    return {
      messages: messages.count ?? 0,
      quotes: quotes.count ?? 0,
      projects: projects.count ?? 0,
      services: services.count ?? 0,
      pendingReviews: pendingReviews.count ?? 0,
    };
  });

const passwordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(200),
});

export const changeAdminPassword = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => passwordSchema.parse(input))
  .handler(async ({ context, data }) => {
    const { data: isAdmin } = await context.supabase.rpc('has_role', {
      _user_id: context.userId,
      _role: 'admin',
    });
    if (!isAdmin) throw new Error('Forbidden');
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.auth.admin.updateUserById(context.userId, {
      password: data.newPassword,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });