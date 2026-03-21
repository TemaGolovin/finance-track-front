'use client';

import { ROUTES } from '@/shared/model/routes';
import { TitlePage } from '@/shared/ui';
import { OperationForm } from '@/widget/operation-form';
import { useTranslations } from 'next-intl';

export default () => {
  const t = useTranslations('operation');

  return (
    <div>
      <TitlePage title={t('operationCreateTitle')} backLink={ROUTES.OPERATION} />
      <OperationForm />
    </div>
  );
};
