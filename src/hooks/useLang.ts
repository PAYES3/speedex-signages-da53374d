import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Lang } from '@/lib/i18n';

/** Applies the language to the document (dir + lang) and persists the choice. */
export function applyLang(lang: Lang) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  try { localStorage.setItem('lang', lang); } catch { /* storage blocked */ }
}

export function useLang() {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'ar' ? 'ar' : 'en') as Lang;

  const setLang = useCallback(
    (next: Lang) => {
      i18n.changeLanguage(next);
      applyLang(next);
    },
    [i18n],
  );

  const toggle = useCallback(() => setLang(lang === 'ar' ? 'en' : 'ar'), [lang, setLang]);

  /** Translate with an explicit English fallback so untouched copy still renders. */
  const T = useCallback(
    (key: string, fallback: string) => {
      const value = t(key, { defaultValue: '' });
      return value || fallback;
    },
    [t],
  );

  /** Pick the Arabic CMS value when present, otherwise the English one. */
  const pick = useCallback(
    (english?: string | null, arabic?: string | null) =>
      (lang === 'ar' ? (arabic?.trim() || english || '') : (english || '')) as string,
    [lang],
  );

  return { lang, isRTL: lang === 'ar', setLang, toggle, T, pick };
}
