'use client';

import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { LogoutAction } from '@/feature/auth';
import { ProfileChangePasswordForm } from '@/feature/profile-change-password';
import { ProfileUpdateNameForm } from '@/feature/profile-update-name';
import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Skeleton } from '@/shared/ui';
import { ProfileSessionsSection } from './profile-sessions-section';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const ProfileOverview = () => {
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const tSidebar = useTranslations('sidebar');

  const { data: me, isLoading, isError } = useAboutMe();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-2">
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-32 w-full rounded-md" />
        <Skeleton className="h-40 w-full rounded-md" />
      </div>
    );
  }

  if (isError || !me?.data) {
    return (
      <div className="mt-4 text-center text-muted-foreground">
        <p>{t('needLogin')}</p>
        <Button asChild variant="primary" className="mt-3">
          <Link href={ROUTES.LOGIN}>{tCommon('login')}</Link>
        </Button>
      </div>
    );
  }

  const { email, name } = me.data;

  return (
    <div className="flex flex-col gap-4 mt-2 pb-8">
      <div className="bg-card rounded-md p-3 flex flex-col gap-2">
        <div className="text-foreground/60 text-sm">{t('accountSection')}</div>
        <div>
          <div className="text-xs text-muted-foreground">{t('emailLabel')}</div>
          <div className="text-base font-medium break-all">{email}</div>
        </div>
      </div>

      <ProfileUpdateNameForm initialName={name} />
      <ProfileChangePasswordForm />

      <div className="bg-card rounded-md p-3 flex flex-col gap-3">
        <div className="text-foreground/60 text-sm">{t('appearanceSection')}</div>
        <p className="text-xs text-muted-foreground">{t('appearanceHint')}</p>
        <div className="flex flex-wrap gap-2">
          <ThemeSwitcher btnClassName="bg-linear-to-t from-secondary/60 to-background/70" />
          <I18nSwitcher btnClassName="bg-linear-to-t from-secondary/60 to-background/70" />
        </div>
      </div>

      <ProfileSessionsSection />

      <div className="bg-card rounded-md p-3 flex flex-col gap-3">
        <div className="text-foreground/60 text-sm">{t('logoutSection')}</div>
        <p className="text-xs text-muted-foreground">{t('logoutDescription')}</p>
        <LogoutAction size="default" btnClassName="w-full border-destructive text-destructive">
          <LogOut className="w-5 h-5" />
          {tSidebar('logout')}
        </LogoutAction>
      </div>
    </div>
  );
};
