import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLang } from '@/hooks/useLang';
import { DIGITAL_SERVICES, DIGITAL_FAQ, DIGITAL_INDUSTRIES, DIGITAL_SETTINGS_DEFAULTS, type DigitalService } from './defaults';
import digitalLogo from '@/assets/speedex-digital-logo.png.asset.json';

export type DigitalPortfolio = { id: string; title: string; title_ar: string; category: string; description: string; description_ar: string; image_url: string | null; link_url: string | null };
export type DigitalTestimonial = { id: string; name: string; company: string; quote: string; quote_ar: string; rating: number };
export type DigitalData = {
  settings: Record<string, string>;
  services: DigitalService[];
  faqs: { question: string; answer: string; question_ar: string; answer_ar: string }[];
  industries: { name: string; name_ar: string }[];
  portfolio: DigitalPortfolio[];
  testimonials: DigitalTestimonial[];
};

export const DIGITAL_DEFAULT_DATA: DigitalData = {
  settings: { ...DIGITAL_SETTINGS_DEFAULTS, logo_url: digitalLogo.url },
  services: DIGITAL_SERVICES,
  faqs: DIGITAL_FAQ.map(([question, answer, question_ar, answer_ar]) => ({ question, answer, question_ar, answer_ar })),
  industries: DIGITAL_INDUSTRIES.map(([name, name_ar]) => ({ name, name_ar })),
  portfolio: [],
  testimonials: [],
};

/** Reads Speedex Digital content from its own tables; falls back to defaults so pages never render empty. */
export async function fetchDigitalData(): Promise<DigitalData> {
  const [st, sv, fq, ind, pf, ts] = await Promise.all([
    supabase.from('digital_settings').select('key,value'),
    supabase.from('digital_services').select('*').eq('active', true).order('sort_order'),
    supabase.from('digital_faqs').select('*').eq('active', true).order('sort_order'),
    supabase.from('digital_industries').select('*').eq('active', true).order('sort_order'),
    supabase.from('digital_portfolio').select('*').eq('active', true).order('sort_order'),
    supabase.from('digital_testimonials').select('*').eq('active', true).order('sort_order'),
  ]);
  const settings = { ...DIGITAL_DEFAULT_DATA.settings };
  for (const row of st.data ?? []) if (row.value) settings[row.key] = row.value;
  return {
    settings,
    services: sv.data?.length ? (sv.data as unknown as DigitalService[]) : DIGITAL_DEFAULT_DATA.services,
    faqs: fq.data?.length ? fq.data : DIGITAL_DEFAULT_DATA.faqs,
    industries: ind.data?.length ? ind.data : DIGITAL_DEFAULT_DATA.industries,
    portfolio: (pf.data ?? []) as DigitalPortfolio[],
    testimonials: (ts.data ?? []) as DigitalTestimonial[],
  };
}

export function useDigital() {
  const { data } = useQuery({ queryKey: ['digital-data'], queryFn: fetchDigitalData, placeholderData: DIGITAL_DEFAULT_DATA, staleTime: 0 });
  const { lang } = useLang();
  const ar = lang === 'ar';
  const tr = (en: string, arabic?: string) => (ar && arabic ? arabic : en);
  const d = data ?? DIGITAL_DEFAULT_DATA;
  const wa = (msg: string) => `https://wa.me/${d.settings.whatsapp}?text=${encodeURIComponent(msg)}`;
  return { ...d, ar, tr, wa };
}
