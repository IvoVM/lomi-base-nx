export type LoginBody = {
  username: string;
  password: string;
  grant_type: 'password';
  scope: 'admin';
};

export type Token = {
  access_token: string;
  created_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};
