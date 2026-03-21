'use client';
import { useGroupRemoveMember } from '@/shared/api/queries/groups';
import { Button, Drawer } from '@/shared/ui';
import { useTranslations } from 'next-intl';
import { FC } from 'react';
import { Trash2 } from 'lucide-react';

interface RemoveMemberDrawerProps {
  groupId: string;
  memberId: string;
  memberName: string;
}

export const RemoveMemberDrawer: FC<RemoveMemberDrawerProps> = ({
  groupId,
  memberId,
  memberName,
}) => {
  const groupT = useTranslations('group');
  const { mutate: removeMember, isPending } = useGroupRemoveMember();

  return (
    <Drawer
      trigger={
        <Button variant="ghost" size="icon-lg" className="text-destructive hover:text-destructive">
          <Trash2 />
        </Button>
      }
      title={groupT('removeMemberTitle')}
      description={groupT('removeMemberDescription', { name: memberName })}
      renderContent={(onClose) => (
        <Button
          variant="destructive"
          className="w-full"
          disabled={isPending}
          onClick={() => removeMember({ groupId, memberId }, { onSuccess: onClose })}
        >
          {groupT('removeMemberAction')}
        </Button>
      )}
    />
  );
};
