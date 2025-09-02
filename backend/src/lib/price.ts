import type { FastifyInstance } from 'fastify';
import 'dotenv/config';
import { CMC_API_URL } from '@/lib/consts';

// const cryptoSlug = 'toncoin';
// const convertCurrency = 'USDT';

const staleTime = 30 * 60 * 1000;

export default async function getPrice(
  fastify: FastifyInstance,
  symbol: string,
  convert: string,
): Promise<{ price: number; updated: Date }> {
  const currencyDb = fastify.mongo.db!.collection<DbCurrency>('currency');

  // Check if existing and not stale
  const dbFilter = { symbol, convert };
  const existingPrice = await currencyDb.findOne(dbFilter);

  if (
    existingPrice &&
    existingPrice.updated.getTime() >= Date.now() - staleTime
  ) {
    return { price: existingPrice.price, updated: existingPrice.updated };
  }

  // Get fresh data
  const url = new URL(CMC_API_URL);
  url.search = new URLSearchParams({
    symbol,
    convert,
  }).toString();

  const res = await fetch(url, {
    headers: {
      Accepts: 'application/json',
      'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY!,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`API error (${res.status}): ${data.status.error_message}`);
  }

  const coinData = data.data[symbol][0];

  const newPrice = coinData.quote[convert].price;
  const now = new Date();

  setImmediate(() =>
    currencyDb.findOneAndUpdate(
      dbFilter,
      {
        $set: {
          price: newPrice,
          updated: now,
        },
      },
      { upsert: true },
    ),
  );

  return { price: newPrice, updated: now };
}
