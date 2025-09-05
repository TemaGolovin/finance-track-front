'use client';

import { Button, Input, InputPassword } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { LoginFormType, validateLoginForm } from '../lib/validate-login-fom';

export const LoginForm = () => {
  const t = useTranslations();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateLoginForm(t)),
  });

  const onSubmit = (data: LoginFormType) => {
    console.log(data);
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
