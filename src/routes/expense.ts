import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';
import { createExpenseSchema, idParamSchema } from '../schemas/expense.js';

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
  fastify.get('/expenses/:id', async (request, reply) => {
    try {
      const id = idParamSchema.parse(request.params);
      const expense = await prisma.expense.findUnique({ where: id });
      if (expense === null) {
        return reply
          .status(404)
          .send({ error: 'Id not found', status: 'Error Ocurred' });
      }
      reply.status(200).send({ expense: expense });
    } catch (e) {
      if (e instanceof Error) {
        reply.status(400).send({ error: e.message, status: 'Error Ocurred' });
      }
    }
  });
}
