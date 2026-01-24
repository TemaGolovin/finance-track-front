import z from 'zod';

export const createGroupFormSchema = (errors: { requiredField: string }) =>
  z.object({
    name: z.string().min(1, { message: errors.requiredField }),
    invitedUsers: z
      .array(
        z.object({
          id: z.string().min(1, { message: errors.requiredField }),
          name: z.string().min(1, { message: errors.requiredField }),
        }),
      )
      .optional(),
  });

export type GroupFormType = z.infer<ReturnType<typeof createGroupFormSchema>>;
