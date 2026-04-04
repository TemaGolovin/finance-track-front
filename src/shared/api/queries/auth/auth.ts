import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { auth } from '../query-keys';
import { instanceFetch } from '../../instances';
import {
  AuthSessionsResponse,
  ChangePasswordResponse,
  Me,
  RevokeSessionResponse,
  SuccessResponse,
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
      queryClient.clear();
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

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) =>
      instanceFetch<SuccessResponse>('/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ token }),
      }),
  });
};

export const useResendVerification = () => {
  return useMutation({
    mutationFn: (email: string) =>
      instanceFetch<SuccessResponse>('/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (email: string) =>
      instanceFetch<SuccessResponse>('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      }),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: { token: string; newPassword: string }) =>
      instanceFetch<SuccessResponse>('/auth/reset-password', {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
  });
};

export const useRequestEmailChange = () => {
  return useMutation({
    mutationFn: (newEmail: string) =>
      instanceFetch<SuccessResponse>('/user/request-email-change', {
        method: 'POST',
        body: JSON.stringify({ newEmail }),
      }),
  });
};

export const useConfirmEmailChange = () => {
  return useMutation({
    mutationFn: (token: string) =>
      instanceFetch<SuccessResponse>('/user/confirm-email-change', {
        method: 'POST',
        body: JSON.stringify({ token }),
      }),
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) =>
      instanceFetch<SuccessResponse>('/auth/delete-account', {
        method: 'POST',
        body: JSON.stringify({ password }),
      }),
    onSuccess: () => {
      queryClient.setQueryData(auth.me, null);
      queryClient.removeQueries({ queryKey: auth.sessions });
    },
  });
};
