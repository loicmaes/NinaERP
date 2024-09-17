<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { changeEmailAddress } from "~/composables/auth";

const open = ref(false);

const schema = toTypedSchema(z.object({
  email: z.string().min(1).email(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  await changeEmailAddress(values.email);
  open.value = false;
});
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
        <DialogTitle>Changement d'e-mail</DialogTitle>
        <DialogDescription>Le changement d'e-mail est une action irréversible ! Assure-toi d'avoir accès à l'e-mail que tu entres ici, tu auras besoin de revérifier ton compte !</DialogDescription>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>Nouvelle adresse e-mail</FormLabel>
            <FormControl v-bind="componentField">
              <Input placeholder="..." />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="flex justify-between">
          <DialogClose>
            <Button
              type="button"
              variant="secondary"
            >
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit">
            Continuer
          </Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
