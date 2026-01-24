import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import { groups } from '../query-keys';
import { Group } from './types';

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
