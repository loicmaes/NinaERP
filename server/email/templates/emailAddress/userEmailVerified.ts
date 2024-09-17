import type { EmailTemplate } from "~/types/email";
import { platformUrl } from "~/utils/constants";

export default (firstName: string): EmailTemplate => ({
  html: ``,
  text: `Bravo ! Bienvenue ${firstName} parmi mes utilisateurs. Découvre toutes les fonctionnalités qui pourraient t'être utile sur mon site : ${platformUrl()}/`,
});
