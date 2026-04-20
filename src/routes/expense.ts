import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';
import { createExpenseSchema } from '../schemas/expense.js';
export function expenseRoutes(fastify: FastifyInstance) {
  fastify.get('/expenses', async (request, reply) => {
    return await reply
      .status(200)
      .send({ expenses: await prisma.expense.findMany() });
  });
  fastify.post('/expenses', async (request, reply) => {
    try {
      const body = createExpenseSchema.parse(request.body);
      await prisma.expense.create({ data: body });
      reply.status(201).send({ status: 'Successfully created' });
    } catch (e) {
      if (e instanceof Error) {
        reply.status(400).send({ error: e.message, status: 'Error Ocurred' });
      }
    }
  });
}
