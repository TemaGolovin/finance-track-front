import { instanceFetch } from '@/shared/api/instances';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categories } from '@/shared/api/queries/query-keys';
import { Category, CreateCategoryReq } from './types';

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

export const useCategoryDetail = (id: string) => {
  return useQuery({
    queryKey: categories.detail(id),
    queryFn: () => instanceFetch<Category>(`/category/${id}`),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useCategoryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryReq) =>
      instanceFetch<Category>('/category', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categories.all });
    },
  });
};

export const useCategoryEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateCategoryReq }) =>
      instanceFetch<Category>(`/category/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: categories.all });
      queryClient.invalidateQueries({ queryKey: categories.detail(id) });
    },
  });
};
