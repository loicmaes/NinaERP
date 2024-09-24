<script setup lang="ts">
import AppNavigationTopBar from "~/components/layouts/app/appNavigation/mobile/AppNavigationTopBar.vue";
import AppNavigationSideBar from "~/components/layouts/app/appNavigation/desktop/AppNavigationSideBar.vue";
import MemberNavigationContent from "~/components/layouts/app/appNavigation/menus/MemberNavigationContent.vue";
import MemberUserContent from "~/components/layouts/app/appNavigation/menus/MemberUserContent.vue";
</script>

<template>
  <div
    data-layout="member"
    class="flex flex-col lg:flex-row min-h-dvh lg:h-dvh"
  >
    <AppNavigationSideBar class="hidden lg:flex">
      <template #navigation>
        <MemberNavigationContent />
      </template>
      <template #user>
        <MemberUserContent />
      </template>
    </AppNavigationSideBar>
    <AppNavigationTopBar class="lg:hidden">
      <template #navigation>
        <MemberNavigationContent />
      </template>
      <template #user>
        <MemberUserContent />
      </template>
    </AppNavigationTopBar>

    <main class="p-4 lg:flex-1 lg:overflow-y-auto">
      <slot />
    </main>
  </div>
</template>
