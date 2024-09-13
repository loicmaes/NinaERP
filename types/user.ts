export class UserNotFoundError extends Error {}
export class InvalidVerificationCodeError extends Error {}

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
  password: string;
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
export interface UserEmailVerificationBody {
  userUid: string;
  code: string;
}
export interface UserLoginBody {
  login: string;
  password: string;
  keep?: boolean;
}
export interface UserInfoUpdateBody {
  firstName?: string;
  lastName?: string;
  contactEmail?: string;
  contactPhone?: string;
}
// PASSWORD RQ
export interface PasswordResetRq {
  uid: string;
  userUid: string;
  createdAt: Date;
  expiresAt: Date;
}
export interface PasswordResetRqCreationBody {
  userUid: string;
}
export interface PasswordResetRqAnswerBody {
  uid: string;
  newPassword: string;
}
