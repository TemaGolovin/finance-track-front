import { instanceFetch } from '@/shared/api/instances';
import { useMutation } from '@tanstack/react-query';
import { LoginRequest, LoginResponse } from '../model/types';

export const useLogin = () =>
  useMutation({
    mutationFn: (body: LoginRequest) =>
      instanceFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  });
