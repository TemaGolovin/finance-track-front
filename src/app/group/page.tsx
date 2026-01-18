import { TitlePage } from '@/shared/ui';
import { GroupList } from '@/widget/group-list';
import { getTranslations } from 'next-intl/server';

export default async () => {
  const t = await getTranslations('group');

  return (
    <div>
      <TitlePage title={t('groupsTitle')} />
      <GroupList />
    </div>
  );
};
