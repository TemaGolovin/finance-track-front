'use client';

import { GroupCard } from '@/entity/group/ui/group';
import { useGroups } from '@/shared/api/queries/groups';
import { ROUTES } from '@/shared/model/routes';
import { FixedPlusLinkButton, Skeleton } from '@/shared/ui';
import { GroupListPlaceholder } from './group-list-placeholder';

export const GroupList = () => {
  const { data: groups, isLoading } = useGroups();

  if (isLoading) {
    return (
      <div className="flex flex-col my-2 gap-2">
        {['sk-1', 'sk-2', 'sk-3'].map((key) => (
          <Skeleton key={key} className="h-24 w-full rounded-md" />
        ))}
      </div>
    );
  }

  const isEmpty = !groups?.length;

  return (
    <div className="flex flex-col my-2 gap-2">
      {isEmpty ? (
        <GroupListPlaceholder />
      ) : (
        groups.map((group) => <GroupCard key={group.id} group={group} />)
      )}

      {!isEmpty ? <FixedPlusLinkButton link={ROUTES.GROUP_CREATE} /> : null}
    </div>
  );
};
