import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../query-keys';
import { instanceFetch } from '../../instances';
import { Me } from './types';

export const useAboutMe = () => {
  return useQuery({
    queryKey: auth.me,
    queryFn: () => instanceFetch<Me>('/auth/me'),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => instanceFetch<{ success: boolean }>('/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      queryClient.setQueryData(auth.me, null);
    },
  });
};
