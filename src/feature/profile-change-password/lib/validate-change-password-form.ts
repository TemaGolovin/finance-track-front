import { z } from 'zod';

export const createChangePasswordSchema = (t: (key: string) => string) =>
  z.object({
    currentPassword: z.string().min(1, { error: t('errors.requiredField') }),
    newPassword: z.string().min(6, { error: t('errors.minLength6') }),
  });

export type ChangePasswordFormType = z.infer<ReturnType<typeof createChangePasswordSchema>>;
