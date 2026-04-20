import { z } from 'zod';

export const createExpenseSchema = z.object({
  title: z.string(),
  amount: z.number(),
  category: z.string(),
  date: z.coerce.date(),
});

export const updateExpenseSchema = createExpenseSchema
  .partial()
  .transform((data) => {
    return Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    );
  });

export const idParamSchema = z.object({
  id: z.coerce.number().positive().min(1),
});
