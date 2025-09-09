import z from 'zod';

export const createRegistrationSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(1, { error: t('common.requiredError') }),
    email: z.email({ error: t('common.emailError') }),
    password: z.string().min(6, { error: t('common.minLength6Error') }),
  });

export type RegistrationFormType = z.infer<ReturnType<typeof createRegistrationSchema>>;
