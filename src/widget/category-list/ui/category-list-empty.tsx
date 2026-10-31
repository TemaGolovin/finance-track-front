'use client';

import { ROUTES } from '@/shared/model/routes';
import { ListEmptyState } from '@/shared/ui';
import { useTranslations } from 'next-intl';

export const CategoryListEmpty = () => {
  const t = useTranslations('category');

  return (
    <ListEmptyState
      message={t('listEmpty')}
      actionLabel={t('createCategory')}
      actionHref={ROUTES.CATEGORY_CREATE}
    />
  );
};
