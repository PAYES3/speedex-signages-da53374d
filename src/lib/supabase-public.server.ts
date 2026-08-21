/**
 * Server-side Supabase client for PUBLIC (anon) reads.
 *
 * Public pages must never depend on the service-role key: when
 * SUPABASE_SERVICE_ROLE_KEY is absent or invalid in a deployment
 * environment, every CMS read used to throw and the site silently rendered
 * empty sliders/videos. The publishable key + the existing public RLS
 * policies are all a public read needs.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

let cached: SupabaseClient<Database> | null | undefined;

export function getPublicSupabase(): SupabaseClient<Database> | null {
  if (cached !== undefined) return cached;

  const url =
    process.env['SUPABASE_URL'] ||
    process.env['VITE_SUPABASE_URL'] ||
    '';
  const key =
    process.env['SUPABASE_PUBLISHABLE_KEY'] ||
    process.env['VITE_SUPABASE_PUBLISHABLE_KEY'] ||
    process.env['SUPABASE_ANON_KEY'] ||
    process.env['VITE_SUPABASE_ANON_KEY'] ||
    '';

  if (!url || !key) {
    console.error('[Supabase] Public read client unavailable: missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY');
    cached = null;
    return null;
  }

  cached = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
