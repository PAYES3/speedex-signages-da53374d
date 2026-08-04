import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
  if (!data) throw new Error('Forbidden');
}

const assetSchema = z.object({
  id: z.string().uuid().optional(),
  folder: z.string().trim().min(1).max(60).default('general'),
  name: z.string().trim().min(1).max(200),
  url: z.string().trim().min(1).max(1200),
  path: z.string().trim().min(1).max(600),
  mime_type: z.string().trim().max(100).default('image/webp'),
  size_bytes: z.number().int().min(0).default(0),
  width: z.number().int().min(0).nullable().optional(),
  height: z.number().int().min(0).nullable().optional(),
  alt: z.string().trim().max(300).default(''),
});

export const listMedia = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const saveMedia = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ items: z.array(assetSchema).min(1).max(50) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('media_assets').upsert(data.items);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const renameMedia = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        id: z.string().uuid(),
        name: z.string().trim().min(1).max(200),
        alt: z.string().trim().max(300).default(''),
        folder: z.string().trim().min(1).max(60),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from('media_assets')
      .update({ name: data.name, alt: data.alt, folder: data.folder })
      .eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteMedia = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).min(1).max(100) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('media_assets').delete().in('id', data.ids);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ============================================================
 * PAGE CONTENT (every heading / paragraph / button / image)
 * ============================================================ */
export const publicGetPageContent = createServerFn({ method: 'GET' }).handler(async () => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data, error } = await supabaseAdmin.from('page_content').select('page,key,value');
  if (error) return {} as Record<string, string>;
  const out: Record<string, string> = {};
  for (const r of data ?? []) out[`${r.page}.${r.key}`] = (r.value as string) ?? '';
  return out;
});

export const listPageContent = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from('page_content')
      .select('*')
      .order('page')
      .order('key');
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertPageContent = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z
      .object({
        items: z
          .array(
            z.object({
              page: z.string().trim().min(1).max(60),
              key: z.string().trim().min(1).max(80),
              value: z.string().max(8000).default(''),
            }),
          )
          .min(1)
          .max(300),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from('page_content')
      .upsert(data.items, { onConflict: 'page,key' });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
