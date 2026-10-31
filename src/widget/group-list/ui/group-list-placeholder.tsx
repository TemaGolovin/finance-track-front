'use client';

import { ROUTES } from '@/shared/model/routes';
import { ListEmptyState } from '@/shared/ui';
import { useTranslations } from 'next-intl';

export const GroupListPlaceholder = () => {
  const t = useTranslations('group');

  return (
    <ListEmptyState
      message={t('listEmpty')}
      actionLabel={t('groupCreate')}
      actionHref={ROUTES.GROUP_CREATE}
    />
  );
};
