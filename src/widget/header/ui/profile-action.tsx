'use client';

import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui';
import { CircleUser } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const ProfileAction = () => {
  const { data: user, isLoading } = useAboutMe();
  const t = useTranslations('sidebar');

  if (!user || isLoading) {
    return null;
  }

  return (
    <Button size="icon" variant="outline" asChild title={t('profile')} aria-label={t('profile')}>
      <Link
        href={ROUTES.PROFILE}
        className="inline-flex bg-linear-to-t from-secondary/60 to-background/70 items-center justify-center"
      >
        <CircleUser className="w-6 h-6" />
      </Link>
    </Button>
  );
};
