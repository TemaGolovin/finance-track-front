'use client';

import { AccountDeleteSection } from '@/feature/account-delete';
import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { LogoutAction } from '@/feature/auth';
import { ProfileChangePasswordForm } from '@/feature/profile-change-password';
import { ProfileChangeEmailForm } from '@/feature/profile-change-email';
import { ProfileUpdateNameForm } from '@/feature/profile-update-name';
import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Skeleton } from '@/shared/ui';
import { ProfileSessionsSection } from './profile-sessions-section';
import { LogOut, ShieldCheck, ShieldAlert } from 'lucide-react';
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

  const { email, name, emailVerified } = me.data;

  return (
    <div className="flex flex-col gap-4 mt-2 pb-8">
      <div className="bg-card rounded-md p-3 flex flex-col gap-2">
        <div className="text-foreground/60 text-sm">{t('accountSection')}</div>
        <div>
          <div className="text-xs text-muted-foreground">{t('emailLabel')}</div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-base font-medium break-all">{email}</span>
            {emailVerified ? (
              <span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                {t('emailVerified')}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-medium">
                <ShieldAlert className="h-3.5 w-3.5" />
                {t('emailNotVerified')}
              </span>
            )}
          </div>
          {!emailVerified && (
            <p className="text-xs text-muted-foreground mt-1">{t('emailVerifyHint')}</p>
          )}
        </div>
      </div>

      <ProfileUpdateNameForm initialName={name} />
      <ProfileChangePasswordForm />
      <ProfileChangeEmailForm />

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

      <AccountDeleteSection />
    </div>
  );
};
