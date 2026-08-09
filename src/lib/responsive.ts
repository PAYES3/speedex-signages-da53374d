import { useEffect, useState } from 'react';

export type Device = 'mobile' | 'tablet' | 'desktop';
export type Orientation = 'portrait' | 'landscape';

export type Viewport = {
  width: number;
  height: number;
  device: Device;
  orientation: Orientation;
  /** true for short viewports such as 1366x768 laptops */
  short: boolean;
};

const SSR: Viewport = { width: 1440, height: 900, device: 'desktop', orientation: 'landscape', short: false };

function read(): Viewport {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const device: Device = width < 768 ? 'mobile' : width < 1024 ? 'tablet' : 'desktop';
  return {
    width,
    height,
    device,
    orientation: height >= width ? 'portrait' : 'landscape',
    short: height < 780 && width >= 1024,
  };
}

/** Live viewport metrics used to adapt media framing, not just type sizes. */
export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(SSR);

  useEffect(() => {
    const update = () => setVp(read());
    update();
    window.addEventListener('resize', update, { passive: true });
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return vp;
}

export type FocalMap = Partial<Record<Device | 'portrait', string>> & { default?: string };

/** Resolve an object-position value for the current device/orientation. */
export function focalFor(vp: Viewport, focal?: FocalMap): string {
  if (!focal) return vp.device === 'mobile' ? '50% 35%' : 'center';
  if (vp.orientation === 'portrait' && focal.portrait) return focal.portrait;
  return focal[vp.device] ?? focal.default ?? 'center';
}
