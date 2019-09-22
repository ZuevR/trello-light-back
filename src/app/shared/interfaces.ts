export interface User {
  id?: number;
  username?: string;
  email: string;
  password: string;
}

export interface Board {
  id?: number;
  title: string;
  ownerId?: number;
}

export interface AuthResponse {
  auth_key: {
    exp: number,
    id: string
  };
  email: string;
  id: number;
  password: string;
  status: boolean;
  username: string;
}
