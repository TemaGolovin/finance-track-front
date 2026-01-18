import { TitlePage } from '@/shared/ui';
import { OperationList } from '@/widget/operation-list';
import { getTranslations } from 'next-intl/server';

export default async () => {
  const t = await getTranslations('operation');
  return (
    <div>
      <TitlePage title={t('operationsTitle')} />
      <OperationList />
    </div>
  );
};
