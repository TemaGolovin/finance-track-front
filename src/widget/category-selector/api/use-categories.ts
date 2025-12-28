import { instanceFetch } from '@/shared/api/instances';
import { useQuery } from '@tanstack/react-query';
import { Category } from '../model/types';
import { categories } from '@/shared/api/queries/query-keys';

export const useCategories = (params?: {
  type?: 'INCOME' | 'EXPENSE';
}) => {
  const searchParams = new URLSearchParams();

  searchParams.set('type', params?.type || '');

  return useQuery({
    queryKey: categories.categoriesParams(params),
    queryFn: () => instanceFetch<Category[]>(`/category?${searchParams.toString()}`),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};
