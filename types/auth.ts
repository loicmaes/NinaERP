export const sessionDuration = {
  hour: 1000 * 60 * 60,
  week: 1000 * 60 * 60 * 24 * 7,
};

export class AuthSessionNotFoundError extends Error {}

export interface AuthSession {
  authToken: string;
  userUid: string;
  createdAt: Date;
  expiresAt: Date;
}
export interface AuthSessionCreationBody {
  userUid: string;
  keep?: boolean;
}
export interface AuthSessionRecoverBody {
  authToken: string;
  userUid: string;
}
