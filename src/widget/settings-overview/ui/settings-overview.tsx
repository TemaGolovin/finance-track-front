'use client';

import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { WeekStartSetting } from '@/feature/week-start-setting';
import { useAboutMe } from '@/shared/api/queries/auth';
import { ROUTES } from '@/shared/model/routes';
import { Button, Skeleton } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const SettingsOverview = () => {
  const t = useTranslations('settings');
  const tCommon = useTranslations('common');
  const { data: me, isLoading, isError } = useAboutMe();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 mt-2">
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-32 w-full rounded-md" />
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

  const btnClassName = 'bg-linear-to-t from-secondary/60 to-background/70';

  return (
    <div className="flex flex-col gap-4 mt-2 pb-8">
      <div className="bg-card rounded-md p-3 flex flex-col gap-3">
        <div className="text-foreground/60 text-sm">{t('appearanceSection')}</div>
        <p className="text-xs text-muted-foreground">{t('appearanceHint')}</p>
        <div className="flex flex-wrap gap-2">
          <ThemeSwitcher btnClassName={btnClassName} />
          <I18nSwitcher btnClassName={btnClassName} />
        </div>
      </div>

      <div className="bg-card rounded-md p-3 flex flex-col gap-3">
        <div className="text-foreground/60 text-sm">{t('weekStartSection')}</div>
        <p className="text-xs text-muted-foreground">{t('weekStartHint')}</p>
        <WeekStartSetting />
      </div>
    </div>
  );
};