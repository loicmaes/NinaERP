import type { EmailTemplate } from "~/types/email";
import { userEmailVerificationLink } from "~/utils/constants";

export default (code: string): EmailTemplate => ({
  html: ``,
  text: `Votre compte a été créé ! Veuillez le vérifier en cliquant sur le lien suivant : ${userEmailVerificationLink(code)}`,
});
