import type { EmailTemplate } from "~/types/email";

export default (email: string): EmailTemplate => ({
  html: ``,
  text: `Félicitation 🎉 J'ai enregistré ta nouvelle adresse e-mail ! Je t'enverrais mes petits mots doux sur "${email}" dorénavant.`,
});
