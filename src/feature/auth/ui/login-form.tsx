'use client';

import { Button, Input, InputPassword } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { LoginFormType, validateLoginForm } from '../lib/validate-login-fom';
import { useLogin } from '../api/useLogin';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLoginForm(t)),
  });

  const { mutateAsync: login } = useLogin();

  const loginReq = async (data: LoginFormType, deviceId: string) => {
    toast.promise(
      async () =>
        await login({
          ...data,
          deviceId,
        }).then(() => {
          router.push('/');
        }),
      {
        loading: t('auth.authLoading'),
        success: t('auth.authSuccess'),
        error: (data) => data?.message || t('auth.authError'),
      },
    );
  };

  const onSubmit = async (data: LoginFormType) => {
    const deviceId = localStorage.getItem('deviceId');

    if (!deviceId) {
      const newDeviceId = crypto.randomUUID();
      localStorage.setItem('deviceId', newDeviceId);

      return loginReq(data, newDeviceId);
    }

    return loginReq(data, deviceId);
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={t('common.email')}
        type="email"
        id="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <InputPassword
        error={errors.password?.message}
        label={t('common.password')}
        id={'password'}
        {...register('password')}
      />

      <Button variant={'primary'} size={'lg'}>
        {t('auth.entrance')}
      </Button>
    </form>
  );
};
