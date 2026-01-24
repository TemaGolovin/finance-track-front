'use client';
import { useSearchUsers } from '@/shared/api/queries/user';
import { User } from '@/shared/api/queries/user/types';
import { useDebounce } from '@/shared/lib';
import { cn } from '@/shared/lib/shadcn/utils/utils';
import { Badge, Button, Drawer, Input } from '@/shared/ui';
import { ChevronDown, UserSearch, UserX, XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface UserSelectorProps {
  selectedUsers: User[];
  onAcceptSelectUsers: (user: User[]) => void;
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  selectedUsers,
  onAcceptSelectUsers,
}) => {
  const [innerName, setInnerName] = useState('');
  const [innerSelectedUsers, setInnerSelectedUsers] = useState<User[]>(selectedUsers);

  const groupT = useTranslations('group');

  const debouncedName = useDebounce({
    value: innerName,
    delayMs: 300,
  });

  const { data: searchedUsers, isLoading } = useSearchUsers({ name: debouncedName });

  const onSelectUser = (newUser: User) => {
    if (innerSelectedUsers.some((user) => user.id === newUser.id)) {
      setInnerSelectedUsers((prev) => prev.filter((user) => user.id !== newUser.id));
      return;
    }

    setInnerSelectedUsers((prev) => [...prev, newUser]);
  };

  const onAccept = (onClose: () => void) => {
    onAcceptSelectUsers(innerSelectedUsers);
    onClose();
  };

  return (
    <Drawer
      title={groupT('searchAndAddMembers')}
      trigger={
        <Button className="justify-start relative border h-auto" variant={'default'}>
          <div className="flex gap-1 flex-wrap pr-4 max-h-28">
            {selectedUsers?.length ? (
              selectedUsers.map((user) => (
                <Badge key={user.id} variant={'secondary'}>
                  {user.name}
                </Badge>
              ))
            ) : (
              <span className="text-foreground/60  font-normal text-base">
                {groupT('selectUsers')}
              </span>
            )}
          </div>
          <ChevronDown className="w-4 absolute right-3 top-1/2 translate-y-[-50%]" />
        </Button>
      }
      renderContent={(onClose) => (
        <div>
          <Input
            placeholder="Search user"
            value={innerName}
            onChange={(e) => setInnerName(e.target.value)}
          />

          <div className="min-h-90">
            <div className="max-h-70 overflow-y-auto">
              {!!innerName &&
                searchedUsers?.map((user) => (
                  <button
                    onClick={() => onSelectUser(user)}
                    className={cn(
                      'block w-full text-left text-sm py-1 px-2 mb-1 rounded-md border bg-muted/40 max-h-70 overflow-y-auto',
                      { 'bg-muted': innerSelectedUsers.some((u) => u.id === user.id) },
                    )}
                    key={user.id}
                    type="button"
                  >
                    {user.name}
                  </button>
                ))}
            </div>
            {!innerName?.length && (
              <div className="text-center h-full min-h-44 flex flex-col justify-center items-center">
                <UserSearch className="w-10 h-10 mx-auto mb-4" />
                <div className="text-xs text-foreground/60">{groupT('searchPlaceholder')}</div>
              </div>
            )}
            {!!innerName?.length && !searchedUsers?.length && !isLoading && (
              <div className="text-center h-full min-h-44 flex flex-col justify-center items-center">
                <UserX className="w-10 h-10 mx-auto mb-4" />
                <div className="text-xs text-foreground/60">{groupT('userNotFound')}</div>
              </div>
            )}
            {innerSelectedUsers?.length > 0 && (
              <div className="flex flex-col gap-1 mt-3">
                <div className="text-xs text-foreground/60">{groupT('selectedUsers')}</div>
                <div className="flex flex-wrap gap-2">
                  {innerSelectedUsers?.map((user) => (
                    <Badge key={user.id} variant={'outline'}>
                      {user.name}
                      <button type="button" onClick={() => onSelectUser(user)}>
                        <XIcon className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button className="w-full" onClick={() => onAccept(onClose)} variant={'primary'}>
            Подтвердить
          </Button>
        </div>
      )}
    />
  );
};
