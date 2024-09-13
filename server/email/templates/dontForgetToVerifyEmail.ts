import type { EmailTemplate } from "~/types/email";

export default (code: string): EmailTemplate => {
  const config = useRuntimeConfig();
  return {
    html: ``,
    text: `Tu viens de te connecter à ton compte mais n'a pas encore vérifié ton e-mail ! N'oublie pas de le faire en suivant ce lien : ${config.public.platformUrl}/portal/auth/email/verify/${code}`,
  };
};
