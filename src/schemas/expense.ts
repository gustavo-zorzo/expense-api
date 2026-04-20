import { z } from 'zod';

export const createExpenseSchema = z.object({
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.date(),
});

export const updateExpenseSchema = createExpenseSchema.partial();

export const idParamSchema = z.object({
  id: z.coerce.number().positive().min(1),
});
