import { isLocale, LOCALE_COOKIE_NAME } from '@/shared/lib/i18n/locale-cookie';
import { resolveLocaleFromAcceptLanguage } from '@/shared/lib/i18n/resolve-locale-from-accept-language';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  if (isLocale(existing)) {
    return NextResponse.next();
  }

  const locale = resolveLocaleFromAcceptLanguage(request.headers.get('accept-language'));
  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: '/',
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};