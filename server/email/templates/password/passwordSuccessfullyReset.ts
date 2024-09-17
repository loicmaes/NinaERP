import type { EmailTemplate } from "~/types/email";

export default (): EmailTemplate => ({
  html: ``,
  text: "J'ai mis à jour ton mot de passe ! L'ancien est désormais considéré comme oublié, n'oublie pas de noter ton nouveau mot de passe pour ne pas l'oublier et pouvoir continuer à te connecter à mon interface !",
});
