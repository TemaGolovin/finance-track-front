'use server';

import { cookies, headers } from 'next/headers';
import { type Locale } from './config';
import { isLocale, LOCALE_COOKIE_NAME } from './locale-cookie';
import { resolveLocaleFromAcceptLanguage } from './resolve-locale-from-accept-language';

export async function getUserLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE_NAME)?.value;

  if (isLocale(fromCookie)) {
    return fromCookie;
  }

  const acceptLanguage = (await headers()).get('accept-language');
  return resolveLocaleFromAcceptLanguage(acceptLanguage);
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
  });
}
