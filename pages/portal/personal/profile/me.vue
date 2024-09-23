<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Calendar, Phone, Mail, EditPencil, Edit } from "@iconoir/vue";
import associations from "assets/mock/associations";
import type { User } from "~/types/user";
import UserAvatar from "~/components/layouts/app/appNavigation/UserAvatar.vue";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/components/ui/tooltip";
import { buildHalfDate } from "~/utils/dates";
import AssociationCard from "~/components/composed/association/AssociationCard.vue";

await useAuth(true);

definePageMeta({
  layout: "member",
});
useHead({
  title: "Mon profil · Nina ERP",
});

const aboutLabelClasses: HTMLAttributes["class"] = "text-sm text-muted-foreground font-medium";

const user = useState<User>("user");

type UserDates = {
  createdAt: string;
  updatedAt: string;
};
const dates = computed((): UserDates => ({
  createdAt: buildHalfDate(new Date(user.value.createdAt)),
  updatedAt: buildHalfDate(new Date(user.value.updatedAt)),
}));
</script>

<template>
  <main v-if="user">
    <header class="relative w-full flex flex-col">
      <span
        role="banner"
        class="w-full h-40 lg:h-56 bg-primary rounded-md"
      />
      <div class="px-6 lg:px-12 py-4 md:py-0 md:-mt-8 flex items-center md:items-end gap-6 lg:gap-8">
        <UserAvatar
          size="lg"
          class="hidden md:flex outline outline-8 outline-background"
        />
        <UserAvatar
          size="base"
          class="md:hidden outline outline-8 outline-background"
        />

        <div class="md:pb-3 flex-1 overflow-hidden">
          <div class="flex items-baseline gap-3">
            <p class="text-3xl font-black truncate">
              {{ user.userInfo?.firstName }} {{ user.userInfo?.lastName }}
            </p>
            <Button
              variant="ghost"
              size="icon"
              class="absolute md:relative top-2 md:top-auto right-2 md:right-auto text-background md:text-muted-foreground"
            >
              <Edit class="h-5 w-5" />
            </Button>
          </div>
          <span class="text-sm text-muted-foreground">@{{ user.login }}</span>
        </div>

        <div class="pb-5 shrink-0 hidden lg:flex gap-2">
          <Button
            v-if="user.userInfo?.contactPhone"
            variant="outline"
            size="icon"
            as-child
          >
            <NuxtLink :to="`tel:${user.userInfo?.contactPhone}`">
              <Phone />
            </NuxtLink>
          </Button>
          <Button
            variant="outline"
            size="icon"
            as-child
          >
            <NuxtLink :to="`mailto:${user.userInfo?.contactEmail}`">
              <Mail />
            </NuxtLink>
          </Button>
        </div>
      </div>
    </header>

    <div
      role="main"
      class="mt-6 lg:mt-8 px-6 lg:px-12 grid gap-12 lg:gap-4 xl:gap-6 2xl:gap-8 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-2 md:mb-3 lg:mb-4 xl:mb-6 2xl:mb-8"
    >
      <aside class="flex flex-col gap-4 lg:col-span-1">
        <template v-if="user.userInfo?.aboutMe">
          <section data-section="about">
            <h3 :class="aboutLabelClasses">
              Biographie
            </h3>
            <p class="text-pretty">
              "{{ user.userInfo?.aboutMe ?? "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium aliquam aperiam architecto est incidunt itaque labore libero, magni nostrum nulla numquam obcaecati odit officia pariatur perferendis, placeat quidem quo quod reiciendis saepe vitae voluptatibus!" }}"
            </p>
          </section>
          <Separator />
        </template>
        <section data-section="personal">
          <h3 :class="aboutLabelClasses">
            Informations personnelles
          </h3>
          <ul class="flex flex-col">
            <Tooltip>
              <TooltipTrigger>
                <li class="flex items-center gap-2 py-2">
                  <Calendar />
                  <span>{{ dates.createdAt }}</span>
                </li>
              </TooltipTrigger>
              <TooltipContent align="start">
                Compte créé le
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <li class="flex items-center gap-2 py-2">
                  <Calendar />
                  <span>{{ dates.updatedAt }}</span>
                </li>
              </TooltipTrigger>
              <TooltipContent align="start">
                Dernière mise à jour le
              </TooltipContent>
            </Tooltip>
          </ul>
        </section>
        <Separator />
        <section data-section="contact">
          <h3 :class="aboutLabelClasses">
            Informations de contact
          </h3>
          <ul class="flex flex-col">
            <Tooltip v-if="user.userInfo?.contactPhone">
              <TooltipTrigger>
                <li>
                  <NuxtLink
                    :to="`tel:${user.userInfo?.contactPhone}`"
                    class="flex items-center gap-2 py-2"
                  >
                    <Phone />
                    <span>{{ user.userInfo?.contactPhone }}</span>
                  </NuxtLink>
                </li>
              </TooltipTrigger>
              <TooltipContent align="start">
                Me contacter par téléphone
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <li>
                  <NuxtLink
                    :to="`mailto:${user.userInfo?.contactEmail}`"
                    class="flex items-center gap-2 py-2"
                  >
                    <Mail />
                    <span>{{ user.userInfo?.contactEmail }}</span>
                  </NuxtLink>
                </li>
              </TooltipTrigger>
              <TooltipContent align="start">
                Me contacter par e-mail
              </TooltipContent>
            </Tooltip>
          </ul>
        </section>
      </aside>
      <div class="flex flex-col gap-4 lg:col-span-2 xl:col-span-3 2xl:col-span-4">
        <section data-section="subscriptions">
          <header class="flex justify-between items-center">
            <h2>Mes adhésions</h2>
            <Button
              variant="secondary"
              size="sm"
              as-child
              class="gap-2"
            >
              <NuxtLink to="/portal/personal/memberships">
                <EditPencil />
                <span>Gérer</span>
              </NuxtLink>
            </Button>
          </header>

          <ul class="flex flex-col gap-3">
            <li
              v-for="association in associations"
              :key="`asso-${association.id}`"
            >
              <AssociationCard :association="association" />
            </li>
          </ul>
        </section>

        <Separator />

        <section data-section="admin">
          <header class="flex justify-between items-center">
            <h2>Mes organismes</h2>
            <Button
              variant="secondary"
              size="sm"
              as-child
              class="gap-2"
            >
              <NuxtLink to="/portal/personal/associations">
                <EditPencil />
                <span>Gérer</span>
              </NuxtLink>
            </Button>
          </header>

          <ul class="flex flex-col gap-3">
            <li
              v-for="association in associations"
              :key="`asso-${association.id}`"
            >
              <AssociationCard :association="association" />
            </li>
          </ul>
        </section>
      </div>
    </div>
  </main>
</template>

<style lang="sass" scoped>
[data-section]
  @apply flex flex-col

  h2
    @apply text-2xl font-bold

  > header:has(> h2)
    @apply mb-4

  > h3
    @apply mb-2

[data-section="admin"]
  @apply mt-8
</style>
