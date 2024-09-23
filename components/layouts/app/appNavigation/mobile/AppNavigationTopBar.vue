<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import AppNavigationMobileNavigation from "~/components/layouts/app/appNavigation/mobile/AppNavigationMobileNavigation.vue";
import { cn } from "~/lib/utils";
import AppNavigationMobileUser from "~/components/layouts/app/appNavigation/mobile/AppNavigationMobileUser.vue";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <header :class="cn('flex items-center justify-between pl-1 pr-4 py-2', props.class)">
    <AppNavigationMobileNavigation>
      <slot name="navigation" />
    </AppNavigationMobileNavigation>

    <AppNavigationMobileUser>
      <slot name="user" />
    </AppNavigationMobileUser>
  </header>
</template>
