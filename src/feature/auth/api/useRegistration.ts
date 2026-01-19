import { instanceFetch } from '@/shared/api/instances';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RegistrationRequest, RegistrationResponse } from '../model/types';
import { auth } from '@/shared/api/queries/query-keys';

export const useRegistration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: RegistrationRequest) =>
      instanceFetch<RegistrationResponse>('/auth/registration', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: auth.me });
    },
  });
};
