<script setup lang="ts">
import { Settings, LogOut } from "@iconoir/vue";
import { DropdownMenuItem } from "~/components/ui/dropdown-menu";
import type { User } from "~/types/user";
import { Separator } from "~/components/ui/separator";
import associations from "~/assets/mock/associations";

const user = useState<User>("user");
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
        :key="`asso-${association.id}`"
        class="item"
        as-child
      >
        <NuxtLink to="/portal/personal/profile/me">
          <Avatar
            size="xs"
            shape="squareSmall"
          >
            <AvatarImage
              v-if="association.avatarURL"
              :src="association.avatarURL"
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
  @apply gap-2 cursor-pointer pr-3
</style>
