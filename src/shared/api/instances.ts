import { isSessionExpiredError } from '@/shared/model/auth-session';
import { ROUTES, isPublicPath } from '@/shared/model/routes';
import { getClientLocale } from '../lib/i18n/client-locale';

function redirectToLoginIfNeeded(): void {
  if (typeof window === 'undefined') {
    return;
  }

  if (isPublicPath(window.location.pathname)) {
    return;
  }

  window.location.assign(ROUTES.LOGIN);
}

export const instanceFetch = async <ResData>(url: string, init?: RequestInit) => {
  const locale = getClientLocale();
  const { headers: initHeaders, ...restInit } = init ?? {};
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_BFF}${url}`, {
    credentials: 'include',
    ...restInit,
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
      ...initHeaders,
    },
  });

  if (!data.ok) {
    const err: unknown = await data.json().catch(() => ({}));

    if (isSessionExpiredError(err)) {
      redirectToLoginIfNeeded();
    }

    throw err;
  }

  const resData: ResData = await data.json();

  return resData;
};
