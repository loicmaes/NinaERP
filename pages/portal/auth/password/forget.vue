<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { forgetPasswordRequest } from "~/composables/auth";

await useAuth(false);

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Demande de nouveau mot de passe",
});

const schema = toTypedSchema(z.object({
  email: z.string().min(1).email(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async ({ email }) => {
  await forgetPasswordRequest(email);
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-6">
    <CardTitle>Demande de nouveau mot de passe</CardTitle>

    <Card class="w-full">
      <CardContent class="flex flex-col gap-6 p-6">
        <CardDescription>
          Tu as perdu ton mot de passe ? Pas de soucis, je suis là pour t'aider ! Entre l'adresse e-mail associée à ton compte afin de recevoir un lien de réinitialisation.
        </CardDescription>

        <form
          class="flex flex-col gap-4"
          @submit="onSubmit"
        >
          <FormField
            v-slot="{ componentField }"
            name="email"
          >
            <FormItem>
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl v-bind="componentField">
                <Input placeholder="..." />
              </FormControl>
            </FormItem>
          </FormField>
          <div class="flex justify-between items-center">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              as-child
            >
              <NuxtLink to="/portal/auth/login">
                Annuler
              </NuxtLink>
            </Button>
            <Button
              type="submit"
              size="sm"
            >
              Continuer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
