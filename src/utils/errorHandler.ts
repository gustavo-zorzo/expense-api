import type { FastifyReply } from 'fastify';

export function errorHandler(e: Error, reply: FastifyReply) {
  if (e.message === 'ID not found') {
    return reply
      .status(404)
      .send({ error: e.message, status: 'Error Occurred' });
  }
  return reply.status(400).send({ error: e.message, status: 'Error Occurred' });
}
