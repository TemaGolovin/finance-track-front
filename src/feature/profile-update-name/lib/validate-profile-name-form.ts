import { z } from 'zod';

export const createProfileNameSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, { error: t('errors.requiredField') }),
  });

export type ProfileNameFormType = z.infer<ReturnType<typeof createProfileNameSchema>>;
