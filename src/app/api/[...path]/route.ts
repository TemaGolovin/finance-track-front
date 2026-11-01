import { SESSION_EXPIRED_CODE } from '@/shared/model/auth-session';
import { cookies } from 'next/headers';
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

function getAccessTokenFromSetCookies(setCookies: string[]): string | undefined {
  for (const raw of setCookies) {
    const [pair] = raw.split(';');
    const separatorIndex = pair.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    const name = pair.slice(0, separatorIndex).trim();
    if (name !== 'accessToken') {
      continue;
    }

    const value = pair.slice(separatorIndex + 1);
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }

  return undefined;
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

function sessionExpiredResponse(): NextResponse {
  const response = NextResponse.json(
    { code: SESSION_EXPIRED_CODE, message: 'Session expired' },
    { status: 401 },
  );

  response.cookies.delete({ name: 'accessToken', path: '/' });
  response.cookies.delete({ name: 'refreshToken', path: '/' });

  return response;
}

async function discardResponseBody(response: Response): Promise<void> {
  try {
    await response.arrayBuffer();
  } catch {
    // upstream body already consumed or connection closed
  }
}

type RefreshSessionResult =
  | { ok: true; accessToken: string; setCookies: string[] }
  | { ok: false; status: number };

let inflightRefresh: {
  refreshTokenKey: string;
  promise: Promise<RefreshSessionResult>;
} | null = null;

async function executeRefresh(refreshToken: string): Promise<RefreshSessionResult> {
  const refreshRes = await fetch(`${process.env.NEXT_API_BACKEND}/auth/refresh`, {
    method: 'POST',
    headers: { cookie: `refreshToken=${refreshToken}` },
  });

  const setCookies = getSetCookies(refreshRes.headers);

  if (!refreshRes.ok) {
    await discardResponseBody(refreshRes);
    return { ok: false, status: refreshRes.status };
  }

  await discardResponseBody(refreshRes);

  const accessToken = getAccessTokenFromSetCookies(setCookies);
  if (!accessToken) {
    return { ok: false, status: 401 };
  }

  return { ok: true, accessToken, setCookies };
}

function refreshAccessToken(refreshToken: string | undefined): Promise<RefreshSessionResult> {
  if (!refreshToken) {
    return Promise.resolve({ ok: false, status: 401 });
  }

  if (inflightRefresh?.refreshTokenKey === refreshToken) {
    return inflightRefresh.promise;
  }

  const promise = executeRefresh(refreshToken).finally(() => {
    if (inflightRefresh?.promise === promise) {
      inflightRefresh = null;
    }
  });

  inflightRefresh = { refreshTokenKey: refreshToken, promise };
  return promise;
}

async function handler(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const cookieStore = await cookies();
  const awaitedParams = await context.params;
  const incomingUrl = new URL(req.url);
  const url = `${process.env.NEXT_API_BACKEND}/${awaitedParams.path.join('/')}${incomingUrl.search}`;

  const accessCookie = cookieStore.get('accessToken')?.value;
  const refreshCookie = cookieStore.get('refreshToken')?.value;

  const reqBody =
    req.method === 'GET' || req.method === 'HEAD' ? undefined : await req.arrayBuffer();

  const backendInit: RequestInit = {
    method: req.method,
    headers: getBackendHeaders(req, accessCookie),
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

  await discardResponseBody(res);

  const refreshResult = await refreshAccessToken(refreshCookie);

  if (!refreshResult.ok) {
    return sessionExpiredResponse();
  }

  const retriedRes = await fetch(url, {
    ...backendInit,
    headers: getBackendHeaders(req, refreshResult.accessToken),
  });

  return toClientResponse(retriedRes, refreshResult.setCookies);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
