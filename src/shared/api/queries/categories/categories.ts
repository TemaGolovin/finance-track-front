import { instanceFetch } from '@/shared/api/instances';
import { invalidateAndRefetchQueries } from '@/shared/api/lib/invalidate-and-refetch-queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categories } from '@/shared/api/queries/query-keys';
import { Category, CreateCategoryReq } from './types';

export const useCategories = (params?: {
  type?: 'INCOME' | 'EXPENSE';
}) => {
  const searchParams = new URLSearchParams();

  if (params?.type) {
    searchParams.set('type', params.type);
  }

  const queryString = searchParams.toString();

  return useQuery({
    queryKey: categories.categoriesParams(params),
    queryFn: () => instanceFetch<Category[]>(`/category${queryString ? `?${queryString}` : ''}`),
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
      return invalidateAndRefetchQueries(queryClient, categories.all);
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
    onSuccess: ({ id }) =>
      Promise.all([
        invalidateAndRefetchQueries(queryClient, categories.all),
        invalidateAndRefetchQueries(queryClient, categories.detail(id)),
      ]).then(() => undefined),
  });
};

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      instanceFetch(`/category/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      return invalidateAndRefetchQueries(queryClient, categories.all);
    },
  });
};
