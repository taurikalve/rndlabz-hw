import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';
import { tick } from 'svelte';

describe('Currency Page', () => {
  it('renders the price when promise resolves', async () => {
    const mockPriceData = { price: 50000, updated: new Date() };
    const mockData = {
      label: 'BTC',
      pricePromise: Promise.resolve(mockPriceData),
    };

    const target = document.createElement('div');
    document.body.appendChild(target);

    render(Page, { target, props: { data: mockData } });

    await tick();

    const heading = page.getByRole('heading', {
      level: 1,
      name: mockData.label,
    });
    await expect.element(heading).toBeInTheDocument();

    const priceElement = page.getByText(String(mockPriceData.price));
    await expect.element(priceElement).toBeInTheDocument();
  });
});
