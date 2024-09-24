<script setup lang="ts">
import UserAvatar from "~/components/layouts/app/appNavigation/UserAvatar.vue";
import type { User } from "~/types/user";

const user = useState<User>("user");
</script>

<template>
  <DropdownMenu v-if="user">
    <DropdownMenuTrigger>
      <Button
        variant="ghost"
        size="icon"
      >
        <UserAvatar />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <slot />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>

</style>
