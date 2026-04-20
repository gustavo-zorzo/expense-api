import { prisma } from '../lib/prisma.js';
import { NotFoundError } from '../utils/errors.js';
import { z } from 'zod';
import {
  createExpenseSchema,
  updateExpenseSchema,
} from '../schemas/expense.js';

async function findAll() {
  return await prisma.expense.findMany();
}

async function findById(id: number) {
  const expense = await prisma.expense.findUnique({ where: { id } });
  if (expense === null) {
    throw new NotFoundError('ID not found');
  }
  return expense;
}

async function create(body: z.infer<typeof createExpenseSchema>) {
  await prisma.expense.create({ data: body });
}

async function update(id: number, data: z.infer<typeof updateExpenseSchema>) {
  await prisma.expense.update({
    where: { id: id },
    data: data,
  });
}

async function deleteExpense(id: number) {
  await prisma.expense.delete({ where: { id: id } });
}

export { findAll, findById, create, update, deleteExpense };
