import { useInvitationUser } from '@/shared/api/queries/user';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { GroupFormType } from './schema';
import { Group, useGroupCreate, useGroupUpdate } from '@/shared/api/queries/groups';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/model/routes';

export const useGroupFormActions = (mode: 'create' | 'edit', group?: Group) => {
  const router = useRouter();

  const { mutateAsync: groupCreate } = useGroupCreate();
  const { mutateAsync: groupUpdate } = useGroupUpdate();
  const { mutateAsync: invitationUser } = useInvitationUser();

  const groupT = useTranslations('group');

  const handleInvitations = async (groupId: string, data: GroupFormType) => {
    if (!data?.invitedUsers?.length || !groupId) {
      return;
    }

    await toast.promise(
      invitationUser({
        groupId,
        userIds: data.invitedUsers.map((user) => user.id),
      }),
      {
        loading: groupT('groupInviteMembersLoading'),
        success: groupT('groupInviteMembersSuccess'),
        error: (data) => data?.message || groupT('groupInviteMembersError'),
      },
    );
  };

  const onSubmit = async (data: GroupFormType) => {
    if (mode === 'edit' && group) {
      const updatedGroupPromise = groupUpdate({ id: group.id, name: data.name });

      toast.promise(updatedGroupPromise, {
        loading: groupT('groupCreateLoading'),
        success: groupT('groupCreateSuccess'),
        error: (data) => data?.message || groupT('groupCreateError'),
      });

      const updatedGroup = await updatedGroupPromise;

      await handleInvitations(updatedGroup.id, data);
    } else {
      const createdGroupPromise = groupCreate(data.name);

      toast.promise(createdGroupPromise, {
        loading: groupT('groupCreateLoading'),
        success: groupT('groupCreateSuccess'),
        error: (data) => data?.message || groupT('groupCreateError'),
      });

      const { id } = await createdGroupPromise;

      if (id) {
        await handleInvitations(id, data);
      }
    }

    router.push(ROUTES.GROUP);
  };

  return {
    onSubmit,
  };
};
