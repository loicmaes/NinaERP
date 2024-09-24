<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Avatar, AvatarFallback, type AvatarVariants } from "~/components/ui/avatar";
import type { User } from "~/types/user";
import { cn } from "~/lib/utils";

const user = useState<User>("user");

const props = withDefaults(defineProps<{
  shape?: AvatarVariants["shape"];
  size?: AvatarVariants["size"];
  class?: HTMLAttributes["class"];
}>(), {
  shape: "square",
  size: "sm",
});
</script>

<template>
  <Avatar
    :shape="props.shape"
    :size="props.size"
    :class="cn(props.class)"
  >
    <AvatarFallback>{{ user.userInfo?.firstName.substring(0, 1).toUpperCase() }}{{ user.userInfo?.lastName.substring(0, 1).toUpperCase() }}</AvatarFallback>
  </Avatar>
</template>

<style scoped>

</style>
