<script setup lang="ts">
import type { User } from "~/types/user";

useHead({
  title: "Bienvenue chez Nina 👋",
});

const user = useState<User>("user");
</script>

<template>
  <h1 v-if="user">
    accueil -> {{ user?.login }}
  </h1>
  <h1 v-else>
    accueil
  </h1>
</template>

<style scoped>

</style>
