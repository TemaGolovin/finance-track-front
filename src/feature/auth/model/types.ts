export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  token: string;
  id: string;
  email: string;
  name: string;
}
