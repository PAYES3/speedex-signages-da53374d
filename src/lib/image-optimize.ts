/** Browser-side image pipeline: resize, compress and convert to WebP before upload. */
export type OptimizedImage = {
  blob: Blob;
  width: number;
  height: number;
  name: string;
  type: string;
};

export async function optimizeImage(
  file: File,
  opts: { maxWidth?: number; quality?: number } = {},
): Promise<OptimizedImage> {
  const { maxWidth = 2000, quality = 0.82 } = opts;

  // Non-raster files (svg, video, pdf) pass straight through.
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') {
    return { blob: file, width: 0, height: 0, name: file.name, type: file.type };
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { blob: file, width: bitmap.width, height: bitmap.height, name: file.name, type: file.type };
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/webp', quality),
  );
  if (!blob) return { blob: file, width, height, name: file.name, type: file.type };

  const base = file.name.replace(/\.[^.]+$/, '');
  return { blob, width, height, name: `${base}.webp`, type: 'image/webp' };
}

/** Crop an image to a given aspect ratio (centered) and return a WebP file. */
export async function cropToAspect(file: File, aspect: number): Promise<File> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file;
  const bitmap = await createImageBitmap(file);
  const current = bitmap.width / bitmap.height;
  let sw = bitmap.width;
  let sh = bitmap.height;
  if (current > aspect) sw = Math.round(bitmap.height * aspect);
  else sh = Math.round(bitmap.width / aspect);
  const sx = Math.round((bitmap.width - sw) / 2);
  const sy = Math.round((bitmap.height - sh) / 2);

  const canvas = document.createElement('canvas');
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext('2d');
  if (!ctx) return file;
  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, sw, sh);
  bitmap.close?.();
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/webp', 0.85));
  if (!blob) return file;
  return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' });
}
