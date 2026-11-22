import { cookies } from 'next/headers';

const AUTH_COOKIE_NAMES = ['accessToken', 'refreshToken'] as const;

export async function hasAuthSession(): Promise<boolean> {
  const cookieStore = await cookies();

  return AUTH_COOKIE_NAMES.some((name) => Boolean(cookieStore.get(name)?.value));
}
