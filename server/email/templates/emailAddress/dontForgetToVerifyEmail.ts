import type { EmailTemplate } from "~/types/email";
import { userEmailVerificationLink } from "~/utils/constants";

export default (code: string): EmailTemplate => ({
  html: ``,
  text: `Tu viens de te connecter à ton compte mais n'a pas encore vérifié ton e-mail ! N'oublie pas de le faire en suivant ce lien : ${userEmailVerificationLink(code)}`,
});
