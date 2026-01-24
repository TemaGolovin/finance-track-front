'use client';
import { TitlePage } from '@/shared/ui';
import { GroupForm } from '@/widget/group-from';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function () {
  const t = useTranslations('group');
  const router = useRouter();

  return (
    <div>
      <div className="mb-3">
        <TitlePage title={t('groupCreateTitle')} onBackBtnClick={() => router.push('/group')} />
      </div>
      <GroupForm />
    </div>
  );
}
