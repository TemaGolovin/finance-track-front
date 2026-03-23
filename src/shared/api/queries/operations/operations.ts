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
  enabled?: boolean;
}) => {
  const { startDate, endDate, operationType, categoryId, enabled = true } = params || {};
  
  const searchParams = new URLSearchParams();

  if (startDate) searchParams.set('startDate', startDate);
  if (endDate) searchParams.set('endDate', endDate);
  if (operationType) searchParams.set('operationType', operationType);
  if (categoryId) searchParams.set('categoryId', categoryId);

  return useQuery({
    queryKey: operations.operationsParams(params),
    queryFn: () => instanceFetch<GetOperationsRes>(`/operation?${searchParams.toString()}`),
    enabled,
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
