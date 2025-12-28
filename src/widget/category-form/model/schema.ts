import z from 'zod';

export const createOperationSchema = (errors: {
  sum: {
    required: string;
    greaterThanZero: string;
  };
  categoryId: string;
}) =>
  z.object({
    sum: z
      .string()
      .min(1, { message: errors.sum.required })
      .refine(
        (value) => {
          if (Number(value.replace(',', '.')) > 0) {
            return true;
          }

          return false;
        },
        {
          message: errors.sum.greaterThanZero,
        },
      ),
    type: z.enum(['INCOME', 'EXPENSE']),
    categoryId: z.string().min(1, { message: errors.categoryId }),
    date: z.date(),
    comment: z.string().optional(),
  });

export type OperationType = z.infer<ReturnType<typeof createOperationSchema>>;
