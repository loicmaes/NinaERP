<script setup lang="ts">
import { ArrowSeparateVertical } from "@iconoir/vue";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import type { User } from "~/types/user";
import UserAvatar from "~/components/layouts/app/appNavigation/UserAvatar.vue";

const user = useState<User>("user");
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger as-child>
      <Button
        variant="ghost"
        class="h-auto w-full gap-2 px-2"
      >
        <UserAvatar />

        <div class="flex flex-col flex-1 items-start gap-1.5">
          <p class="font-extrabold leading-none">
            {{ user.userInfo?.firstName }}{{ user.userInfo?.lastName }}
          </p>
          <span class="text-sm font-normal leading-none text-muted-foreground">{{ user.email }}</span>
        </div>

        <ArrowSeparateVertical class="text-muted-foreground" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
