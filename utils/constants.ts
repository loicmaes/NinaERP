export const authTokenCookie = "auth-token";
export const userUidCookie = "user-uid";

export const platformUrl = () => useRuntimeConfig().public.platformUrl;
export const userEmailVerificationLink = (code: string) => `${platformUrl()}/portal/auth/email/verify/${code}`;
export const userPasswordResetRequestCompletion = (code: string) => `${platformUrl()}/portal/auth/password/reset/${code}`;
