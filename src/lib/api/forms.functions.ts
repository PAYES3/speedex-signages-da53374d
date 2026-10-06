import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(5).max(4000),
});

export const submitContact = createServerFn({ method: 'POST' })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const digitalConsultationSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(255),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().min(5).max(2800),
});

export const submitDigitalConsultation = createServerFn({ method: 'POST' })
  .inputValidator((input) => digitalConsultationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabaseAdmin.from('contact_messages')
      .select('id', { count: 'exact', head: true }).eq('email', data.email).gte('created_at', since);
    if (countError) throw new Error('Could not check submission limit');
    if ((count ?? 0) >= 3) throw new Error('Please wait before sending another request');
    const { error } = await supabaseAdmin.from('contact_messages').insert({
      name: data.name, email: data.email, phone: data.phone,
      subject: `Speedex Digital consultation — ${data.service}`,
      message: `Company: ${data.company || 'Not provided'}\nService: ${data.service}\nMessage: ${data.message}`,
    });
    if (error) throw new Error('Could not save consultation request');
    return { ok: true };
  });

export const submitQuote = createServerFn({ method: 'POST' })
  .inputValidator((input) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('quote_requests').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

const jobSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  position: z.string().trim().min(1).max(200),
  cover_letter: z.string().trim().max(4000).optional().or(z.literal('')),
  cv_path: z.string().trim().max(500).optional().or(z.literal('')),
});

export const submitApplication = createServerFn({ method: 'POST' })
  .inputValidator((input) => jobSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('job_applications').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      position: data.position,
      cover_letter: data.cover_letter || null,
      cv_path: data.cv_path || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });