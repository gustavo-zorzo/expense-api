import { idParamSchema } from '../schemas/expense.js';
import { prisma } from '../lib/prisma.js';
import type { Expense as ExpenseType } from '../generated/prisma/client.js';

export async function validateID(id: { id: string }): Promise<ExpenseType> {
  const idval = idParamSchema.parse(id);
  const expense = await prisma.expense.findUnique({ where: idval });
  if (expense === null) {
    throw new Error('ID not found');
  }
  return expense;
}
