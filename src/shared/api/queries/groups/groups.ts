import { useQuery } from '@tanstack/react-query';
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
