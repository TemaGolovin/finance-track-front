import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import { groups } from '../query-keys';
import { ConnectGroupCategoriesReq, Group, GroupCategory } from './types';
import { Invitation } from '../user/types';

export const useGroups = () => {
  return useQuery({
    queryKey: groups.all,
    queryFn: () => instanceFetch<Group[]>('/user-group'),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useGroupCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      instanceFetch<Group>('/user-group', {
        method: 'POST',
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: groups.all });
    },
  });
};

export const useGroupUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      instanceFetch<Group>(`/user-group/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      }),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: groups.all });
      queryClient.invalidateQueries({ queryKey: groups.detail(id) });
    },
  });
};

export const useGroupDetail = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: groups.detail(id || ''),
    queryFn: () => instanceFetch<Group>(`/user-group/${id}`),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useGroupInvitations = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: groups.invitations(id || ''),
    queryFn: () =>
      instanceFetch<(Invitation & { recipient: { id: string; name: string } })[]>(
        `/user-group/${id}/invitations`,
      ),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useGroupRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, memberId }: { groupId: string; memberId: string }) =>
      instanceFetch(`/user-group/${groupId}/members/${memberId}`, { method: 'DELETE' }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groups.detail(groupId) });
    },
  });
};

export const useGroupCategories = ({ groupId }: { groupId: string }) => {
  return useQuery({
    queryKey: groups.categories(groupId),
    queryFn: () => instanceFetch<GroupCategory[]>(`/user-group/${groupId}/categories`),
    enabled: !!groupId,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useConnectGroupCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, relatedCategories }: ConnectGroupCategoriesReq) =>
      instanceFetch(`/user-group/${groupId}/category/connect`, {
        method: 'PATCH',
        body: JSON.stringify({ relatedCategories }),
      }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groups.categories(groupId) });
    },
  });
};
