import { FC } from 'react';

import { Group as GroupType } from '@/shared/api/queries/groups';
import { BaseCard } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ROUTES } from '@/shared/model/routes';

interface GroupProps {
  group: GroupType;
}

export const GroupCard: FC<GroupProps> = ({ group }) => {
  const t = useTranslations('group');

  return (
    <Link href={ROUTES.GROUP_DETAIL.replace(':id', group.id)}>
      <BaseCard title={group.name}>
        <div className="grid grid-cols-[auto_1fr] gap-x-2 items-center">
          <div className="text-xs text-foreground/60">{t('creator')}:</div>
          <div>{group.creator.name}</div>
          <div className="text-xs text-foreground/60">{t('members')}:</div>
          <div>{group.users.map((user) => user.user.name).join(', ')}</div>
        </div>
      </BaseCard>
    </Link>
  );
};
