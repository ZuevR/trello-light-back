export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  auth_key: string;
  email: string;
  id: number;
  password: string;
  status: boolean;
  username: string;
}
