import type { EmailTemplate } from "~/types/email";

export default (firstName: string): EmailTemplate => {
  const config = useRuntimeConfig();

  return {
    html: ``,
    text: `Bravo ! Bienvenue ${firstName} parmi mes utilisateurs. Découvre toutes les fonctionnalités qui pourraient t'être utile sur mon site : ${config.public.platformUrl}/`,
  };
};
