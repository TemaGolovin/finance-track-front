'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useUpdateProfile } from '@/shared/api/queries/auth';
import { Button, Input } from '@/shared/ui';
import {
  createProfileNameSchema,
  type ProfileNameFormType,
} from '../lib/validate-profile-name-form';

interface ProfileUpdateNameFormProps {
  initialName: string;
}

const apiErrorMessage = (err: unknown, fallback: string): string => {
  if (err && typeof err === 'object' && 'message' in err) {
    const m = (err as { message: unknown }).message;
    if (Array.isArray(m)) return m.join(', ');
    if (typeof m === 'string') return m;
  }
  return fallback;
};

export const ProfileUpdateNameForm = ({ initialName }: ProfileUpdateNameFormProps) => {
  const t = useTranslations('profile');
  const tRoot = useTranslations();
  const schema = useMemo(() => createProfileNameSchema(tRoot), [tRoot]);
  const { mutateAsync: updateProfile } = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileNameFormType>({
    resolver: zodResolver(schema),
    values: { name: initialName },
  });

  const onSubmit = async (data: ProfileNameFormType) => {
    await toast.promise(updateProfile(data.name.trim()), {
      loading: t('nameLoading'),
      success: t('nameSuccess'),
      error: (err) => apiErrorMessage(err, t('nameError')),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-md p-3 flex flex-col">
      <p className="text-xs text-muted-foreground mb-3">{t('nameHint')}</p>
      <div>
        <Input
          id="profile-name"
          label={t('nameLabel')}
          error={errors.name?.message}
          {...register('name')}
        />
      </div>
      <Button type="submit" variant="primary" className="w-full sm:w-auto">
        {t('nameSave')}
      </Button>
    </form>
  );
};
