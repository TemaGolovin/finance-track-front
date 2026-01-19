'use client';

import { GroupCard } from '@/entity/group/ui/group';
import { useGroups } from '@/shared/api/queries/groups';
import { ROUTES } from '@/shared/model/routes';
import { FixedPlusLinkButton } from '@/shared/ui';

export const GroupList = () => {
  const { data: groups } = useGroups();

  return (
    <div className="flex flex-col my-2 gap-2">
      {groups?.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}

      <FixedPlusLinkButton link={ROUTES.GROUP_CREATE} />
    </div>
  );
};
