'use client';

import { Locale } from '@/shared/lib/i18n/config';
import { setUserLocale } from '@/shared/lib/i18n/locale';
import { Button, DropdownRadio, Tooltip } from '@/shared/ui';
import { Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

interface I18nSwitcherProps {
  btnClassName?: string;
}

export const I18nSwitcher = ({ btnClassName }: I18nSwitcherProps) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  return (
    <DropdownRadio
      selectedId={locale}
      trigger={
        <div className="max-w-max inline">
          <Tooltip content={t('common.changeLanguage')}>
            <Button size="icon" variant="default" className={btnClassName}>
              <Languages />
            </Button>
          </Tooltip>
        </div>
      }
      onSelect={async (langId) => {
        await setUserLocale(langId as Locale);
        router.refresh();
      }}
      list={[
        {
          id: 'ru' as const,
          label: 'Русский',
        },
        {
          id: 'en' as const,
          label: 'English',
        },
      ]}
    />
  );
};
