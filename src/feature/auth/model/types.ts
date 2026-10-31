export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  id: string;
  email: string;
  name: string;
}

export interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  groupId?: string;
  deviceId: string;
}

export interface RegistrationResponse {
  id: string;
  email: string;
  name: string;
  createAt: string;
  updateAt: string;
  userRelationGroupId: string;
}
