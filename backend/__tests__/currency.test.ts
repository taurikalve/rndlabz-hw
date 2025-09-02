import type { FastifyInstance } from 'fastify';
import request from 'supertest';
import server from '../src/server';

describe('Currency API', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = server();
    await new Promise<void>((resolve, reject) => {
      fastify.listen((err) => {
        if (err) console.error(err), reject();
        resolve();
      });
    });
  });
  afterAll(async () => {
    await fastify.close();
  });

  test('responds with price data', async () => {
    const res = await request(fastify.server).get(
      '/currency?symbol=TON&convert=USDT',
    );
    expect(res.status).toBe(200);

    // price is number
    expect(Number.isFinite(res.body.price)).toBe(true);
    // updated is date
    const date = new Date(res.body.updated);
    expect(isNaN(date.getTime())).toBe(false);
  });
});
