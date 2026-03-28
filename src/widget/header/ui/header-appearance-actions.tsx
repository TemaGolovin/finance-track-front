'use client';

import { I18nSwitcher, ThemeSwitcher } from '@/feature';
import { useAboutMe } from '@/shared/api/queries/auth';

const btnClassName = 'bg-linear-to-t from-secondary/60 to-background/70';

export const HeaderAppearanceActions = () => {
  const { data: user, isLoading } = useAboutMe();

  if (!isLoading && user) {
    return null;
  }

  return (
    <>
      <ThemeSwitcher btnClassName={btnClassName} />
      <I18nSwitcher btnClassName={btnClassName} />
    </>
  );
};
