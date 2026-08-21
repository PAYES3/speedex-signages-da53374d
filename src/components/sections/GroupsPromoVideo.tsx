import { AdaptiveVideo } from '@/components/AdaptiveMedia';
import hero3 from '@/assets/hero/hero-3.mp4.asset.json';

/** Full-width promotional video shown below the group company list. */
export function GroupsPromoVideo({ url, poster }: { url?: string; poster?: string }) {
  const src = url && url.trim() ? url.trim() : hero3.url;

  return (
    <section className="relative w-full bg-black">
      <div className="w-full h-[46vh] sm:h-[62vh]">
        <AdaptiveVideo src={src} poster={poster} preload="metadata" />
      </div>
    </section>
  );
}

export default GroupsPromoVideo;
