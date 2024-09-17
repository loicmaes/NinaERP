<script setup lang="ts">
import type { User } from "~/types/user";
import ChangePasswordDialog from "~/components/composed/userProfile/ChangePasswordDialog.vue";
import ChangeEmailDialog from "~/components/composed/userProfile/ChangeEmailDialog.vue";
import DeleteAccountAlertDialog from "~/components/composed/userProfile/DeleteAccountAlertDialog.vue";
import { logout } from "~/composables/auth";

await useAuth(true);

definePageMeta({
  layout: "default",
});
useHead({
  title: "Mon profil · Nina ERP",
});

const user = useState<User>("user");
</script>

<template>
  <div v-if="user">
    <h1>Bonjour {{ user.userInfo?.firstName }} {{ user.verifiedAt ? "vérifié" : "non vérifié" }}</h1>

    <ChangePasswordDialog>
      <Button variant="secondary">
        Changer mon mot de passe
      </Button>
    </ChangePasswordDialog>
    <ChangeEmailDialog>
      <Button variant="secondary">
        Changer mon adresse e-mail
      </Button>
    </ChangeEmailDialog>
    <Button
      variant="outlineDestructive"
      @click="logout"
    >
      Me déconnecter
    </Button>
    <DeleteAccountAlertDialog>
      <Button variant="destructive">
        Supprimer mon compte
      </Button>
    </DeleteAccountAlertDialog>
  </div>
</template>
