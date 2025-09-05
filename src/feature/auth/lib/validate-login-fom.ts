import { z } from 'zod';

export const validateLoginForm = (t: (arg: string) => string) =>
  z.object({
    email: z.email({ error: t('common.emailError') }),
    password: z.string().min(1, { error: t('common.requiredError') }),
  });

export type LoginFormType = z.infer<ReturnType<typeof validateLoginForm>>;
