import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';
import {
  createExpenseSchema,
  updateExpenseSchema,
} from '../schemas/expense.js';
import { validateID } from '../services/expense.js';
import { errorHandler } from '../utils/errorHandler.js';

export function expenseRoutes(fastify: FastifyInstance) {
  fastify.get('/expenses', async (request, reply) => {
    try {
      return await reply
        .status(200)
        .send({ expenses: await prisma.expense.findMany() });
    } catch (e) {
      if (e instanceof Error) {
        errorHandler(e, reply);
      }
    }
  });
  fastify.post('/expenses', async (request, reply) => {
    try {
      const body = createExpenseSchema.parse(request.body);
      await prisma.expense.create({ data: body });
      reply.status(201).send({ status: 'Successfully Created' });
    } catch (e) {
      if (e instanceof Error) {
        errorHandler(e, reply);
      }
    }
  });
  fastify.get('/expenses/:id', async (request, reply) => {
    try {
      const expense = await validateID(request.params as { id: string });
      reply.status(200).send({ expense: expense });
    } catch (e) {
      if (e instanceof Error) {
        errorHandler(e, reply);
      }
    }
  });
  fastify.put('/expenses/:id', async (request, reply) => {
    try {
      const expense = await validateID(request.params as { id: string });
      const body = updateExpenseSchema.parse(request.body);
      await prisma.expense.update({
        where: { id: expense.id },
        data: body,
      });
      reply.status(200).send({ status: 'Successfully Updated' });
    } catch (e) {
      if (e instanceof Error) {
        errorHandler(e, reply);
      }
    }
  });
  fastify.delete('/expenses/:id', async (request, reply) => {
    try {
      const expense = await validateID(request.params as { id: string });
      await prisma.expense.delete({ where: { id: expense.id } });
      reply.status(200).send({ status: 'Successfully Deleted' });
    } catch (e) {
      if (e instanceof Error) {
        errorHandler(e, reply);
      }
    }
  });
}
