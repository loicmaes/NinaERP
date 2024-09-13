import { FetchError } from "ofetch";
import type { User, UserCreationBody } from "~/types/user";
import toast from "~/composables/toast";
import { authTokenCookie } from "~/utils/constants";

export const useAuthCookie = () => useCookie(authTokenCookie);

export async function useUser() {
  const authToken = useAuthCookie();
  const user = useState<User>("user");

  if (authToken && !user.value) {
    const { data } = await useFetch<User>("/api/portal/auth/whoami", {
      method: "GET",
      headers: useRequestHeaders(["cookie"]),
    });
    if (!data.value) return null;
    user.value = data.value;
  }

  return user.value;
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

export async function verifyUserEmail(code: string) {
  try {
    useState<User>("user").value = await $fetch<User>(`/api/portal/auth/verifyEmail/${code}`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
    });
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      default:
        return toast.error({
          title: "💢 Oups...",
          description: "Une erreur est survenue !",
        });
    }
  }
}
