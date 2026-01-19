import { instanceFetch } from '@/shared/api/instances';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '../model/types';
import { auth } from '@/shared/api/queries/query-keys';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: LoginRequest) =>
      instanceFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auth.me });
    },
  });
};
