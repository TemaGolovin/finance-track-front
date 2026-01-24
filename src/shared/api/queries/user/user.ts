import { useMutation, useQuery } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import { Invitation, InvitationUserReq, User } from './types';
import { users } from '../query-keys';

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
