'use client';
import { useGroupDetail } from '@/shared/api/queries/groups';
import { ROUTES } from '@/shared/model/routes';
import { TitlePage } from '@/shared/ui';
import { GroupDetail } from '@/widget/group-detail';
import { useParams } from 'next/navigation';

export default () => {
  const param = useParams<{ id: string }>();

  const { data: group, isLoading } = useGroupDetail({ id: param.id });

  return (
    <div>
      <TitlePage backLink={ROUTES.GROUP} isLoading={isLoading} title={group?.name || ''} />
      <GroupDetail group={group} isLoading={isLoading} />
    </div>
  );
};
