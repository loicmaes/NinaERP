<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";
import AppNavigationDesktopUser from "~/components/layouts/app/appNavigation/desktop/AppNavigationDesktopUser.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <aside :class="cn('flex-col gap-6 w-[min(100%,17.5rem)] p-4 border-r border-border', props.class)">
    <!-- user -->
    <AppNavigationDesktopUser>
      <slot name="user" />
    </AppNavigationDesktopUser>

    <!-- navigation -->
    <slot name="navigation" />
  </aside>
</template>

<style scoped>

</style>
