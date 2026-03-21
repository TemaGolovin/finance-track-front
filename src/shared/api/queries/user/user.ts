import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import {
  Invitation,
  InvitationUserReq,
  InvitationsResponse,
  UpdateInvitationReq,
  User,
} from './types';
import { invitations, users } from '../query-keys';

export const useSearchUsers = ({ name }: { name: string }) => {
  return useQuery({
    queryKey: users.search(name),
    queryFn: () => instanceFetch<User[]>(`/user/find/by-name?name=${name}`),
    enabled: !!name,
    placeholderData: (prev) => prev,
  });
};

export const useInvitationUser = () => {
  return useMutation({
    mutationFn: (data: InvitationUserReq) =>
      instanceFetch<Invitation>('/user/invitation', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });
};

export const useInvitations = () => {
  return useQuery({
    queryKey: invitations.all,
    queryFn: () => instanceFetch<InvitationsResponse>('/user/invitation'),
  });
};

export const useUpdateInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateInvitationReq) =>
      instanceFetch<Invitation>(`/user/invitation/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitations.all });
    },
  });
};
