import { type Locale, defaultLocale } from './config.ts';

function isRussianLanguageTag(tag: string): boolean {
  return tag.split('-')[0] === 'ru';
}

/**
 * Первый визит: только `ru` → русский, иначе английский.
 * Учитываются q-веса Accept-Language среди поддерживаемых тегов en/ru.
 */
export function resolveLocaleFromAcceptLanguage(
  acceptLanguage: string | null | undefined,
): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const entries = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      const q = qParam ? Number.parseFloat(qParam.trim().slice(2)) : 1;
      return {
        tag: tag.trim().toLowerCase(),
        q: Number.isFinite(q) ? q : 0,
      };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    if (isRussianLanguageTag(tag)) {
      return 'ru';
    }
    if (tag.split('-')[0] === 'en') {
      return 'en';
    }
  }

  return defaultLocale;
}