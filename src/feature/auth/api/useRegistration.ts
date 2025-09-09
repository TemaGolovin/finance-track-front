import { instanceFetch } from '@/shared/api/instances';
import { useMutation } from '@tanstack/react-query';
import { RegistrationRequest, RegistrationResponse } from '../model/types';

export const useRegistration = () =>
  useMutation({
    mutationFn: (body: RegistrationRequest) =>
      instanceFetch<RegistrationResponse>('/auth/registration', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  });
