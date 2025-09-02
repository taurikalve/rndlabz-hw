import { tokenPairs } from '$lib/consts';
import { error } from '@sveltejs/kit';

export function entries() {
  return tokenPairs.map(({ slug }) => ({ slug }));
}

export function load({ params }) {
  const token = tokenPairs.find((token) => token.slug === params.slug);

  if (!token) throw error(404, 'Not found');

  return token;
}

export const prerender = true;
