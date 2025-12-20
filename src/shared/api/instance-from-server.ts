import { cookies } from 'next/headers';
import { instanceFetch } from './instances';
import { redirect } from 'next/navigation';
import { ROUTES } from '../model/routes';

const refreshFromServer = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const res = await instanceFetch<{ token: string }>('/auth/refresh', {
    method: 'POST',
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
    credentials: 'include',
  });
  console.log(res);

  return res;
};

export const instanceFetchFromServer = async <ResData>(url: string, init?: RequestInit) => {
  const cookie = await cookies();

  const accessToken = cookie.get('accessToken');

  const request = (access: string) =>
    instanceFetch<ResData>(url, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: `Bearer ${access}`,
      },
    });

  try {
    return await request(accessToken?.value || '');
  } catch (error) {
    console.log(error);

    if (typeof error === 'object' && !!error && 'statusCode' in error && error.statusCode === 401) {
      const { token } = await refreshFromServer();
      return request(token).catch(() => {
        redirect(ROUTES.HOME);
      });
    }
  }
};
