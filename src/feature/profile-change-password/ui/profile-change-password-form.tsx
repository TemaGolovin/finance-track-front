'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useChangePassword } from '@/shared/api/queries/auth';
import { Button, InputPassword } from '@/shared/ui';
import {
  createChangePasswordSchema,
  type ChangePasswordFormType,
} from '../lib/validate-change-password-form';

const apiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message: unknown }).message;
    if (Array.isArray(m)) return m.join(', ');
    if (typeof m === 'string') return m;
  }
  return fallback;
};

export const ProfileChangePasswordForm = () => {
  const t = useTranslations('profile');
  const tRoot = useTranslations();
  const schema = useMemo(() => createChangePasswordSchema(tRoot), [tRoot]);
  const { mutateAsync: changePassword } = useChangePassword();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  const onSubmit = async (data: ChangePasswordFormType) => {
    await toast.promise(
      changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
      {
        loading: t('passwordLoading'),
        success: t('passwordSuccess'),
        error: (err) => apiErrorMessage(err, t('passwordError')),
      },
    );
    reset({ currentPassword: '', newPassword: '' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-md p-3 flex flex-col">
      <div className="text-foreground/60 text-sm mb-3">{t('passwordSection')}</div>
      <div>
        <InputPassword
          id="current-password"
          label={t('currentPassword')}
          error={errors.currentPassword?.message}
          autoComplete="current-password"
          {...register('currentPassword')}
        />
      </div>
      <div>
        <InputPassword
          id="new-password"
          label={t('newPassword')}
          error={errors.newPassword?.message}
          autoComplete="new-password"
          {...register('newPassword')}
        />
      </div>
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {t('passwordSubmit')}
      </Button>
    </form>
  );
};
