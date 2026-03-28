export interface Me {
  success: boolean;
  data: {
    email: string;
    name: string;
    id: string;
  };
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
    token: string;
  };
}

export interface ChangePasswordResponse {
  success: boolean;
}

export interface RevokeSessionResponse {
  success: boolean;
}
