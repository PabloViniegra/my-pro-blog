export function getSafeImageSrc(
  src?: string | null,
  fallback: string = '/avatar.png'
): string {
  if (
    typeof src !== 'string' ||
    src.trim() === '' ||
    src.trim() === '{}' ||
    !/^\/|^https?:\/\//.test(src)
  ) {
    return fallback
  }

  return src
}
