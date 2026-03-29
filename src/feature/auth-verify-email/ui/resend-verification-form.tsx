'use client';

import { useResendVerification } from '@/shared/api/queries/auth';
import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type FormType = z.infer<typeof schema>;

interface ResendVerificationFormProps {
  defaultEmail?: string;
}

export const ResendVerificationForm = ({ defaultEmail }: ResendVerificationFormProps) => {
  const t = useTranslations('verifyEmail');
  const tErrors = useTranslations('errors');

  const { mutateAsync: resend } = useResendVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: { email: defaultEmail ?? '' },
  });

  const onSubmit = async (data: FormType) => {
    await toast.promise(resend(data.email), {
      loading: t('resendLoading'),
      success: t('resendSuccess'),
      error: (err: { message?: string }) => err?.message || t('resendError'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full max-w-sm">
      <p className="text-sm text-muted-foreground">{t('resendLabel')}</p>
      <Input
        label={t('resendEmail')}
        type="email"
        id="resend-email"
        error={errors.email ? tErrors('email') : undefined}
        {...register('email')}
      />
      <Button variant="outline" type="submit">
        {t('resendBtn')}
      </Button>
    </form>
  );
};
