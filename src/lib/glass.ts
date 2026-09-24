import type { CSSProperties } from 'react';

/** Admin-tunable glass card look for the inner sliders (stored in site_settings). */
export type GlassSettings = {
  opacity: number; // 0-100
  blur: number; // px 0-40
  border: number; // px 0-5
  borderOpacity: number; // 0-100
  shadow: number; // 0-100
  radius: number; // px 0-40
  tint: string; // hex
  strength: 'light' | 'medium' | 'strong';
};

export const GLASS_DEFAULTS: GlassSettings = {
  opacity: 14,
  blur: 20,
  border: 1,
  borderOpacity: 30,
  shadow: 55,
  radius: 24,
  tint: '#ffffff',
  strength: 'medium',
};

export const GLASS_KEYS: Record<keyof GlassSettings, string> = {
  opacity: 'glass_opacity',
  blur: 'glass_blur',
  border: 'glass_border',
  borderOpacity: 'glass_border_opacity',
  shadow: 'glass_shadow',
  radius: 'glass_radius',
  tint: 'glass_tint',
  strength: 'glass_strength',
};

const num = (v: string | undefined, d: number, min: number, max: number) => {
  const n = Number(v);
  return Number.isFinite(n) && v !== '' && v != null ? Math.min(max, Math.max(min, n)) : d;
};

export function readGlass(s: Record<string, string> | undefined): GlassSettings {
  const g = s ?? {};
  const strength = g[GLASS_KEYS.strength];
  const tint = g[GLASS_KEYS.tint];
  return {
    opacity: num(g[GLASS_KEYS.opacity], GLASS_DEFAULTS.opacity, 0, 100),
    blur: num(g[GLASS_KEYS.blur], GLASS_DEFAULTS.blur, 0, 40),
    border: num(g[GLASS_KEYS.border], GLASS_DEFAULTS.border, 0, 5),
    borderOpacity: num(g[GLASS_KEYS.borderOpacity], GLASS_DEFAULTS.borderOpacity, 0, 100),
    shadow: num(g[GLASS_KEYS.shadow], GLASS_DEFAULTS.shadow, 0, 100),
    radius: num(g[GLASS_KEYS.radius], GLASS_DEFAULTS.radius, 0, 40),
    tint: tint && /^#[0-9a-f]{6}$/i.test(tint) ? tint : GLASS_DEFAULTS.tint,
    strength: strength === 'light' || strength === 'strong' ? strength : 'medium',
  };
}

export function glassToEntries(g: GlassSettings): Record<string, string> {
  const out: Record<string, string> = {};
  (Object.keys(GLASS_KEYS) as (keyof GlassSettings)[]).forEach((k) => (out[GLASS_KEYS[k]] = String(g[k])));
  return out;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

/** Inline style for a glass card. Mobile gets lighter blur and a slightly smaller radius for performance. */
export function glassStyle(g: GlassSettings, mobile = false): CSSProperties {
  const frost = g.strength === 'light' ? 0.75 : g.strength === 'strong' ? 1.35 : 1;
  const sat = g.strength === 'light' ? 120 : g.strength === 'strong' ? 180 : 150;
  const blur = Math.round(g.blur * frost * (mobile ? 0.6 : 1));
  const rgb = hexToRgb(g.tint);
  const a = Math.min(1, (g.opacity / 100) * frost);
  const s = g.shadow / 100;
  const filter = blur > 0 ? `blur(${blur}px) saturate(${sat}%)` : 'none';
  return {
    background: `linear-gradient(135deg, rgb(${rgb} / ${a}), rgb(${rgb} / ${a * 0.55}))`,
    backdropFilter: filter,
    WebkitBackdropFilter: filter,
    border: `${g.border}px solid rgb(255 255 255 / ${g.borderOpacity / 100})`,
    borderRadius: mobile ? Math.round(g.radius * 0.75) : g.radius,
    boxShadow: `0 30px 80px -30px rgb(0 0 0 / ${0.75 * s}), inset 0 1px 0 rgb(255 255 255 / ${0.35 * s})`,
  };
}
