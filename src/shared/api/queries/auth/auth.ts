import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../query-keys';
import { instanceFetch } from '../../instances';
import {
  AuthSessionsResponse,
  ChangePasswordResponse,
  Me,
  RevokeSessionResponse,
  UpdateProfileResponse,
} from './types';

export const useAboutMe = () => {
  return useQuery({
    queryKey: auth.me,
    queryFn: () => instanceFetch<Me>('/auth/me'),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => instanceFetch<{ success: boolean }>('/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      queryClient.setQueryData(auth.me, null);
      queryClient.removeQueries({ queryKey: auth.sessions });
    },
  });
};

export const useAuthSessions = (isEnabled: boolean) => {
  return useQuery({
    queryKey: auth.sessions,
    queryFn: () => instanceFetch<AuthSessionsResponse>('/auth/sessions'),
    enabled: isEnabled,
    retry: false,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) =>
      instanceFetch<UpdateProfileResponse>('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify({ name }),
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: auth.me });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: { currentPassword: string; newPassword: string }) =>
      instanceFetch<ChangePasswordResponse>('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) =>
      instanceFetch<RevokeSessionResponse>(`/auth/sessions/${deviceId}`, { method: 'DELETE' }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: auth.sessions });
    },
  });
};
