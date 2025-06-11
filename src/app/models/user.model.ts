export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}
