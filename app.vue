<script lang="ts" setup>
import { IconoirProvider } from "@iconoir/vue";
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <IconoirProvider
      :icon-props="{
        'width': '1rem',
        'height': '1rem',
        'stroke-width': '1.5',
      }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </IconoirProvider>
  </div>
</template>
