import { z } from 'zod';

export const createFeedbackSchema = (t: (key: string) => string) =>
  z.object({
    type: z.enum(['problem', 'suggestion']),
    replyEmail: z
      .string()
      .trim()
      .min(1, { error: t('errors.requiredField') })
      .email({ error: t('errors.email') }),
    message: z
      .string()
      .trim()
      .min(10, { error: t('errors.minLength10') })
      .max(2000, { error: t('errors.maxLength2000') }),
  });

export type FeedbackFormType = z.infer<ReturnType<typeof createFeedbackSchema>>;
