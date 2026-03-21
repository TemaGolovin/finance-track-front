import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { createGroupFormSchema, GroupFormType } from '../model/schema';
import { UserSelector } from '@/feature/user-selector';
import { Group } from '@/shared/api/queries/groups';
import { useMemo } from 'react';
import { useGroupFormActions } from '../model/useGroupFormctions';

type GroupFormMode = 'create' | 'edit';

interface GroupFormProps {
  mode?: GroupFormMode;
  group?: Group & { invitedUsersIds?: string[] };
}

export const GroupForm: React.FC<GroupFormProps> = ({ mode = 'create', group }) => {
  const groupT = useTranslations('group');
  const errorsT = useTranslations('errors');

  const { onSubmit } = useGroupFormActions(mode, group);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GroupFormType>({
    resolver: zodResolver(
      createGroupFormSchema({
        requiredField: errorsT('requiredField'),
      }),
    ),
    defaultValues: {
      name: group?.name ?? '',
    },
  });

  const invitedUsers = useWatch({ control, name: 'invitedUsers' });

  const excludeUserIdsForSelector = useMemo(() => {
    return [...(group?.invitedUsersIds || []), ...(group?.users?.map((user) => user.id) || [])];
  }, [group]);

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder={`${groupT('groupName')}*`}
        {...register('name')}
        error={errors?.name?.message}
      />

      <Controller
        name="invitedUsers"
        control={control}
        render={({ field: { onChange, value } }) => (
          <UserSelector
            selectedUsers={value || []}
            onAcceptSelectUsers={onChange}
            excludeUserIds={excludeUserIdsForSelector}
          />
        )}
      />

      <div className="fixed inset-x-3 bottom-4">
        <Button type="submit" className="w-full" variant={'primary'}>
          {!!invitedUsers?.length && invitedUsers.length > 0
            ? groupT('groupCreateAndInviteMembers')
            : groupT('groupCreate')}
        </Button>
      </div>
    </form>
  );
};
