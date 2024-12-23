export type UserRole = 'Admin' | 'User';

export interface UserData {
  userId: string | null;
  userRole: UserRole;
  phoneNumber: string;
  password: string;
  stage: string;
  isActive: boolean;
}


