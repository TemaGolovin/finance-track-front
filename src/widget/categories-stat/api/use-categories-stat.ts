import { instanceFetch } from '@/shared/api/instances';
import { useQuery } from '@tanstack/react-query';
import { CategoryStatRes } from '../model/types';
import { categories } from '@/shared/api/queries/query-keys';

export const useCategoriesStat = (params?: {
  startDate?: string;
  endDate?: string;
  operationType?: 'INCOME' | 'EXPENSE';
  enabled?: boolean;
}) => {
  const { enabled = true, ...queryParams } = params ?? {};
  const searchParams = new URLSearchParams();

  queryParams.startDate && searchParams.set('startDate', queryParams.startDate);
  queryParams.endDate && searchParams.set('endDate', queryParams.endDate);
  searchParams.set('operationType', queryParams.operationType || '');

  return useQuery({
    queryFn: () => instanceFetch<CategoryStatRes>(`/category/stat?${searchParams.toString()}`),
    queryKey: categories.categoriesStatParams(queryParams),
    enabled,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};
