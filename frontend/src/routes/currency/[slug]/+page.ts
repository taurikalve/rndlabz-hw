import { error } from '@sveltejs/kit';
import { PUBLIC_API_URL } from '$env/static/public';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  const { slug } = params;

  async function getPrice() {
    const url = new URL(`${PUBLIC_API_URL}/currency`);

    const [symbol, convert] = slug.split('-');

    url.search = new URLSearchParams({
      symbol,
      convert,
    }).toString();

    const res = await fetch(url);
    if (!res.ok) throw error(res.status, 'Failed to fetch price');

    return res.json() as Promise<{ price: number; updated: Date }>;
  }

  return { label: slug, pricePromise: getPrice() };
};
