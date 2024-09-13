<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

await useAuth(false);

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Connecte-toi !",
});

const schema = toTypedSchema(z.object({
  login: z.string().min(1).regex(USERNAME_REGEXP),
  password: z.string().min(1).regex(PASSWORD_REGEXP),
  keep: z.boolean().default(false).optional(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    keep: false,
  },
});
const onSubmit = handleSubmit(async (values) => {
  await loginAccount(values);
});
</script>

<template>
  <div class="w-full flex flex-col items-center gap-6">
    <CardTitle>Connexion</CardTitle>

    <Card class="w-full">
      <CardContent class="p-6">
        <form
          class="flex flex-col gap-4"
          @submit="onSubmit"
        >
          <FormField
            v-slot="{ componentField }"
            name="login"
          >
            <FormItem>
              <FormLabel>Identifiant</FormLabel>
              <FormControl v-bind="componentField">
                <Input placeholder="..." />
              </FormControl>
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl v-bind="componentField">
                <Input
                  type="password"
                  placeholder="..."
                />
              </FormControl>
            </FormItem>
          </FormField>
          <div class="flex items-center justify-between">
            <FormField
              v-slot="{ value, handleChange }"
              name="keep"
            >
              <FormItem class="items-center flex gap-x-2">
                <FormControl>
                  <Checkbox
                    :checked="value"
                    @update:checked="handleChange"
                  />
                </FormControl>
                <FormLabel class="!mt-0 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Je reste connecté
                </FormLabel>
              </FormItem>
            </FormField>
            <Button
              size="sm"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          variant="link"
          size="sm"
          class="-mx-3 text-foreground"
          as-child
        >
          <NuxtLink
            to="/portal/auth/register"
          >
            Je n'ai pas encore de compte !
          </NuxtLink>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped>

</style>
