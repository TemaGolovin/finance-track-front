'use client';

import { ROUTES } from '@/shared/model/routes';
import { TitlePage } from '@/shared/ui';
import { OperationForm } from '@/widget/operation-form';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default () => {
  const t = useTranslations('operation');
  const router = useRouter();

  return (
    <div>
      <TitlePage
        title={t('operationCreateTitle')}
        onBackBtnClick={() => router.push(ROUTES.OPERATION)}
      />
      <OperationForm />
    </div>
  );
};
