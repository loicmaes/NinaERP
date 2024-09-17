import { userPasswordResetRequestCompletion } from "~/utils/constants";

export default (code: string) => ({
  html: ``,
  text: `Tu as demandé à réinitialiser ton mot de passe ! Voici le lien vers le portail de réinitialisation : ${userPasswordResetRequestCompletion(code)}`,
});
