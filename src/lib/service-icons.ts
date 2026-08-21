/**
 * Explicit icon registry for CMS-selected service icons.
 *
 * The admin panel stores a lucide icon name as free text. Importing the whole
 * lucide-react namespace to resolve those names at runtime defeats
 * tree-shaking and ships the entire icon library to the browser, so we import
 * only the icons that are actually offered and fall back to Sparkles.
 */
import {
  Award,
  Box,
  Boxes,
  Brush,
  Building2,
  Car,
  Check,
  CircleDot,
  Cpu,
  Flame,
  Hammer,
  Image,
  Layers,
  Lightbulb,
  MapPin,
  Map,
  Megaphone,
  Monitor,
  Package,
  PaintBucket,
  Palette,
  PenTool,
  Printer,
  Ruler,
  Scissors,
  Settings,
  Signpost,
  Sparkles,
  Star,
  Sun,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  Award,
  Box,
  Boxes,
  Brush,
  Building2,
  Car,
  Check,
  CircleDot,
  Cpu,
  Flame,
  Hammer,
  Image,
  Layers,
  Lightbulb,
  Map,
  MapPin,
  Megaphone,
  Monitor,
  Package,
  PaintBucket,
  Palette,
  PenTool,
  Printer,
  Ruler,
  Scissors,
  Settings,
  Signpost,
  Sparkles,
  Star,
  Sun,
  Truck,
  Wrench,
  Zap,
};

/** Resolve a CMS icon name, falling back to Sparkles for unknown values. */
export function resolveServiceIcon(name?: string | null): LucideIcon {
  return (name && SERVICE_ICONS[name]) || Sparkles;
}
