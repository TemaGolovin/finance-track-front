'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { RegistrationFormType, createRegistrationSchema } from '../lib/validate-registration-form';
import { Button, Input, InputPassword } from '@/shared/ui';
import { useRegistration } from '../api/useRegistration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/shared/model/routes';

export const RegistrationForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const { mutateAsync: registration } = useRegistration();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createRegistrationSchema(t)),
  });

  const onSubmit = async (data: RegistrationFormType) => {
    const deviceId = crypto.randomUUID();
    localStorage.setItem('deviceId', deviceId);

    toast.promise(
      async () =>
        await registration({
          ...data,
          deviceId,
        }).then(() => {
          router.push(ROUTES.MAIN);
        }),
      {
        loading: t('registration.authLoading'),
        success: t('registration.authSuccess'),
        error: (data) => data?.message || t('registration.authError'),
      },
    );
  };

  return (
    <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label={`${t('common.email')}*`}
        type="email"
        id="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input
        label={`${t('common.nickname')}*`}
        id="name"
        error={errors.name?.message}
        {...register('name')}
      />
      <InputPassword
        error={errors.password?.message}
        label={`${t('common.password')}*`}
        id={'password'}
        {...register('password')}
      />

      <Button variant={'primary'} size={'lg'} type="submit">
        {t('registration.register')}
      </Button>
    </form>
  );
};
