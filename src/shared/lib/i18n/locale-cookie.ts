import { type Locale, locales } from './config';

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}