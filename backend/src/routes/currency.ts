import type { FastifyInstance, RouteShorthandOptions } from 'fastify';
import getPrice from '@/lib/price';

export default function (
  fastify: FastifyInstance,
  opts: RouteShorthandOptions,
  done: (err?: Error | undefined) => void,
) {
  fastify.get<{ Querystring: { symbol: string; convert: string } }>(
    '/',
    { ...opts },
    async function (req, reply) {
      try {
        const { symbol, convert } = req.query;

        const price = await getPrice(fastify, symbol, convert);

        reply.code(200).send(price);
      } catch (err) {
        console.error(err);
        reply.code(500).send({ err: 'server error' });
      }
    },
  );

  done();
}
