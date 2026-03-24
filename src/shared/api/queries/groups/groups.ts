import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import { groups } from '../query-keys';
import {
  ConnectGroupCategoriesReq,
  CreateGroupCategoryReq,
  Group,
  GroupCategory,
  GroupStatRes,
  UpdateGroupCategoryReq,
} from './types';
import { Invitation } from '../user/types';
import { GetOperationsRes } from '../operations/types';

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

export const useGroupStat = (params: {
  groupId: string;
  operationType?: 'INCOME' | 'EXPENSE';
  startDate?: string;
  endDate?: string;
  enabled?: boolean;
}) => {
  const { groupId, operationType, startDate, endDate, enabled = true } = params;

  const searchParams = new URLSearchParams();
  if (operationType) searchParams.set('operationType', operationType);
  if (startDate) searchParams.set('startDate', startDate);
  if (endDate) searchParams.set('endDate', endDate);

  return useQuery({
    queryKey: groups.stat(groupId, { operationType, startDate, endDate }),
    queryFn: () =>
      instanceFetch<GroupStatRes>(`/user-group/${groupId}/stat?${searchParams.toString()}`),
    enabled: enabled && !!groupId,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useGroupOperations = (params: {
  groupId: string;
  operationType?: 'INCOME' | 'EXPENSE';
  startDate?: string;
  endDate?: string;
  categoryId?: string;
  enabled?: boolean;
}) => {
  const { groupId, operationType, startDate, endDate, categoryId, enabled = true } = params;

  const searchParams = new URLSearchParams();
  if (operationType) searchParams.set('operationType', operationType);
  if (startDate) searchParams.set('startDate', startDate);
  if (endDate) searchParams.set('endDate', endDate);
  if (categoryId) searchParams.set('categoryId', categoryId);

  return useQuery({
    queryKey: groups.operations(groupId, { operationType, startDate, endDate, categoryId }),
    queryFn: () =>
      instanceFetch<GetOperationsRes>(
        `/user-group/${groupId}/operations?${searchParams.toString()}`,
      ),
    enabled: enabled && !!groupId,
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

export const useGroupCategoryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, data }: { groupId: string; data: CreateGroupCategoryReq }) =>
      instanceFetch<GroupCategory>(`/user-group/${groupId}/categories`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groups.categories(groupId) });
    },
  });
};

export const useGroupCategoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      categoryId,
      data,
    }: {
      groupId: string;
      categoryId: string;
      data: UpdateGroupCategoryReq;
    }) =>
      instanceFetch<GroupCategory>(`/user-group/${groupId}/categories/${categoryId}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groups.categories(groupId) });
    },
  });
};

export const useGroupCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, categoryId }: { groupId: string; categoryId: string }) =>
      instanceFetch(`/user-group/${groupId}/categories/${categoryId}`, {
        method: 'DELETE',
      }),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: groups.categories(groupId) });
    },
  });
};
