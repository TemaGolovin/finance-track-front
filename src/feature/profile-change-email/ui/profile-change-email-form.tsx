'use client';

import { useRequestEmailChange } from '@/shared/api/queries/auth';
import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  newEmail: z.string().email(),
});

type FormType = z.infer<typeof schema>;

export const ProfileChangeEmailForm = () => {
  const t = useTranslations('profile');
  const tErrors = useTranslations('errors');

  const { mutateAsync: requestChange } = useRequestEmailChange();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormType) => {
    await toast.promise(
      requestChange(data.newEmail).then(() => reset()),
      {
        loading: t('emailChangeLoading'),
        success: t('emailChangeSuccess'),
        error: (err: { message?: string }) => err?.message || t('emailChangeError'),
      },
    );
  };

  return (
    <div className="bg-card rounded-md p-3 flex flex-col">
      <div className="text-foreground/60 text-sm mb-3">{t('emailChangeSection')}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div>
          <Input
            label={t('emailChangeNewEmail')}
            type="email"
            id="new-email"
            error={errors.newEmail ? tErrors('email') : undefined}
            {...register('newEmail')}
          />
        </div>
        <Button variant="outline" type="submit" className="w-full sm:w-auto">
          {t('emailChangeSubmit')}
        </Button>
      </form>
    </div>
  );
};
