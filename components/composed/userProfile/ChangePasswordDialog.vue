<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { changePassword } from "~/composables/auth";

const open = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  current: z.string().min(1).regex(PASSWORD_REGEXP),
  newPassword: z.string().min(1).regex(PASSWORD_REGEXP),
  confirm: z.string().min(1).regex(PASSWORD_REGEXP),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async ({ current, newPassword }) => await changePassword(current, newPassword));
</script>

<template>
  <Dialog
    :open="open"
    @update:open="open = $event"
  >
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Changement de mot de passe</DialogTitle>
        <DialogDescription>Attention, je t'informe tout de même que cette action est définitive et irréversible ! N'oublie pas de noter ton nouveau mot de passe sur un petit morceau de papier et de le mettre à l'abri des petits curieux 🫣</DialogDescription>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="current"
        >
          <FormItem>
            <FormLabel>Mot de passe actuel</FormLabel>
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
          name="newPassword"
        >
          <FormItem>
            <FormLabel>Mot de passe actuel</FormLabel>
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
            <FormLabel>Mot de passe actuel</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                type="password"
                placeholder="..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex items-center justify-between">
          <DialogClose>
            <Button
              type="button"
              variant="secondary"
            >
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit">
            Confirmer
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
