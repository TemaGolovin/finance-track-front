import { TitlePage } from '@/shared/ui';
import { InvitationList } from '@/widget/invitation-list';
import { getTranslations } from 'next-intl/server';

export default async () => {
  const t = await getTranslations('invitation');

  return (
    <div>
      <TitlePage title={t('invitationsTitle')} />
      <InvitationList />
    </div>
  );
};
