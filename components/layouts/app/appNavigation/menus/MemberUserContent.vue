<script setup lang="ts">
import { Settings, LogOut } from "@iconoir/vue";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import type { User } from "~/types/user";
import { Separator } from "~/components/ui/separator";

const user = useState<User>("user");

const associations = ref<{
  uid: string;
  name: string;
  logo?: string;
}[]>([
  {
    uid: "x1",
    name: "Amicale CORE",
    logo: "",
  },
  {
    uid: "x2",
    name: "AFGES",
  },
  {
    uid: "x3",
    name: "AIUS",
    logo: "",
  },
]);
</script>

<template>
  <div
    v-if="user"
    class="px-2"
  >
    <span class="text-sm text-muted-foreground">
      @{{ user.login }}
    </span>
  </div>

  <Separator class="my-1" />

  <template v-if="associations.length">
    <DropdownMenuGroup>
      <DropdownMenuItem
        v-for="association in associations"
        :key="`asso-${association.uid}`"
        class="item"
        as-child
      >
        <NuxtLink to="/portal/personal/profile/me">
          <Avatar size="xs">
            <AvatarImage
              v-if="association.logo"
              :src="association.logo"
            />
            <AvatarFallback>{{ association.name.replaceAll(" ", "").substring(0, 2) }}</AvatarFallback>
          </Avatar>
          <span>{{ association.name }}</span>
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuGroup>

    <Separator class="my-1" />
  </template>

  <DropdownMenuItem class="item">
    <Settings />
    <span>Paramètres</span>
  </DropdownMenuItem>
  <DropdownMenuItem
    class="item"
    @click="logout"
  >
    <LogOut />
    <span>Déconnexion</span>
  </DropdownMenuItem>
</template>

<style lang="sass" scoped>
.item
  @apply gap-2 cursor-pointer
</style>
