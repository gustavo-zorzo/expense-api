import { idParamSchema } from '../schemas/expense.js';
import { prisma } from '../lib/prisma.js';
import type { Expense as ExpenseType } from '../generated/prisma/client.js';
import { NotFoundError } from '../utils/errors.js';

export async function validateID(id: { id: string }): Promise<number> {
  return idParamSchema.parse(id);
}
