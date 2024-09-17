import { FetchError } from "ofetch";
import type { User, UserCreationBody, UserLoginBody } from "~/types/user";
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
export async function loginAccount(payload: UserLoginBody) {
  try {
    const user = await $fetch<User>("/api/portal/auth/login", {
      method: "POST",
      body: payload,
    });
    useState<User>("user").value = user;
    toast.success({
      title: "Mais quelle surprise 😱",
      description: `Heureuse de te revoir parmi nous ${user.userInfo?.firstName} !`,
    });
    await navigateTo("/"); // TODO: navigate to user portal
  }
  catch (e) {
    if (!(e instanceof FetchError)) return toast.error({
      title: "💢 Oups...",
      description: "Quelque chose s'est mal passé pendant ta tentative de connexion...",
    });
    switch (e.statusCode) {
      case 403:
        return toast.error({
          title: "💢 Oups...",
          description: "Tu as du te tromper dans ton mot de passe... Ré-essaye !",
        });
      case 404:
        return toast.error({
          title: "💢 Oups...",
          description: "Ce nom d'utilisateur n'a aucune correspondance dans ma base de données !",
        });
      default:
        return toast.error({
          title: "💢 Oups...",
          description: "Quelque chose s'est mal passé pendant ta tentative de connexion...",
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
export async function forgetPasswordRequest(email: string) {
  try {
    await $fetch("/api/portal/auth/password/reset/request", {
      method: "POST",
      body: {
        email,
      },
    });
    toast.success({
      title: "🔔 Driing !",
      description: "Ta demande de réinitialisation vient d'atterrir dans ta boîte de réception 📥",
    });
    await navigateTo("/portal/auth/login");
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case 404:
        return toast.error({
          title: "💢 Oups...",
          description: "Cette adresse e-mail ne correspond à aucun utilisateur de ma base de données...",
        });
    }
  }
}
export async function sendNewPassword(code: string, newPassword: string) {
  try {
    useState<User>("user").value = await $fetch<User>(`/api/portal/auth/password/reset/${code}`, {
      method: "POST",
      body: {
        newPassword,
      },
    });
    toast.success({
      title: "Super 🎉",
      description: "J'ai mis à jour ton mot de passe et t'ai connecté ! Tu peux à nouveau profiter de mon interface 😊",
    });
    await navigateTo("/");
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case 404:
        return toast.error({
          title: "💢 Oups...",
          description: "Je n'ai pas pu trouver la requête ou l'utilisateur qui était lié...",
        });
      case 500:
        return toast.error({
          title: "💢 Oups...",
          description: "Une erreur s'est produite pendant que j'essaye de mettre à jour ton mot de passe...",
        });
    }
  }
}
export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    await $fetch("/api/portal/auth/password/reset", {
      method: "PATCH",
      headers: useRequestHeaders(["cookie"]),
      body: {
        currentPassword,
        newPassword,
      },
    });
    useState("user").value = null;
    toast.success({
      title: "Bravo 👏",
      description: "J'ai mis ton mot de passe à jour ! J'en ai profité pour déconnecter tous les appareils connectés à ton compte, question de sécurité 🛡️",
    });
    await navigateTo("/portal/auth/login");
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case 401:
        return toast.error({
          title: "💢 Oups...",
          description: "Le mot de passe actuel n'est pas correcte ! Fais attention quand tu entres ton mot de passe 😊",
        });
      case 404:
        return toast.error({
          title: "💢 Oups...",
          description: "Je n'ai pas trouvé ton compte... Il a peut-être été supprimé par un administrateur 😱",
        });
      case 409:
        return toast.error({
          title: "💢 Oups...",
          description: "Tu ne peux pas entrer le même mot de passe que l'actuel, fais appel à tes méninges 🫣",
        });
      default:
        return toast.error({
          title: "💢 Oups...",
          description: "J'ai des difficultés à mettre à jour ton mot de passe...",
        });
    }
  }
}
