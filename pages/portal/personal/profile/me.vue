<script setup lang="ts">
import type { User } from "~/types/user";
import ChangePasswordDialog from "~/components/composed/userProfile/ChangePasswordDialog.vue";

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
    <h1>Bonjour {{ user.userInfo?.firstName }}</h1>

    <ChangePasswordDialog>
      <Button>
        Changer mon mot de passe
      </Button>
    </ChangePasswordDialog>
  </div>
</template>
