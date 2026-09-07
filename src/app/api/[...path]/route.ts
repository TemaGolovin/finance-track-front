import { ROUTES } from '@/shared/model/routes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

const FORWARDED_REQUEST_HEADERS = ['content-type', 'accept-language'] as const;

const STRIP_RESPONSE_HEADERS = ['content-encoding', 'content-length', 'transfer-encoding'] as const;

function getBackendHeaders(req: Request, accessToken: string | undefined): Headers {
  const headers = new Headers();

  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = req.headers.get(name);
    if (value) {
      headers.set(name, value);
    }
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return headers;
}

function getAccessTokenFromRefreshBody(body: unknown): string | undefined {
  if (typeof body !== 'object' || body === null || !('token' in body)) {
    return undefined;
  }

  return typeof body.token === 'string' ? body.token : undefined;
}

function getSetCookies(headers: Headers): string[] {
  if (typeof headers.getSetCookie === 'function') {
    return headers.getSetCookie();
  }

  const combined = headers.get('set-cookie');
  return combined ? [combined] : [];
}

function toClientResponse(upstream: Response, extraSetCookies: string[] = []): NextResponse {
  const headers = new Headers(upstream.headers);

  for (const name of STRIP_RESPONSE_HEADERS) {
    headers.delete(name);
  }

  for (const cookie of extraSetCookies) {
    headers.append('set-cookie', cookie);
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
}

async function handler(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const cookieStore = await cookies();
  const awaitedParams = await context.params;
  const incomingUrl = new URL(req.url);
  const url = `${process.env.NEXT_API_BACKEND}/${awaitedParams.path.join('/')}${incomingUrl.search}`;

  const reqBody =
    req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.arrayBuffer();

  const backendInit: RequestInit = {
    method: req.method,
    headers: getBackendHeaders(req, cookieStore.get('accessToken')?.value),
    body: reqBody,
  };

  const res = await fetch(url, backendInit);

  const proxiedPath = awaitedParams.path.join('/');
  const isLoginOrRegistration401 =
    res.status === 401 &&
    req.method === 'POST' &&
    (proxiedPath === 'auth/login' || proxiedPath === 'auth/registration');

  if (res.status !== 401 || isLoginOrRegistration401) {
    return toClientResponse(res);
  }

  await res.body?.cancel();

  const refreshRes = await fetch(`${process.env.NEXT_API_BACKEND}/auth/refresh`, {
    method: 'POST',
    headers: { cookie: `refreshToken=${cookieStore.get('refreshToken')?.value}` },
  });

  if (!refreshRes.ok) {
    return redirect(ROUTES.LOGIN);
  }

  let refreshData: unknown;
  try {
    refreshData = await refreshRes.json();
  } catch {
    return redirect(ROUTES.LOGIN);
  }

  // cookies() still has the original request cookies; the new access is in the refresh JSON
  const newAccessToken = getAccessTokenFromRefreshBody(refreshData);
  if (!newAccessToken) {
    return redirect(ROUTES.LOGIN);
  }

  const retriedRes = await fetch(url, {
    ...backendInit,
    headers: getBackendHeaders(req, newAccessToken),
  });

  return toClientResponse(retriedRes, getSetCookies(refreshRes.headers));
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
