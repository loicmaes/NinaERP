import type { EmailTemplate } from "~/types/email";

export default (code: string): EmailTemplate => {
  const config = useRuntimeConfig();
  return {
    html: ``,
    text: `Votre compte a été créé ! Veuillez le vérifier en cliquant sur le lien suivant : ${config.public.platformUrl}/portal/auth/email/verify/${code}`,
  };
};
