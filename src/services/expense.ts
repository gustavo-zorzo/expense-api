import { idParamSchema } from '../schemas/expense.js';
import { prisma } from '../lib/prisma.js';
import type { Expense as ExpenseType } from '../generated/prisma/client.js';
import { NotFoundError } from '../utils/errors.js';

export async function validateID(id: { id: string }): Promise<ExpenseType> {
  const idval = idParamSchema.parse(id);
  const expense = await prisma.expense.findUnique({ where: idval });
  if (expense === null) {
    throw new NotFoundError('ID not found');
  }
  return expense;
}
