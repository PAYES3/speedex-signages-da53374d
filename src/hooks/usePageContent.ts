import { useQuery } from '@tanstack/react-query';
import { useServerFn } from '@tanstack/react-start';
import { publicGetPageContent } from '@/lib/admin/media.functions';

/**
 * Admin-editable copy for the public site.
 * Usage: const c = usePageContent('home_hero'); c('title', 'Fallback headline')
 */
export function usePageContent(page: string) {
  const fetcher = useServerFn(publicGetPageContent);
  const { data } = useQuery({
    queryKey: ['page-content'],
    queryFn: () => fetcher(),
    staleTime: 30_000,
  });
  const map = (data ?? {}) as Record<string, string>;
  return (key: string, fallback = '') => {
    const v = map[`${page}.${key}`];
    return v && v.trim() ? v : fallback;
  };
}
