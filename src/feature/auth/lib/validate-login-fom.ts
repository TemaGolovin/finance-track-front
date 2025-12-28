import { z } from 'zod';

export const validateLoginForm = (t: (arg: string) => string) =>
  z.object({
    email: z.email({ error: t('errors.email') }),
    password: z.string().min(1, { error: t('errors.requiredField') }),
  });

export type LoginFormType = z.infer<ReturnType<typeof validateLoginForm>>;
