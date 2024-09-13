<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { InfoCircle, Lock, ChatBubble, Check } from "@iconoir/vue";
import { Card, CardContent, CardFooter, CardTitle } from "~/components/ui/card";
import { Stepper, type StepperStep } from "~/components/ui/stepper";
import { PASSWORD_REGEXP, PHONE_REGEXP, USERNAME_REGEXP } from "~/utils/regex";

await useAuth(false);

definePageMeta({
  layout: "auth",
});
useHead({
  title: "Créer ton compte !",
});

const currentStep = ref(1);
const schemas = [
  z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  z.object({
    login: z.string().min(1).regex(USERNAME_REGEXP),
    email: z.string().min(1).email(),
    password: z.string().min(1).regex(PASSWORD_REGEXP),
    confirmPassword: z.string(),
  }).refine(
    values => values.password === values.confirmPassword,
    {
      message: "Les mots de passe ne correspondent pas !",
      path: ["confirmPassword"],
    },
  ),
  z.object({
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().regex(PHONE_REGEXP).optional(),
  }),
];
const steps: StepperStep[] = [
  {
    step: 1,
    title: "Qui es-tu ?",
    description: "Tes informations personnelles.",
  },
  {
    step: 2,
    title: "Connexion",
    description: "Tes informations de connexion",
  },
  {
    step: 3,
    title: "Contact",
    description: "Tes informations de contact",
  },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function onSubmit(values: any) {
  const { firstName, lastName, login, email, password, contactEmail, contactPhone } = values;
  await registerAccount({
    login,
    email,
    password,
    userInfo: {
      firstName,
      lastName,
      contactEmail,
      contactPhone,
    },
  });
}
</script>

<template>
  <div class="w-full flex flex-col items-center gap-6">
    <CardTitle>Inscription</CardTitle>

    <Card class="w-full">
      <CardContent class="p-6 pt-8">
        <Form
          v-slot="{ meta, values, validate }"
          keep-values
          as=""
          :validation-schema="toTypedSchema(schemas[currentStep - 1])"
        >
          <Stepper
            v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
            v-model="currentStep"
            class="block w-full"
          >
            <form
              @submit="(e) => {
                e.preventDefault();
                validate();

                // noinspection UnreachableCodeJS
                if (currentStep === steps.length && meta.valid) onSubmit(values);
              }"
            >
              <div class="flex w-full flex-start gap-2">
                <StepperItem
                  v-for="step in steps"
                  :key="step.step"
                  v-slot="{ state }"
                  class="relative flex w-full flex-col items-center justify-center"
                  :step="step.step"
                >
                  <StepperSeparator
                    v-if="step.step !== steps[steps.length - 1].step"
                    class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary"
                  />

                  <StepperTrigger as-child>
                    <Button
                      :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                      size="icon"
                      class="z-10 rounded-full shrink-0"
                      :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                      :disabled="state !== 'completed' && !meta.valid"
                    >
                      <Check
                        v-if="state === 'completed'"
                        class="w-6 h-6"
                      />
                      <template v-else>
                        <InfoCircle
                          v-if="step.step === 1"
                          class="w-6 h-6"
                        />
                        <Lock
                          v-if="step.step === 2"
                          class="w-6 h-6"
                        />
                        <ChatBubble
                          v-if="step.step === 3"
                          class="w-6 h-6"
                        />
                      </template>
                    </Button>
                  </StepperTrigger>

                  <div class="mt-5 flex flex-col items-center text-center">
                    <StepperTitle
                      :class="[state === 'active' && 'text-primary']"
                      class="text-sm font-semibold transition lg:text-base"
                    >
                      {{ step.title }}
                    </StepperTitle>
                    <StepperDescription
                      :class="[state === 'active' && 'text-primary']"
                      class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
                    >
                      {{ step.description }}
                    </StepperDescription>
                  </div>
                </StepperItem>
              </div>

              <div class="flex flex-col gap-4 mt-4">
                <template v-if="currentStep === 1">
                  <FormField
                    v-slot="{ componentField }"
                    name="firstName"
                  >
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl v-bind="componentField">
                        <Input placeholder="..." />
                      </FormControl>
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="lastName"
                  >
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl v-bind="componentField">
                        <Input placeholder="..." />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </template>
                <template v-if="currentStep === 2">
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
                    name="email"
                  >
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
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
                  <FormField
                    v-slot="{ componentField }"
                    name="confirmPassword"
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
                </template>
                <template v-if="currentStep === 3">
                  <FormField
                    v-slot="{ componentField }"
                    name="contactEmail"
                  >
                    <FormItem>
                      <FormLabel>E-mail de contact <span class="text-xs opacity-40">(facultatif)</span></FormLabel>
                      <FormControl v-bind="componentField">
                        <Input
                          type="email"
                          placeholder="..."
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>
                  <FormField
                    v-slot="{ componentField }"
                    name="contactPhone"
                  >
                    <FormItem>
                      <FormLabel>Numéro de téléphone <span class="text-xs opacity-40">(facultatif)</span></FormLabel>
                      <FormControl v-bind="componentField">
                        <Input placeholder="..." />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </template>
              </div>

              <!-- buttons -->
              <div class="flex items-center justify-between mt-4">
                <Button
                  :disabled="isPrevDisabled"
                  variant="outline"
                  size="sm"
                  @click="prevStep()"
                >
                  Back
                </Button>
                <div class="flex items-center gap-3">
                  <Button
                    v-if="currentStep !== 3"
                    :type="meta.valid ? 'button' : 'submit'"
                    :disabled="isNextDisabled"
                    size="sm"
                    @click="meta.valid && nextStep()"
                  >
                    Next
                  </Button>
                  <Button
                    v-if="currentStep === 3"
                    size="sm"
                    type="submit"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </Stepper>
        </Form>
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
