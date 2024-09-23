<script setup lang="ts">
import { Home } from "@iconoir/vue";
import AppNavigationLink from "~/components/layouts/app/appNavigation/AppNavigationLink.vue";
</script>

<template>
  <nav class="flex-1 flex flex-col gap-2">
    <AppNavigationLink
      to=""
      exact
    >
      <Home />
      <span>Accueil</span>
    </AppNavigationLink>
  </nav>
</template>

<style scoped>

</style>
