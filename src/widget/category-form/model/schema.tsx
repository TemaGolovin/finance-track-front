import { iconsKeys } from '@/shared/lib';
import z from 'zod';

export const CreateSchemaForCategoryForm = (messages: {
  name: string;
  color: string;
  icon: string;
}) =>
  z.object({
    type: z.enum(['EXPENSE', 'INCOME']),
    name: z.string().min(1, { message: messages.name }),
    color: z.string({ error: messages.color }).min(1, { message: messages.color }),
    icon: z.enum(iconsKeys),
  });

export type CategoryFormType = z.infer<ReturnType<typeof CreateSchemaForCategoryForm>>;
