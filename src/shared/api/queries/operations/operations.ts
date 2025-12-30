import { useMutation, useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import { CreateOperationReq, GetOperationsRes, Operation } from './types';
import { categories, operations } from '../query-keys';

export const useOperationCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (crateData: CreateOperationReq) =>
      instanceFetch<Operation[]>('/operation', {
        method: 'POST',
        body: JSON.stringify(crateData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operations.all });
      queryClient.invalidateQueries({ queryKey: categories.all });
      queryClient.invalidateQueries({ queryKey: categories.categoriesStat });
    },
  });
};

export const useOperations = (params?: {
  startDate?: string;
  endDate?: string;
  operationType?: 'INCOME' | 'EXPENSE';
  categoryId?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params?.startDate) searchParams.set('startDate', params.startDate);
  if (params?.endDate) searchParams.set('endDate', params.endDate);
  if (params?.operationType) searchParams.set('operationType', params.operationType);
  if (params?.categoryId) searchParams.set('categoryId', params.categoryId);

  return useQuery({
    queryKey: operations.operationsParams(params),
    queryFn: () => instanceFetch<GetOperationsRes>(`/operation?${searchParams.toString()}`),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
  });
};

export const useOperationDetail = (
  id: string,
  options?: Omit<UseQueryOptions<Operation>, 'queryFn' | 'queryKey'>,
) => {
  return useQuery({
    queryKey: operations.detail(id),
    queryFn: () => instanceFetch<Operation>(`/operation/${id}`),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 2,
    ...options,
  });
};

export const useOperationDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      instanceFetch<Operation>(`/operation/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operations.all });
    },
  });
};

export const useOperationEdit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateOperationReq }) =>
      instanceFetch<Operation>(`/operation/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operations.all });
      queryClient.invalidateQueries({ queryKey: categories.all });
    },
  });
};
