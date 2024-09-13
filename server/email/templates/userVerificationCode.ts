import type { EmailTemplate } from "~/types/email";

export default (code: string): EmailTemplate => ({
  html: ``,
  text: `Votre compte a été créé ! Veuillez le vérifier avec le code suivant : ${code}`,
});
