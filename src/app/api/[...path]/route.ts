import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ROUTES } from '@/shared/model/routes';
import { redirect } from 'next/navigation';

async function handler(req: Request, { params }: { params: { path: string[] } }) {
  const cookieStore = await cookies();

  const awaitedParams = await params;
  const incomingUrl = new URL(req.url);

  const url = `${process.env.NEXT_API_BACKEND}/${awaitedParams.path.join('/')}${incomingUrl?.search || ''}`;

  let res = await fetch(url, {
    method: req.method,
    headers: {
      ...Object.fromEntries(req.headers),
      Authorization: `Bearer ${cookieStore.get('accessToken')?.value}`,
    },
    body: req.body,
    // @ts-ignore
    duplex: 'half',
  });

  if (res.status === 401) {
    const refreshRes = await fetch(`${process.env.NEXT_API_BACKEND}/auth/refresh`, {
      method: 'POST',
      headers: { cookie: `refreshToken=${cookieStore.get('refreshToken')?.value}` },
    });

    const refreshData = await refreshRes.json();

    if (!refreshRes.ok) {
      return redirect(ROUTES.LOGIN);
    }

    const setCookie = refreshRes.headers.get('set-cookie');
    const response = NextResponse.json(refreshData, { status: refreshRes.status });
    if (setCookie) response.headers.append('set-cookie', setCookie);

    const newCookies = await cookies();

    res = await fetch(url, {
      method: req.method,
      headers: {
        Authorization: `Bearer ${newCookies.get('accessToken')?.value}`,
      },
      body: req.body,
    });

    return new NextResponse(await res.text(), {
      status: res.status,
      headers: response.headers,
    });
  }

  return new NextResponse(await res.text(), { status: res.status, headers: res.headers });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
