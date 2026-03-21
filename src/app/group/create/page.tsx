'use client';
import { ROUTES } from '@/shared/model/routes';
import { TitlePage } from '@/shared/ui';
import { GroupForm } from '@/widget/group-from';
import { useTranslations } from 'next-intl';

export default function () {
  const t = useTranslations('group');

  return (
    <div>
      <div className="mb-3">
        <TitlePage title={t('groupCreateTitle')} backLink={ROUTES.GROUP} />
      </div>
      <GroupForm />
    </div>
  );
}
