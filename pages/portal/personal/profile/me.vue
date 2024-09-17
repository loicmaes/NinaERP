<script setup lang="ts">
import type { User } from "~/types/user";
import ChangePasswordDialog from "~/components/composed/userProfile/ChangePasswordDialog.vue";
import ChangeEmailDialog from "~/components/composed/userProfile/ChangeEmailDialog.vue";
import DeleteAccountAlertDialog from "~/components/composed/userProfile/DeleteAccountAlertDialog.vue";

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
    <DeleteAccountAlertDialog>
      <Button variant="destructive">
        Supprimer mon compte
      </Button>
    </DeleteAccountAlertDialog>
  </div>
</template>
