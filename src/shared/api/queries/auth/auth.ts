import { useQuery } from '@tanstack/react-query';
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
