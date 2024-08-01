export interface User {
  uuid: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}