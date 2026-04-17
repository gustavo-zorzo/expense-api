import Fastify from 'fastify';
const fastify = Fastify({
  logger: true,
});

fastify.get('/health', async (request, reply) => {
  return reply.status(200).send({ status: 'ok', live: true });
});

const startServer = async (): Promise<void> => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

startServer();
