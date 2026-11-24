import { TitlePage } from '@/shared/ui';
import { SettingsOverview } from '@/widget/settings-overview';
import { ROUTES } from '@/shared/model/routes';
import { getTranslations } from 'next-intl/server';

export default async function SettingsPage() {
  const t = await getTranslations('settings');

  return (
    <div>
      <TitlePage title={t('title')} backLink={ROUTES.PROFILE} />
      <SettingsOverview />
    </div>
  );
}