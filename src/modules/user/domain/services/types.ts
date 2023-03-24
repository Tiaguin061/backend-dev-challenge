export interface RegisterUserServiceData {
  email: string;
  password: string;
  name?: string;
  password_confirmation: string;
}

export interface AuthenticateUserServiceData {
  email: string;
  password: string;
}
