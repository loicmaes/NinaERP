import { FetchError } from "ofetch";
import type { User, UserCreationBody } from "~/types/user";
import toast from "~/composables/toast";
import { authTokenCookie } from "~/utils/constants";

export const useAuthCookie = () => useCookie(authTokenCookie);
export async function useUser() {
  const authToken = useAuthCookie();
  if (!authToken) return;

  // TODO: recover user by session
}
export async function useAuth(connected: boolean) {
  const user = useState<User>("user");

  if (connected && !user.value) return await navigateTo("/portal/auth/register");
  if (!connected && user.value) return await navigateTo("/");
}
export async function registerAccount(payload: UserCreationBody) {
  try {
    const user = await $fetch<User>("/api/portal/auth/registerAccount", {
      method: "POST",
      body: payload,
    });
    useState<User>("user").value = user;
    toast.success({
      title: `👋 Bienvenue ${user.userInfo?.firstName},`,
      description: "Je t'ai envoyé un e-mail contenant ton lien de vérification, fait-le au plus vite pour débloquer un max de fonctionnalités 🚀",
    });
    await navigateTo("/"); // TODO: go to user portal
  }
  catch (e) {
    if (!(e instanceof FetchError)) throw e;
    switch (e.statusCode) {
      case 409:
        return toast.error({
          title: "💢 Oups...",
          description: "L'e-mail ou l'identifiant est déjà utilisé !",
        });
      default:
        toast.error({
          title: "💢 Oups...",
          description: "Je n'ai pas pu créer ton compte 😳 Ré-essaye plus tard...",
        });
    }
  }
}
