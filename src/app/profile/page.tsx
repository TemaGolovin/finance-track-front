import { TitlePage } from '@/shared/ui';
import { ProfileOverview } from '@/widget/profile-overview';
import { getTranslations } from 'next-intl/server';

export default async function ProfilePage() {
  const t = await getTranslations('profile');

  return (
    <div>
      <TitlePage title={t('title')} />
      <ProfileOverview />
    </div>
  );
}
