import type { EmailTemplate } from "~/types/email";
import { userEmailVerificationLink } from "~/utils/constants";

export default (code: string): EmailTemplate => ({
  html: ``,
  text: `Voici la nouvelle adresse e-mail que j'utiliserais pour te contacter. Mais avant, il faut que tu vérifie ton compte : ${userEmailVerificationLink(code)}`,
});
