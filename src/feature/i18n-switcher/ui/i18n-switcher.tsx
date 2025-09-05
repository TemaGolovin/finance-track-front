'use client';

import { Locale } from '@/shared/lib/i18n/config';
import { setUserLocale } from '@/shared/lib/i18n/locale';
import { Button, DropdownRadio, Tooltip } from '@/shared/ui';
import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

export const I18nSwitcher = () => {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <DropdownRadio
      selectedId={locale}
      trigger={
        <div className="max-w-max inline">
          <Tooltip content={t('common.changeLanguage')}>
            <Button size="icon" variant="default">
              <Languages />
            </Button>
          </Tooltip>
        </div>
      }
      onSelect={(langId) => setUserLocale(langId as Locale)}
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
