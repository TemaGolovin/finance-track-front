'use server';

import { cookies } from 'next/headers';
import { type Locale, defaultLocale } from './config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<Locale> {
  return ((await cookies()).get(COOKIE_NAME)?.value || defaultLocale) as Locale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
