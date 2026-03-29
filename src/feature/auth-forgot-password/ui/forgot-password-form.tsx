'use client';

import { useForgotPassword } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type FormType = z.infer<typeof schema>;

export const ForgotPasswordForm = () => {
  const t = useTranslations('forgotPassword');
  const tErrors = useTranslations('errors');
  const [sent, setSent] = useState(false);

  const { mutateAsync: forgotPassword } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    await toast.promise(forgotPassword(data.email).then(() => setSent(true)), {
      loading: t('loading'),
      success: t('success'),
      error: (err: { message?: string }) => err?.message || t('error'),
    });
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground">{t('success')}</p>
        <Button asChild variant="outline">
          <Link href={ROUTES.LOGIN}>{t('backToLogin')}</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
      <p className="text-sm text-muted-foreground">{t('desc')}</p>
      <Input
        label={t('emailLabel')}
        type="email"
        id="email"
        error={errors.email ? tErrors('email') : undefined}
        {...register('email')}
      />
      <Button variant="primary" size="lg" type="submit">
        {t('submit')}
      </Button>
      <Button asChild variant="ghost" size="sm">
        <Link href={ROUTES.LOGIN}>{t('backToLogin')}</Link>
      </Button>
    </form>
  );
};
