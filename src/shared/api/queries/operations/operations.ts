import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instanceFetch } from '../../instances';
import { CreateOperationReq, CreateOperationRes } from './types';
import { operations } from '../query-keys';

export const useOperationCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (crateData: CreateOperationReq) =>
      instanceFetch<CreateOperationRes>('/operation', {
        method: 'POST',
        body: JSON.stringify(crateData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: operations.all });
    },
  });
};
