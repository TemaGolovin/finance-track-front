import { Group, useGroupInvitations } from '@/shared/api/queries/groups';
import { SecondaryCard } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { FC, Fragment } from 'react';
import { invitationStatusToKeyMessage } from '../model/consts';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { InvitationStatuses } from '@/shared/api/queries/invitation/types';
import { SkeletonInfoStr } from './skeleton-info-str';
import { FixedEditLinkIcon } from '@/shared/ui/button/fixed-edit-link-icon';
import { ROUTES } from '@/shared/model/routes';

interface GroupDetailProps {
  group: Group | undefined;
  isLoading: boolean;
}

export const GroupDetail: FC<GroupDetailProps> = ({ group, isLoading }) => {
  const groupT = useTranslations('group');
  const { data: groupInvitations, isLoading: isLoadingInvitation } = useGroupInvitations({
    id: group?.id,
  });

  const membersWithoutCreator = group?.users?.filter((user) => user?.id !== group?.creatorId);

  return (
    <>
      <div className="flex flex-col gap-2 py-2">
        <SecondaryCard title={groupT('groupName')}>
          <SkeletonInfoStr isLoading={isLoading}>{group?.name}</SkeletonInfoStr>
        </SecondaryCard>
        <SecondaryCard title={groupT('creator')}>
          <SkeletonInfoStr isLoading={isLoading}>{group?.creator.name}</SkeletonInfoStr>
        </SecondaryCard>
        <SecondaryCard title={groupT('members')}>
          <SkeletonInfoStr isLoading={isLoading}>
            {membersWithoutCreator?.length ? (
              membersWithoutCreator?.map((user) => <div key={user.id}>{user.name}</div>)
            ) : (
              <div className="text-sm">{groupT('noMembersExceptCreator')}</div>
            )}
          </SkeletonInfoStr>
        </SecondaryCard>
        {!isLoadingInvitation && !!groupInvitations?.length && (
          <SecondaryCard title={groupT('inactiveMembers')}>
            <div className="grid grid-cols-[max-content_max-content] gap-x-4 gap-y-2 items-center">
              {groupInvitations?.map((invitation) => (
                <Fragment key={invitation.id}>
                  <div>{invitation?.recipient?.name}</div>
                  <div
                    className={cn('text-xs', {
                      'text-warning': invitation?.status === InvitationStatuses?.PENDING,
                      'text-destructive':
                        invitation?.status === InvitationStatuses?.DECLINED ||
                        invitation?.status === InvitationStatuses?.CANCELLED,
                    })}
                  >
                    {groupT(invitationStatusToKeyMessage?.[invitation?.status])}
                  </div>
                </Fragment>
              ))}
            </div>
          </SecondaryCard>
        )}
      </div>
      {group && <FixedEditLinkIcon link={ROUTES.GROUP_EDIT.replace(':id', group.id)} />}
    </>
  );
};
