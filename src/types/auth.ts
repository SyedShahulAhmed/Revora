export interface SignupBody {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: string;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
}
