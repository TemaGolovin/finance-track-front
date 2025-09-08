export const instanceFetch = async <ResData>(url: string, init?: RequestInit) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    ...init,
  });

  if (!data.ok) {
    const err = await data.json();
    throw err;
  }

  const resData: ResData = await data.json();

  return resData;
};
