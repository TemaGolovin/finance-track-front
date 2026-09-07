import { ROUTES } from '@/shared/model/routes';
import { TitlePage } from '@/shared/ui';
import { CategoryForm } from '@/widget/category-form';
import { getTranslations } from 'next-intl/server';

export default async function ({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = await params;
  const t = await getTranslations('category');

  return (
    <div>
      <div className="mb-3">
        <TitlePage title={t('edition')} backLink={ROUTES.CATEGORY} />
      </div>
      <CategoryForm editedId={awaitedParams.id} />
    </div>
  );
}
