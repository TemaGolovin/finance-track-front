import { getClientLocale } from '../lib/i18n/client-locale';

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
    const err = await data.json();
    throw err;
  }

  const resData: ResData = await data.json();

  return resData;
};
