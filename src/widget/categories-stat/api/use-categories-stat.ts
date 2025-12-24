import { instanceFetch } from '@/shared/api/instances';
import { useQuery } from '@tanstack/react-query';
import { CategoryStatRes } from '../model/types';

export const useCategoriesStat = (params?: {
  startDate?: string;
  endDate?: string;
  operationType?: 'INCOME' | 'EXPENSE';
}) => {
  const searchParams = new URLSearchParams();

  params?.startDate && searchParams.set('startDate', params?.startDate || '');
  params?.endDate && searchParams.set('endDate', params?.endDate || '');
  searchParams.set('operationType', params?.operationType || '');

  return useQuery({
    queryFn: () => instanceFetch<CategoryStatRes>(`category/stat?${searchParams.toString()}`),
    queryKey: ['category', 'stat', params],
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};
