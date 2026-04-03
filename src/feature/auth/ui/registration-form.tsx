'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm } from 'react-hook-form';
import { RegistrationFormType, createRegistrationSchema } from '../lib/validate-registration-form';
import { Button, Checkbox, Input, InputPassword } from '@/shared/ui';
import { useRegistration } from '../api/useRegistration';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ROUTES } from '@/shared/model/routes';
import { uuidV4 } from '@/shared/lib';
import Link from 'next/link';

export const RegistrationForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const { mutateAsync: registration } = useRegistration();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormType>({
    resolver: zodResolver(createRegistrationSchema(t)),
    defaultValues: { privacyAccepted: false },
  });

  const onSubmit = async ({ privacyAccepted: _consent, ...data }: RegistrationFormType) => {
    const deviceId = uuidV4();
    localStorage.setItem('deviceId', deviceId);

    toast.promise(
      async () =>
        await registration({
          ...data,
          deviceId,
        }).then(() => {
          router.push(`${ROUTES.VERIFY_EMAIL_SENT}?email=${encodeURIComponent(data.email)}`);
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

      <Controller
        name="privacyAccepted"
        control={control}
        render={({ field }) => (
          <Checkbox
            id="privacyAccepted"
            ref={field.ref}
            checked={field.value}
            onCheckedChange={(v) => {
              field.onChange(v === true);
            }}
            onBlur={field.onBlur}
            label={t.rich('registration.privacyConsentLabel', {
              link: (chunks) => (
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-primary underline underline-offset-2 hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </Link>
              ),
            })}
            error={errors.privacyAccepted?.message}
          />
        )}
      />

      <Button variant={'primary'} size={'lg'} type="submit">
        {t('registration.register')}
      </Button>
    </form>
  );
};
