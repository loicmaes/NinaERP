<script setup lang="ts">
import type { User } from "~/types/user";

await useAuth(true);

definePageMeta({
  layout: "member",
});
useHead({
  title: "Mon profil · Nina ERP",
});

const user = useState<User>("user");
</script>

<template>
  <main v-if="user">
    Profile
  </main>
</template>
