import z from 'zod';

export const createRegistrationSchema = (t: (arg: string) => string) =>
  z.object({
    name: z.string().min(1, { error: t('errors.requiredField') }),
    email: z.email({ error: t('errors.email') }),
    password: z.string().min(6, { error: t('errors.minLength6') }),
    privacyAccepted: z.boolean().refine((v) => v, {
      message: t('registration.privacyConsentRequired'),
    }),
  });

export type RegistrationFormType = z.infer<ReturnType<typeof createRegistrationSchema>>;
