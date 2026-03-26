import { type Locale, defaultLocale, locales } from './config';

const COOKIE_NAME = 'NEXT_LOCALE';

function parseCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined;
  }
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function getClientLocale(): Locale {
  const raw = parseCookie(COOKIE_NAME);
  if (raw && (locales as readonly string[]).includes(raw)) {
    return raw as Locale;
  }
  return defaultLocale;
}
