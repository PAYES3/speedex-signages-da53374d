import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { useEffect } from 'react';
import { publicGetSettings } from '@/lib/admin/content.functions';
import defaultLogo from '@/assets/speedex-logo.png.asset.json';

export function useSiteSettings() {
  const fetcher = useServerFn(publicGetSettings);
  const { data } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => fetcher(),
    staleTime: 30_000,
  });
  return (data ?? {}) as Record<string, string>;
}

/** Single source of truth for the brand logo (admin uploads it once). */
export function useSiteLogo() {
  const s = useSiteSettings();
  return s.logo_url && s.logo_url.trim() ? s.logo_url : defaultLogo.url;
}

/** Keeps the browser favicon in sync with the admin-uploaded logo. */
export function useFaviconSync() {
  const logo = useSiteLogo();
  useEffect(() => {
    if (!logo) return;
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = logo;
  }, [logo]);
}
