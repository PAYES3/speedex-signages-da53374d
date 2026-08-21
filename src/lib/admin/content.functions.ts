import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.rpc('has_role', { _user_id: userId, _role: 'admin' });
  if (!data) throw new Error('Forbidden');
}

/* ============================================================
 * SERVICES
 * ============================================================ */
const serviceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9-]+$/, 'lowercase letters, numbers, hyphens'),
  description: z.string().trim().max(4000).default(''),
  icon: z.string().trim().max(60).default('Sparkles'),
  image_url: z.string().trim().max(800).nullable().optional(),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const listAllServices = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from('services').select('*').order('sort_order').order('title');
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertService = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => serviceSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('services').upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteService = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('services').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ============================================================
 * PORTFOLIO
 * ============================================================ */
const mediaItem = z.object({
  url: z.string().min(1).max(1200),
  type: z.enum(['image', 'video']).default('image'),
  alt: z.string().max(200).optional(),
});

const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  category_slug: z.string().trim().max(120).nullable().optional(),
  description: z.string().trim().max(8000).default(''),
  cover_url: z.string().trim().max(1200).nullable().optional(),
  media: z.array(mediaItem).default([]),
  client: z.string().trim().max(200).nullable().optional(),
  year: z.number().int().min(1990).max(2100).nullable().optional(),
  sort_order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export const listAllProjects = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from('portfolio_projects').select('*').order('sort_order').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertProject = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => projectSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('portfolio_projects').upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteProject = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('portfolio_projects').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* Categories */
export const listCategories = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data, error } = await supabaseAdmin
      .from('portfolio_categories').select('*').order('sort_order').order('name');
    if (error) throw new Error(error.message);
    return data ?? [];
  });

const catSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(120),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9-]+$/),
  sort_order: z.number().int().default(0),
});

export const upsertCategory = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => catSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('portfolio_categories').upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCategory = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('portfolio_categories').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ============================================================
 * TESTIMONIALS
 * ============================================================ */
const testimonialSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(200).optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  content: z.string().trim().min(5).max(2000),
});

export const submitTestimonial = createServerFn({ method: 'POST' })
  .inputValidator((input) => testimonialSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('testimonials').insert({
      name: data.name,
      company: data.company || null,
      rating: data.rating,
      content: data.content,
      approved: false,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listAllTestimonials = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from('testimonials').select('*').order('approved').order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const moderateTestimonial = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid(), approved: z.boolean() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from('testimonials').update({ approved: data.approved }).eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteTestimonial = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('testimonials').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ============================================================
 * INBOX (contact + quotes + jobs)
 * ============================================================ */
export const listInbox = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const [c, q, j] = await Promise.all([
      context.supabase.from('contact_messages').select('*').order('created_at', { ascending: false }).limit(200),
      context.supabase.from('quote_requests').select('*').order('created_at', { ascending: false }).limit(200),
      context.supabase.from('job_applications').select('*').order('created_at', { ascending: false }).limit(200),
    ]);
    return {
      contact: c.data ?? [],
      quotes: q.data ?? [],
      jobs: j.data ?? [],
    };
  });

export const deleteMessage = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({
    id: z.string().uuid(),
    table: z.enum(['contact_messages', 'quote_requests', 'job_applications']),
  }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from(data.table).delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ============================================================
 * PUBLIC READS (used by public pages, no auth required)
 * ============================================================ */
export const publicListServices = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('services').select('*').eq('published', true).order('sort_order').order('title');
    if (error) { console.error('[publicListServices]', error.message); return []; }
    return data ?? [];
  });

export const publicListProjects = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('portfolio_projects').select('*').eq('published', true).order('sort_order').order('created_at', { ascending: false });
    if (error) { console.error('[publicListProjects]', error.message); return []; }
    return data ?? [];
  });

export const publicListTestimonials = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('testimonials').select('id,name,company,rating,content,avatar_url,created_at')
      .eq('approved', true).order('created_at', { ascending: false }).limit(24);
    if (error) { console.error('[publicListTestimonials]', error.message); return []; }
    return data ?? [];
  });

/* ============================================================
 * COMPANIES (group)
 * ============================================================ */
const companySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(160).regex(/^[a-z0-9-]+$/),
  tagline: z.string().trim().max(400).default(''),
  description: z.string().trim().max(8000).default(''),
  services: z.array(z.string().trim().min(1).max(200)).default([]),
  hero_image: z.string().trim().max(1200).nullable().optional(),
  logo_url: z.string().trim().max(1200).nullable().optional(),
  banner_url: z.string().trim().max(1200).nullable().optional(),
  mobile_banner_url: z.string().trim().max(1200).nullable().optional(),
  cta_label: z.string().trim().max(120).nullable().optional(),
  accent_color: z.string().trim().max(20).default('#F58220'),
  website_url: z.string().trim().max(800).nullable().optional(),
  sort_order: z.number().int().default(0),
  active: z.boolean().default(true),
});

export const publicListCompanies = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('companies').select('*').eq('active', true).order('sort_order').order('name');
    if (error) { console.error('[publicListCompanies]', error.message); return []; }
    return data ?? [];
  });

export const publicGetCompany = createServerFn({ method: 'GET' })
  .inputValidator((input) => z.object({ slug: z.string().min(1).max(160) }).parse(input))
  .handler(async ({ data }) => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return null;
    const { data: row, error } = await supabase
      .from('companies').select('*').eq('slug', data.slug).eq('active', true).maybeSingle();
    if (error) { console.error('[publicGetCompany]', error.message); return null; }
    return row;
  });

export const listAllCompanies = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from('companies').select('*').order('sort_order').order('name');
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const upsertCompany = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => companySchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('companies').upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteCompany = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('companies').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderCompanies = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ ids: z.array(z.string().uuid()).max(200) }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    for (let i = 0; i < data.ids.length; i++) {
      const { error } = await context.supabase
        .from('companies').update({ sort_order: i }).eq('id', data.ids[i]);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const duplicateCompany = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: row, error } = await context.supabase
      .from('companies').select('*').eq('id', data.id).maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error('Company not found');
    const suffix = Math.random().toString(36).slice(2, 6);
    const { id: _id, created_at: _c, updated_at: _u, ...rest } = row as Record<string, unknown>;
    const { error: insErr } = await context.supabase.from('companies').insert({
      ...(rest as any),
      name: `${row.name} (copy)`,
      slug: `${row.slug}-copy-${suffix}`.slice(0, 160),
      active: false,
      sort_order: (row.sort_order ?? 0) + 1,
    });
    if (insErr) throw new Error(insErr.message);
    return { ok: true };
  });

/* ============================================================
 * SITE SETTINGS (key/value)
 * ============================================================ */
export const publicGetSettings = createServerFn({ method: 'GET' })
  .handler(async () => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return {} as Record<string, string>;
    const { data, error } = await supabase.from('site_settings').select('key,value');
    if (error) { console.error('[publicGetSettings]', error.message); return {} as Record<string, string>; }
    const out: Record<string, string> = {};
    for (const r of data ?? []) out[r.key as string] = (r.value as string) ?? '';
    return out;
  });

export const updateSettings = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ entries: z.record(z.string().min(1).max(80), z.string().max(2000)) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const rows = Object.entries(data.entries).map(([key, value]) => ({ key, value }));
    const { error } = await context.supabase.from('site_settings').upsert(rows);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/* ============================================================
 * SLIDER SLIDES (independent per context)
 * ============================================================ */
const SLIDE_SELECT =
  'id, context, company_id, image_url, mobile_image_url, title, description, sort_order, visible, companies(name, slug, tagline, description, logo_url, website_url, cta_label, hero_image)';

const sliderContext = z.enum(['home_our_companies', 'our_groups']);

const slideSchema = z.object({
  id: z.string().uuid().optional(),
  context: sliderContext,
  company_id: z.string().uuid().nullable().optional(),
  image_url: z.string().trim().max(1200).nullable().optional(),
  mobile_image_url: z.string().trim().max(1200).nullable().optional(),
  title: z.string().trim().max(200).default(''),
  description: z.string().trim().max(4000).default(''),
  sort_order: z.number().int().default(0),
  visible: z.boolean().default(true),
});

export const publicListSlides = createServerFn({ method: 'GET' })
  .inputValidator((input) => z.object({ context: sliderContext }).parse(input))
  .handler(async ({ data }) => {
    const { getPublicSupabase } = await import('@/lib/supabase-public.server');
    const supabase = getPublicSupabase();
    if (!supabase) return [];
    const { data: rows, error } = await supabase
      .from('slider_slides')
      .select(SLIDE_SELECT)
      .eq('context', data.context)
      .eq('visible', true)
      .order('sort_order');
    if (error) { console.error('[publicListSlides]', error.message); return []; }
    return rows ?? [];
  });

export const listSlides = createServerFn({ method: 'GET' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ context: sliderContext }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: rows, error } = await context.supabase
      .from('slider_slides')
      .select(SLIDE_SELECT)
      .eq('context', data.context)
      .order('sort_order');
    if (error) throw new Error(error.message);
    return rows ?? [];
  });

export const upsertSlide = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => slideSchema.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('slider_slides').upsert(data);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteSlide = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from('slider_slides').delete().eq('id', data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const reorderSlides = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({ ids: z.array(z.string().uuid()).max(200) }).parse(input),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context.supabase, context.userId);
    for (let i = 0; i < data.ids.length; i++) {
      const { error } = await context.supabase
        .from('slider_slides')
        .update({ sort_order: i })
        .eq('id', data.ids[i]);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });