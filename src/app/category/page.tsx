import { TitlePage } from '@/shared/ui';
import { CategoryList } from '@/widget/category-list';
import { getTranslations } from 'next-intl/server';

export default async function () {
  const t = await getTranslations('category');

  return (
    <div>
      <TitlePage title={t('categoriesTitle')} />
      <CategoryList />
    </div>
  );
}
