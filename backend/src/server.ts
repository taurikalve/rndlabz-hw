import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyMongodb from '@fastify/mongodb';

import currencyRoutes from '@/routes/currency';

const isDev = process.env.NODE_ENV === 'development';

export default function server() {
  const fastify = Fastify({ logger: isDev });

  // Plugins
  fastify.register(fastifyCors, { origin: true });
  fastify.register(fastifyMongodb, {
    forceClose: true,
    url: process.env.MONGO_URI,
  });

  // Routes
  fastify.register(currencyRoutes, { prefix: '/currency' });

  // Run
  const port = 3001;
  fastify.listen({ port, host: '0.0.0.0' }, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${port}`);
  });

  return fastify;
}
