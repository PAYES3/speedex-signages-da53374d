import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

async function assertStaff(supabase: any, userId: string) {
  const { data } = await supabase.rpc('can_manage_content', { _user_id: userId });
  if (data) return;
  const { data: isAdmin } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
  if (!isAdmin) throw new Error('Forbidden');
}

async function snapshot(supabase: any, userId: string, entityType: string, entityId: string, label: string, payload: unknown) {
  await supabase.from('content_versions').insert({
    entity_type: entityType,
    entity_id: entityId,
    label,
    payload: payload as any,
    author_id: userId,
  });
}

/* ============================================================
 * PAGE SECTIONS
 * ============================================================ */
const sectionSchema = z.object({
  id: z.string().uuid().optional(),
  page: z.string().trim().min(1).max(60).default('home'),
  section_type: z.string().trim().min(1).max(60),
  sort_order: z.number().int().default(0),
  visible: z.boolean().default(true),
  status: z.enum(['draft', 'published']).default('published'),
  publish_at: z.string().datetime().nullable().optional(),
  data: z.record(z.string(), z.string()).default({}),
});

export const publicListSections = createServerFn({ method: 'GET' })
  .inputValidator((input: { page?: string } | undefined) => ({ page: input?.page ?? 'home' }))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const nowIso = new Date().toISOString();
    const { data: rows, error } = await supabaseAdmin
      .from('page_sections')
      .select('id,section_type,sort_order,data')
      .eq('page', data.page)
      .eq('visible', true)
      .eq('status', 'published')
      .or(`publish_at.is.null,publish_at.lte.${nowIso}`)
      .order('sort_order');
    if (error) return [];
    return rows ?? [];
  });

export const listSections = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { page?: string } | undefined) => ({ page: input?.page ?? 'home' }))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { data: rows, error } = await context.supabase
      .from('page_sections').select('*').eq('page', data.page).order('sort_order');
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const saveSection = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => sectionSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    if (data.id) {
      const { data: prev } = await context.supabase.from('page_sections').select('*').eq('id', data.id).maybeSingle();
      if (prev) await snapshot(context.supabase, context.userId, 'page_section', data.id, `${prev.section_type} section`, prev);
    }
    const { data: saved, error } = await context.supabase
      .from('page_sections').upsert(data as any).select('id').maybeSingle();
    if (error) throw new Error(error.message);
    return { ok: true, id: saved?.id };
  });

export const reorderSections = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(100) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    for (let i = 0; i < data.ids.length; i++) {
      const { error } = await context.supabase.from('page_sections').update({ sort_order: i }).eq('id', data.ids[i]);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const deleteSection = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { data: prev } = await context.supabase.from('page_sections').select('*').eq('id', data.id).maybeSingle();
    if (prev) await snapshot(context.supabase, context.userId, 'page_section', data.id, 'deleted section', prev);
    const { error } = await context.supabase.from('page_sections').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const duplicateSection = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { data: prev, error } = await context.supabase.from('page_sections').select('*').eq('id', data.id).maybeSingle();
    if (error || !prev) throw new Error(error?.message || 'Section not found');
    const { id, created_at, updated_at, ...rest } = prev as any;
    const { error: insErr } = await context.supabase
      .from('page_sections').insert({ ...rest, sort_order: (rest.sort_order ?? 0) + 1, status: 'draft' });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });

/* ============================================================
 * HERO SLIDES
 * ============================================================ */
const slideSchema = z.object({
  id: z.string().uuid().optional(),
  media_url: z.string().trim().max(1200).default(''),
  media_type: z.enum(['video', 'image']).default('video'),
  poster_url: z.string().trim().max(1200).nullable().optional(),
  title: z.string().trim().max(300).default(''),
  subtitle: z.string().trim().max(500).default(''),
  description: z.string().max(4000).default(''),
  cta_primary_label: z.string().trim().max(120).default(''),
  cta_primary_href: z.string().trim().max(500).default(''),
  cta_secondary_label: z.string().trim().max(120).default(''),
  cta_secondary_href: z.string().trim().max(500).default(''),
  sort_order: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const publicListHeroSlides = createServerFn({ method: 'GET' }).handler(async () => {
  const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
  const { data, error } = await supabaseAdmin
    .from('hero_slides').select('*').eq('active', true).order('sort_order');
  if (error) return [];
  return data ?? [];
});

export const listHeroSlides = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertStaff(context.supabase, context.userId);
    const { data, error } = await context.supabase.from('hero_slides').select('*').order('sort_order');
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const saveHeroSlide = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => slideSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    if (data.id) {
      const { data: prev } = await context.supabase.from('hero_slides').select('*').eq('id', data.id).maybeSingle();
      if (prev) await snapshot(context.supabase, context.userId, 'hero_slide', data.id, prev.title || 'Hero slide', prev);
    }
    const { error } = await context.supabase.from('hero_slides').upsert(data as any);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteHeroSlide = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { error } = await context.supabase.from('hero_slides').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const duplicateHeroSlide = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { data: prev, error } = await context.supabase.from('hero_slides').select('*').eq('id', data.id).maybeSingle();
    if (error || !prev) throw new Error('Slide not found');
    const { id, created_at, updated_at, ...rest } = prev as any;
    const { error: insErr } = await context.supabase
      .from('hero_slides').insert({ ...rest, title: `${rest.title} (copy)`, active: false, sort_order: (rest.sort_order ?? 0) + 1 });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });

export const reorderHeroSlides = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(50) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    for (let i = 0; i < data.ids.length; i++) {
      const { error } = await context.supabase.from('hero_slides').update({ sort_order: i }).eq('id', data.ids[i]);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

/* ============================================================
 * VERSION HISTORY
 * ============================================================ */
export const listVersions = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ entity_type: z.string().max(60), entity_id: z.string().max(120) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { data: rows, error } = await context.supabase
      .from('content_versions')
      .select('*')
      .eq('entity_type', data.entity_type)
      .eq('entity_id', data.entity_id)
      .order('created_at', { ascending: false })
      .limit(30);
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

const RESTORE_TABLES: Record<string, string> = {
  page_section: 'page_sections',
  hero_slide: 'hero_slides',
  page_content: 'page_content',
  site_settings: 'site_settings',
};

export const restoreVersion = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ version_id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertStaff(context.supabase, context.userId);
    const { data: v, error } = await context.supabase
      .from('content_versions').select('*').eq('id', data.version_id).maybeSingle();
    if (error || !v) throw new Error('Version not found');
    const table = RESTORE_TABLES[(v as any).entity_type];
    if (!table) throw new Error('This item cannot be restored automatically');
    const { error: upErr } = await context.supabase.from(table).upsert((v as any).payload);
    if (upErr) throw new Error(upErr.message);
    return { ok: true };
  });
