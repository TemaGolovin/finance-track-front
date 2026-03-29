'use client';

import { useResetPassword } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, InputPassword } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const createSchema = (minLengthMsg: string) =>
  z.object({
    newPassword: z.string().min(6, minLengthMsg),
  });

type FormType = { newPassword: string };

interface ResetPasswordFormProps {
  token: string | null;
}

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const t = useTranslations('resetPassword');
  const tErrors = useTranslations('errors');
  const [done, setDone] = useState(false);

  const { mutateAsync: resetPassword } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(createSchema(tErrors('minLength6'))),
  });

  if (!token) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <XCircle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">{t('invalidToken')}</p>
        <Button asChild variant="primary">
          <Link href={ROUTES.LOGIN}>{t('toLogin')}</Link>
        </Button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <p className="text-muted-foreground">{t('success')}</p>
        <Button asChild variant="primary">
          <Link href={ROUTES.LOGIN}>{t('toLogin')}</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = async (data: FormType) => {
    await toast.promise(resetPassword({ token, newPassword: data.newPassword }).then(() => setDone(true)), {
      loading: t('loading'),
      success: t('success'),
      error: (err: { message?: string }) => err?.message || t('error'),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
      <p className="text-sm text-muted-foreground">{t('desc')}</p>
      <InputPassword
        label={t('newPassword')}
        id="newPassword"
        error={errors.newPassword?.message}
        {...register('newPassword')}
      />
      <Button variant="primary" size="lg" type="submit">
        {t('submit')}
      </Button>
    </form>
  );
};
