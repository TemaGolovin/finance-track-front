'use client';
import { useGroupDetail, useGroupInvitations } from '@/shared/api/queries/groups';
import { ROUTES } from '@/shared/model/routes';
import { TitlePage } from '@/shared/ui';
import { GroupForm } from '@/widget/group-from';
import { useParams } from 'next/navigation';

export default function GroupEditPage() {
  const params = useParams<{ id: string }>();

  const { data: group, isLoading } = useGroupDetail({ id: params.id });
  const { data: groupInvitations } = useGroupInvitations({
    id: params.id,
  });

  return (
    <div>
      <div className="mb-3">
        <TitlePage backLink={ROUTES.GROUP} isLoading={isLoading} title={group?.name || ''} />
      </div>
      {group && (
        <GroupForm
          mode="edit"
          group={{
            ...group,
            invitedUsersIds: groupInvitations?.map((invitation) => invitation.recipient.id) || [],
          }}
        />
      )}
    </div>
  );
}
