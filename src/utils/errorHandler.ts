import type { FastifyReply } from 'fastify';
import { NotFoundError } from './errors.js';

export function errorHandler(e: Error, reply: FastifyReply) {
  if (e instanceof NotFoundError) {
    return reply
      .status(404)
      .send({ error: e.message, status: 'Error Occurred' });
  }
  return reply.status(400).send({ error: e.message, status: 'Error Occurred' });
}
