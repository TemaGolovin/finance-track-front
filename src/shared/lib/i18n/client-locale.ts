import { type Locale, defaultLocale } from './config';
import { isLocale, LOCALE_COOKIE_NAME } from './locale-cookie';

function parseCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getClientLocale(): Locale {
  const raw = parseCookie(LOCALE_COOKIE_NAME);
  if (isLocale(raw)) {
    return raw;
  }
  return defaultLocale;
}
