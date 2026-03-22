'use client';

import { useParams } from 'next/navigation';
import { TitlePage } from '@/shared/ui';
import { GroupCategoryConnectForm } from '@/widget/group-category-connect';
import { ROUTES } from '@/shared/model/routes';
import { useTranslations } from 'next-intl';

export default () => {
  const { id } = useParams<{ id: string }>();
  const t = useTranslations('group');

  return (
    <div>
      <TitlePage
        title={t('connectCategoriesTitle')}
        backLink={ROUTES.GROUP_DETAIL.replace(':id', id)}
      />
      <GroupCategoryConnectForm groupId={id} />
    </div>
  );
};
