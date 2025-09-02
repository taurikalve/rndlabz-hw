export const tokenPairs: { symbol: string; convert: string; slug: string }[] = [
  { symbol: 'TON', convert: 'USDT' },
  { symbol: 'USDT', convert: 'TON' },
].map(({ symbol, convert }) => ({
  symbol,
  convert,
  slug: `${symbol}-${convert}`,
}));
