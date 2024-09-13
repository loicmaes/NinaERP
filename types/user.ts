export class UserNotFoundError extends Error {}

export interface User {
  uid: string;
  login: string;
  email: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  userInfo?: UserInfo;
}
export interface RichUser extends User {
  verificationCode: string;
}
export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  contactEmail: string;
  contactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationBody {
  login: string;
  email: string;
  password: string;
  userInfo: UserInfoCreationBody;
}
export interface UserInfoCreationBody {
  firstName: string;
  lastName: string;
  contactEmail?: string;
  contactPhone?: string;
}
