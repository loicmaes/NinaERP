<script setup lang="ts">
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import type { User } from "~/types/user";

const user = useState<User>("user");
</script>

<template>
  <Avatar shape="square">
    <AvatarFallback>{{ user.userInfo?.firstName.substring(0, 1).toUpperCase() }}{{ user.userInfo?.lastName.substring(0, 1).toUpperCase() }}</AvatarFallback>
  </Avatar>
</template>

<style scoped>

</style>
