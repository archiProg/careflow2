interface LoginResponse {
  token: boolean;
  user: UserInfo;
  message: string;
}

interface UserInfo {
  id: string;
  role: string;
}

export { LoginResponse, UserInfo };

