import { Button, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { createGroupFormSchema, GroupFormType } from '../model/schema';
import { UserSelector } from '@/feature/user-selector';
import { useGroupCreate } from '@/shared/api/queries/groups';
import { useInvitationUser } from '@/shared/api/queries/user';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/model/routes';

export const GroupForm = () => {
  const groupT = useTranslations('group');
  const errorsT = useTranslations('errors');

  const router = useRouter();

  const { mutateAsync: groupCreate } = useGroupCreate();
  const { mutateAsync: invitationUser } = useInvitationUser();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(
      createGroupFormSchema({
        requiredField: errorsT('requiredField'),
      }),
    ),
  });

  const invitedUsers = useWatch({ control, name: 'invitedUsers' });

  const onSubmit = async (data: GroupFormType) => {
    const createdGroup = groupCreate(data.name);

    toast.promise(createdGroup, {
      loading: groupT('groupCreateLoading'),
      success: groupT('groupCreateSuccess'),
      error: (data) => data?.message || groupT('groupCreateError'),
    });

    const { id } = await createdGroup;

    if (data?.invitedUsers?.length && id) {
      toast.promise(
        invitationUser({
          groupId: id,
          userIds: data.invitedUsers.map((user) => user.id),
        }),
        {
          loading: groupT('groupInviteMembersLoading'),
          success: groupT('groupInviteMembersSuccess'),
          error: (data) => data?.message || groupT('groupInviteMembersError'),
        },
      );
    }
    router.push(ROUTES.GROUP);
  };

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
          <UserSelector selectedUsers={value || []} onAcceptSelectUsers={onChange} />
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
