export interface Me {
  success: boolean;
  data: {
    email: string;
    name: string;
    id: string;
    emailVerified: boolean;
    weekStartsOn: 0 | 1;
  };
}

export interface SuccessResponse {
  success: boolean;
}

export interface AuthSession {
  deviceId: string;
  userAgent: string | null;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
}

export interface AuthSessionsResponse {
  success: boolean;
  data: AuthSession[];
}

export interface UpdateProfileResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
  };
}

export interface UpdatePreferencesResponse {
  success: boolean;
  data: {
    weekStartsOn: 0 | 1;
  };
}

export interface ChangePasswordResponse {
  success: boolean;
}

export interface RevokeSessionResponse {
  success: boolean;
}
