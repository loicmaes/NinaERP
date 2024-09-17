<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Réinitialisation de ton mot de passe",
});

const { params } = useRoute();
const code = params.code as string;

const schema = toTypedSchema(z.object({
  newPassword: z.string().min(1).regex(PASSWORD_REGEXP),
  confirm: z.string().min(1).regex(PASSWORD_REGEXP),
}).refine(
  values => values.newPassword === values.confirm,
  {
    message: "Les mots de passe ne correspondent pas !",
    path: ["confirm"],
  }),
);
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  await sendNewPassword(code, values.newPassword);
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-6">
    <CardTitle>Réinitialisation du mot de passe</CardTitle>

    <Card class="w-full">
      <CardContent class="flex flex-col gap-6 p-6">
        <CardDescription>
          Attention, cette action est définitive ! Note ton nouveau mot de passe sur un morceau de papier et stock le à l'abri des curieux 🫣
        </CardDescription>

        <form
          class="flex flex-col gap-4"
          @submit="onSubmit"
        >
          <FormField
            v-slot="{ componentField }"
            name="newPassword"
          >
            <FormItem>
              <FormLabel>Nouveau mot de passe</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  type="password"
                  placeholder="..."
                />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="confirm"
          >
            <FormItem>
              <FormLabel>Confirmation</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  type="password"
                  placeholder="..."
                />
              </FormControl>
              <FormMessage />
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
