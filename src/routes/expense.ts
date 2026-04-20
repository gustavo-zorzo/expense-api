import type { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma.js';
import {
  createExpenseSchema,
  idParamSchema,
  updateExpenseSchema,
} from '../schemas/expense.js';
import { validateID } from '../services/expense.js';

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
      reply.status(201).send({ status: 'Successfully Created' });
    } catch (e) {
      if (e instanceof Error) {
        reply.status(400).send({ error: e.message, status: 'Error Ocurred' });
      }
    }
  });
  fastify.get('/expenses/:id', async (request, reply) => {
    try {
      const expense = await validateID(request.params as { id: string });
      reply.status(200).send({ expense: expense });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'ID not found') {
          return reply
            .status(404)
            .send({ error: e.message, status: 'Error Ocurred' });
        }
        reply.status(400).send({ error: e.message, status: 'Error Ocurred' });
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
      reply.status(200).send({ status: 'Succesfully Updated' });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'ID not found') {
          return reply
            .status(404)
            .send({ error: e.message, status: 'Error Ocurred' });
        }
        reply.status(400).send({ error: e.message, status: 'Error Ocurred' });
      }
    }
  });
  fastify.delete('/expenses/:id', async (request, reply) => {
    try {
      const expense = await validateID(request.params as { id: string });
      await prisma.expense.delete({ where: { id: expense.id } });
      reply.status(200).send({ status: 'Sucessfully Deleted' });
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === 'ID not found') {
          return reply
            .status(404)
            .send({ error: e.message, status: 'Error Ocurred' });
        }
        reply.status(400).send({ error: e.message, status: 'Error Ocurred' });
      }
    }
  });
}
