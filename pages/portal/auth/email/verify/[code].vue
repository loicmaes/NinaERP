<script setup lang="ts">
import { CheckCircle, XmarkCircle, SystemRestart } from "@iconoir/vue";

definePageMeta({
  layout: "auth",
});
useHead({
  title: "⏳ Vérification de ton e-mail...",
});

const { params } = useRoute();
const code = params.code as string;

const loading = ref<boolean>(true);
const error = ref<boolean>(false);
onMounted(() => {
  verifyUserEmail(code)
    .then(() => useHead({
      title: "🎉 Ton e-mail a été confirmé !",
    }))
    .catch(() => {
      error.value = true;
      useHead({
        title: "💢 Une erreur est survenue !",
      });
    })
    .finally(() => loading.value = false);
});
</script>

<template>
  <div
    v-if="loading"
    class="w-full flex justify-center"
  >
    <SystemRestart class="animate-spin" />
  </div>
  <Card v-else>
    <CardHeader class="items-center">
      <XmarkCircle
        v-if="error"
        class="h-16 w-16 text-destructive"
      />
      <CheckCircle
        v-else
        class="h-16 w-16 text-primary"
      />
    </CardHeader>
    <CardContent class="flex flex-col items-center gap-3">
      <template v-if="error">
        <CardTitle>Une erreur est survenue 💢</CardTitle>
        <CardDescription>Oh non... Je n'ai pas pu vérifier ton e-mail 😢</CardDescription>
        <Button
          class="mt-6"
          as-child
        >
          <NuxtLink to="/">
            Retour à l'accueil
          </NuxtLink>
        </Button>
      </template>
      <template v-else>
        <CardTitle>Ton e-mail a été confirmé 🎉</CardTitle>
        <CardDescription>Merci de me faire confiance ! Profite désormais pleinement de mon interface 💪</CardDescription>
        <Button
          class="mt-6"
          as-child
        >
          <NuxtLink to="/portal/personal/profile/me">
            En avant !
          </NuxtLink>
        </Button>
      </template>
    </CardContent>
  </Card>
</template>

<style scoped>

</style>
