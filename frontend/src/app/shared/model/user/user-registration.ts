export interface UserRegistration {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  surname: string;
  college: string;
  department?: string;
  direction?: string;
  role: boolean;
}
